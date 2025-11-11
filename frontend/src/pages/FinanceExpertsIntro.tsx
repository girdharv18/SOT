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
    <div className="flex flex-col justify-between shadow-none hover:scale-[1.018] hover:shadow-[4px_4px_10px_rgba(0,0,0,0.28)] transition-all duration-150 cursor-pointer gap-[10px] border py-[15px] px-[20px] rounded-[10px] border-[#304048] w-full md:w-auto md:flex-1 h-full">
      <div>
        <h1 className="text-[20px] md:text-[25px] font-medium text-center">
          {title}
        </h1>
        <p className="text-[14px] md:text-base mt-[15px]">{description}</p>
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

export default function FinanceExpertsIntro() {
  const categories = [
    {
      title: "Investment Counsellors",
      description:
        "Build a solid investment strategy tailored to your goals. From mutual funds to long-term wealth creation, get expert advice that keeps your portfolio balanced and resilient.",
      link: "/finance-experts/investment-counsellors",
    },
    {
      title: "Financial Experts",
      description:
        "Navigate budgeting, savings, and insurance decisions effortlessly. Our advisors help you optimise cash flow and plan for milestones like education, housing, and retirement.",
      link: "/finance-experts/financial-experts",
    },
  ];

  return (
    <div className="max-w-[1350px] mx-auto px-[20px] mb-[40px]">
      <ResponsiveNavbar />

      <div className="h-[240px]">
        <img
          src="/images/finance/finance.jpg"
          alt="Financial planning illustration"
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
