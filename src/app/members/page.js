'use client';
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { FaSearch, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUsers, FaFilter } from 'react-icons/fa';

export default function MemberDirectoryPage() {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMinistry, setFilterMinistry] = useState('all');
  const [filterGroup, setFilterGroup] = useState('all');
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    filterMembers();
  }, [searchTerm, filterMinistry, filterGroup, members]);

  const fetchMembers = async () => {
    try {
      const membersRef = collection(db, 'memberships');
      const q = query(
        membersRef,
        where('status', '==', 'approved'),
        orderBy('firstName', 'asc')
      );
      
      const snapshot = await getDocs(q);
      const membersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setMembers(membersData);
      setFilteredMembers(membersData);
    } catch (error) {
      console.error('Error fetching members:', error);
      // Use sample data for demonstration
      setMembers(getSampleMembers());
      setFilteredMembers(getSampleMembers());
    } finally {
      setLoading(false);
    }
  };

  const getSampleMembers = () => [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      phone: '(555) 123-4567',
      city: 'Springfield',
      state: 'IL',
      ministryInterests: ['Worship Team', 'Youth Ministry'],
      smallGroup: 'Wednesday Evening Group',
      memberSince: '2020-01-15',
      bio: 'Passionate about worship and serving the youth.',
      avatar: null
    },
    {
      id: 2,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.j@example.com',
      phone: '(555) 234-5678',
      city: 'Springfield',
      state: 'IL',
      ministryInterests: ['Children\'s Ministry', 'Prayer Team'],
      smallGroup: 'Women\'s Bible Study',
      memberSince: '2019-06-20',
      bio: 'Love working with children and prayer ministry.',
      avatar: null
    },
    {
      id: 3,
      firstName: 'Michael',
      lastName: 'Davis',
      email: 'mdavis@example.com',
      phone: '(555) 345-6789',
      city: 'Springfield',
      state: 'IL',
      ministryInterests: ['Outreach', 'Small Groups'],
      smallGroup: 'Men\'s Breakfast Group',
      memberSince: '2021-03-10',
      bio: 'Committed to community outreach and discipleship.',
      avatar: null
    },
    {
      id: 4,
      firstName: 'Emily',
      lastName: 'Wilson',
      email: 'emily.wilson@example.com',
      phone: '(555) 456-7890',
      city: 'Springfield',
      state: 'IL',
      ministryInterests: ['Worship Team', 'Hospitality'],
      smallGroup: 'Young Adults Group',
      memberSince: '2022-09-05',
      bio: 'Singer and hospitality coordinator.',
      avatar: null
    },
    {
      id: 5,
      firstName: 'David',
      lastName: 'Martinez',
      email: 'david.m@example.com',
      phone: '(555) 567-8901',
      city: 'Springfield',
      state: 'IL',
      ministryInterests: ['Audio/Visual', 'Youth Ministry'],
      smallGroup: 'Tech Team',
      memberSince: '2020-11-12',
      bio: 'Tech enthusiast serving through A/V ministry.',
      avatar: null
    },
    {
      id: 6,
      firstName: 'Jennifer',
      lastName: 'Brown',
      email: 'jbrown@example.com',
      phone: '(555) 678-9012',
      city: 'Springfield',
      state: 'IL',
      ministryInterests: ['Children\'s Ministry', 'Outreach'],
      smallGroup: 'Family Life Group',
      memberSince: '2018-04-22',
      bio: 'Mother of three, passionate about children\'s ministry.',
      avatar: null
    }
  ];

  const filterMembers = () => {
    let filtered = [...members];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(member => 
        member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ministry filter
    if (filterMinistry !== 'all') {
      filtered = filtered.filter(member => 
        member.ministryInterests && member.ministryInterests.includes(filterMinistry)
      );
    }

    // Small group filter
    if (filterGroup !== 'all') {
      filtered = filtered.filter(member => 
        member.smallGroup && member.smallGroup === filterGroup
      );
    }

    setFilteredMembers(filtered);
  };

  const ministries = ['all', 'Worship Team', 'Children\'s Ministry', 'Youth Ministry', 
                      'Outreach', 'Prayer Team', 'Audio/Visual', 'Small Groups', 'Hospitality'];
  
  const smallGroups = ['all', 'Wednesday Evening Group', 'Women\'s Bible Study', 
                       'Men\'s Breakfast Group', 'Young Adults Group', 'Tech Team', 'Family Life Group'];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading member directory...</p>
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
            <FaUsers className="text-5xl mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Member Directory</h1>
            <p className="text-xl text-blue-100">
              Connect with fellow members of our church family
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900 text-lg"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaFilter className="inline mr-2" />
                  Filter by Ministry
                </label>
                <select
                  value={filterMinistry}
                  onChange={(e) => setFilterMinistry(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                >
                  {ministries.map(ministry => (
                    <option key={ministry} value={ministry}>
                      {ministry === 'all' ? 'All Ministries' : ministry}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FaUsers className="inline mr-2" />
                  Filter by Small Group
                </label>
                <select
                  value={filterGroup}
                  onChange={(e) => setFilterGroup(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-900"
                >
                  {smallGroups.map(group => (
                    <option key={group} value={group}>
                      {group === 'all' ? 'All Small Groups' : group}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredMembers.length} of {members.length} members
            </div>
          </div>
        </div>
      </section>

      {/* Member Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {filteredMembers.length === 0 ? (
              <div className="text-center py-12">
                <FaUsers className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No members found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterMinistry('all');
                    setFilterGroup('all');
                  }}
                  className="mt-4 text-blue-900 font-semibold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMembers.map((member) => (
                  <div key={member.id} className="card hover:shadow-xl transition-all duration-300 cursor-pointer"
                       onClick={() => setSelectedMember(member)}>
                    {/* Avatar */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                        {member.firstName[0]}{member.lastName[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold truncate">
                          {member.firstName} {member.lastName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Member since {new Date(member.memberSince).getFullYear()}
                        </p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                      <FaMapMarkerAlt className="text-blue-900 flex-shrink-0" />
                      <span className="truncate">{member.city}, {member.state}</span>
                    </div>

                    {/* Small Group */}
                    {member.smallGroup && (
                      <div className="mb-3">
                        <span className="bg-purple-100 text-purple-900 text-xs font-semibold px-3 py-1 rounded-full">
                          {member.smallGroup}
                        </span>
                      </div>
                    )}

                    {/* Ministry Interests */}
                    {member.ministryInterests && member.ministryInterests.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-gray-700 mb-1">Ministry Interests:</p>
                        <div className="flex flex-wrap gap-1">
                          {member.ministryInterests.slice(0, 2).map((ministry, idx) => (
                            <span key={idx} className="bg-blue-100 text-blue-900 text-xs px-2 py-1 rounded">
                              {ministry}
                            </span>
                          ))}
                          {member.ministryInterests.length > 2 && (
                            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                              +{member.ministryInterests.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Bio Preview */}
                    {member.bio && (
                      <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                        {member.bio}
                      </p>
                    )}

                    {/* Contact Actions */}
                    <div className="flex gap-2 pt-4 border-t">
                      <a
                        href={`mailto:${member.email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 bg-blue-900 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors text-center"
                      >
                        <FaEnvelope className="inline mr-1" /> Email
                      </a>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMember(member);
                        }}
                        className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
             onClick={() => setSelectedMember(null)}>
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
               onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-6 rounded-t-lg">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-white text-blue-900 rounded-full flex items-center justify-center text-3xl font-bold">
                  {selectedMember.firstName[0]}{selectedMember.lastName[0]}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    {selectedMember.firstName} {selectedMember.lastName}
                  </h2>
                  <p className="text-blue-100">
                    Member since {new Date(selectedMember.memberSince).toLocaleDateString('en-US', 
                      { month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-bold mb-3">Contact Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-blue-900 w-5" />
                    <a href={`mailto:${selectedMember.email}`} className="text-blue-900 hover:underline">
                      {selectedMember.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaPhone className="text-blue-900 w-5" />
                    <a href={`tel:${selectedMember.phone}`} className="text-blue-900 hover:underline">
                      {selectedMember.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-blue-900 w-5" />
                    <span>{selectedMember.city}, {selectedMember.state}</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              {selectedMember.bio && (
                <div>
                  <h3 className="text-lg font-bold mb-3">About</h3>
                  <p className="text-gray-700">{selectedMember.bio}</p>
                </div>
              )}

              {/* Small Group */}
              {selectedMember.smallGroup && (
                <div>
                  <h3 className="text-lg font-bold mb-3">Small Group</h3>
                  <span className="bg-purple-100 text-purple-900 px-4 py-2 rounded-lg inline-block">
                    {selectedMember.smallGroup}
                  </span>
                </div>
              )}

              {/* Ministry Interests */}
              {selectedMember.ministryInterests && selectedMember.ministryInterests.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold mb-3">Ministry Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.ministryInterests.map((ministry, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-900 px-3 py-2 rounded-lg text-sm font-medium">
                        {ministry}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t flex gap-3">
              <a
                href={`mailto:${selectedMember.email}`}
                className="flex-1 bg-blue-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-800 transition-colors text-center"
              >
                <FaEnvelope className="inline mr-2" />
                Send Email
              </a>
              <button
                onClick={() => setSelectedMember(null)}
                className="bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}