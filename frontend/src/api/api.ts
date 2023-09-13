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

export const loginWithCredentialsMethod = (
  body: types.LoginWithCredentialsMethodBody,
): Promise<types.LoginWithCredentialsMethodResponse> => {
  return callEndpoint<
    types.LoginWithCredentialsMethodResponse,
    types.LoginWithCredentialsMethodBody
  >({
    url: '/auth/login',
    method: 'post',
    data: body,
  });
};

export const logoutUserMethod = (): Promise<types.LogoutUserMethodResponse> => {
  return callEndpoint<types.LogoutUserMethodResponse, never>({
    url: '/auth/logout',
    method: 'post',
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

export const retrieveCurrentUserMethod =
  (): Promise<types.RetrieveCurrentUserMethodResponse> => {
    return callEndpoint<types.RetrieveCurrentUserMethodResponse, never>({
      url: '/auth/current-user',
      method: 'get',
    });
  };
