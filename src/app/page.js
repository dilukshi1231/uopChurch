// src/app/page.js
import Hero from '@/components/Hero';
import ServiceTimes from '@/components/ServiceTimes';
import Link from 'next/link';
import { FaBible, FaHandsHelping, FaPrayingHands, FaUsers } from 'react-icons/fa';

export default function Home() {
  const features = [
    {
      icon: <FaBible className="text-4xl" />,
      title: 'Biblical Teaching',
      description: 'Grounded in Scripture, relevant to life',
      image: '/images/biblical_study.jpg'
    },
    {
      icon: <FaPrayingHands className="text-4xl" />,
      title: 'Worship & Prayer',
      description: 'Authentic worship and powerful prayer',
      image: '/images/worship.jpg'
    },
    {
      icon: <FaUsers className="text-4xl" />,
      title: 'Community',
      description: 'Building meaningful relationships',
      image: '/images/community.jpg'
    },
    {
      icon: <FaHandsHelping className="text-4xl" />,
      title: 'Outreach',
      description: 'Serving our community with love',
      image: '/images/outreach.jpg'
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
    <div className="relative w-full h-56 mx-auto mb-6 overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
      
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

      {/* Call to Action */}
      {/* Call to Action */}
<section className="relative py-24 overflow-hidden">
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-fixed"
    style={{ backgroundImage: "url('/images/angle3.jpg')" }}
  />
  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/60" />

  {/* Content */}
  <div className="relative z-10 container mx-auto px-4 text-center text-white">
    {/* Top accent line */}
    <div className="w-16 h-1 bg-secondary mx-auto mb-6 rounded-full" />

    <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
      Ready to Take the <span className="text-secondary">Next Step?</span>
    </h2>
    <p className="text-lg md:text-xl mb-10 text-gray-300 max-w-xl mx-auto">
      We'd love to connect with you and help you get plugged in!
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link href="/plan-visit">
        <button className="bg-secondary text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-secondary/40">
          Plan Your Visit
        </button>
      </Link>
      <Link href="/contact">
        <button className="bg-transparent text-white border-2 border-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-primary transition-all">
          Get In Touch
        </button>
      </Link>
    </div>

    {/* Bottom accent line */}
    <div className="w-16 h-1 bg-secondary mx-auto mt-10 rounded-full" />
  </div>
</section>
    </>
  );
}