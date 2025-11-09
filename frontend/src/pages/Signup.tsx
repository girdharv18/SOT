import AuthNavbar from "../components/AuthNavbar";
import SignupForm from "../components/SignupForm";

export default function Signup() {
  return (
    <div className="signup-page max-w-[1350px] mx-auto px-[25px] h-[calc(100svh-76px)] flex flex-col">
      <AuthNavbar />

      <SignupForm />
    </div>
  );
}
