"use client";
import { IconSearch } from "@/icons/search";
import { useState } from "react";
import { Modal } from "./modal";
import { NotionSearch } from "./notion/notionSearch";

export function Search() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <button
        className={`
          text-sm transition-all duration-300 bg-[#353a45]
        hover:bg-gray-700 hover:text-white h-full
        text-gray-400 flex gap-2 items-center font-normal
          rounded-lg pl-4 pr-8 py-2 text-md`}
        onClick={openModal}
      >
        <IconSearch size={20}></IconSearch>
        Search articles...
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} showHeader={false}>
        <NotionSearch></NotionSearch>
      </Modal>
    </>
  );
}
