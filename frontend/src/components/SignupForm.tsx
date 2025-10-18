import { Link } from "react-router-dom";

export default function SignupForm() {
  return (
    <div className="login-form flex justify-between gap-[20px] mt-[20px] rounded-lg">
      <div className="flex-1 overflow-hidden h-[600px]">
        <img
          src="./images/login_image.png"
          alt="Login Image"
          className="border rounded-lg w-full h-full object-cover"
          style={{ objectPosition: "0% 13%" }}
        />
      </div>

      <div className="flex-1 rounded-lg border-2 border-border-light flex items-center justify-center">
        <div className="rounded-lg min-w-[500px] p-[clamp(1rem,4.1vw,3rem)]">
          <h2 className="text-3xl font-bold text-logo-heading">
            Create an account
          </h2>
          <p className="text-[15px] font-light text-light-text">
            Start your healing journey — your story begins here.
          </p>

          <div className="mt-[30px]">
            <div className="inputs flex flex-col gap-[10px]">
              <input
                type="text"
                placeholder="Full name"
                className="border rounded-full px-[20px] py-[10px] bg-input-bg placeholder:text-input-placeholder w-full"
              />
              <input
                type="text"
                placeholder="Email"
                className="border rounded-full px-[20px] py-[10px] bg-input-bg placeholder:text-input-placeholder w-full"
              />
              <input
                type="password"
                placeholder="Password"
                className="border rounded-full px-[20px] py-[10px] bg-input-bg placeholder:text-input-placeholder w-full"
              />
              <input
                type="text"
                placeholder="Phone No."
                className="border rounded-full px-[20px] py-[10px] bg-input-bg placeholder:text-input-placeholder w-full"
              />
            </div>

            <p className="text-[15px] font-semibold text-light-text text-right mt-[10px]">
              Forgot password?
            </p>

            <button className="w-full bg-primary font-medium text-light-100 rounded-full px-[20px] py-[10px] mt-[30px] cursor-pointer">
              Create account
            </button>

            <p className="text-[15px] text-light-text text-center mt-[10px]">
              Already have an account?{" "}
              <Link to="/login" className="font-bold cursor-pointer underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
