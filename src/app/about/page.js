import Image from 'next/image';
import { FaHeart, FaBook, FaGlobe, FaPray, FaUsers, FaCross } from 'react-icons/fa';

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
    <div className="relative">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-white/95 to-white/98 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073')",
            backgroundBlendMode: 'overlay'
          }}
        ></div>
      </div>

      <div className="relative z-20">
        {/* Hero Section with Floating Elements */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-amber-500/10"></div>
          
          {/* Decorative Floating Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block mb-6 p-3 bg-blue-100/80 backdrop-blur-sm rounded-full">
                <FaCross className="text-4xl text-blue-900" />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-900 via-blue-700 to-amber-600 bg-clip-text text-transparent">
                About Grace Church
              </h1>
              <p className="text-2xl text-gray-700 font-light leading-relaxed">
                A community of believers dedicated to knowing Christ and making Him known
              </p>
              <div className="mt-8 flex items-center justify-center gap-2 text-blue-900">
                <FaUsers className="text-2xl" />
                <span className="text-lg font-semibold">Founded in 1995 • 500+ Members</span>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story with Glass Effect */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
                <div className="flex items-center justify-center mb-8">
                  <div className="h-1 w-20 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
                  <h2 className="text-4xl font-bold text-gray-900 mx-4">Our Story</h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-transparent via-blue-600 to-transparent"></div>
                </div>
                
                <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      1
                    </div>
                    <p className="text-lg leading-relaxed">
                      Grace Church began in 1995 with a small group of families who had a vision to create 
                      a church where people could experience authentic community and grow in their faith. 
                      What started as 25 people meeting in a living room has grown into a vibrant community 
                      of over 500 members.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      2
                    </div>
                    <p className="text-lg leading-relaxed">
                      Throughout our journey, we've remained committed to our core mission: helping people 
                      discover Jesus, grow in their faith, and make a difference in the world. We believe 
                      that church is not just about Sunday services—it's about building a family where 
                      everyone belongs, serves, and grows together.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      3
                    </div>
                    <p className="text-lg leading-relaxed">
                      Today, we continue to be a place where people from all walks of life can come together 
                      to worship, learn, and serve. Whether you're taking your first steps in faith or you've 
                      been following Jesus for years, there's a place for you here at Grace Church.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision with Hover Effects */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-blue-700 opacity-90 group-hover:opacity-95 transition-opacity"></div>
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974')] bg-cover bg-center opacity-10"></div>
                  <div className="relative p-10 text-white">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <FaCross className="text-3xl" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
                    <p className="text-lg text-blue-50 leading-relaxed">
                      To glorify God by making disciples of Jesus Christ who love God, 
                      love people, and transform communities through the power of the Gospel.
                    </p>
                  </div>
                </div>
                
                <div className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-800 opacity-90 group-hover:opacity-95 transition-opacity"></div>
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070')] bg-cover bg-center opacity-10"></div>
                  <div className="relative p-10 text-white">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <FaGlobe className="text-3xl" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
                    <p className="text-lg text-amber-50 leading-relaxed">
                      To be a church where every person experiences authentic community, 
                      grows in spiritual maturity, and discovers their unique purpose in 
                      God's kingdom.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values with Modern Cards */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-xl text-gray-600">The principles that guide everything we do</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {values.map((value, index) => (
                <div 
                  key={index} 
                  className="group bg-white/60 backdrop-blur-lg rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-white/40"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-6 text-4xl text-white group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-lg">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statement of Faith */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What We Believe</h2>
                <p className="text-xl text-gray-600">Our foundational beliefs rooted in Scripture</p>
              </div>
              
              <div className="space-y-6">
                {[
                  { title: 'The Bible', text: 'We believe the Bible is the inspired, infallible Word of God and our final authority for faith and life.', color: 'blue' },
                  { title: 'God', text: 'We believe in one God, eternally existing in three persons: Father, Son, and Holy Spirit.', color: 'amber' },
                  { title: 'Jesus Christ', text: 'We believe Jesus Christ is the Son of God, who died for our sins and rose from the dead, offering salvation to all who believe.', color: 'blue' },
                  { title: 'Salvation', text: 'We believe salvation is a gift of God\'s grace, received through faith in Jesus Christ alone.', color: 'amber' },
                  { title: 'The Church', text: 'We believe the Church is the body of Christ, called to worship, fellowship, discipleship, ministry, and mission.', color: 'blue' }
                ].map((belief, index) => (
                  <div 
                    key={index}
                    className="group bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 hover:border-l-8 border-blue-600"
                  >
                    <h3 className={`text-2xl font-bold mb-3 bg-gradient-to-r ${belief.color === 'blue' ? 'from-blue-900 to-blue-600' : 'from-amber-700 to-amber-500'} bg-clip-text text-transparent`}>
                      {belief.title}
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">{belief.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Meet the passionate leaders who shepherd our church family
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {leadership.map((leader, index) => (
                <div 
                  key={index} 
                  className="group bg-white/70 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative h-48 bg-gradient-to-br from-blue-600 to-blue-800 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-5xl font-bold border-4 border-white/30 group-hover:scale-110 transition-transform">
                        {leader.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold mb-1 text-gray-900">{leader.name}</h3>
                    <p className="text-blue-700 font-semibold mb-4">{leader.role}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{leader.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action with Gradient */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-amber-700"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073')] bg-cover bg-center opacity-10"></div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Want to Learn More?</h2>
              <p className="text-xl text-blue-100 mb-10 leading-relaxed">
                We'd love to connect with you and answer any questions you have about our church family.
              </p>
              <a 
                href="/contact" 
                className="inline-block bg-white text-blue-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}