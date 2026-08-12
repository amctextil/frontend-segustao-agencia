export default defineNuxtPlugin(async (_nuxtApp) => {
  const configStore = useConfigStore();

  try {
    await configStore.selectbrand(configStore.brand.appId || 'colcci');
  } catch (error) {
    if (import.meta.dev) {
      console.error('🚀 ~ initAuth ~ error:', error);
    }
  }

  configStore.finishLoading();
});
