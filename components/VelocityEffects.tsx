"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";

// Lusion-style scroll distortion: anything tagged [data-skew] shears and
// stretches with scroll velocity, then settles as the scroll eases out.
// Mounted once at page level; renders nothing.
export default function VelocityEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = gsap.utils.toArray<HTMLElement>("[data-skew]");
    if (!targets.length) return;

    const setters = targets.map((t) => ({
      skew: gsap.quickSetter(t, "skewY", "deg"),
      scale: gsap.quickSetter(t, "scaleY"),
    }));

    let lastY = window.scrollY;
    let vel = 0;

    const tick = () => {
      const y = window.scrollY;
      // low-pass filter so the skew eases in and decays smoothly to 0
      vel += (y - lastY - vel) * 0.1;
      lastY = y;

      const skew = gsap.utils.clamp(-5, 5, vel * 0.1);
      const stretch = 1 + Math.min(0.06, Math.abs(vel) * 0.0012);
      for (const s of setters) {
        s.skew(skew);
        s.scale(stretch);
      }
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      for (const t of targets) gsap.set(t, { skewY: 0, scaleY: 1 });
    };
  }, []);

  return null;
}
