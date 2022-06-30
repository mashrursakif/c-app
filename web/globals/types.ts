export interface AxiosRes {
  data: any;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  request: Record<string, unknown>;
  config: Record<string, unknown>;
}

export interface UserModel {
  _id: string;
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  country: string;
  imagePath: string;
  fullName?: string;
}
