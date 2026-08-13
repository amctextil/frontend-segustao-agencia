import type { Brand } from './AppConfigProps';

export interface CartProps {
  id: number;
  idUsuario: number;
  idAgencia: number;
  nome: string;
  descricao: string;
  appId: Brand['value'];
  link: string;
  codigo: string;
  criadoEm: string;
  produtos: CartItemProps[];
}

export interface CartItemProps {
  id: number;
  idUsuario: number;
  idAgencia: number;
  idCarrinho: number;
  nome: string;
  produtoId: number;
  quantidade: number;
  ref: number;
  skuId: number;
  urlImagem: string;
  preco: number;
  precoPromocional: number;
  varianteId: string;
  cor: string;
  corId: string;
  tamanho: string;
  tamanhoId: string;
  paiIntegracaoId: string;
  paiProdutoId: string;
  url: string;
}
