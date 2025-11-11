import { ChevronDown, Languages, Moon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import WeHelpWith from "./modals/WeHelpWith";

function NavbarItem({ text, link }: { text: string; link: string }) {
  return (
    <Link
      to={link}
      className="cursor-pointer text-light-text py-[5px] hover:bg-hover-bg rounded-full transition-colors duration-200"
    >
      {text}
    </Link>
  );
}

function NavbarItemIcon({
  text,
  icon,
  onClick,
  onMouseEnter,
  onMouseLeave,
  isActive = false,
}: {
  text: string;
  icon: React.ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isActive?: boolean;
}) {
  return (
    <div
      className={`py-[5px] flex items-center gap-[5px] rounded-full cursor-pointer hover:bg-hover-bg transition-colors duration-200 ${
        isActive ? "bg-hover-bg" : ""
      }`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <p className="text-light-text">{text}</p>
      {icon}
    </div>
  );
}

export default function ExpertsNavbar() {
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
    <div className="navbar max-w-[1350px] mx-auto py-[20px]">
      <div className="flex justify-between items-center">
        <Link
          to="/"
          className="text-[22px] font-semibold text-logo-heading cursor-pointer"
        >
          MindCurePath
        </Link>

        <div className="flex items-center gap-[40px] text-[13px] relative">
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
              text="We help with"
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
          <NavbarItem text="Self Assessment" link="/self-assessment" />
          <NavbarItem text="Find counsellors" link="/find-counsellors" />
          <NavbarItem text="Articles" link="/articles" />
        </div>
      </div>
    </div>
  );
}
