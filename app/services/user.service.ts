import type { UserProps } from '~~/shared/interfaces/UserProps';

const list = async (idAgencia: number) => {
  return await $fetch<UserProps[]>(`/webapi/user/list?idAgencia=${idAgencia}`);
};

const get = async (userId: number, idAgencia: number) => {
  return await $fetch<UserProps>(
    `/webapi/user/${userId}?idAgencia=${idAgencia}`,
  );
};

export const UserService = { list, get };
