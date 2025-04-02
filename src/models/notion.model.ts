import { NotionBlockType, PageResponse } from "@/interfaces/notion.interface";
import { ModelFactory } from "@/models/modelFactory";
import { dateUtilsFormateDate } from "@/utils/date.utls";

export class PageModel extends ModelFactory<PageModel, PageModel> {
  static modelClass = PageModel;

  public id = "";
  public title = "";
  public cover = "";
  public publishDate = "";
  public description = "";
  public icon = "";
  public tags: TagModel[] = [];

  static createEntityFromResponse(data: any): PageModel {
    return this.createEntity({
      title: data.properties.Name?.title[0].plain_text || data.properties.title?.title[0].plain_text,
      id: data.id,
      icon: data.icon?.emoji || data.icon?.file?.url,
      cover: data.cover?.external?.url || data.cover?.file?.url,
      publishDate: dateUtilsFormateDate(data.properties.Published?.date.start, "yyyy/MM/dd HH:mm"),
      description: data.properties.Description?.rich_text[0]?.plain_text,
      tags: data.properties.Tags?.multi_select.map((item: any) => TagModel.createEntity(item)),
    });
  }
}

export class BlockModel extends ModelFactory<BlockModel, BlockModel> {
  static modelClass = BlockModel;

  public id = "";
  public index = 0;
  public type: NotionBlockType | "" = "";
  public richText: RichTextModel[] = [];
  public children: BlockModel[] = [];
  public checked?: boolean = false;
  public caption?: RichTextModel[] = [];
  public url = "";
  public icon = "";
  public language = "";
  public tableWidth: number = 0
  public hasColumnHeader = false
  public hasRowHeader = false
  public pageId = ""
  public hasChildren = false
  public isToggleable = false

  static generateEntityFromPromise(data: any[]): BlockModel[] {
    let index: number | undefined = undefined
    if (!data || !data.length) {
      return [];
    }
    return data.map((block) => {
      const { type, id } = block;
      const value = block[type];
      let url;
      if (type === "image") {
        url = value.type === "external" ? value.external?.url : value.file?.url;
      } else if (type === "bookmark") {
        url = value.url;
      } else if (type === "video") {
        url = value.type === "external" ? value.external?.url : value.file?.url;
      } else if (type === "audio") {
        url = value.type === "external" ? value.external?.url : value.file?.url;
      }

      if (type === "numbered_list_item") {
        index = index === undefined ? 1 : index + 1
      } else {
        index = undefined
      }

      const result = BlockModel.createEntity<BlockModel>({
        id,
        type,
        richText: RichTextModel.generateEntityFromPromise(value.rich_text),
        children: value.children,
        checked: value.checked,
        caption: RichTextModel.generateEntityFromPromise(value.caption),
        url,
        index,
        icon: value.icon?.emoji,
        language: value.language,
        tableWidth: value.table_width,
        hasColumnHeader: value.has_column_header,
        hasRowHeader: value.has_row_header,
        pageId: value.page_id,
        hasChildren: block.has_children,
        isToggleable: value.is_toggleable
        // tableCells: value.table_row?.cells.map((cell: any) => RichTextModel.generateEntityFromPromise(cell))
      });
      return result;
    });
  }
}

export class PostModel extends ModelFactory<PostModel, PostModel> {
  static modelClass = PostModel;

  public page: PageModel = PageModel.createEntity();

  public blocks: BlockModel[] = [];

  public toc: TocModel[] = [];

  static createEntityFromResponse({ page, blocks }: PageResponse): PostModel {
    const blockEntity = BlockModel.generateEntityFromPromise(blocks);

    return {
      page: PageModel.createEntityFromResponse(page),
      blocks: blockEntity,
      toc: TocModel.generateEntityFromPromise(blockEntity),
    };
  }
}

export class RichTextModel extends ModelFactory<RichTextModel, RichTextModel> {
  static modelClass = RichTextModel;

  public bold = false;
  public code = false;
  public color: string = "default";
  public italic = false;
  public strikethrough = false;
  public underline = false;
  public content = "";
  public link = "";
  public type: "text" | "mention" | "page" | "user" | "paragraph" | "heading_1" | "heading_2" | "heading_3" | "" = "";
  public icon = ""
  public description = ""
  public pageId = ""

  static generateEntityFromPromise(data: any[]): RichTextModel[] {
    if (!data || !data.length) {
      return [];
    }
    return data.map((item) => {
      switch (item.type) {
        case "mention":
          switch (item.mention.type) {
            case "page":
              return RichTextModel.createEntity({
                ...item.annotations,
                pageId: item.mention.page.id,
                type: item.mention.type,
              })
            case "user":
              return RichTextModel.createEntity({
                ...item.annotations,
                content: item.plain_text,
                type: item.mention.type,
              })
            default:
              const value = item.mention[item.mention.type];
              return RichTextModel.createEntity({
                ...item.annotations,
                link: value.href,
                content: value.title,
                icon: value.icon_url,
                description: value.description,
                type: item.type,
              })
          }
        case "text":
          return RichTextModel.createEntity({
            ...item.annotations,
            ...item.text,
            link: item.text?.link?.url,
            type: item.type,
          })
      }
    });
  }
}

export class TagModel extends ModelFactory<TagModel, TagModel> {
  static modelClass = TagModel;
  public id = "";
  public name = "";
  public color = "";
}

export class TocModel extends ModelFactory<TocModel, TocModel> {
  static modelClass = TocModel;
  public id = "";
  public type = "";
  public text = "";

  static generateEntityFromPromise(blocks: BlockModel[]): TocModel[] {
    if (!blocks || !blocks.length) {
      return [];
    }
    return blocks
      .filter((block) => block.type === "heading_1" || block.type === "heading_2" || block.type === "heading_3")
      .map((block) => {
        return TocModel.createEntity({
          id: block.id,
          type: block.type,
          text: block.richText.map((item) => item.content).join(""),
        })
      });
  }
}

export class TableModel extends ModelFactory<TableModel, TableModel> {
  static modelClass = TableModel;

  static generateEntityFromPromise(blocks: any[]): RichTextModel[][][] {
    if (!blocks || !blocks.length) {
      return [];
    }
    return blocks.map(ele =>
      ele.table_row?.cells?.map((cell: any) => RichTextModel.generateEntityFromPromise(cell))
    )
  }
}