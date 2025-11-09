import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelfAssessmentNavbar from "../components/SelfAssessmentNavbar";
import { SELF_ASSESSMENT_QUIZ } from "../lib/constants";
import type { QuizOption } from "../lib/interfaces";
import { useScreen } from "../context/ScreenContext";

function OptionItem({
  option,
  onClick,
  selectedOption,
}: {
  option: QuizOption;
  onClick: (option: QuizOption) => void;
  selectedOption: QuizOption | null;
}) {
  return (
    <div
      className={`option-item text-[16px] cursor-pointer py-[15px] px-[25px] rounded-[25px] ${
        option.text === selectedOption?.text
          ? "bg-[#44666C] text-white"
          : "bg-[#D8E1E2] hover:bg-[#c4d2d3] text-[#44666C]"
      } transition-colors duration-200`}
      onClick={() => onClick(option)}
    >
      {option.text}
    </div>
  );
}

export default function SelfAssessmentQuestions() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<Record<number, QuizOption>>({});
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const totalQuestions: number = SELF_ASSESSMENT_QUIZ.length;
  const { screenWidth } = useScreen();

  const currentSelectedOption = answers[currentQuestion] || null;

  const calculateTotalScore = (): number => {
    return Object.values(answers).reduce(
      (sum, option) => sum + option.score,
      0
    );
  };

  function handleOptionClick(option: QuizOption) {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: option,
    }));
  }

  function handleNextQuestion() {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  function handlePreviousQuestion() {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }

  function handleFinish() {
    const totalScore = calculateTotalScore();
    // Navigate to results page with score as URL parameter
    navigate(`/self-assessment/result?score=${totalScore}`);
  }

  const canGoNext =
    currentSelectedOption !== null && currentQuestion < totalQuestions;
  const canGoPrevious = currentQuestion > 1;
  const isLastQuestion = currentQuestion === totalQuestions;
  const hasAnsweredAllQuestions =
    Object.keys(answers).length === totalQuestions;

  return (
    <div className="self-assessment-questions-page max-w-[1350px] mx-auto px-[25px]">
      <SelfAssessmentNavbar />
      <h1 className="text-[20px] font-semibold text-[#44666C] mt-[30px]">
        Question {currentQuestion} of {totalQuestions}
      </h1>
      {/* Create a progress bar here */}
      <div className="w-full h-[12px] bg-[#D9D9D9] rounded-[10px] mt-[14px]">
        <div
          className="h-full bg-[#44666C] rounded-[10px] transition-all duration-300"
          style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
        ></div>
      </div>

      {/* <div className="text-[16px] font-medium text-[#44666C] mt-[14px]">
        Total Score: {calculateTotalScore()} / {totalQuestions * 4}
      </div> */}

      {/* Question Text Here*/}
      <h2 className="question-text text-[24px] font-medium text-[#44666C] mt-[50px]">
        {SELF_ASSESSMENT_QUIZ[currentQuestion - 1].question}
      </h2>

      {/* Options Here */}
      <div
        className={`options-container ${
          screenWidth <= 800 ? "grid grid-cols-1" : "grid grid-cols-2"
        } gap-[20px] mt-[20px]`}
      >
        {SELF_ASSESSMENT_QUIZ[currentQuestion - 1].options.map(
          (option, index) => (
            <OptionItem
              key={index}
              option={option}
              onClick={() => handleOptionClick(option)}
              selectedOption={currentSelectedOption}
            />
          )
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-[50px] mb-[30px]">
        <button
          onClick={handlePreviousQuestion}
          disabled={!canGoPrevious}
          className={`px-[40px] py-[12px] rounded-[30px] text-[18px] font-medium transition-all duration-200 ${
            canGoPrevious
              ? "bg-[#44666C] text-white hover:bg-[#365a62] cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Previous
        </button>

        {isLastQuestion ? (
          <button
            onClick={handleFinish}
            disabled={!currentSelectedOption}
            className={`px-[40px] py-[12px] rounded-[30px] text-[18px] font-medium transition-all duration-200 ${
              currentSelectedOption
                ? "bg-[#44666C] text-white hover:bg-[#365a62] cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Finish
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            disabled={!canGoNext}
            className={`px-[40px] py-[12px] rounded-[30px] text-[18px] font-medium transition-all duration-200 ${
              canGoNext
                ? "bg-[#44666C] text-white hover:bg-[#365a62] cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
