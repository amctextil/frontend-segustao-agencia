import type { UserProps } from '~~/shared/interfaces/UserProps';

const list = async () => {
  return await $fetch<UserProps[]>('/webapi/user/list');
};

const get = async (userId: number) => {
  return await $fetch<UserProps>(`/webapi/user/${userId}`);
};

export const UserService = { list, get };
