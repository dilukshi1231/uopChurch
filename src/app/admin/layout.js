// src/app/admin/layout.js
'use client';
import AdminLayout from '@/components/AdminLayout';

export default function Layout({ children }) {
  // This layout wraps all admin pages
  // It only includes the AdminLayout component (sidebar)
  // NO Navigation bar or Footer is included here
  return <AdminLayout>{children}</AdminLayout>;
}