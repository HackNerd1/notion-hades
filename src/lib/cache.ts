'use client'
interface CacheData<T> {
  value: T; // 缓存的值
  expiry: number; // 缓存的过期时间（毫秒）
}

// 设置缓存
function cacheLibSetCache<T>(key: string, value: T, ttl: number): void {
  const cacheData: CacheData<T> = {
    value: value,
    expiry: new Date().getTime() + ttl // 计算缓存的过期时间
  };
  localStorage.setItem(key, JSON.stringify(cacheData)); // 将缓存数据保存到 localStorage
}

// 获取缓存
function cacheLibGetCache<T>(key: string): T | null {
  const cachedData = localStorage.getItem(key);

  if (!cachedData) {
    return null; // 没有缓存数据
  }

  const { value, expiry }: CacheData<T> = JSON.parse(cachedData);

  // 检查缓存是否过期
  if (new Date().getTime() > expiry) {
    cacheLibRemoveCache(key); // 删除过期缓存
    return null; // 返回 null 表示缓存过期
  }

  return value; // 返回缓存的值
}

// 删除缓存
function cacheLibRemoveCache(key: string): void {
  localStorage.removeItem(key); // 删除指定的缓存
}


// 缓存装饰器，默认15天过期
export function useCache<F extends (...args: any[]) => any>(fn: F, ttl: number = 1000 * 60 * 60 * 24 * 15): (...args: Parameters<F>) => Promise<Awaited<ReturnType<F>>> {
  return async function (...args) {
    const key = fn.name;
    const cacheKey = `${key}-${args.join('-')}`; // 使用函数名和参数作为缓存键

    // 先从缓存中尝试获取数据
    const cachedResult = cacheLibGetCache(cacheKey);
    if (cachedResult) {
      console.log('返回缓存数据');
      return cachedResult; // 如果有缓存数据，直接返回
    }

    // 如果没有缓存，调用原函数获取数据
    const result = await fn.apply(this, args);

    // 将结果存入缓存
    cacheLibSetCache(cacheKey, result, ttl);
    return result;
  };
}
