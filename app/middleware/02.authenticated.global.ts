export default defineNuxtRouteMiddleware(async (to) => {
  const { fetchUser, user } = useAuthStore();

  // Skip middleware if already on login page
  if (to.path.startsWith('/login')) {
    return;
  }

  try {
    await fetchUser();

    // redirect the user to the login screen if they're not authenticated
    if (!user) {
      return navigateTo('/login', { replace: true });
    }
  } catch (error) {
    if (import.meta.dev) {
      console.log('🚀 ~ 02.authenticated ~ error:', error);
    }
  }
});
