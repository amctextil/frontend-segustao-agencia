import { defineStore } from 'pinia';
import { BrandService } from '~/services/brand.service';
import type {
  AppConfigProps,
  Brand,
} from '~~/shared/interfaces/AppConfigProps';

type BrandsConfig = Record<Brand['value'], AppConfigProps>;

export const useMyConfigStore = defineStore('config', {
  state: () => ({
    brandsConfig: {} as BrandsConfig,
    isLoadingBrand: true,
  }),
  actions: {
    finishLoading() {
      this.isLoadingBrand = false;
    },
    async fetchAppConfig(appId: Brand['value']) {
      this.isLoadingBrand = true;

      try {
        const data = await BrandService.get(appId);
        this.brandsConfig[appId] = data;
      } finally {
        this.isLoadingBrand = false;
      }
    },
  },
});
