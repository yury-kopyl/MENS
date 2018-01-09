import { createServer, Server } from 'http';
import * as socketIo from 'socket.io';
import { App } from './app';
const socketMiddle = require('socketio-wildcard')();

import config from './app.config';

/**
 * Приложение
 */
export class AppSocket {
	private io: SocketIO.Server;
	private server: Server;
	private cfg: any = config;

	constructor() {
		// this.socketList = [];
		// Создаём http сервер
		this.createServer();
		// Создаём WS приложение
		this.socket();
		// Вешаем прослушку на порт
		this.listen();
		// Устанавливаем middleware приложения
		/*this.middleware();*/
	}

	private createServer(): void {
		this.server = createServer(App.bootstrap().app);
	}

	private socket(): void {
		this.io = socketIo(this.server);
	}

	private listen(): void {
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
	}

	public getApp(): SocketIO.Server {
		return this.io;
	}

	/**
	 * Middleware приложения
	 */
	/*private middleware() {
		this.io.use(socketMiddle);

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
		});
	}*/
}
