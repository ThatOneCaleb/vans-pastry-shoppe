"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { gsap } from "@/lib/gsap";
import Magnetic from "./Magnetic";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => null,
});

const headlineLines = [["Baked", "with"], ["Century-Old"], ["Craft."]];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    let onReveal: (() => void) | null = null;
    let fallback: ReturnType<typeof setTimeout> | null = null;

    const ctx = gsap.context(() => {
      const ease = "power3.out";

      // entrance waits for the preloader curtain ("vans:reveal") so the
      // text animates in while the curtain is still lifting
      const entrance = gsap.timeline({ paused: true });
      entrance
        .fromTo(
          ".hero-overline",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9, ease },
          0
        )
        .fromTo(
          ".hero-word",
          { opacity: 0, yPercent: 110 },
          { opacity: 1, yPercent: 0, duration: 1, ease, stagger: 0.12 },
          0.2
        )
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.9, ease },
          0.8
        )
        .fromTo(
          ".hero-buttons",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.9, ease },
          1.1
        )
        .fromTo(
          ".hero-scene",
          { opacity: 0 },
          { opacity: 1, duration: 2.2, ease: "power2.out" },
          0.8
        );

      onReveal = () => entrance.play();
      window.addEventListener("vans:reveal", onReveal, { once: true });
      // safety net in case the preloader never fires
      fallback = setTimeout(() => entrance.play(), 4000);

      // scroll-out choreography: image zooms slowly, content drifts up and fades
      gsap.to(".hero-bg", {
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero-content", {
        y: -90,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "70% top",
          scrub: true,
        },
      });

      // remove pre-mount hiding class once timeline takes over
      root.current?.classList.remove("gsap-prep");
    }, root);

    return () => {
      if (onReveal) window.removeEventListener("vans:reveal", onReveal);
      if (fallback) clearTimeout(fallback);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} className="gsap-prep relative h-screen min-h-[640px] w-full overflow-hidden">
      {/* Background image — scroll-zoom layer */}
      <div className="hero-bg absolute inset-0 will-change-transform">
        <Image
          src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1920&q=90"
          alt="Freshly baked artisan bread loaves"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom right, rgba(26,15,8,0.7) 0%, rgba(26,15,8,0.4) 100%)",
        }}
      />
      {/* Bottom anchor gradient for text legibility */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-espresso/80 to-transparent" />

      {/* Atmospheric flour-dust particles — full hero */}
      <div className="hero-scene pointer-events-none absolute inset-0 opacity-0">
        <HeroScene />
      </div>

      {/* Text content — bottom left */}
      <div className="hero-content absolute bottom-16 left-6 right-6 z-10 md:bottom-[120px] md:left-[80px] md:right-auto">
        <p className="hero-overline hero-fade font-inter text-[11px] uppercase tracking-[0.25em] text-gold">
          Home of Famous Dutch Crisp &amp; Banket &middot; Est. 1924
        </p>

        <h1 className="mt-5 font-playfair text-[56px] font-bold italic leading-[0.95] text-warm-white md:text-[80px] lg:text-[96px]">
          {headlineLines.map((line, i) => (
            <span key={i} className="hero-line">
              {line.map((word, j) => (
                <span key={j} className="hero-word">
                  {word}
                  {j < line.length - 1 ? " " : ""}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p className="hero-sub hero-fade mt-5 max-w-sm font-inter text-[18px] leading-relaxed text-cream/80">
          Four generations. The same recipes. The oldest bakery in Grand
          Rapids.
        </p>

        <div className="hero-buttons hero-fade mt-9 flex flex-wrap items-center gap-4">
          <Magnetic strength={0.3}>
            <a
              href="#menu"
              className="block bg-gold px-7 py-3.5 font-inter text-[14px] font-medium tracking-wide text-brown transition-colors duration-300 hover:bg-warm-white"
            >
              Explore Our Breads
            </a>
          </Magnetic>
          <Magnetic strength={0.3}>
            <a
              href="#story"
              className="block border border-gold px-7 py-3.5 font-inter text-[14px] font-medium tracking-wide text-gold transition-colors duration-300 hover:bg-gold hover:text-brown"
            >
              Our Story
            </a>
          </Magnetic>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 right-8 hidden items-center gap-3 md:flex">
        <span className="font-inter text-[10px] uppercase tracking-[0.3em] text-cream/50">
          Scroll
        </span>
        <span className="block h-px w-12 bg-dutch-blue" />
      </div>

      {/* Thin dutch-blue brand stripe at very top of hero */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-dutch-blue" />
    </section>
  );
}
