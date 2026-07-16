import type { SCNProductProps } from '#shared/interfaces/SCNProductProps';
import { BRAND_LIST } from '~~/shared/constants/config';
import type { Brand } from '~~/shared/interfaces/AppConfigProps';

interface RequestQuery {
  appId: Brand['value'];
  productUrl: string;
}

export default defineEventHandler(async (event) => {
  const { appId, productUrl } = getQuery<RequestQuery>(event);

  const brandItem = BRAND_LIST.find((item) => item.value === appId);
  const baseURL = brandItem?.shopURL;

  const response = await $fetch<{ Model: SCNProductProps }>(
    `${baseURL}/${productUrl}.json`,
    {
      mode: 'no-cors',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
      },
    },
  );

  return response.Model;
});
