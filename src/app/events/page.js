'use client';
import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { format, isToday, isTomorrow, isPast } from 'date-fns';
import { FaCalendar, FaClock, FaMapMarkerAlt, FaUsers, FaInfoCircle } from 'react-icons/fa';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('upcoming');

  useEffect(() => {
    fetchEvents();
  }, [filter]);

  const fetchEvents = async () => {
    try {
      const eventsRef = collection(db, 'events');
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      let q;
      if (filter === 'upcoming') {
        q = query(
          eventsRef,
          where('date', '>=', today),
          orderBy('date', 'asc')
        );
      } else {
        q = query(
          eventsRef,
          where('date', '<', today),
          orderBy('date', 'desc')
        );
      }
      
      const snapshot = await getDocs(q);
      const eventsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate()
      }));
      
      setEvents(eventsData);
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents(getSampleEvents());
    } finally {
      setLoading(false);
    }
  };

  const getSampleEvents = () => {
    const baseDate = new Date();
    return [
      {
        id: 1,
        title: 'Sunday Morning Worship',
        date: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 7, 9, 0),
        endTime: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 7, 12, 0),
        location: 'Main Sanctuary',
        category: 'Worship',
        description: 'Join us for powerful worship, biblical teaching, and community fellowship. All ages welcome!',
        capacity: 500,
        registered: 234,
        contactPerson: 'Pastor John Smith',
        contactEmail: 'john@gracechurch.org'
      },
      {
        id: 2,
        title: 'Community Outreach Day',
        date: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 14, 10, 0),
        endTime: new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + 14, 15, 0),
        location: 'Downtown Community Center',
        category: 'Outreach',
        description: 'Serve our local community through food distribution, prayer, and practical help. Volunteer registration required.',
        capacity: 100,
        registered: 67,
        contactPerson: 'Sarah Johnson',
        contactEmail: 'sarah@gracechurch.org'
      },
      {
        id: 3,
        title: 'Youth Christmas Party',
        date: new Date(baseDate.getFullYear(), 11, 22, 18, 30),
        endTime: new Date(baseDate.getFullYear(), 11, 22, 21, 0),
        location: 'Fellowship Hall',
        category: 'Youth',
        description: 'An evening of games, food, and fellowship for youth in grades 6-12. Bring a friend!',
        capacity: 80,
        registered: 52,
        contactPerson: 'Michael Davis',
        contactEmail: 'michael@gracechurch.org'
      },
      {
        id: 4,
        title: 'Christmas Eve Candlelight Service',
        date: new Date(baseDate.getFullYear(), 11, 24, 19, 0),
        endTime: new Date(baseDate.getFullYear(), 11, 24, 20, 30),
        location: 'Main Sanctuary',
        category: 'Worship',
        description: 'Celebrate the birth of Jesus with this special candlelight service filled with carols, scripture, and hope.',
        capacity: 600,
        registered: 423,
        contactPerson: 'Pastor John Smith',
        contactEmail: 'john@gracechurch.org'
      },
      {
        id: 5,
        title: 'New Year Prayer Night',
        date: new Date(baseDate.getFullYear(), 11, 31, 22, 0),
        endTime: new Date(baseDate.getFullYear() + 1, 0, 1, 0, 30),
        location: 'Main Sanctuary',
        category: 'Prayer',
        description: 'Ring in the new year with prayer, worship, and seeking God\'s direction for the year ahead.',
        capacity: 300,
        registered: 145,
        contactPerson: 'Pastor John Smith',
        contactEmail: 'john@gracechurch.org'
      },
      {
        id: 6,
        title: 'Marriage Enrichment Workshop',
        date: new Date(baseDate.getFullYear() + 1, 0, 12, 9, 0),
        endTime: new Date(baseDate.getFullYear() + 1, 0, 12, 16, 0),
        location: 'Conference Room B',
        category: 'Workshop',
        description: 'A full-day workshop designed to strengthen marriages through biblical principles and practical tools.',
        capacity: 40,
        registered: 28,
        contactPerson: 'Emily Wilson',
        contactEmail: 'emily@gracechurch.org'
      }
    ].filter(event => filter === 'upcoming' ? !isPast(event.date) : isPast(event.date));
  };

  const getDateLabel = (date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'EEEE, MMMM d, yyyy');
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Worship': 'bg-blue-100 text-blue-900',
      'Outreach': 'bg-green-100 text-green-900',
      'Youth': 'bg-purple-100 text-purple-900',
      'Prayer': 'bg-amber-100 text-amber-900',
      'Workshop': 'bg-pink-100 text-pink-900',
      'default': 'bg-gray-100 text-gray-900'
    };
    return colors[category] || colors.default;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

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

      {/* Filter Tabs */}
      <section className="py-6 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                filter === 'upcoming'
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setFilter('past')}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                filter === 'past'
                  ? 'bg-blue-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Past Events
            </button>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {events.length === 0 ? (
              <div className="text-center py-12">
                <FaCalendar className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No {filter} events at this time.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {events.map((event) => (
                  <div key={event.id} className="card hover:shadow-xl transition-shadow duration-300">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Date Box */}
                      <div className="flex-shrink-0">
                        <div className="bg-blue-900 text-white rounded-lg p-4 text-center w-24">
                          <div className="text-3xl font-bold">
                            {format(event.date, 'd')}
                          </div>
                          <div className="text-sm uppercase">
                            {format(event.date, 'MMM')}
                          </div>
                          <div className="text-xs mt-1">
                            {format(event.date, 'yyyy')}
                          </div>
                        </div>
                      </div>

                      {/* Event Details */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                          <div>
                            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${getCategoryColor(event.category)} mb-2`}>
                              {event.category}
                            </span>
                            <h3 className="text-2xl font-bold text-gray-900">
                              {event.title}
                            </h3>
                          </div>
                          {event.capacity && (
                            <div className="text-right">
                              <div className="flex items-center gap-2 text-gray-600 text-sm">
                                <FaUsers />
                                <span>{event.registered} / {event.capacity}</span>
                              </div>
                              <div className="w-32 h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                                <div 
                                  className="h-full bg-blue-900"
                                  style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-3 mb-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <FaCalendar className="text-blue-900" />
                            <span>{getDateLabel(event.date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaClock className="text-blue-900" />
                            <span>
                              {format(event.date, 'h:mm a')} - {format(event.endTime, 'h:mm a')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-blue-900" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaInfoCircle className="text-blue-900" />
                            <span>Contact: {event.contactPerson}</span>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-4">
                          {event.description}
                        </p>

                        {!isPast(event.date) && (
                          <div className="flex gap-3">
                            <button className="btn-primary">
                              Register Now
                            </button>
                            <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                              Learn More
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

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