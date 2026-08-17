import type { UserProfile } from '~~/shared/enums/UserProfile';
import type { UserProps } from '~~/shared/interfaces/UserProps';

const list = async (idAgencia: number) => {
  return await $fetch<UserProps[]>(`/webapi/user/list?idAgencia=${idAgencia}`);
};

const get = async (userId: string, idAgencia: number) => {
  return await $fetch<UserProps>(
    `/webapi/user/${userId}?idAgencia=${idAgencia}`,
  );
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

  return await $fetch<UserProps>(`/webapi/user`, {
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

  return await $fetch<UserProps>(`/webapi/user`, {
    method: 'PUT',
    body,
  });
};

export const UserService = { list, get, add, edit };
