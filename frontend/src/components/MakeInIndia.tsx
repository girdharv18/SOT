export default function MakeInIndia() {
  return (
    <div className="bg-make-in-india-bg py-[60px] px-[40px] max-w-[1350px] mx-auto rounded-[30px]">
      <div className="flex items-center justify-between gap-[20px]">
        <div className="left flex items-center gap-[15px]">
          <img
            src="/images/navbar/logo_white.png"
            alt="MindCurePath Logo"
            className="w-[80px]"
          />

          <div className="content text-white">
            <h1 className="text-[26px] font-medium">MindCurePath</h1>

            <p className="text-[16px] uppercase font-light">
              India’s own virtual counselling platform built by Indians, for
              Indians
            </p>
          </div>
        </div>

        <div className="right text-white leading-[5px]">
          <h1 className="uppercase text-center mb-[10px] text-[20px] font-extralight tracking-wide">
            Proudly Supports
          </h1>

          <h1 className="uppercase text-center text-[35px] font-bold tracking-wider leading-[35px]">
            MAKE IN INDIA
          </h1>
        </div>
      </div>

      <div className="flex items-center justify-between gap-[20px] mt-[30px]">
        <div className="bg-[#45565b] text-white px-[25px] py-[25px] rounded-[15px] shadow-lg flex flex-col gap-[15px]">
          <p>
            Mind Cure Path proudly supports the Make in India initiative — a
            movement that celebrates innovation, entrepreneurship, and
            self-reliance across the nation. By connecting individuals with
            certified Indian counselors, therapists, Dieticians , academic
            advisors, financial consultants, and GST & taxation experts, we aim
            to build a trusted virtual platform where personal and professional
            guidance is accessible, affordable, and locally empowered.
          </p>
          <p>
            At Mind Cure Path, we believe true growth begins from within — both
            for individuals and for our nation. India’s own virtual counseling
            platform — built by Indians, for Indians.
          </p>
        </div>

        <div className="text-white flex flex-col gap-[20px]">
          <div className="bg-[#45565b] px-[20px] py-[20px] rounded-[10px] min-w-[250px] shadow-lg">
            <p>Certified Indian Counselors, Therapists,Dieticians</p>
          </div>

          <div className="bg-[#45565b] px-[20px] py-[20px] rounded-[10px] min-w-[250px] shadow-lg">
            <p>
              Academic Advisors,Financial Consultants, GST & Taxation Experts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
