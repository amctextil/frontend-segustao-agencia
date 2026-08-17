import { z } from 'zod';
import { requireAuthToken } from '~~/server/utils/auth';
import type { CartProps } from '~~/shared/interfaces/CartProps';

const bodySchema = z.object({
  appId: z.string(),
  nome: z.string().optional(),
  descricao: z.string().optional(),
  produtos: z.array(
    z.object({
      preco: z.float32(),
      produtoId: z.int(),
      precoPromocional: z.float32(),
      varianteId: z.string(),
      quantidade: z.int(),
      urlImagem: z.string(),
      nome: z.string(),
      paiProdutoId: z.string(),
      paiIntegracaoId: z.string(),
      url: z.string(),
      cor: z.string(),
      corId: z.string(),
      tamanho: z.string(),
      tamanhoId: z.string(),
      ref: z.string(),
      skuId: z.string(),
    }),
  ),
});

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, bodySchema.parse);
  const token = requireAuthToken(event);

  const APIURL = process.env.API_URL || 'http://127.0.0.1:3333/api';
  const response = await $fetch<CartProps>(`${APIURL}/carrinhos`, {
    method: 'POST',
    body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
});
