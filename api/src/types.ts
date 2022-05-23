import mongoose from 'mongoose';

export interface UserModel extends mongoose.Document {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  country: string;

  hashPassword(): string;
  validPassword(password: string): boolean;
}

export interface CatModel extends mongoose.Document {
  name: string;
  age?: string;
  breed?: string;
  description?: string;
}
