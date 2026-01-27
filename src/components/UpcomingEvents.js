'use client';
import { useState } from 'react';
import { format } from 'date-fns';
import { FaCalendar, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

export default function UpcomingEvents({ showViewAllButton = true, limitEvents = true }) {
  const [filter, setFilter] = useState('upcoming');

  // Always use sample data for testing
  const getSampleEvents = () => {
    const now = new Date();
    
    const upcomingEvents = [
      {
        id: 1,
        title: 'Sunday Worship Service',
        date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3, 9, 0),
        location: 'Main Sanctuary',
        description: 'Join us for worship and fellowship',
        image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&h=600&fit=crop'
      },
      {
        id: 2,
        title: 'Community Outreach',
        date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 10, 0),
        location: 'Community Center',
        description: 'Serving our local community',
        image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop'
      },
      {
        id: 3,
        title: 'Youth Night',
        date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 14, 18, 30),
        location: 'Fellowship Hall',
        description: 'Fun and games for youth grades 6-12',
        image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop'
      },
      {
        id: 4,
        title: 'Bible Study',
        date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 21, 19, 0),
        location: 'Conference Room',
        description: 'Weekly Bible study session',
        image: 'https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?w=800&h=600&fit=crop'
      },
    ];

    const pastEvents = [
      {
        id: 5,
        title: 'Thanksgiving Service',
        date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3, 10, 0),
        location: 'Main Sanctuary',
        description: 'Special Thanksgiving worship service',
        image: 'https://images.unsplash.com/photo-1445905595283-21f8ae8a33d2?w=800&h=600&fit=crop'
      },
      {
        id: 6,
        title: 'Fall Festival',
        date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7, 15, 0),
        location: 'Church Grounds',
        description: 'Community fall celebration with games and food',
        image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop'
      },
      {
        id: 7,
        title: 'Prayer Night',
        date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 14, 19, 0),
        location: 'Chapel',
        description: 'Evening of prayer and worship',
        image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=600&fit=crop'
      }
    ];

    let filteredEvents = filter === 'upcoming' ? upcomingEvents : pastEvents;

    if (limitEvents && filter === 'upcoming') {
      return filteredEvents.slice(0, 3);
    }
    return filteredEvents;
  };

  const events = getSampleEvents();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Events</h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          {filter === 'upcoming' 
            ? 'Join us for these exciting upcoming events and activities'
            : 'Take a look at our recent past events'}
        </p>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              filter === 'upcoming'
                ? 'bg-blue-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Upcoming Events ({filter === 'upcoming' ? events.length : 0})
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              filter === 'past'
                ? 'bg-blue-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Past Events ({filter === 'past' ? events.length : 0})
          </button>
        </div>

        {/* Debug info */}
        <div className="text-center mb-4 text-sm text-gray-500">
          Showing {events.length} {filter} events
        </div>

        {events.length === 0 ? (
          <div className="text-center py-12">
            <FaCalendar className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No {filter} events at this time.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {events.map((event) => (
              <div key={event.id} className="card border-l-4 border-blue-900 overflow-hidden p-0">
                {/* Event Image */}
                {event.image && (
                  <div className="w-full h-48 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                
                {/* Event Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-blue-900 mb-3">
                    <FaCalendar />
                    <span className="font-semibold">
                      {format(event.date, 'MMM dd, yyyy')}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <FaClock className="text-blue-900" />
                      <span>{format(event.date, 'h:mm a')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-blue-900" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {showViewAllButton && (
          <div className="text-center mt-12">
            <a href="/events" className="btn-primary">
              View All Events
            </a>
          </div>
        )}
      </div>
    </section>
  );
}