"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
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

function getSlideStyle(index: number) {
  return {
    transform: `translateX(calc(calc(${100}% + 2.5rem) * -${index})`,
    transition: "transform 0.5s ease-in-out",
  };
}

function getSlideDesStyle(currentIndex: number, index: number) {
  let offset = "0";
  if (currentIndex < index) {
    offset = "20%";
  } else if (currentIndex > index) {
    offset = "-20%";
  }
  return {
    opacity: currentIndex === index ? 1 : 0,
    transform: `translateX(${offset})`,
    transition: "all 0.6s ease-in-out",
  };
}

let timer: NodeJS.Timeout;

function autoSlide(setCurrentIndex: Dispatch<SetStateAction<number>>, length: number) {
  timer = setTimeout(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % length);
    autoSlide(setCurrentIndex, length);
  }, 4000);
}

function clearAutoSlide() {
  clearTimeout(timer);
}

export default function BlogCarousel({ posts }: BlogCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + posts.length) % posts.length);
  };

  useEffect(() => {
    autoSlide(setCurrentIndex, posts.length);
    const slideNode = slideRef.current;
    slideNode?.addEventListener("mouseenter", clearAutoSlide);
    slideNode?.addEventListener("mouseleave", () => autoSlide(setCurrentIndex, posts.length));
    return () => {
      clearAutoSlide();
      slideNode?.removeEventListener("mouseenter", clearAutoSlide);
      slideNode?.removeEventListener("mouseenter", () => autoSlide(setCurrentIndex, posts.length));
    };
  }, []);

  return (
    <div className="relative shadow-md h-[60vh] rounded-3xl overflow-hidden mb-8 group">
      <div
        className={`relative w-full h-full flex gap-10 transition-transform duration-500`}
        ref={slideRef}
        style={getSlideStyle(currentIndex)}
      >
        {posts.map((post, index) => (
          <div key={post.id} className={`relative basis-[100%] grow-1 shrink-0 h-full rounded-3xl overflow-hidden`}>
            <Image src={post.banner || "/placeholder.svg"} alt={post.title} fill objectFit="cover" />
            <div className="absolute top-0 left-0 bg-[linear-gradient(0deg,rgba(0,0,0,.67),transparent_75%)] text-white w-full h-full">
              <div className="absolute bottom-0 left-0 p-12" style={getSlideDesStyle(currentIndex, index)}>
                <h3 className="text-5xl font-semibold mb-4 text-gray-50">{post.title}</h3>
                <p className="text-xl mb-2">{post.excerpt}</p>
                {post.tags.map((tag, index) => (
                  <a
                    key={index}
                    href=""
                    className="text-sm text-[#33334c] bg-[#ECECEC] px-4 py-1 rounded-md text-center mr-4"
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
        disabled={currentIndex === 0}
        className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-[#33334c] opacity-0 group-hover:opacity-100 text-white p-2 rounded-md shadow-md h-10 w-10 group-hover:disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        disabled={currentIndex === posts.length - 1}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-[#33334c] opacity-0 group-hover:opacity-100 text-white p-2 rounded-md shadow-md h-10 w-10 group-hover:disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        &#10095;
      </button>
    </div>
  );
}
