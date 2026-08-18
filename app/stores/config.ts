import { defineStore } from 'pinia';
import { BrandService } from '~/services/brand.service';
import type { AppConfigProps } from '~~/shared/interfaces/AppConfigProps';

export const useConfigStore = defineStore('config', () => {
  const brandList = ref<AppConfigProps[]>([]);
  const brand = ref<AppConfigProps>({} as AppConfigProps);

  const selectbrand = (appId: string) => {
    const selectedBrand = brandList.value.find(
      (brand) => brand.appId === appId,
    );

    if (!selectedBrand) {
      throw createError({
        status: 400,
        message: 'Marca não encontrada',
      });
    }
    brand.value = selectedBrand;
  };

  const loadBrands = async () => {
    brandList.value = await BrandService.activeList();

    const [newBrand] = brandList.value;

    if (newBrand && !brand.value) {
      brand.value = newBrand;
    }

    return brandList.value;
  };

  return {
    brandList,
    brand,

    loadBrands,
    selectbrand,
  };
});

export const SHARE_MESSAGE = 'Montei esse carrinho com novidades para você';
