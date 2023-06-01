import IUser, { ILoginResponse, ISignUpResponse } from '../types/IUser';
import IUserIcon from '../types/IUserIcon';

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

    if (!response) throw new Error('Could not log in');

    const responseData: ILoginResponse = await response.json();
    localStorage.setItem('token', responseData.token);

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

    if (!response) throw new Error('Could not sign up');

    const responseData: ISignUpResponse = await response.json();
    return responseData;
  } catch (err) {
    console.error(err);
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

    if (!response.ok) throw new Error('Could not fetch user');

    const responseData: IUser = await response.json();
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

    if (!response.ok) throw new Error('Could not fetch user');

    const responseData: IUser = await response.json();
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

    if (!response.ok) throw new Error('Could not fetch user icon');

    const responseData: IUserIcon = await response.json();
    return responseData;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export { logIn, signUp, getUser, getUserByUsername, getUserIcon };
