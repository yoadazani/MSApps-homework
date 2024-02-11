// get hits by category from cache
import {addToCache, getFromCache} from "../utils/CacheArea";
import axios from "axios";
import {ImageT} from "../types/ImageT";
import {ResponseT} from "../types/ResponseT";
import {TOTAL_HITS} from "../constants";

export const getHitsByCategory = async (category: string): Promise<ResponseT<ImageT[] | undefined>> => {
    let hitsFromCache: ImageT[] | null = null
    if (category) {
        hitsFromCache = getFromCache(category as string === "" ? "all" : category);
    }
// check if hits by category are in cache
    if (hitsFromCache) {
        // return hits from cache
        console.log("get hits from cache")
        return {
            data: hitsFromCache,
            message: "ok"
        } as ResponseT<ImageT[]>
    } else {
        console.log("get hits from api")
        try {
            // make request to pixabay api and get hits by category
            const pixabayResponse = await axios.get(`https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${category ?? ""}&per_page=${TOTAL_HITS}`);

            const {hits} = pixabayResponse.data;

            if (hits) {
                // add hits by category to cache
                addToCache(category as string === "" ? "all" : category, hits);
            }

            // return hits by category
            return {
                data: hits,
                message: "ok"
            } as ResponseT<ImageT[]>

        } catch (error: Error | any) {
            // return error message
            return {
                data: undefined,
                message: error.message
            } as ResponseT<undefined>
        }
    }
}