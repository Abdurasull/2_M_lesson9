import { ClientError, globalError } from "../utils/error.js";
import sha256 from "sha256";

const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


export const userValidatorRegister = async (req, res, next) => {
    try{
        
        let {username, email} = req.body;
        if(!username) throw new ClientError("username is required", 400);
        if(!email) throw new ClientError("email is required", 400);
        
        if(!regex.test(email)) throw new ClientError("email is not valid", 400);
        const users = await req.readFile("users.json");
        
        if(users.some(users => users.email === email)) throw new ClientError("email already exists", 400);
        
        return await next();

    }catch(err){
        return await globalError(err, res);
    }
}

export const userValidatorLogin = async (req, res, next) => {
    try{
        let {username, password} = req.body;
        
        const users = await req.readFile("users.json");
        
        let user = await users.find(user => user.email == username);
        
        
        if(!user) throw new ClientError("user not found", 404);
        
        if(sha256(password) != user.password) throw new ClientError("password is incorrect", 400);
    
        return await next();

    } catch(err){
        
        return await globalError(err, res);
    }


}