const ROUTE_MAP = [
  {
    segment: '',
    title: 'Início',
    href: '/',
  },
  {
    title: 'Produto',
    segment: 'produto',
    href: '/',
  },
  {
    title: 'Carrinho',
    segment: 'carrinho',
    href: '/carrinho',
  },
  {
    title: 'Cadastrados',
    segment: 'cadastrados',
    href: '/carrinho/cadastrados',
  },
  {
    title: 'Usuários',
    segment: 'usuarios',
    href: '/usuarios',
  },
];

export default (segment: string) => {
  const routeData = ROUTE_MAP.find((item) => item.segment === segment);

  return routeData ?? { title: segment, segment, href: '/' + segment };
};
