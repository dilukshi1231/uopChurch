'use client';
import { useState } from 'react';
import { FaChild, FaUsers, FaPrayingHands, FaMusic, FaHandsHelping, FaBible, FaHeart, FaGlobe } from 'react-icons/fa';

export default function MinistriesPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const ministries = [
    {
      id: 1,
      name: 'Children\'s Ministry',
      category: 'children',
      icon: <FaChild />,
      ageGroup: 'Birth - 5th Grade',
      description: 'Creating a fun, safe environment where children learn about Jesus through engaging lessons, worship, and activities.',
      meetingTime: 'Sundays 9:00 AM & 11:00 AM',
      location: 'Children\'s Wing',
      leader: 'Emily Wilson',
      email: 'children@gracechurch.org',
      image: '/images/placeholder.jpg',
      features: ['Age-appropriate Bible lessons', 'Fun worship music', 'Safe check-in system', 'Trained volunteers']
    },
    {
      id: 2,
      name: 'Youth Ministry',
      category: 'youth',
      icon: <FaUsers />,
      ageGroup: '6th - 12th Grade',
      description: 'Helping teens build authentic faith, strong friendships, and discover their purpose through relevant teaching and community.',
      meetingTime: 'Wednesdays 6:30 PM, Sundays 11:00 AM',
      location: 'Youth Center',
      leader: 'Michael Davis',
      email: 'youth@gracechurch.org',
      image: '/images/placeholder.jpg',
      features: ['Weekly youth group', 'Small group discipleship', 'Summer camps', 'Mission trips']
    },
    {
      id: 3,
      name: 'Worship Ministry',
      category: 'worship',
      icon: <FaMusic />,
      ageGroup: 'All Ages',
      description: 'Leading our congregation in authentic, Spirit-filled worship through contemporary music and creative expression.',
      meetingTime: 'Rehearsals: Thursdays 7:00 PM',
      location: 'Main Sanctuary',
      leader: 'Sarah Johnson',
      email: 'worship@gracechurch.org',
      image: '/images/placeholder.jpg',
      features: ['Vocal team', 'Instrumentalists', 'Technical production', 'Creative arts']
    },
    {
      id: 4,
      name: 'Small Groups',
      category: 'community',
      icon: <FaBible />,
      ageGroup: 'Adults',
      description: 'Building deep relationships and growing in faith together through weekly Bible study and fellowship in homes.',
      meetingTime: 'Various days and times',
      location: 'Various homes',
      leader: 'Pastor John Smith',
      email: 'smallgroups@gracechurch.org',
      image: '/images/placeholder.jpg',
      features: ['Bible study', 'Prayer support', 'Life-on-life community', 'Accountability']
    },
    {
      id: 5,
      name: 'Prayer Ministry',
      category: 'prayer',
      icon: <FaPrayingHands />,
      ageGroup: 'All Ages',
      description: 'Interceding for our church, community, and world through organized prayer gatherings and prayer chains.',
      meetingTime: 'Wednesdays 7:00 PM',
      location: 'Prayer Room',
      leader: 'Betty Anderson',
      email: 'prayer@gracechurch.org',
      image: '/images/placeholder.jpg',
      features: ['Weekly prayer meetings', '24/7 prayer chain', 'Prayer team training', 'Healing prayer']
    },
    {
      id: 6,
      name: 'Outreach Ministry',
      category: 'outreach',
      icon: <FaHandsHelping />,
      ageGroup: 'All Ages',
      description: 'Serving our local community through practical help, food distribution, and sharing the love of Christ.',
      meetingTime: 'Various service projects',
      location: 'Community',
      leader: 'David Martinez',
      email: 'outreach@gracechurch.org',
      image: '/images/placeholder.jpg',
      features: ['Food pantry', 'Community events', 'Homeless ministry', 'School partnerships']
    },
    {
      id: 7,
      name: 'Women\'s Ministry',
      category: 'community',
      icon: <FaHeart />,
      ageGroup: 'Women',
      description: 'Connecting women of all ages for encouragement, Bible study, and authentic friendships centered on Christ.',
      meetingTime: 'Tuesdays 9:30 AM & 7:00 PM',
      location: 'Fellowship Hall',
      leader: 'Jennifer Brown',
      email: 'women@gracechurch.org',
      image: '/images/placeholder.jpg',
      features: ['Bible studies', 'Monthly gatherings', 'Mentorship program', 'Women\'s retreats']
    },
    {
      id: 8,
      name: 'Men\'s Ministry',
      category: 'community',
      icon: <FaUsers />,
      ageGroup: 'Men',
      description: 'Equipping men to be spiritual leaders in their homes, workplaces, and communities through fellowship and study.',
      meetingTime: 'Saturdays 7:00 AM',
      location: 'Conference Room',
      leader: 'Robert Thompson',
      email: 'men@gracechurch.org',
      image: '/images/placeholder.jpg',
      features: ['Breakfast meetings', 'Bible study', 'Service projects', 'Men\'s retreats']
    },
    {
      id: 9,
      name: 'Missions',
      category: 'missions',
      icon: <FaGlobe />,
      ageGroup: 'All Ages',
      description: 'Supporting local and global missionaries, organizing mission trips, and spreading the Gospel around the world.',
      meetingTime: 'Monthly meetings',
      location: 'Various',
      leader: 'Pastor John Smith',
      email: 'missions@gracechurch.org',
      image: '/images/placeholder.jpg',
      features: ['Missionary support', 'Short-term trips', 'Local partnerships', 'Compassion sponsorships']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Ministries', icon: <FaUsers /> },
    { id: 'children', name: 'Children', icon: <FaChild /> },
    { id: 'youth', name: 'Youth', icon: <FaUsers /> },
    { id: 'community', name: 'Community', icon: <FaHeart /> },
    { id: 'worship', name: 'Worship', icon: <FaMusic /> },
    { id: 'prayer', name: 'Prayer', icon: <FaPrayingHands /> },
    { id: 'outreach', name: 'Outreach', icon: <FaHandsHelping /> },
    { id: 'missions', name: 'Missions', icon: <FaGlobe /> }
  ];

  const filteredMinistries = activeCategory === 'all'
    ? ministries
    : ministries.filter(m => m.category === activeCategory);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Ministries</h1>
            <p className="text-xl text-blue-100">
              Find your place to connect, grow, and serve in community
            </p>
          </div>
        </div>
      </section>

      {/* Get Involved CTA */}
      <section className="py-12 bg-amber-50 border-b-2 border-amber-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Involved?</h2>
            <p className="text-gray-700 mb-6">
              Whether you're looking to serve, grow in your faith, or build community, there's a place for you here.
            </p>
            <button className="btn-primary">
              Sign Up to Volunteer
            </button>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-blue-900 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMinistries.map((ministry) => (
                <div key={ministry.id} className="card hover:shadow-xl transition-all duration-300 flex flex-col">
                  {/* Icon Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 bg-blue-900 text-white rounded-lg flex items-center justify-center text-3xl">
                      {ministry.icon}
                    </div>
                    <span className="bg-blue-100 text-blue-900 text-xs font-semibold px-3 py-1 rounded-full">
                      {ministry.ageGroup}
                    </span>
                  </div>

                  {/* Ministry Info */}
                  <h3 className="text-2xl font-bold mb-3">{ministry.name}</h3>
                  <p className="text-gray-700 mb-4 flex-grow">{ministry.description}</p>

                  {/* Details */}
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div>
                      <span className="font-semibold">Meets:</span> {ministry.meetingTime}
                    </div>
                    <div>
                      <span className="font-semibold">Location:</span> {ministry.location}
                    </div>
                    <div>
                      <span className="font-semibold">Leader:</span> {ministry.leader}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <div className="text-sm font-semibold mb-2">What We Offer:</div>
                    <ul className="space-y-1">
                      {ministry.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start">
                          <span className="text-blue-900 mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto">
                    <button className="flex-1 bg-blue-900 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-800 transition-colors">
                      Learn More
                    </button>
                    <a 
                      href={`mailto:${ministry.email}`}
                      className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                    >
                      Contact
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="section-title text-center">Ways to Serve</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Every ministry needs volunteers! Here are some of the most needed roles right now.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  role: 'Children\'s Ministry Helper',
                  ministry: 'Children\'s Ministry',
                  commitment: 'One Sunday per month',
                  description: 'Help create a safe, fun environment for kids to learn about Jesus'
                },
                {
                  role: 'Worship Team Member',
                  ministry: 'Worship Ministry',
                  commitment: 'Weekly practice + Sundays',
                  description: 'Serve on vocals, instruments, or technical production'
                },
                {
                  role: 'Small Group Leader',
                  ministry: 'Small Groups',
                  commitment: 'Weekly meetings',
                  description: 'Facilitate a small group Bible study in your home or online'
                },
                {
                  role: 'Community Outreach Volunteer',
                  ministry: 'Outreach Ministry',
                  commitment: 'Flexible schedule',
                  description: 'Help with food distribution, community events, and service projects'
                }
              ].map((opp, idx) => (
                <div key={idx} className="card border-l-4 border-blue-900">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold">{opp.role}</h3>
                    <span className="bg-amber-100 text-amber-900 text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                      Needed Now
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <span className="font-semibold">Ministry:</span> {opp.ministry}
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    <span className="font-semibold">Commitment:</span> {opp.commitment}
                  </div>
                  <p className="text-gray-700 mb-4">{opp.description}</p>
                  <button className="btn-primary w-full">
                    Apply to Serve
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="section-title text-center mb-12">Common Questions</h2>
            
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-semibold mb-2">How do I get started in a ministry?</h3>
                <p className="text-gray-700">
                  Simply reach out to the ministry leader via email or stop by their area on Sunday. 
                  Most ministries welcome newcomers and will help you find the right fit.
                </p>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold mb-2">Do I need experience to volunteer?</h3>
                <p className="text-gray-700">
                  No experience necessary! We provide training and support for all volunteer roles. 
                  Your willingness to serve and love for people are the most important qualifications.
                </p>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold mb-2">What if I can't commit to a regular schedule?</h3>
                <p className="text-gray-700">
                  Many of our ministries offer flexible serving opportunities. We also have one-time 
                  service projects and events where you can help as your schedule allows.
                </p>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold mb-2">Can my family serve together?</h3>
                <p className="text-gray-700">
                  Absolutely! Many ministries welcome families to serve together. It's a great way 
                  to model service for your children and spend quality time together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Find Your Place to Serve</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            God has given each of us unique gifts and passions. Let's help you discover 
            where you can make the biggest impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Take Spiritual Gifts Assessment
            </button>
            <a href="/contact" className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors inline-block">
              Talk to Someone
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}