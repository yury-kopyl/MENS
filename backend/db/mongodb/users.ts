// import * as mongoose from 'mongoose';
import { mongoose } from '../../../index';
import { IUser } from '../../interfaces/IUser';
import { IUserModel } from '../../models/user';
import { UserSchema } from './schemas/userSchema';

export class Users {
	constructor() {}

	public static getUserByPhone(phone): void {
		const user = mongoose.connection.model<IUserModel>('User', UserSchema);
		const user2 = mongoose.connection.model<IUserModel>('User', UserSchema);
		const query = user.find({ phone }).sort({ createdAt: -1 }).limit(1);
		query.then((doc) => {
			console.log(doc);
			return doc[0];
		});

		return new Promise((resolve, reject) => {
			user.find({ phone }).sort({ createdAt: -1 }).limit(1).exec((err, res) => {
				if (err) {
					reject(err);
				} else {
					if (res.length) {
						resolve(res[0]);
					} else {
						resolve(null);
					}
				}
			});

			user2.find({ phone }).sort({ createdAt: -1 }).limit(1).exec((err, res) => {
				if (err) {
					reject(err);
				} else {
					if (res.length) {
						resolve(res[0]);
					} else {
						resolve(null);
					}
				}
			});
		});
	}

	public static async getUsers(): Promise<object> {
		return new Promise((resolve) => {
			console.log('Loading item 1');
			setTimeout(() => { // simulate a server delay
				resolve({
					name: 'Yury',
					surname: 'Kopyl',
					nickname: 'Shut',
					ws_token: ''
				});
			}, 2000);
		});
	}

	public static async getUsers2(): Promise<object> {
		return new Promise((resolve) => {
			console.log('Loading item 1.2');
			setTimeout(() => { // simulate a server delay
				resolve({
					name: 'Elena',
					surname: 'Bondarenko',
					nickname: 'Bond',
					ws_token: ''
				});
			}, 4000);
		});
	}
}
