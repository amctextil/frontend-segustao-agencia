import type { AppConfigProps } from '~~/shared/interfaces/AppConfigProps';

const get = async (appId: string) => {
  return await $fetch<AppConfigProps | undefined>(
    `${apiPrefix}/brand?appId=${appId}`,
  );
};

const list = async () => {
  return await $fetch<AppConfigProps[]>(`${apiPrefix}/brands`);
};

const activeList = async () => {
  return await $fetch<AppConfigProps[]>(`${apiPrefix}/brands/active`);
};

export const BrandService = { get, list, activeList };
