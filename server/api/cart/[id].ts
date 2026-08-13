import type { CartProps } from '~~/shared/interfaces/CartProps';

interface QueryParams {
  appId: string;
}

export default defineEventHandler(async (event) => {
  const query = getQuery<QueryParams>(event);
  const session = await requireUserSession(event);
  const id = getRouterParam(event, 'id');

  if (!session.secure?.token) {
    throw createError({
      status: 401,
      statusCode: 401,
      message: 'Usuário ou senha inválidos',
    });
  }

  const paramList = [`appId=${query.appId}`];
  const params = paramList.join('&');

  const response = await $fetch<CartProps>(
    `${process.env.API_URL}/carrinhos/${id}?${params}`,
    {
      headers: {
        Authorization: `Bearer ${session.secure.token}`,
      },
    },
  );

  return response;
});
