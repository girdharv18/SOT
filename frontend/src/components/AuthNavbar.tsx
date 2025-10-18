import { Languages, Moon } from "lucide-react";
import { Link } from "react-router-dom";

export default function AuthNavbar() {
  return (
    <div className="auth-navbar mx-auto flex justify-between items-center py-[20px]">
      <Link to="/">
        <h1 className="text-2xl font-semibold text-logo-heading">MindCure</h1>
      </Link>

      {/* Logos */}
      <div className="flex items-center gap-2">
        <div className="p-[8px] bg-light-100 rounded-full cursor-pointer">
          <Languages size={20} color="hsl(194, 57%, 17%)" />
        </div>

        <div className="p-[8px] bg-light-100 rounded-full cursor-pointer">
          <Moon size={20} color="hsl(194, 57%, 17%)" />
        </div>
      </div>
    </div>
  );
}
