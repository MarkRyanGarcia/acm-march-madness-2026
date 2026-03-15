import { useState } from "react";
import { StrokedText } from "./StrokedText";

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqData = [
    {
      question: "When does the competition take place?",
      answer: "Monday, March 16, 2026 to Friday, March 20, 2026."
    },
    {
      question: "What time do the problems get released?",
      answer: "A new problem is released every day at 2:00 PM PST."
    },
    {
      question: "How many people can be on a team?",
      answer: "The limit is 3 people per team. You are also welcome to compete solo."
    },
    {
      question: "Is this open to beginners?",
      answer: "Yes. The challenge is open to all skill levels and is a great way to practice problem-solving."
    },
    {
      question: "What programming languages can I use?",
      answer: "You can use any programming language you prefer. You wil not submit code, but rather the final answer to the problem."
    }
  ]

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="flex flex-col gap-12 md:gap-20 w-full items-center px-4">
      <StrokedText
        text="FAQ"
        className="z-20 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-center"
        color="#FFD1A6"
        outlineColor="#F49D75"
      />
      <div className="z-20 w-8/9 max-w-5xl flex flex-col gap-8">
        {faqData.map((item, index) => (
          <div key={index} className="w-full outline-white outline-8 rounded-4xl bg-transparent">
            <button
              onClick={() => handleToggle(index)}
              className="flex items-center justify-between w-full p-2 md:p-4 text-left"
            >
              <span className="text-sm sm:text-lg md:text-xl font-bold">
                {item.question}
              </span>
              <img
                src="/flower_small_pink.svg"
                alt="flower"
                className={`w-10 sm:w-14 md:w-16 p-2 shrink-0 transition-transform duration-300 ease-in-out ${activeIndex === index ? 'rotate-70' : 'rotate-0'
                  }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
              <div className="xl:px-5 lg:px-5 md:px-4 sm:px-2 px-2 pb-6 text-sm sm:text-base md:text-lg">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
