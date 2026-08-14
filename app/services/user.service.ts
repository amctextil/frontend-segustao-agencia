import type { UserProps } from '~~/shared/interfaces/UserProps';

const list = async () => {
  return await $fetch<UserProps[]>('/api/user/list');
};

const get = async (userId: number) => {
  return await $fetch<UserProps>(`/api/user/${userId}`);
};

export const UserService = { list, get };
