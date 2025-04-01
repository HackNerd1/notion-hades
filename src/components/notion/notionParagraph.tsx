import { BlockModel } from "@/models/notion.model";
import NotionRichText from "./notionRichText";

export function NotionParagraph(props: BlockModel) {
  return (
    <p className="mb-4 text-base font-normal">
      <NotionRichText richText={props.richText} />
    </p>
  );
}
