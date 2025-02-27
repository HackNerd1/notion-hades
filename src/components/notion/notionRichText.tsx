"use client";
import { RichTextModel } from "@/models/notion.model";
import { classNames } from "@/utils/main.utils";
import Link from "next/link";
import { SkeletonImage } from "../skeletonImage";
import { IconLink } from "@/icons/link";

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
        const { bold, code, italic, strikethrough, underline, content, link, type, icon } = text;

        const textClasses = classNames({
          "font-bold": bold,
          "font-mono bg-gray-100 dark:bg-gray-800 rounded p-[0.1rem_0.5rem] ": code,
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
                  className={`${textClasses} text-[var(--text-default)] transition-all duration-300 underline hover:text-gray-400`}
                >
                  {content}
                </Link>
              );
            }

            return (
              <span key={index} className={`${textClasses}`} style={renderRichTextStyle(text, isTitle)}>
                {content}
              </span>
            );
          case "mention":
            return (
              <Link
                key={index}
                href={link}
                target="_blank"
                className={`${textClasses} text-sm align-middle text-gray-300 transition-all duration-300 rounded-md px-2 py-1 hover:bg-slate-600 inline-flex items-center`}
              >
                {icon ? (
                  <SkeletonImage
                    type="avatar"
                    src={icon}
                    alt={content}
                    width={24}
                    height={24}
                    className="inline-block mr-2 w-auto"
                    imageClassName="inline-block"
                  ></SkeletonImage>
                ) : (
                  <IconLink size={20} classNames="mr-2"></IconLink>
                )}
                {content}
              </Link>
            );
        }
      })}
    </>
  );
}
