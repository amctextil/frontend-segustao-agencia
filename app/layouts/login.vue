<script setup lang="ts"></script>

<template>
  <v-app id="login-layout">
    <div
      class="d-flex h-screen w-screen flex-column flex-md-row overflow-hidden bg-grey-lighten-5"
    >
      <div class="d-none d-md-flex w-50 align-center justify-center">
        <AMCLogo width="300" />
      </div>

      <div class="d-flex w-50 align-center justify-center">
        <slot />
      </div>
    </div>
  </v-app>
</template>
