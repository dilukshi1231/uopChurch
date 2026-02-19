'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function withAuth(Component, allowedRoles = []) {
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
        } else if (user.isActive === false) {
          console.log('❌ User account deactivated - redirecting to /');
          router.push('/');
        } else if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
          console.log('❌ User role not allowed - redirecting based on role');
          console.log('   User has role:', user.role);
          console.log('   Allowed roles:', allowedRoles);
          
          // Redirect based on user's actual role
          if (user.role === 'admin') {
            console.log('🔀 Redirecting admin to /admin');
            router.push('/admin');
          } else {
            console.log('🔀 Redirecting user to /dashboard');
            router.push('/dashboard');
          }
        } else {
          console.log('✅ User authorized for this route');
        }
      }
    }, [user, loading, router]);

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-amber-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading...</p>
          </div>
        </div>
      );
    }

    if (!user) {
      console.log('⏳ Waiting for redirect to /auth...');
      return null;
    }

    if (user.isActive === false) {
      console.log('⏳ Account deactivated - waiting for redirect...');
      return null;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      console.log('⏳ Waiting for role-based redirect...');
      return null;
    }

    return <Component {...props} />;
  };
}