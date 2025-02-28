"use client";
import { BlockModel } from "@/models/notion.model";
import NotionRichText from "./notionRichText";
import { NotionDivider } from "./notionDivider";
import { NotionCodeBlock } from "./notionCodeBlock";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { SkeletonImage } from "../skeletonImage";
import { NotionBookmark } from "./notionBookMark";

export function NotionBlock(props: BlockModel) {
  const {
    type,
    id,
    richText,
    children,
    caption,
    icon,
    checked,
    url,
    language,
  } = props;

  switch (type) {
    case "paragraph":
      return (
        <p className="mb-4">
          <NotionRichText richText={richText} />
        </p>
      );
    case "heading_1":
      return (
        <h1 id={id} className="mb-4 mt-8 text-3xl font-bold">
          <NotionRichText richText={richText} isTitle />
        </h1>
      );
    case "heading_2":
      return (
        <h2 id={id} className="mb-3 mt-6 text-2xl font-bold">
          <NotionRichText richText={richText} isTitle />
        </h2>
      );
    case "heading_3":
      return (
        <h3 id={id} className="mb-2 mt-4 text-xl font-bold">
          <NotionRichText richText={richText} isTitle />
        </h3>
      );
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li className="mb-2 ml-4">
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
        <div className="mb-2 flex items-start">
          <input
            type="checkbox"
            checked={checked}
            readOnly
            className="mr-2 mt-1"
          />
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
            <p className="mt-2 text-sm text-gray-500">
              <NotionRichText richText={caption} />
            </p>
          )}
        </div>
      );
    case "quote":
      return (
        <blockquote className="mb-4 border-l-4 border-gray-300 py-2 pl-4 italic">
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
          {imgCaption && (
            <figcaption className="mt-2 text-center text-sm text-gray-500">
              {imgCaption}
            </figcaption>
          )}
        </figure>
      );
    case "divider":
      return <NotionDivider />;
    case "callout":
      return (
        <div className="mb-4 flex items-start rounded-lg bg-gray-800 p-4">
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
