import { TagModel } from "@/models/notion.model";

export function NotionTag(props: TagModel) {
  return (
    <a
      key={props.id}
      className={` text-white px-3 py-1 rounded-md text-sm cursor-pointer relative`}
      style={{ background: `var(--tag-${props.color})` }}
    >
      {props.name}
      <div className="absolute rounded-md h-full w-full bg-[var(--tag-hover)] top-0 left-0 opacity-0 hover:opacity-100 transition-bg duration-300"></div>
    </a>
  );
}
