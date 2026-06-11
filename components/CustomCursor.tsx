"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const ringX = useSpring(mx, { stiffness: 300, damping: 28, mass: 0.6 });
  const ringY = useSpring(my, { stiffness: 300, damping: 28, mass: 0.6 });

  useEffect(() => {
    // only on fine pointers (desktop)
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    function onMove(e: MouseEvent) {
      mx.set(e.clientX);
      my.set(e.clientY);
      const target = e.target as HTMLElement;
      setHovering(
        !!target.closest('a, button, [data-cursor="hover"], input, textarea')
      );
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  if (!enabled) return null;

  return (
    <>
      {/* center dot — tracks instantly */}
      <motion.div
        style={{ x: mx, y: my }}
        className="pointer-events-none fixed left-0 top-0 z-[100] h-[6px] w-[6px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
      />
      {/* trailing ring — springs behind, expands on hoverables */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{
          width: hovering ? 52 : 32,
          height: hovering ? 52 : 32,
          opacity: hovering ? 0.9 : 0.5,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold"
      />
    </>
  );
}
