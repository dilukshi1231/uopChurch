// src/components/ServiceTimes.js
import { FaClock, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

export default function ServiceTimes() {
  const services = [
    {
      name: 'Sunday Worship',
      time: '4:00 PM',
      day: 'Every Sunday',
      description: 'Join us for inspiring worship and biblical teaching',
      icon: <FaCalendarAlt className="text-3xl text-white" />,
    },
    {
      name: 'Wednesday Prayer Meeting',
      time: '5:00 PM',
      day: 'Every Wednesday',
      description: 'Midweek prayer and fellowship',
      icon: <FaClock className="text-3xl text-white" />,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="section-title">Service Times</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto text-lg">
            We'd love to have you join us! All are welcome.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col sm:flex-row gap-8 justify-center max-w-3xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex-1 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Card Top Banner */}
              <div className="bg-primary px-6 py-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-white text-xl font-bold">{service.name}</h3>
                <p className="text-white/70 text-sm mt-1">{service.day}</p>
              </div>

              {/* Card Bottom */}
              <div className="bg-gray-50 px-6 py-6 text-center">
                <p className="text-4xl font-extrabold text-secondary mb-2">{service.time}</p>
                <p className="text-gray-500 text-sm">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Location */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-gray-100 px-6 py-3 rounded-full text-gray-700 shadow-sm">
            <FaMapMarkerAlt className="text-secondary text-lg" />
            <span className="text-sm font-medium">University Park, Udaperadeniya Road, Peradeniya, Sri Lanka</span>
          </div>
        </div>

      </div>
    </section>
  );
}