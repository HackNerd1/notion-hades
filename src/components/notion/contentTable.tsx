"use client";
import { useActiveSection } from "@/hooks/useActiveSection";
import { IconBars } from "@/icons/bars";
import { TocModel } from "@/models/notion.model";

interface ContentTableProps {
  data: TocModel[];
}

export function ContentTable(props: ContentTableProps) {
  const headingIds = props.data.map((item) => item.id);
  const activeId = useActiveSection(headingIds);
  return (
    <div className="sticky top-8">
      <h2 className="mb-4 flex items-center font-bold">
        <IconBars size={20} classNames="mr-2" />
        Contents
      </h2>
      <ul className="relative">
        <li className="absolute left-1 top-0 h-full w-[0.1rem] rounded bg-border-color"></li>
        {props.data.map((item) => {
          const isMainHeading = item.type === "heading_1";
          const isSubHeading = item.type === "heading_2";
          const isActive = activeId === item.id;

          return (
            <li
              key={item.id}
              className={`py-[0.15rem] ${isMainHeading ? "" : "mx-1"} ${isActive ? "text-white" : isSubHeading ? "text-[#aaa]" : "text-gray-200"} relative transition-all duration-300`}
            >
              <div
                className={`z-2 absolute left-0 top-0 h-full w-[0.1rem] rounded bg-slate-100 transition-all duration-500 ${isActive ? "opacity-100" : "opacity-0"} `}
              ></div>
              <a
                href={`#${item.id}`}
                className={`relative block pl-4 transition-colors hover:text-white ${isMainHeading ? "font-medium" : "font-normal"} `}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                {isMainHeading && (
                  <div
                    className={`absolute bottom-0 left-0 top-0 w-0.5 rounded ${isActive ? "bg-white" : "bg-gray-700"} transition-colors duration-200`}
                  />
                )}
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
