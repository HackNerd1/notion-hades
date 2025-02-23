import { PageModel } from "@/models/notion.model";
import Image from "next/image";
import Link from "next/link";
interface BlogPostListProps {
  posts: PageModel[];
}

export default function BlogPostList({ posts }: BlogPostListProps) {
  return (
    <div className="grid grid-rows-1 grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-6 cursor-pointer mb-8">
      {posts.map((post) => (
        <Link href={`/post/${post.id}`} key={post.id} className="group">
          <article>
            {/* Main image */}
            <div className="relative aspect-[6/3] w-full group-hover:scale-105 transition-transform duration-300 rounded-lg shadow-lg overflow-hidden">
              <Image src={post.cover || "/placeholder.svg"} alt={post.title || "blog cover"} fill objectFit="cover" />
              {/* Overlay gradient */}
              <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-transparent via-black/20 to-black/80" />

              {/* Read time */}
              {/* <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center text-sm">
              {post.readTime}
            </div> */}
            </div>

            {/* Content overlay */}
            <div className="pt-4">
              {/* Title and metadata */}
              <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{post.title}</h3>
              <div className="flex items-center text-sm text-gray-300">
                {/* <span className="mr-2">•</span> */}
                <span className="mr-2">{post.publishDate}</span>
                <span className="mr-2">•</span>
                <span>{post.tags.map((tag) => tag.name).join(" • ")}</span>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
