'use client';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await addDoc(collection(db, 'newsletter'), {
        email,
        subscribedAt: new Date(),
        status: 'active'
      });

      setMessage('Success! You\'re subscribed to our newsletter.');
      setEmail('');
    } catch (error) {
      console.error('Error subscribing:', error);
      setMessage('Error subscribing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Connected</h2>
          <p className="text-blue-100 mb-8">
            Subscribe to our newsletter for weekly updates, event announcements, and inspirational content.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:bg-gray-300"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>

          {message && (
            <p className={`mt-4 ${message.includes('Success') ? 'text-green-300' : 'text-red-300'}`}>
              {message}
            </p>
          )}

          <p className="text-sm text-blue-200 mt-4">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}