import { HADES_SITE_CONFIG } from "@/config/site.config";
import { LRUCache } from "lru-cache";
const lurCache = new LRUCache(HADES_SITE_CONFIG.lurCache);

// 缓存装饰器，默认15天过期
export function withCache<F extends (...args: any[]) => any>(fn: F, key: string): (...args: Parameters<F>) => Promise<Awaited<ReturnType<F>>> {
  return async function (...args) {
    const cacheKey = `${key}-${args.join('-')}`; // 使用函数名和参数作为缓存键

    // 先从缓存中尝试获取数据
    const cachedResult = lurCache.get(cacheKey);
    if (cachedResult) {
      console.log({
        message: '返回缓存数据',
        cacheKey
      });
      return cachedResult; // 如果有缓存数据，直接返回
    }

    // 如果没有缓存，调用原函数获取数据
    // @ts-expect-error this
    const result = await fn.apply(this, args);

    // 将结果存入缓存
    lurCache.set(cacheKey, result);
    return result;
  };
}
