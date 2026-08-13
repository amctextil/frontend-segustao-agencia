import type { AppConfigProps } from '#shared/interfaces/AppConfigProps';
import { apiHub } from '../services/apiHub.service';

interface QueryParams {
  appId: string;
}

export default defineEventHandler(async (event) => {
  const query = getQuery<QueryParams>(event);

  const response = await apiHub.get<AppConfigProps>(
    `/api/v1/public/application/${query.appId}`,
  );

  return response;
});
