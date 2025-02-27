"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Skeleton from "@/components/skeleton";
import { useActiveSection } from "@/hooks/useActiveSetion";
import { ContentTable } from "@/components/notion/contentTable";
import { NotionBlock } from "@/components/notion/notionBlock";
import { notionApiGetPostPage } from "@/apis/notion-apis";
import { NotionTag } from "@/components/notion/notionTag";
import { PostModel, TocModel } from "@/models/notion.model";
import { NotionDivider } from "@/components/notion/notionDivider";
import { SkeletonImage } from "@/components/skeletonImage";

// function getBannerStyle(url: string) {
//   return {
//     background: `url('${url}') center / cover no-repeat`,
//   };
// }

export default function BlogPost() {
  const [post, setPost] = useState<PostModel>();
  const [tableOfContents, setTableOfContents] = useState<TocModel[]>([]);
  const { id } = useParams();
  const headingIds = tableOfContents.map((item) => item.id);
  const activeId = useActiveSection(headingIds);

  useEffect(() => {
    async function fetchPost() {
      const data = await notionApiGetPostPage(id as string);

      setPost(data);

      setTableOfContents(data.toc);
    }
    if (id) {
      fetchPost();
    }
  }, [id]);

  if (!post) {
    return (
      <div className="px-6 w-full h-full flex justify-center items-center">
        <div className="max-w-6xl w-full">
          <Skeleton type="page"></Skeleton>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <section className="px-6">
        <figure className={`aspect-[4/1] min-h-64 w-full max-w-6xl m-auto rounded-2xl mb-12 `}>
          <SkeletonImage
            src={post.page.cover || "/placeholder.svg"}
            fill
            alt="blog cover"
            imageClassName="object-cover"
          ></SkeletonImage>
        </figure>
      </section>
      <article className="max-w-4xl m-auto px-12">
        <h1 className="text-4xl font-bold mb-4 leading-[1.5]">
          <span className="text-[1.3em]">{post.page.icon}</span> {post.page.title}
        </h1>

        <section className="flex gap-4 mb-8">
          {post.page.tags.map((tag, index) => (
            <NotionTag {...tag} key={index}></NotionTag>
          ))}
        </section>

        <div className="flex gap-8 mb-12">
          <div className="flex-[4_1_0%] min-w-0">
            {post.blocks.map((block) => (
              <div key={block.id}>
                <NotionBlock {...block}></NotionBlock>
              </div>
            ))}
          </div>

          <div className="opacity-100 flex-1 hidden sm:block">
            <ContentTable activeId={activeId} data={tableOfContents}></ContentTable>
          </div>
        </div>
        <NotionDivider />
        <section className="text-[var(--text-default)] font-normal"> {post.page.publishDate}</section>
      </article>
    </div>
  );
}
