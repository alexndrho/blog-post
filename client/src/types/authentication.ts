interface signUpResponse {
  message?: 'Success';
  error?:
    | 'Username and email has been taken'
    | 'Username has been taken'
    | 'Email has been taken';
}

interface loginResponse {
  message?: 'Success';
  error?: 'Invalid username' | 'Invalid password';
  token: string;
}

export type { signUpResponse, loginResponse };
