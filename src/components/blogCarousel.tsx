"use client";

import { useState } from "react";
import Image from "next/image";

interface Post {
  id: number;
  title: string;
  excerpt: string;
  banner: string;
  tags: string[];
}

interface BlogCarouselProps {
  posts: Post[];
}

export default function BlogCarousel({ posts }: BlogCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + posts.length) % posts.length);
  };

  return (
    <div className="relative shadow-md p-6 h-[60%]">
      <div className={`relative w-full h-full overflow-hidden flex gap-10 -translate-x-[${currentIndex * 100}%] `}>
        {posts.map((post) => (
          <div
            key={post.id}
            className={`relative basis-[95%] grow-1 shrink-0 h-full transition-all duration-300 rounded-3xl overflow-hidden`}
          >
            <Image src={post.banner || "/placeholder.svg"} alt={post.title} fill objectFit="cover" />
            <div className="absolute top-0 left-0 bg-[linear-gradient(0deg,rgba(0,0,0,.67),transparent_75%)] text-white w-full h-full">
              <div className="absolute bottom-0 left-0 p-12">
                <h3 className="text-5xl font-semibold mb-3 text-gray-50">{post.title}</h3>
                <p className="text-xl">{post.excerpt}</p>
                {post.tags.map((tag, index) => (
                  <a
                    key={index}
                    href=""
                    className="text-sm text-[#33334c] bg-slate-200 px-4 py-1 rounded-lg text-center dark:text-white"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white p-2 rounded-full shadow-md"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white p-2 rounded-full shadow-md"
      >
        &#10095;
      </button>
    </div>
  );
}
