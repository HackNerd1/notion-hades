import { PageModel } from "@/models/notion.model";
import { GetPageResponse, ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints";

export interface PageResponse {
  page: GetPageResponse;
  blocks: ListBlockChildrenResponse["results"];
}

export type NotionBlockType =
  | "paragraph"
  | "heading_1"
  | "heading_2"
  | "heading_3"
  | "bulleted_list_item"
  | "numbered_list_item"
  | "to_do"
  | "toggle"
  | "code"
  | "quote"
  | "divider"
  | "image"
  | "callout"
  | "external"
  | "bookmark";

export type NotionColorType =
  | "gray"
  | "red"
  | "blue"
  | "green"
  | "yellow"
  | "brown"
  | "orange"
  | "purple"
  | "pink"
  | "default";

export interface NotionDataBase {
  hasMore: boolean;
  results: PageModel[];
  nextCursor: string;
}

export interface NotionDataBaseRequest {
  nextCursor?: string;
}
