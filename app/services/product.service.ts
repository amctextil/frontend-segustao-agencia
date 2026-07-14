import { BRAND_LIST } from '~/constants/config';
import type { Brand } from '~~/shared/interfaces/AppConfigProps';
import type { ProductResponseProps } from '~~/shared/interfaces/ProductResponseProps';

const getByList = async (
  appId: Brand['value'],
  page = 1,
  list = 'roupas',
  sort = 'nome-produto',
) => {
  const baseURL = BRAND_LIST.find((item) => item.value === appId)?.shopURL;

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

export const ProductService = { getByList };
