"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const partners = [
  { name: "The Grilling Company" },
  { name: "The Peppermill Cafe" },
  { name: "KCM Grand Rapids" },
  { name: "Shelly's Kitchen", detail: "Fri · Sat · Sun — 8 AM to 2 PM" },
  { name: "The Embassy Bar & Grill" },
  { name: "Rainbow Grill", detail: "Grandville" },
  { name: "Caribbean Sunrise", detail: "Holland" },
  { name: "Ski's Sub Shop" },
  { name: "Arrows Restaurant", detail: "Hudsonville · Mon–Sat 6:30 AM–7 PM" },
  { name: "Red Geranium", detail: "Byron Center · Thu–Sun 8 AM–1 PM" },
  { name: "Local Mocha", detail: "96 Monroe Center · (616) 459-0082" },
  { name: "Red Geranium", detail: "Kalamazoo · Thu–Sun 8 AM–1 PM" },
  { name: "Grand Coney", detail: "Michigan St · Daily 7 AM–10 PM" },
];

export default function LocalPartners() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".partner-header",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: "top 72%" },
        }
      );
      gsap.fromTo(
        ".partner-row",
        { opacity: 0, x: -24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.045,
          scrollTrigger: { trigger: ".partner-list", start: "top 78%" },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="grain relative overflow-hidden bg-parchment py-24 md:py-36"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 80% 50%, rgba(196,147,63,0.06) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-[2] mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_2fr] lg:gap-24">
          {/* Left — intro */}
          <div>
            <p className="partner-header font-inter text-[11px] uppercase tracking-widest text-dutch-blue">
              Wholesale Partners
            </p>
            <h2 className="partner-header mt-5 font-playfair text-[40px] italic leading-[1.05] text-espresso md:text-[52px]">
              Feeding Grand
              <br />
              Rapids Together.
            </h2>
            <p className="partner-header mt-6 font-inter text-[15px] leading-[1.75] text-brown/65">
              At Van&rsquo;s Pastry, we&rsquo;re always trying to support our local
              community — especially the restaurants and cafes that order bread,
              donuts, pastries, and other goodies from us every day. These are
              the spots we&rsquo;re proud to call partners.
            </p>
            <div className="partner-header mt-10 border-l-2 border-dutch-blue pl-6">
              <p className="font-inter text-[13px] uppercase tracking-widest text-brown/50">
                Interested in wholesale?
              </p>
              <a
                href="tel:+16164581637"
                className="mt-1 block font-playfair text-[20px] italic text-dutch-blue transition-colors hover:text-espresso"
              >
                (616) 458-1637
              </a>
            </div>
          </div>

          {/* Right — partner list */}
          <div className="partner-list">
            <ul className="divide-y divide-espresso/8 border-y border-espresso/12">
              {partners.map((p, i) => (
                <li
                  key={i}
                  className="partner-row group flex items-baseline justify-between gap-6 py-5 transition-colors duration-300 hover:bg-espresso/[0.02]"
                >
                  <span className="font-playfair text-[20px] italic text-espresso transition-colors duration-300 group-hover:text-gold md:text-[22px]">
                    {p.name}
                  </span>
                  {p.detail && (
                    <span className="shrink-0 text-right font-inter text-[11px] uppercase tracking-[0.14em] text-brown/45 transition-colors duration-300 group-hover:text-brown/70">
                      {p.detail}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
