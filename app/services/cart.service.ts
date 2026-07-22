import type { Brand } from '~~/shared/interfaces/AppConfigProps';

const list = async (appId: Brand['value'], userId: number) => {
  return [
    {
      id: 1,
      total: 1189.5,
      criadoEm: '2026-07-22 16:30:00',
      atualizadoEm: '2026-07-22 16:30:00',
      produtos: [
        {
          ListPrice: 659,
          ProductID: 2771350,
          PromotionPrice: 329.5,
          SKUOptions: [
            { Alias: 'Cor', Title: 'Índigo' },
            { Alias: 'Tamanho', Title: 'M' },
          ],
          VariationPath: '/44.32279/40.1418/',
          Quantity: 1,
          MediaPath:
            '/Custom/Content/Products/27/71/2771347_bata-comfort-manga-curta-370101938_m3_639148651385561283.webp',
          Name: 'Bata Comfort Manga Curta',
          productParent: {
            IntegrationID: '370101938',
            ProductID: 2771347,
            Name: 'Bata Comfort Manga Curta',
            Url: '/bata-comfort-manga-curta-370101938-p2771347',
          },
        },
      ],
    },
  ];
};

export const CartService = { list };
