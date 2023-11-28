import Footer from "./_components/Footer";
import CTASection from "./_components/_LandingPageComponents/CTASection";
import FeaturesSection from "./_components/_LandingPageComponents/FeaturesSection";
import HeroSection from "./_components/_LandingPageComponents/HeroSection";
import LandPageNavBar from "./_components/_LandingPageComponents/LandPageNavBar";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
          <LandPageNavBar />
          <HeroSection />
          <FeaturesSection />
          <CTASection />
      </div>
      
      
      <Footer />
    </div>
  );
};

export default Home;
