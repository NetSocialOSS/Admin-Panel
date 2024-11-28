import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface DropdownItem {
  text: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface DropdownMenuProps {
  text: string;
  icon: React.ReactNode;
  items: DropdownItem[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ text, icon, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <div className="relative mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="w-full text-blue-600 font-semibold text-left text-xl rounded-lg p-3 flex items-center"
      >
        <div
          className={`mr-2 rounded-lg p-3 ${
            hover ? "text-white" : "text-blue-600"
          }`}
          style={{ background: hover ? "#2563eb" : "rgb(255, 255, 255, 0.03)" }}
        >
          {icon}
        </div>
        <p className="text-white flex-grow">{text}</p>
        <FaChevronDown
          className={`ml-2 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          } ${hover ? "" : "text-blue-600"}`}
        />
      </button>
      {isOpen && (
        <div className="absolute left-0 w-full mt-1 bg-black rounded-lg border border-blue-700 shadow-lg z-10">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full text-blue-600 font-semibold text-left text-lg rounded-lg p-3 flex items-center"
            >
              <div
                className="mr-2 rounded-lg p-2 text-blue-600"
                style={{ background: "rgb(255, 255, 255, 0.03)" }}
              >
                {item.icon}
              </div>
              <p className="text-white">{item.text}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
