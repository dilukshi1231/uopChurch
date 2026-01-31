// src/app/admin/contacts/page.js
'use client';
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { withAuth } from '@/middleware/withAuth';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { FaEnvelope, FaEye, FaTrash, FaTimes, FaCheckCircle, FaPhone, FaUser } from 'react-icons/fa';

function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const contactsRef = collection(db, 'contacts');
      const q = query(contactsRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      
      const contactsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      }));

      setContacts(contactsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setLoading(false);
    }
  };

  const markAsRead = async (contactId) => {
    try {
      const contactRef = doc(db, 'contacts', contactId);
      await updateDoc(contactRef, {
        read: true,
        readAt: new Date()
      });
      
      await fetchContacts();
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const deleteContact = async (contactId) => {
    if (!confirm('Are you sure you want to delete this contact message?')) return;

    try {
      await deleteDoc(doc(db, 'contacts', contactId));
      await fetchContacts();
      alert('Contact message deleted successfully!');
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Failed to delete contact message');
    }
  };

  const filteredContacts = filter === 'all' 
    ? contacts 
    : contacts.filter(c => filter === 'read' ? c.read : !c.read);

  const ContactDetailModal = ({ contact, onClose }) => {
    if (!contact) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
          <div className="bg-gradient-to-r from-green-900 to-green-700 text-white p-6 rounded-t-2xl flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">Contact Message</h2>
              <p className="text-green-200 text-sm">Message details and response</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
              <FaTimes className="text-2xl" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-6 border border-green-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FaUser className="text-gray-400" />
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Name</label>
                    <p className="text-gray-900 font-medium">{contact.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-gray-400" />
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Email</label>
                    <p className="text-gray-900 font-medium">{contact.email}</p>
                  </div>
                </div>
                {contact.phone && (
                  <div className="flex items-center gap-3">
                    <FaPhone className="text-gray-400" />
                    <div>
                      <label className="text-sm font-semibold text-gray-600">Phone</label>
                      <p className="text-gray-900 font-medium">{contact.phone}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 border border-blue-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Message</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{contact.message}</p>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Received on {contact.createdAt?.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
              {contact.read && <span className="text-green-600 font-semibold">✓ Read</span>}
            </div>

            <div className="flex gap-3 pt-4 border-t">
              {!contact.read && (
                <button
                  onClick={() => {
                    markAsRead(contact.id);
                    onClose();
                  }}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <FaCheckCircle />
                  Mark as Read
                </button>
              )}
              <button
                onClick={() => deleteContact(contact.id)}
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
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-900 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading contact messages...</p>
          </div>
        </div>
      </AdminLayout>
    );
  };

  const stats = {
    total: contacts.length,
    unread: contacts.filter(c => !c.read).length,
    read: contacts.filter(c => c.read).length
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-white">
        <div className="bg-gradient-to-r from-green-900 via-green-800 to-blue-900 text-white shadow-2xl">
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <FaEnvelope className="text-amber-400" />
              Contact Messages
            </h1>
            <p className="text-green-200 text-lg">
              Review and respond to community inquiries
            </p>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
              <p className="text-gray-600 text-sm font-semibold mb-1">Total Messages</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-amber-600">
              <p className="text-gray-600 text-sm font-semibold mb-1">Unread</p>
              <p className="text-3xl font-bold text-amber-600">{stats.unread}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
              <p className="text-gray-600 text-sm font-semibold mb-1">Read</p>
              <p className="text-3xl font-bold text-blue-600">{stats.read}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Messages
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'unread' ? 'bg-amber-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Unread
              </button>
              <button
                onClick={() => setFilter('read')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'read' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Read
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredContacts.map(contact => (
              <div
                key={contact.id}
                className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all ${
                  !contact.read ? 'border-l-4 border-amber-500' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-gray-900 text-lg">{contact.name}</h3>
                      {!contact.read && (
                        <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{contact.email}</p>
                    {contact.phone && <p className="text-sm text-gray-600 mb-3">{contact.phone}</p>}
                    <p className="text-gray-700 line-clamp-2 mb-3">{contact.message}</p>
                    <p className="text-xs text-gray-500">
                      {contact.createdAt?.toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedContact(contact);
                      setShowModal(true);
                      if (!contact.read) markAsRead(contact.id);
                    }}
                    className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 font-medium"
                  >
                    <FaEye />
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showModal && (
          <ContactDetailModal
            contact={selectedContact}
            onClose={() => {
              setShowModal(false);
              setSelectedContact(null);
            }}
          />
        )}
      </div>
    </AdminLayout>
  );
}

export default withAuth(ContactsPage, ['admin', 'staff']);