import { notionApiRetrievePage } from "@/apis/notion-apis";
import { BlockModel, PageModel } from "@/models/notion.model";
import Link from "next/link";

export async function NotionLinkToPage(props: BlockModel) {
  const page: PageModel = await (await notionApiRetrievePage(props.pageId)).json();
  return (
    <Link
      href={`/post/${props.pageId}`}
      className="mb-4 flex w-fit gap-2 text-text-default transition-all duration-300 hover:text-text-default-hover"
    >
      {page.icon}
      <span className="underline">{page.title}</span>
    </Link>
  );
}
