function AnalyticsSectionCard({
  value,
  description,
}: {
  value: string;
  description: string;
}) {
  return (
    <div className="border-2 border-hero-heading bg-white rounded-[15px] p-[20px] min-w-[300px]">
      <h1 className="font-semibold text-[35px] text-hero-heading text-center">
        {value}
      </h1>
      <p className="text-center text-[17px] text-light-text">{description}</p>
    </div>
  );
}

export default function AnalyticsSection() {
  return (
    <div className="px-[20px] py-[70px] bg-light-100 flex justify-center items-center gap-[30px]">
      <AnalyticsSectionCard
        value="120+"
        description="Mental Health Professionals"
      />

      <AnalyticsSectionCard value="50,000+" description="Lives Transformed" />

      <AnalyticsSectionCard value="15+" description="Specialized Tools" />
    </div>
  );
}
