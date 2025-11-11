import { Link } from "react-router-dom";
import ResponsiveNavbar from "../components/ResponsiveNavbar";

interface ExpertCategoryCardProps {
  title: string;
  description: string;
  link: string;
}

function ExpertCategoryCard({
  title,
  description,
  link,
}: ExpertCategoryCardProps) {
  return (
    <div className="flex flex-col justify-between shadow-none hover:scale-[1.018] hover:shadow-[4px_4px_10px_rgba(0,0,0,0.28)] transition-all duration-150 cursor-pointer gap-[10px] border py-[15px] px-[20px] rounded-[10px] border-[#9ba5ab] w-full md:w-auto md:flex-1 h-full">
      <div>
        <h1 className="text-[20px] md:text-[25px] font-medium text-center text-[#374750]">
          {title}
        </h1>
        <p className="text-[14px] md:text-base mt-[15px] text-[#3d4950]">
          {description}
        </p>
      </div>

      <Link
        to={link}
        className="flex items-center justify-center mt-[20px] bg-[#304048] hover:bg-[#304048]/90 transition-colors duration-150 cursor-pointer text-white rounded-[30px] py-[7px] px-[20px] text-sm md:text-base"
      >
        Explore
      </Link>
    </div>
  );
}

export default function HealthExpertsIntro() {
  const categories = [
    {
      title: "Therapists",
      description:
        "We offer a safe, confidential space to explore challenges, foster insight, and build resilience. Begin your journey toward healing and lasting personal growth with compassionate, evidence-based support.",
      link: "/health-experts/therapists",
    },
    {
      title: "Yoga Experts",
      description:
        "As your Yoga Expert, I guide you through practices that harmonize mind, body, and spirit. Achieve greater flexibility, reduce stress, and cultivate inner peace through personalized instruction and mindful movement.",
      link: "/health-experts/yoga-experts",
    },
    {
      title: "Dieticians",
      description:
        "As a Registered Dietitian, I translate complex nutrition science into personalized, sustainable eating plans. Achieve your health goals—whether managing a condition or improving well-being—without restrictive dieting.",
      link: "/health-experts/dieticians",
    },
  ];

  return (
    <div className="max-w-[1350px] mx-auto px-[20px] mb-[40px]">
      <ResponsiveNavbar />

      <div className="h-[240px]">
        <img
          src="/images/health/health.jpg"
          alt=""
          className="w-full h-full object-cover rounded-[30px]"
        />
      </div>

      <div className="categories mt-[40px] flex flex-col md:flex-row items-stretch md:justify-between gap-[20px]">
        {categories.map((category) => (
          <ExpertCategoryCard
            key={category.title}
            title={category.title}
            description={category.description}
            link={category.link}
          />
        ))}
      </div>
    </div>
  );
}
