import type { UserProps } from '~~/shared/interfaces/UserProps';

const list = async () => {
  return await $fetch<UserProps[]>('/api/user/list');
};

export const UserService = {
  list,
};
