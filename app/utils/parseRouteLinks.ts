const ROUTE_MAP = [
  {
    segment: '',
    title: 'Início',
    to: '/',
  },
  {
    title: 'Produto',
    segment: 'produto',
    to: '/',
  },
  {
    title: 'Carrinho',
    segment: 'carrinho',
    to: '/carrinho',
  },
  {
    title: 'Cadastrados',
    segment: 'cadastrados',
    to: '/carrinho/cadastrados',
  },
  {
    title: 'Usuários',
    segment: 'usuarios',
    to: '/usuarios',
  },
  {
    title: 'Marcas',
    segment: 'marcas',
    to: '/marcas',
  },
];

export default (segment: string) => {
  const routeData = ROUTE_MAP.find((item) => item.segment === segment);

  return routeData ?? { title: segment, segment, to: '/' + segment };
};
