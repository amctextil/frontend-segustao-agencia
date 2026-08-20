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

  const response = await $fetch<ProductGrid>(
    `${apiPrefix}/product/list?lista=${fixedList}&appId=${appId}&pagina=${page}&ordenacao=${sort}`,
  );

  if (!response) {
    throw createError({
      status: 500,
      message: 'Produtos não encontrados',
    });
  }

  return response;
};

const getBySearch = async (pesquisa: string, appId: string, pagina = 1) => {
  return await $fetch<SearchProductResponse>(
    `${apiPrefix}/product/search?appId=${appId}&pagina=${pagina}&pesquisa=${pesquisa}`,
  );
};

const getProductByUrl = async (productUrl: string, appId: string) => {
  const response = await $fetch<SCNProductProps>(
    `${apiPrefix}/product?appId=${appId}&productUrl=${productUrl}`,
  );

  return response;
};

const getCategories = async (appId: string) => {
  const response = await $fetch<SCNCategory[]>(
    `${apiPrefix}/categories?appId=${appId}`,
  );

  return response;
};

export const ProductService = {
  getByList,
  getBySearch,
  getProductByUrl,
  getCategories,
};
