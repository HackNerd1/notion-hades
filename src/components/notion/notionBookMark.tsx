"use client";

import { useState, useEffect } from "react";
import { SkeletonImage } from "../skeletonImage";
import { BookMarkModel } from "@/models/bookmark.model";
import { notionApiGetMetaData } from "@/apis/notion-apis";
import { IconLink } from "@/icons/link";
import { Alert } from "../alert";
interface BookmarkBlockProps {
  url: string;
}

export function NotionBookmark({ url }: BookmarkBlockProps) {
  const [metadata, setMetadata] = useState<BookMarkModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
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
    return <div className="mb-4 h-24 animate-pulse rounded-lg bg-gray-700"></div>;
  }

  if (error) {
    return <Alert message={error} type="error"></Alert>;
  }

  if (!metadata) {
    return null;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative mb-4 block overflow-hidden rounded-lg border border-gray-700 transition-shadow duration-300 hover:shadow-md"
    >
      <div className="flex flex-col md:flex-row">
        {metadata.image && (
          <div className="relative h-48 flex-[3_1_0] md:h-auto">
            <SkeletonImage
              src={metadata.image}
              alt={metadata.title}
              type="image"
              fill
              className="h-full"
              imageClassName="object-cover "
            />
          </div>
        )}
        <div className="min-w-0 flex-[4_1_0] p-4">
          <div className="mb-2 flex items-center">
            {metadata.favicon && (
              <SkeletonImage type="avatar" src={metadata.favicon} alt="" width={32} height={32} className="mr-2" />
            )}
            <h3 className="flex-1 overflow-hidden overflow-ellipsis text-nowrap text-lg font-semibold text-white">
              {metadata.title}
            </h3>
          </div>
          <p className="mb-2 max-h-[2.5rem] overflow-hidden overflow-ellipsis text-sm text-gray-400">
            {metadata.description}
          </p>
          <div className="text-gray-500text-gray-400 flex items-center text-sm">
            <IconLink size={14} classNames="mr-1" />
            {new URL(url).hostname}
          </div>
        </div>
      </div>
      <div className="absolute left-0 top-0 h-full w-full bg-bookmark-hover opacity-0 transition-all duration-300 group-hover:opacity-100"></div>
    </a>
  );
}
