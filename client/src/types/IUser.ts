import IError from './IError';

interface IUser {
  _id: string;
  username: string;
  email: string;
  profileIconId?: string;
  firstName?: string;
  lastName?: string;
  location?: string;
  contact?: string;
}

interface IVerifyUserResponse extends Partial<IError> {
  token?: string;
}

type ISignUpResponse = Partial<IError>;

interface ILoginResponse extends Partial<IError> {
  token?: string;
}

interface IGetUserInfoResponse extends Partial<IUser>, Partial<IError> {}

interface IGetUsernameByIdResponse extends Partial<IError> {
  username?: string;
}

export default IUser;
export type {
  IVerifyUserResponse,
  ISignUpResponse,
  ILoginResponse,
  IGetUserInfoResponse,
  IGetUsernameByIdResponse,
};
