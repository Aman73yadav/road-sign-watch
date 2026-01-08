import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import RecognitionDemo from "@/components/RecognitionDemo";
import SignDatabase from "@/components/SignDatabase";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <RecognitionDemo />
        <SignDatabase />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
