export function classNames(...args: any[]) {
  return args
    .reduce((acc, arg) => {
      if (typeof arg === "string") {
        acc.push(arg);
      } else if (Array.isArray(arg)) {
        acc.push(classNames(...arg)); // 递归处理数组
      } else if (typeof arg === "object") {
        for (const [key, value] of Object.entries(arg)) {
          if (value) acc.push(key); // 只有值为真时才添加类名
        }
      }
      return acc;
    }, [])
    .join(" ");
}
