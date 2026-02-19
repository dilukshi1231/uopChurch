// src/middleware/withAuth.js - CORRECTED VERSION
'use client';
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export function withAuth(Component, allowedRoles = []) {
  return function ProtectedRoute(props) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      console.log('🛡️ withAuth - Loading:', loading);
      console.log('🛡️ withAuth - User:', user);
      console.log('🛡️ withAuth - Allowed roles:', allowedRoles);
      console.log('🛡️ withAuth - User role:', user?.role);
      
      if (!loading) {
        if (!user) {
          console.log('❌ No user - redirecting to /auth');
          router.push('/auth');
        } else if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
          console.log('❌ User role not allowed - redirecting to /');
          console.log('   User has role:', user.role);
          console.log('   Allowed roles:', allowedRoles);
          router.push('/');
        } else {
          console.log('✅ User authorized for this route');
        }
      }
    }, [user, loading, router]);

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }

    if (!user) {
      console.log('⏳ Waiting for redirect to /auth...');
      return null;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      console.log('⏳ Waiting for redirect to /...');
      return null;
    }

    return <Component {...props} />;
  };
}