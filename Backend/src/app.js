import express from "express";
import router from "./routes/index.routes.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.middleware.js";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/api', router);

app.use(errorMiddleware);

export default app;
