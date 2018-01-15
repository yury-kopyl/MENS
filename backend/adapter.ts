import { Users } from './db/mongodb/users';

export class Adapter {
	public static async getUsers(): Promise<any> {
		return Promise.all([Users.getUsers(), Users.getUsers2()])
			.then((data) => {
				return data;
			});
	}

	public static async getUserByPhone(phone): Promise<any> {
		const promise = new Promise((resolve) => {
			resolve(Users.getUserByPhone(phone));
		});

		promise.then((result) => {
				console.log('Fulfilled: 2' + result);
			},
			(error) => {
				console.log('Rejected: 2' + error);
			});

		return promise;
	}
}
