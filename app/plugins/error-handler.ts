export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vue:error', (error) => {
    if ((error as { status: number }).status == 401) {
      navigateTo('/login', { replace: true });
      clearError();
    }
  });
});
