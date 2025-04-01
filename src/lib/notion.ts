import { HADES_SITE_CONFIG } from "@/config/site.config";
import { NotionDataBaseRequest } from "@/interfaces/notion.interface";
import { APIErrorCode, Client, LogLevel } from "@notionhq/client";
import { withCache } from "./cache";

const notion = new Client({ auth: HADES_SITE_CONFIG.notionApiKey, logLevel: LogLevel.DEBUG, });

enum NotionLibCacheKey {
  NOTION_LIB_GET_POST = "NOTION_LIB_GET_POST",
  NOTION_LIB_GET_HOME_PAGE = "NOTION_LIB_GET_HOME_PAGE",
  NOTION_LIB_RETRIEVE_HOME_PAGE = "NOTION_LIB_RETRIEVE_HOME_PAGE",
}

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
    database_id: HADES_SITE_CONFIG.databaseId!,
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

// 获取页面
export const notionLibGetPost = withCache(async (pageId: string) => {
  const response = await notionLibRetrievePage(pageId);
  const blocks = await notionLibGetBlocks(pageId)

  return {
    page: response,
    blocks: blocks.results,
  };
}, NotionLibCacheKey.NOTION_LIB_GET_POST);

// 获取页面
export async function notionLibRetrievePage(pageId: string) {
  return await notion.pages.retrieve({ page_id: pageId });
}

// 获取页面
export const notionLibGetHomePage = withCache(async () => {
  if (HADES_SITE_CONFIG.homePageId) {
    return await notionLibGetPost(HADES_SITE_CONFIG.homePageId);
  } else {
    throw new NotionClientError({
      code: APIErrorCode.InternalServerError,
      status: 500,
      message: "Missing environment variable NOTION_HOME_PAGE_ID",
      headers: {},
    })
  }
}, NotionLibCacheKey.NOTION_LIB_GET_HOME_PAGE)


// 获取首页
export const notionLibRetrieveHomePage = withCache(async () => {
  if (HADES_SITE_CONFIG.homePageId) {
    return await notionLibRetrievePage(HADES_SITE_CONFIG.homePageId);
  } else {
    throw new NotionClientError({
      code: APIErrorCode.InternalServerError,
      status: 500,
      message: "Missing environment variable NOTION_HOME_PAGE_ID",
      headers: {},
    })
  }
}, NotionLibCacheKey.NOTION_LIB_RETRIEVE_HOME_PAGE)

// 搜索页面
export async function notionLibSearchPosts(query: string) {
  const response = await notion.databases.query({
    database_id: HADES_SITE_CONFIG.databaseId!,
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

// 获取block
export async function notionLibGetBlocks(id: string) {
  return await notion.blocks.children.list({
    block_id: id,
    page_size: 100,
  })
}