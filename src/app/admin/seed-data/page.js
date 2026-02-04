// src/app/admin/seed-data/page.js
// ADMIN ONLY - TEST DATA SEEDER PAGE
// This page allows you to quickly add test data to your Firebase collections
'use client';
import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { withAuth } from '@/middleware/withAuth';
import { FaDatabase, FaCheckCircle, FaExclamationCircle, FaSpinner } from 'react-icons/fa';

function SeedDataPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const addTestData = async () => {
    if (user?.role !== 'admin') {
      setError('Only administrators can seed test data');
      return;
    }

    setLoading(true);
    setResults([]);
    setError(null);
    const newResults = [];

    try {
      // Add test memberships
      newResults.push({ type: 'info', message: 'Adding test memberships...' });
      setResults([...newResults]);

      const memberships = [
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '+1234567890',
          dateOfBirth: '1990-01-15',
          address: '123 Faith Street, Your City',
          emergencyContact: 'Jane Doe',
          emergencyPhone: '+1234567891',
          status: 'pending',
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        },
        {
          firstName: 'Sarah',
          lastName: 'Johnson',
          email: 'sarah.j@example.com',
          phone: '+1234567892',
          dateOfBirth: '1985-05-20',
          address: '456 Grace Avenue, Your City',
          emergencyContact: 'Mike Johnson',
          emergencyPhone: '+1234567893',
          status: 'approved',
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        },
        {
          firstName: 'Michael',
          lastName: 'Smith',
          email: 'msmith@example.com',
          phone: '+1234567894',
          dateOfBirth: '1988-11-30',
          address: '789 Hope Road, Your City',
          emergencyContact: 'Lisa Smith',
          emergencyPhone: '+1234567895',
          status: 'pending',
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        }
      ];

      for (const membership of memberships) {
        await addDoc(collection(db, 'memberships'), membership);
      }
      newResults.push({ type: 'success', message: '✅ Added 3 test memberships' });
      setResults([...newResults]);

      // Add test events
      newResults.push({ type: 'info', message: 'Adding test events...' });
      setResults([...newResults]);

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1);

      const events = [
        {
          title: 'Sunday Worship Service',
          description: 'Join us for our weekly worship service with inspiring messages and uplifting music.',
          date: tomorrow.toISOString().split('T')[0],
          time: '10:00 AM',
          location: 'Main Sanctuary',
          category: 'worship',
          createdAt: Timestamp.now()
        },
        {
          title: 'Youth Group Meeting',
          description: 'Fun activities, games, and fellowship for our youth members.',
          date: nextWeek.toISOString().split('T')[0],
          time: '6:30 PM',
          location: 'Youth Hall',
          category: 'youth',
          createdAt: Timestamp.now()
        },
        {
          title: 'Bible Study',
          description: 'Deep dive into scripture with guided discussion and fellowship.',
          date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          time: '7:00 PM',
          location: 'Fellowship Room',
          category: 'study',
          createdAt: Timestamp.now()
        },
        {
          title: 'Community Outreach',
          description: 'Serving our local community with love and compassion.',
          date: nextMonth.toISOString().split('T')[0],
          time: '9:00 AM',
          location: 'Community Center',
          category: 'outreach',
          createdAt: Timestamp.now()
        }
      ];

      for (const event of events) {
        await addDoc(collection(db, 'events'), event);
      }
      newResults.push({ type: 'success', message: '✅ Added 4 test events' });
      setResults([...newResults]);

      // Add test prayer requests
      newResults.push({ type: 'info', message: 'Adding test prayer requests...' });
      setResults([...newResults]);

      const prayers = [
        {
          name: 'Anonymous',
          email: 'prayer1@example.com',
          prayerRequest: 'Please pray for my family\'s health and well-being.',
          isPublic: true,
          status: 'pending',
          createdAt: Timestamp.now()
        },
        {
          name: 'Emily Brown',
          email: 'emily.b@example.com',
          prayerRequest: 'Prayers needed for strength during difficult times at work.',
          isPublic: true,
          status: 'approved',
          createdAt: Timestamp.now()
        },
        {
          name: 'David Wilson',
          email: 'david.w@example.com',
          prayerRequest: 'Thanksgiving prayer for answered prayers and blessings.',
          isPublic: true,
          status: 'approved',
          createdAt: Timestamp.now()
        },
        {
          name: 'Anonymous',
          email: 'prayer2@example.com',
          prayerRequest: 'Please pray for healing and recovery for a loved one.',
          isPublic: false,
          status: 'pending',
          createdAt: Timestamp.now()
        }
      ];

      for (const prayer of prayers) {
        await addDoc(collection(db, 'prayerRequests'), prayer);
      }
      newResults.push({ type: 'success', message: '✅ Added 4 test prayer requests' });
      setResults([...newResults]);

      // Add test contacts
      newResults.push({ type: 'info', message: 'Adding test contact messages...' });
      setResults([...newResults]);

      const contacts = [
        {
          name: 'Alice Cooper',
          email: 'alice.c@example.com',
          phone: '+1234567896',
          subject: 'Question about Sunday service times',
          message: 'Hi, I would like to know more about your Sunday service schedule and if visitors are welcome.',
          contactReason: 'visit',
          status: 'new',
          timestamp: Timestamp.now()
        },
        {
          name: 'Robert Taylor',
          email: 'robert.t@example.com',
          phone: '+1234567897',
          subject: 'Volunteer opportunities',
          message: 'I am interested in volunteering for community outreach programs. How can I get involved?',
          contactReason: 'volunteer',
          status: 'new',
          timestamp: Timestamp.now()
        },
        {
          name: 'Linda Martinez',
          email: 'linda.m@example.com',
          phone: '+1234567898',
          subject: 'Wedding inquiry',
          message: 'I would like to inquire about having my wedding ceremony at your church.',
          contactReason: 'general',
          status: 'replied',
          timestamp: Timestamp.now()
        }
      ];

      for (const contact of contacts) {
        await addDoc(collection(db, 'contacts'), contact);
      }
      newResults.push({ type: 'success', message: '✅ Added 3 test contact messages' });
      setResults([...newResults]);

      newResults.push({ 
        type: 'success', 
        message: '🎉 ALL TEST DATA ADDED SUCCESSFULLY!' 
      });
      newResults.push({ 
        type: 'info', 
        message: 'Summary: 3 Memberships, 4 Events, 4 Prayer Requests, 3 Contacts' 
      });
      newResults.push({ 
        type: 'info', 
        message: '✨ Go back to the dashboard to see the data!' 
      });
      
      setResults([...newResults]);
      setLoading(false);
    } catch (err) {
      console.error('Error seeding data:', err);
      setError(`Error: ${err.message}`);
      newResults.push({ type: 'error', message: `❌ Error: ${err.message}` });
      setResults([...newResults]);
      setLoading(false);
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <FaExclamationCircle className="text-4xl text-red-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-red-800 mb-2">Access Denied</h2>
            <p className="text-red-700">Only administrators can access this page.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <FaDatabase className="text-blue-600" />
            Seed Test Data
          </h1>
          <p className="text-gray-600">
            Add sample data to your Firebase collections for testing purposes.
          </p>
        </div>

        {/* Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <FaExclamationCircle className="text-yellow-600 text-xl mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-1">Warning</h3>
              <p className="text-sm text-yellow-700">
                This will add test data to your database. This is intended for development and testing only.
                The data includes sample memberships, events, prayer requests, and contact messages.
              </p>
            </div>
          </div>
        </div>

        {/* What will be added */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">What will be added:</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-600" />
              <span>3 Membership applications (2 pending, 1 approved)</span>
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-600" />
              <span>4 Upcoming events (various dates)</span>
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-600" />
              <span>4 Prayer requests (2 pending, 2 approved)</span>
            </li>
            <li className="flex items-center gap-2">
              <FaCheckCircle className="text-green-600" />
              <span>3 Contact messages (2 new, 1 replied)</span>
            </li>
          </ul>
        </div>

        {/* Action Button */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <button
            onClick={addTestData}
            disabled={loading}
            className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin text-2xl" />
                <span>Adding Test Data...</span>
              </>
            ) : (
              <>
                <FaDatabase className="text-2xl" />
                <span>Add Test Data Now</span>
              </>
            )}
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <FaExclamationCircle className="text-red-600 text-xl mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-800 mb-1">Error</h3>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Display */}
        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Progress:</h2>
            <div className="space-y-2">
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    result.type === 'success'
                      ? 'bg-green-50 text-green-800'
                      : result.type === 'error'
                      ? 'bg-red-50 text-red-800'
                      : 'bg-blue-50 text-blue-800'
                  }`}
                >
                  {result.message}
                </div>
              ))}
            </div>
            
            {!loading && results.length > 0 && (
              <div className="mt-6 pt-6 border-t">
                <a
                  href="/admin"
                  className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Go to Dashboard
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default withAuth(SeedDataPage, ['admin']);