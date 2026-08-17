import { defineStore } from 'pinia';
import { BrandService } from '~/services/brand.service';
import type { AppConfigProps } from '~~/shared/interfaces/AppConfigProps';

export const useConfigStore = defineStore('config', () => {
  const brandList = ref<AppConfigProps[]>([]);
  const brand = ref<AppConfigProps>({
    nome: 'Open',
    appId: 'open',
    urlSite: 'lojaopen.com',
    urlImagens: 'https://d3vnyi5j6ba1mc.cloudfront.net',
  } as AppConfigProps);
  const isLoadingBrand = ref(true);
  const colors = ref({ background: '#FAFAFA', text: '#000000' });

  const finishLoading = () => {
    isLoadingBrand.value = false;
  };
  const loadBrands = async () => {
    brandList.value = await BrandService.list();
  };
  const selectbrand = async (appId: string) => {
    isLoadingBrand.value = true;

    try {
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
    } finally {
      isLoadingBrand.value = false;
    }
  };

  loadBrands().then(() => {
    if (brandList.value[0]?.appId) {
      selectbrand(brandList.value[0].appId);
    }
  });

  return {
    brandList,
    brand,
    isLoadingBrand,
    colors,

    finishLoading,
    loadBrands,
    selectbrand,
  };
});

export const SHARE_MESSAGE = 'Montei esse carrinho com novidades para você';
