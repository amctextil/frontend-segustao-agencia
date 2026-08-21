import { UserProfile } from '~~/shared/enums/UserProfile';

export default defineNuxtRouteMiddleware(async () => {
  const { fetchUser, user } = useAuthStore();

  await fetchUser();

  // redirect the user to the login screen if they're not authenticated
  if (!user) {
    return navigateTo('/login', { replace: true });
  }

  if (!user?.tipoUsuario || ![UserProfile.ADMIN].includes(user.tipoUsuario)) {
    return navigateTo('/');
  }
});
