import fs from 'fs';
import path from 'path';

export const FileHandler = {
    readFile: (filePath: string): Promise<Buffer> => {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    return reject(err);
                }
                resolve(data);
            });
        });
    },

    writeFile: (filePath: string, data: Buffer | string): Promise<void> => {
        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, data, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    },

    deleteFile: (filePath: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            fs.unlink(filePath, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    },

    getFileExtension: (fileName: string): string => {
        return path.extname(fileName);
    }
};
