import { createServer, Server } from 'http';

export class CreateServer {
	public server: Server;

	constructor(app, port) {
		this.createServer(app);
		this.listen(port);
		this.onError(port);
		this.onListening(port);
	}

	public static bootstrap(app, port): CreateServer {
		return new CreateServer(app, port);
	}

	private createServer(app): void {
		this.server = createServer(app);
	}

	private listen(port): void {
		this.server.listen(port);
	}

	private onError(port): void {
		this.server.on('error', (error: any) => {
			switch (error.code) {
				case 'EADDRINUSE':
					console.error(`Port ${port} is already in use`);
					break;
				default:
					throw error;
			}
		});
	}

	private onListening(port): void {
		this.server.on('listening', () => {
			console.log(`http server listening on port: ${port}`);
		});
	}
}
