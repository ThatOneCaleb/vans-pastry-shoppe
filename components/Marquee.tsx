const items = [
  "English Muffin Bread",
  "Almond Pastries",
  "Hot Cross Buns",
  "Apple Fritters",
  "Paczki",
  "Sugar Cinnamon Bread",
  "Donuts",
  "Custom Cakes",
];

function MarqueeContent() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {items.map((item) => (
        <span
          key={item}
          className="flex items-center whitespace-nowrap font-playfair text-[24px] italic text-gold"
        >
          <span className="px-6">{item}</span>
          <span className="text-gold/60">&middot;</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section
      className="marquee-wrap relative overflow-hidden border-y border-dutch-blue bg-dutch-blue py-5"
      aria-label="Our signature baked goods"
    >
      <div className="marquee-track">
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </section>
  );
}
