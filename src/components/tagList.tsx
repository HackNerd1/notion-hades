interface TagListProps {
  tags: string[];
}

export default function TagList({ tags }: TagListProps) {
  return (
    <div>
      <div className="flex flex-wrap gap-2 scroll-auto mb-8">
        {tags.map((tag, index) => (
          <a
            key={index}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-1 rounded-full text-sm cursor-pointer"
          >
            {tag}
          </a>
        ))}
      </div>
    </div>
  );
}
