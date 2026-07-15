import type { Brand } from '../interfaces/AppConfigProps';

declare module '#auth-utils' {
  interface User {
    id: number;
    nome: string;
    appId: Brand['value'];
  }

  interface UserSession {
    loggedInAt: string;
  }
}

export {};
