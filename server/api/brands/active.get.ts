import type { AppConfigProps } from '#shared/interfaces/AppConfigProps';

export default defineEventHandler(async () => {
  const APIURL = process.env.API_URL || 'http://127.0.0.1:3333/api';

  const response = await $fetch<AppConfigProps[]>(`${APIURL}/marcas/ativas`);

  return response;
});
