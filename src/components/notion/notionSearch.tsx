"use client";

import type React from "react";

import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { IconSearch } from "@/icons/search";
import { notionApiSearchPosts } from "@/apis/notion-apis";
import { PageModel } from "@/models/notion.model";
import { IconLoading } from "@/icons/loading";

export function NotionSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PageModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useDebounce(async (searchQuery: string) => {
    setResults([]);
    if (searchQuery.trim() === "") {
      return;
    }

    setIsLoading(true);

    try {
      const data = await notionApiSearchPosts(searchQuery);
      setResults(data);
    } catch (err) {
      // setError("An error occurred while searching. Please try again.");
      console.error(err);
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
    <div className="w-full h-full">
      <section className="relative w-full">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search articles..."
          className="text-lg w-full px-4 py-4 pl-10 pr-4 text-gray-400 bg-[#353a45] rounded-lg focus:outline-none focus:border-transparent"
          aria-label="Search articles"
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {isLoading ? <IconLoading classNames="animate-spin" size={22} /> : <IconSearch size={22} />}
        </span>
      </section>

      {results.length > 0 && (
        <>
          <section className="pt-4 px-8 text-white font-bold text-lg">Search Results:</section>
          <section>
            <ul className="bg-gray-800 px-4 max-h-[20rem] rounded-b-md overflow-auto">
              {results.map((result) => (
                <li key={result.id}>
                  <a
                    href={`/post/${result.id}`}
                    className="block py-2 px-4 rounded-md my-2 text-gray-400 hover:text-white hover:bg-[#4a9dc6] transition-all duration-150 ease-in-out"
                  >
                    <h3 className="font-semibold ">{result.title}</h3>
                    {/* <p className="mt-1 text-sm text-gray-600">{result.excerpt}</p> */}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}

      {query && results.length === 0 && (
        <div className="py-4 px-8 text-white font-bold">
          {isLoading ? "Searching..." : `No results found for "${query}"`}{" "}
        </div>
      )}
    </div>
  );
}
