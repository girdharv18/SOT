import { HandHeart, UserStar } from "lucide-react";
import { useScreen } from "../context/ScreenContext";
import { Link } from "react-router-dom";

function HeroSectionCard({
  title,
  description,
  className,
  icon,
  isHorizontal = false,
}: {
  title: string;
  description: string;
  className?: string;
  icon?: React.ReactNode;
  isHorizontal?: boolean;
}) {
  return (
    <div
      className={`shadow-drop-shadow flex flex-col gap-[8px] ${
        isHorizontal ? "" : "w-[274px]"
      } rounded-[15px] ${
        isHorizontal ? "py-[20px] px-[15px]" : "py-[25px] px-[25px]"
      } ${isHorizontal ? "relative" : "absolute"} ${className}`}
    >
      <div className="flex justify-center">{icon}</div>
      <div className={isHorizontal ? "text-center" : ""}>
        <h3
          className={`${
            isHorizontal ? "text-[16px]" : "text-[18px]"
          } font-medium`}
        >
          {title}
        </h3>
        <p
          className={`${isHorizontal ? "text-[12px]" : "text-[14px]"} mt-[5px]`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

function HeroSectionContent() {
  const { screenWidth } = useScreen();

  return (
    <div className="flex-1">
      <h1 className="font-bold text-[45px] leading-none text-hero-heading">
        Transform Your Mental Health Journey
      </h1>

      <p className="font-light text-[15px] mt-[20px] text-[hsl(194,19%,18%)]">
        Therapy is like cleaning that messy drawer. You keep what matters and
        let go of what doesn't. We make therapy work for you with our
        specialized professionals.
      </p>

      <div
        className={`flex mt-[30px] ${
          screenWidth <= 500 ? "flex-col gap-[10px]" : "gap-[20px]"
        }`}
      >
        <Link
          to="/login"
          className="border-none bg-[hsl(189,62%,25%)] cursor-pointer text-white text-center rounded-[15px] px-[25px] py-[10px] hover:bg-[hsl(189,62%,30%)] transition shadow-drop-shadow hover:translate-y-[-2px]"
        >
          Start your journey
        </Link>

        <div className="border border-[hsl(189,62%,25%)] cursor-pointer text-center rounded-[15px] px-[25px] py-[10px] hover:translate-y-[-2px] text-[hsl(189,62%,25%)] transition hover:shadow-drop-shadow">
          Take Assessment
        </div>
      </div>
    </div>
  );
}

function HeroSectionFloatingCards() {
  return (
    <div className="flex-1 relative">
      <HeroSectionCard
        icon={<HandHeart size={70} className="m-auto mb-[10px]" />}
        title="Personalized Care"
        description="Tailored to your unique needs"
        className="bg-[hsl(0,0%,98%,70%)] top-[-80px] right-[250px] z-2 text-hero-heading animate-float-1"
      />

      <HeroSectionCard
        icon={<UserStar size={70} className="m-auto mb-[10px]" />}
        title="Expert Support"
        description="Connect with licensed professionals"
        className="bg-[hsl(0,0%,98%,60%)] top-[140px] right-[285px] text-hero-heading z-1 animate-float-2"
      />

      <HeroSectionCard
        icon={
          <img
            src="./images/healing.png"
            alt="Emotional Healing"
            className="w-[70px] m-auto mb-[10px]"
          />
        }
        title="Emotional Healing"
        description="Find peace and emotional balance"
        className="bg-[hsl(194,19%,18%)] top-[50px] right-[0px] text-white z-1 animate-float-3"
      />

      <div className="absolute top-[129px] right-[280px] w-[10px] h-[10px] bg-[hsl(194,7%,64%)] shadow-background-light"></div>
    </div>
  );
}

function HeroSectionHorizontalCards() {
  const { screenWidth } = useScreen();

  return (
    <div
      className={`flex items-stretch gap-[15px] mt-[4rem] mb-[70px] ${
        screenWidth <= 500 ? "flex-col" : ""
      }`}
    >
      <HeroSectionCard
        icon={<HandHeart size={50} className="m-auto mb-[6px]" />}
        title="Personalized Care"
        description="Tailored to your unique needs"
        className="bg-[hsl(0,0%,98%,70%)] text-hero-heading flex-1"
        isHorizontal={true}
      />

      <HeroSectionCard
        icon={<UserStar size={50} className="m-auto mb-[6px]" />}
        title="Expert Support"
        description="Connect with licensed professionals"
        className="bg-[hsl(0,0%,98%,60%)] text-hero-heading flex-1"
        isHorizontal={true}
      />

      <HeroSectionCard
        icon={
          <img
            src="./images/healing.png"
            alt="Emotional Healing"
            className="w-[50px] m-auto mb-[6px]"
          />
        }
        title="Emotional Healing"
        description="Find peace and emotional balance"
        className="bg-[hsl(194,19%,18%)] text-white flex-1"
        isHorizontal={true}
      />
    </div>
  );
}

export default function HeroSection() {
  const { screenWidth } = useScreen();

  if (screenWidth <= 1170) {
    return (
      <div className="max-w-[1350px] mx-auto px-[25px] mt-[4rem]">
        {/* Content */}
        <HeroSectionContent />

        {/* Horizontal Cards */}
        <HeroSectionHorizontalCards />
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="flex max-w-[1350px] mx-auto px-[25px] justify-between mt-[11rem] min-h-[480px]">
      {/* Left Div */}
      <HeroSectionContent />

      {/* Right Div */}
      <HeroSectionFloatingCards />
    </div>
  );
}
