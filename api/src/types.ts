import mongoose from 'mongoose';

export interface UserModel extends mongoose.Document {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  country?: string;
  imageUrl?: string;

  hashPassword(): string;
  validPassword(password: string): boolean;
}

export interface ResUserModel extends Omit<UserModel, 'password'> {
  password?: string;
  fullName?: string;
}

export interface CatModel extends mongoose.Document {
  name: string;
  age?: string;
  breed?: string;
  description?: string;
  imagePath: string;
  userId: string;
}
