// exp
"use client";

import React from "react";
import Image, { type ImageProps } from "next/image";
import Skeleton from "./skeleton";

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

  return (
    <span className={`relative max-w-full overflow-hidden block ${className}`}>
      {isLoading && (
        <span className="absolute block top-0 left-0 h-full w-full">
          <Skeleton type={type}></Skeleton>
        </span>
      )}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        onLoad={() => setIsLoading(false)}
        className={`rounded-lg transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        } ${imageClassName}`}
        {...props}
      />
    </span>
  );
};
