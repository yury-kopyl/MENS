import { Users } from './db/mongodb/users';

export class Adapter {
	public static async getUsers(): Promise<any> {
		return Promise.all([Users.getUsers(), Users.getUsers2()])
			.then((data) => {
				return data;
			});
	}

	public static async getUserByPhone(phone): Promise<any> {
		return new Promise((resolve) => {
			resolve(Users.getUserByPhone(phone));
		});
	}
}
