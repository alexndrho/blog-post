import {
  IGetUserInfoResponse,
  ILoginResponse,
  ISignUpResponse,
} from '../types/IUser';
import { IUserIconResponse } from '../types/IUserIcon';

const logIn = async (username: string, password: string) => {
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

const getUser = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL_SERVER}/user`,
      {
        headers: {
          Accept: 'application/json',
          'x-access-token': localStorage.getItem('token') || '',
        },
      }
    );

    const responseData: IGetUserInfoResponse = await response.json();

    return responseData;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getUserByUsername = async (username: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL_SERVER}/user/${username}`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const responseData: IGetUserInfoResponse = await response.json();

    return responseData;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getUserIcon = async (username: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL_SERVER}/user/${username}/icon`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const responseData: IUserIconResponse = await response.json();
    return responseData;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export { logIn, signUp, getUser, getUserByUsername, getUserIcon };
