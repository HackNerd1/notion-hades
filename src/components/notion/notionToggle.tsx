import { BlockModel } from "@/models/notion.model";
import NotionRichText from "./notionRichText";
import { notionApiGetBlocks } from "@/apis/notion-apis";
import { NotionBlock } from "./notionBlock";

export async function NotionToggle(props: BlockModel) {
  let blocks: BlockModel[] | undefined = undefined;
  if (props.hasChildren) {
    blocks = await (await notionApiGetBlocks(props.id)).json();
  }

  return (
    <details>
      <summary className="mb-2 cursor-pointer">
        <span className="ml-1">
          <NotionRichText richText={props.richText} />
        </span>
      </summary>
      {blocks &&
        blocks.map((block) => (
          <div key={block.id} className="ml-4 text-base font-normal">
            <NotionBlock key={block.id} {...block} />
          </div>
        ))}
    </details>
  );
}
