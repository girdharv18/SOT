import LoginForm from "../components/LoginForm";
import AuthNavbar from "../components/AuthNavbar";

export default function Login() {
  return (
    <div className="login-page max-w-[1350px] mx-auto px-[25px]">
      <AuthNavbar />

      <LoginForm />
    </div>
  );
}
