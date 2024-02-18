import { getVideo, getVideos } from "@gateway/services/api/public";
import express,{ Router } from "express";

class Public {
    private router:Router;

    constructor(){
        this.router = express.Router();
    }
    public routes():Router{
        this.router.get('/videos',getVideos);
        this.router.get('/videos/:id',getVideo);
        return this.router;
        
    }
}
export const publicRoutes = new Public();