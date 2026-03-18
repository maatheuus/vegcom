"use client";

import { useEffect, useState } from "react";

export default function CountdownBanner() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      // April 1st of the current year (Month is 0-indexed, so 3 is April)
      const targetDate = new Date(now.getFullYear(), 3, 1);

      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft(null);
      }
    };

    // Initial calculation
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  // Avoid hydration mismatch by not rendering anything on the server
  if (timeLeft === null) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-slate-900 text-white z-50 p-4 shadow-lg border-t border-slate-700">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <h2 className="text-xl font-bold uppercase tracking-wider text-center sm:text-left">
          Em breve
        </h2>

        <div className="flex space-x-4 sm:space-x-6">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-mono font-semibold">{timeLeft.days}</span>
            <span className="text-xs text-slate-400 uppercase tracking-widest">Dias</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-mono font-semibold">{timeLeft.hours.toString().padStart(2, '0')}</span>
            <span className="text-xs text-slate-400 uppercase tracking-widest">Horas</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-mono font-semibold">{timeLeft.minutes.toString().padStart(2, '0')}</span>
            <span className="text-xs text-slate-400 uppercase tracking-widest">Minutos</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-mono font-semibold">{timeLeft.seconds.toString().padStart(2, '0')}</span>
            <span className="text-xs text-slate-400 uppercase tracking-widest">Segundos</span>
          </div>
        </div>
      </div>
    </div>
  );
}
