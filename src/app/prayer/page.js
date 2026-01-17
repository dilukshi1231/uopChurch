'use client';
import { useState, useEffect } from 'react';
import { collection, addDoc, query, orderBy, getDocs, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { format } from 'date-fns';
import { FaPrayingHands, FaHeart, FaPlus, FaCheck, FaLock, FaGlobe } from 'react-icons/fa';

export default function PrayerRequestsPage() {
  const [prayers, setPrayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    request: '',
    isAnonymous: false,
    isPrivate: false,
    category: 'personal'
  });

  useEffect(() => {
    fetchPrayers();
  }, [filter]);

  const fetchPrayers = async () => {
    try {
      const prayersRef = collection(db, 'prayers');
      const q = query(prayersRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      
      let prayersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate()
      }));

      // Filter out private prayers (only show to admins in production)
      prayersData = prayersData.filter(p => !p.isPrivate);

      // Apply category filter
      if (filter !== 'all') {
        prayersData = prayersData.filter(p => p.category === filter);
      }
      
      setPrayers(prayersData);
    } catch (error) {
      console.error('Error fetching prayers:', error);
      setPrayers(getSamplePrayers());
    } finally {
      setLoading(false);
    }
  };

  const getSamplePrayers = () => [
    {
      id: 1,
      name: 'John Smith',
      title: 'Healing for my mother',
      request: 'Please pray for my mother who is recovering from surgery. We pray for complete healing and strength.',
      category: 'health',
      isAnonymous: false,
      isPrivate: false,
      prayerCount: 45,
      createdAt: new Date(2024, 0, 10),
      status: 'active'
    },
    {
      id: 2,
      name: 'Anonymous',
      title: 'Job opportunity',
      request: 'I\'ve been searching for employment for months. Please pray for God\'s provision and guidance.',
      category: 'personal',
      isAnonymous: true,
      isPrivate: false,
      prayerCount: 32,
      createdAt: new Date(2024, 0, 12),
      status: 'active'
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      title: 'Family reconciliation',
      request: 'Praying for restoration in my family relationships. We need God\'s peace and love to heal our wounds.',
      category: 'family',
      isAnonymous: false,
      isPrivate: false,
      prayerCount: 28,
      createdAt: new Date(2024, 0, 13),
      status: 'active'
    },
    {
      id: 4,
      name: 'Michael Davis',
      title: 'Missionary work in Africa',
      request: 'Please pray for our mission team as we prepare to serve in Uganda. Pray for safety and open hearts.',
      category: 'missions',
      isAnonymous: false,
      isPrivate: false,
      prayerCount: 67,
      createdAt: new Date(2024, 0, 14),
      status: 'active'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, 'prayers'), {
        ...formData,
        prayerCount: 0,
        createdAt: new Date(),
        status: 'active',
        answeredAt: null
      });

      alert('Your prayer request has been submitted. Our church family will be praying for you!');
      setFormData({
        name: '',
        email: '',
        title: '',
        request: '',
        isAnonymous: false,
        isPrivate: false,
        category: 'personal'
      });
      setShowForm(false);
      fetchPrayers();
    } catch (error) {
      console.error('Error submitting prayer:', error);
      alert('Error submitting prayer request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePray = async (prayerId) => {
    try {
      await updateDoc(doc(db, 'prayers', prayerId), {
        prayerCount: increment(1)
      });
      
      // Update local state
      setPrayers(prayers.map(p => 
        p.id === prayerId ? { ...p, prayerCount: p.prayerCount + 1 } : p
      ));
    } catch (error) {
      console.error('Error updating prayer count:', error);
    }
  };

  const categories = [
    { value: 'all', label: 'All Requests', icon: <FaGlobe /> },
    { value: 'personal', label: 'Personal', icon: <FaHeart /> },
    { value: 'health', label: 'Health & Healing', icon: <FaPrayingHands /> },
    { value: 'family', label: 'Family', icon: <FaHeart /> },
    { value: 'missions', label: 'Missions', icon: <FaGlobe /> },
    { value: 'church', label: 'Church', icon: <FaPrayingHands /> }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      personal: 'bg-blue-100 text-blue-900',
      health: 'bg-green-100 text-green-900',
      family: 'bg-purple-100 text-purple-900',
      missions: 'bg-amber-100 text-amber-900',
      church: 'bg-pink-100 text-pink-900'
    };
    return colors[category] || 'bg-gray-100 text-gray-900';
  };

  if (loading && prayers.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading prayer requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <FaPrayingHands className="text-5xl mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Prayer Requests</h1>
            <p className="text-xl text-purple-100 mb-8">
              Share your prayer needs and pray for others in our church family
            </p>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-white text-purple-900 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors inline-flex items-center gap-2"
            >
              <FaPlus /> Submit Prayer Request
            </button>
          </div>
        </div>
      </section>

      {/* Prayer Request Form */}
      {showForm && (
        <section className="py-12 bg-purple-50 border-b">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Submit a Prayer Request</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Your Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required={!formData.isAnonymous}
                      disabled={formData.isAnonymous}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-900"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-900"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-900"
                  >
                    {categories.filter(c => c.value !== 'all').map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Prayer Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-900"
                    placeholder="Brief title for your prayer request"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Prayer Request *</label>
                  <textarea
                    value={formData.request}
                    onChange={(e) => setFormData({...formData, request: e.target.value})}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-900"
                    placeholder="Share your prayer need..."
                  ></textarea>
                </div>

                <div className="space-y-3">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={formData.isAnonymous}
                      onChange={(e) => setFormData({...formData, isAnonymous: e.target.checked})}
                      className="mr-3 mt-1"
                    />
                    <span className="text-sm text-gray-700">
                      <strong>Submit anonymously</strong> - Your name will not be displayed
                    </span>
                  </label>

                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={formData.isPrivate}
                      onChange={(e) => setFormData({...formData, isPrivate: e.target.checked})}
                      className="mr-3 mt-1"
                    />
                    <span className="text-sm text-gray-700">
                      <FaLock className="inline mr-1" />
                      <strong>Keep private</strong> - Only pastoral staff will see this request
                    </span>
                  </label>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-purple-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-800 transition-colors disabled:bg-gray-400"
                  >
                    {loading ? 'Submitting...' : 'Submit Prayer Request'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-6 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition-colors ${
                  filter === cat.value
                    ? 'bg-purple-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Prayer Requests List */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {prayers.length === 0 ? (
              <div className="text-center py-12">
                <FaPrayingHands className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No prayer requests in this category yet.</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-4 btn-primary"
                >
                  Submit the First Request
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {prayers.map((prayer) => (
                  <div key={prayer.id} className="card hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getCategoryColor(prayer.category)}`}>
                            {categories.find(c => c.value === prayer.category)?.label}
                          </span>
                          {prayer.isPrivate && (
                            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                              <FaLock className="inline mr-1" />
                              Private
                            </span>
                          )}
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{prayer.title}</h3>
                        <p className="text-sm text-gray-600 mb-1">
                          By {prayer.isAnonymous ? 'Anonymous' : prayer.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {format(prayer.createdAt, 'MMMM d, yyyy')}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {prayer.request}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2 text-purple-900">
                        <FaHeart className="text-2xl" />
                        <span className="font-semibold">{prayer.prayerCount}</span>
                        <span className="text-sm text-gray-600">
                          {prayer.prayerCount === 1 ? 'person is praying' : 'people are praying'}
                        </span>
                      </div>

                      <button
                        onClick={() => handlePray(prayer.id)}
                        className="bg-purple-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-800 transition-colors flex items-center gap-2"
                      >
                        <FaPrayingHands />
                        I'm Praying
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-purple-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">The Power of Prayer</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            "The prayer of a righteous person is powerful and effective." - James 5:16
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowForm(true)}
              className="bg-white text-purple-900 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Submit a Request
            </button>
            <a href="/contact" className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-900 transition-colors inline-block">
              Need Pastoral Care?
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}