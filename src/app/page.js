import Hero from '@/components/Hero';
import ServiceTimes from '@/components/ServiceTimes';
import UpcomingEvents from '@/components/UpcomingEvents';
import BibleVerse from '@/components/BibleVerse';
import Link from 'next/link';
import { FaBible, FaHandsHelping, FaPrayingHands, FaUsers } from 'react-icons/fa';
export default function Home() {
  const features = [
    {
      icon: <FaBible className="text-4xl" />,
      title: 'Biblical Teaching',
      description: 'Grounded in Scripture, relevant to life',
    },
    {
      icon: <FaPrayingHands className="text-4xl" />,
      title: 'Worship & Prayer',
      description: 'Authentic worship and powerful prayer',
    },
    {
      icon: <FaUsers className="text-4xl" />,
      title: 'Community',
      description: 'Building meaningful relationships',
    },
    {
      icon: <FaHandsHelping className="text-4xl" />,
      title: 'Outreach',
      description: 'Serving our community with love',
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
              <button className="btn-primary">Learn More About Us</button>
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
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-blue-900 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceTimes />
      <UpcomingEvents />

      {/* Call to Action */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Take the Next Step?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            We'd love to connect with you and help you get plugged in!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/events">
              <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Plan Your Visit
              </button>
            </Link>
            <Link href="/contact">
              <button className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors">
                Get In Touch
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}