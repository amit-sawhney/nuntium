import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5001/api',
});

instance.defaults.headers.common['Content-Type'] = 'application/json';
instance.defaults.withCredentials = true;

interface Options {
  params?: Record<string, unknown>;
  query?: Record<string, unknown>;
}

const buildUrl = (url: string, options: Options) => {
  const { params, query } = options;
  let builtUrl = url;

  if (params) {
    Object.keys(params).forEach((key) => {
      builtUrl = builtUrl.replace(`:${key}`, params[key] as string);
    });
  }

  if (query) {
    const queryString = Object.keys(query)
      .map((key) => `${key}=${query[key]}`)
      .join('&');
    builtUrl = `${builtUrl}?${queryString}`;
  }

  return builtUrl;
};

interface EndpointArgs<T> extends AxiosRequestConfig<T> {
  url: string;
  urlParams?: Record<string, any>;
}

export const callEndpoint = async <T, K>(
  payload: EndpointArgs<K>,
): Promise<T> => {
  const { url, method, data, params, urlParams, ...rest } = payload;

  const uri = buildUrl(url, {
    params: urlParams,
    query: params,
  });

  const response = await instance.request<T>({
    url: uri,
    method,
    data,
    ...rest,
  });

  return response.data;
};
