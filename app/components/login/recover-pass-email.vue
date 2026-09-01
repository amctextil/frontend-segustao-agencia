<template>
  <v-form
    ref="form"
    class="w-100 d-flex flex-column ga-4 text-grey-darken-4"
    @submit.prevent="sendCode"
  >
    <v-text-field
      v-model="email"
      label="E-mail"
      prepend-inner-icon="mdi-email-outline"
      type="email"
    />

    <v-btn :loading="isLoading" type="submit"> Receber código </v-btn>
  </v-form>
</template>

<script lang="ts" setup>
const email = useState<string>('login-email');
const agencyId = ref<number>(1);

const { isLoading } = defineProps<{ isLoading: boolean }>();
const emit = defineEmits<{
  submit: [emailS: string, agencyIdS: number];
}>();

const sendCode = () => {
  emit('submit', email.value, agencyId.value);
};
</script>

<style></style>
