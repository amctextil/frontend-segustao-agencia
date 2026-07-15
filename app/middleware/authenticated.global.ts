export default defineNuxtRouteMiddleware((to) => {
  const navigateToLogin = () => {
    if (to.path.startsWith('/login')) {
      return; // Exits the middleware and allows normal navigation
    }

    return navigateTo('/login');
  };

  const { loggedIn } = useUserSession();

  // redirect the user to the login screen if they're not authenticated
  if (!loggedIn.value) {
    return navigateToLogin();
  }
});
