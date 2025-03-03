// exp
"use client";

import React from "react";
import Image, { type ImageProps } from "next/image";
import Skeleton from "./skeleton";
import { IconNoImage } from "@/icons/noImage";

interface SkeletonImageProps extends ImageProps {
  imageClassName?: string;
  type?: "image" | "avatar";
}

// function generateContainerStyle({ width, height }: Partial<SkeletonImageProps>) {
//   return {
//     height: height ? `${height}px` : undefined,
//     width: width ? `${width}px` : undefined,
//   };
// }

export const SkeletonImage: React.FC<SkeletonImageProps> = ({
  src,
  alt,
  width,
  height,
  type = "image",
  className = "",
  imageClassName = "",
  fill,
  ...props
}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  if (error || !src) {
    return (
      <span
        className={`flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-gray-800/50 py-24 text-gray-400 ${className}`}
      >
        <IconNoImage size={40} classNames="mb-2"></IconNoImage>
        Failed to load image
      </span>
    );
  }

  return (
    <span className={`relative block max-w-full overflow-hidden ${className}`}>
      {isLoading && (
        <span className="absolute left-0 top-0 block h-full w-full">
          <Skeleton type={type}></Skeleton>
        </span>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        onLoad={() => setIsLoading(false)}
        onError={() => setError(true)}
        className={`rounded-lg transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        } ${imageClassName}`}
        {...props}
      />
    </span>
  );
};
