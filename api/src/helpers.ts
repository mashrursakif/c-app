import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from './users/User';

export const secureParams = (
	args: Record<string, unknown>,
	safeList: string[]
) => {
	const params = Object.keys(args);
	const passed: typeof args = {};

	params.map((p) => {
		if (safeList.includes(p)) {
			passed[p] = args[p];
		}
	});

	return passed;
};

export const formatErr = (err: any) => {
	if (err === 'auth') {
		return { category: 'auth' };
	} else if (err.name === 'ValidationError') {
		const res: Record<string, string> = {};
		Object.keys(err.errors).map((k) => {
			if (err.errors[k].name === 'CastError') {
				res[k] = 'This value is invalid';
			} else {
				const message = (err.errors[k] as mongoose.Error.ValidatorError)
					.properties.message;
				res[k] = message;
			}
		});

		return { category: 'form', errors: res };
	} else {
		return { category: 'unknown' };
	}
};
