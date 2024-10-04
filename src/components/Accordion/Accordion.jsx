import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const AccordionItem = ({ title, content, isOpen, toggleAccordion }) => {
  return (
    <>
      <div className="accordion-item">
        <button
          className="accordion-title flex justify-between w-full py-2 lg:py-4 text-left lg:text-lg text-grey-dark"
          onClick={toggleAccordion}
        >
          {title}
          <FaChevronDown
            className={`transition-transform duration-300 ease-in-out ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        <div
          className={`accordion-content px-0 text-gray-700 overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[500px] py-2" : "max-h-0 py-0"
          }`}
        >
          <div className="lg:px-4 text-grey">{content}</div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-gradient-to-r from-interactive-light to-white"></div>
    </>
  );
};

const Accordion = ({ data }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      {data.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openIndex === index}
          toggleAccordion={() => toggleAccordion(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
