import { ContentTable } from "@/components/notion/contentTable";
import { NotionBlock } from "@/components/notion/notionBlock";
import { notionApiGetPostPage } from "@/apis/notion-apis";
import { NotionTag } from "@/components/notion/notionTag";
import { PostModel } from "@/models/notion.model";
import { NotionDivider } from "@/components/notion/notionDivider";
import { SkeletonImage } from "@/components/skeletonImage";
import { Alert } from "@/components/alert";
import { Metadata } from "next";
import { HADES_SITE_CONFIG } from "@/config/site.config";

export default async function BlogPost({ params }: { params: { id: string } }) {
  try {
    const id = (await params).id;
    const post: PostModel = await (await notionApiGetPostPage(id as string)).json();
    const toc = post.toc;

    return (
      <div className="mx-auto">
        <section className="px-6">
          <figure className={`m-auto mb-12 aspect-[4/1] h-full min-h-64 w-full max-w-6xl rounded-2xl`}>
            <SkeletonImage
              src={post.page.cover}
              fill
              alt="blog cover"
              className="h-full"
              imageClassName="object-cover"
            ></SkeletonImage>
          </figure>
        </section>
        <article className="m-auto max-w-4xl px-12">
          <h1 className="leading-1 mb-4 text-4xl font-bold md:leading-[1.5]">
            <span className="text-[1.3em]">{post.page.icon}</span> {post.page.title}
          </h1>

          <section className="mb-8 flex flex-wrap gap-2 md:gap-4">
            {post.page.tags.map((tag, index) => (
              <NotionTag {...tag} key={index}></NotionTag>
            ))}
          </section>

          <div className="mb-12 flex gap-8">
            <div className="min-w-0 flex-[4_1_0%]">
              {post.blocks.map((block) => (
                <NotionBlock {...block} key={block.id}></NotionBlock>
              ))}
            </div>

            <div className="hidden flex-1 opacity-100 sm:block">
              <ContentTable data={toc}></ContentTable>
            </div>
          </div>
          <NotionDivider />
          <section className="font-normal text-text-default"> {post.page.publishDate}</section>
        </article>
      </div>
    );
  } catch (error: any) {
    return (
      <div className="flex h-full w-full items-center justify-center px-6">
        <Alert type="error" message={`Error fetching blog post: ${error.message}`}></Alert>
      </div>
    );
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = (await params).id;
  const post: PostModel = await (await notionApiGetPostPage(id as string)).json();
  return {
    title: `${post.page.title}${HADES_SITE_CONFIG.metaData.title ? ` | ${HADES_SITE_CONFIG.metaData.title}` : ""}`,
  };
}
