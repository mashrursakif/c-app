import Cat from './Cat';
import { CatModel } from '../types';
import express, { Router, Response, Request } from 'express';
import { auth, formatErr, secureParams } from '../helpers';
import app from '../app';

interface CatArgs {
	name: string;
	age: string;
	breed: string;
	description: string;
	[index: string]: unknown;
}

const getCat = async (req: Request, res: Response) => {
	try {
		const user = await auth(req.headers.authorization);

		const cat = await Cat.findOne({ _id: req.body.catId, userId: user._id });

		res.send({ cat });
	} catch (err) {
		console.log(err);
	}
}

const createCat = async (req: Request, res: Response) => {
	try {
		const user = await auth(req.headers.authorization);

		const cat = new Cat(catParams(req.body.catData))
		cat.userId = user._id;

		await cat?.save();
		res.send({ cat });
	} catch (err) {
		console.log(err);
	}
}

const updateCat =  async (req: Request, res: Response) => {
	try {
		const user = await auth(req.headers.authorization);

		const cat = await Cat.findOne({ _id: req.body.catId, userId: user._id });
		Object.assign(cat, req.body.catData);

		await cat?.save();
		res.send({ cat });
	} catch (err) {
		console.log(err);
	}
}

const deleteCat =  async (req: Request, res: Response) => {
	try {
		const user = await auth(req.headers.authorization);

		const cat = await Cat.deleteOne({ _id: req.body.catId, userId: user._id });

		res.send({ cat });
	} catch (err) {
		console.log(err);
	}
}

const catParams = (args: CatArgs) => {
	return secureParams(args, [
		'name',
		'age',
		'breed',
		'description'
	]);
}

const router = express.Router();

router.get('/cats', getCat);

export default router;

