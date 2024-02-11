import {ImageT} from "../types/ImageT";
import {extractDateFromPreviewUrl} from "../utils/extractDateFromPreviewUrl";

export const sortHitsByDate = (hits: ImageT[]): ImageT[] => {
    // sort hits by date in ascending order
    const sortedHits = hits;

    sortedHits.sort(
        (a: ImageT, b: ImageT) => (extractDateFromPreviewUrl(a.previewURL) - extractDateFromPreviewUrl(b.previewURL) ? -1 : 1)
    )

    return sortedHits
}


export const sortHitsById = (hits: ImageT[]): ImageT[] => {
    // sort hits by id in ascending order
    const sortedHits = hits;

    sortedHits.sort((a, b) => (a.id - b.id) ? -1 : 1)

    return sortedHits
}