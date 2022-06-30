import User from './User';
import jwt from 'jsonwebtoken';
import { UserModel, ResUserModel } from '../types';
import app from '../app';
import express, { Router, Response, Request } from 'express';
import { secureParams, formatErr, auth, moveFile } from '../helpers';
import multer from 'multer';
import path from 'path';

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
		const user = (await auth(req.headers.authorization)) as ResUserModel;
		// const { __v, createdAt, updatedAt, ...rest} = user;
		delete user.password;
		const resUser = JSON.parse(JSON.stringify(user));
		Object.assign(resUser, { fullName: await user.fullName });
		console.log('GETUSER  ', resUser);

		res.send({ user: resUser });
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

		const token = jwt.sign(user._id.toString(), process.env.JWT_SEC as string);

		res.send({ user, token });
	} catch (err) {
		res.send(formatErr(err));
	}
};

const updateUser = async (req: Request, res: Response) => {
	try {
		const user = await auth(req.headers.authorization);

		Object.assign(user, req.body.userData);
		await user?.save();
		res.send({ user });
	} catch (err) {
		res.send(formatErr(err));
	}
};

const uploadImg = async (req: Request, res: Response) => {
	try {
		const user = await auth(req.headers.authorization);
		// move file
		const dir = `${user._id}`;
		const filename = 'profile-img.jpg';
		const imgPath = `${dir}/${filename}`;
		await moveFile(dir, filename, 128);

		user.imagePath = imgPath;

		await user.save();
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

// const a = async () => {
// 	const u = await User.deleteMany({});
// 	console.log('//  ', u);
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

// UPDATE
const profileStorage = multer.diskStorage({
	destination: 'src/uploads/temp',
	filename: (req, file, cb) => {
		cb(null, 'profile-img.jpg');
	}
});
const profileUpload = multer({ storage: profileStorage });

router.post('/update', updateUser);
router.post('/profile-img', profileUpload.single('profile-img'), uploadImg);
router.post('/delete', deleteUser);
//

// const storage = multer.diskStorage({
//   destination: 'src/uploads/temp',
//   filename: (request, file, cb) => {
//     cb(null, file.originalname);
//   }
// });
// // 'file' is form prop
// // saves to /temp
// const upload = multer({ storage });

const u = async (req: Request, res: Response) => {
	try {
		// const user = await auth(req.headers.authorization);

		const morePath = 'userId/abc';
		const filename = 'image.jpg';

		// set dir and filename (original name)
		// const storage = multer.diskStorage({
		//   destination: 'src/uploads/temp',
		//   filename: (request, file, cb) => {
		//     cb(null, filename);
		//   }
		// });
		// // 'file' is form prop
		// // saves to /temp
		// const upload = multer({ storage }).single('file');

		const oldPath = `src/uploads/temp/${morePath}/${filename}`;
		const newPath = `src/uploads/${morePath}/${filename}`;

		// upload(req, res, await uploadCallback(morePath, filename));
		// upload(req, res, async (err) => {
		//   await uploadCallback(morePath, filename);
		// });
		await moveFile(morePath, 'customname.jpg');

		res.send({ message: 'File Uploaded' });
	} catch (err) {
		console.log(err);
	}
};

router.post('/upload', u);

export default router;
