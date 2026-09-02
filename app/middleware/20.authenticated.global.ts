export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();

  // Skip middleware if already on login page
  if (to.path.startsWith('/login')) {
    return;
  }

  try {
    await authStore.fetchUser();

    // redirect the user to the login screen if they're not authenticated
    if (!authStore.user) {
      return navigateTo('/login', { replace: true });
    }
  } catch (error) {
    if (import.meta.dev) {
      console.log('🚀 ~ 02.authenticated ~ error:', error);
    }
  }
});
