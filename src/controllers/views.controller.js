import path from "path";
import { serverConfig } from "../config.js";

const {viewPath} = serverConfig;

class ViewsController {
    constructor(){
        this.MAIN = (req, res) => res.sendFile(path.join(viewPath("index.html")));
        this.REGISTER = (req, res) => res.sendFile(path.join(viewPath("register.html")));
        this.LOGIN = (req, res) => res.sendFile(path.join(viewPath("login.html")));
        this.USER = (req, res) => res.sendFile(path.join(viewPath("user.html")));
        this.NEWPOST = (req, res) => res.sendFile(path.join(viewPath("newPost.html")));
        this.EDITPOST = (req, res) => res.sendFile(path.join(viewPath("editPost.html")));
    }
}
 export default new ViewsController();