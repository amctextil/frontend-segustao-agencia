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
  const response = await useFetch<ProductGrid>(
    `/api/product/list?lista=${list}&appId=${appId}&pagina=${page}&ordenacao=${sort}`,
  );

  return response.data.value;
};

const getBySearch = async (
  pesquisa: string,
  appId: Brand['value'],
  pagina = 1,
) => {
  const response = await useFetch<SearchProductResponse>(
    `/api/product/search?appId=${appId}&pagina=${pagina}&pesquisa=${pesquisa}`,
  );
  return response.data.value;
};

const getProductByUrl = async (productUrl: string, appId: Brand['value']) => {
  // const baseURL = BRAND_LIST.find((item) => item.value === appId)?.shopURL;

  // const response = await useFetch<SCNProductProps>(
  //   `${baseURL}/${productUrl}.json`,
  //   {
  //     mode: 'no-cors',
  //   },
  // );
  const response = await useFetch<SCNProductProps>(
    `/api/product?appId=${appId}&productUrl=${productUrl}`,
  );

  return response.data.value;
};

export const ProductService = { getByList, getBySearch, getProductByUrl };
