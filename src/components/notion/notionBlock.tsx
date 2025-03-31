import { BlockModel } from "@/models/notion.model";
import NotionRichText from "./notionRichText";
import { NotionDivider } from "./notionDivider";
import { NotionCodeBlock } from "./notionCodeBlock";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { SkeletonImage } from "../skeletonImage";
import { NotionBookmark } from "./notionBookMark";
import NotionTable from "./notionTable";
import { NotionLinkToPage } from "./notionLinkToPage";
import { NotionColumnList } from "./notionColumnList";
import { NotionToggle } from "./notionToggle";
import { NotionParagraph } from "./notionParagraph";
import { NotionH1 } from "./notionH1";
import { NotionH2 } from "./notionH2";
import { NotionH3 } from "./notionH3";

export function NotionBlock(props: BlockModel) {
  const { type, richText, children, caption, icon, checked, url, language, index } = props;

  switch (type) {
    case "paragraph":
      return (
        <p className="mb-4">
          <NotionRichText richText={richText} />
        </p>
      );
    case "heading_1":
      return (
        <h1 id={id} className="mb-4 mt-8 text-2xl font-bold md:text-3xl">
          <NotionRichText richText={richText} isTitle />
        </h1>
      );
    case "heading_2":
      return (
        <h2 id={id} className="mb-3 mt-6 text-xl font-bold md:text-2xl">
          <NotionRichText richText={richText} isTitle />
        </h2>
      );
    case "heading_3":
      return (
        <li className="mb-2">
          <NotionRichText richText={richText} />
          {children?.map((block) => <NotionBlock key={block.id} {...block}></NotionBlock>)}
        </li>
      );
    case "numbered_list_item":
      return (
        <li className="mb-2 list-none">
          {index && <span className="mr-[0.75rem]">{index}.</span>}
          <NotionRichText richText={richText} />
          {children?.map((block) => <NotionBlock key={block.id} {...block}></NotionBlock>)}
        </li>
      );
    case "to_do":
      return (
        <div className="mb-2 flex items-start">
          <input type="checkbox" checked={checked} readOnly className="mr-[0.75rem] mt-1 h-4 w-4 accent-green-600" />
          <div>
            <NotionRichText richText={richText} />
            {children?.map((block: any) => <NotionBlock key={block.id} {...block}></NotionBlock>)}
          </div>
        </div>
      );
    case "toggle":
      return <NotionToggle block={props} />;
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
          <SkeletonImage src={url} alt={imgCaption || "image"} width={700} height={400} className="rounded-lg" />
          {imgCaption && <figcaption className="mt-2 text-center text-sm text-gray-500">{imgCaption}</figcaption>}
        </figure>
      );
    case "divider":
      return <NotionDivider />;
    case "callout":
      return (
        <div className="mb-4 flex items-start rounded-lg bg-tag-code-block p-4">
          {icon && <div className="mr-4">{icon}</div>}
          <div className="min-w-0 flex-1">
            <NotionRichText richText={richText} />
            {children?.map((block: any) => (
              <div key={block.id}>
                <NotionBlock {...block} />
              </div>
            ))}
          </div>
        </div>
      );
    case "bookmark": // 新增 bookmark 处理逻辑
      return <>{url && <NotionBookmark url={url} />}</>;
    case "table":
      return <NotionTable {...props} />;
    case "link_to_page":
      return <NotionLinkToPage {...props} />;
    case "column_list":
      return (
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row">
          <NotionColumnList {...props} />
        </div>
      );
    default:
      console.warn(`Unsupported block type: ${type}`);

      return "";
  }
}
