// src/app/layout.js
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/contexts/AuthContext';
import './globals.css';
import ConditionalLayout from '@/components/ConditionalLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'The Church of Christ The Risen Lord - Welcome Home',
    template: '%s | The Church of Christ The Risen Lord',
  },
  description: 'Join us at Gall Palliya. Sunday worship services, community events, prayer groups, and ministries for all ages. Everyone is welcome!',
  keywords: ['church', 'Gal Palliya','UOP Chapel','Christian church', 'Sunday service', 'worship', 'prayer', 'community', 'faith'],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    siteName: 'The Church of Christ the Risen Lord',
    title: 'The Church of Christ the Risen Lord - Welcome Home',
    description: 'Join us for Sunday worship services, community events, and ministries for all ages.',
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </AuthProvider>
      </body>
    </html>
  );
}