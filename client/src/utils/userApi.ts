import { IGetUserInfoResponse } from '../types/IUser';

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

export { getUser, getUserByUsername };
