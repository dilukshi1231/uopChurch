// src/app/admin/prayers/page.js
'use client';
import { useState, useEffect } from 'react';
import { withAuth } from '@/middleware/withAuth';
import { db } from '@/lib/firebase';
import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy 
} from 'firebase/firestore';
import { 
  FaPrayingHands, 
  FaTrash, 
  FaEye,
  FaCheckCircle,
  FaClock,
  FaTimes,
  FaUser,
  FaPhone,
  FaCalendarAlt,
  FaHeart,
  FaEnvelope
} from 'react-icons/fa';

const PrayerDetailModal = ({ prayer, onClose, updatePrayerStatus, deletePrayer, actionLoading, getStatusBadge }) => {
  if (!prayer) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-purple-600 text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FaPrayingHands />
              Prayer Request Details
            </h2>
            <p className="text-purple-100 text-sm mt-1">From {prayer.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-purple-700 rounded transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status */}
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded border border-gray-200">
            <span className="text-gray-700 font-medium">Prayer Status:</span>
            {getStatusBadge(prayer.status)}
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaUser className="text-purple-600" />
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
              {prayer.phone && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Phone</p>
                  <p className="text-gray-900 font-medium">{prayer.phone}</p>
                </div>
              )}
            </div>
          </div>

          {/* Subject */}
          {prayer.subject && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <FaHeart className="text-red-500" />
                Prayer Subject
              </h3>
              <p className="text-gray-700 bg-purple-50 p-4 rounded border border-purple-200 font-medium">
                {prayer.subject}
              </p>
            </div>
          )}

          {/* Prayer Request */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <FaPrayingHands className="text-purple-600" />
              Prayer Request
            </h3>
            <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded border border-gray-200 whitespace-pre-wrap">
              {prayer.message}
            </p>
          </div>

          {/* Submission Date */}
          <div className="bg-gray-50 p-4 rounded border border-gray-200">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <FaCalendarAlt />
              <span>
                Submitted on: <span className="font-semibold text-gray-900">
                  {prayer.timestamp?.toLocaleString()}
                </span>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            {prayer.status === 'active' && (
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
                onClick={() => updatePrayerStatus(prayer.id, 'active')}
                disabled={actionLoading}
                className="flex-1 bg-purple-600 text-white px-6 py-3 rounded font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <FaClock />
                    Mark as Active
                  </>
                )}
              </button>
            )}
            <button
              onClick={() => updatePrayerStatus(prayer.id, 'archived')}
              disabled={actionLoading || prayer.status === 'archived'}
              className="px-6 py-3 bg-gray-600 text-white rounded font-semibold hover:bg-gray-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaClock />
              Archive
            </button>
            <button
              onClick={() => deletePrayer(prayer.id)}
              disabled={actionLoading}
              className="px-6 py-3 bg-red-600 text-white rounded font-semibold hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
      
      // Fetch all contacts first
      const allContactsRef = collection(db, 'contacts');
      const allSnapshot = await getDocs(allContactsRef);
      
      const allContactsData = allSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Filter for prayer requests (case-insensitive)
      const prayersData = allContactsData.filter(c => 
        c.contactReason === 'prayer' || c.contactReason === 'Prayer'
      );
      
      // Map to prayer format
      const mappedPrayers = prayersData.map(data => ({
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        subject: data.subject || '',
        message: data.message,
        timestamp: data.timestamp?.toDate?.() || new Date(data.timestamp),
        status: data.prayerStatus || (data.status === 'replied' ? 'answered' : 'active')
      }));

      setPrayers(mappedPrayers);
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
      const prayerRef = doc(db, 'contacts', prayerId);
      
      await updateDoc(prayerRef, {
        prayerStatus: newStatus,
        status: newStatus === 'answered' ? 'replied' : 'new',
        updatedAt: new Date()
      });
      
      await fetchPrayers();
      
      const statusMessages = {
        answered: '✅ Prayer marked as answered!',
        active: '🙏 Prayer marked as active.',
        archived: '📁 Prayer archived.'
      };
      
      alert(statusMessages[newStatus] || 'Status updated!');
      setShowModal(false);
      setActionLoading(false);
    } catch (error) {
      console.error('Error updating prayer status:', error);
      alert('❌ Failed to update status. Please try again.');
      setActionLoading(false);
    }
  };

  const deletePrayer = async (prayerId) => {
    if (!confirm('Are you sure you want to delete this prayer request? This action cannot be undone.')) {
      return;
    }

    try {
      setActionLoading(true);
      await deleteDoc(doc(db, 'contacts', prayerId));
      await fetchPrayers();
      alert('🗑️ Prayer request deleted successfully.');
      setShowModal(false);
      setActionLoading(false);
    } catch (error) {
      console.error('Error deleting prayer:', error);
      alert('❌ Failed to delete prayer request. Please try again.');
      setActionLoading(false);
    }
  };

  const handleViewPrayer = (prayer) => {
    setSelectedPrayer(prayer);
    setShowModal(true);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        icon: <FaCheckCircle />,
        label: 'Active'
      },
      answered: {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        icon: <FaHeart />,
        label: 'Answered'
      },
      archived: {
        bg: 'bg-gray-100',
        text: 'text-gray-800',
        icon: <FaClock />,
        label: 'Archived'
      }
    };

    const config = statusConfig[status] || statusConfig.active;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${config.bg} ${config.text}`}>
        {config.icon}
        {config.label}
      </span>
    );
  };

  const stats = {
    total: prayers.length,
    active: prayers.filter(p => p.status === 'active').length,
    answered: prayers.filter(p => p.status === 'answered').length,
    archived: prayers.filter(p => p.status === 'archived').length
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading prayer requests...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <FaPrayingHands className="text-4xl text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">Prayer Requests Management</h1>
        </div>
        <p className="text-gray-600">Manage and respond to prayer requests from your church community</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Requests</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-full">
              <FaPrayingHands className="text-2xl text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active</p>
              <p className="text-3xl font-bold text-gray-900">{stats.active}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-full">
              <FaCheckCircle className="text-2xl text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Answered</p>
              <p className="text-3xl font-bold text-gray-900">{stats.answered}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-full">
              <FaHeart className="text-2xl text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-gray-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Archived</p>
              <p className="text-3xl font-bold text-gray-900">{stats.archived}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-full">
              <FaClock className="text-2xl text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Prayer Requests List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">All Prayer Requests</h2>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === 'active'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Active ({stats.active})
            </button>
            <button
              onClick={() => setStatusFilter('answered')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === 'answered'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Answered ({stats.answered})
            </button>
            <button
              onClick={() => setStatusFilter('archived')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === 'archived'
                  ? 'bg-gray-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Archived ({stats.archived})
            </button>
          </div>
        </div>

        {filteredPrayers.length === 0 ? (
          <div className="p-12 text-center">
            <FaPrayingHands className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">
              {statusFilter === 'all' 
                ? 'No prayer requests found.'
                : `No ${statusFilter} prayer requests found.`}
            </p>
            <p className="text-sm text-gray-400">
              Prayer requests submitted through the contact form will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Requester
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPrayers.map((prayer) => (
                  <tr key={prayer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 font-semibold">
                            {prayer.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{prayer.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{prayer.email}</div>
                      {prayer.phone && (
                        <div className="text-sm text-gray-500">{prayer.phone}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {prayer.subject || 'No subject'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(prayer.timestamp).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(prayer.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleViewPrayer(prayer)}
                        className="text-purple-600 hover:text-purple-900 font-medium flex items-center gap-1"
                      >
                        <FaEye />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredPrayers.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
            Showing {filteredPrayers.length} of {stats.total} prayer requests
          </div>
        )}
      </div>

      {showModal && selectedPrayer && (
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
    </div>
  );
}

export default withAuth(PrayerRequestsPage, ['admin', 'staff']);