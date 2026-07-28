# AMC Têxtil — Carrinho da Agência WEB

Aplicação web desenvolvida para permitir que usuários de agências montem carrinhos de produtos das marcas da AMC Têxtil e gerem links compartilháveis para clientes.

O projeto é baseado no conceito do aplicativo **Sugestão do Vendedor**, com foco na criação de sacolas/carrinhos, seleção de produtos por marca e compartilhamento do link gerado para o cliente.

## Tecnologias utilizadas

- Nuxt.js 4.4
- Vue.js
- Vuetify
- Zoe
- Pinta
- Nuxt Auth Utils
- TypeScript

## Objetivo da aplicação

Permitir que usuários vinculados a uma agência possam:

- Fazer login no sistema;
- Selecionar a marca com a qual irão trabalhar;
- Consultar produtos da marca selecionada;
- Pesquisar e filtrar produtos;
- Visualizar detalhes dos produtos;
- Adicionar produtos ao carrinho;
- Finalizar a sacola/carrinho;
- Gerar link compartilhável;
- Reenviar ou compartilhar novamente links de carrinhos criados;
- Gerenciar usuários da agência, conforme permissões.

## Funcionalidades previstas

### Autenticação

- Tela de login;
- Tela de cadastro;
- Recuperação de senha;
- Controle de sessão;
- Integração com autenticação via backend;
- Suporte às regras de autenticação definidas para o projeto.

### Seleção de marca

Após o login, o usuário deverá selecionar uma das marcas liberadas para sua agência.

Todos os produtos, filtros e carrinhos serão tratados com base na marca selecionada.

### Produtos

A aplicação deverá permitir:

- Listar produtos da marca;
- Pesquisar produtos;
- Aplicar filtros;
- Visualizar imagem do produto;
- Consultar informações principais do produto;
- Acessar detalhes do produto;
- Selecionar variações, quando disponíveis;
- Adicionar produtos ao carrinho.

### Carrinho

A aplicação deverá permitir:

- Visualizar produtos adicionados;
- Alterar quantidades;
- Remover produtos;
- Revisar os itens selecionados;
- Finalizar o carrinho;
- Gerar link compartilhável;
- Compartilhar o link com clientes.

Cada usuário poderá possuir apenas um carrinho em montagem por vez, conforme regra de negócio definida no backend.

### Carrinhos criados

A aplicação deverá possuir uma tela para listagem dos carrinhos já criados, permitindo:

- Consultar carrinhos gerados;
- Visualizar detalhes do carrinho;
- Consultar produtos do carrinho;
- Visualizar o link gerado;
- Compartilhar novamente o link, quando permitido.

### Gerenciamento de usuários

Usuários administradores poderão gerenciar usuários da agência.

Funcionalidades previstas:

- Listar usuários;
- Cadastrar novos usuários;
- Editar usuários existentes;
- Desativar usuários;
- Definir permissões;
- Controlar usuários administradores e vendedores.

Regras importantes:

- Sempre deverá existir ao menos um usuário administrador ativo por agência;
- Alguns usuários não poderão ser editados ou desativados, como usuários técnicos, desenvolvedores ou internos do sistema;
- O front-end deverá respeitar as permissões retornadas pelo backend.

## Estrutura inicial sugerida

```bash
.
├── assets/
├── components/
├── composables/
├── layouts/
├── middleware/
├── pages/
├── plugins/
├── public/
├── server/
├── stores/
├── types/
├── utils/
├── app.vue
├── nuxt.config.ts
├── package.json
└── README.md
```

## Instalação do projeto

Instale as dependências:

```bash
npm install
```

ou, caso o projeto utilize Yarn:

```bash
yarn install
```

ou, caso o projeto utilize PNPM:

```bash
pnpm install
```

## Execução em ambiente local

Para rodar o projeto em modo desenvolvimento:

```bash
npm run dev
```

ou:

```bash
yarn dev
```

ou:

```bash
pnpm dev
```

A aplicação ficará disponível, por padrão, em:

```bash
http://localhost:3000
```

## Build da aplicação

Para gerar o build de produção:

```bash
npm run build
```

ou:

```bash
yarn build
```

ou:

```bash
pnpm build
```

## Preview do build

Para executar uma prévia local do build:

```bash
npm run preview
```

ou:

```bash
yarn preview
```

ou:

```bash
pnpm preview
```

## Variáveis de ambiente

As variáveis de ambiente deverão ser configuradas conforme definição do backend e infraestrutura do projeto.

Exemplo de arquivo `.env`:

```env
NUXT_PUBLIC_API_BASE_URL=
NUXT_PUBLIC_APP_NAME=AMC Têxtil - Carrinho da Agência
NUXT_SESSION_PASSWORD=
```

Observação: valores sensíveis não devem ser expostos no front-end. Tokens, chaves privadas e segredos devem ser tratados pelo backend ou pelo mecanismo seguro de autenticação do Nuxt Auth Utils.

## Integração com APIs

O front-end deverá consumir as APIs responsáveis por:

- Login;
- Cadastro;
- Recuperação de senha;
- Consulta de marcas disponíveis;
- Consulta de produtos;
- Consulta de filtros;
- Detalhes do produto;
- Criação e atualização do carrinho;
- Finalização do carrinho;
- Geração do link compartilhável;
- Listagem de carrinhos criados;
- Detalhes do carrinho;
- Gerenciamento de usuários;
- Consulta e atualização de permissões.

## Segurança

Como a aplicação é web, alguns cuidados são obrigatórios:

- Não expor tokens sensíveis no navegador;
- Não exibir identificadores internos da agência ou do usuário;
- Não incluir códigos internos no link compartilhado;
- Validar permissões sempre com base no backend;
- Não permitir ações administrativas sem permissão;
- Não manter dados sensíveis em localStorage sem necessidade;
- Tratar corretamente expiração de sessão;
- Redirecionar usuários não autenticados para o login.

## Padrões de desenvolvimento

Recomendações gerais para o projeto:

- Utilizar TypeScript;
- Organizar componentes reutilizáveis em `components/`;
- Centralizar chamadas de API em `composables/` ou camada própria de serviços;
- Utilizar middleware para rotas autenticadas;
- Manter regras críticas no backend;
- Evitar duplicação de lógica entre telas;
- Utilizar componentes do Vuetify, Zoe e Pinta conforme padrão visual definido;
- Manter nomes de arquivos e componentes claros e objetivos.

## Telas previstas

- Login;
- Cadastro;
- Recuperação de senha;
- Seleção de marca;
- Listagem de produtos;
- Filtros de produtos;
- Detalhes do produto;
- Carrinho;
- Listagem de carrinhos criados;
- Detalhes do carrinho;
- Compartilhamento de link;
- Listagem de usuários;
- Cadastro de usuário;
- Detalhes do usuário;
- Edição de usuário;
- Permissões de usuário.

## Fluxo principal

1. Usuário acessa a aplicação;
2. Realiza login;
3. Seleciona uma marca liberada para sua agência;
4. Consulta os produtos da marca;
5. Adiciona produtos ao carrinho;
6. Revisa o carrinho;
7. Finaliza a seleção;
8. O sistema gera o link compartilhável;
9. O usuário compartilha o link com o cliente;
10. O usuário pode consultar posteriormente os carrinhos criados e compartilhar novamente o link, quando permitido.

## Observações

Esta aplicação não contempla, no escopo inicial:

- Aplicação de descontos;
- Cupons;
- Ranking de clientes;
- Dashboards gerenciais;
- Histórico completo de compras;
- Acompanhamento da conversão em venda;
- Funcionalidades adicionais do SuperApp.

O foco inicial do projeto é permitir a montagem do carrinho e geração do link compartilhável para o cliente.

## Licença

Projeto privado da AMC Têxtil.
