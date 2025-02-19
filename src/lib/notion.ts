import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";



const notion = new Client({ auth: process.env.NOTION_API_KEY })
// const notionAPI = new NotionAPI()
const databaseId = process.env.NOTION_DATABASE_ID
// const pageId = process.env.NOTION_PAGE_ID



export async function getPublishedBlogPosts() {
  // await notionAPI.getPage(pageId!)
  return await notion.databases.query({
    database_id: databaseId!,
    page_size: 10,
    filter: {
      property: "Public",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "Published",
        direction: "descending",
      },
    ],
  })
}

export async function getBlogPost(pageId: string) {
  const response = await notion.pages.retrieve({ page_id: pageId })
  const blocks = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 100,
  })

  return {
    page: response,
    blocks: blocks.results,
  }
}

