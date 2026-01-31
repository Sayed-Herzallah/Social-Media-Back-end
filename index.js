import express from "express"
import dotenv from "dotenv"
import { bootstrap } from "./app.controller.js"
const app = express()
dotenv.config()
const port = process.env.PORT
await bootstrap(app,express)


app.listen(port, () => {
    console.log(`server is runing index.js ${port}!`)
})