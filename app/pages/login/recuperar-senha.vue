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
  </NuxtLayout>
</template>

<script lang="ts" setup>
import RecoverPassEmail from '~/components/login/recover-pass-email.vue';
import RecoverPassNewpass from '~/components/login/recover-pass-newpass.vue';
import RecoverPassOtp from '~/components/login/recover-pass-otp.vue';

const router = useRouter();

const isLoading = ref(false);
const step = ref(1);

const sendCode = (emailSend: string) => {
  isLoading.value = true;
  try {
    step.value = 2;
  } catch (error) {
  } finally {
    isLoading.value = false;
  }
};

const validateCode = (code: string) => {
  isLoading.value = true;
  try {
    step.value = 3;
  } catch (error) {
  } finally {
    isLoading.value = false;
  }
};

const setNewPass = (newPass: string) => {
  isLoading.value = true;
  console.log('🚀 ~ setNewPass ~ setNewPass:', setNewPass);

  try {
    router.replace('/login');
    step.value = 1;
  } catch (error) {
  } finally {
    isLoading.value = false;
  }
};
</script>

<style></style>
