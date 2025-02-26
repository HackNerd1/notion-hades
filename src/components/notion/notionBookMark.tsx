"use client";

import { useState, useEffect } from "react";
import { SkeletonImage } from "../skeletonImage";
import { BookMarkModel } from "@/models/bookmard.model";
import { notionApiGetMetaData } from "@/apis/notion-apis";

// interface BookmarkMetadata {
//   title: string;
//   description: string;
//   favicon: string;
//   image: string;
// }

interface BookmarkBlockProps {
  url: string;
}

// const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// function getCachedMetadata(url: string): BookmarkMetadata | null {
//   const cached = localStorage.getItem(`bookmark-${url}`);
//   if (cached) {
//     const { data, timestamp } = JSON.parse(cached);
//     if (Date.now() - timestamp < CACHE_DURATION) {
//       return data;
//     }
//   }
//   return null;
// }

// function setCachedMetadata(url: string, data: BookmarkMetadata) {
//   localStorage.setItem(`bookmark-${url}`, JSON.stringify({ data, timestamp: Date.now() }));
// }

export function NotionBookmark({ url }: BookmarkBlockProps) {
  const [metadata, setMetadata] = useState<BookMarkModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      // const cachedData = getCachedMetadata(url);
      // if (cachedData) {
      //   setMetadata(cachedData);
      //   setIsLoading(false);
      //   return;
      // }

      try {
        const response = await notionApiGetMetaData(url);
        setMetadata(response);
      } catch (err) {
        setError("Failed to load bookmark data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetadata();
  }, [url]);

  if (isLoading) {
    return <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-24 rounded-lg mb-4"></div>;
  }

  if (error) {
    return <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 p-4 rounded-lg mb-4">{error}</div>;
  }

  if (!metadata) {
    return null;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative mb-4 group overflow-hidden rounded-lg border border-gray-700 hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex flex-col md:flex-row">
        {metadata.image && (
          <div className="h-48 md:h-auto relative flex-[3_1_0]">
            <SkeletonImage
              src={metadata.image || "/placeholder.svg"}
              alt={metadata.title}
              type="image"
              fill
              imageClassName="object-cover"
            />
          </div>
        )}
        <div className="p-4 flex-[4_1_0] min-w-0">
          <div className="flex items-center mb-2">
            {metadata.favicon && (
              <SkeletonImage type="avatar" src={metadata.favicon} alt="" width={32} height={32} className="mr-2" />
            )}
            <h3 className="flex-1 text-nowrap overflow-hidden overflow-ellipsis text-lg font-semibold text-blue-600 dark:text-blue-400">
              {metadata.title}
            </h3>
          </div>
          <p className="text-sm text-gray-400 mb-2 overflow-hidden overflow-ellipsis max-h-[2.5rem]">
            {metadata.description}
          </p>
          <div className="flex items-center text-sm text-gray-500text-gray-400">
            {/* <ExternalLink size={14} className="mr-1" /> */}
            {new URL(url).hostname}
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 h-full w-full opacity-0 group-hover:opacity-100 bg-[var(--bookmark-hover)] transition-all duration-300"></div>
    </a>
  );
}
