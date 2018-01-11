import { io } from '../../index';
import { WSError } from '../models/errors';
import { ActionLogin } from './login';

export class WSRouter {
	constructor() {}

	public static init(socketIo): void {
		socketIo.on('connect', (socket: any) => {
			if ( ActionLogin.init() ) {
				socket.user = {};
				socket.user.userName = socket.id;
				io.addUser(socket.user);
				socket.emit('init', {user: socket.user});
			} else {
				socket.emit('init', WSError.invalidWSToken);
				socket.disconnect();
			}

			socketIo.clients((error, clients) => {
				if (error) { throw error; }
				console.log(clients);
			});

			socket.on('disconnect', () => {
				console.log('disconnect');
				io.deleteUser(socket.user.userName);
			});
		});
	}
}
