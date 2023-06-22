import {
  IBlogCreateResponse,
  IBlogData,
  IBlogResponse,
  IBlogSuccessResponse,
  IBlogsResponse,
} from '../types/IBlog';
import { IGetUsernameByIdResponse } from '../types/IUser';

// get
const getBlogs = async (page: number) => {
  try {
    const responseBlog = await fetch(
      `${import.meta.env.VITE_BASE_URL_SERVER}/blogs?page=${page}`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const responseDataBlog: IBlogsResponse = await responseBlog.json();

    return responseDataBlog;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getBlogsByUserId = async (userId: string, page: number) => {
  try {
    const responseBlog = await fetch(
      `${
        import.meta.env.VITE_BASE_URL_SERVER
      }/blogs/user/${userId}?page=${page}`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const responseDataBlog: IBlogsResponse = await responseBlog.json();

    return responseDataBlog;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getBlog = async (id: string) => {
  try {
    const responseBlog = await fetch(
      `${import.meta.env.VITE_BASE_URL_SERVER}/blogs/${id}`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const responseDataBlog: IBlogResponse = await responseBlog.json();

    return responseDataBlog;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getBlogsUsernames = async (blogs: IBlogData[]) => {
  try {
    const names: (string | undefined)[] = await Promise.all(
      blogs?.map(async (blog) => {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL_SERVER}/user/username/${
            blog.userId
          }`,
          {
            headers: {
              Accept: 'application/json',
            },
          }
        );

        const responseData: IGetUsernameByIdResponse = await response.json();
        return responseData.username;
      }) ?? []
    );

    const isAllDefined = (arr?: Array<string | undefined>): arr is string[] => {
      return arr?.every((username) => username !== undefined) ?? false;
    };

    if (isAllDefined(names)) {
      return names;
    } else {
      throw new Error('Could not fetch usernames');
    }
  } catch (err) {
    console.log(err);
    return null;
  }
};

// post
const createBlog = async (
  title: string,
  snippet: string,
  body: string,
  format: string
) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL_SERVER}/blogs/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token') as string,
        },
        body: JSON.stringify({ title, snippet, body, format }),
      }
    );

    const responseData: IBlogCreateResponse = await response.json();

    return responseData;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const updateBlog = async (
  id: IBlogData['_id'],
  title: IBlogData['title'],
  snippet: IBlogData['snippet'],
  body: IBlogData['body'],
  format: IBlogData['format']
) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL_SERVER}/blogs/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token') || '',
        },
        body: JSON.stringify({ title, snippet, body, format }),
      }
    );

    const responseData: IBlogSuccessResponse = await response.json();

    return responseData;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const deleteBlog = async (id: IBlogData['_id']) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL_SERVER}/blogs/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token') || '',
        },
      }
    );

    const responseData: IBlogSuccessResponse = await response.json();

    return responseData;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export {
  getBlogs,
  getBlogsByUserId,
  getBlog,
  getBlogsUsernames,
  createBlog,
  updateBlog,
  deleteBlog,
};
