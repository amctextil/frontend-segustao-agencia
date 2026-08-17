import { requireAuthToken } from '~~/server/utils/auth';
import type { UserProps } from '~~/shared/interfaces/UserProps';

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const token = requireAuthToken(event);

  const APIURL = process.env.API_URL || 'http://127.0.0.1:3333/api';

  const user = await $fetch<UserProps>(`${APIURL}/usuarios/atual`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!user) {
    throw createError({
      status: 401,
      message: 'Sessão expirada',
    });
  }

  const paramList = [`idAgencia=${user.idAgencia}`];
  const params = paramList.join('&');

  const response = await $fetch<UserProps>(
    `${APIURL}/usuarios/${id}?${params}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response;
});
