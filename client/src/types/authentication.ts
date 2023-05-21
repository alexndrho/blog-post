interface signUpResponse {
  success: true;
  message: string;
}

interface loginResponse {
  message?: 'Success';
  error?: 'Invalid username' | 'Invalid password';
  token: string;
}

export type { signUpResponse, loginResponse };
