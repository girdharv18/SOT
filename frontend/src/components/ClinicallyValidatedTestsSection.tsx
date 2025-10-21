const CVTMockData = [
  {
    id: "1",
    title: "How has trauma impacted me?",
    description:
      "Understand the effects of past experiences on your current well-being",
    cardColor: "#D53253",
    borderColor: "#EC4C6C",
    icon: "brain.png",
  },
  {
    id: "2",
    title: "Do I have ADHD?",
    description:
      "Find out if you may have attention deficit hyperactivity disorder (ADHD)",
    cardColor: "#FD6D9D",
    borderColor: "#FD6D9D",
    icon: "adhd.png",
  },
  {
    id: "3",
    title: "What is my anxiety level?",
    description:
      "Find out your current level of anxiety and get a report to guide your next steps.",
    cardColor: "#4671C6",
    borderColor: "#4671C6",
    icon: "anxiety.png",
  },
  {
    id: "4",
    title: "Is it just bad mood or more?",
    description: "Discover if your mood issues are more than just a bad day",
    cardColor: "#FFBC2C",
    borderColor: "#FFBC2C",
    icon: "smiley.png",
  },
  {
    id: "5",
    title: "How resilient am I?",
    description: "Discover how resilient you are to stress and adversity",
    cardColor: "#83BEC7",
    borderColor: "#69A8B2",
    icon: "shield.png",
  },
  {
    id: "6",
    title: "Relationship Health Check",
    description:
      "Check your relationship health and get a report to guide your next steps.",
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
}: {
  title: string;
  description: string;
  cardColor: string;
  borderColor: string;
  icon?: React.ReactNode;
}) {
  return (
    <div
      className="flex justify-between flex-col flex-1 border-2 p-[25px] relative rounded-[15px] mt-[40px]"
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
        Take Assessment
      </button>
    </div>
  );
}

export default function ClinicallyValidatedTestsSection() {
  return (
    <div className="px-[20px] py-[50px] max-w-[1350px] mx-auto">
      <h1 className="text-3xl font-bold text-center">
        Clinically Validated Tests
      </h1>

      <p className="text-[15px] mt-[10px] max-w-[800px] mx-auto text-center text-[#4F5B64]">
        Get answers to common concerns under 3 minutes. Understand your mental
        health with our pre-screener tests and get a report to guide your next
        steps.
      </p>

      <div className="flex flex-wrap gap-[20px] mt-[60px]">
        {CVTMockData.map((test) => (
          <ClinicallyValidatedTestsSectionCard
            key={test.id}
            icon={
              <img
                src={`images/clinically-validated-tests/${test.icon}`}
                alt={test.title}
                className={`w-[70px]`}
              />
            }
            title={test.title}
            description={test.description}
            cardColor={test.cardColor}
            borderColor={test.borderColor}
          />
        ))}
      </div>
    </div>
  );
}
