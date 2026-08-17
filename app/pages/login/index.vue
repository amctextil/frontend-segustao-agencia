<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';

const { login } = useAuth();

const credentials = reactive({
  email: '',
  password: '',
});

const errorMessage = ref('');
const isLoading = ref(false);
const passShow = ref(false);

async function handleLogin() {
  try {
    errorMessage.value = '';
    isLoading.value = true;

    await login(credentials.email, credentials.password);

    await navigateTo('/');
  } catch (error) {
    if (import.meta.dev) {
      console.log('🚀 ~ login ~ error:', error);
    }

    errorMessage.value = 'Erro ao fazer login';
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <NuxtLayout name="login">
    <div
      class="ma-8 w-md-66 d-flex flex-column align-center justify-center ga-8 text-grey-darken-3"
    >
      <h1 class="align-self-start text-h4">Login</h1>

      <v-form
        ref="form"
        class="w-100 d-flex flex-column ga-4 text-grey-darken-4"
        @submit.prevent="handleLogin"
      >
        <v-text-field
          v-model="credentials.email"
          label="E-mail"
          prepend-inner-icon="mdi-email-outline"
          type="email"
        />

        <ClientOnly>
          <v-text-field
            v-model="credentials.password"
            label="Senha"
            counter
            prepend-inner-icon="mdi-key-outline"
            :append-inner-icon="passShow ? 'mdi-eye' : 'mdi-eye-off'"
            :type="passShow ? 'text' : 'password'"
            @click:append-inner="passShow = !passShow"
          />

          <template #fallback>
            <v-text-field
              label="Senha"
              prepend-inner-icon="mdi-key-outline"
              append-inner-icon="mdi-eye-off"
              type="password"
              :loading="true"
            />
          </template>
        </ClientOnly>

        <v-btn :loading="isLoading" type="submit"> Entrar </v-btn>

        <strong class="text-center text-red-darken-1">
          {{ errorMessage }}
        </strong>

        <v-btn :loading="isLoading" variant="text" to="/login/recuperar-senha">
          Recuperar senha
        </v-btn>
      </v-form>
    </div>
  </NuxtLayout>
</template>
