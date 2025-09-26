import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PolaroidMemories from "@/components/PolaroidMemories";
import EventsSection from "@/components/EventsSection";
import Footer from "@/components/Footer";

const Index = () => {
  const { memoryId } = useParams();

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <PolaroidMemories sharedMemoryId={memoryId} />
      <EventsSection />
      <Footer />
    </main>
  );
};

export default Index;
