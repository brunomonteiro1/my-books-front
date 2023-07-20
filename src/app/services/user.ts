import { apiExternal } from './api';

export async function getUser() {
  const user = await apiExternal.get(`/users?_limit=1`);

  return user.data;
}
