// src/middleware/withAuth.js
'use client';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export function withAuth(Component, allowedRoles = []) {
  return function ProtectedRoute(props) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading) {
        if (!user) {
          router.push('/auth');
        } else if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
          router.push('/');
        }
      }
    }, [user, loading, router]);

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }

    if (!user || (allowedRoles.length > 0 && !allowedRoles.includes(user.role))) {
      return null;
    }

    return <Component {...props} />;
  };
}

// src/components/AdminLayout.js
'use client';
import { useState } from 'react';
import Link from 'link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { 
  FaHome, FaUsers, FaCalendar, FaPrayingHands, FaEnvelope, 
  FaBook, FaChartLine, FaUsersCog, FaBars, FaTimes, FaSignOutAlt 
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
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-blue-900 text-white transition-all duration-300 z-40 ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}>
        <div className="p-4 border-b border-blue-800">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <h2 className="font-bold text-lg">Admin Panel</h2>
                <p className="text-xs text-blue-200">{user?.role === 'admin' ? 'Administrator' : 'Staff Member'}</p>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-blue-800 rounded-lg"
            >
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <div className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-800 text-white' 
                    : 'text-blue-100 hover:bg-blue-800/50'
                }`}>
                  <span className="text-xl">{item.icon}</span>
                  {sidebarOpen && <span className="font-medium">{item.name}</span>}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-blue-800">
          <Link href="/">
            <div className="flex items-center gap-3 p-3 rounded-lg text-blue-100 hover:bg-blue-800/50 transition-colors mb-2">
              <FaHome className="text-xl" />
              {sidebarOpen && <span className="font-medium">Back to Site</span>}
            </div>
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 p-3 rounded-lg text-blue-100 hover:bg-red-600 transition-colors"
          >
            <FaSignOutAlt className="text-xl" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {children}
      </div>
    </div>
  );
}