import {Request, Response, Router} from 'express';
import {getHitsByCategory} from "../scripts/getHitsByCategory";
import {sortHitsByDate, sortHitsById} from "../scripts/sortHits";
import {ImageT} from "../types/ImageT";
import {TOTAL_HITS} from "../constants";
import {ResponseT} from "../types/ResponseT";

const rootRouter = Router();

rootRouter.get('/', async (req: Request, res: Response) => {

    res.setHeader("Cache-Control", "no-store no-cache must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    const query = req.query;

    const {
        q,
        page,
        per_page,
        sortBy
    } = query


    // handle hits pagination environment variables
    const hitsPerPage = per_page ? parseInt(per_page as string) : 9;
    const currentPage = page ? parseInt(page as string) : 1;
    const startIndex = (currentPage - 1) * hitsPerPage;
    const endIndex = startIndex + hitsPerPage;

    const hitsByCategoryRes = await getHitsByCategory(q as string)

    if (!hitsByCategoryRes.data) throw new Error(hitsByCategoryRes.message)

    const {data} = hitsByCategoryRes

    // check if orderBy is set on query string and sort hits by it
    const hits = sortBy && sortBy === 'id' ? sortHitsById(data) : sortHitsByDate(data)

    //return hits sliced by startIndex and endIndex per page
    res.json({
        data: {
            searchCategory: q as string,
            currentPage,
            totalHits: TOTAL_HITS,
            hitsPerPage,
            hits: hits.slice(startIndex, endIndex)
        },
        message: "ok"
    } as ResponseT<{
        searchCategory: string,
        currentPage: number,
        totalHits: number,
        hitsPerPage: number,
        hits: ImageT[]
    }>).status(200)
})

export default rootRouter