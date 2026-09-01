<template>
  <NuxtLayout name="login">
    <div
      class="ma-8 w-md-66 d-flex flex-column align-center justify-center ga-8 text-grey-darken-3"
    >
      <h1 class="align-self-start text-h4">Recuperar senha</h1>

      <RecoverPassEmail
        v-if="step == 1"
        :is-loading="isLoading"
        @submit="sendCode"
      />
      <RecoverPassOtp
        v-else-if="step == 2"
        :is-loading="isLoading"
        @submit="validateCode"
      />
      <RecoverPassNewpass v-else :is-loading="isLoading" @submit="setNewPass" />

      <v-btn variant="text" to="/login" replace>Voltar para o Login</v-btn>
    </div>

    <v-snackbar-queue
      v-model="messages"
      timeout="2000"
      color="error"
      location="bottom"
    />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { SnackbarMessage } from 'vuetify/lib/components/VSnackbarQueue/VSnackbarQueue.mjs';
import RecoverPassEmail from '~/components/login/recover-pass-email.vue';
import RecoverPassNewpass from '~/components/login/recover-pass-newpass.vue';
import RecoverPassOtp from '~/components/login/recover-pass-otp.vue';

const router = useRouter();

const isLoading = ref(false);
const step = ref(1);
const messages = ref<SnackbarMessage[]>([]);
const values = ref({
  email: '',
  agencyId: 1,
  code: '',
  newPass: '',
});

const sendCode = async (email: string, agencyId: number) => {
  isLoading.value = true;
  try {
    await $fetch(`${apiPrefix}/auth/recover-pass`, {
      method: 'POST',

      body: {
        step: 1,
        email,
        agencyId,
      },
    });

    values.value.email = email;
    values.value.agencyId = agencyId;
    step.value = 2;
  } catch (error) {
    if (import.meta.dev) {
      console.log('🚀 ~ sendCode ~ error:', error);
    }

    messages.value.push('Erro ao enviar código');
  } finally {
    isLoading.value = false;
  }
};

const validateCode = async (token: string) => {
  isLoading.value = true;
  try {
    await $fetch(`${apiPrefix}/auth/recover-pass`, {
      method: 'POST',

      body: {
        step: 2,
        email: values.value.email,
        agencyId: values.value.email,
        token,
      },
    });

    values.value.code = token;

    step.value = 3;
  } catch (error) {
    if (import.meta.dev) {
      console.log('🚀 ~ validateCode ~ error:', error);
    }

    messages.value.push('Erro ao validar código');
  } finally {
    isLoading.value = false;
  }
};

const setNewPass = async (newPass: string) => {
  isLoading.value = true;

  try {
    await $fetch(`${apiPrefix}/auth/recover-pass`, {
      method: 'POST',

      body: {
        step: 3,
        email: values.value.email,
        agencyId: values.value.email,
        token: values.value.code,
        password: newPass,
      },
    });

    values.value.newPass = newPass;
    router.replace('/login');
    step.value = 1;
  } catch (error) {
    if (import.meta.dev) {
      console.log('🚀 ~ setNewPass ~ error:', error);
    }

    messages.value.push('Erro ao trocar a senha');
  } finally {
    isLoading.value = false;
  }
};
</script>

<style></style>
