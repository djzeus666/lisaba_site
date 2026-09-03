import { About } from "@/components/sections/About";
import { ContactForm } from "@/components/sections/ContactForm";
import { Equipment } from "@/components/sections/Equipment";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Matkapital } from "@/components/sections/Matkapital";
import { Pricing } from "@/components/sections/Pricing";
import { Reviews } from "@/components/sections/Reviews";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { VideoSection } from "@/components/sections/VideoSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <VideoSection />
      <Services />
      <Equipment />
      <Pricing />
      <Matkapital />
      <Team />
      <Reviews />
      <ContactForm />
      <Footer />
    </>
  );
}
