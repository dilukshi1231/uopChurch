// src/app/admin/page.js
'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { 
  FaUsers, FaPrayingHands, FaCalendar, FaEnvelope, 
  FaChartLine, FaUsersCog, FaBell, FaBook 
} from 'react-icons/fa';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalMembers: 0,
    pendingMemberships: 0,
    upcomingEvents: 0,
    prayerRequests: 0,
    recentContacts: 0,
    thisWeekAttendance: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
   useEffect(() => {
    console.log('Admin Dashboard - User:', user);
    console.log('Admin Dashboard - Loading:', loading);
    console.log('Admin Dashboard - Role:', user?.role);
  }, [user, loading]);
  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
    console.log('Auth state changed:', authUser); // Debug log
    
    if (authUser) {
      try {
        const userDocRef = doc(db, 'users', authUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        console.log('User doc exists:', userDoc.exists()); // Debug log
        console.log('User doc data:', userDoc.data()); // Debug log
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            uid: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName || userData?.displayName,
            role: userData?.role || 'member',
            ...userData
          });
          console.log('User set with role:', userData?.role); // Debug log
        } else {
          // If no user doc exists, create one with member role
          console.log('No user doc found, creating one');
          await setDoc(userDocRef, {
            email: authUser.email,
            displayName: authUser.displayName,
            role: 'member',
            createdAt: new Date()
          });
          setUser({
            uid: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName,
            role: 'member'
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    } else {
      console.log('No auth user');
      setUser(null);
    }
    setLoading(false);
  });

  return unsubscribe;
}, []);
  useEffect(() => {
    if (!user) {
      router.push('/auth');
      return;
    }

    // Check if user has admin or staff role
    if (user.role !== 'admin' && user.role !== 'staff') {
      router.push('/');
      return;
    }

    fetchDashboardData();
  }, [user, router]);

  const fetchDashboardData = async () => {
    try {
      // Fetch stats
      const membershipsRef = collection(db, 'memberships');
      const eventsRef = collection(db, 'events');
      const prayersRef = collection(db, 'prayers');
      const contactsRef = collection(db, 'contacts');

      // Total approved members
      const membersQuery = query(membershipsRef, where('status', '==', 'approved'));
      const membersSnapshot = await getDocs(membersQuery);
      
      // Pending memberships
      const pendingQuery = query(membershipsRef, where('status', '==', 'pending'));
      const pendingSnapshot = await getDocs(pendingQuery);

      // Upcoming events
      const today = new Date();
      const eventsQuery = query(eventsRef, where('date', '>=', today));
      const eventsSnapshot = await getDocs(eventsQuery);

      // Active prayer requests
      const prayersQuery = query(prayersRef, where('status', '==', 'active'));
      const prayersSnapshot = await getDocs(prayersQuery);

      // Recent contacts (last 7 days)
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const contactsQuery = query(contactsRef, where('timestamp', '>=', weekAgo));
      const contactsSnapshot = await getDocs(contactsQuery);

      setStats({
        totalMembers: membersSnapshot.size,
        pendingMemberships: pendingSnapshot.size,
        upcomingEvents: eventsSnapshot.size,
        prayerRequests: prayersSnapshot.size,
        recentContacts: contactsSnapshot.size,
        thisWeekAttendance: 247 // This would come from your attendance system
      });

      // Fetch recent activities
      const activities = [];
      
      // Recent memberships
      const recentMemberships = query(membershipsRef, orderBy('submittedAt', 'desc'), limit(5));
      const membershipDocs = await getDocs(recentMemberships);
      membershipDocs.forEach(doc => {
        const data = doc.data();
        activities.push({
          type: 'membership',
          message: `${data.firstName} ${data.lastName} applied for membership`,
          timestamp: data.submittedAt.toDate(),
          status: data.status
        });
      });

      // Recent contacts
      const recentContactsQuery = query(contactsRef, orderBy('timestamp', 'desc'), limit(5));
      const contactDocs = await getDocs(recentContactsQuery);
      contactDocs.forEach(doc => {
        const data = doc.data();
        activities.push({
          type: 'contact',
          message: `New contact from ${data.name}`,
          timestamp: data.timestamp.toDate(),
          status: data.status
        });
      });

      // Sort activities by timestamp
      activities.sort((a, b) => b.timestamp - a.timestamp);
      setRecentActivities(activities.slice(0, 10));

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { 
      name: 'Manage Members', 
      href: '/admin/memberships', 
      icon: <FaUsers />,
      color: 'bg-blue-500',
      description: 'Review and approve memberships'
    },
    { 
      name: 'Events', 
      href: '/admin/events', 
      icon: <FaCalendar />,
      color: 'bg-green-500',
      description: 'Create and manage events'
    },
    { 
      name: 'Prayer Requests', 
      href: '/admin/prayers', 
      icon: <FaPrayingHands />,
      color: 'bg-purple-500',
      description: 'View and manage prayers'
    },
    { 
      name: 'Messages', 
      href: '/admin/contacts', 
      icon: <FaEnvelope />,
      color: 'bg-amber-500',
      description: 'View contact submissions'
    },
    { 
      name: 'Sermons', 
      href: '/admin/sermons', 
      icon: <FaBook />,
      color: 'bg-pink-500',
      description: 'Upload and manage sermons'
    },
    { 
      name: 'Settings', 
      href: '/admin/settings', 
      icon: <FaUsersCog />,
      color: 'bg-gray-500',
      description: 'Church settings'
    }
  ];

  const statCards = [
    {
      title: 'Total Members',
      value: stats.totalMembers,
      icon: <FaUsers />,
      color: 'bg-blue-500',
      change: '+12 this month'
    },
    {
      title: 'Pending Applications',
      value: stats.pendingMemberships,
      icon: <FaBell />,
      color: 'bg-amber-500',
      change: 'Needs attention'
    },
    {
      title: 'Upcoming Events',
      value: stats.upcomingEvents,
      icon: <FaCalendar />,
      color: 'bg-green-500',
      change: 'Next 30 days'
    },
    {
      title: 'Active Prayers',
      value: stats.prayerRequests,
      icon: <FaPrayingHands />,
      color: 'bg-purple-500',
      change: 'Being prayed for'
    },
    {
      title: 'This Week Attendance',
      value: stats.thisWeekAttendance,
      icon: <FaChartLine />,
      color: 'bg-pink-500',
      change: '+5% from last week'
    },
    {
      title: 'New Contacts',
      value: stats.recentContacts,
      icon: <FaEnvelope />,
      color: 'bg-indigo-500',
      change: 'Last 7 days'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {user.role === 'admin' ? 'Admin' : 'Staff'} Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Welcome back, {user.displayName || 'User'}!
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-600 text-sm font-medium mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.change}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg text-white text-2xl`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Link key={index} href={action.href}>
                    <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group">
                      <div className="flex items-start gap-4">
                        <div className={`${action.color} p-3 rounded-lg text-white text-xl group-hover:scale-110 transition-transform`}>
                          {action.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                            {action.name}
                          </h3>
                          <p className="text-sm text-gray-600">{action.description}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {recentActivities.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No recent activity</p>
                ) : (
                  recentActivities.map((activity, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {activity.timestamp.toLocaleDateString()} at {activity.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          activity.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                          activity.status === 'approved' ? 'bg-green-100 text-green-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {activity.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Role-specific sections */}
        {user.role === 'admin' && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Admin Tools</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/admin/users">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer">
                  <FaUsersCog className="text-3xl text-blue-500 mb-2" />
                  <h3 className="font-semibold">Manage Users</h3>
                  <p className="text-sm text-gray-600">Staff & role management</p>
                </div>
              </Link>
              <Link href="/admin/reports">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer">
                  <FaChartLine className="text-3xl text-green-500 mb-2" />
                  <h3 className="font-semibold">Reports</h3>
                  <p className="text-sm text-gray-600">Analytics & insights</p>
                </div>
              </Link>
              <Link href="/admin/settings">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer">
                  <FaUsersCog className="text-3xl text-purple-500 mb-2" />
                  <h3 className="font-semibold">Settings</h3>
                  <p className="text-sm text-gray-600">Church configuration</p>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}