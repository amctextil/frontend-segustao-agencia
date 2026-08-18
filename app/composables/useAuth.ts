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
      const requestFetch = useRequestFetch();

      const response = await requestFetch<AuthResponse>(`${apiPrefix}/auth/me`);

      authStore.setUser(response.user);

      return response.user;
    } catch {
      await logout();
    }
  }

  async function login(email: string, password: string) {
    await $fetch(`${apiPrefix}/auth/login`, {
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
      await $fetch(`${apiPrefix}/auth/logout`, {
        method: 'POST',
      });
    } finally {
      authStore.clear();
      await navigateTo('/login');
    }
  }

  return {
    user: computed(() => authStore.user),

    login,
    logout,
    fetchUser,
  };
};
