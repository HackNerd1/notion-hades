import { LRUCache } from "lru-cache";
import { Metadata } from "next";

class HadesSiteConfig {
  // 背景帧率
  backgroundFPS = 30
  //  notion 数据库 id (required)
  databaseId = process.env.NOTION_DATABASE_ID;
  //  notion 首页 id (required)
  homePageId = process.env.NOTION_HOME_PAGE_ID;
  //  notion api key (required)
  notionApiKey = process.env.NOTION_API_KEY;

  metaData: Metadata = {
    // 网页标题
    title: "Hacknerd",
    // 网页描述
    description: "Passionate web developer and blogger.",
    keywords: "Hacknerd,blog,Next.js,TypeScript,Node.js,JavaScript,TypeScript,React,Vue,Web,前端,博客",
    authors: [{ name: "Hacknerd" }],
    creator: "Hacknerd",
    publisher: "Hacknerd",
    // 图标
    icons: {
      icon: "/favicon.ico",
    },
    category: "technology",
  }

  lurCache: LRUCache.Options<any, any, unknown> = {
    // 默认缓存时间
    ttl: 1000 * 60 * 60 * 24,
    // 最大缓存数
    max: 50
  }

}

export const HADES_SITE_CONFIG = new HadesSiteConfig()