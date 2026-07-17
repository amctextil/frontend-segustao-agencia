import { defineStore } from 'pinia';
import type {
  SCNCartItemProps,
  SCNProductPrarent,
} from '~~/shared/interfaces/SCNCartItemProps';

type SCNCartVariant = Omit<
  SCNCartItemProps,
  'Quantity' | 'MediaPath' | 'Name' | 'productParent'
>;

export const useCartStore = defineStore('cart', () => {
  const configStore = useConfigStore();

  // Syncs seamlessly between SSR (server) and CSR (client)
  const cartCookie = useCookie<SCNCartItemProps[]>(
    'shopping-cart-' + configStore.selectedBrand?.appId,
    {
      default: () => [],
      watch: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
    },
  );

  // Reactive state
  const items = ref<SCNCartItemProps[]>(cartCookie.value);

  // Sync state changes back to the cookie automatically
  watch(
    items,
    (newItems) => {
      cartCookie.value = newItems;
    },
    { deep: true },
  );

  // Getters
  const totalItems = computed(() =>
    items.value.reduce((acc, item) => acc + item.Quantity, 0),
  );
  const totalPrice = computed(() =>
    items.value.reduce(
      (acc, item) =>
        acc + (item.PromotionPrice || item.ListPrice) * item.Quantity,
      0,
    ),
  );

  // Actions
  function addToCart(
    {
      ListPrice,
      ProductID,
      PromotionPrice,
      SKUOptions,
      VariationPath,
    }: SCNCartVariant,
    productParent: SCNProductPrarent,
    MediaPath: string,
  ) {
    const existingItem = items.value.find(
      (item) =>
        item.ProductID === ProductID && item.VariationPath === VariationPath,
    );

    if (existingItem) {
      return;
    }

    const parsedSKUOptions = SKUOptions.map((option) => ({
      Alias: option.Alias,
      Title: option.Title,
    }));

    const newCartItem: SCNCartItemProps = {
      ListPrice,
      ProductID,
      PromotionPrice,
      SKUOptions: parsedSKUOptions,
      VariationPath,
      Quantity: 1,
      MediaPath,
      Name: productParent.Name,
      productParent: {
        IntegrationID: productParent.IntegrationID,
        ProductID: productParent.ProductID,
        Name: productParent.Name,
        Url: productParent.Url,
      },
    };

    items.value.push({ ...newCartItem, Quantity: 1 });
  }

  function removeFromCart(productId: string | number) {
    items.value = items.value.filter((item) => item.ProductID !== productId);
  }

  function updateQuantity(productId: string | number, quantity: number) {
    const item = items.value.find((item) => item.ProductID === productId);
    if (item && quantity > 0) {
      item.Quantity = quantity;
    }
  }

  function clearCart() {
    items.value = [];
  }

  return {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
});
