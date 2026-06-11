"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const milestones = [
  {
    year: "1924",
    title: "The Crossing",
    text: "John Vander Meer arrives in Grand Rapids from the Netherlands, carrying little more than his family's recipes — Dutch Crisp, Banket, and breads baked the old way.",
  },
  {
    year: "1942",
    title: "Fulton Street",
    text: "The bakery moves to 955 Fulton St E. The ovens have been warm every morning since — over eighty years at the same corner.",
  },
  {
    year: "1960s",
    title: "Passing the Bench",
    text: "The second and third generations of Vander Meers learn the trade — same recipes, same hands-on craft, no shortcuts.",
  },
  {
    year: "Today",
    title: "Fourth Generation",
    text: "David and Michelle Vander Meer keep the recipes exactly as John wrote them. The English Muffin Bread still sells out by noon.",
  },
  {
    year: "100",
    title: "Years of Craft",
    text: "Grand Rapids' oldest bakery celebrates a century. One family. One street. One standard.",
  },
];

export default function Timeline() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop: pin the section and scrub the track horizontally
      mm.add("(min-width: 1024px)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;

        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => "+=" + distance(),
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        // progress line fills as you scrub
        gsap.fromTo(
          ".timeline-progress",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: () => "+=" + distance(),
              scrub: 1,
            },
          }
        );
      });

      // Mobile: simple staggered reveal
      mm.add("(max-width: 1023px)", () => {
        gsap.utils.toArray<HTMLElement>(".timeline-card").forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 85%" },
            }
          );
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="grain relative overflow-hidden bg-espresso"
    >
      {/* Section header — stays visible while pinned */}
      <div className="absolute left-6 top-14 z-10 lg:left-12 lg:top-20">
        <p className="font-inter text-[11px] uppercase tracking-widest text-gold">
          A Century on Fulton Street
        </p>
        <h2 className="mt-3 font-playfair text-[32px] font-bold italic text-warm-white md:text-[40px]">
          The Timeline
        </h2>
      </div>

      {/* progress line */}
      <div className="absolute left-0 right-0 top-[180px] z-10 hidden h-px bg-gold/15 lg:block">
        <div className="timeline-progress h-full w-full origin-left bg-gold" />
      </div>

      {/* Horizontal track (desktop) / vertical stack (mobile) */}
      <div
        ref={track}
        className="flex flex-col gap-16 px-6 pb-24 pt-44 lg:h-screen lg:w-max lg:flex-row lg:items-center lg:gap-0 lg:px-[12vw] lg:pb-0 lg:pt-24"
      >
        {milestones.map((m) => {
          const isDutch = m.year === "1924" || m.year === "100";
          return (
          <article
            key={m.year + m.title}
            className="timeline-card group flex flex-col lg:w-[44vw] lg:shrink-0 lg:pr-[8vw]"
          >
            <span
              className={`font-playfair text-[88px] font-bold italic leading-none transition-colors duration-500 md:text-[120px] lg:text-[150px] ${
                isDutch
                  ? "text-dutch-blue/80 group-hover:text-dutch-blue"
                  : "text-gold/90 group-hover:text-gold"
              }`}
            >
              {m.year}
            </span>
            <h3 className="mt-6 font-playfair text-[26px] italic text-warm-white md:text-[30px]">
              {m.title}
            </h3>
            <p className="mt-4 max-w-md font-inter text-[15px] leading-[1.8] text-cream/65">
              {m.text}
            </p>
          </article>
          );
        })}
      </div>

      {/* scroll hint (desktop) */}
      <div className="absolute bottom-10 right-12 hidden items-center gap-3 lg:flex">
        <span className="font-inter text-[10px] uppercase tracking-[0.3em] text-cream/40">
          Keep scrolling
        </span>
        <span className="block h-px w-10 bg-gold/40" />
      </div>
    </section>
  );
}
