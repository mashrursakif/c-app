import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from './users/User';
import { UserModel } from './types';
import { NextFunction } from 'express';
// import fse from 'fs-extra';
// import sharp, { FormatEnum } from 'sharp';

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

// temp removal, CONFIGURING CLOUDINARY

// transform file using sharp
// Resize or Format Image, then returns buffer or writes to file
// interface TransformProps {
//   resize?: {
//     width: number;
//     height: number;
//   };
//   format?: keyof FormatEnum;
//   newPath?: string;
// }
// export const transform = async (path: string, props: TransformProps = {}) => {
//   try {
//     const { resize, format, newPath } = props;
//     const buf = await sharp(path);

//     if (resize) {
//       buf.resize(resize);
//     } else {
//       // buf.resize({ width: 40, height: 40 });
//     }
//     if (format) buf.toFormat(format);

//     // if newPath is present save the file
//     if (newPath) {
//       // ensureFile checks if file exists, if not file is created
//       await fse.ensureFile(newPath);
//       return buf.toFile(newPath);
//     }
//     // else return buffer;
//     return buf.toBuffer();
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const moveFile = async (
//   dir: string,
//   filename: string,
//   size?: number
// ) => {
//   try {
//     const oldPath = `src/uploads/temp/${filename}`;
//     const newPath = `src/uploads/${dir}/${filename}`;

//     let resize = undefined;

//     if (size) resize = { width: size, height: size };

//     const buffer = await transform(oldPath, {
//       newPath,
//       resize
//     });

//     await fse.remove(oldPath);
//   } catch (err) {
//     console.log('MOVEFILE-ERR  ', err);
//     return err;
//   }
// };
