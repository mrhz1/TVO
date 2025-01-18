import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors' ;
import { join } from 'path';
import { fileURLToPath } from 'url';
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const clientFolder = '../client';
const appPath = join(__dirname, clientFolder);

export default class Server {
    app: Application;
    port: number;

    constructor(port: string) {
        this.app = express();
        this.port = parseInt(port);
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors({ origin: '*' }));
        this.app.use(express.json());
    }    

    routes() {
        // health check
        this.app.get('/api/health', (_req: Request, res: Response) => {
            res.status(200).json({
                status: 'ok',
            });
        });

        this.app.use('/', express.static(appPath));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('TVO Server is running on port: ', this.port);
        });
    }    
};