import type { UserProfile } from '~~/shared/enums/UserProfile';
import type { UserProps } from '~~/shared/interfaces/UserProps';

const list = async () => {
  return await $fetch<UserProps[]>(`${apiPrefix}/user/list`);
};

const get = async (userId: string) => {
  return await $fetch<UserProps>(`${apiPrefix}/user/${userId}`);
};

const add = async (
  name: string,
  email: string,
  active: boolean,
  type: UserProfile,
) => {
  const body = {
    nome: name,
    email,
    ativo: active,
    tipo: type,
  };

  return await $fetch<UserProps>(`${apiPrefix}/user`, {
    method: 'POST',
    body,
  });
};

const edit = async (
  id: string,
  name: string,
  email: string,
  active: boolean,
  type: UserProfile,
) => {
  const body = {
    nome: name,
    email,
    ativo: active,
    tipo: type,
    id,
  };

  return await $fetch<UserProps>(`${apiPrefix}/user`, {
    method: 'PUT',
    body,
  });
};

export const UserService = { list, get, add, edit };
