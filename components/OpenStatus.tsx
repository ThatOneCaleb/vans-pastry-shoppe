"use client";

import { useEffect, useState } from "react";

// Real hours: Mon–Fri 6–4, Sat 6–1, Sun closed
const HOURS: Record<number, { open: number; close: number } | null> = {
  0: null,
  1: { open: 6, close: 16 },
  2: { open: 6, close: 16 },
  3: { open: 6, close: 16 },
  4: { open: 6, close: 16 },
  5: { open: 6, close: 16 },
  6: { open: 6, close: 13 },
};

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function fmt(hour: number) {
  if (hour === 12) return "12 PM";
  return hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
}

function getStatus(now: Date): { open: boolean; label: string } {
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;
  const today = HOURS[day];

  if (today && hour >= today.open && hour < today.close) {
    return { open: true, label: `Open now · Fresh until ${fmt(today.close)}` };
  }

  // find next opening
  for (let i = 0; i < 7; i++) {
    const d = (day + i) % 7;
    const h = HOURS[d];
    if (!h) continue;
    if (i === 0 && hour >= h.open) continue; // already past today's open
    const when = i === 0 ? "today" : i === 1 ? "tomorrow" : DAY_NAMES[d];
    return { open: false, label: `Closed · Opens ${when} at ${fmt(h.open)}` };
  }
  return { open: false, label: "Closed" };
}

export default function OpenStatus() {
  const [status, setStatus] = useState<{ open: boolean; label: string } | null>(null);

  useEffect(() => {
    // computed client-side only, so server and client markup never disagree
    const update = () => setStatus(getStatus(new Date()));
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  if (!status) return null;

  return (
    <span className="inline-flex items-center gap-2.5 border border-gold/30 bg-espresso/60 px-4 py-2">
      <span className="relative flex h-2 w-2">
        {status.open && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-60" />
        )}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${
            status.open ? "bg-sage" : "bg-gold/70"
          }`}
        />
      </span>
      <span className="font-inter text-[12px] uppercase tracking-[0.16em] text-cream/90">
        {status.label}
      </span>
    </span>
  );
}
