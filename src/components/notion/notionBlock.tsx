"use client";
import { BlockModel } from "@/models/notion.model";
import NotionRichText from "./notionRichText";
import { NotionDivider } from "./notionDivider";
import { NotionCodeBlock } from "./notionCodeBlock";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { SkeletonImage } from "../skeletonImage";
import { NotionBookmark } from "./notionBookMark";

export function NotionBlock(props: BlockModel) {
  const { type, id, richText, children, caption, icon, checked, url, language } = props;

  switch (type) {
    case "paragraph":
      return (
        <p className="mb-4">
          <NotionRichText richText={richText} />
        </p>
      );
    case "heading_1":
      return (
        <h1 id={id} className="text-3xl font-bold mt-8 mb-4">
          <NotionRichText richText={richText} isTitle />
        </h1>
      );
    case "heading_2":
      return (
        <h2 id={id} className="text-2xl font-bold mt-6 mb-3">
          <NotionRichText richText={richText} isTitle />
        </h2>
      );
    case "heading_3":
      return (
        <h3 id={id} className="text-xl font-bold mt-4 mb-2">
          <NotionRichText richText={richText} isTitle />
        </h3>
      );
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li className="ml-4 mb-2">
          <NotionRichText richText={richText} />
          {children?.map((block: any) => (
            <div key={block.id}>
              <NotionBlock {...block}></NotionBlock>
            </div>
          ))}
        </li>
      );
    case "to_do":
      return (
        <div className="flex items-start mb-2">
          <input type="checkbox" checked={checked} readOnly className="mt-1 mr-2" />
          <div>
            <NotionRichText richText={richText} />
            {children?.map((block: any) => (
              <div key={block.id}>
                <NotionBlock {...block}></NotionBlock>
              </div>
            ))}
          </div>
        </div>
      );
    case "toggle":
      return (
        <details className="mb-4">
          <summary className="cursor-pointer">
            <NotionRichText richText={richText} />
          </summary>
          {children?.map((block: any) => (
            <div key={block.id} className="ml-4 mt-2">
              <NotionBlock {...block}></NotionBlock>
            </div>
          ))}
        </details>
      );
    case "code":
      return (
        <div className="mb-4">
          <NotionCodeBlock style={oneDark} language={language}>
            {richText && richText[0]?.content}
          </NotionCodeBlock>

          {caption && (
            <p className="text-sm text-gray-500 mt-2">
              <NotionRichText richText={caption} />
            </p>
          )}
        </div>
      );
    case "quote":
      return (
        <blockquote className="border-l-4 border-gray-300 pl-4 py-2 mb-4 italic">
          <NotionRichText richText={richText} />
        </blockquote>
      );
    case "image":
      const imgCaption = caption ? caption[0]?.content : "";
      return (
        <figure className="mb-4">
          <SkeletonImage
            src={url || "/placeholder.svg"}
            alt={imgCaption || "image"}
            width={700}
            height={400}
            className="rounded-lg"
          />
          {imgCaption && <figcaption className="text-center text-sm text-gray-500 mt-2">{imgCaption}</figcaption>}
        </figure>
      );
    case "divider":
      return <NotionDivider />;
    case "callout":
      return (
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 flex items-start">
          {icon && <div className="mr-4 text-2xl">{icon}</div>}
          <div>
            <NotionRichText richText={richText} />
            {children?.map((block: any) => (
              <div key={block.id}>
                <NotionBlock {...block}></NotionBlock>
              </div>
            ))}
          </div>
        </div>
      );
    case "bookmark": // 新增 bookmark 处理逻辑
      return <>{url && <NotionBookmark url={url}></NotionBookmark>}</>;
    default:
      console.warn(`Unsupported block type: ${type}`);

      return "";
  }
}
