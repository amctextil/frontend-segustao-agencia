import { z } from 'zod';
import type { UserProps } from '~~/shared/interfaces/UserProps';

const bodySchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

type LoginResponse = {
  message: string;
  auth?: { type: 'bearer'; token: string };
  user: UserProps;
};

export default defineEventHandler(async (event) => {
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
      message: 'Usuário ou senha inválidos',
    });
  }

  setCookie(event, 'auth_token', response.auth.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  return { authenticated: true };
});
