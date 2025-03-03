import { Metadata } from "next";

class HadesSiteConfig implements Metadata {
  // 网页标题
  title = "Hackneard"
  // 网页描述
  description = "Passionate web developer and blogger."
  // 图标
  icons = {
    icon: "/favicon.ico"
  }
  // 背景帧率
  backgroundFPS = 30
  //  notion 数据库 id
  databaseId = process.env.NOTION_DATABASE_ID;
  //  notion 首页 id
  homePageId = process.env.NOTION_HOME_PAGE_ID;
  //  notion api key
  notionApiKey = process.env.NOTION_API_KEY;
  // 默认缓存时间
  cacheTime = 1000 * 60 * 60 * 24 * 15
}

export const HADES_SITE_CONFIG = new HadesSiteConfig()