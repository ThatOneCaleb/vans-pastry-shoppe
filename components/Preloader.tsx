"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

// Cinematic intro: espresso curtain with the Van's mark and a 0–100 counter,
// then the curtain lifts and fires "vans:reveal" so the hero entrance plays
// underneath the lift — the Lusion-style overlap.
export default function Preloader() {
  const [done, setDone] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const pct = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.dispatchEvent(new Event("vans:reveal"));
      setDone(true);
      return;
    }

    document.body.style.overflow = "hidden";
    const counter = { n: 0 };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          setDone(true);
        },
      });

      tl.fromTo(
        ".preloader-mark",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        0
      )
        .to(
          counter,
          {
            n: 100,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => {
              if (pct.current)
                pct.current.textContent = String(Math.round(counter.n));
            },
          },
          0.1
        )
        .fromTo(
          ".preloader-line",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.5, ease: "power2.inOut" },
          0.1
        )
        // brief beat, then lift the curtain and reveal the hero beneath it
        .add(() => window.dispatchEvent(new Event("vans:reveal")), "+=0.25")
        .to(root.current, {
          yPercent: -100,
          duration: 1.05,
          ease: "power4.inOut",
        });
    }, root);

    return () => {
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-espresso"
    >
      <div className="preloader-mark flex flex-col items-center">
        <Image
          src="/assets/vans-logo-white.png"
          alt=""
          width={360}
          height={360}
          priority
          className="h-auto w-[200px] md:w-[260px]"
        />
        <p className="mt-4 font-inter text-[10px] uppercase tracking-[0.3em] text-gold/70">
          Grand Rapids&rsquo; Oldest Bakery &middot; Est. 1924
        </p>
      </div>

      <div className="absolute bottom-12 left-0 right-0 px-8 md:px-14">
        <div className="flex items-end justify-between">
          <span className="font-inter text-[10px] uppercase tracking-[0.3em] text-cream/40">
            Preheating the ovens
          </span>
          <span className="font-playfair text-[44px] italic leading-none text-gold md:text-[56px]">
            <span ref={pct}>0</span>
          </span>
        </div>
        <div className="preloader-line mt-4 h-px w-full origin-left bg-gold/40" />
      </div>
    </div>
  );
}
