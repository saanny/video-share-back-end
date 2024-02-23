import http from 'http';

import { Application, json, urlencoded } from 'express';
import cors from 'cors';
import compression from 'compression';

import { appRoutes } from './routes';
const SERVER_PORT = 5000;
export class Gateway {
  private app: Application;
  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    this.standardMiddleware(this.app);
    this.routesMiddleware(this.app);
    this.startServer(this.app);
  }
  private routesMiddleware(app: Application): void {
    appRoutes(app);
  }
  private standardMiddleware(app: Application): void {
    app.use(
      cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
      })
    );
    app.use(compression());
    app.use(json({ limit: '200mb' }));
    app.use(urlencoded({ extended: true, limit: '200mb' }));
  }
  private async startServer(app: Application) {
    try {
      const httpServer: http.Server = new http.Server(app);
      this.startHttpServer(httpServer);
    } catch (error) {
      console.log(error);
    }
  }
  private async startHttpServer(httpServer: http.Server): Promise<void> {
    try {
      httpServer.listen(SERVER_PORT, () => {
        console.log(`Gateway server running on port ${SERVER_PORT}`);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
