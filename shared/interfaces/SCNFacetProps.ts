export interface SCNFacetProps {
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
  End: any;
  GroupName?: string;
  HasImage: boolean;
  HasMetadataOption: boolean;
  ImagePath?: string;
  Label: string;
  MetadataPath: string;
  Order: number;
  Reference?: string;
  Start: any;
  Title: string;
  Url: string;
  Value: string;
}

interface SCNStats {
  Count: number;
  Currency: any;
  Max: number;
  Mean: number;
  Min: number;
  Missing: number;
  StdDev: number;
  Sum: number;
  SumOfSquares: number;
}
