import express, {Express} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import helmet from 'helmet'
import compression from 'compression'

import {configRoutes} from "./routes/configRoutes";


dotenv.config()

const PORT: number = +(process.env.PORT ?? 5000)

const app: Express = express()

app.use(cors())
app.use(helmet())
app.use(compression())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

configRoutes(app)

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
})

