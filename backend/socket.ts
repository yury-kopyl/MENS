import * as socketIo from 'socket.io';
import * as cfg from '../common/config/config.json';
import { WSRouter } from './socket/router';

export class Socket {
	public io: SocketIO.Server;
	private users: object;
	private server: any;

	constructor(server, port) {
		this.initPort(server, port);
		this.socket();
		this.middleware();
		this.users = {};
	}

	public static bootstrap(server, port): Socket {
		return new Socket(server, port);
	}

	public addUser(user): void {
		this.users[user.userName] = user;
		console.log(this.users);
	}

	public deleteUser(user): void {
		if ( this.users.hasOwnProperty(user) ) {
			delete this.users[user];
		}
		console.log(this.users);
	}

	private initPort(server, port): void {
		if ( (cfg as any).serverPort === (cfg as any).wsPort ) {
			this.server = server;
			this.server.on('listening', () => {
				console.log(`web socket server listening on port: ${port}`);
			});
		} else {
			this.server = port;
			console.log(`web socket server listening on port: ${port}`);
		}
	}

	private socket(): void {
		this.io = socketIo(this.server);
	}

	/*private listen(): void {
		this.server.listen(this.cfg.wsPort, () => {
			console.log('Running server on port %s', this.cfg.wsPort);
		});

		this.io.on('connect', (socket: any) => {
			console.log('Connected client on port %s.', this.cfg.wsPort);
			socket.on('message', (m) => {
				console.log('[server](message): %s', JSON.stringify(m));
				this.io.emit('message', m);
			});

			socket.on('disconnect', () => {
				console.log('Client disconnected');
			});
		});
	}*/

	private middleware() {
		WSRouter.init(this.io);
	}

	private mmiddleware(port) {
		this.io.on('connect', (socket: any) => {
			console.log('Connected client on port %s.', port);

			// console.log(1, socket.conn.id);

			/*this.io.clients((error, clients) => {
				if (error) { throw error; }
				console.log( clients.indexOf(socket.conn.id) );
				console.log(2, clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
			});*/

			this.io.emit('init', 'test');

			socket.on('message', (m) => {
				console.log('[server](message): %s', JSON.stringify(m));
				console.log(socket.handshake);
				this.io.emit('message', m);
			});

			socket.on('disconnect', () => {
				console.log('Client disconnected');
			});
		});

		/*this.io.use((socket, next) => {
			console.log(socket.request.headers);
			if (socket.request.headers.cookie) { return next(); }
			next(new Error('Authentication error'));
		});*/

		/*this.io.use(socketMiddle);

		this.io.on('connection', (socket) => {
			socket.on('*', (packet) => {
				// client.emit('foo', 'bar', 'baz')
				console.log(packet);
				switch (packet.data[0]) {
					case 'my other event':
						console.log(otherEmit.eventName);
						break;
				}
			});

			socket.use((packet, next) => {
				console.log('packet: ', packet);
				next();
			});
			console.log('Connection!');
		});

		// Подключение логов
		// this.io.use(logger('dev'));
		this.io.on('connect', (socket) => {
			socket.use((packet, next) => {
				console.log('packet2: ', packet);
				next();
			});

			console.log('Connect!');

			this.socketList.push(socket.id);

			socket.emit('news', { hello: 'world' });
			/!*socket.on('my other event', (data) => {
				console.log(data);
			});*!/

			socket.on('disconnect', (data) => {
				const i = this.socketList.indexOf(socket.id);

				if (i !== -1) {
					this.socketList.splice(i, 1);
				}
			});
		});*/
	}
}
