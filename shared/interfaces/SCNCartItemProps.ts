import type { SCNProductProps, SCNSkuOption } from './SCNProductProps';

export type SCNProductPrarent = Pick<
  SCNProductProps,
  'IntegrationID' | 'ProductID' | 'Name' | 'Url'
>;

export type SCNCartSKUoption = Pick<SCNSkuOption, 'Alias' | 'Title'>;

export interface SCNCartItemProps {
  Quantity: number;
  MediaPath: string;
  Name: string;
  // IntegrationID: string;
  ListPrice: number;
  ProductID: number;
  // ProductPath: string;
  PromotionPrice: number;
  // RetailPrice: number;
  // SKU: string;
  SKUOptions: SCNCartSKUoption[];
  VariationPath: string;
  productParent: SCNProductPrarent;
  // StockBalance: number;
}
