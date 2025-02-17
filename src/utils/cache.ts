import NodeCache from 'node-cache';

const cache = new NodeCache({
    stdTTL: 300, // 5 minutes
    checkperiod: 60,
});

export const getCached = <T>(key: string): T | undefined => {
    return cache.get<T>(key);
};

export const setCache = <T>(key: string, value: T, ttl: number = 300): boolean => {
    return cache.set(key, value, ttl);
};
export const deleteFromCache = (key: string): number => {
    return cache.del(key);
};
