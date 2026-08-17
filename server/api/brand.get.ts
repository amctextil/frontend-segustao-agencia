import type { AppConfigProps } from '#shared/interfaces/AppConfigProps';

interface QueryParams {
  appId: string;
}

export default defineEventHandler(async (event) => {
  const query = getQuery<QueryParams>(event);

  const token = requireAuthToken(event);

  const APIURL = process.env.API_URL || 'http://127.0.0.1:3333/api';

  const response = await $fetch<AppConfigProps[]>(
    `${APIURL}/marcas?appid=${query.appId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response[0];
});
