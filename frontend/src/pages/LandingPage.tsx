import AnalyticsSection from "../components/AnalyticsSection";
import ClinicallyValidatedTestsSection from "../components/ClinicallyValidatedTestsSection";
import HeroSection from "../components/HeroSection";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import WhyChooseUsSection from "../components/WhyChooseUsSection";
import WhatOurUsersSay from "../components/WhatOurUsersSay";
import HowDoesItWork from "../components/HowDoesItWork";
import Footer from "../components/Footer";

export default function UserDashboard() {
  return (
    <div className="landing-page">
      <ResponsiveNavbar />
      <HeroSection />
      <AnalyticsSection />
      <ClinicallyValidatedTestsSection />
      <WhyChooseUsSection />
      <HowDoesItWork />
      <WhatOurUsersSay />
      <Footer />
    </div>
  );
}
