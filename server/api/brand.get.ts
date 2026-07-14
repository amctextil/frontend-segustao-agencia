import type { AppConfigProps } from '#shared/interfaces/AppConfigProps';
import { apiHub } from '../services/apiHub.service';

interface BrandQuery {
  appId: string;
}

export default defineEventHandler(async (event) => {
  const query = getQuery<BrandQuery>(event);

  const response = await apiHub.get<AppConfigProps>(
    `/api/v1/public/application/${query.appId}`,
  );

  return response;
});
