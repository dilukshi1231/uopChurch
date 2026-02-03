// src/app/admin/events/page.js
'use client';
import { useState, useEffect } from 'react';
import { withAuth } from '@/middleware/withAuth';
import { db } from '@/lib/firebase';
import { 
  collection, 
  getDocs, 
  addDoc,
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { 
  FaCalendar, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaClock,
  FaMapMarkerAlt,
  FaTimes,
  FaUsers,
  FaImage,
  FaSave,
  FaCalendarAlt,
  FaCheckCircle,
  FaEye
} from 'react-icons/fa';

const EventModal = ({ showModal, editingEvent, formData, handleInputChange, handleSubmit, resetForm, setShowModal }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-blue-600 text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              {editingEvent ? 'Edit Event' : 'Create New Event'}
            </h2>
            <p className="text-blue-100 text-sm mt-1">
              {editingEvent ? 'Update event details' : 'Add a new event to the calendar'}
            </p>
          </div>
          <button
            onClick={() => {
              setShowModal(false);
              resetForm();
            }}
            className="p-2 hover:bg-blue-700 rounded transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter event title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter event description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time *
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter event location"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="service">Service</option>
                <option value="bible_study">Bible Study</option>
                <option value="youth">Youth Event</option>
                <option value="prayer">Prayer Meeting</option>
                <option value="community">Community Outreach</option>
                <option value="special">Special Event</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capacity
              </label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Max attendees (optional)"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <FaSave />
              {editingEvent ? 'Update Event' : 'Create Event'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: 'service',
    image: '',
    capacity: ''
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const eventsRef = collection(db, 'events');
      const q = query(eventsRef, orderBy('date', 'desc'));
      const snapshot = await getDocs(q);
      
      const eventsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setEvents(eventsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingEvent) {
        const eventRef = doc(db, 'events', editingEvent.id);
        await updateDoc(eventRef, {
          ...formData,
          updatedAt: new Date()
        });
        alert('Event updated successfully!');
      } else {
        await addDoc(collection(db, 'events'), {
          ...formData,
          createdAt: new Date(),
          attendees: 0
        });
        alert('Event created successfully!');
      }
      
      resetForm();
      setShowModal(false);
      await fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Failed to save event');
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      category: event.category,
      image: event.image || '',
      capacity: event.capacity || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (eventId) => {
    if (!confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'events', eventId));
      await fetchEvents();
      alert('Event deleted successfully!');
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      category: 'service',
      image: '',
      capacity: ''
    });
    setEditingEvent(null);
  };

  const getCategoryBadge = (category) => {
    const badges = {
      service: 'bg-blue-100 text-blue-800',
      bible_study: 'bg-purple-100 text-purple-800',
      youth: 'bg-green-100 text-green-800',
      prayer: 'bg-pink-100 text-pink-800',
      community: 'bg-amber-100 text-amber-800',
      special: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${badges[category] || 'bg-gray-100 text-gray-800'}`}>
        {category.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  const isUpcoming = (date) => {
    return new Date(date) > new Date();
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

  const upcomingEvents = events.filter(e => isUpcoming(e.date));
  const pastEvents = events.filter(e => !isUpcoming(e.date));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Matching Membership Page */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Events Management</h1>
              <p className="text-gray-600 mt-1">Create and manage church events and activities</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <FaPlus />
              Create Event
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards - MATCHING MEMBERSHIP LAYOUT */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaCalendar className="text-2xl text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Total Events</p>
                <p className="text-2xl font-bold">{events.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <FaCheckCircle className="text-2xl text-green-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Upcoming Events</p>
                <p className="text-2xl font-bold text-green-600">{upcomingEvents.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 rounded-lg">
                <FaCalendarAlt className="text-2xl text-gray-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Past Events</p>
                <p className="text-2xl font-bold text-gray-600">{pastEvents.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Events Table - MATCHING MEMBERSHIP TABLE STYLING */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.length > 0 ? (
                  events.map((event) => (
                    <tr 
                      key={event.id}
                      className="hover:bg-gray-50"
                    >
                      {/* Avatar Circle + Event Name - MATCHING MEMBERSHIP STYLE */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="font-semibold text-blue-900">
                              {event.title?.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{event.title}</div>
                            {event.capacity && (
                              <div className="text-sm text-gray-500">
                                <FaUsers className="inline mr-1" />
                                {event.capacity} max
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">{event.time}</div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <FaMapMarkerAlt className="text-gray-400" />
                          {event.location}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getCategoryBadge(event.category)}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isUpcoming(event.date) ? (
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                            <FaCheckCircle />
                            Upcoming
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                            <FaClock />
                            Past
                          </span>
                        )}
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleEdit(event)}
                            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                          >
                            <FaEdit /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(event.id)}
                            className="text-red-600 hover:text-red-800 font-medium flex items-center gap-1"
                          >
                            <FaTrash /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="text-gray-400">
                        <FaCalendar className="text-6xl mx-auto mb-4 opacity-20" />
                        <p className="text-lg font-semibold">No events found</p>
                        <p className="text-sm">Click "Create Event" to add your first event</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <EventModal
        showModal={showModal}
        editingEvent={editingEvent}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        resetForm={resetForm}
        setShowModal={setShowModal}
      />
    </div>
  );
}

export default withAuth(EventsPage, ['admin', 'staff']);