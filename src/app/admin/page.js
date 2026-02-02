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
  FaUserCheck, FaUserClock, FaArrowUp, FaArrowDown
} from 'react-icons/fa';

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
    unreadContacts: 0,
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
        const eventDate = e.date?.toDate?.() || new Date(e.date);
        return eventDate >= now;
      }).length;

      const thisWeekEvents = events.filter(e => {
        const eventDate = e.date?.toDate?.() || new Date(e.date);
        return eventDate >= startOfWeek && eventDate < new Date(startOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000);
      }).length;

      // Calculate monthly trend for events
      const thisMonthEvents = events.filter(e => {
        const eventDate = e.date?.toDate?.() || new Date(e.date);
        return eventDate >= startOfMonth;
      }).length;

      const lastMonthEvents = events.filter(e => {
        const eventDate = e.date?.toDate?.() || new Date(e.date);
        return eventDate >= lastMonth && eventDate < startOfMonth;
      }).length;

      const eventTrend = lastMonthEvents > 0 
        ? ((thisMonthEvents - lastMonthEvents) / lastMonthEvents * 100).toFixed(1)
        : thisMonthEvents > 0 ? 100 : 0;

      // Fetch Prayer Requests
      const prayersRef = collection(db, 'prayers');
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
      
      const unreadContacts = contacts.filter(c => !c.read).length;

      // Fetch Sermons
      const sermonsRef = collection(db, 'sermons');
      const sermonsSnapshot = await getDocs(sermonsRef);

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
        unreadContacts,
        sermons: sermonsSnapshot.size,
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
          time: getTimeAgo(m.createdAt?.toDate?.() || new Date(m.createdAt)),
          status: m.status || 'pending'
        });
      });

      // Recent events
      const recentEvents = events
        .sort((a, b) => {
          const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt || a.date);
          const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt || b.date);
          return dateB - dateA;
        })
        .slice(0, 2);

      recentEvents.forEach(e => {
        activities.push({
          type: 'event',
          message: `Event "${e.title}" scheduled`,
          time: getTimeAgo(e.createdAt?.toDate?.() || new Date(e.createdAt || e.date)),
          status: 'completed'
        });
      });

      // Recent prayers
      const recentPrayers = prayers
        .sort((a, b) => {
          const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt);
          const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt);
          return dateB - dateA;
        })
        .slice(0, 2);

      recentPrayers.forEach(p => {
        activities.push({
          type: 'prayer',
          message: `New prayer request from ${p.name}`,
          time: getTimeAgo(p.createdAt?.toDate?.() || new Date(p.createdAt)),
          status: p.status || 'pending'
        });
      });

      // Recent contacts
      const recentContacts = contacts
        .sort((a, b) => {
          const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt);
          const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt);
          return dateB - dateA;
        })
        .slice(0, 2);

      recentContacts.forEach(c => {
        activities.push({
          type: 'contact',
          message: `Contact form submission from ${c.name}`,
          time: getTimeAgo(c.createdAt?.toDate?.() || new Date(c.createdAt)),
          status: c.read ? 'completed' : 'pending'
        });
      });

      // Sort all activities by time
      activities.sort((a, b) => {
        return 0;
      });

      setRecentActivities(activities.slice(0, 8));

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (date) => {
    if (!date) return 'Unknown';
    
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
  };

  const statCards = [
    {
      title: 'Total Members',
      value: stats.totalMembers.toString(),
      icon: <FaUsers className="text-4xl" />,
      color: 'bg-blue-500',
      change: `${stats.pendingMembers} pending`,
      trend: monthlyTrend.members,
      subStats: [
        { label: 'Approved', value: stats.approvedMembers, icon: <FaUserCheck /> },
        { label: 'Pending', value: stats.pendingMembers, icon: <FaUserClock /> }
      ]
    },
    {
      title: 'Upcoming Events',
      value: stats.upcomingEvents.toString(),
      icon: <FaCalendar className="text-4xl" />,
      color: 'bg-green-500',
      change: `${stats.thisWeekEvents} this week`,
      trend: monthlyTrend.events
    },
    {
      title: 'Prayer Requests',
      value: stats.prayerRequests.toString(),
      icon: <FaPrayingHands className="text-4xl" />,
      color: 'bg-purple-500',
      change: `${stats.pendingPrayers} pending`,
      trend: monthlyTrend.prayers
    },
    {
      title: 'Messages',
      value: stats.contacts.toString(),
      icon: <FaEnvelope className="text-4xl" />,
      color: 'bg-amber-500',
      change: `${stats.unreadContacts} unread`
    }
  ];

  // Add admin-only stats
  if (user?.role === 'admin') {
    statCards.push(
      {
        title: 'Total Users',
        value: stats.users.toString(),
        icon: <FaUsers className="text-4xl" />,
        color: 'bg-indigo-500',
        change: `${stats.activeUsers} active`
      },
      {
        title: 'Sermons',
        value: stats.sermons.toString(),
        icon: <FaBook className="text-4xl" />,
        color: 'bg-rose-500',
        change: 'Total uploaded'
      }
    );
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-900 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading dashboard analytics...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.displayName || user?.email}!
            </h1>
            <p className="text-gray-600">
              {user?.role === 'admin' ? 'Administrator Dashboard' : 'Staff Dashboard'} - Real-time Analytics
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} text-white p-3 rounded-lg`}>
                    {stat.icon}
                  </div>
                  {stat.trend !== undefined && (
                    <div className={`flex items-center gap-1 text-sm font-semibold ${
                      stat.trend >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.trend >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                      {Math.abs(stat.trend)}%
                    </div>
                  )}
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.change}</p>
                
                {stat.subStats && (
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                    {stat.subStats.map((sub, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-gray-400">{sub.icon}</span>
                        <div>
                          <p className="text-xs text-gray-500">{sub.label}</p>
                          <p className="text-sm font-semibold text-gray-700">{sub.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                <button 
                  onClick={fetchDashboardData}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-2"
                >
                  <FaChartLine />
                  Refresh
                </button>
              </div>
              
              <div className="space-y-4">
                {recentActivities.length > 0 ? (
                  recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.status === 'pending' ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {activity.status === 'pending' ? <FaExclamationCircle /> : <FaCheckCircle />}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium mb-1">{activity.message}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        activity.status === 'pending' 
                          ? 'bg-amber-100 text-amber-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">No recent activity</p>
                )}
              </div>
            </div>

            {/* Quick Stats Summary */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg shadow-md p-6 text-white">
              <h2 className="text-xl font-bold mb-6">Monthly Summary</h2>
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-100">New Members</span>
                    <span className={`flex items-center gap-1 text-sm font-semibold ${
                      monthlyTrend.members >= 0 ? 'text-green-300' : 'text-red-300'
                    }`}>
                      {monthlyTrend.members >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                      {Math.abs(monthlyTrend.members)}%
                    </span>
                  </div>
                  <p className="text-2xl font-bold">This Month</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-100">Events</span>
                    <span className={`flex items-center gap-1 text-sm font-semibold ${
                      monthlyTrend.events >= 0 ? 'text-green-300' : 'text-red-300'
                    }`}>
                      {monthlyTrend.events >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                      {Math.abs(monthlyTrend.events)}%
                    </span>
                  </div>
                  <p className="text-2xl font-bold">Growth Rate</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-100">Prayer Requests</span>
                    <span className={`flex items-center gap-1 text-sm font-semibold ${
                      monthlyTrend.prayers >= 0 ? 'text-green-300' : 'text-red-300'
                    }`}>
                      {monthlyTrend.prayers >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                      {Math.abs(monthlyTrend.prayers)}%
                    </span>
                  </div>
                  <p className="text-2xl font-bold">Comparison</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions - Admin Only */}
          {user?.role === 'admin' && (
            <div className="mt-8 bg-gradient-to-br from-indigo-900 to-indigo-700 rounded-lg shadow-md p-6 text-white">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="/admin/users" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 text-left transition-colors block">
                  <FaUsers className="text-2xl mb-2" />
                  <p className="font-medium">Manage Users</p>
                  <p className="text-sm text-blue-100">Add or edit user roles</p>
                </a>
                
                
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