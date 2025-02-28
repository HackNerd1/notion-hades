import { ChevronDown } from "@/icons/chevronDown";

interface ScrollDownButtonProps {
  onClick: () => void;
}

export default function ScrollDownButton({ onClick }: ScrollDownButtonProps) {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
      <button onClick={onClick} className="button-default rounded-full p-3" aria-label="Scroll down">
        <ChevronDown size={24}></ChevronDown>
      </button>
    </div>
  );
}
