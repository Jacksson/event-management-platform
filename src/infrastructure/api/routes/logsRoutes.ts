import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

router.get('/logs', (req, res) => {
    const logFilePath = path.join(__dirname, '../../logs/app.log');
    fs.readFile(logFilePath, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error al leer los logs');
        res.type('text').send(data);
    });
});

export default router;

