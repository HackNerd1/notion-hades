import { IconPhoto } from "@/icons/photo";

interface SkeletonProps {
  count?: number;
  type?: "carousel" | "post" | "page" | "image" | "avatar" | "siteInfo";
}

export default function Skeleton({ count = 1, type }: SkeletonProps) {
  const skeletons = Array(count).fill(null);

  if (type === "carousel") {
    return (
      <div className="relative mb-8 h-[60vh] w-full overflow-hidden rounded-xl bg-gray-800/50">
        <div className="h-[60%] w-full bg-gray-700/50" />

        <div className="flex h-[40%] w-full animate-pulse flex-col space-y-3 p-4">
          {/* Author avatar and info placeholder */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gray-700/50" />
            <div className="flex-1 space-y-2">
              <div className="h-2 w-24 rounded-full bg-gray-700/50" />
            </div>
          </div>

          {/* Title placeholder */}
          <div className="space-y-2">
            <div className="h-4 w-3/4 rounded-full bg-gray-700/50" />
            <div className="h-4 w-1/2 rounded-full bg-gray-700/50" />
          </div>

          {/* Meta info placeholder */}
          <div className="flex gap-2 pt-2">
            <div className="h-2 w-16 rounded-full bg-gray-700/50" />
            <div className="h-2 w-16 rounded-full bg-gray-700/50" />
            <div className="h-2 w-16 rounded-full bg-gray-700/50" />
          </div>
        </div>
      </div>
    );
  }

  if (type === "image") {
    return (
      <div className="h-full w-full overflow-hidden rounded-xl bg-gray-800/50">
        <div className="flex h-full w-full animate-pulse items-center justify-center bg-gray-700/50 text-gray-400">
          <IconPhoto size={40}></IconPhoto>
        </div>
      </div>
    );
  }

  if (type === "avatar") {
    return <span className="inline-block h-full w-full animate-pulse rounded-full bg-gray-700/50" />;
  }

  if (type === "page") {
    return (
      <div className="relative mb-8 h-full w-full overflow-hidden rounded-xl bg-gray-800/50">
        <div className="h-[70%] w-full bg-gray-700/50" />

        <div className="flex h-[30%] w-full animate-pulse flex-col space-y-3 p-4">
          {/* Author avatar and info placeholder */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gray-700/50" />
            <div className="flex-1 space-y-2">
              <div className="h-2 w-24 rounded-full bg-gray-700/50" />
            </div>
          </div>

          {/* Title placeholder */}
          <div className="space-y-2">
            <div className="h-4 w-3/4 rounded-full bg-gray-700/50" />
            <div className="h-4 w-1/2 rounded-full bg-gray-700/50" />
          </div>

          {/* Meta info placeholder */}
          <div className="flex gap-2 pt-2">
            <div className="h-2 w-16 rounded-full bg-gray-700/50" />
            <div className="h-2 w-16 rounded-full bg-gray-700/50" />
            <div className="h-2 w-16 rounded-full bg-gray-700/50" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {skeletons.map((_, index) => (
        <div key={index} className="overflow-hidden rounded-xl bg-gray-800/50">
          {/* Image placeholder */}
          <div className="aspect-[4/3] w-full bg-gray-700/50" />

          {/* Content placeholder */}
          <div className="animate-pulse space-y-3 p-4">
            {/* Author avatar and info placeholder */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-700/50" />
              <div className="flex-1 space-y-2">
                <div className="h-2 w-24 rounded-full bg-gray-700/50" />
              </div>
            </div>

            {/* Title placeholder */}
            <div className="space-y-2">
              <div className="h-4 w-3/4 rounded-full bg-gray-700/50" />
              <div className="h-4 w-1/2 rounded-full bg-gray-700/50" />
            </div>

            {/* Meta info placeholder */}
            <div className="flex gap-2 pt-2">
              <div className="h-2 w-16 rounded-full bg-gray-700/50" />
              <div className="h-2 w-16 rounded-full bg-gray-700/50" />
              <div className="h-2 w-16 rounded-full bg-gray-700/50" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
