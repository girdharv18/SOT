import { Link } from "react-router-dom";
import { useState } from "react";
import { EXPERT_CATEGORIES } from "../../lib/constants";

interface WeHelpWithProps {
  modalRef: React.RefObject<HTMLDivElement | null>;
  navbarType: "landing" | "experts";
}

export default function WeHelpWith({
  modalRef,
  navbarType = "experts",
}: WeHelpWithProps) {
  const [hoveredExpert, setHoveredExpert] = useState<
    "health" | "education" | "finance"
  >("health");

  const getCategories = () => {
    if (!hoveredExpert) return [];
    return EXPERT_CATEGORIES[hoveredExpert];
  };

  const getCategoryRoute = (category: string, expertType: string) => {
    const baseRoute = `/${expertType}-experts`;
    const categorySlug = category.toLowerCase().replace(/\s+/g, "-");
    return `${baseRoute}/${categorySlug}`;
  };

  return (
    <div
      ref={modalRef}
      className={`absolute top-[50px] ${
        navbarType === "landing" && "left-[50%] -translate-x-1/2 min-w-[570px]"
      } ${
        navbarType === "experts" && "left-[50px] w-full"
      } flex items-stretch justify-between gap-[20px] bg-navbar-dropdown-bg z-20 rounded-[10px] p-[10px]`}
    >
      <div className="flex flex-col text-white gap-[10px] flex-2">
        <Link
          to="/health-experts"
          className={`transition-all px-[15px] py-[7px] text-[14px] rounded-[10px] cursor-pointer hover:scale-[1.05] ${
            hoveredExpert === "health"
              ? "bg-white text-navbar-dropdown-bg"
              : "hover:bg-white hover:text-navbar-dropdown-bg"
          }`}
          onMouseEnter={() => setHoveredExpert("health")}
        >
          Health Experts
        </Link>
        <Link
          to="/education-experts"
          className={`transition-all px-[15px] py-[7px] text-[14px] rounded-[10px] cursor-pointer hover:scale-[1.05] ${
            hoveredExpert === "education"
              ? "bg-white text-navbar-dropdown-bg"
              : "hover:bg-white hover:text-navbar-dropdown-bg"
          }`}
          onMouseEnter={() => setHoveredExpert("education")}
        >
          Education Experts
        </Link>
        <Link
          to="/finance-experts"
          className={`transition-all px-[15px] py-[7px] text-[14px] rounded-[10px] cursor-pointer hover:scale-[1.05] ${
            hoveredExpert === "finance"
              ? "bg-white text-navbar-dropdown-bg"
              : "hover:bg-white hover:text-navbar-dropdown-bg"
          }`}
          onMouseEnter={() => setHoveredExpert("finance")}
        >
          Finance Experts
        </Link>
      </div>

      <div className="flex-3 w-full bg-navbar-dropdown-right-outer-bg border border-navbar-dropdown-right-outer text-white p-[5px] rounded-[10px] flex">
        {hoveredExpert ? (
          <div className="grid grid-cols-2 gap-[5px] w-full h-full">
            {getCategories().map((category, index) => {
              const isMultiLine = category.length > 18;
              const categoryRoute = getCategoryRoute(category, hoveredExpert);

              return (
                <Link
                  key={index}
                  to={categoryRoute}
                  className={`group bg-navbar-dropdown-bg rounded-[10px] p-[15px] flex items-center justify-center text-center hover:bg-white hover:text-navbar-dropdown-bg transition-all cursor-pointer ${
                    isMultiLine ? "col-span-2" : ""
                  }`}
                >
                  <span className="text-[13px] inline-block group-hover:scale-[1.3] transition-all">
                    {category}
                  </span>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="w-full flex items-center justify-center text-gray-400">
            Hover over an expert category
          </div>
        )}
      </div>
    </div>
  );
}
