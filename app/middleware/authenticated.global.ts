export default defineNuxtRouteMiddleware(async (to) => {
  const { fetchUser, user } = useAuth();

  // Skip middleware if already on login page
  if (to.path.startsWith('/login')) {
    return;
  }

  // redirect the user to the login screen if they're not authenticated
  if (!user.value) {
    return navigateTo('/login', { replace: true });
  }

  await fetchUser();
});
