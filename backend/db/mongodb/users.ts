import { mongoose } from '../../../index';
import { IUser } from '../../interfaces/IUser';
import { IUserModel } from '../../models/user';
import { UserSchema } from './schemas/userSchema';

export class Users {
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

	public static async getUserByPhone(phone): Promise<any> {
		const user = mongoose.connection.model<IUserModel>('User', UserSchema);
		const promise = user.find({ phone }).sort({ createdAt: -1 }).limit(1);

		promise.then((result) => {
				console.log('Fulfilled 1: ' + result);
			},
			(error) => {
				console.log('Rejected 1: ' + error);
			});

		return promise;
	}
}
