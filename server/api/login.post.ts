import { z } from 'zod';
import { BRAND_LIST } from '~/constants/config';

const bodySchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  appId: z.enum(BRAND_LIST.map((b) => b.value)),
});

export default defineEventHandler(async (event) => {
  const { email, password, appId } = await readValidatedBody(
    event,
    bodySchema.parse,
  );

  if (email === 'admin@admin.com' && password === 'abc123456') {
    // set the user session in the cookie
    // this server util is auto-imported by the auth-utils module
    await setUserSession(event, {
      user: {
        id: Math.random() * 99999,
        nome: 'John Doe',
        appId,
      },
      loggedInAt: new Date().toISOString(),
    });
    return {};
  }

  throw createError({
    status: 401,
    message: 'Usuário ou senha inválidos',
  });
});
