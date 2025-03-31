import { BlockModel } from "@/models/notion.model";
import NotionRichText from "./notionRichText";
import { notionApiGetBlocks } from "@/apis/notion-apis";
import { classNames } from "@/utils/main.utils";
import { NotionBlock } from "./notionBlock";

interface NotionToggleProps {
  block: BlockModel;
  index?: number;
}

export async function NotionToggle({ block, index = 0 }: NotionToggleProps) {
  let blocks: BlockModel[] | undefined = undefined;
  if (block.hasChildren) {
    blocks = await (await notionApiGetBlocks(block.id)).json();
  }
  const detailsClass = classNames({
    "pl-4": index !== 0,
  });

  return block.hasChildren ? (
    <details className={detailsClass}>
      <summary className="cursor-pointer">
        <span className="ml-1">
          <NotionBlock {...block} />
        </span>
      </summary>
      {blocks && blocks.map((block) => <NotionToggle key={block.id} block={block} index={index + 1}></NotionToggle>)}
    </details>
  ) : (
    <span className="pl-5">
      <NotionRichText richText={block.richText} />
    </span>
  );
}
