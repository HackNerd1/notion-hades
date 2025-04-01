import { notionApiGetBlocks } from "@/apis/notion-apis";
import { BlockModel } from "@/models/notion.model";
import { NotionBlock } from "./notionBlock";

export async function NotionColumnList(props: BlockModel) {
  const blocks: BlockModel[] = await (await notionApiGetBlocks(props.id)).json();
  return blocks.map((block) => {
    if (block.hasChildren) {
      return (
        <div className="flex-1" key={block.id}>
          <NotionColumnList key={block.id} {...block} />
        </div>
      );
    } else {
      return (
        <div className="flex-1" key={block.id}>
          <NotionBlock {...block} />
        </div>
      );
    }
  });
}
