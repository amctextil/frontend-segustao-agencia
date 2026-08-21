import type { EventHandlerRequest, H3Event } from 'h3';
import type { AppConfigProps } from '~~/shared/interfaces/AppConfigProps';
import { apiApp } from '../services/apiApp.service';

export function requireAuthToken(event: H3Event<EventHandlerRequest>) {
  const token = getCookie(event, 'auth_token');

  if (!token) {
    throw createError({
      status: 401,
      message: 'Unauthenticated',
    });
  }

  return token;
}

export async function requireBrand(
  event: H3Event<EventHandlerRequest>,
  appId: string,
) {
  const token = requireAuthToken(event);

  const [brand] = await apiApp.get<AppConfigProps[]>(`/marcas?appId=${appId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!brand) {
    throw createError({
      status: 404,
      message: 'Marca não encontrada',
    });
  }

  return brand;
}
