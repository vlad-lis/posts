import axios, { AxiosError, AxiosResponse } from 'axios';
import { BASE_URL } from './constants';

export type TPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type TUserInfo = {
  name: string;
};

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  status?: number;
};

const fetchData = async <T>(url: string): Promise<ApiResponse<T>> => {
  try {
    const res: AxiosResponse<T> = await axios.get(url);
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

// fetch all posts
export const getPosts = async (): Promise<ApiResponse<TPost[]>> => {
  return fetchData<TPost[]>(`${BASE_URL}/posts`);
};

// fetch a single post
export const getPost = async (postId: string): Promise<ApiResponse<TPost>> => {
  return fetchData<TPost>(`${BASE_URL}/posts/${postId}`);
};

// fetch user info
export const getUser = async (
  userId: number
): Promise<ApiResponse<TUserInfo>> => {
  return fetchData<TUserInfo>(`${BASE_URL}/${userId}`);
};
