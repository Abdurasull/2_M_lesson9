import fs from 'fs';
import { serverConfig } from '../config.js';
const {dbPath} = serverConfig

export const model = (req, res, next) => {
    req.writeFile = async function(fileName, data){
        await fs.writeFileSync(dbPath(fileName), JSON.stringify(data, null, 4));
        return true;
    };
    req.readFile = async function(fileName){
        let data = await fs.readFileSync(dbPath(fileName), "utf-8");
        return data ? JSON.parse(data) : [];
    };
    return next();    
}