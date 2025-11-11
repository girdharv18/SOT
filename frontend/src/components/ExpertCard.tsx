import { Star } from "lucide-react";

export default function ExpertCard() {
  return (
    <div className="Expert-Card border flex flex-col border-[#B5B5B5] transform hover:scale-[1.011] duration-100 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] transition-all p-[25px] relative rounded-[15px] w-full">
      <div className="flex items-start justify-between gap-[20px]">
        <div className="Profile-Image flex flex-col flex-1">
          <img
            src="images/experts/expert_profile_img.png"
            alt="Expert Image"
            className="self-start"
          />

          <div className="w-full border border-[#44666C] hover:bg-[#44666C] hover:text-white transition-colors duration-200 text-[#44666C] text-center cursor-pointer text-[11px] min-[650px]:text-sm font-medium rounded-[20px] py-[5px] mt-[10px]">
            View Profile
          </div>
        </div>

        <div className="Profile-Details flex flex-col flex-2">
          <div className="Name-Container flex items-center justify-between">
            <h1 className="Name text-[16px] min-[650px]:text-[20px] font-medium">
              Dr. Christian Buehner
            </h1>

            <div className="Rating-Container flex items-center gap-[5px]">
              <Star size={18} className="fill-yellow-400 text-yellow-400" />
              <span className="Rating-Value text-yellow-400">4.8</span>
              <span className="Rating-Count text-gray-500 text-[10px] min-[650px]:text-xs">
                (30)
              </span>
            </div>
          </div>

          <div className="Specialization-Container text-[#8F9EA0] text-[11px] min-[650px]:text-sm">
            Counselling Psychologist (2+ yrs of experience)
          </div>

          <div className="Tags-Container text-[#516A6E] text-xs min-[650px]:text-[15px] mt-[10px]">
            Anxiety, Relationship, Procrastination and Time Management
          </div>

          <div className="Languages-Container text-[#516A6E] mt-[10px] text-xs min-[650px]:text-[15px]">
            English, German
          </div>

          <div className="Next-Available-Slot mt-[10px] text-xs min-[650px]:text-[15px]">
            <span className="font-light text-[#8F9EA0]">
              Next available slot:
            </span>{" "}
            <span className="font-medium text-[#516A6E]">
              Tue, Nov 12, 10:00 AM - 11:00 AM
            </span>
          </div>

          <div className="Price-Container flex items-center gap-[10px] mt-[10px]">
            <p className="text-xl min-[650px]:text-[26px] font-medium">
              ₹ 1500
            </p>
            <p className="text-[11px] min-[650px]:text-sm text-gray-500">
              for 60 min consultation
            </p>
          </div>
        </div>
      </div>

      <div className="mt-[20px] bg-[#44666C] text-white text-center cursor-pointer text-sm min-[650px]:text-base font-medium rounded-[20px] py-[10px]">
        Book a session
      </div>
    </div>
  );
}
