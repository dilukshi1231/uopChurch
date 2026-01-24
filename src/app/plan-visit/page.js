'use client';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { FaMapMarkerAlt, FaClock, FaUsers, FaGraduationCap, FaCoffee, FaWifi, FaBook, FaMusic, FaCalendar, FaBus, FaParking, FaQuestionCircle, FaCheckCircle, FaUser } from 'react-icons/fa';

export default function PlanYourVisit() {
  const [selectedService, setSelectedService] = useState('sunday-student');
  const [faqOpen, setFaqOpen] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingType, setBookingType] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    studentId: '',
    university: '',
    eventType: '',
    spaceNeeded: '',
    date: '',
    startTime: '',
    endTime: '',
    attendees: '',
    purpose: '',
    equipment: [],
    additionalNotes: ''
  });

  const services = [
    {
      id: 'sunday-student',
      name: 'Sunday Student Service',
      time: '11:00 AM',
      duration: '75 minutes',
      style: 'Contemporary worship, casual atmosphere',
      description: 'Designed specifically for university students with relevant teaching and modern worship music.',
      whatToExpect: [
        'Free coffee and donuts',
        'Interactive worship',
        'Biblical teaching on real-life issues',
        'Connect time after service'
      ]
    },
    {
      id: 'wednesday-campus',
      name: 'Wednesday Campus Fellowship',
      time: '7:00 PM',
      duration: '90 minutes',
      style: 'Bible study, discussion, food',
      description: 'Midweek gathering for students to dive deeper into Scripture and build community.',
      whatToExpect: [
        'Free dinner provided',
        'Small group discussions',
        'Q&A with campus pastor',
        'Game night once a month'
      ]
    },
    {
      id: 'friday-worship',
      name: 'Friday Night Worship',
      time: '8:30 PM',
      duration: '60 minutes',
      style: 'Acoustic worship, prayer',
      description: 'Unplugged worship night to end your week connecting with God and friends.',
      whatToExpect: [
        'Live acoustic music',
        'Creative prayer stations',
        'Chill atmosphere',
        'Late-night food afterward'
      ]
    }
  ];

  const studentResources = [
    {
      icon: <FaGraduationCap />,
      title: 'Campus Ministry',
      description: 'Active presence on 3 local university campuses with weekly meetups and events.',
      details: 'State University, Tech College, Community College'
    },
    {
      icon: <FaCoffee />,
      title: 'Free Coffee Bar',
      description: 'Premium coffee, tea, and snacks available before and after all services.',
      details: 'Open 30 min before services'
    },
    {
      icon: <FaWifi />,
      title: 'Fast WiFi',
      description: 'High-speed internet throughout the building for studying between services.',
      details: 'Network: GraceChurch_Students'
    },
    {
      icon: <FaBook />,
      title: 'Study Space',
      description: 'Quiet study rooms available during the week. Great for group projects!',
      details: 'Mon-Fri: 9 AM - 10 PM'
    }
  ];

  const firstTimeInfo = [
    {
      icon: <FaParking />,
      title: 'Free Parking',
      description: 'Plenty of free parking in our lot. Overflow parking across the street at the community center.'
    },
    {
      icon: <FaBus />,
      title: 'Public Transit',
      description: 'Bus routes 7, 12, and 45 stop right outside. University shuttle stops here too!'
    },
    {
      icon: <FaUsers />,
      title: 'Connect Team',
      description: 'Look for students wearing "ASK ME" shirts. They\'ll help you find everything and answer questions.'
    },
    {
      icon: <FaMusic />,
      title: 'Dress Code',
      description: 'Come as you are! Jeans, hoodies, whatever you\'re comfortable in. We care about hearts, not clothes.'
    }
  ];

  const bookingOptions = [
    {
      id: 'space',
      title: 'Book a Space',
      icon: <FaUsers />,
      description: 'Reserve rooms for study groups, meetings, or events',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'counseling',
      title: 'Request Counseling',
      icon: <FaUser />,
      description: 'Schedule a session with our student pastor',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'visit',
      title: 'Plan a Visit',
      icon: <FaCalendar />,
      description: 'Let us know you\'re coming and we\'ll welcome you',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'tour',
      title: 'Campus Tour',
      icon: <FaMapMarkerAlt />,
      description: 'Get a guided tour of our facilities',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const availableSpaces = [
    { value: 'study-room-1', label: 'Study Room 1 (Capacity: 8)' },
    { value: 'study-room-2', label: 'Study Room 2 (Capacity: 12)' },
    { value: 'student-lounge', label: 'Student Lounge (Capacity: 30)' },
    { value: 'main-hall', label: 'Main Hall (Capacity: 100)' },
    { value: 'outdoor-space', label: 'Outdoor Courtyard (Capacity: 50)' },
    { value: 'chapel', label: 'Chapel (Capacity: 200)' }
  ];

  const equipmentOptions = [
    'Projector & Screen',
    'Sound System',
    'Microphones',
    'Whiteboard',
    'Tables & Chairs',
    'Coffee/Tea Setup',
    'Video Camera'
  ];

  const upcomingEvents = [
    {
      date: 'This Friday',
      title: 'Game Night',
      description: 'Board games, video games, snacks, and fun',
      time: '8:00 PM'
    },
    {
      date: 'Next Sunday',
      title: 'Pancake Brunch',
      description: 'Free brunch after service + Q&A with pastor',
      time: 'After 11 AM service'
    },
    {
      date: 'Next Month',
      title: 'Spring Break Mission Trip',
      description: 'Serve in the city, build friendships, grow faith',
      time: 'Sign ups open now'
    }
  ];

  const faqs = [
    {
      question: 'Do I need to register or sign up?',
      answer: 'Nope! Just show up. If you want, you can fill out a visitor card to get connected, but it\'s totally optional.'
    },
    {
      question: 'Will it be awkward if I come alone?',
      answer: 'Not at all! Most students come alone their first time. Our Connect Team will introduce you to others, and we have a "newcomers coffee" after the service where you can meet people in a relaxed setting.'
    },
    {
      question: 'Is everything really free?',
      answer: 'Yes! Coffee, food, events - all free. We never pass an offering plate during student services. If you want to give, there are boxes in the back, but there\'s zero pressure.'
    },
    {
      question: 'What if I\'m not sure about this whole "church" thing?',
      answer: 'Perfect! You\'re exactly who we want here. We have students from all backgrounds - some grew up in church, many didn\'t. Everyone\'s welcome to explore faith at their own pace. No judgment, just genuine community.'
    },
    {
      question: 'Do you help with practical stuff like finding roommates or jobs?',
      answer: 'Absolutely! We have a student resources board and GroupMe where students post about housing, jobs, rides, etc. We also have a "Life Skills" series covering budgeting, cooking, and other adulting basics.'
    },
    {
      question: 'Can I bring non-Christian friends?',
      answer: 'Please do! We love having guests and create an environment where everyone feels welcome, regardless of their beliefs or background.'
    }
  ];

  const openBookingModal = (type) => {
    setBookingType(type);
    setShowBookingModal(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, 'bookings'), {
        ...bookingForm,
        bookingType,
        submittedAt: new Date(),
        status: 'pending'
      });

      alert('Your request has been submitted! We\'ll email you within 24 hours to confirm.');
      setShowBookingModal(false);
      setBookingForm({
        name: '',
        email: '',
        phone: '',
        studentId: '',
        university: '',
        eventType: '',
        spaceNeeded: '',
        date: '',
        startTime: '',
        endTime: '',
        attendees: '',
        purpose: '',
        equipment: [],
        additionalNotes: ''
      });
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Error submitting request. Please try again or contact us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <FaGraduationCap />
              <span className="font-semibold">University Student Ministry</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Hey Student! 👋
              <span className="block mt-2 text-blue-200">Let's Connect</span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-8">
              A community of university students growing in faith, building real friendships, 
              and figuring out life together. Come check us out!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => openBookingModal('visit')}
                className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
              >
                I'm Visiting This Week
              </button>
              <button className="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all">
                Join Our GroupMe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Options Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Get Connected</h2>
            <p className="text-center text-gray-600 mb-12">
              Book spaces, schedule meetings, or plan your first visit
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {bookingOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => openBookingModal(option.id)}
                  className="group bg-white rounded-xl p-6 shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-2"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${option.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl group-hover:scale-110 transition-transform`}>
                    {option.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-center">{option.title}</h3>
                  <p className="text-gray-600 text-sm text-center">{option.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Times */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">When We Meet</h2>
            <p className="text-center text-gray-600 mb-12">
              Pick what works for your schedule. Come to one or come to all!
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`cursor-pointer rounded-xl p-6 transition-all transform hover:scale-105 ${
                    selectedService === service.id
                      ? 'bg-gradient-to-br from-blue-900 to-blue-700 text-white shadow-2xl'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <FaClock className={selectedService === service.id ? 'text-blue-200' : 'text-blue-900'} />
                    <span className="font-bold text-lg">{service.time}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                  <p className={`text-sm mb-4 ${selectedService === service.id ? 'text-blue-100' : 'text-gray-600'}`}>
                    {service.duration} • {service.style}
                  </p>

                  {selectedService === service.id && (
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <p className="text-blue-100 mb-3">{service.description}</p>
                      <ul className="space-y-2">
                        {service.whatToExpect.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <FaCheckCircle className="mt-0.5 flex-shrink-0 text-green-300" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full my-8">
            <div className="sticky top-0 bg-gradient-to-r from-blue-900 to-purple-900 text-white p-6 rounded-t-2xl z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    {bookingOptions.find(opt => opt.id === bookingType)?.title}
                  </h2>
                  <p className="text-blue-100 text-sm">
                    {bookingOptions.find(opt => opt.id === bookingType)?.description}
                  </p>
                </div>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Basic Info */}
              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <FaUser className="text-blue-900" />
                  Your Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({...bookingForm, email: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="john@university.edu"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                    <input
                      type="tel"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Student ID</label>
                    <input
                      type="text"
                      value={bookingForm.studentId}
                      onChange={(e) => setBookingForm({...bookingForm, studentId: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Optional"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">University *</label>
                  <select
                    value={bookingForm.university}
                    onChange={(e) => setBookingForm({...bookingForm, university: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select your university...</option>
                    <option value="state-university">State University</option>
                    <option value="tech-college">Tech College</option>
                    <option value="community-college">Community College</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Space Booking Fields */}
              {bookingType === 'space' && (
                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-blue-900" />
                    Event Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Event Type *</label>
                      <select
                        value={bookingForm.eventType}
                        onChange={(e) => setBookingForm({...bookingForm, eventType: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select event type...</option>
                        <option value="study-group">Study Group</option>
                        <option value="bible-study">Bible Study</option>
                        <option value="meeting">Meeting</option>
                        <option value="social-event">Social Event</option>
                        <option value="workshop">Workshop/Seminar</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Space Needed *</label>
                      <select
                        value={bookingForm.spaceNeeded}
                        onChange={(e) => setBookingForm({...bookingForm, spaceNeeded: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select space...</option>
                        {availableSpaces.map(space => (
                          <option key={space.value} value={space.value}>{space.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                        <input
                          type="date"
                          value={bookingForm.date}
                          onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                          required
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Start *</label>
                        <input
                          type="time"
                          value={bookingForm.startTime}
                          onChange={(e) => setBookingForm({...bookingForm, startTime: e.target.value})}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">End *</label>
                        <input
                          type="time"
                          value={bookingForm.endTime}
                          onChange={(e) => setBookingForm({...bookingForm, endTime: e.target.value})}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Attendees *</label>
                      <input
                        type="number"
                        value={bookingForm.attendees}
                        onChange={(e) => setBookingForm({...bookingForm, attendees: e.target.value})}
                        required
                        min="1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Equipment</label>
                      <div className="grid md:grid-cols-2 gap-3">
                        {equipmentOptions.map((eq) => (
                          <label key={eq} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <input
                              type="checkbox"
                              value={eq}
                              checked={bookingForm.equipment.includes(eq)}
                              onChange={(e) => {
                                const newEq = e.target.checked
                                  ? [...bookingForm.equipment, eq]
                                  : bookingForm.equipment.filter(i => i !== eq);
                                setBookingForm({...bookingForm, equipment: newEq});
                              }}
                              className="w-4 h-4 text-blue-900"
                            />
                            <span className="text-sm">{eq}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Purpose *</label>
                      <textarea
                        value={bookingForm.purpose}
                        onChange={(e) => setBookingForm({...bookingForm, purpose: e.target.value})}
                        required
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Tell us about your event..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Counseling Fields */}
              {bookingType === 'counseling' && (
                <div>
                  <h3 className="text-lg font-bold mb-4">Counseling Request</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Date *</label>
                      <input
                        type="date"
                        value={bookingForm.date}
                        onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Time *</label>
                      <select
                        value={bookingForm.startTime}
                        onChange={(e) => setBookingForm({...bookingForm, startTime: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select...</option>
                        <option value="morning">Morning (9 AM - 12 PM)</option>
                        <option value="afternoon">Afternoon (1 PM - 4 PM)</option>
                        <option value="evening">Evening (5 PM - 7 PM)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Topic *</label>
                      <select
                        value={bookingForm.eventType}
                        onChange={(e) => setBookingForm({...bookingForm, eventType: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select...</option>
                        <option value="spiritual-guidance">Spiritual Guidance</option>
                        <option value="academic-stress">Academic Stress</option>
                        <option value="relationships">Relationships</option>
                        <option value="life-direction">Life Direction</option>
                        <option value="family-issues">Family Issues</option>
                        <option value="mental-health">Mental Health</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Details</label>
                      <textarea
                        value={bookingForm.additionalNotes}
                        onChange={(e) => setBookingForm({...bookingForm, additionalNotes: e.target.value})}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Optional: Share anything that would help us prepare..."
                      />
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <p className="text-sm text-purple-900">
                        <strong>Confidentiality:</strong> All sessions are completely confidential.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Visit Fields */}
              {bookingType === 'visit' && (
                <div>
                  <h3 className="text-lg font-bold mb-4">Visit Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                      <input
                        type="date"
                        value={bookingForm.date}
                        onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Service *</label>
                      <select
                        value={bookingForm.eventType}
                        onChange={(e) => setBookingForm({...bookingForm, eventType: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select...</option>
                        <option value="sunday-11am">Sunday 11:00 AM</option>
                        <option value="wednesday-7pm">Wednesday 7:00 PM</option>
                        <option value="friday-830pm">Friday 8:30 PM</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">People *</label>
                      <input
                        type="number"
                        value={bookingForm.attendees}
                        onChange={(e) => setBookingForm({...bookingForm, attendees: e.target.value})}
                        required
                        min="1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="How many people will be with you?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
                      <textarea
                        value={bookingForm.additionalNotes}
                        onChange={(e) => setBookingForm({...bookingForm, additionalNotes: e.target.value})}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Any questions or special requests? (optional)"
                      />
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-sm text-green-900">
                        <strong>We're excited to meet you!</strong> Look for the Connect Team in the lobby.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tour Fields */}
              {bookingType === 'tour' && (
                <div>
                  <h3 className="text-lg font-bold mb-4">Campus Tour</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                      <input
                        type="date"
                        value={bookingForm.date}
                        onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Time *</label>
                      <select
                        value={bookingForm.startTime}
                        onChange={(e) => setBookingForm({...bookingForm, startTime: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select...</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="13:00">1:00 PM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">People *</label>
                      <input
                        type="number"
                        value={bookingForm.attendees}
                        onChange={(e) => setBookingForm({...bookingForm, attendees: e.target.value})}
                        required
                        min="1"
                        max="20"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Maximum 20 people per tour"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Interested In</label>
                      <div className="grid md:grid-cols-2 gap-3">
                        {['Worship Space', 'Study Rooms', 'Coffee Bar', 'Student Lounge', 'Chapel', 'Activity Areas'].map((area) => (
                          <label key={area} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                            <input
                              type="checkbox"
                              value={area}
                              checked={bookingForm.equipment.includes(area)}
                              onChange={(e) => {
                                const newAreas = e.target.checked
                                  ? [...bookingForm.equipment, area]
                                  : bookingForm.equipment.filter(i => i !== area);
                                setBookingForm({...bookingForm, equipment: newAreas});
                              }}
                              className="w-4 h-4 text-blue-900"
                            />
                            <span className="text-sm">{area}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Questions</label>
                      <textarea
                        value={bookingForm.additionalNotes}
                        onChange={(e) => setBookingForm({...bookingForm, additionalNotes: e.target.value})}
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Any specific questions about the church?"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit */}
              <div className="flex gap-3 pt-6 border-t">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-900 text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-blue-800 transition-colors disabled:bg-gray-400"
                >
                  {loading ? 'Submitting...' : 'Submit Request'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  disabled={loading}
                  className="bg-gray-200 text-gray-700 px-6 py-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student Resources */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">What We Offer Students</h2>
            <p className="text-center text-gray-600 mb-12">
              Everything you need to thrive
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {studentResources.map((resource, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="text-4xl text-blue-900 mb-4">{resource.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{resource.title}</h3>
                  <p className="text-gray-700 text-sm mb-2">{resource.description}</p>
                  <p className="text-blue-900 text-xs font-semibold">{resource.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* First Time Info */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">First Time Here?</h2>
            <p className="text-center text-gray-600 mb-12">What you need to know</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {firstTimeInfo.map((info, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                  <div className="text-3xl text-purple-900 mb-3">{info.icon}</div>
                  <h3 className="font-bold mb-2">{info.title}</h3>
                  <p className="text-gray-600 text-sm">{info.description}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-4 text-center">What to Expect</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">When You Arrive:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      Look for "ASK ME" shirts
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      Free coffee and donuts
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      Open seating
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      75 minute services
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">After Service:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      Connect time
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      Free welcome gift
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      Meet the pastor
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      No pressure to return
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Coming Up</h2>
            <p className="text-center text-gray-600 mb-12">
              Events you won't want to miss
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2 text-blue-900 font-bold mb-3">
                    <FaCalendar />
                    <span>{event.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-700 text-sm mb-3">{event.description}</p>
                  <div className="flex items-center gap-2 text-purple-900 text-sm font-semibold">
                    <FaClock />
                    <span>{event.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Got Questions?</h2>
            <p className="text-center text-gray-600 mb-12">
              We've got answers (and we promise they're honest)
            </p>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <button
                    onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <FaQuestionCircle className="text-blue-900 mt-1 flex-shrink-0" />
                      <span className="font-semibold text-gray-900">{faq.question}</span>
                    </div>
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${
                        faqOpen === index ? 'transform rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {faqOpen === index && (
                    <div className="px-6 pb-6">
                      <div className="pl-8 text-gray-700">{faq.answer}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Seriously, ask us anything. We're real people and we'd love to chat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => openBookingModal('visit')}
                className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all"
              >
                Plan Your Visit
              </button>
              <a
                href="mailto:students@gracechurch.com"
                className="bg-transparent border-2 border-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-all"
              >
                Email Us
              </a>
            </div>
            <p className="mt-8 text-blue-200 text-sm">
              Or text "STUDENT" to (555) 123-4567 to join our GroupMe
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}