import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';

export default function ServiceTimes() {
  const services = [
    {
      name: 'Sunday Morning Worship',
      time: '9:00 AM & 11:00 AM',
      description: 'Join us for inspiring worship and biblical teaching',
    },
    {
      name: 'Wednesday Prayer Meeting',
      time: '7:00 PM',
      description: 'Midweek prayer and fellowship',
    },
    {
      name: 'Youth Group',
      time: 'Friday 6:30 PM',
      description: 'For teens in grades 6-12',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">Service Times</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          We'd love to have you join us! All are welcome.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <div key={index} className="card text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClock className="text-3xl text-blue-900" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
              <p className="text-blue-900 font-bold text-lg mb-2">{service.time}</p>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-gray-700">
            <FaMapMarkerAlt className="text-blue-900" />
            <span>123 Faith Street, Your City, ST 12345</span>
          </div>
        </div>
      </div>
    </section>
  );
}