<template>
  <v-form
    ref="form"
    class="w-100 d-flex flex-column ga-4 text-grey-darken-4"
    @submit.prevent="setNewPass"
  >
    <ClientOnly>
      <v-text-field
        v-model="newPass"
        label="Nova senha"
        counter
        prepend-inner-icon="mdi-key-outline"
        :append-inner-icon="newPassShow ? 'mdi-eye' : 'mdi-eye-off'"
        :type="newPassShow ? 'text' : 'password'"
        :disabled="configStore.isLoadingBrand"
        @click:append-inner="newPassShow = !newPassShow"
      />

      <template #fallback>
        <v-text-field
          label="Nova senha"
          prepend-inner-icon="mdi-key-outline"
          append-inner-icon="mdi-eye-off"
          type="password"
          :disabled="configStore.isLoadingBrand"
          :loading="true"
        />
      </template>
    </ClientOnly>

    <ClientOnly>
      <v-text-field
        v-model="newPassConfirm"
        label="Confirmar senha"
        counter
        prepend-inner-icon="mdi-key-outline"
        :append-inner-icon="newPassConfirmShow ? 'mdi-eye' : 'mdi-eye-off'"
        :type="newPassConfirmShow ? 'text' : 'password'"
        :disabled="configStore.isLoadingBrand"
        @click:append-inner="newPassConfirmShow = !newPassConfirmShow"
      />

      <template #fallback>
        <v-text-field
          label="Confirmar senha"
          prepend-inner-icon="mdi-key-outline"
          append-inner-icon="mdi-eye-off"
          type="password"
          :disabled="configStore.isLoadingBrand"
          :loading="true"
        />
      </template>
    </ClientOnly>

    <v-btn
      :loading="isLoading"
      :disabled="configStore.isLoadingBrand"
      type="submit"
    >
      Finalizar
    </v-btn>
  </v-form>
</template>

<script lang="ts" setup>
const configStore = useConfigStore();

const newPass = ref('');
const newPassConfirm = ref('');
const newPassShow = ref(false);
const newPassConfirmShow = ref(false);

const { isLoading } = defineProps<{ isLoading: boolean }>();
const emit = defineEmits<{
  submit: [newPass: string];
}>();

const setNewPass = () => {
  if (!newPass.value || !newPassConfirm.value) {
    throw new Error('Insira a nova senha');
  }

  if (newPass.value !== newPassConfirm.value) {
    throw new Error('As senhas não conferem');
  }

  emit('submit', newPass.value);
};
</script>

<style></style>
