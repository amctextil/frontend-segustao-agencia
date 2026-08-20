import { UserProfile } from '~~/shared/enums/UserProfile';

export default defineNuxtRouteMiddleware(() => {
  const { user } = useAuth();

  // redirect the user to the login screen if they're not authenticated
  if (!user.value) {
    return navigateTo('/login', { replace: true });
  }

  if (
    !user.value?.tipoUsuario ||
    ![UserProfile.ADMIN].includes(user.value.tipoUsuario)
  ) {
    return navigateTo('/');
  }
});
