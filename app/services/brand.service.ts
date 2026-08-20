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

const add = async (
  name: string,
  appId: string,
  active: boolean,
  urlSite: string,
  urlImages: string,
  urlCart: string,
  config: {
    cartDueDays: number;
  },
) => {
  const body = {
    name,
    appId,
    active,
    urlSite,
    urlImages,
    urlCart,
    config,
  };

  return await $fetch<AppConfigProps>(`${apiPrefix}/brands`, {
    method: 'POST',
    body,
  });
};

export const BrandService = { get, list, activeList, add };
