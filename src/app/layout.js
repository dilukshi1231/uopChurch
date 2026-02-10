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
  description: 'Join us at Gall Palliya, UOP Chapel. Sunday worship services, community events, prayer groups, and ministries for all ages. Everyone is welcome!',
  keywords: [
    'church', 
    'Gal Palliya',
    'UOP Chapel',
    'Christian church', 
    'Sunday service', 
    'worship', 
    'prayer', 
    'community', 
    'faith',
    'Peradeniya church',
    'University of Peradeniya chapel'
  ],
  
  // Search engine directives
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://churchproject-h9525fsph-dilukshis-projects-7d344bc8.vercel.app',
    siteName: 'The Church of Christ the Risen Lord',
    title: 'The Church of Christ the Risen Lord - Welcome Home',
    description: 'Join us for Sunday worship services, community events, and ministries for all ages at UOP Chapel, Gall Palliya.',
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'The Church of Christ the Risen Lord - Welcome Home',
    description: 'Join us for Sunday worship services, community events, and ministries for all ages.',
  },
  
  // Google Search Console Verification - FIXED LOCATION
  verification: {
    google: '_8pB3csFJotlupzTDIvbap9o7AzMzxQIWSOGqDybpp4',
  },
  
  // Canonical URL
  alternates: {
    canonical: 'https://churchproject-h9525fsph-dilukshis-projects-7d344bc8.vercel.app',
  },
  
  // Icons
  icons: {
    icon: '/favicon.ico',
  },
  
  // Other metadata
  category: 'religion',
  applicationName: 'The Church of Christ the Risen Lord',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data (Schema.org) for Church */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Church",
              "name": "The Church of Christ the Risen Lord",
              "alternateName": "UOP Chapel",
              "description": "A welcoming Christian church serving Peradeniya and the University community",
              "url": "https://churchproject-h9525fsph-dilukshis-projects-7d344bc8.vercel.app",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Gall Palliya",
                "addressLocality": "Peradeniya",
                "addressRegion": "Central Province",
                "addressCountry": "LK"
              },
              "sameAs": [
                // Add your social media links here when ready
                // "https://www.facebook.com/yourchurch",
                // "https://www.instagram.com/yourchurch",
              ]
            })
          }}
        />
      </head>
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