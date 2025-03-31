"use client";
import { useActiveSection } from "@/hooks/useActiveSection";
import { IconBars } from "@/icons/bars";
import { TocModel } from "@/models/notion.model";
import { classNames } from "@/utils/main.utils";

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
      <div className="relative">
        <div className="absolute top-0 h-full w-[0.1rem] rounded bg-border-color"></div>
        <ul className="relative">
          {props.data.map((item) => {
            const isH1 = item.type === "heading_1";
            const isH2 = item.type === "heading_2";
            const isH3 = item.type === "heading_3";
            const isActive = activeId === item.id;
            const liClassName = classNames(
              {
                "pl-4": isH1,
                "pl-8 text-sm": isH2,
                "pl-12 text-xs": isH3,
                "text-white": isActive,
                "text-text-title-default": !isActive,
              },
              "py-[0.15rem] relative transition-all duration-300 font-bold",
            );

            return (
              <li key={item.id} className={liClassName}>
                <div
                  className={`z-2 absolute left-0 top-0 h-full w-[0.1rem] rounded bg-slate-100 transition-all duration-500 ${isActive ? "opacity-100" : "opacity-0"} `}
                ></div>
                <a
                  href={`#${item.id}`}
                  className={`relative block transition-colors hover:text-white`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.id)?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
