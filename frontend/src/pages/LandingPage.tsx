import AnalyticsSection from "../components/AnalyticsSection";
import ClinicallyValidatedTestsSection from "../components/ClinicallyValidatedTestsSection";
import HeroSection from "../components/HeroSection";
import ResponsiveNavbar from "../components/ResponsiveNavbar";
import WhyChooseUsSection from "../components/WhyChooseUsSection";
import WhatOurUsersSay from "../components/WhatOurUsersSay";
import HowDoesItWork from "../components/HowDoesItWork";
import Footer from "../components/Footer";
import ExpertVerifiedAssessmentsSection from "../components/ExpertVerifiedAssessmentsSection";

export default function UserDashboard() {
  return (
    <div className="landing-page px-[20px]">
      <ResponsiveNavbar />
      <HeroSection />
      <AnalyticsSection />
      <ExpertVerifiedAssessmentsSection />
      <ClinicallyValidatedTestsSection />
      <WhyChooseUsSection />
      <HowDoesItWork />
      <WhatOurUsersSay />
      <Footer />
    </div>
  );
}
