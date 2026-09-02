import type { AppConfigProps } from '~~/shared/interfaces/AppConfigProps';

const get = async (appId: string) => {
  return await useRequestFetch()<AppConfigProps | undefined>(
    `${apiPrefix}/brand?appId=${appId}`,
  );
};

const list = async () => {
  return await useRequestFetch()<AppConfigProps[]>(`${apiPrefix}/brands`);
};

const activeList = async () => {
  return await useRequestFetch()<AppConfigProps[]>(
    `${apiPrefix}/brands/active`,
  );
};

type SaveProps = {
  name: string;
  appId: string;
  active: boolean;
  urlSite: string;
  urlImages: string;
  urlCart: string;
  config: {
    cartDueDays: number;
  };
};

const add = async (params: SaveProps) => {
  return await useRequestFetch()<AppConfigProps>(`${apiPrefix}/brands`, {
    method: 'POST',
    body: params,
  });
};

const edit = async (id: number, params: Omit<SaveProps, 'appId'>) => {
  return await useRequestFetch()<AppConfigProps>(`${apiPrefix}/brands`, {
    method: 'PUT',
    body: { ...params, id },
  });
};

export const BrandService = { get, list, activeList, add, edit };
