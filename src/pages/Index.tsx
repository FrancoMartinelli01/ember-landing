import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import PropuestaSection from "@/components/sections/PropuestaSection";
import MenuSection from "@/components/sections/MenuSection";
import ServicioSection from "@/components/sections/ServicioSection";
import TestimoniosSection from "@/components/sections/TestimoniosSection";
import GaleriaSection from "@/components/sections/GaleriaSection";
import FogoneroSection from "@/components/sections/FogoneroSection";
import ContactSection from "@/components/sections/ContactSection";
import WhatsAppFab from "@/components/WhatsAppFab";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <PropuestaSection />
        <MenuSection />
        <ServicioSection />
        <TestimoniosSection />
        <GaleriaSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
};

export default Index;
