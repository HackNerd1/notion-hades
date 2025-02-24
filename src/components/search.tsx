import { IconSearch } from "@/icons/search";

/*
 * @Descripttion:
 * @version: 0.0.1
 * @Author: Hansel
 * @Date: 2025-02-19 22:46:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-02-19 23:06:15
 */
export function Search() {
  return (
    <button
      className={`
      text-sm transition-all duration-300 bg-gray-800
      hover:bg-gray-700 hover:text-white h-full
      text-gray-400 flex gap-4 items-center 
      rounded-lg pl-3 pr-4 text-md`}
    >
      <IconSearch size={16}></IconSearch>
      Search
    </button>
  );
}
