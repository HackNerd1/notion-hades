interface AboutUsProps {
  content: string;
}

export default function AboutUs({ content }: AboutUsProps) {
  return <p className="text-gray-600 dark:text-gray-300 overflow-hidden text-ellipsis">{content}</p>;
}
