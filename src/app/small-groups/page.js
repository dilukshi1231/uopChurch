'use client';
import { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { FaUsers, FaMapMarkerAlt, FaClock, FaCalendar, FaUser, FaHeart, FaCheckCircle } from 'react-icons/fa';

export default function SmallGroupsPage() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [joinFormData, setJoinFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const groupsRef = collection(db, 'smallGroups');
      const q = query(groupsRef, orderBy('name', 'asc'));
      const snapshot = await getDocs(q);
      
      const groupsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setGroups(groupsData);
    } catch (error) {
      console.error('Error fetching groups:', error);
      setGroups(getSampleGroups());
    } finally {
      setLoading(false);
    }
  };

  const getSampleGroups = () => [
    {
      id: 1,
      name: 'Wednesday Evening Bible Study',
      category: 'bible-study',
      description: 'Deep dive into Scripture with fellowship and discussion. Perfect for those wanting to grow in biblical knowledge.',
      leader: 'Pastor John Smith',
      leaderEmail: 'john@gracechurch.org',
      meetingDay: 'Wednesday',
      meetingTime: '7:00 PM',
      location: 'Church Building - Room 101',
      locationType: 'in-person',
      capacity: 25,
      currentMembers: 18,
      ageGroup: 'all',
      isOpen: true,
      imageUrl: null
    },
    {
      id: 2,
      name: 'Young Adults Fellowship',
      category: 'fellowship',
      description: 'A vibrant community for ages 18-30 focused on building friendships, discussing faith, and having fun together.',
      leader: 'Emily Wilson',
      leaderEmail: 'emily@gracechurch.org',
      meetingDay: 'Friday',
      meetingTime: '7:30 PM',
      location: 'Various locations (rotates)',
      locationType: 'hybrid',
      capacity: 30,
      currentMembers: 24,
      ageGroup: '18-30',
      isOpen: true,
      imageUrl: null
    },
    {
      id: 3,
      name: 'Women\'s Prayer Circle',
      category: 'prayer',
      description: 'Women gathering to pray for our families, church, and community. A supportive space for honest conversation.',
      leader: 'Sarah Johnson',
      leaderEmail: 'sarah@gracechurch.org',
      meetingDay: 'Tuesday',
      meetingTime: '9:30 AM',
      location: 'Fellowship Hall',
      locationType: 'in-person',
      capacity: 20,
      currentMembers: 15,
      ageGroup: 'women',
      isOpen: true,
      imageUrl: null
    },
    {
      id: 4,
      name: 'Men\'s Breakfast Group',
      category: 'fellowship',
      description: 'Men meeting for breakfast, Bible study, and brotherhood. Start your Saturday with purpose and community.',
      leader: 'Michael Davis',
      leaderEmail: 'michael@gracechurch.org',
      meetingDay: 'Saturday',
      meetingTime: '8:00 AM',
      location: 'Local Diner',
      locationType: 'in-person',
      capacity: 15,
      currentMembers: 12,
      ageGroup: 'men',
      isOpen: true,
      imageUrl: null
    },
    {
      id: 5,
      name: 'Family Life Group',
      category: 'family',
      description: 'Families with children growing together. Includes kids activities while parents connect and study.',
      leader: 'Robert & Jennifer Thompson',
      leaderEmail: 'familylife@gracechurch.org',
      meetingDay: 'Sunday',
      meetingTime: '4:00 PM',
      location: '123 Oak Street',
      locationType: 'in-person',
      capacity: 35,
      currentMembers: 28,
      ageGroup: 'families',
      isOpen: true,
      imageUrl: null
    },
    {
      id: 6,
      name: 'Online Global Connect',
      category: 'online',
      description: 'Virtual small group connecting believers worldwide. Perfect for remote members and those with scheduling challenges.',
      leader: 'David Martinez',
      leaderEmail: 'david@gracechurch.org',
      meetingDay: 'Thursday',
      meetingTime: '8:00 PM EST',
      location: 'Zoom (link provided upon joining)',
      locationType: 'online',
      capacity: 50,
      currentMembers: 32,
      ageGroup: 'all',
      isOpen: true,
      imageUrl: null
    }
  ];

  const categories = [
    { value: 'all', label: 'All Groups' },
    { value: 'bible-study', label: 'Bible Study' },
    { value: 'fellowship', label: 'Fellowship' },
    { value: 'prayer', label: 'Prayer' },
    { value: 'family', label: 'Family' },
    { value: 'online', label: 'Online' }
  ];

  const filteredGroups = filter === 'all' 
    ? groups 
    : groups.filter(g => g.category === filter);

  const handleJoinSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await addDoc(collection(db, 'groupJoinRequests'), {
        ...joinFormData,
        groupId: selectedGroup.id,
        groupName: selectedGroup.name,
        submittedAt: new Date(),
        status: 'pending'
      });

      alert(`Your request to join "${selectedGroup.name}" has been submitted! The group leader will contact you soon.`);
      setShowJoinForm(false);
      setJoinFormData({ name: '', email: '', phone: '', message: '' });
      setSelectedGroup(null);
    } catch (error) {
      console.error('Error submitting join request:', error);
      alert('Error submitting request. Please try again.');
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'bible-study': 'bg-blue-100 text-blue-900',
      'fellowship': 'bg-green-100 text-green-900',
      'prayer': 'bg-purple-100 text-purple-900',
      'family': 'bg-pink-100 text-pink-900',
      'online': 'bg-amber-100 text-amber-900'
    };
    return colors[category] || 'bg-gray-100 text-gray-900';
  };

  const getLocationIcon = (type) => {
    if (type === 'online') return '💻';
    if (type === 'hybrid') return '🔄';
    return '📍';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading small groups...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-900 to-green-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <FaUsers className="text-5xl mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Small Groups</h1>
            <p className="text-xl text-green-100">
              Life is better together. Find a group where you can grow, connect, and belong.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="section-title text-center mb-12">Why Join a Small Group?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 text-green-900 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  <FaUsers />
                </div>
                <h3 className="text-xl font-semibold mb-3">Build Community</h3>
                <p className="text-gray-600">
                  Develop authentic friendships with people who care about you and your spiritual journey.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 text-green-900 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  <FaHeart />
                </div>
                <h3 className="text-xl font-semibold mb-3">Grow in Faith</h3>
                <p className="text-gray-600">
                  Dive deeper into God's Word through study, discussion, and accountability.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 text-green-900 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  <FaCheckCircle />
                </div>
                <h3 className="text-xl font-semibold mb-3">Find Your Place</h3>
                <p className="text-gray-600">
                  Discover where you belong in our church family and use your gifts to serve others.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`px-5 py-2 rounded-lg font-medium transition-colors ${
                  filter === cat.value
                    ? 'bg-green-900 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Groups Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {filteredGroups.length === 0 ? (
              <div className="text-center py-12">
                <FaUsers className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No groups found in this category.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {filteredGroups.map((group) => (
                  <div key={group.id} className="card hover:shadow-xl transition-all duration-300">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-2 ${getCategoryColor(group.category)}`}>
                          {categories.find(c => c.value === group.category)?.label}
                        </span>
                        <h3 className="text-2xl font-bold mb-1">{group.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FaUser />
                          <span>Led by {group.leader}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 mb-6">{group.description}</p>

                    {/* Meeting Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-sm">
                        <FaCalendar className="text-green-900 flex-shrink-0" />
                        <span><strong>{group.meetingDay}s</strong> at {group.meetingTime}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <FaMapMarkerAlt className="text-green-900 flex-shrink-0" />
                        <span>{getLocationIcon(group.locationType)} {group.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <FaUsers className="text-green-900 flex-shrink-0" />
                        <div className="flex-1">
                          <span>{group.currentMembers} / {group.capacity} members</span>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div 
                              className="bg-green-900 h-2 rounded-full transition-all"
                              style={{ width: `${(group.currentMembers / group.capacity) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Age Group Badge */}
                    {group.ageGroup && group.ageGroup !== 'all' && (
                      <div className="mb-4">
                        <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full capitalize">
                          {group.ageGroup}
                        </span>
                      </div>
                    )}

                    {/* Join Button */}
                    <button
                      onClick={() => {
                        setSelectedGroup(group);
                        setShowJoinForm(true);
                      }}
                      disabled={!group.isOpen || group.currentMembers >= group.capacity}
                      className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                        group.isOpen && group.currentMembers < group.capacity
                          ? 'bg-green-900 text-white hover:bg-green-800'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {!group.isOpen ? 'Group Full' :
                       group.currentMembers >= group.capacity ? 'At Capacity' :
                       'Join This Group'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Join Form Modal */}
      {showJoinForm && selectedGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
             onClick={() => setShowJoinForm(false)}>
          <div className="bg-white rounded-lg max-w-2xl w-full"
               onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold">Join {selectedGroup.name}</h2>
              <p className="text-gray-600 mt-1">Fill out this form and the group leader will contact you</p>
            </div>

            <form onSubmit={handleJoinSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Your Name *</label>
                <input
                  type="text"
                  value={joinFormData.name}
                  onChange={(e) => setJoinFormData({...joinFormData, name: e.target.value})}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-900"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Email *</label>
                <input
                  type="email"
                  value={joinFormData.email}
                  onChange={(e) => setJoinFormData({...joinFormData, email: e.target.value})}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-900"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone *</label>
                <input
                  type="tel"
                  value={joinFormData.phone}
                  onChange={(e) => setJoinFormData({...joinFormData, phone: e.target.value})}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-900"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Message to Group Leader (Optional)
                </label>
                <textarea
                  value={joinFormData.message}
                  onChange={(e) => setJoinFormData({...joinFormData, message: e.target.value})}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-900"
                  placeholder="Tell the group leader a bit about yourself..."
                ></textarea>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-green-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-800 transition-colors"
                >
                  Submit Request
                </button>
                <button
                  type="button"
                  onClick={() => setShowJoinForm(false)}
                  className="bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-green-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Can't Find the Right Group?</h2>
          <p className="text-xl text-green-100 mb-8">
            We'd love to help you find where you belong or even start a new group!
          </p>
          <a href="/contact" className="bg-white text-green-900 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-block">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}