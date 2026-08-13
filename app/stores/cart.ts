import { defineStore } from 'pinia';
import { WDStrings } from 'widelab-utils';
import type { NewCartItem } from '~~/shared/interfaces/CartProps';
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
  const cartCookie = useCookie<NewCartItem[]>(
    'shopping-cart-' + configStore.brand.appId,
    {
      default: () => [],
      watch: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
    },
  );

  // Reactive state
  const items = ref<NewCartItem[]>(cartCookie.value);

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
    items.value.reduce((acc, item) => acc + item.quantidade, 0),
  );
  const totalPrice = computed(() =>
    items.value.reduce(
      (acc, item) =>
        acc + (item.precoPromocional || item.preco) * item.quantidade,
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
      IntegrationID,
      SKU,
    }: SCNCartVariant,
    productParent: SCNProductPrarent,
    MediaPath: string,
  ) {
    const existingItem = items.value.find(
      (item) =>
        item.produtoId === ProductID && item.varianteId === VariationPath,
    );

    if (existingItem) {
      return;
    }

    const cor = SKUOptions.find((option) =>
      WDStrings.isContentMatchingSearch(option.Alias, 'cor'),
    );
    const tamanho = SKUOptions.find((option) =>
      WDStrings.isContentMatchingSearch(option.Alias, 'cor'),
    );

    const newCartItem: NewCartItem = {
      preco: ListPrice,
      produtoId: ProductID,
      precoPromocional: PromotionPrice,
      varianteId: VariationPath,
      quantidade: 1,
      urlImagem: MediaPath,
      nome: productParent.Name,
      paiProdutoId: String(productParent.ProductID),
      paiIntegracaoId: productParent.IntegrationID,
      url: productParent.Url,

      cor: cor?.Title || '',
      corId: cor?.PropertyPath || '',

      tamanho: tamanho?.Title || '',
      tamanhoId: tamanho?.PropertyPath || '',
      ref: IntegrationID,
      skuId: SKU,
    };

    items.value.push(newCartItem);
  }

  function removeFromCart(productId: string | number) {
    items.value = items.value.filter((item) => item.produtoId !== productId);
  }

  function updateQuantity(productId: string | number, quantity: number) {
    const item = items.value.find((item) => item.produtoId === productId);
    if (item && quantity > 0) {
      item.quantidade = quantity;
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
