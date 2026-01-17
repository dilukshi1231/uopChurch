'use client';
import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { format } from 'date-fns';
import { FaCalendar, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

export default function UpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const eventsRef = collection(db, 'events');
      const today = new Date();
      const q = query(
        eventsRef,
        where('date', '>=', today),
        orderBy('date', 'asc')
      );
      
      const snapshot = await getDocs(q);
      const eventsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate()
      }));
      
      setEvents(eventsData.slice(0, 3)); // Show only 3 upcoming events
    } catch (error) {
      console.error('Error fetching events:', error);
      // Use sample data if Firebase fetch fails
      setEvents(getSampleEvents());
    } finally {
      setLoading(false);
    }
  };

  const getSampleEvents = () => [
    {
      id: 1,
      title: 'Sunday Worship Service',
      date: new Date(2024, 11, 15, 9, 0),
      location: 'Main Sanctuary',
      description: 'Join us for worship and fellowship'
    },
    {
      id: 2,
      title: 'Community Outreach',
      date: new Date(2024, 11, 20, 10, 0),
      location: 'Community Center',
      description: 'Serving our local community'
    },
    {
      id: 3,
      title: 'Youth Christmas Party',
      date: new Date(2024, 11, 22, 18, 30),
      location: 'Fellowship Hall',
      description: 'Fun and games for youth grades 6-12'
    }
  ];

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">Upcoming Events</h2>
          <div className="text-center">Loading events...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Upcoming Events</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Join us for these exciting upcoming events and activities
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {events.map((event) => (
            <div key={event.id} className="card border-l-4 border-blue-900">
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
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="/events" className="btn-primary">
            View All Events
          </a>
        </div>
      </div>
    </section>
  );
}