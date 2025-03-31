"use client";
import { RichTextModel } from "@/models/notion.model";
import Link from "next/link";
import { SkeletonImage } from "../skeletonImage";
import { IconLink } from "@/icons/link";
import { classNames } from "@/utils/main.utils";

export function NotionMention(props: RichTextModel) {
  const textClasses = classNames({
    "font-bold": props.bold,
    "font-mono bg-gray-800 rounded p-[0.1rem_0.5rem]": props.code,
    italic: props.italic,
    "line-through": props.strikethrough,
    underline: props.underline,
  });

  return (
    <Link
      href={props.link}
      target="_blank"
      className={`${textClasses} inline-flex items-center rounded-md px-2 py-1 align-middle text-sm text-gray-300 transition-all duration-300 hover:bg-slate-600`}
    >
      {props.icon ? (
        <SkeletonImage
          type="avatar"
          src={props.icon}
          alt={props.content}
          width={24}
          height={24}
          className="mr-2 inline-block w-fit"
          imageClassName="inline-block"
        ></SkeletonImage>
      ) : (
        <IconLink size={20} classNames="mr-2"></IconLink>
      )}
      {props.content}
    </Link>
  );
}
