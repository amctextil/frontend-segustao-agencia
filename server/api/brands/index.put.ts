import { z } from 'zod';
import type { AppConfigProps } from '~~/shared/interfaces/AppConfigProps';

const bodySchema = z.object({
  id: z.number(),
  name: z.string(),
  appId: z.string(),
  urlSite: z.url(),
  urlImages: z.url(),
  urlCart: z.url(),
  active: z.boolean(),
  config: z.object({
    cartDueDays: z.number(),
  }),
});

export default defineEventHandler(async (event) => {
  const requestBody = await readValidatedBody(event, bodySchema.parse);
  const token = requireAuthToken(event);

  const APIURL = process.env.API_URL || 'http://127.0.0.1:3333/api';

  const response = await $fetch<AppConfigProps>(
    `${APIURL}/marcas/${requestBody.id}`,
    {
      method: 'PUT',
      body: {
        nome: requestBody.name,
        appId: requestBody.appId,
        ativo: requestBody.active,
        urlSite: requestBody.urlSite,
        urlImagens: requestBody.urlImages,
        link: requestBody.urlCart,
        configuracoes: {
          diasExpiracao: requestBody.config.cartDueDays,
        },
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response;
});
