export default defineNuxtRouteMiddleware((to) => {
  if (to.path.startsWith('/login')) {
    return; // Exits the middleware and allows normal navigation
  }

  const { loggedIn } = useUserSession();

  // redirect the user to the login screen if they're not authenticated
  if (!loggedIn.value) {
    return navigateTo('/login');
  }
});
