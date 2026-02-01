'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { 
  FaHome, FaUsers, FaCalendar, FaPrayingHands, FaEnvelope, 
  FaBook, FaChartLine, FaUsersCog, FaBars, FaTimes, FaSignOutAlt,
  FaBell
} from 'react-icons/fa';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: <FaHome /> },
    { name: 'Memberships', href: '/admin/memberships', icon: <FaUsers /> },
    { name: 'Events', href: '/admin/events', icon: <FaCalendar /> },
    { name: 'Prayer Requests', href: '/admin/prayers', icon: <FaPrayingHands /> },
    { name: 'Contacts', href: '/admin/contacts', icon: <FaEnvelope /> },
    { name: 'Sermons', href: '/admin/sermons', icon: <FaBook /> },
  ];

  // Admin-only navigation
  if (user?.role === 'admin') {
    navigation.push(
      { name: 'Users', href: '/admin/users', icon: <FaUsersCog /> },
      { name: 'Reports', href: '/admin/reports', icon: <FaChartLine /> }
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header - Clean and Simple */}
      <header className="bg-white border-b border-gray-200 fixed top-0 right-0 left-0 z-30">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden bg-white shadow-md">
              <Image 
                src="/images/logo.png" 
                alt="Church Logo" 
                width={40} 
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
              <p className="text-xs text-gray-500">The Church of Christ the Risen Lord</p>
            </div>
          </div>

          {/* Right Side - User Info */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <FaBell className="text-xl" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{user?.displayName || 'Admin'}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role || 'Administrator'}</p>
              </div>
              <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-semibold">
                {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'A'}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Add padding-top to account for fixed header */}
      <div className="pt-[73px] min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className={`fixed top-[73px] left-0 h-[calc(100vh-73px)] bg-blue-900 text-white transition-all duration-300 z-40 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}>
          <div className="p-4 border-b border-blue-800">
            <div className="flex items-center justify-between">
              {sidebarOpen && (
                <div>
                  <h2 className="font-bold text-lg">Navigation</h2>
                  <p className="text-xs text-blue-200">{user?.role === 'admin' ? 'Full Access' : 'Staff Access'}</p>
                </div>
              )}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-blue-800 rounded-lg transition-colors"
                title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
              >
                {sidebarOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>

          <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100%-180px)]">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <div className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-800 text-white shadow-md' 
                      : 'text-blue-100 hover:bg-blue-800/50'
                  }`}>
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    {sidebarOpen && <span className="font-medium">{item.name}</span>}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Navigation */}
          <div className="absolute bottom-0 w-full p-4 border-t border-blue-800 bg-blue-900">
            <Link href="/">
              <div className="flex items-center gap-3 p-3 rounded-lg text-blue-100 hover:bg-blue-800/50 transition-colors mb-2">
                <FaHome className="text-xl flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">Back to Site</span>}
              </div>
            </Link>
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 p-3 rounded-lg text-blue-100 hover:bg-red-600 transition-colors"
              title="Sign out"
            >
              <FaSignOutAlt className="text-xl flex-shrink-0" />
              {sidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
          {children}
        </div>
      </div>
    </div>
  );
}