import { BRAND_LIST } from '#shared/constants/config';
import type { SCNCategory } from '#shared/interfaces/SCNCategory';

interface RequestQuery {
  appId: string;
}

const SCN_SUGGESTION_TOKEN =
  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vZDE2b296aTlhdTR6NGIuY2xvdWRmcm9udC5uZXQvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE3NTM0MDQ4NjEsImV4cCI6NjAwMDE3NTM0MDQ4NjEsIm5iZiI6MTc1MzQwNDg2MSwianRpIjoiUTgxOUlIUHNaT2NCRkxlZyIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.JfgNHy3Uh3pcSOh8y_rWq7JwMOIcKBknYWrc5H2v8mo';

type DataResponse<T> =
  { data: undefined; error: string } | { data: T[]; error: undefined };

export default defineEventHandler(async (event) => {
  const { appId } = getQuery<RequestQuery>(event);

  const brandItem = BRAND_LIST.find((item) => item.value === appId);
  const baseURL = brandItem?.shopURL || '';
  const usedBaseURL = baseURL.replace(/https?:\/\/(www.)?/g, '');
  const url = `https://carrinho.${usedBaseURL}/api/categorias?marca=${appId}`;

  const response = await $fetch<DataResponse<SCNCategory>>(url, {
    mode: 'no-cors',
    method: 'POST',
    headers: {
      Authorization: SCN_SUGGESTION_TOKEN,
    },
  });

  if (typeof response.error !== 'undefined') {
    throw new Error(response.error);
  }

  return response.data;
});
