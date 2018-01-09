import * as express from 'express';
// import * as logger from 'morgan';
import {join} from 'path';
import * as config from '../common/config/config.json';

import { IndexRoute } from './routes/index';

/**
 * Приложение
 */
export class App {
	/**
	 * Ядро Express
	 */
	public app: express.Application;

	/**
	 * Конфиги
	 */
	public cfg: any;

	/**
	 * Начальная загрузка приложения
	 */
	public static bootstrap(): App {
		return new App();
	}

	/**
	 * Конструктор
	 */
	constructor() {
		// Создаём Express приложение
		this.app = express();
		// Создаём экземпляр настроек
		this.cfg = config;
		// Настраиваем приложение
		this.config();
		// Маршрутизация приложения
		this.routes();
		// Устанавливаем Middleware приложения
		this.middleware();
	}

	/**
	 * Настройки приложени
	 */
	private config() {
		// Устанавливаем порт приложения
		this.app.set('port', this.cfg.serverPort);
		// Настройки шаблонизатора
		this.app.set('views', join(__dirname, 'views'));
		this.app.set('view engine', 'pug');
	}

	/**
	 * Middleware приложения
	 */
	private middleware() {
		// Подключение логов
		// this.app.use(logger('dev'));
		// Путь к статическим файлам
		this.app.use(express.static(join(__dirname, 'public')));
		// Перехват 404 и проброс через errorHandler
		this.app.use(this.catch404);
		// Вывод ошибок
		this.app.use(this.errorHandler);
	}

	/**
	 * Установка маршрутов
	 */
	private routes() {
		let router: express.Router;
		router = express.Router();

		// Index
		IndexRoute.create(router);

		// Use router middleware
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
