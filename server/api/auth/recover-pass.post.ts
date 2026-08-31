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
    senha: password,
  };

  const authorization =
    'NDgw.hlxinbFTQtJRfdYssRWAAlLc9gpH-KoNlXxvog-kF5HxbQWNQ2QCNOXhx7sQkH';

  try {
    switch (step) {
      case 3:
        await $fetch(`${APIURL}/alteraSenha`, {
          method: 'POST',
          headers: { authorization },
          body,
        });
        break;

      case 2:
        await $fetch(`${APIURL}/aprovaToken`, {
          method: 'POST',
          headers: { authorization },
          body,
        });
        break;

      default:
        await $fetch(`${APIURL}/enviaToken`, {
          method: 'POST',
          headers: { authorization },
          body,
        });
        break;
    }
  } catch {
    throw new Error('Erro ao recuperar senha');
  }
});
