import { authLogin, authRegister } from '@gateway/protos/userGrpcClient';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
const TOKEN_SECRET = 'SECRET12313';
const register = async (req: Request, res: Response) => {
  try {
    const { email, password, userName } = req.body;

    const result = await authRegister({
      email,
      password,
      userName
    });
    return res.status(201).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send('system error');
  }
};
const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authLogin({
      email,
      password
    });
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send('system error');
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const verifyJwt = async (req: any, _res: Response, next: NextFunction) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const headers: any = req.headers;
  const [bearer, token] = headers.accessToken.split(' ') || [];
  if (!token && bearer.toLowerCase() !== 'bearer') {
    throw new Error('Token is not valid');
  }

  try {
    const payload = verify(token, TOKEN_SECRET);
    req.user = payload;
  } catch (error) {
    console.log(error);
    throw new Error('Token is not valid');
  }
  next();
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const checkAuth = async (req: any, _res: Response, next: NextFunction) => {
  if (!req.user) {
    throw new Error('Authentication error');
  }
  next();
};
export { register, login, checkAuth, verifyJwt };
