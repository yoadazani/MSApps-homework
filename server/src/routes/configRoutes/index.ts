import {Express} from "express";

import rootRouter from "../images";
import notFoundRouter from "../404";

export const configRoutes = (app: Express) => {
    // routes
    app.use('/api/pixabay/images/', rootRouter)

    //middleware that handles 404 errors
    app.use(notFoundRouter)
}