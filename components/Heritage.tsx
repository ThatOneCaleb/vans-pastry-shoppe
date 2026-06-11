"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

export default function Heritage() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on the image
      gsap.fromTo(
        ".heritage-img",
        { y: -30 },
        {
          y: 30,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Text reveal
      gsap.fromTo(
        ".heritage-reveal",
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: ".heritage-copy",
            start: "top 75%",
          },
        }
      );

    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="story"
      className="bg-parchment py-24 md:py-36"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[55%_1fr] lg:gap-20 lg:px-12">
        {/* Image — left 55% */}
        <div className="relative aspect-[4/5] overflow-hidden md:aspect-[5/4] lg:aspect-[4/5]">
          <div className="heritage-img absolute -inset-y-10 inset-x-0">
            <Image
              src="/assets/vans-real-3.jpg"
              alt="Fresh sugar paczki in front of Van's vintage shop sign"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Copy — right 45% */}
        <div className="heritage-copy">
          <p className="heritage-reveal font-inter text-[11px] uppercase tracking-widest text-dutch-blue">
            Our Story
          </p>

          <h2 className="heritage-reveal mt-5 font-playfair text-[42px] font-bold italic leading-[1.05] text-brown md:text-[56px] lg:text-[64px]">
            Four Generations.
            <br />
            One Recipe.
          </h2>

          <p className="heritage-reveal mt-7 max-w-xl font-inter text-[16px] leading-[1.8] text-brown/75 md:text-[17px]">
            John Vander Meer arrived from the Netherlands in 1924, carrying
            recipes passed down through his family for generations. He opened a
            small bakery in Grand Rapids and began baking the way he always had
            &mdash; with patience, quality ingredients, and no shortcuts. One
            hundred years later, his great-grandchildren David and Michelle
            still follow the same recipes. Nothing has changed.
          </p>

          <div className="heritage-reveal mt-10 border-l-[3px] border-dutch-blue pl-5">
            <p className="font-playfair text-[17px] italic text-dutch-blue/80 md:text-[19px]">
              Home of the famous Dutch Crisp and Banket.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
