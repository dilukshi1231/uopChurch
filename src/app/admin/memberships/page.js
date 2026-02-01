// src/app/admin/memberships/page.js
'use client';
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { withAuth } from '@/middleware/withAuth';
import { db } from '@/lib/firebase';
import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  where 
} from 'firebase/firestore';
import { 
  FaUsers, 
  FaSearch, 
  FaFilter, 
  FaCheckCircle, 
  FaTimesCircle,
  FaClock,
  FaTrash,
  FaEye,
  FaDownload,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBirthdayCake,
  FaTimes
} from 'react-icons/fa';

function MembershipsPage() {
  const [memberships, setMemberships] = useState([]);
  const [filteredMemberships, setFilteredMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMembership, setSelectedMembership] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchMemberships();
  }, []);

  useEffect(() => {
    filterMemberships();
  }, [searchTerm, statusFilter, memberships]);

  const fetchMemberships = async () => {
    try {
      setLoading(true);
      const membershipRef = collection(db, 'memberships');
      const q = query(membershipRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      
      const membershipData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      }));

      setMemberships(membershipData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching memberships:', error);
      setLoading(false);
    }
  };

  const filterMemberships = () => {
    let filtered = [...memberships];

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(m => m.status === statusFilter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(m => 
        m.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.phone?.includes(searchTerm)
      );
    }

    setFilteredMemberships(filtered);
  };

  const updateMembershipStatus = async (membershipId, newStatus) => {
    try {
      const membershipRef = doc(db, 'memberships', membershipId);
      await updateDoc(membershipRef, {
        status: newStatus,
        updatedAt: new Date()
      });
      
      await fetchMemberships();
      alert(`Membership ${newStatus} successfully!`);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating membership:', error);
      alert('Failed to update membership status');
    }
  };

  const deleteMembership = async (membershipId) => {
    if (!confirm('Are you sure you want to delete this membership request?')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'memberships', membershipId));
      await fetchMemberships();
      alert('Membership deleted successfully!');
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting membership:', error);
      alert('Failed to delete membership');
    }
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Date of Birth', 'Address', 'Status', 'Created At'];
    const csvData = filteredMemberships.map(m => [
      m.name,
      m.email,
      m.phone,
      m.dateOfBirth,
      m.address,
      m.status,
      m.createdAt?.toLocaleDateString()
    ]);

    const csv = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `memberships-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-amber-100 text-amber-800 border-amber-300',
      approved: 'bg-green-100 text-green-800 border-green-300',
      rejected: 'bg-red-100 text-red-800 border-red-300'
    };

    const icons = {
      pending: <FaClock />,
      approved: <FaCheckCircle />,
      rejected: <FaTimesCircle />
    };

    return (
      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold border ${badges[status] || 'bg-gray-100 text-gray-800'}`}>
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const MembershipDetailModal = ({ membership, onClose }) => {
    if (!membership) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-gradient-to-r from-blue-900 to-blue-700 text-white p-6 rounded-t-2xl flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">Membership Details</h2>
              <p className="text-blue-200 text-sm">Review and manage membership request</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <FaTimes className="text-2xl" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Status Badge */}
            <div className="flex items-center justify-between">
              {getStatusBadge(membership.status)}
              <span className="text-sm text-gray-500">
                Submitted {membership.createdAt?.toLocaleDateString()}
              </span>
            </div>

            {/* Personal Information */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaUsers className="text-blue-600" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600">Full Name</label>
                  <p className="text-gray-900 font-medium">{membership.name}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Date of Birth</label>
                  <p className="text-gray-900 font-medium flex items-center gap-2">
                    <FaBirthdayCake className="text-pink-500" />
                    {membership.dateOfBirth}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border border-green-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaEnvelope className="text-green-600" />
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-gray-400" />
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Email</label>
                    <p className="text-gray-900 font-medium">{membership.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhone className="text-gray-400" />
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Phone</label>
                    <p className="text-gray-900 font-medium">{membership.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-gray-400 mt-1" />
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Address</label>
                    <p className="text-gray-900 font-medium">{membership.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            {membership.message && (
              <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Additional Message</h3>
                <p className="text-gray-700 leading-relaxed">{membership.message}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t">
              {membership.status === 'pending' && (
                <>
                  <button
                    onClick={() => updateMembershipStatus(membership.id, 'approved')}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <FaCheckCircle />
                    Approve Membership
                  </button>
                  <button
                    onClick={() => updateMembershipStatus(membership.id, 'rejected')}
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <FaTimesCircle />
                    Reject Request
                  </button>
                </>
              )}
              {membership.status !== 'pending' && (
                <button
                  onClick={() => updateMembershipStatus(membership.id, 'pending')}
                  className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-700 hover:to-amber-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <FaClock />
                  Mark as Pending
                </button>
              )}
              <button
                onClick={() => deleteMembership(membership.id)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <FaTrash />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-900 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading memberships...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const stats = {
    total: memberships.length,
    pending: memberships.filter(m => m.status === 'pending').length,
    approved: memberships.filter(m => m.status === 'approved').length,
    rejected: memberships.filter(m => m.status === 'rejected').length
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white shadow-2xl">
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <FaUsers className="text-amber-400" />
              Membership Management
            </h1>
            <p className="text-blue-200 text-lg">
              Review and manage church membership requests
            </p>
          </div>
        </div>

        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
              <p className="text-gray-600 text-sm font-semibold mb-1">Total Requests</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-amber-600">
              <p className="text-gray-600 text-sm font-semibold mb-1">Pending Review</p>
              <p className="text-3xl font-bold text-amber-600">{stats.pending}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
              <p className="text-gray-600 text-sm font-semibold mb-1">Approved</p>
              <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-600">
              <p className="text-gray-600 text-sm font-semibold mb-1">Rejected</p>
              <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <button
                  onClick={exportToCSV}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all flex items-center gap-2 shadow-lg"
                >
                  <FaDownload />
                  Export CSV
                </button>
              </div>
            </div>
          </div>

          {/* Memberships Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-bold">Contact</th>
                    <th className="px-6 py-4 text-left text-sm font-bold">Date of Birth</th>
                    <th className="px-6 py-4 text-left text-sm font-bold">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-bold">Submitted</th>
                    <th className="px-6 py-4 text-left text-sm font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredMemberships.length > 0 ? (
                    filteredMemberships.map((membership, index) => (
                      <tr 
                        key={membership.id}
                        className="hover:bg-blue-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <p className="font-semibold text-gray-900">{membership.name}</p>
                          <p className="text-sm text-gray-500">{membership.address}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900">{membership.email}</p>
                          <p className="text-sm text-gray-500">{membership.phone}</p>
                        </td>
                        <td className="px-6 py-4 text-gray-900">
                          {membership.dateOfBirth}
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(membership.status)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {membership.createdAt?.toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => {
                              setSelectedMembership(membership);
                              setShowModal(true);
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
                          >
                            <FaEye />
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <div className="text-gray-400">
                          <FaUsers className="text-6xl mx-auto mb-4 opacity-20" />
                          <p className="text-lg font-semibold">No memberships found</p>
                          <p className="text-sm">Try adjusting your search or filters</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <MembershipDetailModal
            membership={selectedMembership}
            onClose={() => {
              setShowModal(false);
              setSelectedMembership(null);
            }}
          />
        )}
      </div>
    </AdminLayout>
  );
}

export default withAuth(MembershipsPage, ['admin', 'staff']);

