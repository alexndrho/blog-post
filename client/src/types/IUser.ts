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

interface ISignUpResponse {
  success: true;
  message?: string;
}

interface ILoginResponse {
  success: boolean;
  message?: string;
  token: string;
}

interface IUserAuthResponse {
  isloggedIn: boolean;
  token: string;
}

export default IUser;
export type { ISignUpResponse, ILoginResponse, IUserAuthResponse };
