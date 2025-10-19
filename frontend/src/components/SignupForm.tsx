import { useState } from "react";
import { Link } from "react-router-dom";
import type { Role } from "../lib/interfaces";

export default function SignupForm() {
  const [role, setRole] = useState<Role>("user");

  function handleRoleChange() {
    if (role == "user") {
      setRole("therapist");
      return;
    }

    if (role == "therapist") {
      setRole("user");
      return;
    }
  }

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
            {/* Choosing your role while signing up */}
            <h2 className="font-semibold text-primary mb-[5px]">Your role</h2>
            <div className="roles flex items-center justify-between mb-[10px] gap-[10px]">
              <div
                className={`user ${
                  role == "user" ? "bg-role-bg text-white" : "bg-input-bg"
                } flex-1 py-[10px] text-center rounded-[30px] cursor-pointer`}
                onClick={handleRoleChange}
              >
                User
              </div>
              <div
                className={`therapist ${
                  role == "therapist" ? "bg-role-bg text-white" : "bg-input-bg"
                } flex-1 py-[10px] text-center rounded-[30px] cursor-pointer`}
                onClick={handleRoleChange}
              >
                Therapist
              </div>
            </div>

            <div className="inputs flex flex-col gap-[10px]">
              <input
                type="text"
                placeholder="Full name"
                className={`border border-border-light rounded-full px-[20px] py-[10px] bg-input-bg placeholder:text-input-placeholder w-full`}
              />
              <input
                type="text"
                placeholder="Email"
                className={`border border-border-light rounded-full px-[20px] py-[10px] bg-input-bg placeholder:text-input-placeholder w-full`}
              />
              <input
                type="password"
                placeholder="Password"
                className={`border border-border-light rounded-full px-[20px] py-[10px] bg-input-bg placeholder:text-input-placeholder w-full`}
              />
              <input
                type="text"
                placeholder="Phone No."
                className={`border border-border-light rounded-full px-[20px] py-[10px] bg-input-bg placeholder:text-input-placeholder w-full`}
              />
            </div>

            <p className="text-[15px] font-semibold text-light-text text-right mt-[10px]">
              Forgot password?
            </p>

            <button className="w-full bg-create-account-btn-bg font-medium text-light-100 rounded-full px-[20px] py-[10px] mt-[30px] cursor-pointer">
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
