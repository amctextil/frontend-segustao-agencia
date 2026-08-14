import type { UserProfile } from '../enums/UserProfile';

export interface UserProps {
  id: number;
  idAgencia: number;
  nome: string;
  email: string;
  status: boolean;
  tipoUsuario: UserProfile;
}
