import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { ModelFactory } from "./modelFactory";
import { dateUtilsFormateDate } from "@/utils/date";

export class PostModel extends ModelFactory<PostModel, PostModel> {
  static modelClass = PostModel

  public id = ''
  public title = '';
  public cover = ''
  public publishDate = ''
  public excerpt = ''
  public icon = ''
  public tags: TagModel[] = [];

  static generatePostModelFromResponse(data: DatabaseObjectResponse): PostModel {
    return this.createEntity({
      title: data.properties.Name.title[0].plain_text,
      id: data.id,
      icon: data.icon?.emoji,
      cover: data.cover?.external.url,
      publishDate: dateUtilsFormateDate(data.properties.Published.date.start, 'yyyy/MM/dd HH:mm'),
      // excerpt: data.properties.excerpt,
      tags: data.properties.Tags.multi_select.map((item: any) => TagModel.createEntity(item)),
    })
  }
}

export class TagModel extends ModelFactory<TagModel, TagModel> {
  static modelClass = TagModel
  public id = ''
  public name = ''
  public color = ''
}

export class BlockModel extends ModelFactory<BlockModel, BlockModel> {
  static modelClass = BlockModel

  public id = ''
  public type = ''

}