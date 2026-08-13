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

export type SearchProductResponse = {
  success: boolean;
  message: string;
  data: ProductGrid;
};

interface SCNFacetProps {
  Alias: string;
  AvailableOptions: SCNAvailableOption[];
  Name: string;
  PropertyDisplayName: string;
  PropertyMetadataID: number;
  SearchFacetID: number;
  Stats?: SCNStats;
}

interface SCNAvailableOption {
  Color?: string;
  Count: number;
  GroupName?: string;
  HasImage: boolean;
  HasMetadataOption: boolean;
  ImagePath?: string;
  Label: string;
  MetadataPath: string;
  Order: number;
  Reference?: string;
  Title: string;
  Url: string;
  Value: string;
}

interface SCNStats {
  Count: number;
  Max: number;
  Mean: number;
  Min: number;
  Missing: number;
  StdDev: number;
  Sum: number;
  SumOfSquares: number;
}
