import { uploadVideo } from '@gateway/services/api/upload';
import express, { Router } from 'express';

class Upload {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }
  public routes(): Router {
    this.router.post('/upload/video', uploadVideo);
    return this.router;
  }
}
export const uploadRoutes = new Upload();
