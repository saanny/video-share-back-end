import { getUserInformation, getUserNotifications } from '@gateway/services/api/user';
import express, { Router } from 'express';

class User {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }
  public routes(): Router {
    this.router.get('/user/me', getUserInformation);
    this.router.get('/user/notifications', getUserNotifications);
    return this.router;
  }
}
export const userRoutes = new User();
