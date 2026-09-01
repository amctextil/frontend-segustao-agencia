import { z } from 'zod';

const bodySchema = z.object({
  step: z.literal([1, 2, 3]),
  email: z.email(),
  agencyId: z.number(),
  token: z.string().optional(),
  password: z.string().optional(),
});

export default defineEventHandler(async (event) => {
  const { step, email, agencyId, token, password } = await readValidatedBody(
    event,
    bodySchema.parse,
  );

  const APIURL = process.env.API_URL || 'http://127.0.0.1:3333/api';

  const body = {
    email,
    idAgencia: agencyId,
    token,
    password,
  };

  const authorization =
    'NDgw.hlxinbFTQtJRfdYssRWAAlLc9gpH-KoNlXxvog-kF5HxbQWNQ2QCNOXhx7sQkH';

  try {
    switch (step) {
      case 3:
        return await $fetch(`${APIURL}/alteraSenha`, {
          method: 'POST',
          headers: { authorization },
          body,
        });

      case 2:
        return await $fetch(`${APIURL}/aprovaToken`, {
          method: 'POST',
          headers: { authorization },
          body,
        });

      default:
        return await $fetch(`${APIURL}/enviaToken`, {
          method: 'POST',
          headers: { authorization },
          body,
        });
    }
  } catch {
    throw new Error('Erro ao recuperar senha');
  }
});
