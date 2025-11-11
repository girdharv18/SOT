import { useState, useEffect, useRef } from "react";
import ExpertsHeroSection from "../components/ExpertsHeroSection";
import ExpertsNavbar from "../components/ExpertsNavbar";
import { Filter, X } from "lucide-react";
import ExpertCard from "../components/ExpertCard";

function ExpertsTitle() {
  return (
    <div className="max-w-[1350px] mx-auto">
      <h1 className="text-white text-[20px] font-medium bg-[#304048] text-center py-[10px] rounded-[30px] my-[10px]">
        Health Sector
      </h1>
    </div>
  );
}

function Options({
  options,
  selectedOption,
  setSelectedOption,
}: {
  options: string[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}) {
  return (
    <div className="max-w-[1350px] mx-auto flex items-center justify-between gap-[10px]">
      {options.map((option) => (
        <div
          key={option}
          className={`flex flex-1 w-full items-center cursor-pointer justify-center rounded-[30px] py-[10px] ${
            selectedOption === option
              ? "bg-[#304048] text-white"
              : "bg-light-100 text-[#304048] hover:bg-[#304048]/20"
          }`}
          onClick={() => setSelectedOption(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
}

function FilterModal({
  isOpen,
  onClose,
  availableFilters,
  selectedFilters,
  setSelectedFilters,
  onApply,
}: {
  isOpen: boolean;
  onClose: () => void;
  availableFilters: string[];
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
  onApply: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((f) => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[100px]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative bg-white rounded-[15px] shadow-lg max-w-[500px] w-full mx-[20px] max-h-[80vh] flex flex-col overflow-hidden"
      >
        {/* Header - Fixed */}
        <div className="flex justify-between items-center p-[25px] pb-[20px] border-b border-gray-200 flex-shrink-0">
          <h2 className="text-[20px] font-semibold text-[#304048]">
            Select Filters
          </h2>
          <button
            onClick={onClose}
            className="p-[5px] hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-[#304048] cursor-pointer" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 px-[25px] py-[20px]">
          {/* Filter List */}
          <div className="flex flex-col gap-[10px] mb-[20px]">
            {availableFilters.map((filter) => (
              <label
                key={filter}
                className="flex items-center gap-[10px] cursor-pointer p-[10px] hover:bg-gray-50 rounded-[10px] transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedFilters.includes(filter)}
                  onChange={() => toggleFilter(filter)}
                  className="w-[18px] h-[18px] cursor-pointer accent-[#304048]"
                />
                <span className="text-[14px] text-[#304048]">{filter}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Apply Button - Fixed */}
        <div className="p-[25px] pt-[20px] border-t border-gray-200 flex-shrink-0">
          <button
            onClick={onApply}
            className="w-full bg-[#304048] text-white py-[12px] rounded-[10px] font-medium hover:bg-[#304048]/90 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

function FiltersAndSearch({
  appliedFilters,
  removeFilter,
  onFilterClick,
}: {
  appliedFilters: string[];
  removeFilter: (filter: string) => void;
  onFilterClick: () => void;
}) {
  return (
    <div className="flex items-center justify-between mt-[25px] max-w-[1350px] mx-auto">
      {/* Filters */}
      <div className="flex items-center gap-[10px] flex-1">
        <div
          className="flex items-center justify-center cursor-pointer p-[10px] bg-[#304048]/17 rounded-full hover:bg-[#304048]/25 transition-colors"
          onClick={onFilterClick}
        >
          <Filter className="text-[#304048]" size={20} />
        </div>

        {/* Applied Filters */}
        {appliedFilters.map((filter) => (
          <div
            key={filter}
            className="flex items-center gap-[5px] bg-[#E0ECEE] border border-[#133945] text-[#133945] pl-[15px] pr-[7px] py-[6px] rounded-full text-[14px]"
          >
            <span>{filter}</span>
            <button
              onClick={() => removeFilter(filter)}
              className="hover:bg-[#bfd8df] rounded-full cursor-pointer p-[5px] transition-colors flex items-center"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="border border-border-light rounded-full">
        <input
          type="text"
          placeholder="Search"
          className="w-full px-[15px] py-[10px] rounded-full focus:outline-border-light text-border-light placeholder:text-border-light"
        />
      </div>
    </div>
  );
}

function ExpertsCardsSection() {
  return (
    <div className="max-w-[1350px] mx-auto mt-[40px]">
      <div className="grid grid-cols-1 min-[1200px]:grid-cols-2 gap-[20px]">
        <ExpertCard />
        <ExpertCard />
        <ExpertCard />
        <ExpertCard />
        <ExpertCard />
        <ExpertCard />
        <ExpertCard />
        <ExpertCard />
      </div>
    </div>
  );
}

export default function Experts() {
  const [selectedOption, setSelectedOption] = useState<string>("Mental");
  const [appliedFilters, setAppliedFilters] = useState<string[]>([
    "Price",
    "Age",
    "Hindi",
  ]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [tempSelectedFilters, setTempSelectedFilters] = useState<string[]>([]);

  // Available filters - you can modify this list as needed
  const availableFilters = [
    "Price",
    "Age",
    "Hindi",
    "English",
    "Experience",
    "Rating",
  ];

  // Initialize temp filters with applied filters when modal opens
  useEffect(() => {
    if (isFilterModalOpen) {
      setTempSelectedFilters([...appliedFilters]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFilterModalOpen]);

  const removeFilter = (filter: string) => {
    setAppliedFilters(appliedFilters.filter((f) => f !== filter));
  };

  const handleOpenFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleApplyFilters = () => {
    setAppliedFilters([...tempSelectedFilters]);
    setIsFilterModalOpen(false);
  };

  return (
    <div className="px-[20px]">
      <ExpertsNavbar />

      <ExpertsHeroSection />

      <ExpertsTitle />

      <Options
        options={["Mental", "Physical", "Nutrition", "Wellness"]}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />

      <FiltersAndSearch
        appliedFilters={appliedFilters}
        removeFilter={removeFilter}
        onFilterClick={handleOpenFilterModal}
      />

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={handleCloseFilterModal}
        availableFilters={availableFilters}
        selectedFilters={tempSelectedFilters}
        setSelectedFilters={setTempSelectedFilters}
        onApply={handleApplyFilters}
      />

      <ExpertsCardsSection />
    </div>
  );
}
