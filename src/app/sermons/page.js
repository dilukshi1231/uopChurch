'use client';
import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { format } from 'date-fns';
import { FaPlay, FaDownload, FaCalendar, FaUser, FaClock } from 'react-icons/fa';

export default function SermonsPage() {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeries, setSelectedSeries] = useState('all');
  const [livestreamActive, setLivestreamActive] = useState(false);

  useEffect(() => {
    fetchSermons();
    checkLivestream();
  }, []);

  const fetchSermons = async () => {
    try {
      const sermonsRef = collection(db, 'sermons');
      const q = query(sermonsRef, orderBy('date', 'desc'), limit(20));
      const snapshot = await getDocs(q);
      
      const sermonsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date.toDate()
      }));
      
      setSermons(sermonsData);
    } catch (error) {
      console.error('Error fetching sermons:', error);
      // Use sample data if Firebase fetch fails
      setSermons(getSampleSermons());
    } finally {
      setLoading(false);
    }
  };

  const checkLivestream = () => {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    
    // Check if it's Sunday between 9 AM - 12 PM
    if (day === 0 && hours >= 9 && hours < 12) {
      setLivestreamActive(true);
    }
  };

  const getSampleSermons = () => [
    {
      id: 1,
      title: 'The Power of Faith',
      speaker: 'Pastor John Smith',
      date: new Date(2024, 11, 8),
      series: 'Faith Foundations',
      duration: '45 min',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      audioUrl: '#',
      description: 'Exploring how faith transforms our daily lives and strengthens our relationship with God.'
    },
    {
      id: 2,
      title: 'Walking in Grace',
      speaker: 'Pastor John Smith',
      date: new Date(2024, 11, 1),
      series: 'Faith Foundations',
      duration: '42 min',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      audioUrl: '#',
      description: 'Understanding God\'s amazing grace and how it empowers us to live victoriously.'
    },
    {
      id: 3,
      title: 'Love Your Neighbor',
      speaker: 'Pastor Sarah Johnson',
      date: new Date(2024, 10, 24),
      series: 'Living Like Jesus',
      duration: '38 min',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      audioUrl: '#',
      description: 'Practical ways to show Christ\'s love to those around us in our daily lives.'
    },
    {
      id: 4,
      title: 'Prayer That Moves Mountains',
      speaker: 'Pastor John Smith',
      date: new Date(2024, 10, 17),
      series: 'Prayer Series',
      duration: '50 min',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      audioUrl: '#',
      description: 'Discovering the power of persistent prayer and developing a deeper prayer life.'
    },
    {
      id: 5,
      title: 'Finding Hope in Trials',
      speaker: 'Pastor Michael Davis',
      date: new Date(2024, 10, 10),
      series: 'Living Like Jesus',
      duration: '44 min',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      audioUrl: '#',
      description: 'How to maintain hope and trust in God during life\'s difficult seasons.'
    },
    {
      id: 6,
      title: 'The Joy of Serving',
      speaker: 'Pastor Sarah Johnson',
      date: new Date(2024, 10, 3),
      series: 'Living Like Jesus',
      duration: '41 min',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      audioUrl: '#',
      description: 'Discovering the blessing and fulfillment that comes from serving others.'
    }
  ];

  const series = ['all', ...new Set(sermons.map(s => s.series))];

  const filteredSermons = selectedSeries === 'all' 
    ? sermons 
    : sermons.filter(s => s.series === selectedSeries);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading sermons...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Sermons</h1>
            <p className="text-xl text-blue-100">
              Watch or listen to biblical teaching that will inspire and challenge your faith
            </p>
          </div>
        </div>
      </section>

      {/* Livestream Section */}
      {livestreamActive && (
        <section className="py-8 bg-red-50 border-b-2 border-red-200">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                <h2 className="text-2xl font-bold text-red-900">LIVE NOW</h2>
              </div>
              <p className="text-gray-700 mb-4">Join our worship service happening right now!</p>
              <button className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                Watch Live Service
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="text-gray-700 font-medium self-center">Filter by series:</span>
              {series.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSeries(s)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedSeries === s
                      ? 'bg-blue-900 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {s === 'all' ? 'All Sermons' : s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sermons Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {filteredSermons.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No sermons found for this series.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {filteredSermons.map((sermon) => (
                  <div key={sermon.id} className="card group hover:shadow-xl transition-all duration-300">
                    {/* Video Thumbnail */}
                    <div className="relative bg-gray-200 rounded-lg overflow-hidden mb-4 aspect-video">
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900/80 to-blue-700/80 group-hover:from-blue-900/90 group-hover:to-blue-700/90 transition-all">
                        <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-900 hover:scale-110 transition-transform">
                          <FaPlay className="ml-1" />
                        </button>
                      </div>
                      <iframe
                        className="w-full h-full opacity-0"
                        src={sermon.videoUrl}
                        title={sermon.title}
                        allowFullScreen
                      ></iframe>
                    </div>

                    {/* Sermon Info */}
                    <div className="mb-2">
                      <span className="inline-block bg-blue-100 text-blue-900 text-xs font-semibold px-3 py-1 rounded-full">
                        {sermon.series}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-900 transition-colors">
                      {sermon.title}
                    </h3>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <FaUser className="text-blue-900" />
                        <span>{sermon.speaker}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCalendar className="text-blue-900" />
                        <span>{format(sermon.date, 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaClock className="text-blue-900" />
                        <span>{sermon.duration}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{sermon.description}</p>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button className="flex-1 bg-blue-900 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-800 transition-colors flex items-center justify-center gap-2">
                        <FaPlay /> Watch
                      </button>
                      <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center justify-center gap-2">
                        <FaDownload /> Audio
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-title">Never Miss a Message</h2>
            <p className="text-gray-600 mb-8">
              Subscribe to receive notifications when new sermons are posted
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-900"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Times Reminder */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Us In Person</h2>
          <p className="text-xl text-blue-100 mb-6">
            Experience worship live every Sunday
          </p>
          <div className="text-2xl font-bold mb-8">
            9:00 AM & 11:00 AM
          </div>
          <a href="/events" className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
            Plan Your Visit
          </a>
        </div>
      </section>
    </div>
  );
}