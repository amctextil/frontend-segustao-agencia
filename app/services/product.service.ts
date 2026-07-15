import fakeProducts from '~/assets/products.fake.json';
import { BRAND_LIST } from '~/constants/config';
import type { Brand } from '~~/shared/interfaces/AppConfigProps';
import type {
  ProductResponseProps,
  SearchProductResponse,
} from '~~/shared/interfaces/ProductResponseProps';

const getByList = async (
  appId: Brand['value'],
  page = 1,
  list = 'roupas',
  sort = 'nome-produto',
) => {
  const baseURL = BRAND_LIST.find((item) => item.value === appId)?.shopURL;

  if (import.meta.dev) {
    const response = fakeProducts as ProductResponseProps;
    return response.Model.Grid;
  }

  const response = await $fetch<ProductResponseProps>(
    `${baseURL}/${list}.json?pg=${page}&o=${sort}`,
    {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
      },
    },
  );

  return response.Model.Grid;
};

const getBySearch = async (
  pesquisa: string,
  appId: Brand['value'],
  pagina = 1,
) => {
  return await $fetch<SearchProductResponse>(
    `/api/product/search?appId=${appId}&pagina=${pagina}&pesquisa=${pesquisa}`,
  );
};

export const ProductService = { getByList, getBySearch };
