"use client";

import { useEffect, useRef } from "react";

export default function HeritageStamp() {
  const ring = useRef<SVGSVGElement>(null);
  const rotation = useRef(0);
  const velocity = useRef(0);
  const lastScroll = useRef(0);

  useEffect(() => {
    let raf: number;
    lastScroll.current = window.scrollY;

    function tick() {
      // base spin + scroll-velocity boost, eased back down
      const scroll = window.scrollY;
      const delta = scroll - lastScroll.current;
      lastScroll.current = scroll;
      velocity.current += delta * 0.08;
      velocity.current *= 0.92;
      rotation.current += 0.15 + velocity.current;
      if (ring.current) {
        ring.current.style.transform = `rotate(${rotation.current}deg)`;
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-8 right-8 z-40 hidden h-[110px] w-[110px] items-center justify-center lg:flex"
    >
      {/* Parchment disc background so both dutch-blue ring and gold center are always legible */}
      <div className="absolute inset-0 rounded-full bg-parchment/90 shadow-[0_2px_20px_rgba(0,0,0,0.25)]" />
      <svg
        ref={ring}
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <path
            id="stamp-circle"
            d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
          />
        </defs>
        <text className="fill-[#1E3264] font-inter text-[8.5px] uppercase tracking-[0.22em]">
          <textPath href="#stamp-circle">
            Est. 1924 · Grand Rapids&apos; Oldest Bakery ·
          </textPath>
        </text>
      </svg>
      <span className="relative font-playfair text-[20px] italic text-[#1E3264]">
        Van&rsquo;s
      </span>
    </div>
  );
}
