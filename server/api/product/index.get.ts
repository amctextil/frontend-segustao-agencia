import type { SCNProductProps } from '#shared/interfaces/SCNProductProps';
import { requireBrand } from '~~/server/utils/auth';

interface RequestQuery {
  appId: string;
  productUrl: string;
}

export default defineEventHandler(async (event) => {
  const { appId, productUrl } = getQuery<RequestQuery>(event);
  const brand = await requireBrand(event, appId);

  const response = await $fetch<{ Model: SCNProductProps }>(
    `${brand.urlSite}/${productUrl}.json`,
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
