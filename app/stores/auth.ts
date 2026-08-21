import { defineStore } from 'pinia';
import type { UserProps } from '~~/shared/interfaces/UserProps';

type AuthResponse = {
  authenticated: boolean;
  user: UserProps;
};

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserProps | null>(null);

  async function fetchUser() {
    try {
      const requestFetch = useRequestFetch();

      const response = await requestFetch<AuthResponse>(`${apiPrefix}/auth/me`);

      user.value = response.user;

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
      user.value = null;
      await navigateTo('/login', { replace: true });
    }
  }

  return {
    user,
    login,
    logout,
    fetchUser,
  };
});
