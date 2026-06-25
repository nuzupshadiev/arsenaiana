"use client";

import { useEffect, useState } from "react";
import { EVENT_DATE } from "../config/invitation";

const ZERO = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function getTimeLeft(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return ZERO;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const units = [
  { key: "days", label: "Күн" },
  { key: "hours", label: "Саат" },
  { key: "minutes", label: "Мүнөт" },
  { key: "seconds", label: "Секунд" },
] as const;

export function Countdown({ targetDate = EVENT_DATE }: { targetDate?: Date }) {
  const [timeLeft, setTimeLeft] = useState(ZERO);

  useEffect(() => {
    setTimeLeft(getTimeLeft(targetDate));
    const timer = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="countdown">
      {units.map((u) => (
        <div key={u.key} className="countdown__cell">
          <span className="countdown__num" suppressHydrationWarning>
            {String(timeLeft[u.key]).padStart(2, "0")}
          </span>
          <span className="countdown__label">{u.label}</span>
        </div>
      ))}
    </div>
  );
}