import { BlockModel } from "@/models/notion.model";
import NotionRichText from "./notionRichText";

export function NotionH2(props: BlockModel) {
  return (
    <h2 id={props.id} className="mb-3 mt-6 text-xl font-bold md:text-2xl">
      <NotionRichText richText={props.richText} isTitle />
    </h2>
  );
}
