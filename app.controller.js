import connectDB from "./Src/DataBase/connect.db.js"
import cors from "cors"
import { notFoundHandler } from "./Src/Utils/ErrorHandler/notFoundHandler.js"
import authRouter from "./Src/Modules/Auth/auth.controller.js"
// import postRouter from "./Src/Modules/Posts/post.controller.js"
import postRouter from "./Src/Modules/Posts/post.controller.js"
import { globalErrorHandler } from "./Src/Utils/ErrorHandler/globalErrorHandler.js"
import commentRouter from "./Src/Modules/Comments/comment.controller.js"
import integrateAi from "./Src/Modules/Ai/ai.controller.js"

export const bootstrap = async (app,express)=>{
// ==================== read body data (req.body)  ==========================
app.use(express.json())
// ????????????????????  cors (probleam endpoined) ???????????????????? //
app.use(cors())
// ################  Connect DataBase ############# //
await connectDB()
// #################  browser  ############# //
// app.use("/upload",express.static("upload"))
// ================   Controller ==================
// ================== Auth Controller ================
app.use("/auth",authRouter)
//======================  Users Controller ===================

app.use("/posts",postRouter)
// ======================  comment Controller ===================
app.use("/comment",commentRouter)
// ======================  Ai Controller ===================
app.use("/ai",integrateAi)
// ========================= Not Found Error Handler =========================
app.use("/",notFoundHandler)
//========================== Global Error Handler ==============================
app.use(globalErrorHandler)
}