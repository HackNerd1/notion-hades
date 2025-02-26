"use client";
import { TagModel } from "@/models/notion.model";
import { classNames } from "@/utils/main.utils";

interface NotionTagProps extends TagModel {
  className?: string;
  size?: "sm" | "md" | "lg";
  onClick?: () => any;
}

export function NotionTag({ size = "md", className, id, name, color }: NotionTagProps) {
  const wrapClassName = classNames(
    {
      "text-xs px-2 py-[0.1rem] rounded-[0.25rem]": size === "sm",
      "text-md px-3 py-1 rounded-md": size === "md",
      "text-lg px-3 py-1 rounded-md": size === "lg",
    },
    "text-white relative",
    className
  );
  return (
    <span key={id} className={wrapClassName} style={{ background: `var(--tag-${color})` }}>
      {name}
      {/* <div className="absolute rounded-md h-full w-full bg-[var(--tag-hover)] top-0 left-0 opacity-0 hover:opacity-100 transition-bg duration-300"></div> */}
    </span>
  );
}
