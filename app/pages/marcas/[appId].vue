<template>
  <NuxtLayout name="main" :admin="true">
    <v-card
      class="pa-8 d-flex flex-column ma-8 overflow-hidden align-self-center ga-4"
      width="760"
    >
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
        label="Website URL"
        type="url"
        placeholder="https://example.com"
        :rules="[rules.url, rules.required]"
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

      <div class="d-flex flex-column ga-8 py-4">
        <v-btn text="Salvar" :loading="isLoading" @click="save" />
        <v-btn
          text="Cancelar"
          :loading="isLoading"
          variant="tonal"
          @click="router.back()"
        />
      </div>
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
import type { SnackbarMessage } from 'vuetify/lib/components/VSnackbarQueue/VSnackbarQueue.mjs';
import { BrandService } from '~/services/brand.service';

const route = useRoute();
const router = useRouter();
const appId = route.params.appId as string;

const isNewUser = appId === 'novo';
const data = !isNewUser ? await BrandService.get(appId) : null;

if (!isNewUser && !data) {
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
const ativo = ref(data?.ativo ?? true);

const save = () => {
  messages.value.push('EM DESENVOLVIMENTO !!!');
};
</script>

<style></style>
