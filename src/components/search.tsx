import { SearchIcon } from "@/icons/search";

/*
 * @Descripttion:
 * @version: 0.0.1
 * @Author: Hansel
 * @Date: 2025-02-19 22:46:07
 * @LastEditors: Hansel
 * @LastEditTime: 2025-02-19 23:06:15
 */
export function Search() {
  return (
    <button className="transition-all duration-300 hover:bg-[#282828] h-full text-gray-400 flex gap-4 items-center rounded-lg px-3 text-md">
      <SearchIcon size={16}></SearchIcon>
    </button>
  );
}
