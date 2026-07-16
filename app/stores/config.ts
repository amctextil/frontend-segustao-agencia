import { defineStore } from 'pinia';
import { WDColors } from 'widelab-utils';
import { BrandService } from '~/services/brand.service';
import { BRAND_LIST } from '~~/shared/constants/config';
import type {
  AppConfigProps,
  Brand,
} from '~~/shared/interfaces/AppConfigProps';

type BrandsConfig = Record<Brand['value'], AppConfigProps>;

export const useConfigStore = defineStore('config', {
  state: () => ({
    brandsConfig: {} as BrandsConfig,
    selectedBrand: null as AppConfigProps | null,
    isLoadingBrand: true,
    brandName: '',
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
          this.selectedBrand = this.brandsConfig[appId];
          this.colors = {
            background: this.brandsConfig[appId].corApp,
            text: WDColors.getContrastingTextColor(
              this.brandsConfig[appId].corApp,
            ),
          };
        }

        const data = await BrandService.get(appId);
        this.brandsConfig[appId] = data;
        this.selectedBrand = data;

        this.colors = {
          background: data.corApp,
          text: WDColors.getContrastingTextColor(data.corApp),
        };

        this.brandName =
          Object.values(BRAND_LIST).find((item) => item.value === appId)
            ?.title || '';
      } finally {
        this.isLoadingBrand = false;
      }
    },
  },
});
