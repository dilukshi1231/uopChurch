// src/components/Hero.js
import Link from 'next/link';
import { FaPlay, FaCalendarAlt, FaChurch, FaClock } from 'react-icons/fa';

export default function Hero() {
  return (
    <div className="relative hero-gradient text-white overflow-hidden min-h-[600px] md:min-h-[700px] flex items-center">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/chapel.mp4" type="video/mp4" />
        <source src="/videos/chapel.webm" type="video/webm" />
      </video>

      {/* Enhanced Layered Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/75"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-transparent to-amber-600/20"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent"></div>

      {/* Animated Floating Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-40 right-20 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Welcome Badge - Enhanced */}
          <div className="inline-block mb-8 fade-in animate-bounce-slow">
            <span className="bg-white/20 backdrop-blur-lg px-8 py-3 rounded-full text-sm md:text-base font-semibold border-2 border-white/40 shadow-2xl hover:bg-white/30 hover:scale-105 transition-all duration-300 inline-flex items-center gap-2">
              <FaChurch className="text-amber-300 animate-pulse" />
              <span className="bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
                Welcome to The Church of Christ the Risen Lord
              </span>
              <FaChurch className="text-amber-300 animate-pulse" />
            </span>
          </div>

          {/* Main Heading - Enhanced with Multiple Effects */}
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-extrabold mb-8 slide-in-left leading-tight">
            <span className="inline-block drop-shadow-2xl hover:scale-105 transition-transform duration-300">
              Growing in Faith
            </span>
            <span className="block mt-3 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 bg-clip-text text-transparent drop-shadow-2xl animate-gradient">
              Together
            </span>
          </h1>

          {/* Subheading - Enhanced */}
          <div className="mb-12 slide-in-right">
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-100 leading-relaxed max-w-3xl mx-auto drop-shadow-2xl mb-4">
              A place where faith comes alive and community grows stronger.
            </p>
            <p className="text-2xl md:text-3xl font-bold text-white drop-shadow-2xl bg-white/10 backdrop-blur-sm inline-block px-6 py-2 rounded-full border border-white/20">
              Join us this Sunday!
            </p>
          </div>


          {/* Service Times Info - Enhanced Card */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-8 bg-white/15 backdrop-blur-xl px-10 py-6 rounded-3xl border-2 border-white/30 shadow-2xl hover:shadow-3xl hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 bg-amber-500/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                <FaClock className="text-2xl text-white" />
              </div>
              <div>
                <p className="text-sm text-amber-200 font-semibold mb-1 tracking-wide uppercase">Sunday Services</p>
                <p className="text-3xl md:text-4xl font-extrabold drop-shadow-lg">@4:00 PM</p>
              </div>
            </div>
            
            <div className="hidden sm:block w-px h-12 bg-white/30"></div>
            
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 bg-blue-500/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                <FaChurch className="text-2xl text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-200 font-semibold mb-1 tracking-wide uppercase">Location</p>
                <p className="text-xl md:text-2xl font-bold drop-shadow-lg">Gal Palliya</p>
              </div>
            </div>
          </div>

          {/* Additional Info Tags */}
          
        </div>
      </div>
      
      {/* Enhanced Decorative Wave - Reduced left curvature */}
      <div className="absolute bottom-[-2px] w-full z-20">
        <svg viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{stopColor: '#ffffff', stopOpacity: 1}} />
              <stop offset="50%" style={{stopColor: '#f0f9ff', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#ffffff', stopOpacity: 1}} />
            </linearGradient>
          </defs>
          {/* Reduced left side curvature - starts higher (Y=80 instead of Y=60) */}
          <path d="M0,200 L0,80 Q360,30 720,55 T1440,70 L1440,200 Z" 
                fill="url(#waveGradient)"
                stroke="none"/>
        </svg>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}