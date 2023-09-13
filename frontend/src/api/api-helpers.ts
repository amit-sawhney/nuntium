import axios, { AxiosError, AxiosRequestConfig } from 'axios';

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
    const sortedParams = Object.keys(params).sort();

    // add params to url
    builtUrl = `${builtUrl}/${sortedParams
      .map((key) => params[key])
      .join('/')}`;
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

export interface ErrorWrapper {
  error: AxiosError;
}

export const callEndpoint = async <T, K>(
  payload: EndpointArgs<K>,
): Promise<T | ErrorWrapper> => {
  const { url, method, data, params, urlParams, ...rest } = payload;

  const uri = buildUrl(url, {
    params: urlParams,
    query: params,
  });

  try {
    const response = await instance.request<T>({
      url: uri,
      method,
      data,
      ...rest,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return { error };
    }

    throw error;
  }
};

export const isError = <T>(
  response: T | ErrorWrapper,
): response is ErrorWrapper => {
  return (response as ErrorWrapper).error !== undefined;
};
