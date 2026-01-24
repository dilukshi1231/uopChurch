// src/app/page.js
import Hero from '@/components/Hero';
import ServiceTimes from '@/components/ServiceTimes';
import UpcomingEvents from '@/components/UpcomingEvents';
import Link from 'next/link';
import { FaBible, FaHandsHelping, FaPrayingHands, FaUsers } from 'react-icons/fa';

export default function Home() {
  const features = [
    {
      icon: <FaBible className="text-4xl" />,
      title: 'Biblical Teaching',
      description: 'Grounded in Scripture, relevant to life',
      image: 'https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?w=400&h=400&fit=crop'
    },
    {
      icon: <FaPrayingHands className="text-4xl" />,
      title: 'Worship & Prayer',
      description: 'Authentic worship and powerful prayer',
      image: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=400&h=400&fit=crop'
    },
    {
      icon: <FaUsers className="text-4xl" />,
      title: 'Community',
      description: 'Building meaningful relationships',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=400&fit=crop'
    },
    {
      icon: <FaHandsHelping className="text-4xl" />,
      title: 'Outreach',
      description: 'Serving our community with love',
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=400&fit=crop'
    },
  ];

  return (
    <>
      <Hero />
      
      {/* Welcome Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-title">Welcome Home</h2>
            <p className="text-lg text-gray-700 mb-6">
              Whether you're new to faith or have been walking with God for years, 
              Grace Church is a place where you can grow, serve, and belong. 
              We believe church is more than a Sunday service—it's a family.
            </p>
            <Link href="/about">
              <button className="btn-secondary">Learn More About Us</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-12">What We Value</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="relative w-32 h-32 mx-auto mb-6 overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  {/* Background gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/80 to-secondary/60 group-hover:from-secondary/70 group-hover:to-secondary/50 transition-all duration-300 z-10"></div>
                  
                  {/* Image */}
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-20 text-white group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-secondary transition-colors">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceTimes />
      <UpcomingEvents />

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Take the Next Step?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            We'd love to connect with you and help you get plugged in!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/events">
              <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Plan Your Visit
              </button>
            </Link>
            <Link href="/contact">
              <button className="bg-secondary text-white border-2 border-secondary px-8 py-3 rounded-lg font-semibold hover:bg-secondary-700 transition-colors">
                Get In Touch
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}