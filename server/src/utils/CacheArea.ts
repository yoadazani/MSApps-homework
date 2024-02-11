type CacheArea = {
    [key: string]: []
}

const cacheArea: CacheArea = {}

export const addToCache = (key: string, value: []): void => {
    cacheArea[key] = value
}

export const getFromCache = (key: string): [] => {
    return cacheArea[key]
}