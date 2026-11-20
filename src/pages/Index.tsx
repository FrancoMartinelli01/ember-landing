import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import PropuestaSection from "@/components/sections/PropuestaSection";
import MenuSection from "@/components/sections/MenuSection";
import ServicioSection from "@/components/sections/ServicioSection";
import ComoFuncionaSection from "@/components/sections/ComoFuncionaSection";
import GaleriaSection from "@/components/sections/GaleriaSection";
import FogoneroSection from "@/components/sections/FogoneroSection";
import ArmaTuEventoSection from "@/components/sections/ArmaTuEventoSection";
import WhatsAppFab from "@/components/WhatsAppFab";
import EventoPill from "@/components/evento/EventoPill";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <PropuestaSection />
        <MenuSection />
        <ServicioSection />
        <ComoFuncionaSection />
        <FogoneroSection />
        <GaleriaSection />
        <ArmaTuEventoSection />
      </main>
      <Footer />
      <WhatsAppFab />
      <EventoPill />
    </div>
  );
};

export default Index;
