// src/app/admin/contacts/page.js
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
  FaEnvelope, 
  FaTrash, 
  FaEye,
  FaCheckCircle,
  FaClock,
  FaTimes,
  FaUser,
  FaPhone,
  FaCalendarAlt,
  FaExclamationCircle
} from 'react-icons/fa';

const ContactDetailModal = ({ contact, onClose, updateContactStatus, deleteContact, actionLoading, getStatusBadge }) => {
  if (!contact) return null;

  const contactReasonLabels = {
    general: 'General Inquiry',
    visit: 'Planning a Visit',
    prayer: 'Prayer Request',
    volunteer: 'Volunteer Opportunities',
    events: 'Events Information',
    giving: 'Giving Questions',
    pastoral: 'Pastoral Care'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-blue-600 text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Contact Message Details</h2>
            <p className="text-blue-100 text-sm mt-1">From {contact.name}</p>
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
            {getStatusBadge(contact.status)}
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FaUser className="text-blue-600" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Name</p>
                <p className="text-gray-900 font-medium">{contact.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="text-gray-900 font-medium">{contact.email}</p>
              </div>
              {contact.phone && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Phone</p>
                  <p className="text-gray-900 font-medium">{contact.phone}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-600 mb-1">Reason for Contact</p>
                <p className="text-gray-900 font-medium">
                  {contactReasonLabels[contact.contactReason] || contact.contactReason}
                </p>
              </div>
            </div>
          </div>

          {/* Subject */}
          {contact.subject && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Subject</h3>
              <p className="text-gray-700 bg-gray-50 p-4 rounded border border-gray-200">
                {contact.subject}
              </p>
            </div>
          )}

          {/* Message */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Message</h3>
            <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded border border-gray-200">
              {contact.message}
            </p>
          </div>

          {/* Submission Date */}
          <div className="bg-gray-50 p-4 rounded border border-gray-200">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <FaCalendarAlt />
              <span>
                Submitted on: <span className="font-semibold text-gray-900">
                  {contact.timestamp?.toLocaleString()}
                </span>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            {contact.status === 'new' && (
              <button
                onClick={() => updateContactStatus(contact.id, 'replied')}
                disabled={actionLoading}
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <FaCheckCircle />
                    Mark as Replied
                  </>
                )}
              </button>
            )}
            {contact.status === 'replied' && (
              <button
                onClick={() => updateContactStatus(contact.id, 'new')}
                disabled={actionLoading}
                className="flex-1 bg-amber-600 text-white px-6 py-3 rounded font-semibold hover:bg-amber-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <FaClock />
                    Mark as New
                  </>
                )}
              </button>
            )}
            <button
              onClick={() => deleteContact(contact.id)}
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

function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    filterContacts();
  }, [statusFilter, contacts]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const contactsRef = collection(db, 'contacts');
      const q = query(contactsRef, orderBy('timestamp', 'desc'));
      const snapshot = await getDocs(q);
      
      const contactsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate?.() || new Date(doc.data().timestamp)
      }));

      setContacts(contactsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setLoading(false);
    }
  };

  const filterContacts = () => {
    let filtered = [...contacts];

    if (statusFilter !== 'all') {
      filtered = filtered.filter(c => c.status === statusFilter);
    }

    setFilteredContacts(filtered);
  };

  const updateContactStatus = async (contactId, newStatus) => {
    try {
      setActionLoading(true);
      const contactRef = doc(db, 'contacts', contactId);
      await updateDoc(contactRef, {
        status: newStatus,
        updatedAt: new Date()
      });
      
      await fetchContacts();
      
      const statusMessages = {
        replied: 'Contact marked as replied!',
        new: 'Status changed to new.'
      };
      
      alert(statusMessages[newStatus] || 'Status updated successfully!');
      setShowModal(false);
    } catch (error) {
      console.error('Error updating contact status:', error);
      alert('Failed to update contact status. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const deleteContact = async (contactId) => {
    if (!confirm('Are you sure you want to delete this contact message? This action cannot be undone.')) {
      return;
    }

    try {
      setActionLoading(true);
      await deleteDoc(doc(db, 'contacts', contactId));
      await fetchContacts();
      alert('Contact message deleted successfully!');
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Failed to delete contact. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      new: {
        bg: 'bg-amber-100 text-amber-800',
        icon: <FaExclamationCircle />
      },
      replied: {
        bg: 'bg-green-100 text-green-800',
        icon: <FaCheckCircle />
      }
    };

    const badge = badges[status] || badges.new;

    return (
      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${badge.bg}`}>
        {badge.icon}
        {status.toUpperCase()}
      </span>
    );
  };

  const contactReasonLabels = {
    general: 'General',
    visit: 'Visit',
    prayer: 'Prayer',
    volunteer: 'Volunteer',
    events: 'Events',
    giving: 'Giving',
    pastoral: 'Pastoral'
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading contacts...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const stats = {
    total: contacts.length,
    new: contacts.filter(c => c.status === 'new').length,
    replied: contacts.filter(c => c.status === 'replied').length
  };

  return (
    <AdminLayout>
      {/* MATCHING MEMBERSHIP PAGE STRUCTURE */}
      <div className="min-h-screen bg-gray-50">
        {/* Header - Same as Membership Page */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
                <p className="text-gray-600 mt-1">Manage and respond to contact form submissions</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Stats Cards - MATCHING MEMBERSHIP LAYOUT */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <FaEnvelope className="text-2xl text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total Messages</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-100 rounded-lg">
                  <FaExclamationCircle className="text-2xl text-amber-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">New Messages</p>
                  <p className="text-2xl font-bold text-amber-600">{stats.new}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <FaCheckCircle className="text-2xl text-green-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Replied</p>
                  <p className="text-2xl font-bold text-green-600">{stats.replied}</p>
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
                <option value="new">New</option>
                <option value="replied">Replied</option>
              </select>
            </div>
          </div>

          {/* Contacts Table - MATCHING MEMBERSHIP TABLE STYLING */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reason
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
                  {filteredContacts.length > 0 ? (
                    filteredContacts.map((contact) => (
                      <tr 
                        key={contact.id}
                        className="hover:bg-gray-50"
                      >
                        {/* Avatar Circle + Name - MATCHING MEMBERSHIP STYLE */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="font-semibold text-blue-900">
                                {contact.name?.charAt(0)}
                              </span>
                            </div>
                            <div className="font-medium text-gray-900">{contact.name}</div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{contact.email}</div>
                          {contact.phone && (
                            <div className="text-sm text-gray-500">{contact.phone}</div>
                          )}
                        </td>
                        
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-md truncate">
                            {contact.subject || 'No subject'}
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {contactReasonLabels[contact.contactReason] || contact.contactReason}
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(contact.status)}
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {contact.timestamp?.toLocaleDateString()}
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => {
                              setSelectedContact(contact);
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
                      <td colSpan="7" className="px-6 py-12 text-center">
                        <div className="text-gray-400">
                          <FaEnvelope className="text-6xl mx-auto mb-4 opacity-20" />
                          <p className="text-lg font-semibold">No contact messages found</p>
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
        <ContactDetailModal
          contact={selectedContact}
          onClose={() => {
            setShowModal(false);
            setSelectedContact(null);
          }}
          updateContactStatus={updateContactStatus}
          deleteContact={deleteContact}
          actionLoading={actionLoading}
          getStatusBadge={getStatusBadge}
        />
      )}
    </AdminLayout>
  );
}

export default withAuth(ContactsPage, ['admin', 'staff']);