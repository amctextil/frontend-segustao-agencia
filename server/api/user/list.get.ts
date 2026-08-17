import type { UserProps } from '#shared/interfaces/UserProps';
import { requireAuthToken } from '~~/server/utils/auth';

interface QueryParams {
  idAgencia: string;
}

export default defineEventHandler(async (event) => {
  const token = requireAuthToken(event);
  const query = getQuery<QueryParams>(event);

  const paramList = [`idAgencia=${query.idAgencia}`];
  const params = paramList.join('&');

  const APIURL = process.env.API_URL || 'http://127.0.0.1:3333/api';

  const response = await $fetch<UserProps[]>(`${APIURL}/usuarios?${params}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
});
