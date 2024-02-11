import { Router, Request, Response } from 'express';

const notFoundRouter = Router();

notFoundRouter.use((req: Request, res: Response) => {
    res.json({error: 'not found'}).status(404)
})

export default notFoundRouter