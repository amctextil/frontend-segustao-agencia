import { requireAuthToken } from '~~/server/utils/auth';
import type { UserProps } from '~~/shared/interfaces/UserProps';

export default defineEventHandler(async (event) => {
  const token = requireAuthToken(event);

  try {
    const APIURL = process.env.API_URL || 'http://127.0.0.1:3333/api';

    const user = await $fetch<UserProps>(`${APIURL}/usuarios/atual`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      authenticated: true,
      user,
    };
  } catch {
    deleteCookie(event, 'auth_token', {
      path: '/',
    });

    throw createError({
      statusCode: 401,
      statusMessage: 'Sessão expirada',
    });
  }
});
