import {
  ILoginResponse,
  ISignUpResponse,
  IVerifyUserResponse,
} from '../types/IUser';
import { IAuthContext } from '../context/AuthProvider';
import { IUserContext } from '../context/UserProvider';

const isUserAuth = async (
  setLoggedIn: IAuthContext['setLoggedIn'],
  setLoggedOut: IAuthContext['setLoggedOut']
): Promise<boolean> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL_SERVER}/isUserAuth`,
      {
        headers: {
          'x-access-token': localStorage.getItem('token') || '',
        },
      }
    );

    const responseData: IVerifyUserResponse = await response.json();

    if (responseData.token) {
      localStorage.setItem('token', responseData.token);
      setLoggedIn();

      return true;
    } else {
      localStorage.removeItem('token');
      setLoggedOut();

      return false;
    }
  } catch (err) {
    console.log(err);
    setLoggedOut();

    return false;
  }
};

const logIn = async (
  username: string,
  password: string,
  setLoggedIn: IAuthContext['setLoggedIn']
) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL_SERVER}/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      }
    );

    const responseData: ILoginResponse = await response.json();

    if (responseData.token) {
      localStorage.token = responseData.token;
      setLoggedIn();
    } else {
      localStorage.removeItem('token');
    }

    return responseData;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const signUp = async (username: string, email: string, password: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL_SERVER}/signup`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      }
    );

    const responseData: ISignUpResponse = await response.json();

    return responseData;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const logOut = async (
  setLoggedOut: IAuthContext['setLoggedOut'],
  setUser: IUserContext['setUser'],
  setUserIcon: IUserContext['setUserIcon']
) => {
  setLoggedOut();

  setUser(null);
  setUserIcon('');
  localStorage.removeItem('token');
};

export { isUserAuth, logIn, signUp, logOut };
