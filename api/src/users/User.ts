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
    },
    imageUrl: {
      type: String
    }
  },
  { timestamps: true }
);

userSchema.methods.validPassword = async function (password: string) {
  try {
    const result = await bcrypt.compare(password, (this as UserModel).password);
    return result;
  } catch {
    return false;
  }
};

userSchema.methods.hashPassword = async function () {
  (this as UserModel).password = await bcrypt.hash(
    (this as UserModel).password,
    8
  );
};

userSchema.virtual('fullName').get(function (this: UserModel) {
  const fullName = this.firstName + ' ' + this.lastName;
  return fullName;
});

const User = mongoose.model<UserModel>('User', userSchema);

export default User;
