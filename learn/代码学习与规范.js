/**
 * 基于离线存储的函数记忆包装器，可用于处理一些执行较慢的运算
 * @param  {Function} fn       待包装函数，需返回可序列化的值
 * @param  {String}   cacheKey 离线存储键
 * @return {Function}          已包装函数
 */
export const offlineMemory = (fn, cacheKey) => (...args) => {
    const timeCacheKey = `[offlineMemory]:${cacheKey}`;
    console.time(timeCacheKey); // eslint-disable-line no-console
    const cacheValue = offlineStore.get(cacheKey);
  
    if (isDefined(cacheValue)) {
      console.timeEnd(timeCacheKey); // eslint-disable-line no-console
      return cacheValue;
    }
  
    const value = fn(...args);
  
    setTimeout(() => {
      offlineStore.set(cacheKey, value);
    });
  
    console.timeEnd(timeCacheKey); // eslint-disable-line no-console
  
    return value;
  };

