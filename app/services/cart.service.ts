import type { CartProps, NewCartItem } from '#shared/interfaces/CartProps';
import type { Brand } from '~~/shared/interfaces/AppConfigProps';

const list = async (appId: Brand['value']) => {
  return await $fetch<CartProps[]>(`/api/cart/list?appId=${appId}`);
};

const get = async (appId: Brand['value'], id: number) => {
  return await $fetch<CartProps>(`/api/cart/${id}?appId=${appId}`);
};

const createLink = async (
  appId: Brand['value'],
  produtos: NewCartItem[],
  nome?: string,
) => {
  const body = {
    appId,
    produtos,
    nome,
  };

  return await $fetch<CartProps>('/api/cart', { method: 'POST', body });
};

export const CartService = { list, get, createLink };
