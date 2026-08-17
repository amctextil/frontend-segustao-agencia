import { defineStore } from 'pinia';
import type { UserProps } from '~~/shared/interfaces/UserProps';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserProps | null>(null);
  const initialized = ref(false);

  const isAuthenticated = computed(() => !!user.value);

  function setUser(value: UserProps | null) {
    user.value = value;
  }

  function clear() {
    user.value = null;
  }

  function setInitialized(value: boolean) {
    initialized.value = value;
  }

  return {
    user,
    initialized,
    isAuthenticated,
    setUser,
    clear,
    setInitialized,
  };
});
