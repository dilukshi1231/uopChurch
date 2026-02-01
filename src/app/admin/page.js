'use client';
import { useAuth } from '@/contexts/AuthContext';
import withAuth from '@/components/withAuth';
import AdminLayout from '@/components/AdminLayout';
import { 
  FaUsers, FaCalendar, FaPrayingHands, FaEnvelope, 
  FaBook, FaChartLine, FaCheckCircle, FaExclamationCircle 
} from 'react-icons/fa';

function AdminDashboard() {
  const { user } = useAuth();

  // Mock stats - replace with real data from Firebase
  const stats = [
    {
      title: 'Total Members',
      value: '245',
      icon: <FaUsers className="text-4xl" />,
      color: 'bg-blue-500',
      change: '+12 this month'
    },
    {
      title: 'Upcoming Events',
      value: '8',
      icon: <FaCalendar className="text-4xl" />,
      color: 'bg-green-500',
      change: '3 this week'
    },
    {
      title: 'Prayer Requests',
      value: '32',
      icon: <FaPrayingHands className="text-4xl" />,
      color: 'bg-purple-500',
      change: '5 pending'
    },
    {
      title: 'Messages',
      value: '18',
      icon: <FaEnvelope className="text-4xl" />,
      color: 'bg-amber-500',
      change: '7 unread'
    }
  ];

  const recentActivities = [
    {
      type: 'membership',
      message: 'New membership application from John Doe',
      time: '2 hours ago',
      status: 'pending'
    },
    {
      type: 'event',
      message: 'Bible Study event created for next Sunday',
      time: '5 hours ago',
      status: 'completed'
    },
    {
      type: 'prayer',
      message: 'New prayer request submitted by Sarah Johnson',
      time: '1 day ago',
      status: 'pending'
    },
    {
      type: 'contact',
      message: 'Contact form submission from visitor',
      time: '2 days ago',
      status: 'completed'
    }
  ];

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.displayName || user?.email}!
          </h1>
          <p className="text-gray-600">
            {user?.role === 'admin' ? 'Administrator Dashboard' : 'Staff Dashboard'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} text-white p-3 rounded-lg`}>
                  {stat.icon}
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
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
            ))}
          </div>
        </div>

        {/* Quick Actions - Admin Only */}
        {user?.role === 'admin' && (
          <div className="mt-8 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg shadow-md p-6 text-white">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 text-left transition-colors">
                <FaUsers className="text-2xl mb-2" />
                <p className="font-medium">Manage Users</p>
                <p className="text-sm text-blue-100">Add or edit user roles</p>
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 text-left transition-colors">
                <FaChartLine className="text-2xl mb-2" />
                <p className="font-medium">View Reports</p>
                <p className="text-sm text-blue-100">Analytics and insights</p>
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 text-left transition-colors">
                <FaBook className="text-2xl mb-2" />
                <p className="font-medium">Upload Sermon</p>
                <p className="text-sm text-blue-100">Add new sermon content</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

// Protect this route - only allow admin and staff roles
export default withAuth(AdminDashboard, ['admin', 'staff']);