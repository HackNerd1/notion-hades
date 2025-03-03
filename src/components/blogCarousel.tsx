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

function openLink(url: string) {
  return function () {
    window.open(url, "_blank");
  };
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
    <div className="group relative mb-8 h-[60vh] overflow-hidden rounded-3xl shadow-md">
      <div
        className={`relative flex h-full w-full gap-10 transition-transform duration-500`}
        ref={slideRef}
        style={getSlideStyle(currentIndex)}
      >
        {posts.map((post, index) => (
          <div
            key={post.id}
            className={`grow-1 relative h-full shrink-0 basis-[100%] overflow-hidden rounded-3xl`}
            onClick={openLink(`/post/${post.id}`)}
          >
            <Link href={`/post/${post.id}`}>
              <Image src={post.cover} alt={post.title || "blog cover"} fill className="object-cover" />
            </Link>
            <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(0deg,rgba(0,0,0,.67),transparent_75%)] text-white">
              <div className="absolute bottom-0 left-0 w-full p-12" style={getSlideDesStyle(currentIndex, index)}>
                {/* <Link href={`/post/${post.id}`}> */}
                <h3 className="mb-4 line-clamp-4 cursor-pointer overflow-hidden text-ellipsis text-5xl font-semibold leading-[1.2] text-gray-50 transition-all duration-300 hover:text-text-title-default">
                  {post.icon && <span className="mr-4 text-4xl">{post.icon}</span>}
                  {post.title}
                </h3>
                {/* </Link> */}
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
        className="button-default absolute left-6 top-1/2 h-10 w-10 -translate-y-1/2 transform rounded-md p-2 opacity-100 transition-all disabled:cursor-not-allowed group-hover:opacity-100 group-hover:disabled:opacity-50 md:opacity-0"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        disabled={!posts.length || currentIndex === posts.length - 1}
        className="button-default absolute right-4 top-1/2 h-10 w-10 -translate-y-1/2 transform rounded-md p-2 opacity-100 transition-all disabled:cursor-not-allowed group-hover:opacity-100 group-hover:disabled:opacity-50 md:opacity-0"
      >
        &#10095;
      </button>
    </div>
  );
}
