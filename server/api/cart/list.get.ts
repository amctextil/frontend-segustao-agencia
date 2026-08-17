import type { CartProps } from '#shared/interfaces/CartProps';
import { requireAuthToken } from '~~/server/utils/auth';

interface QueryParams {
  appId: string;
}

export default defineEventHandler(async (event) => {
  const query = getQuery<QueryParams>(event);
  const token = requireAuthToken(event);

  const paramList = [`appId=${query.appId}`];
  const params = paramList.join('&');

  const APIURL = process.env.API_URL || 'http://127.0.0.1:3333/api';

  const response = await $fetch<CartProps[]>(`${APIURL}/carrinhos?${params}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
});
