import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Languages as LanguagesIcon, ChevronDown, Check } from "lucide-react";

const availableLanguages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "as", name: "Assamese", nativeName: "অসমীয়া" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage =
    availableLanguages.find((lang) => lang.code === i18n.language) ||
    availableLanguages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-[8px] bg-light-100 rounded-full cursor-pointer hover:bg-light-200 transition-colors flex items-center gap-[5px]"
        aria-label="Change language"
      >
        <LanguagesIcon size={20} className="text-[#304048]" />
        <ChevronDown
          size={14}
          className={`text-[#304048] transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-[45px] right-0 bg-white rounded-[10px] shadow-lg border border-gray-200 min-w-[200px] z-50 max-h-[300px] overflow-y-auto">
          <div className="py-[5px]">
            {availableLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full text-left px-[15px] py-[10px] hover:bg-gray-100 transition-colors flex items-center justify-between ${
                  i18n.language === lang.code ? "bg-gray-50" : ""
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-[#304048]">
                    {lang.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {lang.nativeName}
                  </span>
                </div>
                {i18n.language === lang.code && (
                  <Check size={16} className="text-[#304048]" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
