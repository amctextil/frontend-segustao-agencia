import type { ProductResponseProps } from '#shared/interfaces/ProductResponseProps';
import { requireBrand } from '~~/server/utils/auth';

interface RequestQuery {
  appId: string;
  lista: string;
  pagina: string;
  ordenacao: string;
}

export default defineEventHandler(async (event) => {
  const { appId, lista, pagina, ordenacao } = getQuery<RequestQuery>(event);

  const brand = await requireBrand(event, appId);
  const url = `${brand.urlSite}/${lista}.json?pg=${pagina}&o=${ordenacao}`;

  const response = await $fetch<ProductResponseProps>(url, {
    mode: 'no-cors',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
    },
  });

  return response.Model.Grid;
});
