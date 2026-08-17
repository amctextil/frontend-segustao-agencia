import { defineStore } from 'pinia';
import { BrandService } from '~/services/brand.service';
import type { AppConfigProps } from '~~/shared/interfaces/AppConfigProps';

export const useConfigStore = defineStore('config', () => {
  const brandList = ref<AppConfigProps[]>([]);
  const brand = ref<AppConfigProps>();
  const colors = ref({ background: '#FAFAFA', text: '#000000' });

  const loadBrands = async () => {
    brandList.value = await BrandService.list();
  };
  const selectbrand = async (appId: string) => {
    const selectedBrand = brandList.value.find(
      (brand) => brand.appId === appId,
    );

    if (!selectedBrand) {
      throw createError({
        statusCode: 400,
        status: 400,
        statusMessage: 'Marca não encontrada',
      });
    }
    brand.value = selectedBrand;

    // this.colors = {
    //   background: brandConfig.corApp,
    //   text: WDColors.getContrastingTextColor(brandConfig.corApp),
    // };
  };

  return {
    brandList,
    brand,
    colors,

    loadBrands,
    selectbrand,
  };
});

export const SHARE_MESSAGE = 'Montei esse carrinho com novidades para você';
