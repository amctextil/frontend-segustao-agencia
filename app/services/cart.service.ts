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

const get = async (appId: Brand['value'], userId: number, id: number) => {
  const listCarts = await list(appId, userId);
  return listCarts.find((item) => item.id === id);
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
