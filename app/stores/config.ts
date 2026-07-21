import { defineStore } from 'pinia';
import { WDColors } from 'widelab-utils';
import { BrandService } from '~/services/brand.service';
import { BRAND_LIST } from '~~/shared/constants/config';
import type {
  AppConfigProps,
  Brand,
} from '~~/shared/interfaces/AppConfigProps';

type BrandData = AppConfigProps & { data?: (typeof BRAND_LIST)[number] };

type BrandsConfig = Record<Brand['value'], BrandData>;

export const useConfigStore = defineStore('config', {
  state: () => ({
    brandsConfig: {} as BrandsConfig,
    brand: null as BrandData | null,
    isLoadingBrand: true,
    colors: { background: '#FAFAFA', text: '#000000' },
  }),
  actions: {
    finishLoading() {
      this.isLoadingBrand = false;
    },
    async selectbrand(appId: Brand['value']) {
      this.isLoadingBrand = true;

      try {
        if (this.brandsConfig[appId]) {
          this.brand = this.brandsConfig[appId];
          this.colors = {
            background: this.brandsConfig[appId].corApp,
            text: WDColors.getContrastingTextColor(
              this.brandsConfig[appId].corApp,
            ),
          };
        }

        const response = await BrandService.get(appId);
        const data = BRAND_LIST.find((item) => item.value === appId);
        const brandConfig = { data, ...response };
        this.brandsConfig[appId] = brandConfig;
        this.brand = brandConfig;

        this.colors = {
          background: brandConfig.corApp,
          text: WDColors.getContrastingTextColor(brandConfig.corApp),
        };
      } finally {
        this.isLoadingBrand = false;
      }
    },
  },
});
