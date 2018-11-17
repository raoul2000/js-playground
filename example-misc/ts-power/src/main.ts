import fs from "fs";
import path from "path";

function listFolderRecursive(folderPath:string, options?:any): any {
    
    fs.readdir(folderPath, options, (err, files) => {
        if(err) {
            console.error(err);
            return;
        } 
        files.forEach( (file) => {
            const filePath = path.join(folderPath, file);
            console.log(file);
            console.log(filePath);

            fs.stat(filePath, (err,stats) => {
                if(err) {
                    console.error(err);
                    return;
                }
                if(stats.isDirectory()) {
                    listFolderRecursive(filePath, options);
                }                
            });
        });
    });
}

listFolderRecursive("./");


