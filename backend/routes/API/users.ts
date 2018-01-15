import { NextFunction, Request, Response, Router } from 'express';
import { Adapter} from '../../adapter';
import { BaseRoute } from '../route';

export class APIUsers extends BaseRoute {
	public static create(router: Router) {
		console.log('[APIUsers: create] Creating api/users route.');

		router.get('/api/users', (req: Request, res: Response, next: NextFunction) => {
			new APIUsers().getAllUsers(req, res, next);
		});
		router.get('/api/users/:user_phone', (req: Request, res: Response, next: NextFunction) => {
			new APIUsers().getUserByPhone(req, res, next);
		});
		/*router.get('/api/users/:user_id', (req: Request, res: Response, next: NextFunction) => {
			new APIUsers().getUserById(req, res, next);
		});*/
	}

	constructor() {
		super();
	}

	/**
	 * Домашняя страница маршрута
	 * @param {e.Request} req
	 * @param {e.Response} res
	 * @param {e.NextFunction} next
	 */
	public getAllUsers(req: Request, res: Response, next: NextFunction) {
		Adapter.getUsers().then((users) => {
			console.log(3, users);

			this.title = 'API :: Users';
			const options: object = {
				message: 'API :: Users :: getAllUsers',
				users
			};

			this.render(req, res, 'index', options);
		});
	}

	public getUserByPhone(req: Request, res: Response, next: NextFunction) {
		Adapter.getUserByPhone(req.params.user_phone).then((users) => {
			console.log(3, users);

			this.title = 'API :: Users';
			const options: object = {
				message: 'API :: Users :: getUserByPhone',
				users
			};

			this.render(req, res, 'index', options);
		});
	}

	/*public getUserById(req: Request, res: Response, next: NextFunction) {
		this.title = 'API :: Users';
		const options: object = {
			message: 'API :: Users :: getUserById :: UserId - ' + req.params.user_id
		};
		this.render(req, res, 'index', options);
	}*/
}
