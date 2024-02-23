import { Request,Response } from 'express';
import { StatusCodes } from 'http-status-codes';
const health = (_req:Request,res:Response)=>{
    res.status(StatusCodes.OK).send('Api Gateway is working');
};
export {health};