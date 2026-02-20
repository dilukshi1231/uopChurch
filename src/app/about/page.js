// src/app/about/page.js
import { FaCross, FaUsers, FaHeart, FaBookOpen, FaHandsHelping, FaMapMarkerAlt, FaPhone, FaEnvelope, FaChurch } from 'react-icons/fa';
import Link from 'next/link';

export const metadata = {
  title: 'About Us - The Church of Christ the Risen Lord',
  description: 'Learn about our history, mission, beliefs, and community at The Church of Christ the Risen Lord.',
};

export default function AboutPage() {
  const coreValues = [
    {
      icon: <FaBookOpen />,
      title: 'Scripture-Centered',
      description: 'We believe the Bible is the inspired, authoritative Word of God and the foundation for all we do.',
      color: 'from-red-800 to-orange-700',
      bg: 'from-red-50 to-orange-50',
      border: 'border-red-200',
    },
    {
      icon: <FaHeart />,
      title: 'Christ-Exalting',
      description: 'Jesus Christ is Lord. Everything we do is to glorify Him and make His name known in our community.',
      color: 'from-orange-600 to-amber-600',
      bg: 'from-orange-50 to-amber-50',
      border: 'border-orange-200',
    },
    {
      icon: <FaUsers />,
      title: 'Community-Driven',
      description: 'We are a family. We do life together through worship, prayer, fellowship, and serving one another.',
      color: 'from-amber-600 to-amber-700',
      bg: 'from-amber-50 to-yellow-50',
      border: 'border-amber-200',
    },
    {
      icon: <FaHandsHelping />,
      title: 'Mission-Focused',
      description: 'We are called to serve our city and the world — sharing the love of Christ through word and deed.',
      color: 'from-red-700 to-red-900',
      bg: 'from-red-50 to-orange-50',
      border: 'border-red-200',
    },
  ];

  const beliefs = [
    { title: 'The Trinity', description: 'We believe in one God eternally existing in three persons: Father, Son, and Holy Spirit.' },
    { title: 'Scripture', description: 'The Bible is God\'s inspired, inerrant Word — the supreme authority for faith and practice.' },
    { title: 'Salvation', description: 'Salvation is by grace through faith in Jesus Christ alone — not by works.' },
    { title: 'The Church', description: 'The local church is the body of Christ, called to worship, fellowship, discipleship, and evangelism.' },
    { title: 'Baptism & Communion', description: 'We practice believer\'s baptism by immersion and celebrate the Lord\'s Supper regularly.' },
    { title: 'The Return of Christ', description: 'We believe in the literal, bodily return of Jesus Christ and the resurrection of the dead.' },
  ];

  const leadership = [
    {
      name: 'Pastor James Okonkwo',
      role: 'Senior Pastor',
      bio: 'Pastor James has been leading our congregation since 2008. He holds a Masters of Divinity from Trinity Seminary and is passionate about expository preaching and community transformation.',
      initials: 'JO',
    },
    {
      name: 'Pastor Grace Mensah',
      role: 'Associate Pastor / Worship',
      bio: 'Pastor Grace oversees our worship ministry and women\'s discipleship programs. She joined our team in 2014 and brings a deep heart for Spirit-led worship.',
      initials: 'GM',
    },
    {
      name: 'Elder David Boateng',
      role: 'Elder & Outreach Director',
      bio: 'Elder David leads our community outreach initiatives including the weekly food pantry, prison ministry, and our annual city-wide mission week.',
      initials: 'DB',
    },
    {
      name: 'Elder Sarah Yeboah',
      role: 'Elder & Youth Director',
      bio: 'Elder Sarah has a heart for the next generation. She oversees all youth and young adult ministries, including our thriving campus outreach program.',
      initials: 'SY',
    },
  ];

  const milestones = [
    { year: '1995', event: 'Founded by 12 families in a living room with a vision to plant a Christ-centered church.' },
    { year: '1998', event: 'Moved into our first church building on Faith Street with 75 members.' },
    { year: '2003', event: 'Launched our first community food pantry, now serving 200+ families monthly.' },
    { year: '2008', event: 'Completed major building expansion; membership surpasses 250.' },
    { year: '2012', event: 'Planted our first daughter church across town with 40 members.' },
    { year: '2018', event: 'Launched online services, reaching viewers in 12 countries.' },
    { year: '2024', event: 'Celebrating 500+ members and 3 active campus ministry locations.' },
  ];

  return (
    <div className="relative">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-white/30 to-white/80 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073')",
          }}
        ></div>
      </div>

      <div className="relative z-20">

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section className="relative py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block mb-6 p-4 bg-orange-600/90 backdrop-blur-md rounded-full shadow-2xl">
                <FaChurch className="text-5xl text-white" />
              </div>
              <h1 className="text-6xl md:text-7xl font-extrabold mb-6 text-white drop-shadow-2xl">
                About Our Church
              </h1>
              <p className="text-2xl md:text-3xl text-white font-medium leading-relaxed drop-shadow-xl bg-black/30 backdrop-blur-sm inline-block px-8 py-4 rounded-2xl">
                A community of believers dedicated to knowing Christ and making Him known
              </p>
              <div className="mt-10 inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm px-8 py-4 rounded-full shadow-2xl">
                <FaUsers className="text-3xl text-red-900" />
                <span className="text-xl font-bold text-red-900">Founded 1995 &bull; 500+ Members</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── OUR STORY ─────────────────────────────────────────────── */}
        <section className="py-12 relative">
          <div className="container mx-auto px-4">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-14 border-2 border-white/50">
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-red-800"></div>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Our Story</h2>
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-red-800"></div>
                </div>
                <div className="w-20 h-1.5 bg-gradient-to-r from-red-800 via-orange-600 to-amber-500 rounded-full mx-auto"></div>
              </div>

              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="space-y-5 text-lg text-gray-700 leading-relaxed">
                  <p>
                    The Church of Christ the Risen Lord began in 1995 with a small group of 12 families who had a vision — to create a church where faith comes alive and community grows stronger. They gathered in a living room, prayed, and trusted God for something greater.
                  </p>
                  <p>
                    Within three years, the congregation had grown enough to move into our first dedicated building on Faith Street. What started as a handful of committed believers became a vibrant, multi-generational family of faith.
                  </p>
                  <p>
                    Today, nearly 30 years later, we are a congregation of over 500 members spanning every age and background — united by our love for Jesus Christ and our commitment to serving one another and our city.
                  </p>
                  <p className="font-semibold text-red-900 text-xl">
                    "A place where faith comes alive and community grows stronger."
                  </p>
                </div>
                <div className="bg-gradient-to-br from-red-900 via-red-800 to-orange-900 rounded-2xl p-8 text-white shadow-xl">
                  <h3 className="text-2xl font-bold mb-6 text-amber-200">Our Mission</h3>
                  <p className="text-lg text-white/90 leading-relaxed mb-6">
                    To glorify God by making disciples of Jesus Christ through worship, community, service, and the proclamation of the Gospel.
                  </p>
                  <h3 className="text-2xl font-bold mb-4 text-amber-200">Our Vision</h3>
                  <p className="text-lg text-white/90 leading-relaxed">
                    To be a transformational church that brings the hope of Christ to every corner of our city and beyond.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CORE VALUES ───────────────────────────────────────────── */}
        <section className="py-12 relative">
          <div className="container mx-auto px-4">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-14 border-2 border-white/50">
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-red-800"></div>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Our Core Values</h2>
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-red-800"></div>
                </div>
                <div className="w-20 h-1.5 bg-gradient-to-r from-red-800 via-orange-600 to-amber-500 rounded-full mx-auto"></div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {coreValues.map((value, i) => (
                  <div
                    key={i}
                    className={`p-6 rounded-2xl bg-gradient-to-br ${value.bg} border-2 ${value.border} shadow-lg hover:shadow-xl transition-all hover:-translate-y-1`}
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg text-white text-2xl`}>
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT WE BELIEVE ───────────────────────────────────────── */}
        <section className="py-12 relative">
          <div className="container mx-auto px-4">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-14 border-2 border-white/50">
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-red-800"></div>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">What We Believe</h2>
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-red-800"></div>
                </div>
                <div className="w-20 h-1.5 bg-gradient-to-r from-red-800 via-orange-600 to-amber-500 rounded-full mx-auto mb-4"></div>
                <p className="text-xl text-gray-600">Our Statement of Faith</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {beliefs.map((belief, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-red-800 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow">
                        {i + 1}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{belief.title}</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm">{belief.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── LEADERSHIP ────────────────────────────────────────────── */}
        <section className="py-12 relative">
          <div className="container mx-auto px-4">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-14 border-2 border-white/50">
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-red-800"></div>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Our Leadership</h2>
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-red-800"></div>
                </div>
                <div className="w-20 h-1.5 bg-gradient-to-r from-red-800 via-orange-600 to-amber-500 rounded-full mx-auto mb-4"></div>
                <p className="text-xl text-gray-600">Servant leaders committed to shepherding our congregation</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {leadership.map((person, i) => (
                  <div key={i} className="flex gap-5 p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 shadow-md hover:shadow-lg transition-all">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-800 to-orange-600 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg shadow-lg flex-shrink-0">
                      {person.initials}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{person.name}</h3>
                      <p className="text-orange-700 font-semibold text-sm mb-2">{person.role}</p>
                      <p className="text-gray-700 text-sm leading-relaxed">{person.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── OUR HISTORY TIMELINE ──────────────────────────────────── */}
        <section className="py-12 relative">
          <div className="container mx-auto px-4">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-14 border-2 border-white/50">
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent to-red-800"></div>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Our Journey</h2>
                  <div className="h-px w-16 bg-gradient-to-l from-transparent to-red-800"></div>
                </div>
                <div className="w-20 h-1.5 bg-gradient-to-r from-red-800 via-orange-600 to-amber-500 rounded-full mx-auto"></div>
              </div>
              <div className="relative">
                <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-800 via-orange-600 to-amber-500 transform md:-translate-x-1/2"></div>
                <div className="space-y-8">
                  {milestones.map((m, i) => (
                    <div key={i} className={`relative flex items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} md:gap-0`}>
                      {/* Content */}
                      <div className={`ml-16 md:ml-0 md:w-5/12 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'}`}>
                        <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 shadow-md hover:shadow-lg transition-all">
                          <span className="inline-block bg-gradient-to-r from-red-800 to-orange-600 text-white text-sm font-bold px-3 py-1 rounded-full mb-2">{m.year}</span>
                          <p className="text-gray-800 font-medium leading-relaxed">{m.event}</p>
                        </div>
                      </div>
                      {/* Dot */}
                      <div className="absolute left-6 md:left-1/2 w-4 h-4 bg-gradient-to-br from-red-800 to-orange-600 rounded-full border-4 border-white shadow-lg transform md:-translate-x-1/2 mt-4"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CALL TO ACTION ────────────────────────────────────────── */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-red-700 to-amber-600"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070')] bg-cover bg-center opacity-15"></div>
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl"></div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-3xl mx-auto bg-white/15 backdrop-blur-xl rounded-3xl p-14 border-2 border-white/30 shadow-2xl">
              <div className="inline-block mb-8 p-4 bg-white/25 backdrop-blur-md rounded-full shadow-xl">
                <FaChurch className="text-5xl text-white" />
              </div>
              <h2 className="text-5xl md:text-6xl font-extrabold mb-8 text-white drop-shadow-2xl">Join Our Family</h2>
              <p className="text-2xl text-white font-medium mb-12 leading-relaxed drop-shadow-lg">
                We'd love to meet you. Come as you are — there's a place for you here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/plan-visit"
                  className="inline-block bg-white text-red-900 px-10 py-5 rounded-full font-bold text-xl hover:bg-orange-50 transition-all duration-300 shadow-2xl hover:scale-105"
                >
                  Plan Your Visit
                </Link>
                <Link
                  href="/contact"
                  className="inline-block bg-transparent border-2 border-white text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white/20 transition-all duration-300 shadow-2xl hover:scale-105"
                >
                  Get In Touch
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}