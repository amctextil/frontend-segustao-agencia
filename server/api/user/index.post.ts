import { z } from 'zod';
import { UserProfile } from '~~/shared/enums/UserProfile';
import type { UserProps } from '~~/shared/interfaces/UserProps';

const bodySchema = z.object({
  nome: z.string(),
  email: z.email(),
  ativo: z.boolean(),
  tipo: z.enum(UserProfile),
  password: z.string(),
});

export default defineEventHandler(async (event) => {
  const requestBody = await readValidatedBody(event, bodySchema.parse);
  const token = requireAuthToken(event);

  const APIURL = process.env.API_URL || 'http://127.0.0.1:3333/api';

  const user = await $fetch<UserProps>(`${APIURL}/usuarios/atual`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!user) {
    throw createError({
      status: 401,
      message: 'Sessão expirada',
    });
  }

  const response = await $fetch(`${APIURL}/usuarios`, {
    method: 'POST',
    body: {
      nome: requestBody.nome,
      email: requestBody.email,
      status: requestBody.ativo,
      tipoUsuario: requestBody.tipo,
      idAgencia: user.idAgencia,
      password: requestBody.password,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
});
