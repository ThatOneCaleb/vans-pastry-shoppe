"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Magnetic from "./Magnetic";

const leftLinks = [
  { label: "Story", href: "#story" },
  { label: "Menu", href: "#menu" },
  { label: "Order", href: "#order" },
];

const mobileLinks = [
  { label: "Story", href: "#story" },
  { label: "Menu", href: "#menu" },
  { label: "Order", href: "#order" },
  { label: "Find Us", href: "#visit" },
];

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, when: "beforeChildren" as const, staggerChildren: 0.08 },
  },
  exit: { opacity: 0, transition: { duration: 0.3, when: "afterChildren" as const } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, y: 12, transition: { duration: 0.2 } },
};

// Lusion-style rolling hover: the label slides up and out while a gold
// duplicate rolls in from below.
function RollingLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="group relative block overflow-hidden font-inter text-[14px] leading-snug text-white"
    >
      <span className="block transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
        {label}
      </span>
      <span
        aria-hidden="true"
        className="absolute left-0 top-full block text-gold transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
      >
        {label}
      </span>
    </a>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#1A0F08]/90 backdrop-blur-md shadow-[0_1px_0_rgba(196,147,63,0.15)]"
            : "bg-transparent"
        }`}
      >
        <nav className="relative mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-6 lg:px-12">
          {/* Left links — desktop */}
          <div className="hidden items-center gap-8 md:flex">
            {leftLinks.map((link) => (
              <RollingLink key={link.label} label={link.label} href={link.href} />
            ))}
          </div>

          {/* Hamburger — mobile */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
            className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-[6px] md:hidden"
          >
            <span
              className={`block h-[1.5px] w-6 bg-gold transition-all duration-300 ${
                open ? "translate-y-[7.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-6 bg-gold transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-6 bg-gold transition-all duration-300 ${
                open ? "-translate-y-[7.5px] -rotate-45" : ""
              }`}
            />
          </button>

          {/* Center logo */}
          <a
            href="#"
            aria-label="Van's Pastry Shoppe — Home"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Image
              src="/assets/vans-logo-white.png"
              alt="Van's Pastry Shoppe"
              width={240}
              height={240}
              className="h-[48px] w-auto opacity-90 transition-opacity duration-300 hover:opacity-100"
            />
          </a>

          {/* Right — desktop */}
          <div className="hidden items-center gap-7 md:flex">
            <RollingLink label="Find Us" href="#visit" />
            <Magnetic strength={0.3}>
              <a
                href="#order"
                className="block bg-dutch-blue px-5 py-2.5 font-inter text-[13px] font-medium tracking-wide text-warm-white transition-colors duration-300 hover:bg-[#253c7a]"
              >
                Order Now
              </a>
            </Magnetic>
          </div>

          {/* spacer to balance hamburger on mobile */}
          <div className="w-10 md:hidden" />
        </nav>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[55] flex flex-col items-center justify-center bg-espresso md:hidden"
          >
            <div className="flex flex-col items-center gap-7">
              <motion.div variants={itemVariants} className="mb-2">
                <Image
                  src="/assets/vans-logo-white.png"
                  alt="Van's Pastry Shoppe"
                  width={240}
                  height={240}
                  className="h-[64px] w-auto opacity-80"
                />
              </motion.div>
              {mobileLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  variants={itemVariants}
                  onClick={() => setOpen(false)}
                  className="font-playfair text-[40px] italic text-warm-white transition-colors hover:text-gold"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#order"
                variants={itemVariants}
                onClick={() => setOpen(false)}
                className="mt-4 bg-dutch-blue px-8 py-3.5 font-inter text-[14px] font-medium tracking-wide text-warm-white"
              >
                Order Now
              </motion.a>
              <motion.p
                variants={itemVariants}
                className="mt-6 font-inter text-[11px] uppercase tracking-[0.25em] text-gold/70"
              >
                Grand Rapids, MI &middot; Est. 1924
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
