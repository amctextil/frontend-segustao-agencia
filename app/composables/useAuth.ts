import { useAuthStore } from '~/stores/auth';
import type { UserProps } from '~~/shared/interfaces/UserProps';

type AuthResponse = {
  authenticated: boolean;
  user: UserProps;
};

export const useAuth = () => {
  const authStore = useAuthStore();

  async function fetchUser() {
    try {
      // const response = await $fetch<AuthResponse>('/webapi/auth/me');
      const requestFetch = useRequestFetch();

      const response = await requestFetch<AuthResponse>('/webapi/auth/me');

      authStore.setUser(response.user);

      return response.user;
    } catch {
      authStore.clear();

      return null;
    } finally {
      authStore.setInitialized(true);
    }
  }

  async function login(email: string, password: string) {
    await $fetch('/webapi/auth/login', {
      method: 'POST',

      body: {
        email,
        password,
      },
    });

    await fetchUser();
  }

  async function logout() {
    try {
      await $fetch('/webapi/auth/logout', {
        method: 'POST',
      });
    } finally {
      authStore.clear();
      await navigateTo('/login');
    }
  }

  return {
    user: computed(() => authStore.user),
    loggedIn: computed(() => authStore.isAuthenticated),
    initialized: computed(() => authStore.initialized),

    login,
    logout,
    fetchUser,
  };
};
