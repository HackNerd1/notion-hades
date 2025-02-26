import { ModelFactory } from "./modelFactory";
import { parse } from "node-html-parser";

export class BookMarkModel extends ModelFactory<BookMarkModel, BookMarkModel> {
  static modelClass = BookMarkModel;
  public title = "";
  public description = "";
  public favicon = "";
  public image = "";

  static createEntityFromResponse(html: string): BookMarkModel {
    const root = parse(html);

    const title = root.querySelector("title")?.text || "";
    const description = root.querySelector('meta[name="description"]')?.getAttribute("content") || "";
    const favicon = root.querySelector('link[rel="icon"]')?.getAttribute("href") || "";
    const image = root.querySelector('meta[property="og:image"]')?.getAttribute("content") || "";
    return BookMarkModel.createEntity({
      title,
      description,
      favicon,
      image,
    });
  }
}
