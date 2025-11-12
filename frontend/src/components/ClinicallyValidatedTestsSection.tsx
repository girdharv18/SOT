import { useTranslation } from "react-i18next";

// Note: These will be translated in the component using translation keys
const CVTMockData = [
  {
    id: "1",
    titleKey: "cvt.trauma.title",
    descriptionKey: "cvt.trauma.description",
    cardColor: "#D53253",
    borderColor: "#EC4C6C",
    icon: "brain.png",
  },
  {
    id: "2",
    titleKey: "cvt.adhd.title",
    descriptionKey: "cvt.adhd.description",
    cardColor: "#FD6D9D",
    borderColor: "#FD6D9D",
    icon: "adhd.png",
  },
  {
    id: "3",
    titleKey: "cvt.anxiety.title",
    descriptionKey: "cvt.anxiety.description",
    cardColor: "#4671C6",
    borderColor: "#4671C6",
    icon: "anxiety.png",
  },
  {
    id: "4",
    titleKey: "cvt.mood.title",
    descriptionKey: "cvt.mood.description",
    cardColor: "#FFBC2C",
    borderColor: "#FFBC2C",
    icon: "smiley.png",
  },
  {
    id: "5",
    titleKey: "cvt.resilience.title",
    descriptionKey: "cvt.resilience.description",
    cardColor: "#83BEC7",
    borderColor: "#69A8B2",
    icon: "shield.png",
  },
  {
    id: "6",
    titleKey: "cvt.relationship.title",
    descriptionKey: "cvt.relationship.description",
    cardColor: "#D27FA1",
    borderColor: "#D686A8",
    icon: "heart.png",
  },
];

function ClinicallyValidatedTestsSectionCard({
  title,
  description,
  cardColor,
  borderColor,
  icon,
  takeAssessmentText,
}: {
  title: string;
  description: string;
  cardColor: string;
  borderColor: string;
  icon?: React.ReactNode;
  takeAssessmentText: string;
}) {
  return (
    <div
      className="flex justify-between flex-col border-1 p-[25px] relative rounded-[15px] mt-[40px] w-full md:max-w-[calc(50%-10px)] lg:max-w-[calc(33.333%-14px)]"
      style={{ borderColor: borderColor }}
    >
      <div>
        <div className="flex justify-center bg-white rounded-full absolute top-[-35px] left-[50%] translate-x-[-50%]">
          {icon}
        </div>
        <h2
          className="font-bold text-lg mt-[30px]"
          style={{ color: cardColor }}
        >
          {title}
        </h2>

        <p style={{ color: cardColor }}>{description}</p>
      </div>

      <button
        className="text-white px-7 cursor-pointer w-full mt-[25px] py-2 rounded-full whitespace-nowrap"
        style={{ backgroundColor: cardColor }}
      >
        {takeAssessmentText}
      </button>
    </div>
  );
}

export default function ClinicallyValidatedTestsSection() {
  const { t } = useTranslation(["common", "sectors"]);

  return (
    <div className="py-[50px] max-w-[1350px] mx-auto mt-[70px]">
      <h1 className="text-3xl font-bold text-center">
        {t("clinicallyValidatedTests", { ns: "common" })}
      </h1>

      <p className="text-[15px] mt-[10px] max-w-[800px] mx-auto text-center text-[#4F5B64]">
        {t("getAnswersUnder3Minutes", { ns: "common" })}
      </p>

      <div className="flex flex-wrap gap-[20px] mt-[60px]">
        {CVTMockData.map((test) => (
          <ClinicallyValidatedTestsSectionCard
            key={test.id}
            icon={
              <img
                src={`images/clinically-validated-tests/${test.icon}`}
                alt={t(test.titleKey, { ns: "sectors" })}
                className={`w-[70px]`}
              />
            }
            title={t(test.titleKey, { ns: "sectors" })}
            description={t(test.descriptionKey, { ns: "sectors" })}
            cardColor={test.cardColor}
            borderColor={test.borderColor}
            takeAssessmentText={t("takeAssessment", { ns: "common" })}
          />
        ))}
      </div>
    </div>
  );
}
