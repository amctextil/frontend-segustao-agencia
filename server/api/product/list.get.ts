import { BRAND_LIST } from '#shared/constants/config';
import type { Brand } from '#shared/interfaces/AppConfigProps';
import type { ProductResponseProps } from '#shared/interfaces/ProductResponseProps';

interface RequestQuery {
  appId: Brand['value'];
  lista: string;
  pagina: string;
  ordenacao: string;
}

export default defineEventHandler(async (event) => {
  const { appId, lista, pagina, ordenacao } = getQuery<RequestQuery>(event);

  const brandItem = BRAND_LIST.find((item) => item.value === appId);
  const baseURL = brandItem?.shopURL;
  const url = `${baseURL}/${lista}.json?pg=${pagina}&o=${ordenacao}`;

  const response = await $fetch<ProductResponseProps>(url, {
    mode: 'no-cors',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
    },
  });

  return response.Model.Grid;
});
