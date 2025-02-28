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
      color:
        data.color === "default"
          ? `var(--text-title-default)`
          : `var(--text-${data.color})`,
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
        const {
          bold,
          code,
          italic,
          strikethrough,
          underline,
          content,
          link,
          type,
          icon,
        } = text;

        const textClasses = classNames({
          "font-bold": bold,
          "font-mono bg-gray-800 rounded p-[0.1rem_0.5rem] ": code,
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
              <span
                key={index}
                className={`${textClasses}`}
                style={renderRichTextStyle(text, isTitle)}
              >
                {content}
              </span>
            );
          case "mention":
            return (
              <Link
                key={index}
                href={link}
                target="_blank"
                className={`${textClasses} inline-flex items-center rounded-md px-2 py-1 align-middle text-sm text-gray-300 transition-all duration-300 hover:bg-slate-600`}
              >
                {icon ? (
                  <SkeletonImage
                    type="avatar"
                    src={icon}
                    alt={content}
                    width={24}
                    height={24}
                    className="mr-2 inline-block w-auto w-fit"
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
