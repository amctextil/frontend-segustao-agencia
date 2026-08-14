import { z } from 'zod';
import { BRAND_LIST } from '~~/shared/constants/config';
import type { CartProps } from '~~/shared/interfaces/CartProps';

const bodySchema = z.object({
  appId: z.enum(BRAND_LIST.map((b) => b.value)),
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
  const session = await requireUserSession(event);

  if (!session.secure?.token) {
    throw createError({
      status: 401,
      statusCode: 401,
      message: 'Usuário não autenticado',
    });
  }

  const response = await $fetch<CartProps>(`${process.env.API_URL}/carrinhos`, {
    method: 'POST',
    body,
    headers: {
      Authorization: `Bearer ${session.secure.token}`,
    },
  });

  return response;
});
