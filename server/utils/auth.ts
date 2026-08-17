export function requireAuthToken(event: H3Event<EventHandlerRequest>) {
  const token = getCookie(event, 'auth_token');

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthenticated',
    });
  }

  return token;
}
