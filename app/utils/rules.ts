import { WDValidators } from 'widelab-utils';

const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export default {
  url: (value: string) => {
    const pattern =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    return !value || pattern.test(value) || 'URL inválida';
  },
  required: (value: string) => !!value || 'Campo obrigatório*',
  requiredSelect: (item: { value: string }) =>
    !!item.value || 'Campo obrigatório*',
  email: (value: string) =>
    WDValidators.validateEmail(value || '') || 'Insira um e-mail válido',
  password: (value: string) =>
    passRegex.test(value) ||
    'A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas e números',
  passwordOptional: (value: string) => {
    if (!value || value.length === 0) return true;

    return (
      passRegex.test(value) ||
      'A senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas e números'
    );
  },
};
