// exp
"use client";

import React from "react";
import Image, { type ImageProps } from "next/image";
import Skeleton from "./skeleton";

interface SkeletonImageProps extends ImageProps {
  imageClassName?: string;
}

export const SkeletonImage: React.FC<SkeletonImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  imageClassName = "",
  ...props
}) => {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <div className={`relative h-full w-full ${className}`}>
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-full">
          <Skeleton type="image"></Skeleton>
        </div>
      )}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        onLoad={() => setIsLoading(false)}
        className={`rounded-lg transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        } ${imageClassName}`}
        {...props}
      />
    </div>
  );
};
