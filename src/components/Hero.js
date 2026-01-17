import Link from 'next/link';
import { FaPlay, FaCalendarAlt } from 'react-icons/fa';

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
        {/* Fallback for browsers that don't support video */}
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>

      {/* Optional: Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-transparent to-blue-900/40"></div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Welcome Badge */}
          <div className="inline-block mb-6 fade-in">
            <span className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full text-sm font-semibold border border-white/30 shadow-lg">
              ✨ Welcome to Grace Church
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 slide-in-left leading-tight drop-shadow-2xl">
            Growing in Faith
            <span className="block mt-2 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
              Together
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl lg:text-3xl mb-10 text-blue-100 slide-in-right leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
            A place where faith comes alive and community grows stronger. 
            <span className="block mt-2 font-semibold text-white">Join us this Sunday!</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in mb-12">
            <Link href="/events" className="group">
              <button className="bg-white text-blue-900 px-10 py-5 rounded-xl font-bold text-lg 
                               hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-3xl 
                               transform hover:-translate-y-1 flex items-center gap-3 w-full sm:w-auto justify-center">
                <FaCalendarAlt className="group-hover:scale-110 transition-transform" />
                Plan Your Visit
              </button>
            </Link>
            <Link href="/sermons" className="group">
              <button className="bg-white/10 backdrop-blur-md border-2 border-white px-10 py-5 rounded-xl font-bold text-lg 
                               hover:bg-white hover:text-blue-900 transition-all duration-300 
                               transform hover:-translate-y-1 flex items-center gap-3 w-full sm:w-auto justify-center shadow-xl">
                <FaPlay className="group-hover:scale-110 transition-transform" />
                Watch Online
              </button>
            </Link>
          </div>

          {/* Service Times Info */}
          <div className="inline-flex items-center gap-6 bg-white/10 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/20 shadow-xl">
            <div className="text-center">
              <p className="text-sm text-blue-200 mb-1">Sunday Services</p>
              <p className="text-2xl font-bold">9:00 AM</p>
            </div>
            <div className="w-px h-12 bg-white/30"></div>
            <div className="text-center">
              <p className="text-sm text-blue-200 mb-1">& Also at</p>
              <p className="text-2xl font-bold">11:00 AM</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Wave */}
      <div className="absolute bottom-0 w-full z-20">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 80C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
                fill="white" className="drop-shadow-lg"/>
        </svg>
      </div>
    </div>
  );
}