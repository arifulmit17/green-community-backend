
import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import jwt from "jsonwebtoken";


const secret="ssdfsfsdfsdfsfsfsdfgswrwer"

const  createUserAuth= async(payload:any)=>{
    
    const {password}=payload
     console.log("Payload:",payload);
    const hashedPass=await bcrypt.hash(password, 8);
    const result=await prisma.user.create({
        data:{
            ...payload,
            password:hashedPass
        }
    })
    
    return result
}


const loginUserAuth=async (payload:any)=>{
   const user=await prisma.user.findUnique({
    where:{
        email:payload.email
    }
    
    
   
   })
   if(!user){
        throw new Error("User not found")
    }
    const verifypass=await bcrypt.compare(payload.password,user.password)
    if(!verifypass){
        throw new Error("Invalid credential")
    }

    const userData={
        id:user.id,
        name:user.name,
        email:user.email,
        role:user.role,
    }
    const token=jwt.sign(userData,secret,{expiresIn:"7d"})

    return {
        token,
        user
    }
}

export const AuthService = {
    // Add service methods here
      createUserAuth,
      loginUserAuth
    };