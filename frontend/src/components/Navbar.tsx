import { ChevronDown, Moon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import WeHelpWith from "./modals/WeHelpWith";
import LanguageSwitcher from "./LanguageSwitcher";

const textColor = "hsl(194,57%,17%)";

function NavbarItem({ textKey, link }: { textKey: string; link: string }) {
  const { t } = useTranslation("navigation");
  return (
    <Link
      to={link}
      className="cursor-pointer text-light-text px-[15px] py-[5px] hover:bg-hover-bg rounded-full transition-colors duration-200"
    >
      {t(textKey)}
    </Link>
  );
}

function NavbarItemIcon({
  textKey,
  icon,
  onClick,
  onMouseEnter,
  onMouseLeave,
  isActive = false,
}: {
  textKey: string;
  icon: React.ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isActive?: boolean;
}) {
  const { t } = useTranslation("navigation");
  return (
    <div
      className={`px-[12px] py-[5px] flex items-center gap-[5px] rounded-full cursor-pointer hover:bg-hover-bg transition-colors duration-200 ${
        isActive ? "bg-hover-bg" : ""
      }`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <p className="text-light-text">{t(textKey)}</p>
      {icon}
    </div>
  );
}

export default function Navbar() {
  const { t } = useTranslation("common");
  const [weHelpWithModalOpen, setWeHelpWithModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const navbarItemRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setWeHelpWithModalOpen(true);
  };

  const handleMouseLeave = () => {
    // Add a small delay before closing to allow moving to modal
    timeoutRef.current = setTimeout(() => {
      setWeHelpWithModalOpen(false);
    }, 100);
  };

  const handleModalMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleModalMouseLeave = () => {
    setWeHelpWithModalOpen(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="navbar max-w-[1350px] mx-auto flex justify-between items-center py-[20px]">
      <div className="flex items-center gap-[10px]">
        <img
          src="/images/navbar/logo.png"
          alt={t("appName") + " Logo"}
          className="w-[60px]"
        />
        <Link
          to="/"
          className="text-[22px] font-semibold text-logo-heading cursor-pointer"
        >
          {t("appName") === "MindCurePath" ? (
            <>
              Mind<span className="text-[#45c2c7]">Cure</span>Path
            </>
          ) : (
            t("appName")
          )}
        </Link>
      </div>

      <div className="flex items-center gap-[2px] text-[13px] relative">
        {weHelpWithModalOpen && (
          <div
            onMouseEnter={handleModalMouseEnter}
            onMouseLeave={handleModalMouseLeave}
          >
            <WeHelpWith modalRef={modalRef} navbarType="landing" />
          </div>
        )}

        <div ref={navbarItemRef}>
          <NavbarItemIcon
            textKey="weHelpWith"
            icon={
              <ChevronDown
                size={15}
                className={`text-light-text transition-transform duration-200 ${
                  weHelpWithModalOpen ? "rotate-180" : ""
                }`}
              />
            }
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            isActive={weHelpWithModalOpen}
          />
        </div>
        <NavbarItem textKey="selfAssessment" link="/self-assessment" />
        <NavbarItem textKey="findCounsellors" link="/find-counsellors" />
        <NavbarItem textKey="articles" link="/articles" />
      </div>

      {/* Logos */}
      <div className="flex items-center gap-2">
        <LanguageSwitcher />

        <div className="p-[8px] bg-light-100 rounded-full cursor-pointer">
          <Moon size={20} color={textColor} />
        </div>

        <Link
          to="/login"
          className={`border border-border-light text-[${textColor}] transition-all duration-200 cursor-pointer rounded-full px-[20px] py-[6px] text-[15px] hover:bg-border-light hover:text-white`}
        >
          {t("login")}
        </Link>
      </div>
    </div>
  );
}
