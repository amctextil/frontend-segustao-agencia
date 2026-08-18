<script lang="ts" setup>
import type { NuxtError } from '#app';

const { logout } = useAuth();

defineProps({
  error: {
    type: Object as () => NuxtError,
    default: () => ({
      status: 404,
      message: 'Página não encontrada',
    }),
  },
});

const handleError = () => {
  logout();
  clearError({ redirect: '/login' });
};
</script>

<template>
  <NuxtLayout name="login">
    <v-app>
      <div
        class="d-flex align-center justify-center h-100 w-100 overflow-hidden bg-grey-lighten-2"
      >
        <v-card
          class="pa-8 bg-grey-lighten-5"
          :title="
            error.status === 404
              ? 'Para onde você está indo?'
              : 'Algo inesperado aconteceu!'
          "
          :text="
            error.status === 404
              ? 'A página que você procura não existe'
              : error.message
          "
          elevation="3"
        >
          <v-btn block @click="handleError">Voltar ao início</v-btn>
        </v-card>
      </div>
    </v-app>
  </NuxtLayout>
</template>

<style></style>
