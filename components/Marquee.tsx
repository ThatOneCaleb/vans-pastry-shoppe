"use client";

import { useEffect, useRef } from "react";

const items = [
  "Round English Muffin Bread",
  "Dutch Banket",
  "Dutch Crisp Cookies",
  "It's Made Clean",
  "No Preservatives",
  "Apple Fritters",
  "Hot Cross Buns",
  "Paczki",
  "Custom Cakes",
];

function MarqueeContent() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {items.map((item) => (
        <span
          key={item}
          className="flex items-center whitespace-nowrap font-playfair text-[24px] italic text-gold"
        >
          <span className="px-6">{item}</span>
          <span className="text-gold/60">&middot;</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  const track = useRef<HTMLDivElement>(null);

  // Scroll-velocity–coupled marquee: drifts left at rest, accelerates as you
  // scroll down, and runs backwards when you scroll up — Lusion-style.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf: number;
    let x = 0;
    let lastY = window.scrollY;
    let vel = 0;

    const tick = () => {
      const y = window.scrollY;
      vel += (y - lastY - vel) * 0.08;
      lastY = y;

      // base drift + scroll boost (sign of vel flips the direction)
      x -= 0.7 + vel * 0.35;

      const period = el.scrollWidth / 3; // width of one content copy
      if (period > 0) {
        if (x <= -period) x += period;
        if (x > 0) x -= period;
      }
      el.style.transform = `translate3d(${x}px, 0, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      className="relative overflow-hidden border-y border-dutch-blue bg-dutch-blue py-5"
      aria-label="Our signature baked goods"
    >
      <div ref={track} className="flex w-max will-change-transform">
        <MarqueeContent />
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </section>
  );
}
