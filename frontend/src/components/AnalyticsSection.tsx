import { useScreen } from "../context/ScreenContext";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function AnalyticsSectionCard({
  value,
  description,
  isHorizontal = false,
  animatedValue,
}: {
  value: string;
  description: string;
  isHorizontal?: boolean;
  animatedValue?: number;
}) {
  return (
    <div
      className={`border border-[#B5B5B5] bg-white rounded-[15px] ${
        isHorizontal ? "p-[15px]" : "p-[20px]"
      } ${isHorizontal ? "flex-1" : "min-w-[300px]"}`}
    >
      <h1
        className={`font-semibold ${
          isHorizontal ? "text-[28px]" : "text-[35px]"
        } text-[#323949] text-center`}
      >
        {animatedValue !== undefined
          ? animatedValue.toLocaleString() + "+"
          : value}
      </h1>
      <p
        className={`text-center ${
          isHorizontal ? "text-[14px]" : "text-[17px]"
        } text-light-text`}
      >
        {description}
      </p>
    </div>
  );
}

export default function AnalyticsSection() {
  const { t } = useTranslation("common");
  const { screenWidth } = useScreen();
  // const [professionalsCount, setProfessionalsCount] = useState("X");
  // const [livesCount, setLivesCount] = useState("Y");
  // const [toolsCount, setToolsCount] = useState("Z");

  // useEffect(() => {
  //   const duration = 2000; // 4 seconds
  //   const steps = 60; // 60 steps for smooth animation
  //   const stepDuration = duration / steps;

  //   // This should be fetched from the backend later
  //   const professionalsTarget = 120;
  //   const livesTarget = 50000;
  //   const toolsTarget = 15;

  //   let step = 0;
  //   const timer = setInterval(() => {
  //     step++;
  //     const progress = step / steps;

  //     setProfessionalsCount(Math.floor(professionalsTarget * progress));
  //     setLivesCount(Math.floor(livesTarget * progress));
  //     setToolsCount(Math.floor(toolsTarget * progress));

  //     if (step >= steps) {
  //       clearInterval(timer);
  //       setProfessionalsCount(professionalsTarget);
  //       setLivesCount(livesTarget);
  //       setToolsCount(toolsTarget);
  //     }
  //   }, stepDuration);

  //   return () => clearInterval(timer);
  // }, []);

  if (screenWidth <= 1170) {
    return (
      <div className="pt-[20px] pb-[70px] bg-light-100">
        <div
          className={`flex items-stretch gap-[15px] ${
            screenWidth <= 600 ? "flex-col" : ""
          }`}
        >
          <AnalyticsSectionCard
            value="X"
            description={t("certifiedPioneerProfessionals")}
            isHorizontal={true}
            // animatedValue={professionalsCount}
          />

          <AnalyticsSectionCard
            value="Y"
            description={t("livesTransformed")}
            isHorizontal={true}
            // animatedValue={livesCount}
          />

          <AnalyticsSectionCard
            value="Z"
            description={t("specializedTools")}
            isHorizontal={true}
            // animatedValue={toolsCount}
          />
        </div>
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="px-[20px] pt-[20px] pb-[70px] bg-light-100 flex justify-center items-center gap-[30px]">
      <AnalyticsSectionCard
        value="X"
        description={t("mentalHealthProfessionals")}
        // animatedValue={professionalsCount}
      />

      <AnalyticsSectionCard
        value="Y"
        description={t("livesTransformed")}
        // animatedValue={livesCount}
      />

      <AnalyticsSectionCard
        value="Z"
        description={t("specializedTools")}
        // animatedValue={toolsCount}
      />
    </div>
  );
}
