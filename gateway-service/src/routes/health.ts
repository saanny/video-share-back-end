import { health } from '@gateway/services/api/health';
import express, { Router } from 'express';

class Health {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }
  public routes(): Router {
    this.router.get('/gateway/health', health);
    return this.router;
  }
}
export const healthRoutes = new Health();
