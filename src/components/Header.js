// src/components/Header.js
'use client';
import Link from 'next/link';
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
    { name: 'Give', href: '/giving' },
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
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Bible Verse Banner */}
      <BibleVerseBanner />
      
      {/* Top Bar */}
      <div className="bg-primary text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center text-xs md:text-sm gap-2">
            <div className="flex items-center gap-3 md:gap-6">
              <div className="flex items-center gap-2">
                <FaPhone className="text-xs flex-shrink-0" />
                <span className="whitespace-nowrap">(555) 123-4567</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <FaMapMarkerAlt className="text-xs flex-shrink-0" />
                <span className="whitespace-nowrap">123 Faith Street, Your City, ST 12345</span>
              </div>
            </div>
            <div className="text-xs md:text-sm whitespace-nowrap">
              Service Times: Sun 9AM & 11AM
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-white font-bold text-xl">GC</span>
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-primary leading-tight">Grace Church</h1>
              <p className="text-xs text-gray-600 hidden sm:block">Growing in Faith Together</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-secondary font-medium transition-colors text-sm xl:text-base"
              >
                {item.name}
              </Link>
            ))}
            
            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <FaUser className="text-white text-sm" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.displayName}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 border border-gray-200">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <FaSignOutAlt />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth">
                <button className="bg-secondary text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-secondary-700 transition-colors text-sm xl:text-base whitespace-nowrap">
                  Login / Register
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-2xl text-gray-700 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-secondary font-medium py-2 px-3 rounded-lg hover:bg-gray-50 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {user ? (
                <>
                  <div className="border-t pt-3">
                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg mb-2">
                      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                        <FaUser className="text-white text-sm" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{user.displayName}</span>
                    </div>
                    <Link
                      href="/profile"
                      className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
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
                <Link href="/auth" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary-700 transition-colors">
                    Login / Register
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}