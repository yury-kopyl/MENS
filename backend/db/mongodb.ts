import * as mongoose from 'mongoose';

export class Mongoose {
	public db: any;
	public connection: mongoose.Connection;
	public Promise: any;

	constructor(url) {
		this.connect(url);
	}

	public static init(url): Mongoose {
		return new Mongoose(url);
	}

	private connect(url): mongoose.Connection {
		if (this.db) { return this.db; }

		(mongoose as any).Promise = global.Promise;
		this.connection = mongoose.connection;
		this.connection.on('open', () => {
			console.log('Connected to mongodb.');
		});
		this.db = mongoose.connect(url, {
			useMongoClient: true,
			promiseLibrary: mongoose.Promise
		});

		return this.db;
	}
}
