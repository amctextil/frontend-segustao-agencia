<template>
  <v-form
    ref="form"
    class="w-100 d-flex flex-column ga-4 text-grey-darken-4"
    @submit.prevent="validateCode"
  >
    <span class="text-center"> Insira o código recebido no e-mail </span>
    <v-otp-input v-model="code" focused autofocus />

    <v-btn :loading="isLoading" type="submit"> Continuar </v-btn>
  </v-form>
</template>

<script lang="ts" setup>
const code = ref('');

const { isLoading } = defineProps<{ isLoading: boolean }>();
const emit = defineEmits<{
  submit: [code: string];
}>();

const validateCode = () => {
  if (!code.value) {
    throw new Error('Insira o código para continuar');
  }

  emit('submit', code.value);
};
</script>

<style></style>
