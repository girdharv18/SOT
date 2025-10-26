import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ScreenProvider } from "./context/ScreenContext";
import SelfAssessment from "./pages/SelfAssessment";
import SelfAssessmentQuestions from "./pages/SelfAssessmentQuestions";
import SelfAssessmentResult from "./pages/SelfAssessmentResult";

export default function App() {
  return (
    <ScreenProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/self-assessment" element={<SelfAssessment />} />
        <Route
          path="/self-assessment/questions"
          element={<SelfAssessmentQuestions />}
        />
        <Route
          path="/self-assessment/result"
          element={<SelfAssessmentResult />}
        />
      </Routes>
    </ScreenProvider>
  );
}
