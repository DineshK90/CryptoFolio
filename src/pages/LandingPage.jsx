import LandingNav from "../../components/landing/LandingNav";
import HeroSection from "../../components/landing/HeroSection";
import FeaturesSection from "../../components/landing/FeaturesSection";
import HowItWorks from "../../components/landing/HowItWorks";
import CTASection from "../../components/landing/CTASection";
import Footer from "../../components/landing/Footer";

export default function LandingPage() {
  return (
    <>
      <LandingNav />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <CTASection />
      <Footer />
    </>
  );
}
