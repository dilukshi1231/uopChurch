// src/app/dashboard/page.js
'use client';
import { useAuth } from '@/contexts/AuthContext';
import withAuth from '@/components/withAuth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  FaCalendar, FaPrayingHands, FaBook, FaUsers, 
  FaHeart, FaChurch, FaArrowRight 
} from 'react-icons/fa';

function UserDashboard() {
  const { user } = useAuth();

  const quickLinks = [
    {
      title: 'My Prayer Requests',
      description: 'View and manage your prayer requests',
      icon: <FaPrayingHands className="text-4xl" />,
      color: 'from-purple-500 to-purple-600',
      href: '/prayer'
    },
    {
      title: 'Upcoming Events',
      description: 'See events you\'re registered for',
      icon: <FaCalendar className="text-4xl" />,
      color: 'from-blue-500 to-blue-600',
      href: '/events'
    },
    {
      title: 'Latest Sermons',
      description: 'Watch recent sermon recordings',
      icon: <FaBook className="text-4xl" />,
      color: 'from-amber-500 to-amber-600',
      href: '/about'
    },
    {
      title: 'Small Groups',
      description: 'Connect with your small groups',
      icon: <FaUsers className="text-4xl" />,
      color: 'from-green-500 to-green-600',
      href: '/small-groups'
    }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-50">
        <div className="container mx-auto px-4 py-12">
          {/* Welcome Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome, {user?.displayName || user?.email?.split('@')[0]}!
                </h1>
                <p className="text-gray-600">Member Dashboard</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-1">Member Since</p>
                <p className="text-lg font-semibold text-gray-900">
                  {user?.createdAt ? new Date(user.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-1">Prayer Requests</p>
                <p className="text-lg font-semibold text-gray-900">Active</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-1">Events Attended</p>
                <p className="text-lg font-semibold text-gray-900">Welcome!</p>
              </div>
            </div>
          </div>

          {/* Quick Links Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Access</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
                    <div className={`bg-gradient-to-br ${link.color} p-6 text-white`}>
                      {link.icon}
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {link.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">{link.description}</p>
                      <div className="flex items-center text-blue-600 font-medium text-sm group-hover:gap-2 transition-all">
                        <span>View More</span>
                        <FaArrowRight className="ml-1 group-hover:ml-2 transition-all" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Announcements</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-600 pl-4 py-2">
                <h3 className="font-semibold text-gray-900 mb-1">Welcome to Grace Church!</h3>
                <p className="text-gray-600 text-sm mb-2">
                  We're glad you're here. Join us for our Sunday services and connect with our community.
                </p>
                <p className="text-xs text-gray-500">Posted recently</p>
              </div>
              <div className="border-l-4 border-green-600 pl-4 py-2">
                <h3 className="font-semibold text-gray-900 mb-1">Small Groups Starting</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Sign up for our small groups and connect with other believers in a more intimate setting
                </p>
                <p className="text-xs text-gray-500">Posted this week</p>
              </div>
              <div className="border-l-4 border-purple-600 pl-4 py-2">
                <h3 className="font-semibold text-gray-900 mb-1">Community Outreach Event</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Join us in serving the community and making a difference together
                </p>
                <p className="text-xs text-gray-500">Coming soon</p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl shadow-lg p-8 text-white text-center">
            <FaHeart className="text-5xl mx-auto mb-4 animate-pulse" />
            <h2 className="text-3xl font-bold mb-4">Get Involved</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              There are many ways to serve and grow in your faith. Join a ministry, volunteer, 
              or connect with a small group today!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/ministries">
                <button className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Explore Ministries
                </button>
              </Link>
              <Link href="/small-groups">
                <button className="bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Join a Small Group
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// Protect this route - allow all authenticated users
export default withAuth(UserDashboard, ['user', 'admin', 'staff']);