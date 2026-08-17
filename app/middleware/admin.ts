import { useAuthStore } from '~/stores/auth';
import { UserProfile } from '~~/shared/enums/UserProfile';

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();

  // redirect the user to the login screen if they're not authenticated
  if (!authStore.isAuthenticated) {
    return navigateTo('/login');
  }

  const { user } = authStore;

  if (!user?.tipoUsuario || ![UserProfile.ADMIN].includes(user.tipoUsuario)) {
    return navigateTo('/');
  }
});
