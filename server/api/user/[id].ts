import type { UserProps } from '~~/shared/interfaces/UserProps';

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  const id = getRouterParam(event, 'id');

  if (!session.secure?.token) {
    throw createError({
      status: 401,
      statusCode: 401,
      message: 'Usuário não autenticado',
    });
  }

  const paramList = [`idAgencia=${session.user.idAgencia}`];
  const params = paramList.join('&');

  const response = await $fetch<UserProps>(
    `${process.env.API_URL}/usuarios/${id}?${params}`,
    {
      headers: {
        Authorization: `Bearer ${session.secure.token}`,
      },
    },
  );

  return response;
});
