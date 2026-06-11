"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const products = [
  {
    name: "English Muffin Bread",
    note: "Van's specialty — our biggest seller",
    img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=85",
  },
  {
    name: "Butter Croissants",
    note: "Baked fresh at 6 AM",
    img: "https://images.unsplash.com/photo-1623334044303-241021148842?w=800&q=85",
  },
  {
    name: "Sprinkled Donuts",
    note: "Glazed, iced, and dipped daily",
    img: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=85",
  },
  {
    name: "Chocolate Chip Cookies",
    note: "One dollar, every day",
    img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=85",
  },
  {
    name: "Blueberry Muffins",
    note: "Cherry, blueberry, honey bran",
    img: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800&q=85",
  },
  {
    name: "Custom Cakes",
    note: "Decorated in-house, made to order",
    img: "/assets/vans-real-2.jpg",
    contain: true,
  },
];

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function SignatureProducts() {
  return (
    <section id="menu" className="grain relative overflow-hidden bg-espresso py-24 md:py-36">
      {/* subtle radial depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(196,147,63,0.07) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-[2] mx-auto max-w-[1400px] px-6 lg:px-12">
        <p className="text-center font-inter text-[11px] uppercase tracking-widest text-gold">
          The Classics
        </p>
        <h2 className="mt-5 text-center font-playfair text-[42px] font-bold italic leading-[1.05] text-warm-white md:text-[56px] lg:text-[64px]">
          What We&rsquo;re Known For
        </h2>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {products.map((product) => (
            <motion.article
              key={product.name}
              variants={cardVariants}
              className="group relative aspect-[3/4] overflow-hidden rounded-none transition-shadow duration-500 hover:ring-1 hover:ring-gold"
            >
              {product.contain && (
                <div className="absolute inset-0 bg-gradient-to-b from-[#241509] to-espresso" />
              )}
              <Image
                src={product.img}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={`transition-transform duration-500 group-hover:scale-105 ${
                  product.contain ? "object-contain p-6" : "object-cover"
                }`}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(26,15,8,0.9) 0%, transparent 50%)",
                }}
              />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-playfair text-[28px] italic leading-tight text-white">
                  {product.name}
                </h3>
                <p className="mt-1 font-inter text-[12px] uppercase tracking-[0.18em] text-gold/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {product.note}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
