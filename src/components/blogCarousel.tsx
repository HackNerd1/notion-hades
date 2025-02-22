"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NotionTag } from "./notion/notionTag";
import { PageModel } from "@/models/notion.model";

interface BlogCarouselProps {
  posts: PageModel[];
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

let timer: NodeJS.Timeout | null;

function autoSlide(setCurrentIndex: Dispatch<SetStateAction<number>>, length: number) {
  if (timer) return;
  timer = setTimeout(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % length);
    autoSlide(setCurrentIndex, length);
  }, 4000);
}

function clearAutoSlide() {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
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
  }, [posts]);

  return (
    <div className="relative shadow-md h-[60vh] rounded-3xl overflow-hidden mb-8 group">
      <div
        className={`relative w-full h-full flex gap-10 transition-transform duration-500`}
        ref={slideRef}
        style={getSlideStyle(currentIndex)}
      >
        {posts.map((post, index) => (
          <div key={post.id} className={`relative basis-[100%] grow-1 shrink-0 h-full rounded-3xl overflow-hidden`}>
            <Link href={`/post/${post.id}`}>
              <Image src={post.cover || "/placeholder.svg"} alt={post.title} fill objectFit="cover" />
            </Link>
            <div className="absolute top-0 left-0 bg-[linear-gradient(0deg,rgba(0,0,0,.67),transparent_75%)] text-white w-full h-full">
              <div className="absolute bottom-0 left-0 p-12" style={getSlideDesStyle(currentIndex, index)}>
                <Link href={`/post/${post.id}`}>
                  <h3 className="text-5xl font-semibold mb-4 text-gray-50">{post.title}</h3>
                </Link>
                {/* <p className="text-xl mb-2">{post.excerpt}</p> */}
                {post.tags.map((tag, i) => (
                  <NotionTag {...tag} key={i}></NotionTag>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        disabled={!posts.length || currentIndex === 0}
        className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-[#33334c] opacity-0 group-hover:opacity-100 text-white p-2 rounded-md shadow-md h-10 w-10 group-hover:disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        disabled={!posts.length || currentIndex === posts.length - 1}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-[#33334c] opacity-0 group-hover:opacity-100 text-white p-2 rounded-md shadow-md h-10 w-10 group-hover:disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        &#10095;
      </button>
    </div>
  );
}
