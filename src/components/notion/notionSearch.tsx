"use client";

import type React from "react";

import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { IconSearch } from "@/icons/search";
import { notionApiSearchPosts } from "@/apis/notion-apis";
import { PageModel } from "@/models/notion.model";
import { IconLoading } from "@/icons/loading";
import { NotionTag } from "./notionTag";

export function NotionSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PageModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const debouncedSearch = useDebounce(async (searchQuery: string) => {
    setError("");

    if (searchQuery.trim() === "") {
      setResults([]);
      return;
    }
    setIsLoading(true);

    try {
      const data = await notionApiSearchPosts(searchQuery);
      setResults(data);
    } catch (error: any) {
      setError(`An error occurred while searching. ${error.message}`);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery);
  };

  return (
    <div className="h-full w-full">
      <section className="relative w-full">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search articles..."
          className="w-full rounded-lg bg-[#353a45] px-4 py-4 pl-10 pr-4 text-lg text-gray-400 focus:border-transparent focus:outline-none"
          aria-label="Search articles"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400">
          {isLoading ? <IconLoading classNames="animate-spin" size={22} /> : <IconSearch size={22} />}
        </span>
      </section>

      {results.length > 0 && (
        <>
          <section className="px-8 pt-4 text-lg font-bold text-white">Search Results:</section>
          <section>
            <ul className="max-h-[20rem] overflow-auto rounded-b-md bg-gray-800 px-4">
              {results.map((result) => (
                <li key={result.id} className="group transition-all duration-150">
                  <a
                    href={`/post/${result.id}`}
                    className="my-2 block rounded-md px-4 py-2 text-gray-400 ease-in-out hover:bg-[#4a9dc6] hover:text-white"
                  >
                    <h3 className="font-semibold">
                      {result.icon ? <span className="text-md mr-2">{result.icon}</span> : null} {result.title}
                    </h3>
                    {result.description && (
                      <p className="mt-1 text-sm text-gray-500 group-hover:text-white">{result.description}</p>
                    )}
                    {result.tags.length && (
                      // <p className="mt-1 text-sm text-gray-500 group-hover:text-white">{result.description}</p>
                      <div className="mt-2 flex gap-2">
                        {result.tags.map((tag, i) => (
                          <NotionTag {...tag} size="sm" key={i}></NotionTag>
                        ))}
                      </div>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      {query && results.length === 0 && (
        <div className="px-8 py-4 font-bold text-white">
          {isLoading ? "Searching..." : error || `No results found for "${query}"`}
        </div>
      )}
    </div>
  );
}
