import Image from "next/image";

const quickLinks = [
  { label: "Story", href: "#story" },
  { label: "Menu", href: "#menu" },
  { label: "Order", href: "#order" },
  { label: "Find Us", href: "#visit" },
];

function InstagramIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.5 21v-7h2.5l.5-3h-3V9.1c0-.9.3-1.6 1.7-1.6H16.6V4.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9V11H8v3h2.5v7h3z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer id="order" className="bg-[#0F0805]">
      <div className="h-[3px] bg-dutch-blue" />
      <div className="mx-auto max-w-[1400px] px-6 pb-10 pt-20 lg:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {/* Col 1 — Brand */}
          <div>
            <Image
              src="/assets/vans-logo-white.png"
              alt="Van's Pastry Shoppe logo"
              width={300}
              height={300}
              className="h-auto w-[140px] opacity-90"
            />
            <p className="mt-4 font-inter text-[14px] text-cream/60">
              Home of famous Dutch Crisp and Banket. Baked with love since
              1924.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://www.instagram.com"
                aria-label="Van's Pastry Shoppe on Instagram"
                className="text-cream/50 transition-colors duration-300 hover:text-gold"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.facebook.com"
                aria-label="Van's Pastry Shoppe on Facebook"
                className="text-cream/50 transition-colors duration-300 hover:text-gold"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>

          {/* Col 2 — Quick links */}
          <div>
            <p className="font-inter text-[11px] uppercase tracking-[0.2em] text-gold">
              Quick Links
            </p>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-inter text-[14px] text-cream/70 transition-colors duration-300 hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Newsletter */}
          <div>
            <p className="font-playfair text-[22px] italic text-warm-white">
              Stay Fresh
            </p>
            <p className="mt-2 font-inter text-[13px] text-cream/50">
              Seasonal specials and bakery news, once a month.
            </p>
            <form className="mt-5 flex" action="#">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Your email"
                className="w-full border border-cream/15 bg-transparent px-4 py-3 font-inter text-[14px] text-warm-white placeholder:text-cream/35 focus:border-gold"
              />
              <button
                type="submit"
                className="shrink-0 bg-gold px-5 py-3 font-inter text-[13px] font-medium text-espresso transition-colors duration-300 hover:bg-warm-white"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider + copyright */}
        <div className="mt-16 border-t border-gold/20 pt-7">
          <p className="font-inter text-[12px] text-cream/40">
            &copy; 2024 Van&rsquo;s Pastry Shoppe. Grand Rapids, MI.
          </p>
        </div>
      </div>
    </footer>
  );
}
