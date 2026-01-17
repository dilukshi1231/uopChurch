'use client';
import { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { format } from 'date-fns';
import { FaUser, FaEnvelope, FaPhone, FaCheck, FaTimes, FaEye } from 'react-icons/fa';

export default function AdminMembershipsPage() {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    fetchMemberships();
  }, []);

  const fetchMemberships = async () => {
    try {
      const membershipsRef = collection(db, 'memberships');
      const q = query(membershipsRef, orderBy('submittedAt', 'desc'));
      const snapshot = await getDocs(q);
      
      const membershipsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        submittedAt: doc.data().submittedAt.toDate()
      }));
      
      setMemberships(membershipsData);
    } catch (error) {
      console.error('Error fetching memberships:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, 'memberships', id), {
        status,
        approvedAt: status === 'approved' ? new Date() : null,
        approvedBy: 'Admin User' // In production, use actual user
      });
      fetchMemberships();
      setSelectedMember(null);
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status');
    }
  };

  const filteredMemberships = filter === 'all' 
    ? memberships 
    : memberships.filter(m => m.status === filter);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Membership Applications</h1>
          <p className="text-gray-600">Review and approve membership applications</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-6">
          {['all', 'pending', 'approved', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2 rounded-lg font-medium capitalize transition-colors ${
                filter === status
                  ? 'bg-blue-900 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {status} ({memberships.filter(m => status === 'all' ? true : m.status === status).length})
            </button>
          ))}
        </div>

        {/* Applications List */}
        <div className="grid gap-6">
          {filteredMemberships.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <p className="text-gray-600">No applications found</p>
            </div>
          ) : (
            filteredMemberships.map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <FaUser className="text-blue-900 text-xl" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">
                        {member.firstName} {member.lastName}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center gap-1">
                          <FaEnvelope className="text-blue-900" />
                          {member.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaPhone className="text-blue-900" />
                          {member.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[member.status]}`}>
                    {member.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="font-semibold">Submitted:</span> {format(member.submittedAt, 'MMM dd, yyyy')}
                  </div>
                  <div>
                    <span className="font-semibold">Location:</span> {member.city}, {member.state}
                  </div>
                  <div>
                    <span className="font-semibold">Baptized:</span> {member.baptized}
                  </div>
                  <div>
                    <span className="font-semibold">Ministry Interests:</span> {member.ministryInterests.length}
                  </div>
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => setSelectedMember(member)}
                    className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                  >
                    <FaEye /> View Details
                  </button>
                  
                  {member.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateStatus(member.id, 'approved')}
                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <FaCheck /> Approve
                      </button>
                      <button
                        onClick={() => updateStatus(member.id, 'rejected')}
                        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <FaTimes /> Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Detail Modal */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b sticky top-0 bg-white">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">
                    {selectedMember.firstName} {selectedMember.lastName}
                  </h2>
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes className="text-2xl" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-bold mb-3">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div><strong>Email:</strong> {selectedMember.email}</div>
                    <div><strong>Phone:</strong> {selectedMember.phone}</div>
                    <div><strong>Date of Birth:</strong> {selectedMember.dateOfBirth}</div>
                    <div><strong>Gender:</strong> {selectedMember.gender}</div>
                    <div><strong>Marital Status:</strong> {selectedMember.maritalStatus}</div>
                    <div><strong>Address:</strong> {selectedMember.address}</div>
                    <div><strong>City:</strong> {selectedMember.city}</div>
                    <div><strong>State:</strong> {selectedMember.state}</div>
                    <div><strong>ZIP:</strong> {selectedMember.zipCode}</div>
                  </div>
                </div>

                {/* Spiritual Information */}
                <div>
                  <h3 className="text-lg font-bold mb-3">Spiritual Journey</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Salvation Date:</strong> {selectedMember.salvationDate || 'Not provided'}</div>
                    <div><strong>Baptized:</strong> {selectedMember.baptized}</div>
                    {selectedMember.baptismDate && (
                      <div><strong>Baptism Date:</strong> {selectedMember.baptismDate}</div>
                    )}
                    {selectedMember.previousChurch && (
                      <div><strong>Previous Church:</strong> {selectedMember.previousChurch}</div>
                    )}
                    <div>
                      <strong>Reason for Membership:</strong>
                      <p className="mt-1 text-gray-700">{selectedMember.membershipReason}</p>
                    </div>
                  </div>
                </div>

                {/* Ministry Information */}
                <div>
                  <h3 className="text-lg font-bold mb-3">Ministry & Service</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <strong>Ministry Interests:</strong>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedMember.ministryInterests.map((interest, idx) => (
                          <span key={idx} className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <strong>Spiritual Gifts:</strong>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedMember.spiritualGifts.map((gift, idx) => (
                          <span key={idx} className="bg-green-100 text-green-900 px-3 py-1 rounded-full text-xs">
                            {gift}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <strong>Availability:</strong>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedMember.availability.map((time, idx) => (
                          <span key={idx} className="bg-purple-100 text-purple-900 px-3 py-1 rounded-full text-xs">
                            {time}
                          </span>
                        ))}
                      </div>
                    </div>
                    {selectedMember.servingExperience && (
                      <div>
                        <strong>Previous Experience:</strong>
                        <p className="mt-1 text-gray-700">{selectedMember.servingExperience}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Emergency Contact */}
                <div>
                  <h3 className="text-lg font-bold mb-3">Emergency Contact</h3>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div><strong>Name:</strong> {selectedMember.emergencyName}</div>
                    <div><strong>Relationship:</strong> {selectedMember.emergencyRelationship}</div>
                    <div><strong>Phone:</strong> {selectedMember.emergencyPhone}</div>
                  </div>
                </div>

                {/* Actions */}
                {selectedMember.status === 'pending' && (
                  <div className="flex gap-3 pt-4 border-t">
                    <button
                      onClick={() => updateStatus(selectedMember.id, 'approved')}
                      className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      Approve Application
                    </button>
                    <button
                      onClick={() => updateStatus(selectedMember.id, 'rejected')}
                      className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    >
                      Reject Application
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}