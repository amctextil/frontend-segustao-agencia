export default defineNuxtRouteMiddleware(async (to) => {
  const { fetchUser, initialized, loggedIn } = useAuth();

  // Skip middleware if already on login page
  if (to.path.startsWith('/login')) {
    return;
  }

  if (!initialized.value) {
    await fetchUser();
  }

  // redirect the user to the login screen if they're not authenticated
  if (!loggedIn) {
    return navigateTo('/login');
  }
});
