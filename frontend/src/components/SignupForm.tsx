import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { Role } from "../lib/interfaces";

export default function SignupForm() {
  const { t } = useTranslation("common");
  const [role, setRole] = useState<Role>("user");
  const formContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const matchHeights = () => {
      if (formContainerRef.current && imageContainerRef.current) {
        imageContainerRef.current.style.height = `${formContainerRef.current.offsetHeight}px`;
      }
    };

    // Use setTimeout to ensure DOM is fully rendered
    setTimeout(matchHeights, 0);

    window.addEventListener("resize", matchHeights);

    // Use ResizeObserver to watch for content changes
    const formContainer = formContainerRef.current;
    const resizeObserver = formContainer
      ? new ResizeObserver(matchHeights)
      : null;

    if (resizeObserver && formContainer) {
      resizeObserver.observe(formContainer);
    }

    return () => {
      window.removeEventListener("resize", matchHeights);
      if (resizeObserver && formContainer) {
        resizeObserver.unobserve(formContainer);
      }
    };
  }, [role]);

  function handleRoleChange() {
    if (role == "user") {
      setRole("expert");
      return;
    }

    if (role == "expert") {
      setRole("user");
      return;
    }
  }

  return (
    <div className="login-form flex justify-between items-start gap-[20px] mt-[20px] rounded-lg flex-1">
      <div
        ref={imageContainerRef}
        className="hidden [@media(min-width:960px)]:block flex-1 overflow-hidden"
      >
        <img
          src="./images/login_image.png"
          alt="Login Image"
          className="border rounded-lg w-full h-full object-cover"
          style={{ objectPosition: "0% 13%" }}
        />
      </div>

      <div
        ref={formContainerRef}
        className="flex-1 rounded-lg border-0 [@media(min-width:960px)]:border-2 [@media(min-width:960px)]:border-border-light flex justify-center"
      >
        <div className="rounded-lg max-w-[500px] pt-[30px] px-0 pb-0 [@media(min-width:960px)]:p-[clamp(1.5rem,4vw,3rem)]">
          <h2 className="text-[clamp(24px,5vw,30px)] font-bold text-logo-heading">
            {t("createAccount")}
          </h2>
          <p className="text-[clamp(13px,2vw,15px)] font-light text-light-text">
            {t("startHealingJourney")}
          </p>

          <div className="mt-[30px]">
            {/* Choosing your role while signing up */}
            <h2 className="font-semibold text-primary mb-[5px] text-[clamp(14px,2vw,16px)]">
              {t("yourRole")}
            </h2>
            <div className="roles flex items-center justify-between mb-[10px] gap-[10px]">
              <div
                className={`user ${
                  role == "user" ? "bg-role-bg text-white" : "bg-input-bg"
                } flex-1 py-[10px] text-center rounded-[30px] cursor-pointer text-[clamp(14px,2vw,16px)]`}
                onClick={handleRoleChange}
              >
                {t("user")}
              </div>
              <div
                className={`expert ${
                  role == "expert" ? "bg-role-bg text-white" : "bg-input-bg"
                } flex-1 py-[10px] text-center rounded-[30px] cursor-pointer text-[clamp(14px,2vw,16px)]`}
                onClick={handleRoleChange}
              >
                {t("expert")}
              </div>
            </div>

            <div className="inputs flex flex-col gap-[10px]">
              <input
                type="text"
                placeholder={t("fullName")}
                className={`border border-border-light rounded-full px-[clamp(15px,3vw,20px)] py-[clamp(8px,2vw,10px)] text-[clamp(14px,2vw,16px)] bg-input-bg placeholder:text-input-placeholder w-full`}
              />
              <input
                type="text"
                placeholder={t("email")}
                className={`border border-border-light rounded-full px-[clamp(15px,3vw,20px)] py-[clamp(8px,2vw,10px)] text-[clamp(14px,2vw,16px)] bg-input-bg placeholder:text-input-placeholder w-full`}
              />
              <input
                type="password"
                placeholder={t("password")}
                className={`border border-border-light rounded-full px-[clamp(15px,3vw,20px)] py-[clamp(8px,2vw,10px)] text-[clamp(14px,2vw,16px)] bg-input-bg placeholder:text-input-placeholder w-full`}
              />
              <input
                type="text"
                placeholder={t("phoneNo")}
                className={`border border-border-light rounded-full px-[clamp(15px,3vw,20px)] py-[clamp(8px,2vw,10px)] text-[clamp(14px,2vw,16px)] bg-input-bg placeholder:text-input-placeholder w-full`}
              />
            </div>

            <p className="text-[clamp(13px,2vw,15px)] font-semibold text-light-text text-right mt-[10px]">
              {t("forgotPassword")}
            </p>

            <button className="w-full bg-create-account-btn-bg font-medium text-light-100 rounded-full px-[20px] py-[10px] mt-[30px] cursor-pointer text-[clamp(14px,2vw,16px)]">
              {t("createAccount")}
            </button>

            <p className="text-[clamp(13px,2vw,15px)] text-light-text text-center mt-[10px]">
              {t("alreadyHaveAccount")}{" "}
              <Link to="/login" className="font-bold cursor-pointer underline">
                {t("login")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
