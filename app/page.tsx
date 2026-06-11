import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Heritage from "@/components/Heritage";
import Timeline from "@/components/Timeline";
import SignatureProducts from "@/components/SignatureProducts";
import Menu from "@/components/Menu";
import PullQuote from "@/components/PullQuote";
import Gallery from "@/components/Gallery";
import LocalPartners from "@/components/LocalPartners";
import LocationHours from "@/components/LocationHours";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import HeritageStamp from "@/components/HeritageStamp";

export default function Home() {
  return (
    <main>
      <CustomCursor />
      <HeritageStamp />
      <Navigation />
      <Hero />
      <Marquee />
      <Heritage />
      <Timeline />
      <SignatureProducts />
      <Menu />
      <PullQuote />
      <Gallery />
      <LocalPartners />
      <LocationHours />
      <Footer />
    </main>
  );
}
