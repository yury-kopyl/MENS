import * as mongoose from 'mongoose';

export class Mongoose {
	public db: any;
	public connection: mongoose.Connection;

	constructor(url) {
		this.connect(url);
	}

	public static init(url): Mongoose {
		return new Mongoose(url);
	}

	private connect(url): mongoose.Connection {
		if (this.db) { return this.db; }

		this.connection = mongoose.connection;
		this.connection.on('open', () => {
			console.log('Connected to mongodb.');
		});
		this.db = mongoose.connect(url, {
			useMongoClient: true,
		});

		return this.db;
	}
}
