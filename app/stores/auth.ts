import { defineStore } from 'pinia';
import type { UserProps } from '~~/shared/interfaces/UserProps';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserProps | null>(null);

  function setUser(value: UserProps | null) {
    user.value = value;
  }

  function clear() {
    user.value = null;
  }

  return {
    user,
    setUser,
    clear,
  };
});
