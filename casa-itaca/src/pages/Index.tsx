import { LanguageProvider } from "../contexts/LanguageContext";
import { Navigation } from "../components/Navigation";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { RoomsSection } from "../components/RoomsSection";
import { AvailabilitySection } from "../components/AvailabilitySection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Navigation />
        <main>
          <HeroSection />
          <AboutSection />
          <RoomsSection />
          <AvailabilitySection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
