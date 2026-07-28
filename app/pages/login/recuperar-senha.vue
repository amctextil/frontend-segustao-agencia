<template>
  <NuxtLayout name="login">
    <div
      class="ma-8 w-md-66 d-flex flex-column align-center justify-center ga-8 text-grey-darken-3"
    >
      <h1 class="align-self-start text-h4">Recuperar senha</h1>

      <v-form
        v-if="step == 1"
        ref="form"
        class="w-100 d-flex flex-column ga-4 text-grey-darken-4"
        @submit.prevent="sendCode"
      >
        <v-select
          v-model="brand"
          label="Selecione uma marca"
          return-object
          prepend-inner-icon="mdi-flag-outline"
          :items="DropDownList"
          :disabled="configStore.isLoadingBrand"
        />

        <v-text-field
          v-model="email"
          label="E-mail"
          prepend-inner-icon="mdi-email-outline"
          type="email"
          :disabled="configStore.isLoadingBrand"
        />

        <v-btn
          :loading="isLoading"
          :disabled="configStore.isLoadingBrand"
          type="submit"
        >
          Receber código
        </v-btn>
      </v-form>
      <v-form
        v-else-if="step === 2"
        ref="form"
        class="w-100 d-flex flex-column ga-4 text-grey-darken-4"
        @submit.prevent="validateCode"
      >
        <span class="text-center"> Insira o código recebido no e-mail </span>
        <v-otp-input v-model="code" />

        <v-btn
          :loading="isLoading"
          :disabled="configStore.isLoadingBrand"
          type="submit"
        >
          Finalizar
        </v-btn>
      </v-form>
      <v-form
        v-else
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
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { BRAND_LIST } from '~~/shared/constants/config';
import type { Brand } from '~~/shared/interfaces/AppConfigProps';

const configStore = useConfigStore();
const router = useRouter();

const brand = useState('brand-input', () =>
  configStore.brand
    ? {
        title: configStore.brand.name,
        value: configStore.brand.appId,
      }
    : {
        title: '',
        value: '' as const,
      },
);

const DropDownList = BRAND_LIST.map(({ title, value }) => ({
  title: title as string,
  value: value as '' | Brand['value'],
}));

const email = ref('');
const isLoading = ref(false);
const step = ref(1);
const newPass = ref('');
const newPassConfirm = ref('');
const newPassShow = ref(false);
const newPassConfirmShow = ref(false);
const code = ref('');

const sendCode = (emailSend: string, brandSelected: Brand['value']) => {
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
  router.replace('/login');
};
</script>

<style></style>
