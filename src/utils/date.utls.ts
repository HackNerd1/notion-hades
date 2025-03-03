'use client'
// 日期格式化
export function dateUtilsFormateDate(data: any, formate: string) {
  if (!data) {
    return "";
  }
  const date = new Date(data);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }

  const formatMap: { [key: string]: string } = {
    yyyy: date.getFullYear().toString(),
    MM: (date.getMonth() + 1).toString().padStart(2, "0"),
    dd: date.getDate().toString().padStart(2, "0"),
    HH: date.getHours().toString().padStart(2, "0"),
    mm: date.getMinutes().toString().padStart(2, "0"),
    ss: date.getSeconds().toString().padStart(2, "0"),
    SSS: date.getMilliseconds().toString().padStart(3, "0"),
  };

  return formate.replace(/yyyy|MM|dd|HH|mm|ss|SSS/g, (match) => formatMap[match]);
}
