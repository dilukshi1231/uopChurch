'use client';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    contactReason: 'general'
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Add to Firebase
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        timestamp: new Date(),
        status: 'new'
      });

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        contactReason: 'general'
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your message. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  const contactReasons = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'visit', label: 'Planning a Visit' },
    { value: 'prayer', label: 'Prayer Request' },
    { value: 'volunteer', label: 'Volunteer Opportunities' },
    { value: 'events', label: 'Events Information' },
    { value: 'giving', label: 'Giving Questions' },
    { value: 'pastoral', label: 'Pastoral Care' }
  ];

  const contactInfo = [
    {
      icon: <FaPhone />,
      title: 'Phone',
      content: '(555) 123-4567',
      link: 'tel:5551234567'
    },
    {
      icon: <FaEnvelope />,
      title: 'Email',
      content: 'info@gracechurch.org',
      link: 'mailto:info@gracechurch.org'
    },
    {
  icon: <FaMapMarkerAlt />,
  title: 'Address',
  content: 'University of Peradeniya Christian Chapel, Peradeniya, Sri Lanka',
  link: 'https://maps.google.com/?q=University+of+Peradeniya+Christian+Chapel'
}
  ];

  const officeHours = [
    { day: 'Monday - Thursday', hours: '9:00 AM - 5:00 PM' },
    { day: 'Friday', hours: '9:00 AM - 3:00 PM' },
    { day: 'Saturday', hours: 'Closed' },
    { day: 'Sunday', hours: '8:30 AM - 12:30 PM' }
  ];

  const staff = [
    {
      name: 'Pastor John Smith',
      role: 'Senior Pastor',
      email: 'john@gracechurch.org',
      phone: '(555) 123-4567 ext. 101'
    },
    {
      name: 'Sarah Johnson',
      role: 'Worship Director',
      email: 'sarah@gracechurch.org',
      phone: '(555) 123-4567 ext. 102'
    },
    {
      name: 'Michael Davis',
      role: 'Youth Pastor',
      email: 'michael@gracechurch.org',
      phone: '(555) 123-4567 ext. 103'
    },
    {
      name: 'Emily Wilson',
      role: 'Children\'s Director',
      email: 'emily@gracechurch.org',
      phone: '(555) 123-4567 ext. 104'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-blue-100">
              We'd love to hear from you! Reach out with questions, prayer requests, or just to say hello.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Info */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            {contactInfo.map((info, idx) => (
              <a
                key={idx}
                href={info.link}
                target={info.link.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="card text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  {info.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                <p className="text-gray-700">{info.content}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              
              {submitted && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6">
                  <p className="font-semibold">Thank you for contacting us!</p>
                  <p className="text-sm">We'll get back to you as soon as possible.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Reason for Contact *
                    </label>
                    <select
                      name="contactReason"
                      value={formData.contactReason}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                    >
                      {contactReasons.map(reason => (
                        <option key={reason.value} value={reason.value}>
                          {reason.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-900 text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-blue-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>

                <p className="text-sm text-gray-600 text-center">
                  We typically respond within 24-48 hours during business days.
                </p>
              </form>
            </div>

            {/* Office Hours & Map */}
            <div className="space-y-6">
              {/* Office Hours */}
              <div className="card">
                <div className="flex items-center gap-3 mb-4">
                  <FaClock className="text-3xl text-blue-900" />
                  <h3 className="text-2xl font-bold">Office Hours</h3>
                </div>
                <div className="space-y-3">
                  {officeHours.map((schedule, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                      <span className="font-medium text-gray-700">{schedule.day}</span>
                      <span className="text-gray-600">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="card p-0 overflow-hidden">
                <div className="h-64 bg-gray-200">
                  <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d989.4731888816851!2d80.60396089999999!3d7.253045199999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae36f3343ee380d%3A0x5f97c525652981f0!2sChurch%20of%20Christ%20The%20Risen%20Lord!5e0!3m2!1sen!2slk!4v1769243180844!5m2!1sen!2slk"
  width="100%"
  height="100%"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
  title="University of Peradeniya Christian Chapel Location"
></iframe>

                </div>
                <div className="p-6">
                  <h3 className="font-semibold mb-2">Get Directions</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    University of Peradeniya Christian Chapel<br />
                  Peradeniya, Sri Lanka
                  </p>
                  <a
                    href="https://maps.google.com/?q=University+of+Peradeniya+Christian+Chapel"
  target="_blank"
  rel="noopener noreferrer"
  className="btn-primary w-full text-center block"
>
  Open in Google Maps
</a>
                </div>
              </div>

              {/* Social Media */}
              <div className="card">
                <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                <p className="text-gray-600 mb-4">
                  Follow us on social media for updates, encouragement, and community.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                    <FaFacebook className="text-xl" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                    <FaTwitter className="text-xl" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                    <FaInstagram className="text-xl" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                    <FaYoutube className="text-xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Staff Directory */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="section-title text-center mb-12">Contact Our Staff</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {staff.map((member, idx) => (
                <div key={idx} className="card">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-blue-900 font-medium mb-4">{member.role}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaEnvelope className="text-blue-900" />
                      <a href={`mailto:${member.email}`} className="hover:text-blue-900">
                        {member.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaPhone className="text-blue-900" />
                      <a href={`tel:${member.phone.replace(/\D/g, '')}`} className="hover:text-blue-900">
                        {member.phone}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-12 bg-red-50 border-t-2 border-red-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-red-900 mb-4">Need Immediate Assistance?</h2>
          <p className="text-gray-700 mb-6">
            For pastoral emergencies outside office hours, please call our emergency line:
          </p>
          <a href="tel:5551234568" className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors">
            Emergency: (555) 123-4568
          </a>
        </div>
      </section>
    </div>
  );
}