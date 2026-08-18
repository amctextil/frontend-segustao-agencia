import { WDValidators } from 'widelab-utils';

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
};
