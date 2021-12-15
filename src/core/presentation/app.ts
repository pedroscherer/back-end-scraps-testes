import express, { Router, Request, Response } from 'express';
import cors from 'cors';
import UserRoutes from '../../features/users/presentation/routes/user.routes';
import ScrapRoutes from '../../features/scraps/presentation/routes/scrap.routes';

export default class App {
    readonly #express: express.Application;

    constructor() {
        this.#express = express();
    }

    public get server(): express.Application {
        return this.#express;
    }

    public init() {
        this.config();
        this.middlewares();
        this.routes();
    }

    private config() {
        this.#express.use(express.urlencoded({ extended: false }));
        this.#express.use(express.json());
        this.#express.use(cors());
    }

    private middlewares() {
        // TODO
    }

    private routes() {
        const router = Router();

        this.#express.get('/', (_: Request, response: Response) =>
            response.redirect('/api/v2'),
        );
        this.#express.use('/api/v2', router);

        router.get('/', (_: Request, response: Response) =>
            response.send('API rodando...'),
        );

        new UserRoutes().init(router);
        new ScrapRoutes().init(router);
    }

    /* istanbul ignore next */
    public start(port: number) {
        this.#express.listen(port, () => {
            console.log('API rodando...');
        });
    }
}
