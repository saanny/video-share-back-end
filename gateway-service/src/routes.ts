import { Application } from "express";
import { healthRoutes } from "./routes/health";
import { authRoutes } from "./routes/auth";
import { publicRoutes } from "./routes/public";
const PATH= '/api/v1';
export const appRoutes = (app:Application)=>{
    app.use('',healthRoutes.routes());
    app.use(PATH,authRoutes.routes());
    app.use(PATH,publicRoutes.routes());

}