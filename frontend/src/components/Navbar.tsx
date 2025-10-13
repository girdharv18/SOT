import { Languages, Moon } from "lucide-react";
import { Link } from "react-router-dom";

const textColor = "hsl(194,57%,17%)";

function NavbarItem({ text }: { text: string }) {
  return <p className="cursor-pointer text-light-text">{text}</p>;
}

export default function Navbar() {
  return (
    <div className="navbar max-w-[1350px] px-[25px] mx-auto flex justify-between items-center py-[20px]">
      <h1 className="text-2xl font-semibold text-logo-heading cursor-pointer">
        MindCure
      </h1>

      <div className="flex items-center gap-[25px] text-[14px]">
        <NavbarItem text="We help with" />
        <NavbarItem text="Self Assessment" />
        <NavbarItem text="Mental Health Tools" />
        <NavbarItem text="Find a therapist" />
        <NavbarItem text="Find counsellors" />
        <NavbarItem text="Articles" />
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
          className={`border border-border-light text-[${textColor}] transition cursor-pointer rounded-full px-[20px] py-[6px] text-[15px] hover:bg-border-light hover:text-white`}
        >
          Login
        </Link>
      </div>
    </div>
  );
}
