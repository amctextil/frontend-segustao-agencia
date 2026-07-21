const imageURL = 'https://d3vnyi5j6ba1mc.cloudfront.net';

export const BRAND_LIST = [
  // { title: 'Clc', value: 'clc', shopURL: 'https://www.clc.com.br' },
  {
    title: 'Colcci',
    value: 'colcci',
    shopURL: 'https://www.colcci.com.br',
    imageURL,
  },
  {
    title: 'Colcci Sport',
    value: 'colccisport',
    shopURL: 'https://colccisport.com.br',
    imageURL,
  },
  {
    title: 'Forum',
    value: 'forum',
    shopURL: 'https://www.forum.com.br',
    imageURL,
  },
  {
    title: 'Isy',
    value: 'isy',
    shopURL: 'https://www.souisy.com.br',
    imageURL,
  },
  {
    title: "L'Cecci",
    value: 'lcecci',
    shopURL: 'https://www.lcecci.com.br',
    imageURL,
  },
  {
    title: 'Oasis',
    value: 'oasis',
    shopURL: 'https://www.oasis.com.br',
    imageURL,
  },
  {
    title: 'Open',
    value: 'open',
    shopURL: 'https://www.open.com.br',
    imageURL,
  },
  {
    title: 'Replay',
    value: 'replay',
    shopURL: 'https://www.replayjeans.com.br',
    imageURL,
  },
  {
    title: 'Skazi',
    value: 'skazi',
    shopURL: 'https://www.skazi.com.br',
    imageURL,
  },
  {
    title: 'Sommer',
    value: 'sommer',
    shopURL: 'https://www.sommer.com.br',
    imageURL,
  },
  {
    title: 'Triton',
    value: 'triton',
    shopURL: 'https://www.triton.com.br',
    imageURL,
  },
  {
    title: 'Tufi Duek',
    value: 'tufiduek',
    shopURL: 'https://www.tufiduek.com.br',
    imageURL,
  },
] as const;

export const SITEMAP: { [key: string]: string } = {
  '/usuarios': 'Usuários',
  '/produto/id': 'Detalhes do produto',
  '/carrinho': 'Carrinho',
};
