import type {
  ProductGrid,
  SearchProductResponse,
} from '~~/shared/interfaces/ProductResponseProps';
import type { SCNCategory } from '~~/shared/interfaces/SCNCategory';
import type { SCNProductProps } from '~~/shared/interfaces/SCNProductProps';

const getByList = async (
  appId: string,
  page = 1,
  list = 'roupas',
  sort = 'nome-produto',
): Promise<ProductGrid | undefined> => {
  const fixedList = list.replace(/\/$/, '');

  const response = await useFetch<ProductGrid>(
    `${apiPrefix}/product/list?lista=${fixedList}&appId=${appId}&pagina=${page}&ordenacao=${sort}`,
  );

  if (!response.data.value) {
    throw createError({
      status: 500,
      message: 'Produtos não encontrados',
    });
  }

  return response.data.value;
};

const getBySearch = async (pesquisa: string, appId: string, pagina = 1) => {
  const response = await useFetch<SearchProductResponse>(
    `${apiPrefix}/product/search?appId=${appId}&pagina=${pagina}&pesquisa=${pesquisa}`,
  );

  if (!response.data.value) {
    throw createError({
      status: 500,
      message: 'Nenhum produto encontrado',
    });
  }

  return response.data.value;
};

const getProductByUrl = async (productUrl: string, appId: string) => {
  const response = await useFetch<SCNProductProps>(
    `${apiPrefix}/product?appId=${appId}&productUrl=${productUrl}`,
  );

  return response.data.value;
};

const getCategories = async (appId: string) => {
  const response = await useFetch<SCNCategory[]>(
    `${apiPrefix}/categories?appId=${appId}`,
  );

  return response.data.value;
};

export const ProductService = {
  getByList,
  getBySearch,
  getProductByUrl,
  getCategories,
};
