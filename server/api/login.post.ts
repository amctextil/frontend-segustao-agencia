import type { User } from '#auth-utils';
import { z } from 'zod';

const bodySchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

type LoginResponse = {
  message: string;
  auth?: { type: 'bearer'; token: string };
  user: User;
};

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log('🚀 ~ body:', body);
  const { email, password } = await readValidatedBody(event, bodySchema.parse);

  const APIURL = process.env.API_URL || 'http://127.0.0.1:3333/api';

  const response = await $fetch<LoginResponse>(`${APIURL}/auth/login`, {
    method: 'POST',
    body: {
      email,
      password,
    },
  });

  if (!response.auth?.token) {
    throw createError({
      status: 401,
      statusCode: 401,
      message: 'Usuário ou senha inválidos',
    });
  }

  await setUserSession(event, {
    user: response.user,
    loggedInAt: new Date().toISOString(),
    secure: {
      token: response.auth.token,
    },
  });

  return {};
});
