import { IconBars } from "@/icons/bars";
import { TocModel } from "@/models/notion.model";

/*
 * @Descripttion:
 * @version: 0.0.1
 * @Author: Hansel
 * @Date: 2025-02-21 22:29:26
 * @LastEditors: Hansel
 * @LastEditTime: 2025-02-21 23:22:30
 */
interface ContentTableProps {
  data: TocModel[];
  activeId: string;
}

export function ContentTable(props: ContentTableProps) {
  return (
    <div className="sticky top-8">
      <h2 className="font-bold mb-4 flex items-center">
        <span className="mr-2">
          <IconBars size={16} />
        </span>
        Contents
      </h2>
      <ul className="relative">
        <li className="absolute w-[0.1rem] top-0 left-1 h-full rounded bg-[var(--border-color)]"></li>
        {props.data.map((item) => {
          const isMainHeading = item.type === "heading_1";
          const isSubHeading = item.type === "heading_2";
          const isActive = props.activeId === item.id;

          return (
            <li
              key={item.id}
              className={`
                  py-[0.15rem]
                  ${isMainHeading ? "" : "mx-1"}
                  ${isActive ? "text-white" : isSubHeading ? "text-[#aaa]" : "text-gray-200"}
                  relative
                  transition-all duration-300
                `}
            >
              <div
                className={`
                   absolute left-0 top-0 w-[0.1rem] h-full rounded z-2 bg-slate-100 transition-all duration-500
                  ${isActive ? "opacity-100" : "opacity-0"}
              `}
              ></div>
              <a
                href={`#${item.id}`}
                className={`
                  block relative pl-4 hover:text-white transition-colors
                  ${isMainHeading ? "font-medium" : "font-normal"}
                `}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                {isMainHeading && (
                  <div
                    className={`
                      absolute left-0 top-0 bottom-0 w-0.5 rounded
                      ${isActive ? "bg-white" : "bg-gray-700"}
                      transition-colors duration-200
                    `}
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
