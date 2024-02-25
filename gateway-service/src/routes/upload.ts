import { checkAuth } from '@gateway/services/api/auth';
import { uploadVideo } from '@gateway/services/api/upload';
import express, { Router } from 'express';

class Upload {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }
  public routes(): Router {
    this.router.post('/upload/video', checkAuth, uploadVideo);
    return this.router;
  }
}
export const uploadRoutes = new Upload();
