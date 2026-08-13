import type { CartProps } from '#shared/interfaces/CartProps';
import type { Brand } from '~~/shared/interfaces/AppConfigProps';

type SCNCreateLinkProductProps = {
  ref: string;
  name: string;
  productid: string;
  skuid: string;
  quantity: number;
  urlimagem: string;
};

const list = async (appId: Brand['value']) => {
  return await $fetch<CartProps[]>(`/api/cart/list?appId=${appId}`);
};

const get = async (appId: Brand['value'], id: number) => {
  return await $fetch<CartProps>(`/api/cart/${id}?appId=${appId}`);
};

const createLink = (
  appid: Brand['value'],
  products: SCNCreateLinkProductProps[],
  name?: string,
) => {
  const body = {
    appid,
    products,
    name,
  };

  console.log(body);
};

export const CartService = { list, get, createLink };
