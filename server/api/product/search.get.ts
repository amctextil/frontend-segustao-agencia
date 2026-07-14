import type { SearchProductResponse } from '#shared/interfaces/ProductResponseProps';

const Authorization =
  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vZWMyLTMtMTMzLTk3LTE4My51cy1lYXN0LTIuY29tcHV0ZS5hbWF6b25hd3MuY29tL2FwaS9hdXRoL2xvZ2luIiwiaWF0IjoxNzU5NzkyNTEyLCJleHAiOjYwMDAxNzU5NzkyNTEyLCJuYmYiOjE3NTk3OTI1MTIsImp0aSI6ImhGbkxseWFWWXowVTJSVlEiLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.AVQudijiOpoiK3iABAhPA9VtSFNMWiLQT29qKuqQ6WY';

interface RequestQuery {
  pesquisa: string;
  appId: string;
  pagina: string;
}

export default defineEventHandler(async (event) => {
  const query = getQuery<RequestQuery>(event);

  const response = await $fetch<SearchProductResponse>(
    'https://d2a3htxx2toa2p.cloudfront.net/api/produtos',
    {
      headers: {
        Authorization,
        'User-Agent':
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
      },
      method: 'POST',
      body: {
        buscar: query.pesquisa,
        marca: query.appId,
        page: query.pagina,
        size: 40,
      },
    },
  );

  return response;
});
