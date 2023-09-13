import { useApi } from '@/api';
import { AxiosError } from 'axios';
import { LoaderFunction, redirect } from 'react-router-dom';

const redirectIfUnauthorized: LoaderFunction = async () => {
  const api = useApi();

  const res = await api
    .retrieveCurrentUserMethod()
    .catch((error: AxiosError) => ({
      error,
    }));

  if (api.isError(res)) {
    return redirect('/login');
  }

  if (res.user === null) {
    return redirect('/login');
  }

  return { ok: true };
};

export default redirectIfUnauthorized;
