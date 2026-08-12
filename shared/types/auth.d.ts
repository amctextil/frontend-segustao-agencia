declare module '#auth-utils' {
  interface User {
    id: number;
    idAgencia: number;
    nome: string;
    email: string;
    status: boolean;
    tipoUsuario: number;
  }

  interface UserSession {
    loggedInAt: string;
  }

  interface SecureSessionData {
    token: string;
  }
}

export {};
