import type {
  AppConfigProps,
  Brand,
} from '~~/shared/interfaces/AppConfigProps';

const get = async (appId: Brand['value']) => {
  return await $fetch<AppConfigProps>(`/api/brand?appId=${appId}`);
};

export const BrandService = { get };
