import * as api from './api';
import { isError } from './api-helpers';

// I am aware that this isn't actually a usecase for a hook,
// but this is more for extensibility in the future.
export const useApi = () => ({
  ...api,
  isError,
});
