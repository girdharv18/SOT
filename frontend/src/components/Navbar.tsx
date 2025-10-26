import { ChevronDown, Languages, Moon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import WeHelpWith from "./modals/WeHelpWith";

const textColor = "hsl(194,57%,17%)";

function NavbarItem({ text, link }: { text: string; link: string }) {
  return (
    <Link
      to={link}
      className="cursor-pointer text-light-text px-[15px] py-[5px] hover:bg-hover-bg rounded-full transition-colors duration-200"
    >
      {text}
    </Link>
  );
}

function NavbarItemIcon({
  text,
  icon,
  onClick,
  isActive = false,
}: {
  text: string;
  icon: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
}) {
  return (
    <div
      className={`px-[12px] py-[5px] flex items-center gap-[5px] rounded-full cursor-pointer hover:bg-hover-bg transition-colors duration-200 ${
        isActive ? "bg-hover-bg" : ""
      }`}
      onClick={onClick}
    >
      <p className="text-light-text">{text}</p>
      {icon}
    </div>
  );
}

export default function Navbar() {
  const [weHelpWithModalOpen, setWeHelpWithModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const navbarItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        navbarItemRef.current &&
        !navbarItemRef.current.contains(event.target as Node)
      ) {
        setWeHelpWithModalOpen(false);
      }
    }

    if (weHelpWithModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [weHelpWithModalOpen]);

  return (
    <div className="navbar max-w-[1350px] px-[25px] mx-auto flex justify-between items-center py-[20px]">
      <h1 className="text-[22px] font-semibold text-logo-heading cursor-pointer">
        MindCure
      </h1>

      <div className="flex items-center gap-[2px] text-[13px] relative">
        {weHelpWithModalOpen && <WeHelpWith modalRef={modalRef} />}

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
            onClick={() => setWeHelpWithModalOpen(!weHelpWithModalOpen)}
            isActive={weHelpWithModalOpen}
          />
        </div>
        <NavbarItem text="Self Assessment" link="/self-assessment" />
        <NavbarItem text="Mental Health Tools" link="/mental-health-tools" />
        <NavbarItem text="Find a therapist" link="/find-a-therapist" />
        <NavbarItem text="Find counsellors" link="/find-counsellors" />
        <NavbarItem text="Articles" link="/articles" />
      </div>

      {/* Logos */}
      <div className="flex items-center gap-2">
        <div className="p-[8px] bg-light-100 rounded-full cursor-pointer">
          <Languages size={20} color={textColor} />
        </div>

        <div className="p-[8px] bg-light-100 rounded-full cursor-pointer">
          <Moon size={20} color={textColor} />
        </div>

        <Link
          to="/login"
          className={`border border-border-light text-[${textColor}] transition-all duration-200 cursor-pointer rounded-full px-[20px] py-[6px] text-[15px] hover:bg-border-light hover:text-white`}
        >
          Login
        </Link>
      </div>
    </div>
  );
}
