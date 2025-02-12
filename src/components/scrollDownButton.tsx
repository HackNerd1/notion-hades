// import { ChevronDown } from "lucide-react";

import { ChevronDown } from "@/icons/chevronDown";

interface ScrollDownButtonProps {
  onClick: () => void;
}

export default function ScrollDownButton({ onClick }: ScrollDownButtonProps) {
  return (
    <div className="absolute bottom-8 left-1/2  transform -translate-x-1/2">
      <button
        onClick={onClick}
        className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-3 rounded-full shadow-lg transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-700 animate-bounce"
        aria-label="Scroll down"
      >
        {/* <ChevronDown size={24} /> */}
        <ChevronDown size={24}></ChevronDown>
      </button>
    </div>
  );
}
