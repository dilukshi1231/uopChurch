'use client';
import { useState, useEffect } from 'react';

export default function LivestreamCounter() {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const nextSunday = new Date();
      
      // Set to next Sunday at 9 AM
      nextSunday.setDate(now.getDate() + (7 - now.getDay()) % 7);
      if (now.getDay() === 0 && now.getHours() < 9) {
        nextSunday.setDate(now.getDate());
      }
      nextSunday.setHours(9, 0, 0, 0);

      const difference = nextSunday - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft('Service starting soon!');
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-blue-900 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-2xl font-bold mb-2">Next Service In:</h3>
        <div className="text-4xl font-bold">{timeLeft}</div>
        <p className="text-blue-100 mt-4">Sunday at 9:00 AM</p>
      </div>
    </div>
  );
}