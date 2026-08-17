import { UserProfile } from '~~/shared/enums/UserProfile';

export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn, user } = useAuth();

  // redirect the user to the login screen if they're not authenticated
  if (!loggedIn) {
    return navigateTo('/login');
  }

  if (
    !user.value?.tipoUsuario ||
    ![UserProfile.ADMIN].includes(user.value.tipoUsuario)
  ) {
    return navigateTo('/');
  }
});
