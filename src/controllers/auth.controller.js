import { ClientError, globalError } from "../utils/error.js"

class AuthController {
    constructor(){
        this.REGISTER = function(req, res){
            try{
                let newUser = req.body;
                let users = req.readFile("users.json");
                let id = users.length ? users[users.length -1].id + 1 : 1;
                newUser.id = id;

                // Har yangi qo`shilgan foydalanuvchiga postlar ro`y beriladi
                let posts = req.readFile("posts.json");
                posts.push({userId: id, posts: []});
                req.writeFile("posts.json", posts);
                
                users.push(newUser);
                req.writeFile("users.json", users);
                return res.status(201).json({message: "User created", status: 201, user: {email: newUser.email, username: newUser.username, id: newUser.id}});
                
            }catch(err){
                globalError(err, res);
            }
        }
        this.LOGIN = function(req, res){
            try{
                let newUser = req.body;
                let users = req.readFile("users.json");
                let user = users.find(user => user.email == newUser.username && user.password == newUser.password);
                if(!user){
                    return res.status(404).json({message: "User not found", status: 404});
                }
                
                return res.status(201).json({message: "User created", status: 201, user: {email: user.email, username: user.username, id: user.id}});
                
            }catch(err){
                globalError(err, res);
            }
        }
    }
}

export default new AuthController();