import { UserProfile } from '~~/shared/enums/UserProfile';

export default defineNuxtRouteMiddleware(async () => {
  const { user } = useAuthStore();

  if (!user?.tipoUsuario || ![UserProfile.ADMIN].includes(user.tipoUsuario)) {
    return navigateTo('/');
  }
});
