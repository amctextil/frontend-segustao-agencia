export default defineNuxtPlugin(async (_nuxtApp) => {
  const { user } = useUserSession();
  const configStore = useConfigStore();

  if (user.value) {
    try {
      await configStore.selectbrand(user.value.appId);
    } catch (error) {
      if (import.meta.dev) {
        console.error('🚀 ~ initAuth ~ error:', error);
      }
    }
  }

  configStore.finishLoading();
});
