import { requireAuthToken } from '~~/server/utils/auth';
import type { CartProps } from '~~/shared/interfaces/CartProps';

interface QueryParams {
  appId: string;
}

export default defineEventHandler(async (event) => {
  const query = getQuery<QueryParams>(event);
  const id = getRouterParam(event, 'id');
  const token = requireAuthToken(event);

  const paramList = [`appId=${query.appId}`];
  const params = paramList.join('&');

  const APIURL = process.env.API_URL || 'http://127.0.0.1:3333/api';

  const response = await $fetch<CartProps>(
    `${APIURL}/carrinhos/${id}?${params}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response;
});
