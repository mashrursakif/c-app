import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from './users/User';
import { UserModel } from './types';

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

// interface Auth {
//   function(header?: string): UserModel;
// }
type Auth = (header?: string) => UserModel;
export const auth = async (header?: string) => {
  if (!header) throw 'auth';
  const token = header.split(' ')[1];
  const data = jwt.verify(token, process.env.JWT_SEC as string);

  const user = await User.findOne({ _id: data });

  if (user) {
    return user;
  } else {
    throw 'auth';
  }
};


type A = (p: string) => string;
const a: A = (p: string) => {
  return 'cat';
}
const t =  a('p');