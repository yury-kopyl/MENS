import { Schema } from 'mongoose';

export let UserSchema: Schema = new Schema({
	createdAt: Date,
	phone: Number,
	name: String,
	surname: String,
	nickname: String,
	email: String
});

UserSchema.pre('save', ( next ) => {
	if (!this.createdAt) {
		this.createdAt = new Date();
	}
	next();
});
