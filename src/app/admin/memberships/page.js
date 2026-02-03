// src/app/admin/memberships/page.js
'use client';
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import withAuth from '@/components/withAuth';
import { db } from '@/lib/firebase';
import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  Timestamp,
  addDoc
} from 'firebase/firestore';
import { 
  FaUsers, 
  FaSearch, 
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
  FaTimes,
  FaPlus,
  FaUserPlus,
  FaCalendarAlt,
  FaIdCard,
  FaEdit
} from 'react-icons/fa';

// ✅ MOVED OUTSIDE - Component declared outside to prevent recreation
const AddMemberModal = ({ onClose, newMemberData, setNewMemberData, handleAddMember, actionLoading }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-blue-600 text-white p-6 rounded-t-lg flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Add New Member</h2>
            <p className="text-blue-100 text-sm mt-1">Manually add a member to the church</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-blue-700 rounded transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleAddMember} className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaIdCard className="text-blue-600" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newMemberData.firstName}
                  onChange={(e) => setNewMemberData(prev => ({...prev, firstName: e.target.value}))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newMemberData.lastName}
                  onChange={(e) => setNewMemberData(prev => ({...prev, lastName: e.target.value}))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={newMemberData.dateOfBirth}
                  onChange={(e) => setNewMemberData(prev => ({...prev, dateOfBirth: e.target.value}))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaEnvelope className="text-blue-600" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={newMemberData.email}
                  onChange={(e) => setNewMemberData(prev => ({...prev, email: e.target.value}))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={newMemberData.phone}
                  onChange={(e) => setNewMemberData(prev => ({...prev, phone: e.target.value}))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-600" />
              Address
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Street Address</label>
                <input
                  type="text"
                  value={newMemberData.address}
                  onChange={(e) => setNewMemberData(prev => ({...prev, address: e.target.value}))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="123 Main St"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    value={newMemberData.city}
                    onChange={(e) => setNewMemberData(prev => ({...prev, city: e.target.value}))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    value={newMemberData.state}
                    onChange={(e) => setNewMemberData(prev => ({...prev, state: e.target.value}))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="ST"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">ZIP Code</label>
                  <input
                    type="text"
                    value={newMemberData.zipCode}
                    onChange={(e) => setNewMemberData(prev => ({...prev, zipCode: e.target.value}))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="12345"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes</label>
            <textarea
              value={newMemberData.message}
              onChange={(e) => setNewMemberData(prev => ({...prev, message: e.target.value}))}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Any additional information..."
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              type="submit"
              disabled={actionLoading}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {actionLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Adding...
                </>
              ) : (
                <>
                  <FaUserPlus />
                  Add Member
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ✅ MOVED OUTSIDE - Component declared outside to prevent recreation
const MembershipDetailModal = ({ membership, onClose, updateMembershipStatus, deleteMembership, actionLoading, getStatusBadge }) => {
  if (!membership) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-blue-600 text-white p-6 rounded-t-lg flex items-center justify-between z-10">
          <div>
            <h2 className="text-2xl font-bold">{membership.firstName} {membership.lastName}</h2>
            <p className="text-blue-100 text-sm mt-1">Membership Request Details</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-blue-700 rounded transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status */}
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-200">
            <span className="text-gray-700 font-semibold">Current Status:</span>
            {getStatusBadge(membership.status)}
          </div>

          {/* Personal Information */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaIdCard className="text-blue-600" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-1">First Name</p>
                <p className="text-gray-900 font-medium">{membership.firstName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-1">Last Name</p>
                <p className="text-gray-900 font-medium">{membership.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-1 flex items-center gap-2">
                  <FaBirthdayCake className="text-blue-600" />
                  Date of Birth
                </p>
                <p className="text-gray-900 font-medium">{membership.dateOfBirth || 'Not provided'}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaEnvelope className="text-blue-600" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-1 flex items-center gap-2">
                  <FaEnvelope className="text-blue-600" />
                  Email
                </p>
                <p className="text-gray-900 font-medium">{membership.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-1 flex items-center gap-2">
                  <FaPhone className="text-blue-600" />
                  Phone
                </p>
                <p className="text-gray-900 font-medium">{membership.phone}</p>
              </div>
            </div>
          </div>

          {/* Address */}
          {(membership.address || membership.city || membership.state) && (
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-600" />
                Address
              </h3>
              <div className="space-y-2">
                {membership.address && <p className="text-gray-900 font-medium">{membership.address}</p>}
                <p className="text-gray-900 font-medium">
                  {[membership.city, membership.state, membership.zipCode].filter(Boolean).join(', ')}
                </p>
              </div>
            </div>
          )}

          {/* Message */}
          {membership.message && (
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Additional Information</h3>
              <p className="text-gray-700 leading-relaxed">{membership.message}</p>
            </div>
          )}

          {/* Submission Date */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-2 text-gray-600">
              <FaCalendarAlt />
              <span className="text-sm">
                Submitted on: <span className="font-semibold text-gray-900">{membership.createdAt?.toLocaleString()}</span>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            {membership.status === 'pending' && (
              <>
                <button
                  onClick={() => updateMembershipStatus(membership.id, 'approved')}
                  disabled={actionLoading}
                  className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {actionLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <FaCheckCircle />
                      Approve
                    </>
                  )}
                </button>
                <button
                  onClick={() => updateMembershipStatus(membership.id, 'rejected')}
                  disabled={actionLoading}
                  className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {actionLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <FaTimesCircle />
                      Reject
                    </>
                  )}
                </button>
              </>
            )}
            {membership.status !== 'pending' && (
              <button
                onClick={() => updateMembershipStatus(membership.id, 'pending')}
                disabled={actionLoading}
                className="flex-1 bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <FaClock />
                    Set to Pending
                  </>
                )}
              </button>
            )}
            <button
              onClick={() => deleteMembership(membership.id)}
              disabled={actionLoading}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

function MembershipsPage() {
  const [memberships, setMemberships] = useState([]);
  const [filteredMemberships, setFilteredMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMembership, setSelectedMembership] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Add new membership form data
  const [newMemberData, setNewMemberData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    message: ''
  });

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
        createdAt: doc.data().createdAt?.toDate?.() || new Date(doc.data().createdAt)
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
        `${m.firstName} ${m.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.phone?.includes(searchTerm)
      );
    }

    setFilteredMemberships(filtered);
  };

  const updateMembershipStatus = async (membershipId, newStatus) => {
    try {
      setActionLoading(true);
      const membershipRef = doc(db, 'memberships', membershipId);
      await updateDoc(membershipRef, {
        status: newStatus,
        updatedAt: Timestamp.now()
      });
      
      await fetchMemberships();
      
      // Show success message
      const statusMessages = {
        approved: 'Membership approved successfully!',
        rejected: 'Membership request rejected.',
        pending: 'Status changed to pending.'
      };
      
      alert(statusMessages[newStatus] || 'Status updated successfully!');
      setShowModal(false);
    } catch (error) {
      console.error('Error updating membership:', error);
      alert('Failed to update membership status. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const deleteMembership = async (membershipId) => {
    if (!confirm('Are you sure you want to delete this membership request? This action cannot be undone.')) {
      return;
    }

    try {
      setActionLoading(true);
      await deleteDoc(doc(db, 'memberships', membershipId));
      await fetchMemberships();
      alert('Membership deleted successfully!');
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting membership:', error);
      alert('Failed to delete membership. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    
    try {
      setActionLoading(true);
      
      // Validate required fields
      if (!newMemberData.firstName || !newMemberData.lastName || !newMemberData.email || !newMemberData.phone) {
        alert('Please fill in all required fields.');
        setActionLoading(false);
        return;
      }

      // Add to Firestore
      await addDoc(collection(db, 'memberships'), {
        firstName: newMemberData.firstName,
        lastName: newMemberData.lastName,
        email: newMemberData.email,
        phone: newMemberData.phone,
        dateOfBirth: newMemberData.dateOfBirth,
        address: newMemberData.address,
        city: newMemberData.city,
        state: newMemberData.state,
        zipCode: newMemberData.zipCode,
        message: newMemberData.message,
        status: 'approved', // Manually added members are auto-approved
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });

      // Reset form
      setNewMemberData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        message: ''
      });

      alert('Member added successfully!');
      setShowAddModal(false);
      await fetchMemberships();
    } catch (error) {
      console.error('Error adding member:', error);
      alert('Failed to add member. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = ['First Name', 'Last Name', 'Email', 'Phone', 'Date of Birth', 'Address', 'City', 'State', 'ZIP', 'Status', 'Created At'];
    const csvData = filteredMemberships.map(m => [
      m.firstName || '',
      m.lastName || '',
      m.email || '',
      m.phone || '',
      m.dateOfBirth || '',
      m.address || '',
      m.city || '',
      m.state || '',
      m.zipCode || '',
      m.status || '',
      m.createdAt?.toLocaleDateString() || ''
    ]);

    const csv = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `memberships-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-amber-100 text-amber-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };

    const icons = {
      pending: <FaClock />,
      approved: <FaCheckCircle />,
      rejected: <FaTimesCircle />
    };

    return (
      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${badges[status] || 'bg-gray-100 text-gray-800'}`}>
        {icons[status]}
        {status?.charAt(0).toUpperCase() + status?.slice(1) || 'Unknown'}
      </span>
    );
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading memberships...</p>
          </div>
        </div>
      </AdminLayout>
    );
  };

  const stats = {
    total: memberships.length,
    pending: memberships.filter(m => m.status === 'pending').length,
    approved: memberships.filter(m => m.status === 'approved').length,
    rejected: memberships.filter(m => m.status === 'rejected').length
  };

  return (
    <AdminLayout>
      <div className="bg-gray-50 p-4 md:p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Membership Management</h1>
          <p className="text-gray-600">Review and manage church membership requests</p>
        </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <FaUsers className="text-3xl text-blue-600" />
              </div>
              <p className="text-gray-600 text-sm font-medium mb-1">Total Requests</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <FaClock className="text-3xl text-amber-600" />
              </div>
              <p className="text-gray-600 text-sm font-medium mb-1">Pending Review</p>
              <p className="text-3xl font-bold text-amber-600">{stats.pending}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <FaCheckCircle className="text-3xl text-green-600" />
              </div>
              <p className="text-gray-600 text-sm font-medium mb-1">Approved</p>
              <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <FaTimesCircle className="text-3xl text-red-600" />
              </div>
              <p className="text-gray-600 text-sm font-medium mb-1">Rejected</p>
              <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
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
                  onClick={() => setShowAddModal(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <FaPlus />
                  Add Member
                </button>
                <button
                  onClick={exportToCSV}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <FaDownload />
                  Export CSV
                </button>
              </div>
            </div>
          </div>

          {/* Memberships Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date of Birth</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Submitted</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMemberships.length > 0 ? (
                  filteredMemberships.map((membership) => (
                    <tr 
                      key={membership.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{membership.firstName} {membership.lastName}</p>
                        <p className="text-sm text-gray-500">
                          {membership.address && `${membership.address}, `}
                          {membership.city && `${membership.city}`}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">{membership.email}</p>
                        <p className="text-sm text-gray-500">{membership.phone}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {membership.dateOfBirth || 'N/A'}
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
                          className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                        >
                          <FaEye />
                          View
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

        {/* Modals */}
        {showModal && (
          <MembershipDetailModal
            membership={selectedMembership}
            onClose={() => {
              setShowModal(false);
              setSelectedMembership(null);
            }}
            updateMembershipStatus={updateMembershipStatus}
            deleteMembership={deleteMembership}
            actionLoading={actionLoading}
            getStatusBadge={getStatusBadge}
          />
        )}

        {showAddModal && (
          <AddMemberModal
            onClose={() => {
              setShowAddModal(false);
              setNewMemberData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                dateOfBirth: '',
                address: '',
                city: '',
                state: '',
                zipCode: '',
                message: ''
              });
            }}
            newMemberData={newMemberData}
            setNewMemberData={setNewMemberData}
            handleAddMember={handleAddMember}
            actionLoading={actionLoading}
          />
        )}
      </div>
    </AdminLayout>
  );
}

export default withAuth(MembershipsPage, ['admin', 'staff']);