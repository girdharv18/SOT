import { useState } from "react";
import { Menu } from "lucide-react";
import Navbar from "./Navbar";
import MobileNavModal from "./modals/MobileNavModal";
import { useScreen } from "../context/ScreenContext";

export default function ResponsiveNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { screenWidth } = useScreen();

  if (screenWidth <= 1140) {
    return (
      <>
        {/* Mobile Header */}
        <div className="navbar max-w-[1350px] px-[25px] mx-auto flex justify-between items-center py-[20px]">
          <h1 className="text-[22px] font-semibold text-logo-heading cursor-pointer">
            MindCurePath
          </h1>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-[8px] bg-light-100 rounded-full cursor-pointer"
          >
            <Menu size={20} className="text-primary" />
          </button>
        </div>

        {/* Mobile Navigation Modal */}
        <MobileNavModal
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </>
    );
  }

  // Desktop Navbar
  return <Navbar />;
}
