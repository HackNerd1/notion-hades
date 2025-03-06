"use client";
import { ChevronDown } from "@/icons/chevronDown";

function scrollDown() {
  const targetY = window.innerHeight;
  window.scrollTo({
    top: targetY,
    behavior: "smooth",
  });
}

export default function ScrollDownButton() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform">
      <button onClick={scrollDown} className="button-default animate-bounce rounded-full p-3" aria-label="Scroll down">
        <ChevronDown size={24}></ChevronDown>
      </button>
    </div>
  );
}
