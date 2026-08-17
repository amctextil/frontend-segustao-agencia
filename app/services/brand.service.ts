import type { AppConfigProps } from '~~/shared/interfaces/AppConfigProps';

const get = async (appId: string) => {
  return await $fetch<AppConfigProps | undefined>(
    `/webapi/brand?appId=${appId}`,
  );
};

const list = async () => {
  return await $fetch<AppConfigProps[]>(`/webapi/brands`);
};

export const BrandService = { get, list };
