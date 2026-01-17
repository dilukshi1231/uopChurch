import Image from 'next/image';
import { FaHeart, FaBook, FaGlobe, FaPray } from 'react-icons/fa';

export default function AboutPage() {
  const leadership = [
    {
      name: 'Pastor John Smith',
      role: 'Senior Pastor',
      bio: 'Pastor John has been leading Grace Church for over 15 years. He is passionate about biblical teaching and community outreach.',
      image: '/images/placeholder.jpg'
    },
    {
      name: 'Sarah Johnson',
      role: 'Worship Director',
      bio: 'Sarah leads our worship team with a heart for creating authentic worship experiences that draw people closer to God.',
      image: '/images/placeholder.jpg'
    },
    {
      name: 'Michael Davis',
      role: 'Youth Pastor',
      bio: 'Michael is dedicated to helping young people discover their purpose and grow in their faith journey.',
      image: '/images/placeholder.jpg'
    },
    {
      name: 'Emily Wilson',
      role: 'Children\'s Director',
      bio: 'Emily creates engaging programs that help children learn about Jesus in fun and meaningful ways.',
      image: '/images/placeholder.jpg'
    }
  ];

  const values = [
    {
      icon: <FaBook />,
      title: 'Biblical Foundation',
      description: 'We believe the Bible is God\'s Word and the foundation for all faith and practice.'
    },
    {
      icon: <FaPray />,
      title: 'Prayer & Worship',
      description: 'We prioritize authentic worship and powerful prayer as essential to our relationship with God.'
    },
    {
      icon: <FaHeart />,
      title: 'Love & Compassion',
      description: 'We strive to love God and love others, showing compassion to all people.'
    },
    {
      icon: <FaGlobe />,
      title: 'Community Impact',
      description: 'We are committed to making a positive impact in our community and around the world.'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Grace Church</h1>
            <p className="text-xl text-blue-100">
              A community of believers dedicated to knowing Christ and making Him known
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-lg mb-4">
                Grace Church began in 1995 with a small group of families who had a vision to create 
                a church where people could experience authentic community and grow in their faith. 
                What started as 25 people meeting in a living room has grown into a vibrant community 
                of over 500 members.
              </p>
              <p className="text-lg mb-4">
                Throughout our journey, we've remained committed to our core mission: helping people 
                discover Jesus, grow in their faith, and make a difference in the world. We believe 
                that church is not just about Sunday services—it's about building a family where 
                everyone belongs, serves, and grows together.
              </p>
              <p className="text-lg">
                Today, we continue to be a place where people from all walks of life can come together 
                to worship, learn, and serve. Whether you're taking your first steps in faith or you've 
                been following Jesus for years, there's a place for you here at Grace Church.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="card bg-blue-900 text-white">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg text-blue-100">
                  To glorify God by making disciples of Jesus Christ who love God, 
                  love people, and transform communities through the power of the Gospel.
                </p>
              </div>
              <div className="card bg-amber-600 text-white">
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-lg text-amber-100">
                  To be a church where every person experiences authentic community, 
                  grows in spiritual maturity, and discovers their unique purpose in 
                  God's kingdom.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statement of Faith */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title text-center">What We Believe</h2>
            <div className="space-y-6 text-gray-700">
              <div className="card">
                <h3 className="text-xl font-semibold mb-2 text-blue-900">The Bible</h3>
                <p>We believe the Bible is the inspired, infallible Word of God and our final authority for faith and life.</p>
              </div>
              <div className="card">
                <h3 className="text-xl font-semibold mb-2 text-blue-900">God</h3>
                <p>We believe in one God, eternally existing in three persons: Father, Son, and Holy Spirit.</p>
              </div>
              <div className="card">
                <h3 className="text-xl font-semibold mb-2 text-blue-900">Jesus Christ</h3>
                <p>We believe Jesus Christ is the Son of God, who died for our sins and rose from the dead, offering salvation to all who believe.</p>
              </div>
              <div className="card">
                <h3 className="text-xl font-semibold mb-2 text-blue-900">Salvation</h3>
                <p>We believe salvation is a gift of God's grace, received through faith in Jesus Christ alone.</p>
              </div>
              <div className="card">
                <h3 className="text-xl font-semibold mb-2 text-blue-900">The Church</h3>
                <p>We believe the Church is the body of Christ, called to worship, fellowship, discipleship, ministry, and mission.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center">Our Leadership Team</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Meet the passionate leaders who shepherd our church family
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {leadership.map((leader, index) => (
              <div key={index} className="card text-center">
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-4xl font-bold">
                    {leader.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-1">{leader.name}</h3>
                <p className="text-blue-900 font-medium mb-3">{leader.role}</p>
                <p className="text-sm text-gray-600">{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Learn More?</h2>
          <p className="text-xl text-blue-100 mb-8">
            We'd love to connect with you and answer any questions you have.
          </p>
          <a href="/contact" className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
            Get In Touch
          </a>
        </div>
      </section>
    </div>
  );
}