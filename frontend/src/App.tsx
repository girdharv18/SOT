import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ScreenProvider } from "./context/ScreenContext";
import SelfAssessment from "./pages/SelfAssessment";
import SelfAssessmentQuestions from "./pages/SelfAssessmentQuestions";
import SelfAssessmentResult from "./pages/SelfAssessmentResult";
import HealthExpertsIntro from "./pages/HealthExpertsIntro";
import EducationExpertsIntro from "./pages/EducationExpertsIntro";
import FinanceExpertsIntro from "./pages/FinanceExpertsIntro";
import Experts from "./pages/Experts";

export default function App() {
  return (
    <ScreenProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Self Assessment */}
        <Route path="/self-assessment" element={<SelfAssessment />} />
        <Route
          path="/self-assessment/questions"
          element={<SelfAssessmentQuestions />}
        />
        <Route
          path="/self-assessment/result"
          element={<SelfAssessmentResult />}
        />

        {/* Health Experts */}
        <Route path="/health-experts" element={<HealthExpertsIntro />} />
        <Route path="/health-experts/therapists" element={<Experts />} />
        <Route path="/health-experts/yoga-experts" element={<Experts />} />
        <Route path="/health-experts/dieticians" element={<Experts />} />

        {/* Education Experts */}
        <Route path="/education-experts" element={<EducationExpertsIntro />} />
        <Route
          path="/education-experts/academic-counsellors"
          element={<Experts />}
        />
        <Route path="/education-experts/achievers" element={<Experts />} />

        {/* Finance Experts */}
        <Route path="/finance-experts" element={<FinanceExpertsIntro />} />
        <Route
          path="/finance-experts/investment-counsellors"
          element={<Experts />}
        />
        <Route
          path="/finance-experts/financial-experts"
          element={<Experts />}
        />
      </Routes>
    </ScreenProvider>
  );
}
