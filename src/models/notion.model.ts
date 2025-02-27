import { NotionBlockType, PageResponse } from "@/interfaces/notion.interface";
import { ModelFactory } from "@/models/modelFactory";
import { dateUtilsFormateDate } from "@/utils/date.utls";
import { DatabaseObjectResponse, TextRichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export class PageModel extends ModelFactory<PageModel, PageModel> {
  static modelClass = PageModel;

  public id = "";
  public title = "";
  public cover = "";
  public publishDate = "";
  public description = "";
  public icon = "";
  public tags: TagModel[] = [];

  static createEntityFromResponse(data: DatabaseObjectResponse): PageModel {
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
  public type: NotionBlockType | "" = "";
  public richText: RichTextModel[] = [];
  public children: BlockModel[] = [];
  public checked?: boolean = false;
  public caption?: RichTextModel[] = [];
  public url? = "";
  public icon = "";
  public language = "";

  static generateEntityFromPromise(data: PageResponse["blocks"]): BlockModel[] {
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
      }

      const result = BlockModel.createEntity<BlockModel>({
        id,
        type,
        richText: RichTextModel.generateEntityFromPromise(value.rich_text),
        children: value.children,
        checked: value.checked,
        caption: value.caption,
        url,
        icon: value.icon?.emoji,
        language: value.language,
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
  public type: "text" | "mention" | "" = "";
  public icon = ""
  public description = ""

  static generateEntityFromPromise(data: TextRichTextItemResponse[]): RichTextModel[] {
    if (!data || !data.length) {
      return [];
    }
    return data.map((item) => {
      switch (item.type) {
        case "mention":
          return RichTextModel.createEntity({
            ...item.annotations,
            ...MentionModel.generateEntityFromPromise(item.mention),
            type: item.type,
          })
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
      .map((block) =>
        TocModel.createEntity({
          id: block.id,
          type: block.type,
          text: block.richText[0].content,
        })
      );
  }
}

export class MentionModel extends ModelFactory<MentionModel, MentionModel> {
  static modelClass = MentionModel;
  public link = ""
  public content = ""
  public icon = ""
  public description = ""

  static generateEntityFromPromise(data: any): MentionModel | undefined {
    if (!data) {
      return;
    }
    const value = data[data.type];
    return MentionModel.createEntity({
      link: value.href,
      content: value.title,
      icon: value.icon_url,
      description: value.description
    })
  }
}
