"use client";

import { useState, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import { Moon } from "@/icons/moon";
import { Sun } from "@/icons/sun";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      className="rounded-full bg-gray-800 p-3 text-white shadow-lg transition-colors duration-300 hover:bg-gray-700"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun></Sun> : <Moon size={24} />}
    </button>
  );
}
