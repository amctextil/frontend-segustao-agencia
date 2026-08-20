<template>
  <NuxtLayout name="main" :admin="true">
    <v-card
      class="ma-4 overflow-hidden d-flex flex-column align-self-center"
      width="760"
    >
      <v-form
        class="flex-fill d-flex flex-column overflow-hidden"
        validate-on="submit lazy"
        @submit.prevent="save"
      >
        <div class="flex-fill pa-8 pb-0 d-flex ga-4 flex-column overflow-auto">
          <v-text-field
            v-model="nome"
            label="Nome"
            :loading="isLoading"
            :rules="[rules.required]"
          />

          <v-text-field
            v-model="newAppId"
            label="ID da Marca"
            :loading="isLoading"
            :rules="[rules.required]"
          />

          <v-text-field
            v-model="site"
            label="E-commerce URL"
            type="url"
            placeholder="https://example.com"
            :rules="[rules.url, rules.required]"
          />

          <v-text-field
            v-model="urlCarrinho"
            label="Carrinho URL"
            type="url"
            placeholder="https://example.com"
            :rules="[rules.url, rules.required]"
          />

          <v-number-input
            v-model="expirarCarrinhoDias"
            label="Dias para expiração do carrinho"
            :rules="[rules.required]"
          />

          <v-text-field
            v-model="urlImagens"
            label="Imagens URL"
            type="url"
            placeholder="https://example.com"
            :rules="[rules.url, rules.required]"
          />

          <v-switch
            v-model="ativo"
            :label="ativo ? 'Marca ativa' : 'Marca inativa'"
            true-icon="mdi-check"
            false-icon="mdi-close"
            color="success"
            :loading="isLoading"
          />
        </div>

        <v-card-actions class="d-flex flex-column ga-4 py-4">
          <v-btn
            text="Salvar"
            :loading="isLoading"
            block
            color="green"
            type="submit"
            variant="flat"
          />

          <v-btn
            text="Cancelar"
            :loading="isLoading"
            variant="tonal"
            block
            @click="router.back()"
          />
        </v-card-actions>
      </v-form>
    </v-card>

    <v-snackbar-queue
      v-model="messages"
      timeout="2000"
      color="error"
      location="bottom"
    />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { SubmitEventPromise } from 'vuetify';
import type { SnackbarMessage } from 'vuetify/lib/components/VSnackbarQueue/VSnackbarQueue.mjs';
import { BrandService } from '~/services/brand.service';

const route = useRoute();
const router = useRouter();
const appId = route.params.appId as string;

const isNewItem = appId === 'novo';
const data = !isNewItem ? await BrandService.get(appId) : null;

if (!isNewItem && !data) {
  throw createError({
    status: 404,
    message: 'Usuário não encontrado',
  });
}

const messages = ref<SnackbarMessage[]>([]);
const isLoading = ref(false);

const newAppId = ref(data?.appId || '');
const nome = ref(data?.nome || '');
const site = ref(data?.urlSite || '');
const urlImagens = ref(data?.urlImagens || '');
const urlCarrinho = ref(data?.link || '');
const ativo = ref(data?.ativo ?? true);
const expirarCarrinhoDias = ref(30);

const save = async (event: SubmitEventPromise) => {
  isLoading.value = true;

  try {
    const results = await event;

    if (!results.valid) {
      throw new Error('Corrija os erros do formulário');
    }

    if (isNewItem) {
      await BrandService.add(
        nome.value,
        newAppId.value,
        ativo.value,
        site.value,
        urlImagens.value,
        urlCarrinho.value,
        {
          cartDueDays: expirarCarrinhoDias.value,
        },
      );
    } else {
      isLoading.value = false;
      return messages.value.push('EM DESENVOLVIMENTO !!!');
      // await BrandService.edit(
      //   id,
      //   nome.value,
      //   email.value,
      //   ativo.value,
      //   perfil.value,
      //   newPass.value,
      // );
    }
  } catch (error) {
    messages.value.push((error as Error).message || 'Erro ao salvar marca');
    isLoading.value = false;
  }
};
</script>

<style></style>
