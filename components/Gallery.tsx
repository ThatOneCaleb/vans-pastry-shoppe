"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

const images = [
  {
    src: "https://images.unsplash.com/photo-1486887396153-fa416526c108?w=800&q=85",
    alt: "Baker's hands holding a fresh-baked round loaf",
    tall: true,
  },
  {
    src: "/assets/vans-real-1.jpg",
    alt: "Van's hand-decorated chocolate sheet cake",
    tall: false,
  },
  {
    src: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=800&q=85",
    alt: "Bakery display cases stocked with fresh bread and pastries",
    tall: true,
  },
];

const stats = [
  { value: "100+", label: "Years of Baking", countTo: 100, suffix: "+" },
  { value: "6 AM", label: "Fresh Daily", countTo: null, suffix: "" },
  { value: "4th", label: "Generation Family", countTo: null, suffix: "" },
];

export default function Gallery() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gallery-head",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        }
      );

      gsap.fromTo(
        ".gallery-item",
        { opacity: 0, y: 56, clipPath: "inset(8% 0 8% 0)" },
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0 0% 0)",
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".gallery-grid", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".gallery-stat",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".gallery-stats", start: "top 85%" },
        }
      );

      // Count-up for the "100+" stat
      const counter = { n: 0 };
      const el = root.current?.querySelector(".stat-count");
      if (el) {
        gsap.to(counter, {
          n: 100,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: ".gallery-stats", start: "top 85%" },
          onUpdate: () => {
            el.textContent = `${Math.round(counter.n)}+`;
          },
        });
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="bg-parchment py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <p className="gallery-head font-inter text-[11px] uppercase tracking-widest text-dutch-blue">
          The Bakery
        </p>
        <h2 className="gallery-head mt-5 font-playfair text-[42px] font-bold italic leading-[1.05] text-brown md:text-[56px] lg:text-[64px]">
          Made Fresh
          <br />
          Every Morning
        </h2>

        {/* Masonry-style grid */}
        <div className="gallery-grid mt-14 grid grid-cols-1 items-start gap-6 sm:grid-cols-3 lg:gap-8">
          {images.map((img) => (
            <div
              key={img.src}
              data-skew
              className={`gallery-item group relative overflow-hidden ${
                img.tall
                  ? "aspect-[3/4] sm:aspect-[2/3]"
                  : "aspect-[3/2] sm:mt-16 sm:aspect-[4/3]"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover transition-[transform,filter] duration-[400ms] ease-out group-hover:scale-[1.02] group-hover:brightness-110"
              />
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="gallery-stats mt-20 grid grid-cols-1 gap-12 border-t border-brown/10 pt-14 sm:grid-cols-3 sm:gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="gallery-stat text-center">
              <p
                className={`font-playfair text-[56px] font-bold italic leading-none text-dutch-blue md:text-[64px] ${
                  stat.countTo ? "stat-count" : ""
                }`}
              >
                {stat.value}
              </p>
              <p className="mt-3 font-inter text-[12px] uppercase tracking-[0.2em] text-brown/60">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
