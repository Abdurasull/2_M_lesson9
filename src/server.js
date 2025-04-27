import express from "express";
import path from "path";
import cors from "cors";
import { viewsRouter } from "./routes/views.routes.js";
import { mainRouter } from "./routes/main.routes.js";
import { serverConfig } from "./config.js";
import { model } from "./model/model.js";


const { PORT } = serverConfig;
const app = express();
app.use(model)
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));


app.use("/api", mainRouter);
app.use(viewsRouter);






app.listen(PORT,() => console.log(`Server is running at http://localhost:${PORT}`));