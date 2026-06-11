"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const signatures = [
  {
    name: "Round English Muffin Bread",
    label: "R.E.M.",
    tag: "Our Biggest Seller",
    description:
      "A sourdough-style loaf unlike anything else in Grand Rapids. People use it for avocado toast, grilled cheese, french toast, homemade pizza — it does it all. Once you try it, you come back every week.",
    img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=85",
  },
  {
    name: "Dutch Banket",
    label: "Banket",
    tag: "Traditional Dutch",
    description:
      "As traditional as it gets. Our almond pastry is made the same way it was made in the Netherlands — the same recipe John Vander Meer brought over a century ago. Nothing has been changed. Nothing needs to be.",
    img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=85",
  },
  {
    name: "Dutch Crisp Cookies",
    label: "Dutch Crisp",
    tag: "Homemade Recipe",
    description:
      "Delightfully crafted from our own homemade recipe. Thin, buttery, and crisp in a way that no store-bought cookie comes close to. A Van's original that people drive across the city for.",
    img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=85",
  },
];

const otherItems = [
  {
    name: "Donuts",
    note: "Fat Balls, Apple Fritters, Long Johns",
    img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=85",
  },
  {
    name: "Muffins & Rolls",
    note: "Blueberry, cherry, honey bran, pecan",
    img: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800&q=85",
  },
  {
    name: "Custom Cakes",
    note: "Decorated in-house, made to order",
    img: "/assets/vans-real-2.jpg",
    contain: true,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function SignatureProducts() {
  return (
    <section id="menu" className="grain relative overflow-hidden bg-espresso py-24 md:py-36">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(196,147,63,0.07) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-[2] mx-auto max-w-[1400px] px-6 lg:px-12">

        {/* Section header */}
        <div className="flex flex-col items-center text-center">
          <p className="font-inter text-[11px] uppercase tracking-widest text-gold">
            The Classics
          </p>
          <h2 className="mt-5 font-playfair text-[42px] font-bold italic leading-[1.05] text-warm-white md:text-[56px] lg:text-[64px]">
            What We&rsquo;re Known For
          </h2>
          {/* "It's made clean" callout */}
          <div className="mt-6 inline-flex items-center gap-3 border border-gold/30 px-5 py-2.5">
            <span className="block h-px w-6 bg-gold/60" />
            <p className="font-playfair text-[15px] italic text-gold">
              No preservatives. It&rsquo;s made clean.
            </p>
            <span className="block h-px w-6 bg-gold/60" />
          </div>
        </div>

        {/* Three signature products — full descriptions */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {signatures.map((product) => (
            <motion.article
              key={product.name}
              variants={cardVariants}
              className="group flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={product.img}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(26,15,8,0.6) 0%, transparent 50%)",
                  }}
                />
                <span className="absolute left-4 top-4 border border-gold/50 px-2.5 py-1 font-inter text-[9px] uppercase tracking-[0.2em] text-gold">
                  {product.tag}
                </span>
              </div>

              {/* Copy */}
              <div className="flex flex-1 flex-col border border-gold/15 border-t-0 bg-warm-white/5 p-6">
                <p className="font-inter text-[10px] uppercase tracking-[0.22em] text-gold/70">
                  {product.label}
                </p>
                <h3 className="mt-2 font-playfair text-[24px] italic leading-tight text-warm-white">
                  {product.name}
                </h3>
                <p className="mt-3 font-inter text-[14px] leading-relaxed text-cream/60">
                  {product.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="mt-20 flex items-center gap-6">
          <span className="h-px flex-1 bg-gold/15" />
          <span className="font-inter text-[10px] uppercase tracking-[0.25em] text-gold/50">
            Also From the Counter
          </span>
          <span className="h-px flex-1 bg-gold/15" />
        </div>

        {/* Secondary items — smaller cards */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          data-skew
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {otherItems.map((item) => (
            <motion.article
              key={item.name}
              variants={cardVariants}
              className="group relative aspect-[3/2] overflow-hidden"
            >
              {item.contain && (
                <div className="absolute inset-0 bg-gradient-to-b from-[#241509] to-espresso" />
              )}
              <Image
                src={item.img}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className={`transition-transform duration-500 group-hover:scale-105 ${
                  item.contain ? "object-contain p-6" : "object-cover"
                }`}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(26,15,8,0.85) 0%, transparent 60%)",
                }}
              />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-playfair text-[22px] italic leading-tight text-white">
                  {item.name}
                </h3>
                <p className="mt-1 font-inter text-[11px] uppercase tracking-[0.16em] text-gold/70">
                  {item.note}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
