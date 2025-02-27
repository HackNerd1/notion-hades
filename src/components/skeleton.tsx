import { IconPhoto } from "@/icons/photo";

interface SkeletonProps {
  count?: number;
  type?: "carousel" | "post" | "page" | "image" | "avatar" | "siteInfo";
}

export default function Skeleton({ count = 1, type }: SkeletonProps) {
  const skeletons = Array(count).fill(null);

  if (type === "carousel") {
    return (
      <div className="relative w-full h-[60vh] bg-gray-800/50 rounded-xl overflow-hidden mb-8">
        <div className="h-[70%] w-full bg-gray-700/50" />

        <div className="h-[30%] w-full p-4 flex space-y-3 flex-col animate-pulse">
          {/* Author avatar and info placeholder */}
          <div className="flex items-center gap-3 ">
            <div className="w-10 h-10 rounded-full bg-gray-700/50" />
            <div className="space-y-2 flex-1">
              <div className="h-2 bg-gray-700/50 rounded-full w-24" />
            </div>
          </div>

          {/* Title placeholder */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-700/50 rounded-full w-3/4" />
            <div className="h-4 bg-gray-700/50 rounded-full w-1/2" />
          </div>

          {/* Meta info placeholder */}
          <div className="flex gap-2 pt-2">
            <div className="h-2 bg-gray-700/50 rounded-full w-16" />
            <div className="h-2 bg-gray-700/50 rounded-full w-16" />
            <div className="h-2 bg-gray-700/50 rounded-full w-16" />
          </div>
        </div>
      </div>
    );
  }

  if (type === "image") {
    return (
      <div className="w-full h-full bg-gray-800/50 rounded-xl overflow-hidden">
        <div className="w-full h-full text-gray-400 flex justify-center items-center bg-gray-700/50 animate-pulse">
          <IconPhoto size={40}></IconPhoto>
        </div>
      </div>
    );
  }

  if (type === "avatar") {
    return <span className="w-full h-full rounded-full bg-gray-700/50 inline-block animate-pulse" />;
  }

  if (type === "page") {
    return (
      <div className="relative w-full h-full bg-gray-800/50 rounded-xl overflow-hidden mb-8">
        <div className="h-[70%] w-full bg-gray-700/50" />

        <div className="h-[30%] w-full p-4 flex space-y-3 flex-col animate-pulse">
          {/* Author avatar and info placeholder */}
          <div className="flex items-center gap-3 ">
            <div className="w-10 h-10 rounded-full bg-gray-700/50" />
            <div className="space-y-2 flex-1">
              <div className="h-2 bg-gray-700/50 rounded-full w-24" />
            </div>
          </div>

          {/* Title placeholder */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-700/50 rounded-full w-3/4" />
            <div className="h-4 bg-gray-700/50 rounded-full w-1/2" />
          </div>

          {/* Meta info placeholder */}
          <div className="flex gap-2 pt-2">
            <div className="h-2 bg-gray-700/50 rounded-full w-16" />
            <div className="h-2 bg-gray-700/50 rounded-full w-16" />
            <div className="h-2 bg-gray-700/50 rounded-full w-16" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {skeletons.map((_, index) => (
        <div key={index} className="bg-gray-800/50 rounded-xl overflow-hidden">
          {/* Image placeholder */}
          <div className="aspect-[4/3] w-full bg-gray-700/50" />

          {/* Content placeholder */}
          <div className="p-4 space-y-3 animate-pulse">
            {/* Author avatar and info placeholder */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-700/50" />
              <div className="space-y-2 flex-1">
                <div className="h-2 bg-gray-700/50 rounded-full w-24" />
              </div>
            </div>

            {/* Title placeholder */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-700/50 rounded-full w-3/4" />
              <div className="h-4 bg-gray-700/50 rounded-full w-1/2" />
            </div>

            {/* Meta info placeholder */}
            <div className="flex gap-2 pt-2">
              <div className="h-2 bg-gray-700/50 rounded-full w-16" />
              <div className="h-2 bg-gray-700/50 rounded-full w-16" />
              <div className="h-2 bg-gray-700/50 rounded-full w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
