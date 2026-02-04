// src/app/admin/page.js
'use client';
import { useState, useEffect } from 'react';
import { withAuth } from '@/middleware/withAuth';
import { db } from '@/lib/firebase';
import { 
  collection, 
  getDocs, 
  query, 
  orderBy, 
  limit,
  where 
} from 'firebase/firestore';
import { 
  FaUsers, 
  FaCalendar, 
  FaPrayingHands, 
  FaEnvelope,
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
  FaEye,
  FaSync
} from 'react-icons/fa';
import Link from 'next/link';

function AdminDashboard() {
  const [stats, setStats] = useState({
    memberships: { total: 0, pending: 0, approved: 0, rejected: 0 },
    events: { total: 0, upcoming: 0, past: 0 },
    prayers: { total: 0, active: 0, answered: 0 },
    contacts: { total: 0, new: 0, replied: 0 }
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchStats(),
        fetchRecentActivity()
      ]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDashboardData();
    setRefreshing(false);
  };

  const fetchStats = async () => {
    try {
      // Fetch memberships
      const membershipsSnap = await getDocs(collection(db, 'memberships'));
      const memberships = membershipsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Fetch events
      const eventsSnap = await getDocs(collection(db, 'events'));
      const events = eventsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const now = new Date();
      
      // Fetch contacts
      const contactsSnap = await getDocs(collection(db, 'contacts'));
      const contacts = contactsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Filter prayer requests
      const prayers = contacts.filter(c => c.contactReason === 'prayer' || c.contactReason === 'Prayer');

      setStats({
        memberships: {
          total: memberships.length,
          pending: memberships.filter(m => m.status === 'pending').length,
          approved: memberships.filter(m => m.status === 'approved').length,
          rejected: memberships.filter(m => m.status === 'rejected').length
        },
        events: {
          total: events.length,
          upcoming: events.filter(e => e.date?.toDate?.() > now || new Date(e.date) > now).length,
          past: events.filter(e => e.date?.toDate?.() <= now || new Date(e.date) <= now).length
        },
        prayers: {
          total: prayers.length,
          active: prayers.filter(p => (p.prayerStatus || 'active') === 'active').length,
          answered: prayers.filter(p => (p.prayerStatus || 'active') === 'answered').length
        },
        contacts: {
          total: contacts.length,
          new: contacts.filter(c => c.status === 'new').length,
          replied: contacts.filter(c => c.status === 'replied').length
        }
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchRecentActivity = async () => {
    try {
      const activities = [];

      // Fetch recent memberships
      const membershipsSnap = await getDocs(
        query(collection(db, 'memberships'), orderBy('submittedAt', 'desc'), limit(5))
      );
      membershipsSnap.forEach(doc => {
        const data = doc.data();
        activities.push({
          id: `membership-${doc.id}`,
          type: 'membership',
          icon: <FaUsers />,
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600',
          message: `New membership application from ${formatName(data.firstName, data.lastName, data.email)}`,
          time: data.submittedAt?.toDate?.() || new Date(data.submittedAt),
          status: data.status || 'pending',
          link: '/admin/memberships'
        });
      });

      // Fetch recent contacts
      const contactsSnap = await getDocs(
        query(collection(db, 'contacts'), orderBy('timestamp', 'desc'), limit(5))
      );
      contactsSnap.forEach(doc => {
        const data = doc.data();
        const isPrayer = data.contactReason === 'prayer' || data.contactReason === 'Prayer';
        
        activities.push({
          id: `contact-${doc.id}`,
          type: isPrayer ? 'prayer' : 'contact',
          icon: isPrayer ? <FaPrayingHands /> : <FaEnvelope />,
          iconBg: isPrayer ? 'bg-purple-100' : 'bg-blue-100',
          iconColor: isPrayer ? 'text-purple-600' : 'text-blue-600',
          message: isPrayer 
            ? `New prayer request: ${formatName(data.name, null, data.email)}${data.subject ? ` - ${data.subject}` : ''}`
            : `New contact from ${formatName(data.name, null, data.email)}`,
          time: data.timestamp?.toDate?.() || new Date(data.timestamp),
          status: isPrayer ? (data.prayerStatus || 'active') : (data.status || 'new'),
          link: isPrayer ? '/admin/prayers' : '/admin/contacts'
        });
      });

      // Sort by time
      activities.sort((a, b) => b.time - a.time);

      setRecentActivity(activities.slice(0, 10));
    } catch (error) {
      console.error('Error fetching recent activity:', error);
    }
  };

  // Helper function to format names properly
  const formatName = (firstName, lastName = null, email = null) => {
    // If we have both first and last name
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    }
    
    // If we only have first name
    if (firstName && firstName !== 'undefined' && firstName.trim() !== '') {
      return firstName;
    }
    
    // If we have email, extract name from it
    if (email && email !== 'undefined') {
      const emailName = email.split('@')[0];
      // Convert email username to readable format (e.g., john.doe -> John Doe)
      return emailName
        .split(/[._-]/)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
    }
    
    // Fallback
    return 'Unknown User';
  };

  const getStatusConfig = (type, status) => {
    const configs = {
      membership: {
        pending: { label: 'Pending', bg: 'bg-yellow-100', text: 'text-yellow-800', icon: <FaClock /> },
        approved: { label: 'Approved', bg: 'bg-green-100', text: 'text-green-800', icon: <FaCheckCircle /> },
        rejected: { label: 'Rejected', bg: 'bg-red-100', text: 'text-red-800', icon: <FaExclamationCircle /> },
        Unknown: { label: 'Unknown', bg: 'bg-gray-100', text: 'text-gray-800', icon: <FaClock /> }
      },
      contact: {
        new: { label: 'New', bg: 'bg-orange-100', text: 'text-orange-800', icon: <FaExclamationCircle /> },
        replied: { label: 'Replied', bg: 'bg-green-100', text: 'text-green-800', icon: <FaCheckCircle /> }
      },
      prayer: {
        active: { label: 'Active', bg: 'bg-green-100', text: 'text-green-800', icon: <FaCheckCircle /> },
        answered: { label: 'Answered', bg: 'bg-blue-100', text: 'text-blue-800', icon: <FaCheckCircle /> },
        archived: { label: 'Archived', bg: 'bg-gray-100', text: 'text-gray-800', icon: <FaClock /> }
      }
    };

    return configs[type]?.[status] || configs[type]?.['Unknown'] || { 
      label: status, 
      bg: 'bg-gray-100', 
      text: 'text-gray-800',
      icon: <FaClock />
    };
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your church management dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Memberships */}
        <Link href="/admin/memberships">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaUsers className="text-2xl text-blue-600" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">{stats.memberships.total}</p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Memberships</h3>
            <div className="flex justify-between text-sm">
              <span className="text-yellow-600">Pending: {stats.memberships.pending}</span>
              <span className="text-green-600">Approved: {stats.memberships.approved}</span>
            </div>
          </div>
        </Link>

        {/* Events */}
        <Link href="/admin/events">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <FaCalendar className="text-2xl text-green-600" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">{stats.events.total}</p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Events</h3>
            <div className="flex justify-between text-sm">
              <span className="text-blue-600">Upcoming: {stats.events.upcoming}</span>
              <span className="text-gray-600">Past: {stats.events.past}</span>
            </div>
          </div>
        </Link>

        {/* Prayer Requests */}
        <Link href="/admin/prayers">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <FaPrayingHands className="text-2xl text-purple-600" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">{stats.prayers.total}</p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Prayer Requests</h3>
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Active: {stats.prayers.active}</span>
              <span className="text-blue-600">Answered: {stats.prayers.answered}</span>
            </div>
          </div>
        </Link>

        {/* Contacts */}
        <Link href="/admin/contacts">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-orange-500">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <FaEnvelope className="text-2xl text-orange-600" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-gray-900">{stats.contacts.total}</p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Contacts</h3>
            <div className="flex justify-between text-sm">
              <span className="text-orange-600">New: {stats.contacts.new}</span>
              <span className="text-green-600">Replied: {stats.contacts.replied}</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
          >
            <FaSync className={refreshing ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {recentActivity.length === 0 ? (
          <div className="p-12 text-center">
            <FaClock className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No recent activity</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentActivity.map((activity) => {
                  const statusConfig = getStatusConfig(activity.type, activity.status);
                  return (
                    <tr key={activity.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-full ${activity.iconBg}`}>
                            <span className={activity.iconColor}>{activity.icon}</span>
                          </div>
                          <span className="text-sm text-gray-900">{activity.message}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">
                          {activity.time.toLocaleString('en-US', {
                            month: 'numeric',
                            day: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                          })}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.text}`}>
                          {statusConfig.icon}
                          {statusConfig.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link href={activity.link}>
                          <button className="text-blue-600 hover:text-blue-900 font-medium text-sm flex items-center gap-1">
                            <FaEye />
                            View
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default withAuth(AdminDashboard, ['admin', 'staff']);