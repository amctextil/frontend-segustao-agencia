// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import eslintConfigPrettier from 'eslint-config-prettier';

export default withNuxt(
  // Your custom configs here
).append(
  // Must be appended last to turn off formatting rules conflicting with Prettier
  eslintConfigPrettier,
);
