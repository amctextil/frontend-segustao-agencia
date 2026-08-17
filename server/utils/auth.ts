import type { AppConfigProps } from '~~/shared/interfaces/AppConfigProps';

export function requireAuthToken(event: H3Event<EventHandlerRequest>) {
  const token = getCookie(event, 'auth_token');

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthenticated',
    });
  }

  return token;
}

export async function requireBrand(
  event: H3Event<EventHandlerRequest>,
  appId: string,
) {
  const token = requireAuthToken(event);

  const APIURL = process.env.API_URL || 'http://127.0.0.1:3333/api';

  const [brand] = await $fetch<AppConfigProps[]>(
    `${APIURL}/marcas?appid=${appId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!brand) {
    throw createError({
      statusCode: 404,
      status: 404,
      statusMessage: 'Marca não encontrada',
    });
  }

  return brand;
}
