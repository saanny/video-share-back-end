import { createUser, findUser } from "@auth/protos/userGrpcClient";
import { HashService } from "./hashService"
import jwt from 'jsonwebtoken';
const secret = "SECRET12313";
export const registerService = async (email:string,password:string,userName:string) => {
    try {
         const hashService = new HashService();
         const hashedPassword = await hashService.hashPassword(password);
         await createUser({
            email:email,
            password:hashedPassword,
            name:userName
        })

        return {
            email,
            name:userName
        }
    } catch (error) {
        console.log(error);
    }
}

export const loginService= async (email:string,password:string) => {
    try {
        const result = await findUser({
              email:email 
        });
        console.log(result);
        if(!result.user){
            throw new Error("User not found");
        }
        
        const hashService = new HashService()
        const validPassword= hashService.isValidPassword(result.user?.password as string,password);
        if(!validPassword){
            throw new Error("password not valid");
        }
        const token = jwt.sign({id:result.user.id},secret,{
                    algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 86400, // 24 hours
        })
        return {
            token,
            user:result.user,
        }
    } catch (error) {
        console.log(error);
    }
}