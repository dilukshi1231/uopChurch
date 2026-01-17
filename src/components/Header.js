'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import BibleVerseBanner from './BibleVerseBanner';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Sermons', href: '/sermons' },
    { name: 'Events', href: '/events' },
    { name: 'Ministries', href: '/ministries' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Bible Verse Banner */}
      <BibleVerseBanner />
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2">
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
            <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xl">GC</span>
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">Grace Church</h1>
              <p className="text-xs text-gray-600 hidden sm:block">Growing in Faith Together</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-900 font-medium transition-colors text-sm xl:text-base"
              >
                {item.name}
              </Link>
            ))}
            <Link href="/giving">
              <button className="bg-amber-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-amber-700 transition-colors text-sm xl:text-base whitespace-nowrap">
                Give
              </button>
            </Link>
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
                  className="text-gray-700 hover:text-blue-900 font-medium py-2 px-3 rounded-lg hover:bg-gray-50 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link href="/giving" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
                  Give
                </button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}