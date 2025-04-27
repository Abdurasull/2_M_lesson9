import { ClientError, globalError } from "./error.js";

const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


export const userValidatorRegister = (req, res, next) => {
    try{
        let {username, email, password} = req.body;
        if(!username) throw new ClientError("username is required", 400);
        if(!email) throw new ClientError("email is required", 400);
        
        if(!regex.test(email)) throw new ClientError("email is not valid", 400);
        const users = req.readFile("users.json");
        if(users.some(users => users.email === email)) throw new ClientError("email already exists", 400);
        return next();

    }catch(err){
        return globalError(err, res);
    }
}

export const userValidatorLogin = (req, res, next) => {
    try{
        
        let {username, password} = req.body;
    
        const users = req.readFile("users.json");
        
        let user = users.find(user => user.email == username);
        if(!user) throw new ClientError("user not found", 404);
        
        if(password != user.password) throw new ClientError("password is incorrect", 400);

        return next();

    } catch(err){
        
        return globalError(err, res);
    }


}