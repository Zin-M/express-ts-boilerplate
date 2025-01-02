import path from 'path';
import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { promisify } from "util";

export default function Upload(fieldName: string) {
    return async function(req: Request, res: Response, next: NextFunction) {
        try {
            if (req.files && (req.files as Record<string, any>)[fieldName]) {
                const file = req.files[fieldName] as UploadedFile;
                const fileName = Date.now()+"-"+ file.name;
                const filePath = path.join(__dirname, '../../storage/uploads', fileName);
                
                const mvAsync = promisify(file.mv);
                await mvAsync(filePath);
                req.filePath = "public/"+fileName;
            }
        } catch (err: any) {
            console.log(err);
        } finally {
            next();
        }
    }   
}