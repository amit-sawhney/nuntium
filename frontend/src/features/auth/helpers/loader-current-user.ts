import { LoaderFunction } from 'react-router-dom';

import * as types from '@/api/generated-api-types';
import { useApi } from '@/api';

interface LoadCurrentUserLoaderData {
  user: types.RetrieveCurrentUserMethodResponse['user'] | null;
}

const loadCurrentUser: LoaderFunction =
  async (): Promise<LoadCurrentUserLoaderData> => {
    const api = useApi();

    const res = await api.retrieveCurrentUserMethod();

    if (api.isError(res)) {
      return { user: null };
    }

    return { user: res.user };
  };

export default loadCurrentUser;
