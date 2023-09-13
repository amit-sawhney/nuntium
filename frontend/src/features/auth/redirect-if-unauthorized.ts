import { useApi } from '@/api';
import { LoaderFunction, redirect } from 'react-router-dom';

const redirectIfUnauthorized: LoaderFunction = async () => {
  const api = useApi();

  const res = await api.retrieveCurrentUserMethod();

  if (api.isError(res)) {
    return redirect('/login');
  } else if (res.user === null) {
    return redirect('/login');
  }

  return { ok: true };
};

export default redirectIfUnauthorized;
