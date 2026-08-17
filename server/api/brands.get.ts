import type { AppConfigProps } from '#shared/interfaces/AppConfigProps';

export default defineEventHandler(async (event) => {
  const token = requireAuthToken(event);

  const APIURL = process.env.API_URL || 'http://127.0.0.1:3333/api';

  const response = await $fetch<AppConfigProps[]>(`${APIURL}/marcas`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
});
