import path from "path";
import { serverConfig } from "../config.js";

const {viewPath} = serverConfig;

class ViewsController {
    constructor(){
        this.MAIN = async (req, res) => await res.sendFile(path.join(viewPath("index.html")));
        this.REGISTER = async (req, res) => await res.sendFile(path.join(viewPath("register.html")));
        this.LOGIN = async (req, res) => await res.sendFile(path.join(viewPath("login.html")));
        this.USER = async (req, res) => await res.sendFile(path.join(viewPath("user.html")));
        this.NEWPOST = async (req, res) => await res.sendFile(path.join(viewPath("newPost.html")));
        this.EDITPOST = async (req, res) => await res.sendFile(path.join(viewPath("editPost.html")));
    }
}
 export default new ViewsController();