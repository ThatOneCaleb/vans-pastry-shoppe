"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import OpenStatus from "./OpenStatus";

const hours = [
  { days: "Monday — Friday", time: "6:00 AM — 4:00 PM", open: true },
  { days: "Saturday", time: "6:00 AM — 1:00 PM", open: true },
  { days: "Sunday", time: "Closed", open: false },
];

export default function LocationHours() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".visit-reveal",
        { opacity: 0, x: -36 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );
      gsap.fromTo(
        ".visit-map",
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="visit"
      className="grain relative overflow-hidden bg-espresso py-24 md:py-36"
    >
      <div className="absolute inset-x-0 top-0 h-[3px] bg-dutch-blue" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 20% 100%, rgba(30,50,100,0.14) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-[2] mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-12">
        {/* Left — info */}
        <div>
          <p className="visit-reveal font-inter text-[11px] uppercase tracking-widest text-gold">
            Visit Us
          </p>

          <h2 className="visit-reveal mt-5 font-playfair text-[40px] italic leading-[1.05] text-white md:text-[56px]">
            Find Your Way
            <br />
            to Fulton Street.
          </h2>

          <div className="visit-reveal mt-7">
            <OpenStatus />
          </div>

          {/* Hours grid */}
          <div className="visit-reveal mt-10 max-w-md divide-y divide-white/10 border-y border-white/10">
            {hours.map((row) => (
              <div
                key={row.days}
                className="flex items-baseline justify-between py-4"
              >
                <span className="font-inter text-[16px] text-white">
                  {row.days}
                </span>
                <span
                  className={`font-inter text-[16px] ${
                    row.open ? "text-cream/70" : "text-cream/40 italic"
                  }`}
                >
                  {row.time}
                </span>
              </div>
            ))}
          </div>

          <div className="visit-reveal mt-9 space-y-2 font-inter text-[14px] leading-relaxed text-cream">
            <p>955 Fulton St E, Grand Rapids, MI 49503</p>
            <p>
              <a
                href="tel:+16164581637"
                className="text-gold transition-colors duration-300 hover:text-warm-white"
              >
                (616) 458-1637
              </a>
            </p>
          </div>
        </div>

        {/* Right — map */}
        <div className="visit-map map-sepia relative aspect-[4/3] w-full overflow-hidden ring-1 ring-gold/20 lg:aspect-[5/4]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2918.8!2d-85.6313!3d42.9634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s955+Fulton+St+E+Grand+Rapids+MI!5e0!3m2!1sen!2sus!4v1"
            title="Map to Van's Pastry Shoppe, 955 Fulton St E, Grand Rapids"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
