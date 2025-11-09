import { Link } from "react-router-dom";

export default function LoginForm() {
  return (
    <div className="login-form flex justify-between gap-[20px] mt-[20px] rounded-lg flex-1">
      <div className="hidden [@media(min-width:960px)]:block flex-1 overflow-hidden h-[600px]">
        <img
          src="./images/login_image.png"
          alt="Login Image"
          className="border rounded-lg w-full h-full object-cover"
          style={{ objectPosition: "0% 13%" }}
        />
      </div>

      <div className="flex-1 rounded-lg border-0 [@media(min-width:960px)]:border-2 [@media(min-width:960px)]:border-border-light flex items-center justify-center">
        <div className="rounded-lg w-full max-w-[500px] p-0 [@media(min-width:960px)]:p-[clamp(1.5rem,4vw,3rem)]">
          <h2 className="text-[clamp(24px,5vw,30px)] font-bold text-logo-heading">
            Welcome back!
          </h2>
          <p className="text-[clamp(13px,2vw,15px)] font-light text-light-text">
            Transform your mental health journey — one login at a time.
          </p>

          <div className="mt-[30px]">
            <div className="inputs flex flex-col gap-[10px]">
              <input
                type="text"
                placeholder="Email or Phone"
                className="border rounded-full px-[clamp(15px,3vw,20px)] py-[clamp(8px,2vw,10px)] text-[clamp(14px,2vw,16px)] bg-input-bg placeholder:text-input-placeholder w-full"
              />
              <input
                type="password"
                placeholder="Password"
                className="border rounded-full px-[clamp(15px,3vw,20px)] py-[clamp(8px,2vw,10px)] text-[clamp(14px,2vw,16px)] bg-input-bg placeholder:text-input-placeholder w-full"
              />
            </div>

            <p className="text-[clamp(13px,2vw,15px)] font-semibold text-light-text text-right mt-[10px]">
              Forgot password?
            </p>

            <button className="w-full bg-primary font-medium text-light-100 rounded-full px-[20px] py-[10px] mt-[30px] cursor-pointer text-[clamp(14px,2vw,16px)]">
              Login
            </button>

            <p className="text-[clamp(13px,2vw,15px)] text-light-text text-center mt-[10px]">
              Don't have an account?{" "}
              <Link to="/signup" className="font-bold cursor-pointer underline">
                Sign up it's free!
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
