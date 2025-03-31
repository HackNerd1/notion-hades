import { BlockModel } from "@/models/notion.model";
import { NotionToggle } from "./notionToggle";
import NotionRichText from "./notionRichText";

export function NotionParagraph(props: BlockModel) {
  return (
    <p className="mb-4">
      {props.isToggleable ? <NotionToggle block={props} /> : <NotionRichText richText={props.richText} />}
    </p>
  );
}
