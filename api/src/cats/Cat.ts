import mongoose from 'mongoose';
import { CatModel } from '../types';

const catSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'You need to enter a name for your cat'],
	},
	age: {
		type: String,
		required: [true, 'You need to enter a name for your cat'],
	},
	breed: {
		type: String,
		required: [true, 'You need to enter a name for your cat'],
	},
	description: {
		type: String,
		required: [true, 'You need to enter a name for your cat'],
	},
	imagePath: {
		type: String
	},
	userId: {
		type: mongoose.Types.ObjectId,
		required: true,
		ref: 'User'
	}
}, { timestamps: true })

const Cat = mongoose.model<CatModel>('Cat', catSchema);

export default Cat;
