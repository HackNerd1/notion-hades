// exp
"use client";

import React from "react";
import Image, { type ImageProps } from "next/image";
import Skeleton from "./skeleton";

interface SkeletonImageProps extends ImageProps {
  imageClassName?: string;
  type?: "image" | "avatar";
}

function generateContainerStyle({ width, height }: Partial<SkeletonImageProps>) {
  return {
    height: height ? `${height}px` : undefined,
    width: width ? `${width}px` : undefined,
  };
}

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
    <div
      className={`relative h-full w-full max-w-full ${className}`}
      style={generateContainerStyle({ width, height, fill })}
    >
      {isLoading && (
        <div className="absolute top-0 left-0 h-full w-full">
          <Skeleton type={type}></Skeleton>
        </div>
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
    </div>
  );
};
