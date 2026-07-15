export interface SCNProductProps {
  AllowOnlyAdditionalPurchase: boolean;
  Availability: string;
  AvailabilityText: string;
  BrowsingImage: BrowsingImage;
  BrowsingImages: BrowsingImage[];

  CurrentSkuID: number;
  IntegrationID: string;
  Items: SCNVariant[];
  LeafCategoryId: number;
  ListPrice: number;
  Medias: Media[];
  MediaSmall: string;
  Name: string;
  Options: Option[];
  Price: Price;
  ProductDefinitionID: number;
  ProductID: number;
  ProductTypeID: number;
  PromotionPrice: number;
  PropertyPath: string;
  PurchasingFormID: number;
  RetailPrice: number;
  RetailPriceMax: number;
  RetailPriceMin: number;
  ShortDescription: string;
  SKU: string;
  Descriptions: SCNProductDescription[];
  Url: string;
}

export interface BrowsingImage {
  HasMediaPath: boolean;
  Height: number;
  Index: number;
  MaxHeight: number;
  MaxWidth: number;
  MediaPath: string;
  MediaSizeType: string;
  MediaType: string;
  ProductPath: string;
  Title?: string;
  Url?: string;
  VariationPath: string;
  Width: number;
}

interface Option {
  Label: string;
  PropertyMetadataID: number;
  PropertyName: string;
  Values: SCNValue[];
  VariationLayoutTemplate: string;
}

interface SCNValue {
  Color?: string;
  GroupName?: string;
  HasItems: boolean;
  ImagePath?: string;
  OptionID: number;
  Order: number;
  PropertyPath: string;
  Reference?: string;
  Text: string;
  Value: string;
}

interface Price {
  ListPrice: number;
  ListPriceWithTax: number;
  SalesPrice: number;
  SalesPriceDiscount: number;
  SalesPriceWithTax: number;
  SalesPriceWithTaxDiscount: number;
  Tax: number;
  TaxationAmount: number;
}

interface Media {
  Height: number;
  Index: number;
  MaxHeight: number;
  MaxWidth: number;
  MediaPath: string;
  MediaSizeType: string;
  MediaType: string;
  ProductPath: string;
  Title?: string;
  Url?: string;
  VariationPath: string;
  Width: number;
}

interface SCNProductDescription {
  Alias: string;
  Color?: string;
  GroupName?: string;
  GroupType: string;
  ImagePath?: string;
  Name: string;
  Order: number;
  PropertyMetadataID: number;
  PropertyPath: string;
  Reference?: string;
  Title: string;
  Value: string;
  ValueAlias: string;
}

interface SCNVariant {
  Availability: 'I' | 'O';
  AvailabilityText: string;
  IntegrationID: string;
  ListPrice: number;
  Options: Option[];
  ProductID: number;
  ProductPath: string;
  PromotionPrice: number;
  RetailPrice: number;
  SKU: string;
  SKUOptions: SCNSkuoption[];
  VariationPath: string;
  StockBalance: number;
}

interface SCNSkuoption {
  Alias: string;
  Color?: string;
  GroupName?: string;
  GroupType: string;
  ImagePath?: string;
  Name: string;
  Order: number;
  PropertyMetadataID: number;
  PropertyPath: string;
  Reference?: string;
  Title: string;
  Value: string;
  ValueAlias: string;
}
