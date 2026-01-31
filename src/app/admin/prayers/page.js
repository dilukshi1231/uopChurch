// src/app/admin/prayers/page.js
'use client';
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { withAuth } from '@/middleware/withAuth';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { FaPrayingHands, FaCheck, FaTrash, FaEye, FaTimes, FaFilter } from 'react-icons/fa';

function PrayersPage() {
  const [prayers, setPrayers] = useState([]);
  const [filteredPrayers, setFilteredPrayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrayer, setSelectedPrayer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    fetchPrayers();
  }, []);

  useEffect(() => {
    filterPrayers();
  }, [statusFilter, categoryFilter, prayers]);

  const fetchPrayers = async () => {
    try {
      setLoading(true);
      const prayersRef = collection(db, 'prayers');
      const q = query(prayersRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      
      const prayersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      }));

      setPrayers(prayersData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching prayers:', error);
      setLoading(false);
    }
  };

  const filterPrayers = () => {
    let filtered = [...prayers];

    if (statusFilter !== 'all') {
      filtered = filtered.filter(p => p.status === statusFilter);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(p => p.category === categoryFilter);
    }

    setFilteredPrayers(filtered);
  };

  const updateStatus = async (prayerId, newStatus) => {
    try {
      const prayerRef = doc(db, 'prayers', prayerId);
      await updateDoc(prayerRef, {
        status: newStatus,
        updatedAt: new Date()
      });
      
      await fetchPrayers();
      alert(`Prayer request marked as ${newStatus}`);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating prayer:', error);
      alert('Failed to update prayer request');
    }
  };

  const deletePrayer = async (prayerId) => {
    if (!confirm('Are you sure you want to delete this prayer request?')) return;

    try {
      await deleteDoc(doc(db, 'prayers', prayerId));
      await fetchPrayers();
      alert('Prayer request deleted successfully!');
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting prayer:', error);
      alert('Failed to delete prayer request');
    }
  };

  const PrayerDetailModal = ({ prayer, onClose }) => {
    if (!prayer) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-gradient-to-r from-pink-900 to-purple-700 text-white p-6 rounded-t-2xl flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">Prayer Request Details</h2>
              <p className="text-pink-200 text-sm">Review and respond to prayer request</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <FaTimes className="text-2xl" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-gradient-to-br from-pink-50 to-white rounded-xl p-6 border border-pink-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Request Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-semibold text-gray-600">Name</label>
                  <p className="text-gray-900 font-medium">{prayer.name}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Email</label>
                  <p className="text-gray-900 font-medium">{prayer.email}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Category</label>
                  <p className="text-gray-900 font-medium">{prayer.category}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Status</label>
                  <p className="text-gray-900 font-medium">{prayer.status}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-6 border border-purple-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Prayer Request</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{prayer.request}</p>
            </div>

            <div className="text-sm text-gray-500">
              Submitted on {prayer.createdAt?.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>

            <div className="flex gap-3 pt-4 border-t">
              {prayer.status === 'active' && (
                <button
                  onClick={() => updateStatus(prayer.id, 'answered')}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <FaCheck />
                  Mark as Answered
                </button>
              )}
              {prayer.status === 'answered' && (
                <button
                  onClick={() => updateStatus(prayer.id, 'active')}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  Mark as Active
                </button>
              )}
              <button
                onClick={() => deletePrayer(prayer.id)}
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
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-900 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading prayer requests...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const stats = {
    total: prayers.length,
    active: prayers.filter(p => p.status === 'active').length,
    answered: prayers.filter(p => p.status === 'answered').length
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-pink-50/30 to-white">
        <div className="bg-gradient-to-r from-pink-900 via-purple-800 to-pink-900 text-white shadow-2xl">
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <FaPrayingHands className="text-amber-400" />
              Prayer Requests
            </h1>
            <p className="text-pink-200 text-lg">
              Manage and respond to community prayer needs
            </p>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-pink-600">
              <p className="text-gray-600 text-sm font-semibold mb-1">Total Requests</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
              <p className="text-gray-600 text-sm font-semibold mb-1">Active Prayers</p>
              <p className="text-3xl font-bold text-blue-600">{stats.active}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
              <p className="text-gray-600 text-sm font-semibold mb-1">Answered</p>
              <p className="text-3xl font-bold text-green-600">{stats.answered}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="answered">Answered</option>
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              >
                <option value="all">All Categories</option>
                <option value="personal">Personal</option>
                <option value="family">Family</option>
                <option value="health">Health</option>
                <option value="guidance">Guidance</option>
                <option value="thanksgiving">Thanksgiving</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrayers.map(prayer => (
              <div key={prayer.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{prayer.name}</h3>
                    <p className="text-sm text-gray-500">{prayer.email}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    prayer.status === 'active' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {prayer.status}
                  </span>
                </div>
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-xs font-semibold">
                    {prayer.category}
                  </span>
                </div>
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">{prayer.request}</p>
                <p className="text-xs text-gray-500 mb-4">
                  {prayer.createdAt?.toLocaleDateString()}
                </p>
                <button
                  onClick={() => {
                    setSelectedPrayer(prayer);
                    setShowModal(true);
                  }}
                  className="w-full px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <FaEye />
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>

        {showModal && (
          <PrayerDetailModal
            prayer={selectedPrayer}
            onClose={() => {
              setShowModal(false);
              setSelectedPrayer(null);
            }}
          />
        )}
      </div>
    </AdminLayout>
  );
}

export default withAuth(PrayersPage, ['admin', 'staff']);