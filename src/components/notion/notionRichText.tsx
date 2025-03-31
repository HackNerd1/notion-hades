import { BlockModel, RichTextModel } from "@/models/notion.model";
import { classNames } from "@/utils/main.utils";
import Link from "next/link";
import { NotionMention } from "./notionMention";
import { NotionLinkToPage } from "./notionLinkToPage";
import { Alert } from "../alert";

interface RichTextProps {
  richText?: RichTextModel[];
  isTitle?: boolean;
}

function renderRichTextStyle(data: RichTextModel, isTitle = false) {
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
        const { bold, code, italic, strikethrough, underline, content, link, type, pageId } = text;

        const textClasses = classNames({
          "font-bold": bold,
          "font-mono bg-gray-800 rounded p-[0.1rem_0.5rem]": code,
          italic: italic,
          "line-through": strikethrough,
          underline: underline,
        });

        switch (type) {
          case "text":
            if (link) {
              return (
                <Link
                  key={index}
                  href={link}
                  className={`${textClasses} text-text-default underline transition-all duration-300 hover:text-gray-400`}
                >
                  {content}
                </Link>
              );
            }
            return (
              <span key={index} className={`${textClasses} break-all`} style={renderRichTextStyle(text, isTitle)}>
                {content}
              </span>
            );
          case "user":
            return (
              <span
                key={index}
                className="rounded text-text-default underline transition-all duration-300 hover:text-text-default-hover"
              >
                {content}
              </span>
            );
          case "page":
            return <NotionLinkToPage key={index} {...BlockModel.createEntity({ pageId })} />;
          case "mention":
            <NotionMention key={index} {...text} />;
          default:
            <Alert key={index} message={`Not support type: ${type}`} type="error"></Alert>;
        }
      })}
    </>
  );
}
