import mongoose from 'mongoose';
import { UserModel } from '../types';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: [true, 'You need to enter an email address'],
			unique: [true, 'This email address is alreay taken']
		},
		password: {
			type: String,
			required: [true, 'You need to enter a password']
		},
		username: {
			type: String,
			required: [true, 'You need to enter a username']
		},
		firstName: {
			type: String,
			required: [true, 'You need to enter a first name']
		},
		lastName: {
			type: String,
			required: [true, 'You need to enter a last name']
		},
		country: {
			type: String
		}
	},
	{ timestamps: true }
);

userSchema.methods.validPassword = async function (password: string) {
	try {
		const result = await bcrypt.compare(password, this.password);
		return result;
	} catch {
		return false;
	}
};

userSchema.methods.hashPassword = async function () {
	this.password = await bcrypt.hash(this.password, 8);
};

const User = mongoose.model<UserModel>('User', userSchema);

export default User;