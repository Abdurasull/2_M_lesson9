import fs from 'fs';
import { serverConfig } from '../config.js';
const {dbPath} = serverConfig

export const model = (req, res, next) => {
    req.writeFile = function(fileName, data){
        fs.writeFileSync(dbPath(fileName), JSON.stringify(data, null, 4));
        return true;
    };
    req.readFile = function(fileName){
        let data = fs.readFileSync(dbPath(fileName), "utf-8");
        return data ? JSON.parse(data) : [];
    };
    return next();    
}