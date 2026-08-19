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
            prepend-inner-icon="mdi-account-outline"
          />
          <v-text-field
            v-model="email"
            label="E-mail"
            :loading="isLoading"
            :rules="[rules.email, rules.required]"
            prepend-inner-icon="mdi-email-outline"
          />

          <v-switch
            v-model="ativo"
            prepend-icon="mdi-lightbulb"
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
            prepend-inner-icon="mdi-account-hard-hat-outline"
            :loading="isLoading"
            :disabled="user?.id === data?.id"
            :error-messages="
              user?.id === data?.id
                ? 'Você não pode editar seu próprio perfil'
                : ''
            "
            :rules="[rules.required]"
          />

          <ClientOnly>
            <v-text-field
              v-model="newPass"
              label="Nova senha"
              counter
              prepend-inner-icon="mdi-key-outline"
              :append-inner-icon="newPassShow ? 'mdi-eye' : 'mdi-eye-off'"
              :type="newPassShow ? 'text' : 'password'"
              :rules="passwordRules"
              @click:append-inner="newPassShow = !newPassShow"
            />

            <template #fallback>
              <v-text-field
                label="Nova senha"
                prepend-inner-icon="mdi-key-outline"
                append-inner-icon="mdi-eye-off"
                type="password"
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
              :append-inner-icon="newPassShow ? 'mdi-eye' : 'mdi-eye-off'"
              :type="newPassShow ? 'text' : 'password'"
              :rules="passwordRules"
              @click:append-inner="newPassShow = !newPassShow"
            />

            <template #fallback>
              <v-text-field
                label="Confirmar senha"
                prepend-inner-icon="mdi-key-outline"
                append-inner-icon="mdi-eye-off"
                type="password"
                :loading="true"
              />
            </template>
          </ClientOnly>
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
    status: 404,
    message: 'Usuário não encontrado',
  });
}

const messages = ref<SnackbarMessage[]>([]);
const isLoading = ref(false);

const nome = ref(data?.nome || '');
const email = ref(data?.email || '');
const ativo = ref(data?.status ?? true);
const perfil = ref(data?.tipoUsuario || UserProfile.SELLER);
const newPass = ref('');
const newPassConfirm = ref('');
const newPassShow = ref(false);

const passwordRules = computed(() => [
  isNewUser ? rules.required : true,
  isNewUser ? rules.password : rules.passwordOptional,
]);

const profiles = Object.values(UserProfile).filter(Number).map(Number);
const profileMap = profiles.map((item) => ({
  title: getUserProfileName(item),
  value: item,
}));

const save = async (event: SubmitEventPromise) => {
  isLoading.value = true;

  try {
    const results = await event;

    if (!results.valid) {
      throw new Error('Corrija os erros do formulário');
    }

    if (newPass.value || newPassConfirm.value) {
      if (newPass.value !== newPassConfirm.value) {
        throw new Error('As senhas não conferem');
      }
    }

    if (isNewUser) {
      await UserService.add(
        nome.value,
        email.value,
        ativo.value,
        perfil.value,
        newPass.value,
      );
    } else {
      await UserService.edit(
        id,
        nome.value,
        email.value,
        ativo.value,
        perfil.value,
        newPass.value,
      );
    }

    messages.value.push({
      text: 'Usuário ' + (isNewUser ? 'cadastrado' : 'editado'),
      color: 'success',
    });
    router.back();
  } catch (error) {
    messages.value.push((error as Error).message || 'Erro ao salvar usuário');

    isLoading.value = false;
  }
};
</script>

<style></style>
