import { Buffer } from 'node:buffer';
import { ApiService } from './ApiService';

const APIHUB_USER = 'widelab-app';
const APIHUB_PASS = 'Xk1KJyYxUyZGXVZF';

const apiHubToken = Buffer.from(`${APIHUB_USER}:${APIHUB_PASS}`).toString(
  'base64',
);

export const apiHub = new ApiService('https://apihub.amctextil.com.br', {
  Authorization: `Basic ${apiHubToken}`,
});
