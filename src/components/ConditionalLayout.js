// src/components/ConditionalLayout.js
'use client';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  
  // Check if current route is an admin route
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <>
      {/* Only show Header if NOT on admin routes */}
      {!isAdminRoute && <Header />}
      
      <main className={isAdminRoute ? '' : 'min-h-screen'}>
        {children}
      </main>
      
      {/* Only show Footer if NOT on admin routes */}
      {!isAdminRoute && <Footer />}
    </>
  );
}