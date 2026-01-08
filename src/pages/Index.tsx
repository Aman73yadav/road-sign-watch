import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import SignGallery from "@/components/SignGallery";
import RecognitionDemo from "@/components/RecognitionDemo";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <SignGallery />
        <RecognitionDemo />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
