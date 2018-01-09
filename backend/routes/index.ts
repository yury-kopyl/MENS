import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from './route';

/**
 * '/' маршрут
 */
export class IndexRoute extends BaseRoute {
	public static create(router: Router) {
		// log
		console.log('[IndexRoute: create] Creating index route.');
		// Добавляем домашнюю страницу маршрута
		router.get('/', (req: Request, res: Response, next: NextFunction) => {
			new IndexRoute().index(req, res, next);
		});
	}

	/**
	 * Конструктор
	 */
	constructor() {
		super();
	}

	/**
	 * Домашняя страница маршрута
	 * @param {e.Request} req
	 * @param {e.Response} res
	 * @param {e.NextFunction} next
	 */
	public index(req: Request, res: Response, next: NextFunction) {
		// Устанавливаем заголовок
		this.title = 'Home :: MyXoon';
		// Устанавливаем опции
		const options: object = {
			message: 'Welcome to the MyXoon App'
		};
		// Выводим страницу
		this.render(req, res, 'index', options);
	}
}
