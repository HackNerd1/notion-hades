import { RichTextkModel } from "@/models/notion.model";
import { classNames } from "@/utils/main.utils";
import Link from "next/link";

interface RichTextProps {
  richText?: RichTextkModel[];
  isTitle?: boolean;
}

function renderRichTextStyle(data: RichTextkModel, isTitle = false) {
  if (isTitle) {
    return {
      color: data.color === "default" ? `var(--text-title-default)` : `var(--text-${data.color})`,
    };
  }
  return {
    color: `var(--text-${data.color})`,
  };
}

export default function NotionRichText({ richText, isTitle }: RichTextProps) {
  return (
    <>
      {richText?.map((text, index) => {
        const { bold, code, italic, strikethrough, underline, content, link } = text;

        const textClasses = classNames({
          "font-bold": bold,
          "font-mono bg-gray-100 dark:bg-gray-800 rounded p-[0.1rem_0.5rem] ": code,
          italic: italic,
          "line-through": strikethrough,
          underline: underline,
        });

        if (link) {
          return (
            <Link
              key={index}
              href={link}
              className={`${textClasses} text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200`}
            >
              {content}
            </Link>
          );
        }

        if (content) {
          return (
            <span key={index} className={`${textClasses}`} style={renderRichTextStyle(text, isTitle)}>
              {content}
            </span>
          );
        }
      })}
    </>
  );
}
