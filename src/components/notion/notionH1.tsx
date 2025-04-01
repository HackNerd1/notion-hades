import { BlockModel } from "@/models/notion.model";
import NotionRichText from "./notionRichText";
import { NotionToggle } from "./notionToggle";

export function NotionH1(props: BlockModel) {
  return (
    <h1 id={props.id} className="mb-4 mt-8 text-2xl font-bold md:text-3xl">
      {props.isToggleable ? <NotionToggle {...props} /> : <NotionRichText richText={props.richText} isTitle />}
    </h1>
  );
}
