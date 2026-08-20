import { ApiService } from './ApiService';

const APIURL = process.env.API_URL || 'http://127.0.0.1:3333/api';

export const apiApp = new ApiService(APIURL);
