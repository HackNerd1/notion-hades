import { PageModel } from "@/models/notion.model";
import Link from "next/link";
import { SkeletonImage } from "./skeletonImage";
interface BlogPostListProps {
  posts: PageModel[];
}

export default function BlogPostList({ posts }: BlogPostListProps) {
  return (
    <div className="mb-8 grid cursor-pointer grid-cols-1 grid-rows-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Link href={`/post/${post.id}`} key={post.id} className="group" target="_blank">
          <article>
            {/* Main image */}
            <div className="relative aspect-[6/3] w-full overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105">
              <SkeletonImage
                type="image"
                src={post.cover}
                alt={post.title || "blog cover"}
                fill
                className="h-full"
                imageClassName="object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent via-black/20 to-black/80" />

              {/* Read time */}
              {/* <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center text-sm">
              {post.readTime}
            </div> */}
            </div>

            {/* Content overlay */}
            <div className="pt-4">
              {/* Title and metadata */}
              <h3 className="mb-2 line-clamp-2 text-xl font-bold text-white transition-all duration-300 hover:text-text-title-default">
                {post.icon && <span className="mr-2">{post.icon}</span>}
                {post.title}
              </h3>
              {/* {post.description && <p className="text-sm text-gray-300 mb-2 line-clamp-2">{post.description}</p>} */}
              <div className="flex items-center text-sm text-gray-300">
                {/* <span className="mr-2">•</span> */}
                <span className="mr-2 text-nowrap">{post.publishDate}</span>
                <span className="mr-2">•</span>
                <span className="overflow-hidden overflow-ellipsis text-nowrap">
                  {post.tags.map((tag) => tag.name).join(" • ")}
                </span>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
