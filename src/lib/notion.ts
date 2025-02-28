import { NotionDataBaseRequest } from "@/interfaces/notion.interface";
import { APIErrorCode, Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;
const homePageId = process.env.NOTION_HOME_PAGE_ID;

class NotionClientError extends Error {
  code: APIErrorCode;
  status: number;
  headers: any;
  body?: string;
  constructor(args: {
    code: APIErrorCode;
    status: number;
    message: string;
    headers: any;
    body?: string;
  }) {
    super(args.message);
    this.code = args.code;
    this.status = args.status;
    this.headers = args.headers;

    if (!args.body) {
      this.body = JSON.stringify({
        message: args.message,
        status: args.status,
        code: args.code,
      })
    } else {
      this.body = args.body;
    }
  }
}

export async function notionLibGetPublishedBlogPosts(param?: NotionDataBaseRequest) {
  return await notion.databases.query({
    database_id: databaseId!,
    start_cursor: param?.nextCursor,
    page_size: 9,
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
  });
}

export async function notionLibGetPost(pageId: string) {
  const response = await notion.pages.retrieve({ page_id: pageId });
  const blocks = await notion.blocks.children.list({
    block_id: pageId,
    page_size: 100,
  });

  return {
    page: response,
    blocks: blocks.results,
  };
}

// 获取页面
export async function notionLibGetPage(pageId: string) {
  return await notion.pages.retrieve({ page_id: pageId });
}

// 获取页面
export async function notionLibGetHomePage() {
  if (homePageId) {
    return await notionLibGetPost(homePageId);
  } else {
    throw new NotionClientError({
      code: APIErrorCode.InternalServerError,
      status: 500,
      message: "Missing environment variable NOTION_HOME_PAGE_ID",
      headers: {},
    })
  }
}

// 搜索页面
export async function notionLibSearchPosts(query: string) {
  const response = await notion.databases.query({
    database_id: databaseId!,
    filter: {
      and: [
        {
          property: "Public",
          checkbox: {
            equals: true,
          },
        },
        {
          or: [
            {
              property: "Name",
              title: {
                contains: query,
              },
            },
            {
              property: "Description",
              rich_text: {
                contains: query,
              },
            },
          ],
        },
      ],
    },
    sorts: [
      {
        property: "Published",
        direction: "descending",
      },
    ],
  })

  return response
}