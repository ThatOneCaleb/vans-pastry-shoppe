"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

export default function PullQuote() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".quote-reveal",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.18,
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-cream px-6 py-28 text-center md:py-40"
    >
      {/* Decorative open quote */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 select-none font-playfair text-[140px] leading-none text-dutch-blue opacity-[0.1] md:top-10 md:text-[200px]"
      >
        &ldquo;
      </span>

      <blockquote className="relative z-10 mx-auto max-w-3xl">
        {/* Real Van's logo as an authenticity mark */}
        <div className="quote-reveal mx-auto mb-10 w-[150px] mix-blend-multiply md:w-[190px]">
          <Image
            src="/assets/vans-real-0.jpg"
            alt="Van's Pastry Shoppe — home of famous Dutch Crisp and Banket"
            width={380}
            height={380}
            className="h-auto w-full"
          />
        </div>
        <p className="quote-reveal font-playfair text-[26px] italic leading-[1.35] text-brown md:text-[40px]">
          The same recipes John Vander Meer brought from the Netherlands.
          Nothing has changed.
        </p>
        <footer className="quote-reveal mt-4 font-inter text-[14px] text-brown/55">
          &mdash; David Vander Meer, 4th Generation Owner
        </footer>
      </blockquote>
    </section>
  );
}
