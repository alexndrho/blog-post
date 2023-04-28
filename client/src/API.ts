import axios, { AxiosResponse } from 'axios';

const baseUrl = 'http://localhost:3000';

const getBlogs = async (): Promise<AxiosResponse<ApiDataType>> => {
  const blog: AxiosResponse<ApiDataType> = await axios.get(baseUrl + '/blogs');
  return blog;
};

const addBlog = async (
  formData: IBlog
): Promise<AxiosResponse<ApiDataType>> => {
  const blog: Omit<IBlog, '_id'> = {
    title: formData.title,
    snippet: formData.snippet,
    body: formData.body,
  };
  const saveBlog: AxiosResponse<ApiDataType> = await axios.post(
    baseUrl + '/add-todo',
    blog
  );
  return saveBlog;
};

const deleteBlog = async (_id: string): Promise<AxiosResponse<ApiDataType>> => {
  const deletedTodo: AxiosResponse<ApiDataType> = await axios.delete(
    `${baseUrl}/delete-todo/${_id}`
  );

  return deletedTodo;
};

export { getBlogs, addBlog, deleteBlog };
