'use client';
import UpcomingEvents from '@/components/UpcomingEvents';

export default function EventsPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Events & Calendar</h1>
            <p className="text-xl text-blue-100">
              Connect, grow, and serve through our community events and activities
            </p>
          </div>
        </div>
      </section>

      {/* UpcomingEvents Component with Filter */}
      <UpcomingEvents showViewAllButton={false} limitEvents={false} />

      {/* Subscribe to Calendar */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-title">Stay Updated</h2>
            <p className="text-gray-600 mb-8">
              Subscribe to our events calendar and never miss what's happening at Grace Church
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-900"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Host an Event?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Have an idea for a ministry event or community gathering? We'd love to hear about it!
          </p>
          <a href="/contact" className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}