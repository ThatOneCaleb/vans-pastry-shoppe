import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

// Real review content from public Tripadvisor & Yelp reviews of Van's
const reviews = [
  {
    id: 1,
    name: "Best Doughnuts in Grand Rapids",
    role: "5-star review",
    company: "Tripadvisor",
    content:
      "Van's is all about the traditional fried dough you grew up with — not the overworked, overpriced stuff. One of the few places left where you can still get a donut and coffee for a buck.",
    rating: 5,
    avatar: "",
  },
  {
    id: 2,
    name: "English Muffin Bread Loaves",
    role: "5-star review",
    company: "Tripadvisor",
    content:
      "We make it a point to stop by and purchase Van's English muffin bread loaves whenever we're visiting Grand Rapids. The English muffin toasting bread is a must-buy.",
    rating: 5,
    avatar: "",
  },
  {
    id: 3,
    name: "Our MidTown Gem",
    role: "5-star review",
    company: "Tripadvisor",
    content:
      "A quaint vintage shop that makes their donuts, pastries, and breads in house daily. The folks working here are so wonderful, and the prices are the best you will find anywhere near here.",
    rating: 5,
    avatar: "",
  },
  {
    id: 4,
    name: "The Best in Town",
    role: "5-star review",
    company: "Yelp",
    content:
      "They have the best fresh donuts, English muffin bread, and banket in the area! All the cookies and breads are the best you'll get in town.",
    rating: 5,
    avatar: "",
  },
];

export default function Reviews() {
  return (
    <AnimatedTestimonials
      badgeText="Rated 4.8 across Google, Yelp & Tripadvisor"
      title="What Grand Rapids Says"
      subtitle="A hundred years of regulars can't be wrong. These are real words from real customers — the people who line up on Fulton Street every morning."
      testimonials={reviews}
      autoRotateInterval={5500}
      className="bg-parchment"
    />
  );
}
