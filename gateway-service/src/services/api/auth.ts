import { authLogin, authRegister } from '@gateway/protos/userGrpcClient';
import { Request,Response } from 'express';

 const register = async (req:Request,res:Response)=>{
    
    try {
         const {email,password,userName}= req.body;

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
const login = async (req:Request,res:Response)=>{
    try {
        const {email,password} = req.body;
        const result = await authLogin({
            email,
            password,
        });
        return res.status(200).send(result);
    } catch (error) {
       console.log(error); 
    return res.status(500).send('system error');
    }
 };
 export {register,login};