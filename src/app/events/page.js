'use client';
import UpcomingEvents from '@/components/UpcomingEvents';
import { FaCalendarAlt, FaEnvelope, FaBell, FaUsers } from 'react-icons/fa';

export default function EventsPage() {
  return (
    <div className="relative">
      {/* Background Image with MAXIMUM VISIBILITY */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Much lighter gradient to show the image clearly */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white/60 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073')",
            backgroundBlendMode: 'normal'
          }}
        ></div>
      </div>

      <div className="relative z-20">
        {/* Enhanced Hero Section - Now with better contrast */}
        <section className="relative py-24 overflow-hidden">
          {/* Darker overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent"></div>
          
          {/* Decorative Floating Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block mb-6 p-4 bg-blue-600/90 backdrop-blur-md rounded-full shadow-2xl">
                <FaCalendarAlt className="text-5xl text-white" />
              </div>
              <h1 className="text-6xl md:text-7xl font-extrabold mb-6 text-white drop-shadow-2xl">
                Events & Calendar
              </h1>
              <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed drop-shadow-xl bg-black/30 backdrop-blur-sm inline-block px-8 py-4 rounded-2xl">
                Connect, grow, and serve through our community events and activities
              </p>
              <div className="mt-10 inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm px-8 py-4 rounded-full shadow-2xl">
                <FaUsers className="text-3xl text-blue-900" />
                <span className="text-xl font-bold text-blue-900">Join Our Vibrant Community</span>
              </div>
            </div>
          </div>
        </section>

        {/* UpcomingEvents Component with Enhanced Container */}
        <section className="py-12 relative">
          <div className="container mx-auto px-4">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 border-2 border-white/50">
              <UpcomingEvents showViewAllButton={false} limitEvents={false} />
            </div>
          </div>
        </section>

        {/* Enhanced Subscribe to Calendar Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 md:p-14 border-2 border-white/50">
                <div className="text-center mb-10">
                  <div className="inline-block mb-6 p-4 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full shadow-xl">
                    <FaBell className="text-4xl text-white" />
                  </div>
                  <h2 className="text-5xl font-extrabold text-gray-900 mb-4">Stay Updated</h2>
                  <p className="text-2xl text-gray-700 leading-relaxed font-medium">
                    Subscribe to our events calendar and never miss what's happening at Grace Church
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-12">
                  <div className="flex-1 relative">
                    <FaEnvelope className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500 text-2xl" />
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full pl-14 pr-5 py-5 rounded-2xl border-3 border-gray-300 focus:outline-none focus:border-blue-900 focus:ring-4 focus:ring-blue-200 transition-all bg-white text-lg font-medium"
                    />
                  </div>
                  <button className="bg-gradient-to-r from-blue-900 to-blue-700 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-blue-800 hover:to-blue-600 transition-all duration-300 shadow-xl hover:shadow-2xl whitespace-nowrap transform hover:scale-105">
                    Subscribe Now
                  </button>
                </div>

                {/* Additional Benefits */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <FaCalendarAlt className="text-white text-2xl" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">Event Reminders</h3>
                    <p className="text-base text-gray-700 font-medium">Get notified before events start</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl border-2 border-amber-200 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="w-16 h-16 bg-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <FaBell className="text-white text-2xl" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">Weekly Updates</h3>
                    <p className="text-base text-gray-700 font-medium">Stay informed about upcoming activities</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-200 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <FaUsers className="text-white text-2xl" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">Exclusive Access</h3>
                    <p className="text-base text-gray-700 font-medium">Early registration for special events</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Call to Action */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-amber-700"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070')] bg-cover bg-center opacity-15"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-3xl mx-auto bg-white/15 backdrop-blur-xl rounded-3xl p-14 border-2 border-white/30 shadow-2xl">
              <div className="inline-block mb-8 p-4 bg-white/25 backdrop-blur-md rounded-full shadow-xl">
                <FaCalendarAlt className="text-5xl text-white" />
              </div>
              <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white drop-shadow-2xl">Want to Host an Event?</h2>
              <p className="text-2xl text-white font-medium mb-12 leading-relaxed drop-shadow-lg">
                Have an idea for a ministry event or community gathering? We'd love to hear about it and help bring your vision to life!
              </p>
              <a 
                href="/contact" 
                className="inline-block bg-white text-blue-900 px-12 py-5 rounded-full font-bold text-xl hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-110"
              >
                Contact Us Today
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}