import { UserProfile } from '~~/shared/enums/UserProfile';

export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn, user } = useUserSession();

  // redirect the user to the login screen if they're not authenticated
  if (!loggedIn.value) {
    return navigateTo('/login');
  }

  if (
    !user.value?.tipoUsuario ||
    ![UserProfile.ADMIN].includes(user.value.tipoUsuario)
  ) {
    return navigateTo('/');
  }
});
