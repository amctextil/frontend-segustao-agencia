import { defineStore } from 'pinia';
import { BrandService } from '~/services/brand.service';
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
