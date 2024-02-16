import express, { Express } from 'express';
import { Gateway } from './server';

class Application {
initialize(){
     const app: Express = express();
    const server: Gateway = new Gateway(app);
    server.start();
}
}
const application: Application = new Application();
application.initialize();