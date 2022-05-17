import User from './User';
import jwt from 'jsonwebtoken';
import { UserModel } from '../types';
import app from '../app';
import express, { Router, Response, Request } from 'express';
import { secureParams, formatErr, auth } from '../helpers';

interface UserArgs {
	email: string;
	password: string;
	username: string;
	firstName: string;
	lastName: string;
	country: string;
	[index: string]: string;
}

const login = async (req: Request, res: Response) => {
	try {
		const { loginData } = req.body;
		const user = await User.findOne({ email: loginData.email });

		if (await user?.validPassword(loginData.password)) {
			const token = jwt.sign(
				user?._id.toString(),
				process.env.JWT_SEC as string
			);

			res.send({ token, userId: user?._id });
			return;
		}

		throw 'auth';
	} catch (err) {
		res.send(formatErr(err));
	}
};

const getUser = async (req: Request, res: Response) => {
	try {
		const user = auth(req.headers.authorization);

		res.send({ user });
	} catch (err) {
		console.log(err);
	}
};

const createUser = async (req: Request, res: Response) => {
	try {
		const user = new User(userParams(req.body.userData));

		await user.validate();
		await user.hashPassword();

		await user.save();
		console.log('REQ   ', user);
		res.send({ user });
	} catch (err) {
		console.log('ERR  ', formatErr(err));
		res.send(formatErr(err));
	}
};

const updateUser = async (req: Request, res: Response) => {
	try {
		const user = await auth(req.headers.authorization);
		// const user = await User.findOne({ _id: req.body._id });

		Object.assign(user, req.body.userData);
		await user?.save();
		res.send({ user });
	} catch (err) {
		res.send(formatErr(err));
	}
};

const deleteUser = async (req: Request, res: Response) => {
	try {
		await auth(req.headers.authorization);
		const user = await User.deleteOne({ _id: req.body._id });

		res.send({ user });
	} catch (err) {
		res.send(formatErr(err));
	}
};

// const a = async (req: Request, res: Response) => {
// const u = await User.findOne({ email: 'a@b.com' });
// console.log('REQ //  ', req.headers);
// };
// a();

const userParams = (args: UserArgs) => {
	return secureParams(args, [
		'email',
		'password',
		'username',
		'firstName',
		'lastName',
		'country'
	]);
};

const router = express.Router();

router.get('/', getUser);
router.post('/login', login);
router.post('/create', createUser);

export default router;
