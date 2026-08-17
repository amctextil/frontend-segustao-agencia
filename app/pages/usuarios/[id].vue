<template>
  <NuxtLayout name="main">
    <v-card
      class="pa-8 d-flex flex-column ma-8 overflow-hidden align-self-center"
      width="760"
    >
      <v-text-field v-model="nome" label="Nome" :loading="isLoading" />
      <v-text-field v-model="email" label="E-mail" :loading="isLoading" />

      <v-switch
        v-model="ativo"
        :label="ativo ? 'Usuário ativo' : 'Usuário inativo'"
        true-icon="mdi-check"
        false-icon="mdi-close"
        color="success"
        :loading="isLoading"
      />

      <v-select v-model="perfil" :items="profileMap" :loading="isLoading" />

      <div class="d-flex flex-column ga-8 py-4">
        <v-btn text="Salvar" :loading="isLoading" @click="saveUser" />
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
import { UserService } from '~/services/user.service';
import { getUserProfileName, UserProfile } from '~~/shared/enums/UserProfile';

const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

const { user } = useAuth();

if (!user.value?.idAgencia) {
  throw createError({
    statusCode: 401,
    statusMessage: 'Usuário não autenticado',
  });
}

const userData = await UserService.get(Number(id), user.value.idAgencia);

if (!userData) {
  throw createError({
    statusCode: 401,
    statusMessage: 'Usuário não encontrado',
  });
}

const messages = ref<SnackbarMessage[]>([]);
const isLoading = ref(false);

const nome = ref(userData.nome);
const email = ref(userData.email);
const ativo = ref(userData.status);
const perfil = ref(userData.tipoUsuario);

const profiles = Object.values(UserProfile).filter(Number).map(Number);
const profileMap = profiles.map((item) => ({
  title: getUserProfileName(item),
  value: item,
}));

const saveUser = async () => {
  isLoading.value = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    messages.value.push({
      text: 'Usuário editado!',
      color: 'success',
    });
    router.back();
  } finally {
    isLoading.value = false;
  }
};
</script>

<style></style>
