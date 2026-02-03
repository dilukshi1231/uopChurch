// src/app/admin/prayers/page.js
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
  orderBy 
} from 'firebase/firestore';
import { 
  FaPrayingHands, 
  FaTrash, 
  FaEye,
  FaCheckCircle,
  FaClock,
  FaTimes,
  FaHeart,
  FaUser,
  FaEnvelope,
  FaCalendarAlt
} from 'react-icons/fa';

const PrayerDetailModal = ({ prayer, onClose, updatePrayerStatus, deletePrayer, actionLoading, getStatusBadge }) => {
  if (!prayer) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-blue-600 text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Prayer Request Details</h2>
            <p className="text-blue-100 text-sm mt-1">From {prayer.name}</p>
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
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded border border-gray-200">
            <span className="text-gray-700 font-medium">Status:</span>
            {getStatusBadge(prayer.status)}
          </div>

          {/* Requester Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaUser className="text-blue-600" />
              Requester Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Name</p>
                <p className="text-gray-900 font-medium">{prayer.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="text-gray-900 font-medium">{prayer.email}</p>
              </div>
            </div>
          </div>

          {/* Prayer Request */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Prayer Request</h3>
            <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded border border-gray-200">
              {prayer.message}
            </p>
          </div>

          {/* Privacy Setting */}
          {prayer.isPublic !== undefined && (
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <div className="flex items-center gap-2">
                <FaHeart className="text-blue-600" />
                <span className="text-sm text-gray-700">
                  <strong>Privacy:</strong> This request is {prayer.isPublic ? 'public' : 'private'}
                </span>
              </div>
            </div>
          )}

          {/* Submission Date */}
          <div className="bg-gray-50 p-4 rounded border border-gray-200">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <FaCalendarAlt />
              <span>
                Submitted on: <span className="font-semibold text-gray-900">{prayer.createdAt?.toLocaleString()}</span>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            {prayer.status === 'pending' && (
              <button
                onClick={() => updatePrayerStatus(prayer.id, 'answered')}
                disabled={actionLoading}
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <FaCheckCircle />
                    Mark as Answered
                  </>
                )}
              </button>
            )}
            {prayer.status === 'answered' && (
              <button
                onClick={() => updatePrayerStatus(prayer.id, 'pending')}
                disabled={actionLoading}
                className="flex-1 bg-amber-600 text-white px-6 py-3 rounded font-semibold hover:bg-amber-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <FaClock />
                    Mark as Pending
                  </>
                )}
              </button>
            )}
            <button
              onClick={() => deletePrayer(prayer.id)}
              disabled={actionLoading}
              className="px-6 py-3 bg-gray-600 text-white rounded font-semibold hover:bg-gray-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

function PrayerRequestsPage() {
  const [prayers, setPrayers] = useState([]);
  const [filteredPrayers, setFilteredPrayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPrayer, setSelectedPrayer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchPrayers();
  }, []);

  useEffect(() => {
    filterPrayers();
  }, [statusFilter, prayers]);

  const fetchPrayers = async () => {
    try {
      setLoading(true);
      const prayersRef = collection(db, 'prayerRequests');
      const q = query(prayersRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      
      const prayersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(doc.data().createdAt)
      }));

      setPrayers(prayersData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching prayer requests:', error);
      setLoading(false);
    }
  };

  const filterPrayers = () => {
    let filtered = [...prayers];

    if (statusFilter !== 'all') {
      filtered = filtered.filter(p => p.status === statusFilter);
    }

    setFilteredPrayers(filtered);
  };

  const updatePrayerStatus = async (prayerId, newStatus) => {
    try {
      setActionLoading(true);
      const prayerRef = doc(db, 'prayerRequests', prayerId);
      await updateDoc(prayerRef, {
        status: newStatus,
        updatedAt: new Date()
      });
      
      await fetchPrayers();
      
      const statusMessages = {
        answered: 'Prayer request marked as answered!',
        pending: 'Status changed to pending.'
      };
      
      alert(statusMessages[newStatus] || 'Status updated successfully!');
      setShowModal(false);
    } catch (error) {
      console.error('Error updating prayer status:', error);
      alert('Failed to update prayer status. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const deletePrayer = async (prayerId) => {
    if (!confirm('Are you sure you want to delete this prayer request? This action cannot be undone.')) {
      return;
    }

    try {
      setActionLoading(true);
      await deleteDoc(doc(db, 'prayerRequests', prayerId));
      await fetchPrayers();
      alert('Prayer request deleted successfully!');
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting prayer request:', error);
      alert('Failed to delete prayer request. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-amber-100 text-amber-800',
      answered: 'bg-green-100 text-green-800'
    };

    const icons = {
      pending: <FaClock />,
      answered: <FaCheckCircle />
    };

    return (
      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${badges[status] || 'bg-gray-100 text-gray-800'}`}>
        {icons[status]}
        {status?.charAt(0).toUpperCase() + status?.slice(1) || 'Unknown'}
      </span>
    );
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading prayer requests...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const stats = {
    total: prayers.length,
    pending: prayers.filter(p => p.status === 'pending').length,
    answered: prayers.filter(p => p.status === 'answered').length
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-900">Prayer Requests Management</h1>
            <p className="text-gray-600 mt-1">Review and manage prayer requests from the community</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FaPrayingHands className="text-2xl text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total Requests</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-100 rounded-lg">
                  <FaClock className="text-2xl text-amber-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Pending</p>
                  <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <FaCheckCircle className="text-2xl text-green-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Answered</p>
                  <p className="text-2xl font-bold text-green-600">{stats.answered}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="answered">Answered</option>
              </select>
            </div>
          </div>

          {/* Prayer Requests Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Request Preview
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPrayers.length > 0 ? (
                    filteredPrayers.map((prayer) => (
                      <tr 
                        key={prayer.id}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="font-semibold text-blue-900">
                                {prayer.name?.charAt(0)}
                              </span>
                            </div>
                            <div className="font-medium text-gray-900">{prayer.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {prayer.email}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-md truncate">
                            {prayer.message}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(prayer.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {prayer.createdAt?.toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => {
                              setSelectedPrayer(prayer);
                              setShowModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                          >
                            <FaEye /> View
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <div className="text-gray-400">
                          <FaPrayingHands className="text-6xl mx-auto mb-4 opacity-20" />
                          <p className="text-lg font-semibold">No prayer requests found</p>
                          <p className="text-sm">Try adjusting your filter</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <PrayerDetailModal
          prayer={selectedPrayer}
          onClose={() => {
            setShowModal(false);
            setSelectedPrayer(null);
          }}
          updatePrayerStatus={updatePrayerStatus}
          deletePrayer={deletePrayer}
          actionLoading={actionLoading}
          getStatusBadge={getStatusBadge}
        />
      )}
    </AdminLayout>
  );
}

export default withAuth(PrayerRequestsPage, ['admin', 'staff']);