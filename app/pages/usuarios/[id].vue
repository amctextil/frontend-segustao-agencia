<template>
  <NuxtLayout name="main" :admin="true">
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
        :disabled="user?.id === data?.id"
        :error-messages="
          user?.id === data?.id
            ? 'Você não pode desativar seu próprio usuário'
            : ''
        "
      />

      <v-select
        v-model="perfil"
        :items="profileMap"
        :loading="isLoading"
        :disabled="user?.id === data?.id"
        :error-messages="
          user?.id === data?.id ? 'Você não pode editar seu próprio perfil' : ''
        "
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
import { UserService } from '~/services/user.service';
import { getUserProfileName, UserProfile } from '~~/shared/enums/UserProfile';

const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

const { user } = useAuth();

const isNewUser = id === 'novo';
const data = !isNewUser ? await UserService.get(id) : null;

if (!isNewUser && !data) {
  throw createError({
    status: 401,
    message: 'Usuário não encontrado',
  });
}

const messages = ref<SnackbarMessage[]>([]);
const isLoading = ref(false);

const nome = ref(data?.nome || '');
const email = ref(data?.email || '');
const ativo = ref(data?.status ?? true);
const perfil = ref(data?.tipoUsuario || UserProfile.SELLER);

const profiles = Object.values(UserProfile).filter(Number).map(Number);
const profileMap = profiles.map((item) => ({
  title: getUserProfileName(item),
  value: item,
}));

const save = async () => {
  isLoading.value = true;

  try {
    if (isNewUser) {
      await UserService.add(nome.value, email.value, ativo.value, perfil.value);
    } else {
      await UserService.edit(
        id,
        nome.value,
        email.value,
        ativo.value,
        perfil.value,
      );
    }

    messages.value.push({
      text: 'Usuário ' + (isNewUser ? 'cadastrado' : 'editado'),
      color: 'success',
    });
    router.back();
  } catch {
    isLoading.value = false;
  }
};
</script>

<style></style>
