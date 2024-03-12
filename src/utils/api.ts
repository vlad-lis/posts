import axios, { AxiosError } from 'axios';
import { BASE_URL } from './constants';

export type TPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const getPosts = async () => {
  try {
    const res = await axios.get(BASE_URL);

    console.log(res.data);
    return {
      success: true,
      data: res.data,
    };
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      return { success: false, status: err.response?.status };
    }

    console.error('An unknown error occurred: ', err);
    return { success: false, status: undefined };
  }
};

export const getPost = {
  // todo: single post api
};
