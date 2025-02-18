export interface Title {
  title: string;
  children?: React.ReactNode;
}

export function Title(props: Title) {
  return (
    <div className="text-3xl font-semibold mb-4 text-gray-800 dark:text-white flex justify-between align-center overflow-hidden whitespace-nowrap">
      <span className="overflow-ellipsis flex-1">{props.title}</span>
      <span className="overflow-ellipsis">{props.children}</span>
    </div>
  );
}
