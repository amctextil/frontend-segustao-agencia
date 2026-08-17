import type { CartProps, NewCartItem } from '#shared/interfaces/CartProps';

const list = async (appId: string) => {
  return await $fetch<CartProps[]>(`/webapi/cart/list?appId=${appId}`);
};

const get = async (appId: string, id: number) => {
  return await $fetch<CartProps>(`/webapi/cart/${id}?appId=${appId}`);
};

const createLink = async (
  appId: string,
  produtos: NewCartItem[],
  nome?: string,
) => {
  const body = {
    appId,
    produtos,
    nome,
  };

  return await $fetch<CartProps>('/webapi/cart', { method: 'POST', body });
};

export const CartService = { list, get, createLink };
