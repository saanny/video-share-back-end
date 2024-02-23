import { login, register} from '@gateway/services/api/auth';
import express,{ Router } from 'express';

class Auth{
    private router:Router;

    constructor(){
        this.router = express.Router();
    }
    public routes():Router{
        this.router.post('/auth/register',register);
        this.router.post('/auth/login',login);
        return this.router;
        
    }
}
export const authRoutes = new Auth();