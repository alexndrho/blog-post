interface signUpResponse {
  success: true;
  message?: string;
}

interface loginResponse {
  success: boolean;
  message?: string;
  token: string;
}

interface IUserAuth {
  isloggedIn: boolean;
  token: string;
}

export type { signUpResponse, loginResponse, IUserAuth };
