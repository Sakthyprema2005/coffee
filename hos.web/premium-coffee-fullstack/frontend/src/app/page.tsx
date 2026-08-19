import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import StoryTimeline from "@/components/home/StoryTimeline";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FeaturedCoffee from "@/components/home/FeaturedCoffee";
import Gallery from "@/components/home/Gallery";
import Testimonials from "@/components/home/Testimonials";
import ReservationCTA from "@/components/home/ReservationCTA";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import SteamEffect from "@/components/ui/SteamEffect";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#060302] text-white relative overflow-x-hidden">
      <CustomCursor />
      <SteamEffect />
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <StoryTimeline />
      <FeaturedCoffee />
      <Gallery />
      <Testimonials />
      <ReservationCTA />
      <Footer />
    </main>
  );
}
