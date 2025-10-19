import AnalyticsSection from "../components/AnalyticsSection";
import ClinicallyValidatedTestsSection from "../components/ClinicallyValidatedTestsSection";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";

export default function UserDashboard() {
  return (
    <div className="landing-page">
      <Navbar />
      <HeroSection />
      <AnalyticsSection />
      <ClinicallyValidatedTestsSection />
    </div>
  );
}
