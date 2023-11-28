import Footer from "./_components/Footer";
import CTASection from "./_components/_LandingPageComponents/CTASection";
import FeaturesSection from "./_components/_LandingPageComponents/FeaturesSection";
import HeroSection from "./_components/_LandingPageComponents/HeroSection";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
          <HeroSection />
          <FeaturesSection />
          <CTASection />
      </div>
    </div>
  );
};

export default Home;
