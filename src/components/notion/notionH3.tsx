import { BlockModel } from "@/models/notion.model";
import NotionRichText from "./notionRichText";

export function NotionH3(props: BlockModel) {
  return (
    <h3 id={props.id} className="mb-2 mt-4 text-lg font-bold md:text-xl">
      <NotionRichText richText={props.richText} isTitle />
    </h3>
  );
}
