import type { Brand } from '../interfaces/AppConfigProps';

declare module '#auth-utils' {
  interface User {
    id: number;
    nome: string;
    appId: Brand['value'];
    role: 'admin' | 'vendedor' | 'desenvolvimento';
  }

  interface UserSession {
    loggedInAt: string;
  }
}

export {};
