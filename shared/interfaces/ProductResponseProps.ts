import type { SCNFacetProps } from './SCNFacetProps';
import type { SCNProductProps } from './SCNProductProps';

export interface ProductGrid {
  Facets: SCNFacetProps[];
  HasNextPage: boolean;
  HasPreviousPage: boolean;
  PageLast: number;
  PageNumber: number;
  PageSize: number;
  ProductCount: number;
  Products: SCNProductProps[];
}

export interface ProductResponseProps {
  Model: {
    Grid: ProductGrid;
  };
}
