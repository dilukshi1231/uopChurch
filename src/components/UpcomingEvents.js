'use client';
import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { format, isToday, isTomorrow, isPast, addDays } from 'date-fns';
import { FaCalendar, FaClock, FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa';
import Image from 'next/image';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('upcoming');

  useEffect(() => {
    fetchEvents();
  }, [filter]);

  const getGoodFridayDate = () => {
    // Good Friday 2026 is April 3rd
    return new Date(2026, 3, 3, 9, 0); // April 3, 2026, 9:00 AM
  };

  const getSecondSundayOfMonth = (year, month) => {
    const firstDay = new Date(year, month, 1);
    let firstSunday = new Date(firstDay);
    
    // Find first Sunday
    while (firstSunday.getDay() !== 0) {
      firstSunday.setDate(firstSunday.getDate() + 1);
    }
    
    // Add 7 days to get second Sunday
    const secondSunday = new Date(firstSunday);
    secondSunday.setDate(firstSunday.getDate() + 7);
    secondSunday.setHours(10, 0, 0, 0);
    
    return secondSunday;
  };

  const getSampleEvents = () => {
    const today = new Date();
    
    return [
      {
        id: 1,
        title: 'Good Friday Service',
        date: getGoodFridayDate(),
        endTime: new Date(2026, 3, 3, 11, 0),
        location: 'Main Sanctuary - University of Peradeniya Christian Chapel',
        category: 'Worship',
        description: 'Join us as we remember Christ\'s sacrifice on the cross and celebrate His love for us. A solemn service of reflection, prayer, and worship.',
        contactPerson: 'Pastor John',
        contactEmail: 'pastor@chapel.lk',
        imageUrl: '/images/events/good-friday.jpg'
      },
      {
        id: 2,
        title: 'Annual General Meeting (AGM)',
        date: getSecondSundayOfMonth(2026, 1), // February 2026
        endTime: new Date(2026, 1, 8, 13, 0),
        location: 'Fellowship Hall - University of Peradeniya Christian Chapel',
        category: 'Meeting',
        description: 'Our yearly AGM to review the past year, discuss church matters, and plan for the future. All members are encouraged to attend and participate.',
        contactPerson: 'Church Secretary',
        contactEmail: 'secretary@chapel.lk',
        imageUrl: '/images/events/agm.jpg'
      },
      {
        id: 3,
        title: 'Sunday Worship Service',
        date: addDays(today, 0),
        endTime: addDays(new Date(today.setHours(17, 0, 0, 0)), 0),
        location: 'Main Sanctuary - University of Peradeniya Christian Chapel',
        category: 'Worship',
        description: 'Join us for powerful worship, biblical teaching, and community fellowship. All ages welcome!',
        contactPerson: 'Worship Team',
        contactEmail: 'worship@chapel.lk',
        imageUrl: '/images/events/sunday-worship.jpg'
      },
      {
        id: 4,
        title: 'Youth Fellowship Night',
        date: addDays(today, 5),
        endTime: addDays(new Date(today.setHours(20, 0, 0, 0)), 5),
        location: 'Youth Center',
        category: 'Youth',
        description: 'An evening of worship, games, and fellowship for university students. Bring a friend!',
        contactPerson: 'Youth Pastor',
        contactEmail: 'youth@chapel.lk',
        imageUrl: '/images/events/youth.jpg'
      },
      {
        id: 5,
        title: 'Prayer Meeting',
        date: addDays(today, 3),
        endTime: addDays(new Date(today.setHours(20, 0, 0, 0)), 3),
        location: 'Prayer Room',
        category: 'Prayer',
        description: 'Midweek prayer meeting to seek God together and pray for our community.',
        contactPerson: 'Prayer Coordinator',
        contactEmail: 'prayer@chapel.lk',
        imageUrl: '/images/events/prayer.jpg'
      },
      {
        id: 6,
        title: 'Bible Study Group',
        date: addDays(today, 2),
        endTime: addDays(new Date(today.setHours(19, 30, 0, 0)), 2),
        location: 'Fellowship Hall',
        category: 'Study',
        description: 'Weekly Bible study exploring the book of Acts. All are welcome!',
        contactPerson: 'Study Leader',
        contactEmail: 'study@chapel.lk',
        imageUrl: '/images/events/bible-study.jpg'
      }
    ];
  };

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
      
      if (snapshot.empty) {
        // If no events in Firebase, use sample events
        console.log('No events in Firebase, using sample data');
        const sampleEvents = getSampleEvents();
        const filteredSamples = filter === 'upcoming' 
          ? sampleEvents.filter(e => !isPast(e.date))
          : sampleEvents.filter(e => isPast(e.date));
        setEvents(filteredSamples);
      } else {
        const eventsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date.toDate(),
          endTime: doc.data().endTime?.toDate()
        }));
        setEvents(eventsData);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      // Always fall back to sample events on error
      const sampleEvents = getSampleEvents();
      const filteredSamples = filter === 'upcoming' 
        ? sampleEvents.filter(e => !isPast(e.date))
        : sampleEvents.filter(e => isPast(e.date));
      setEvents(filteredSamples);
    } finally {
      setLoading(false);
    }
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
      'Meeting': 'bg-indigo-100 text-indigo-900',
      'Study': 'bg-teal-100 text-teal-900',
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
                  <div key={event.id} className="card hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Event Image */}
                      {event.imageUrl && (
                        <div className="md:w-64 h-48 md:h-auto flex-shrink-0 relative bg-gradient-to-br from-blue-900 to-blue-700">
                          <Image
                            src={event.imageUrl}
                            alt={event.title}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}

                      {/* Event Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${getCategoryColor(event.category)} mb-2`}>
                              {event.category}
                            </span>
                            <h3 className="text-2xl font-bold text-gray-900">
                              {event.title}
                            </h3>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-3 mb-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <FaCalendar className="text-blue-900" />
                            <span>{getDateLabel(event.date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaClock className="text-blue-900" />
                            <span>
                              {format(event.date, 'h:mm a')}
                              {event.endTime && ` - ${format(event.endTime, 'h:mm a')}`}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 md:col-span-2">
                            <FaMapMarkerAlt className="text-blue-900" />
                            <span>{event.location}</span>
                          </div>
                          {event.contactPerson && (
                            <div className="flex items-center gap-2 md:col-span-2">
                              <FaInfoCircle className="text-blue-900" />
                              <span>Contact: {event.contactPerson}</span>
                            </div>
                          )}
                        </div>

                        <p className="text-gray-700">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Know More?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Have questions about any of our events? We'd love to hear from you!
          </p>
          <a href="/contact" className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}