import Image from "next/image";
// import { Clock } from "lucide-react"

interface Post {
  id: number;
  title: string;
  excerpt: string;
  banner: string;
  tags: string[];
}

interface BlogPostListProps {
  posts: Post[];
}

export default function BlogPostList({ posts }: BlogPostListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 gap-6 cursor-pointer mb-8">
      {posts.map((post) => (
        <article key={post.id} className="group relative overflow-hidden rounded-lg shadow-lg">
          {/* Main image */}
          <div className="relative aspect-[6/3] w-full overflow-hidden">
            <Image
              src={post.banner || "/placeholder.svg"}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-105"
            />
            {/* Overlay gradient */}
            <div className="absolute h-full w-full inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />

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
              {/* <span className="mr-2">{post.date}</span> */}
              {/* <span className="mr-2">•</span> */}
              <span>{post.tags.join(" • ")}</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
