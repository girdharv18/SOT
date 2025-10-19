interface WeHelpWithProps {
  modalRef: React.RefObject<HTMLDivElement | null>;
}

export default function WeHelpWith({ modalRef }: WeHelpWithProps) {
  return (
    <div
      ref={modalRef}
      className="absolute top-[50px] left-0 w-full h-[222px] flex items-center justify-between gap-[20px] bg-navbar-dropdown-bg z-20 rounded-[10px] p-[20px]"
    >
      <div className="flex flex-col text-white gap-[10px] flex-2">
        <div className="bg-white text-navbar-dropdown-bg px-[20px] py-[7px] text-[16px] rounded-[10px] cursor-pointer">
          Therapists
        </div>
        <div className="px-[20px] py-[7px] text-[16px] rounded-[10px] cursor-pointer">
          Coaches
        </div>
        <div className="px-[20px] py-[7px] text-[16px] rounded-[10px] cursor-pointer">
          Dieticians
        </div>
        <div className="px-[20px] py-[7px] text-[16px] rounded-[10px] cursor-pointer">
          Yoga Experts
        </div>
      </div>

      <div className="flex-3 h-full w-full bg-navbar-dropdown-right-outer-bg border border-navbar-dropdown-right-outer text-white p-[20px] rounded-[10px]">
        Hello
      </div>
    </div>
  );
}
