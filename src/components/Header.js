// src/components/Header.js
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FaBars, FaTimes, FaPhone, FaMapMarkerAlt, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import BibleVerseBanner from './BibleVerseBanner';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Events', href: '/events' },
    { name: 'Plan Visit', href: '/plan-visit' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Bible Verse Banner */}
      <BibleVerseBanner />

      {/* Top Bar */}
      <div className="bg-gray-800 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a href="tel:5551234567" className="flex items-center gap-1 hover:text-gray-300">
              <FaPhone className="text-xs" />
              <span>(555) 123-4567</span>
            </a>
            <div className="hidden md:flex items-center gap-1">
              <FaMapMarkerAlt className="text-xs" />
              <span>University Park, Udaperadeniya Road, Peradeniya, Sri Lanka.</span>
            </div>
          </div>
          <div className="text-xs md:text-sm">
            Service Times: Sun 4PM
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo with Image */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="relative w-12 h-12 md:w-14 md:h-14">
                <Image
                  src="/logo.png"
                  alt="Chapel Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg md:text-xl text-gray-800 leading-tight">
                  The Chapel of Christ the Risen Lord
                </span>
                <span className="text-xs md:text-sm text-gray-600">
                  Gal Palliya
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}

              {user && (user.role === 'admin' || user.role === 'staff') && (
                <Link
                  href="/admin"
                  className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
                >
                  Admin Panel
                </Link>
              )}

              {/* User Menu */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <FaUser />
                    <span>{user.displayName}</span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <FaSignOutAlt />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Login / Register
                </Link>
              )}

              <Link
                href="/give"
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Give
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t bg-white">
            <div className="px-4 py-4 space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {user && (user.role === 'admin' || user.role === 'staff') && (
                <Link
                  href="/admin"
                  className="block px-3 py-2 text-purple-600 hover:bg-gray-50 rounded-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Panel
                </Link>
              )}

              {user ? (
                <>
                  <div className="border-t pt-3 mt-3">
                    <div className="px-3 py-2 text-sm text-gray-500">
                      {user.displayName}
                    </div>
                    <Link
                      href="/profile"
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FaUser />
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-red-600 hover:bg-gray-50 rounded-lg flex items-center gap-2"
                    >
                      <FaSignOutAlt />
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login / Register
                </Link>
              )}

              <Link
                href="/give"
                className="block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Give
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}