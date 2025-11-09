import { ChevronDown, Languages, Moon, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface MobileNavModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function MobileNavItem({
  text,
  onClick,
  to,
}: {
  text: string;
  onClick?: () => void;
  to?: string;
}) {
  return (
    <Link to={to || ""} onClick={onClick}>
      <div
        className="cursor-pointer text-light-text px-[25px] py-[12px] hover:bg-hover-bg rounded-full transition-colors duration-200 text-[16px]"
        onClick={onClick}
      >
        {text}
      </div>
    </Link>
  );
}

export default function MobileNavModal({
  isOpen,
  onClose,
}: MobileNavModalProps) {
  const [weHelpWithExpanded, setWeHelpWithExpanded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop with blur effect */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative h-full bg-white flex flex-col">
        {/* Header with close button */}
        <div className="flex justify-between items-center px-[25px] py-[20px] border-b border-gray-200 flex-shrink-0">
          <h1 className="text-[22px] font-semibold text-logo-heading">
            MindCurePath
          </h1>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Navigation items */}
        <div className="p-[20px] flex flex-col gap-[10px] overflow-y-auto flex-1">
          {/* We Help With - Expandable */}
          <div>
            <div
              className="flex items-center justify-between cursor-pointer px-[25px] py-[12px] hover:bg-hover-bg rounded-full transition-colors duration-200"
              onClick={() => setWeHelpWithExpanded(!weHelpWithExpanded)}
            >
              <span className="text-light-text text-[16px]">We help with</span>
              <ChevronDown
                size={15}
                className={`text-light-text transition-transform duration-200 ${
                  weHelpWithExpanded ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Nested list with animation */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                weHelpWithExpanded
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="pl-[30px] pt-[10px] flex flex-col gap-[8px]">
                <div className="px-[20px] py-[10px] text-[16px] rounded-[10px] cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                  Health
                </div>
                <div className="px-[20px] py-[10px] text-[16px] rounded-[10px] cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                  Education
                </div>
                <div className="px-[20px] py-[10px] text-[16px] rounded-[10px] cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                  Finance
                </div>
              </div>
            </div>
          </div>

          <MobileNavItem text="Self Assessment" to="/self-assessment" />
          <MobileNavItem text="Find counsellors" to="/find-counsellors" />
          <MobileNavItem text="Articles" to="/articles" />
        </div>

        {/* Bottom section with login and icons */}
        <div className="p-[20px] border-t border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-[8px] bg-light-100 rounded-full cursor-pointer">
                <Languages size={20} className="text-primary" />
              </div>
              <div className="p-[8px] bg-light-100 rounded-full cursor-pointer">
                <Moon size={20} className="text-primary" />
              </div>
            </div>

            <Link
              to="/login"
              className="border border-border-light text-primary transition-all duration-200 cursor-pointer rounded-full px-[20px] py-[8px] text-[15px] hover:bg-border-light hover:text-white"
              onClick={onClose}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
