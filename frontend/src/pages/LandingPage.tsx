import AnalyticsSection from "../components/AnalyticsSection";
import ClinicallyValidatedTestsSection from "../components/ClinicallyValidatedTestsSection";
import HeroSection from "../components/HeroSection";
import ResponsiveNavbar from "../components/ResponsiveNavbar";

export default function UserDashboard() {
  return (
    <div className="landing-page">
      <ResponsiveNavbar />
      <HeroSection />
      <AnalyticsSection />
      <ClinicallyValidatedTestsSection />
    </div>
  );
}
