import type { BRAND_LIST } from '~/constants/config';

interface BrandProps {
  id: number;
  name: string;
}

export interface AppConfigProps {
  brands: BrandProps[];
  appStoreLink: string;
  corApp: string;
  corAppLogin: string;
  corIconeMenu: string;
  corMenu: string;
  facebookId: number;
  formatoIcones: string;
  imagemApp: string;
  imagemAppLogin: string;
  name: string;
  playStoreLink: string;
  urlLogo: string;
  appId: Brand['value'];
}

export type Brand = (typeof BRAND_LIST)[number];
