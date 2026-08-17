import { requireAuthToken } from '~~/server/utils/auth';
import type { UserProps } from '~~/shared/interfaces/UserProps';

interface QueryParams {
  idAgencia: string;
}

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const query = getQuery<QueryParams>(event);
  const token = requireAuthToken(event);

  const paramList = [`idAgencia=${query.idAgencia}`];
  const params = paramList.join('&');

  const APIURL = process.env.API_URL || 'http://127.0.0.1:3333/api';

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
