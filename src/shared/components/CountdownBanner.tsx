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
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-slate-700 bg-slate-900 p-4 text-white shadow-lg">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 sm:flex-row">
        <h2 className="text-center text-xl font-bold tracking-wider uppercase sm:text-left">
          Em breve
        </h2>

        <div className="flex space-x-4 sm:space-x-6">
          <div className="flex flex-col items-center">
            <span className="font-mono text-2xl font-semibold">
              {timeLeft.days}
            </span>
            <span className="text-xs tracking-widest text-slate-400 uppercase">
              Dias
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-mono text-2xl font-semibold">
              {timeLeft.hours.toString().padStart(2, "0")}
            </span>
            <span className="text-xs tracking-widest text-slate-400 uppercase">
              Horas
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-mono text-2xl font-semibold">
              {timeLeft.minutes.toString().padStart(2, "0")}
            </span>
            <span className="text-xs tracking-widest text-slate-400 uppercase">
              Minutos
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-mono text-2xl font-semibold">
              {timeLeft.seconds.toString().padStart(2, "0")}
            </span>
            <span className="text-xs tracking-widest text-slate-400 uppercase">
              Segundos
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
