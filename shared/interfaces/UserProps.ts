import type { UserProfile } from '../enums/UserProfile';
import type { CouponProps } from './CouponProps';

export interface UserProps {
  id: number;
  idAgencia: number;
  nome: string;
  email: string;
  status: boolean;
  tipoUsuario: UserProfile;
  cupons?: CouponProps[];
}
