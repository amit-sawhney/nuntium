import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const get = async (url: string) => {
  const response = await api.get(url);
  return response.data;
};

export const post = async (url: string, data: any) => {
  const response = await api.post(url, data);
  return response.data;
};

export const put = async (url: string, data: any) => {
  const response = await api.put(url, data);
  return response.data;
};

export const del = async (url: string) => {
  const response = await api.delete(url);
  return response.data;
};

const fetchExample = async () => {
  const response = await get('/example');
  return response;
};
