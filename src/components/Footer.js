// src/components/Footer.js
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Grace Church</h3>
            <p className="text-gray-300 text-sm">
              A community of believers growing in faith, hope, and love. Join us as we worship together and serve our community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-gray-300 hover:text-secondary transition-colors">About Us</Link></li>
              <li><Link href="/sermons" className="text-gray-300 hover:text-secondary transition-colors">Sermons</Link></li>
              <li><Link href="/events" className="text-gray-300 hover:text-secondary transition-colors">Events</Link></li>
              <li><Link href="/ministries" className="text-gray-300 hover:text-secondary transition-colors">Ministries</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>123 Faith Street</li>
              <li>Your City, ST 12345</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@gracechurch.org</li>
            </ul>
          </div>

          {/* Service Times */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Service Times</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Sunday Worship: 9:00 AM</li>
              <li>Sunday Worship: 11:00 AM</li>
              <li>Wednesday Prayer: 7:00 PM</li>
              <li>Youth Group: Fri 6:30 PM</li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-300 mb-4 md:mb-0">
            © 2024 Grace Church. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-300 hover:text-secondary transition-colors text-xl"><FaFacebook /></a>
            <a href="#" className="text-gray-300 hover:text-secondary transition-colors text-xl"><FaTwitter /></a>
            <a href="#" className="text-gray-300 hover:text-secondary transition-colors text-xl"><FaInstagram /></a>
            <a href="#" className="text-gray-300 hover:text-secondary transition-colors text-xl"><FaYoutube /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}