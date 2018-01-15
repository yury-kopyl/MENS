import * as express from 'express';
// import * as logger from 'morgan';
import { join } from 'path';

import { APIUsers } from './routes/API/users';
import { IndexRoute } from './routes/index';

export class App {
	public app: express.Application;

	constructor(port) {
		this.app = express();
		this.config(port);
		this.routes();
		this.middleware();
	}

	public static bootstrap(port): App {
		return new App(port);
	}

	private config(port) {
		this.app.set('port', port);
		this.app.set('views', join(__dirname, 'views'));
		this.app.set('view engine', 'pug');
	}

	private middleware() {
		// this.app.use(logger('dev'));
		this.app.use(express.static(join(__dirname, 'public')));
		this.app.use(this.catch404);
		this.app.use(this.errorHandler);
	}

	private routes() {
		let router: express.Router;
		router = express.Router();

		IndexRoute.create(router);
		APIUsers.create(router);

		this.app.use(router);
	}

	/**
	 * Перехват 404
	 * @param {e.Request} req
	 * @param {e.Response} res
	 * @param {e.NextFunction} next
	 */
	private catch404(req: express.Request, res: express.Response, next: express.NextFunction) {
		const err: any = new Error('Not Found');
		err.status = 404;
		next(err);
	}

	/**
	 * Функция вывода ошибок
	 * @param err
	 * @param {e.Request} req
	 * @param {e.Response} res
	 */
	private errorHandler(err: any, req: express.Request, res: express.Response) {
		// Устанавливаем локальные переменные только в режиме development
		res.locals.message = err.message;
		res.locals.err = req.app.get('env') === 'development' ? err : {};
		// Устанавливаем статус ответа
		res.status(err.status || 500);
		// Выводим страницу с ошибкой
		res.render('error');
	}
}
