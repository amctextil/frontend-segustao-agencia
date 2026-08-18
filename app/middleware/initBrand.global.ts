export default defineNuxtRouteMiddleware(async (to, from) => {
  const configStore = useConfigStore();

  // Wait for brands to be loaded
  if (configStore.brandList.length === 0) {
    await configStore.loadBrands();
  }
});
