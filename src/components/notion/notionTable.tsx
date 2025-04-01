// import { notionApiGetTable } from "@/apis/notion-apis";
import { BlockModel, RichTextModel } from "@/models/notion.model";
import { Alert } from "../alert";
import { notionApiGetTable } from "@/apis/notion-apis";
import NotionRichText from "./notionRichText";

export default async function NotionTable(props: BlockModel) {
  try {
    const blocks: RichTextModel[][][] = await (await notionApiGetTable(props.id)).json();
    const headers = props.hasColumnHeader ? blocks[0] : [];
    const body = props.hasColumnHeader ? blocks.slice(1) : blocks;

    return (
      <div className="mb-6 overflow-auto overflow-x-auto">
        <table className="min-w-full overflow-hidden rounded-md">
          <thead>
            <tr className="bg-gray-700 text-left font-semibold">
              {props.hasRowHeader &&
                headers.map((cell, i: number) => (
                  <th key={i} className="min-w-20 px-4 py-3.5">
                    <NotionRichText richText={cell} />
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 bg-gray-900">
            {body.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}>
                {row.map((cell, j: number) => (
                  <td key={j} className={"px-4 py-4" + (props.hasRowHeader && j === 0 ? " bg-gray-700" : "")}>
                    <NotionRichText richText={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } catch (error: any) {
    return (
      <div className="flex h-full w-full items-center justify-center px-6">
        <Alert type="error" message={`Error fetching blog post: ${error.message}`}></Alert>
      </div>
    );
  }
}
