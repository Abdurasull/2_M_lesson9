import { ClientError, globalError } from "../utils/error.js"
import sha256 from "sha256";
import { jwtToken } from "../lib/jwt.js";
const {createToken, verifyToken} = jwtToken;

class AuthController {
    constructor(){
        this.REGISTER = async function(req, res){
            try{
                
                let newUser = req.body;
                let users = await req.readFile("users.json");
                
                let id = users.length ? users[users.length -1].id + 1 : 1;
                newUser.id = id;
                newUser.password = sha256(`${newUser.password}`);
                
                // Har yangi qo`shilgan foydalanuvchiga postlar ro`y beriladi
                let posts = await req.readFile("posts.json");
                
                await posts.push({userId: id, posts: []});
                await req.writeFile("posts.json", posts);
                await users.push(newUser);
                await req.writeFile("users.json", users);
                
                return await res.status(201).json({
                    message: "User created", 
                    status: 201, 
                    user: {email: newUser.email, username: newUser.username, id: newUser.id},
                    accessToken: createToken({id: newUser.id, userAgent: req.headers["user-agent"]})
                });
                
            }catch(err){
                console.log("salomlar");
                await globalError(err, res);
            }
        }
        this.LOGIN = async function(req, res){
            try{
                let newUser = req.body;
                let users = await req.readFile("users.json");
                
                let user = await users.find(user => user.email == newUser.username && user.password == sha256(newUser.password));
                if(!user){
                    return await res.status(404).json({message: "User not found", status: 404});
                }
                
                return await res.status(201).json({message: "User created", status: 201, user: {email: user.email, username: user.username, id: user.id}});
                
            }catch(err){
                await globalError(err, res);
            }
        }
    }
}

export default new AuthController();