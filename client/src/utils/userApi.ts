import { IGetUserInfoResponse } from '../types/IUser';
import { IUserIconResponse } from '../types/IUserIcon';

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

const getUserIcon = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL_SERVER}/user/icon`,
      {
        headers: {
          Accept: 'application/json',
          'x-access-token': localStorage.getItem('token') || '',
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

const getUserIconByUsername = async (username: string) => {
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

export { getUser, getUserIcon, getUserByUsername, getUserIconByUsername };
