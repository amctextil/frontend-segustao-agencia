export default defineNuxtRouteMiddleware(async (to) => {
  // Skip middleware if already on login page
  if (to.path.startsWith('/login')) {
    return;
  }

  const { loggedIn } = useUserSession();

  // redirect the user to the login screen if they're not authenticated
  if (!loggedIn.value) {
    return navigateTo('/login');
  }
});
