// src/app/admin/page.js
'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import withAuth from '@/components/withAuth';
import AdminLayout from '@/components/AdminLayout';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, limit, Timestamp } from 'firebase/firestore';
import { 
  FaUsers, FaCalendar, FaPrayingHands, FaEnvelope, 
  FaBook, FaChartLine, FaCheckCircle, FaExclamationCircle,
  FaUserCheck, FaUserClock, FaArrowUp, FaArrowDown,
  FaClock, FaEye
} from 'react-icons/fa';
import Link from 'next/link';

function AdminDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalMembers: 0,
    pendingMembers: 0,
    approvedMembers: 0,
    upcomingEvents: 0,
    thisWeekEvents: 0,
    prayerRequests: 0,
    pendingPrayers: 0,
    contacts: 0,
    newContacts: 0,
    sermons: 0,
    users: 0,
    activeUsers: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [monthlyTrend, setMonthlyTrend] = useState({
    members: 0,
    events: 0,
    prayers: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Get current date and date ranges
      const now = new Date();
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

      // Fetch Memberships
      const membershipsRef = collection(db, 'memberships');
      const membershipsSnapshot = await getDocs(membershipsRef);
      const memberships = membershipsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      const pendingMembers = memberships.filter(m => m.status === 'pending').length;
      const approvedMembers = memberships.filter(m => m.status === 'approved').length;
      
      // Calculate monthly trend for members
      const thisMonthMembers = memberships.filter(m => {
        const createdAt = m.createdAt?.toDate?.() || new Date(m.createdAt);
        return createdAt >= startOfMonth;
      }).length;

      const lastMonthMembers = memberships.filter(m => {
        const createdAt = m.createdAt?.toDate?.() || new Date(m.createdAt);
        return createdAt >= lastMonth && createdAt < startOfMonth;
      }).length;

      const memberTrend = lastMonthMembers > 0 
        ? ((thisMonthMembers - lastMonthMembers) / lastMonthMembers * 100).toFixed(1)
        : thisMonthMembers > 0 ? 100 : 0;

      // Fetch Events
      const eventsRef = collection(db, 'events');
      const eventsSnapshot = await getDocs(eventsRef);
      const events = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      const upcomingEvents = events.filter(e => {
        const eventDate = new Date(e.date);
        return eventDate >= now;
      }).length;

      const thisWeekEvents = events.filter(e => {
        const eventDate = new Date(e.date);
        return eventDate >= startOfWeek && eventDate < new Date(startOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000);
      }).length;

      // Calculate monthly trend for events
      const thisMonthEvents = events.filter(e => {
        const eventDate = new Date(e.date);
        return eventDate >= startOfMonth;
      }).length;

      const lastMonthEvents = events.filter(e => {
        const eventDate = new Date(e.date);
        return eventDate >= lastMonth && eventDate < startOfMonth;
      }).length;

      const eventTrend = lastMonthEvents > 0 
        ? ((thisMonthEvents - lastMonthEvents) / lastMonthEvents * 100).toFixed(1)
        : thisMonthEvents > 0 ? 100 : 0;

      // Fetch Prayer Requests
      const prayersRef = collection(db, 'prayerRequests');
      const prayersSnapshot = await getDocs(prayersRef);
      const prayers = prayersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      const pendingPrayers = prayers.filter(p => p.status === 'pending' || !p.status).length;

      // Calculate monthly trend for prayers
      const thisMonthPrayers = prayers.filter(p => {
        const createdAt = p.createdAt?.toDate?.() || new Date(p.createdAt);
        return createdAt >= startOfMonth;
      }).length;

      const lastMonthPrayers = prayers.filter(p => {
        const createdAt = p.createdAt?.toDate?.() || new Date(p.createdAt);
        return createdAt >= lastMonth && createdAt < startOfMonth;
      }).length;

      const prayerTrend = lastMonthPrayers > 0 
        ? ((thisMonthPrayers - lastMonthPrayers) / lastMonthPrayers * 100).toFixed(1)
        : thisMonthPrayers > 0 ? 100 : 0;

      // Fetch Contacts
      const contactsRef = collection(db, 'contacts');
      const contactsSnapshot = await getDocs(contactsRef);
      const contacts = contactsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      const newContacts = contacts.filter(c => c.status === 'new' || !c.status).length;

      // Fetch Users (admin only)
      let totalUsers = 0;
      let activeUsers = 0;
      if (user?.role === 'admin') {
        const usersRef = collection(db, 'users');
        const usersSnapshot = await getDocs(usersRef);
        const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        totalUsers = users.length;
        activeUsers = users.filter(u => u.isActive !== false).length;
      }

      // Set stats
      setStats({
        totalMembers: membershipsSnapshot.size,
        pendingMembers,
        approvedMembers,
        upcomingEvents,
        thisWeekEvents,
        prayerRequests: prayersSnapshot.size,
        pendingPrayers,
        contacts: contactsSnapshot.size,
        newContacts,
        users: totalUsers,
        activeUsers
      });

      setMonthlyTrend({
        members: parseFloat(memberTrend),
        events: parseFloat(eventTrend),
        prayers: parseFloat(prayerTrend)
      });

      // Fetch Recent Activities
      const activities = [];

      // Recent memberships
      const recentMemberships = memberships
        .sort((a, b) => {
          const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt);
          const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt);
          return dateB - dateA;
        })
        .slice(0, 3);

      recentMemberships.forEach(m => {
        activities.push({
          type: 'membership',
          message: `New membership application from ${m.firstName} ${m.lastName}`,
          time: m.createdAt?.toDate?.().toLocaleString() || 'Recent',
          status: m.status
        });
      });

      // Recent prayers
      const recentPrayers = prayers
        .sort((a, b) => {
          const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt);
          const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt);
          return dateB - dateA;
        })
        .slice(0, 3);

      recentPrayers.forEach(p => {
        activities.push({
          type: 'prayer',
          message: `Prayer request from ${p.name}`,
          time: p.createdAt?.toDate?.().toLocaleString() || 'Recent',
          status: p.status || 'pending'
        });
      });

      // Recent contacts
      const recentContacts = contacts
        .sort((a, b) => {
          const dateA = a.timestamp?.toDate?.() || new Date(a.timestamp);
          const dateB = b.timestamp?.toDate?.() || new Date(b.timestamp);
          return dateB - dateA;
        })
        .slice(0, 2);

      recentContacts.forEach(c => {
        activities.push({
          type: 'contact',
          message: `New contact message from ${c.name}`,
          time: c.timestamp?.toDate?.().toLocaleString() || 'Recent',
          status: c.status || 'new'
        });
      });

      // Sort all activities by time
      activities.sort((a, b) => new Date(b.time) - new Date(a.time));
      setRecentActivities(activities.slice(0, 8));

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-900 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* MATCHING MEMBERSHIP PAGE STRUCTURE */}
      <div className="min-h-screen bg-gray-50">
        {/* Header - Same as Other Pages */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.displayName || user?.email}!
            </h1>
            <p className="text-gray-600">
              {user?.role === 'admin' ? 'Administrator Dashboard' : 'Staff Dashboard'} - Overview & Analytics
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Primary Stats Cards - MATCHING MEMBERSHIP LAYOUT */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Memberships */}
            <Link href="/admin/memberships" className="block">
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <FaUsers className="text-2xl text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Total Members</p>
                    <p className="text-2xl font-bold">{stats.totalMembers}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm">
                  <div className="flex items-center gap-1 text-amber-600">
                    <FaClock />
                    <span>{stats.pendingMembers} pending</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <FaCheckCircle />
                    <span>{stats.approvedMembers} approved</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Events */}
            <Link href="/admin/events" className="block">
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <FaCalendar className="text-2xl text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Total Events</p>
                    <p className="text-2xl font-bold">{stats.upcomingEvents}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm">
                  <div className="flex items-center gap-1 text-blue-600">
                    <FaCalendar />
                    <span>{stats.thisWeekEvents} this week</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <FaCheckCircle />
                    <span>upcoming</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Prayer Requests */}
            <Link href="/admin/prayers" className="block">
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <FaPrayingHands className="text-2xl text-purple-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Prayer Requests</p>
                    <p className="text-2xl font-bold">{stats.prayerRequests}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm">
                  <div className="flex items-center gap-1 text-amber-600">
                    <FaClock />
                    <span>{stats.pendingPrayers} pending</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <FaCheckCircle />
                    <span>{stats.prayerRequests - stats.pendingPrayers} answered</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Contacts */}
            <Link href="/admin/contacts" className="block">
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-100 rounded-lg">
                    <FaEnvelope className="text-2xl text-amber-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Contact Messages</p>
                    <p className="text-2xl font-bold">{stats.contacts}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm">
                  <div className="flex items-center gap-1 text-amber-600">
                    <FaExclamationCircle />
                    <span>{stats.newContacts} new</span>
                  </div>
                  <div className="flex items-center gap-1 text-green-600">
                    <FaCheckCircle />
                    <span>{stats.contacts - stats.newContacts} replied</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Monthly Trends - MATCHING STYLE */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Membership Growth</h3>
                <span className={`flex items-center gap-1 text-sm font-semibold ${
                  monthlyTrend.members >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {monthlyTrend.members >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                  {Math.abs(monthlyTrend.members)}%
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">This Month</p>
              <p className="text-sm text-gray-500 mt-1">vs last month</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Events Trend</h3>
                <span className={`flex items-center gap-1 text-sm font-semibold ${
                  monthlyTrend.events >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {monthlyTrend.events >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                  {Math.abs(monthlyTrend.events)}%
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">Growth Rate</p>
              <p className="text-sm text-gray-500 mt-1">monthly comparison</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600">Prayer Requests</h3>
                <span className={`flex items-center gap-1 text-sm font-semibold ${
                  monthlyTrend.prayers >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {monthlyTrend.prayers >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                  {Math.abs(monthlyTrend.prayers)}%
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">Activity</p>
              <p className="text-sm text-gray-500 mt-1">monthly change</p>
            </div>
          </div>

          {/* Recent Activity Table - MATCHING MEMBERSHIP TABLE STYLE */}
          <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              <button 
                onClick={fetchDashboardData}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-2"
              >
                <FaChartLine />
                Refresh
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Activity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentActivities.length > 0 ? (
                    recentActivities.map((activity, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              activity.status === 'pending' || activity.status === 'new'
                                ? 'bg-amber-100 text-amber-600' 
                                : 'bg-green-100 text-green-600'
                            }`}>
                              {activity.status === 'pending' || activity.status === 'new' 
                                ? <FaExclamationCircle /> 
                                : <FaCheckCircle />
                              }
                            </div>
                            <div className="text-sm text-gray-900">{activity.message}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {activity.time}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                            activity.status === 'pending' || activity.status === 'new'
                              ? 'bg-amber-100 text-amber-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {activity.status === 'pending' || activity.status === 'new' 
                              ? <FaClock /> 
                              : <FaCheckCircle />
                            }
                            {activity.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="px-6 py-12 text-center">
                        <div className="text-gray-400">
                          <FaChartLine className="text-6xl mx-auto mb-4 opacity-20" />
                          <p className="text-lg font-semibold">No recent activity</p>
                          <p className="text-sm">Activity will appear here as it happens</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions - Admin Only */}
          {user?.role === 'admin' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/admin/users" className="p-4 border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <FaUsers className="text-xl text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Manage Users</p>
                      <p className="text-sm text-gray-600">{stats.users} total users</p>
                    </div>
                  </div>
                </Link>
                
                <Link href="/admin/memberships" className="p-4 border-2 border-green-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <FaUserCheck className="text-xl text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Review Members</p>
                      <p className="text-sm text-gray-600">{stats.pendingMembers} pending</p>
                    </div>
                  </div>
                </Link>

                <Link href="/admin/prayers" className="p-4 border-2 border-purple-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <FaPrayingHands className="text-xl text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Prayer Requests</p>
                      <p className="text-sm text-gray-600">{stats.pendingPrayers} to review</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

// Protect this route - only allow admin and staff roles
export default withAuth(AdminDashboard, ['admin', 'staff']);