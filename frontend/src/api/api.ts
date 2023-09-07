import { callEndpoint } from './api-helpers';
import * as types from './generated-api-types';

export const findAllUsersMethod = (
  params: types.FindAllUsersMethodParams,
  query: types.FindAllUsersMethodQuery,
  body: types.FindAllUsersMethodBody,
): Promise<types.FindAllUsersMethodResponse> => {
  return callEndpoint<
    types.FindAllUsersMethodResponse,
    types.FindAllUsersMethodBody
  >({
    url: '/users',
    method: 'get',
    params: query,
    urlParams: params,
    data: body,
  });
};

export const registerCredentialsMethod = (
  body: types.RegisterCredentialsMethodBody,
): Promise<types.RegisterCredentialsMethodResponse> => {
  return callEndpoint<
    types.RegisterCredentialsMethodResponse,
    types.RegisterCredentialsMethodBody
  >({
    url: '/auth/register',
    method: 'post',
    data: body,
  });
};
