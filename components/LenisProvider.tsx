"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap";

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });

    lenis.on("scroll", ScrollTrigger.update);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
