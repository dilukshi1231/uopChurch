// src/app/setup-admin/page.js
'use client';
import { useState, useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';

export default function SetupAdmin() {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const currentUser = auth.currentUser;
    setUser(currentUser);
  }, []);

  const createAdminUser = async () => {
    if (!user) {
      setStatus('❌ Please login first!');
      return;
    }

    try {
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        displayName: user.displayName || 'Admin User',
        role: 'admin',
        createdAt: new Date(),
        isActive: true
      });
      
      setStatus('✅ SUCCESS! Admin user created. Now LOGOUT and LOGIN again.');
    } catch (error) {
      setStatus('❌ Error: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Setup Admin User</h1>
        
        {user ? (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Current User:</p>
              <p className="font-semibold">{user.email}</p>
              <p className="text-xs text-gray-500 mt-1">UID: {user.uid}</p>
            </div>

            <button
              onClick={createAdminUser}
              className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-lg font-bold text-lg"
            >
              🔐 Create Admin User in Firestore
            </button>

            {status && (
              <div className={`p-4 rounded-lg ${
                status.includes('SUCCESS') 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {status}
              </div>
            )}

            <div className="bg-yellow-50 p-4 rounded-lg text-sm">
              <p className="font-bold mb-2">After clicking the button:</p>
              <ol className="list-decimal ml-4 space-y-1">
                <li>Wait for success message</li>
                <li>Logout completely</li>
                <li>Login again</li>
                <li>Look for "Admin Panel" link</li>
              </ol>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-red-600 font-semibold mb-4">
              ⚠️ You must be logged in first!
            </p>
            <a href="/auth" className="text-blue-600 hover:underline">
              Go to Login Page
            </a>
          </div>
        )}
      </div>
    </div>
  );
}