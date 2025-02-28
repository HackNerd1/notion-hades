interface TagListProps {
  tags: string[];
}

export default function TagList({ tags }: TagListProps) {
  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2 scroll-auto">
        {tags.map((tag, index) => (
          <a
            key={index}
            className="cursor-pointer rounded-full bg-gray-700 px-3 py-1 text-sm text-white"
          >
            {tag}
          </a>
        ))}
      </div>
    </div>
  );
}
