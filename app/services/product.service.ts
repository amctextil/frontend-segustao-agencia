import { BRAND_LIST } from '~~/shared/constants/config';
import type { Brand } from '~~/shared/interfaces/AppConfigProps';
import type {
  ProductGrid,
  SearchProductResponse,
} from '~~/shared/interfaces/ProductResponseProps';
import type { SCNProductProps } from '~~/shared/interfaces/SCNProductProps';

const getByList = async (
  appId: Brand['value'],
  page = 1,
  list = 'roupas',
  sort = 'nome-produto',
) => {
  // const baseURL = BRAND_LIST.find((item) => item.value === appId)?.shopURL;

  // if (import.meta.dev) {
  //   const response = fakeProducts as ProductResponseProps;
  //   return response.Model.Grid;
  // }

  return await $fetch<ProductGrid>(
    `/api/product/list?lista=${list}&appId=${appId}&pagina=${page}&ordenacao=${sort}`,
  );

  // const url = `${baseURL}/${list}.json?pg=${page}&o=${sort}`;
  // console.log('🚀🚀 ~ getByList ~ url:', url);
  // const response = await $fetch<ProductResponseProps>(url, {
  //   mode: 'no-cors',
  //   headers: {
  //     'User-Agent':
  //       'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
  //   },
  // });
  // console.log('🚀 ~ getByList ~ response:', response);

  // return response.Model.Grid;
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

const getProductByUrl = (productUrl: string, appId: Brand['value']) => {
  const baseURL = BRAND_LIST.find((item) => item.value === appId)?.shopURL;

  return $fetch<SCNProductProps>(`${baseURL}/${productUrl}.json`, {
    mode: 'no-cors',
  });
};

export const ProductService = { getByList, getBySearch, getProductByUrl };
