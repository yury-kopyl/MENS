import { NextFunction, Request, Response } from 'express';

/**
 * Базовый маршрут
 */
export class BaseRoute {
	protected title: string;
	private scripts: string[];

	/**
	 * Конструктор
	 */
	constructor() {
		// Заголовок
		this.title = 'Base Route';
		// Скрипты
		this.scripts = [];
	}

	/**
	 * Добавляем внешние JS скрипты
	 * @param {string} src
	 * @returns {BaseRoute}
	 */
	public addScript(src: string): BaseRoute {
		this.scripts.push(src);
		return this;
	}

	/**
	 * Формируем представление страницы
	 * @param {e.Request} req
	 * @param {e.Response} res
	 * @param {string} view
	 * @param {Object} options
	 */
	public render(req: Request, res: Response, view: string, options?: object) {
		// Константа маршрута
		res.locals.BASE_URL = '/';
		// Добавляем скрипты
		res.locals.scripts = this.scripts;
		// Добавляем заголовок страницы
		res.locals.title = this.title;
		// Выводим страницу
		res.render(view, options);
	}
}
