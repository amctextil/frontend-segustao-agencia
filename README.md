# AMC Têxtil — Front-end WEB Carrinho da Agência

Aplicação front-end web desenvolvida para o projeto **Carrinho da Agência AMC Têxtil**.

O objetivo da aplicação é permitir que usuários de agências acessem o sistema, selecionem uma marca liberada, consultem produtos, montem carrinhos e gerem links compartilháveis para clientes.

O projeto é baseado no conceito já existente do app **Sugestão do Vendedor**, porém adaptado para uso por agências.

## Tecnologias utilizadas

- Nuxt.js 4.4
- Vue.js
- Vuetify
- Zoe
- Pinia
- nuxt-auth-utils
- TypeScript

## Funcionalidades principais

- Login de usuários;
- Cadastro de usuários;
- Recuperação de senha;
- Seleção de marca;
- Listagem de produtos;
- Filtros e pesquisa de produtos;
- Detalhes do produto;
- Montagem de carrinho/sacola;
- Geração de link compartilhável;
- Listagem de carrinhos criados;
- Detalhes do carrinho;
- Compartilhamento novamente do link gerado;
- Gerenciamento de usuários da agência;
- Controle de permissões por perfil.

## Estrutura do projeto

```bash
.
├── app/
│   ├── assets/
│   ├── componentes/
│   ├── constants/
│   ├── interfaces/
│   ├── layouts/
│   ├── middleware/
│   ├── pages/
│   ├── plugins/
│   ├── services/
│   ├── stores/
│   └── utils/
├── public/
├── server/
│   ├── api/
│   └── services/
├── shared/
│   ├── constants/
│   ├── interfaces/
│   ├── types/
│   └── utils/
├── nuxt.config.ts
├── package.json
└── README.md
```

## Organização das pastas

### `app/`

Contém a estrutura principal da aplicação Nuxt.

#### `app/assets/`

Arquivos estáticos utilizados pela aplicação, como imagens, ícones, estilos e recursos visuais internos.

#### `app/componentes/`

Componentes reutilizáveis da interface.

Exemplos:

- Cards de produto;
- Botões;
- Campos de formulário;
- Modais;
- Componentes de carrinho;
- Componentes de listagem.

#### `app/constants/`

Constantes utilizadas somente no front-end.

Exemplos:

- Rotas internas;
- Labels;
- Status exibidos em tela;
- Configurações visuais;
- Opções fixas de componentes.

#### `app/interfaces/`

Interfaces TypeScript utilizadas somente na camada front-end.

Exemplos:

- Interfaces de formulários;
- Interfaces de componentes;
- Tipos de dados utilizados apenas nas telas.

#### `app/layouts/`

Layouts da aplicação.

Exemplos:

- Layout autenticado;
- Layout público;
- Layout administrativo.

#### `app/middleware/`

Middlewares de rota.

Utilizado para controles como:

- Verificar usuário autenticado;
- Proteger rotas privadas;
- Validar permissões;
- Redirecionar usuários não autorizados.

#### `app/pages/`

Páginas da aplicação.

Principais telas previstas:

- Login;
- Cadastro;
- Recuperação de senha;
- Seleção de marca;
- Listagem de produtos;
- Detalhes do produto;
- Carrinho;
- Listagem de carrinhos;
- Detalhes do carrinho;
- Gerenciamento de usuários;
- Detalhes e permissões do usuário.

#### `app/plugins/`

Plugins utilizados pela aplicação Nuxt.

Exemplos:

- Configuração do Vuetify;
- Configuração do Zoe;
- Plugins globais;
- Helpers registrados na aplicação.

#### `app/services/`

Serviços do front-end responsáveis por consumir as APIs internas do `server/api`.

Cada arquivo deve agrupar funções relacionadas a um domínio da aplicação.

Exemplos:

- `authService`;
- `productService`;
- `cartService`;
- `brandService`;
- `userService`.

Cada função deve representar uma request específica.

Exemplo conceitual:

```ts
async function getProducts() {
  return await $fetch('/api/products');
}
```

A camada `app/services` não deve chamar diretamente APIs externas. Ela deve consumir as rotas internas criadas em `server/api`.

#### `app/stores/`

Stores do Pinia para gerenciamento de estado global da aplicação.

Exemplos de stores:

- Usuário autenticado;
- Agência;
- Marca selecionada;
- Produtos;
- Filtros;
- Carrinho atual;
- Carrinhos criados;
- Permissões.

#### `app/utils/`

Funções utilitárias utilizadas somente pelo front-end.

Exemplos:

- Formatação de valores;
- Formatação de datas;
- Tratamento de textos;
- Helpers de tela;
- Funções auxiliares de componentes.

### `public/`

Arquivos públicos servidos diretamente pela aplicação.

Exemplos:

- Favicon;
- Imagens públicas;
- Arquivos estáticos acessíveis diretamente por URL.

### `server/`

Contém a camada server-side do Nuxt.

Essa camada deve ser utilizada para criar APIs internas da aplicação e proteger integrações com serviços externos.

#### `server/api/`

Rotas internas da aplicação.

Essas rotas serão consumidas pelo front-end através dos arquivos em `app/services`.

Exemplos:

- `/api/auth`;
- `/api/products`;
- `/api/brands`;
- `/api/cart`;
- `/api/users`.

As rotas em `server/api` devem tratar a request do front-end, validar dados quando necessário e chamar as funções da camada `server/services`.

#### `server/services/`

Serviços server-side responsáveis por chamar APIs externas.

Exemplos:

- APIs da Linx;
- APIs do backend da aplicação;
- APIs de autenticação;
- APIs de geração de carrinho;
- APIs de geração de link.

Essa camada deve concentrar chamadas externas e proteger informações sensíveis, como tokens, URLs privadas e credenciais.

### `shared/`

Contém estruturas compartilhadas entre front-end e server.

Deve ser usado para manter consistência entre as camadas da aplicação.

#### `shared/constants/`

Constantes compartilhadas entre `app` e `server`.

Exemplos:

- Status de carrinho;
- Tipos de usuário;
- Perfis de permissão;
- Códigos internos utilizados em ambas as camadas.

#### `shared/interfaces/`

Interfaces TypeScript compartilhadas entre front-end e server.

Exemplos:

- Produto;
- Carrinho;
- Item do carrinho;
- Usuário;
- Agência;
- Marca.

#### `shared/types/`

Types compartilhados entre as camadas.

Exemplos:

- Tipos de status;
- Tipos de perfil;
- Tipos de retorno de API;
- Tipos auxiliares de domínio.

#### `shared/utils/`

Funções utilitárias que podem ser utilizadas tanto pelo front-end quanto pelo server.

Exemplos:

- Normalização de dados;
- Validações simples;
- Funções puras de formatação ou conversão;
- Helpers sem dependência de browser ou server.

## Fluxo recomendado de comunicação

O front-end deve seguir o seguinte fluxo para consumir dados:

```bash
Tela ou componente
        ↓
app/services
        ↓
server/api
        ↓
server/services
        ↓
API externa ou backend
```

Exemplo:

```bash
Listagem de produtos
        ↓
app/services/productService.ts
        ↓
server/api/products.get.ts
        ↓
server/services/linxProductService.ts
        ↓
API Linx / Backend
```

Esse padrão evita que a interface acesse diretamente serviços externos e ajuda a proteger tokens, URLs privadas e regras sensíveis.

## Instalação

Instale as dependências do projeto:

```bash
npm install
```

Ou, caso o projeto utilize outro gerenciador:

```bash
yarn install
```

```bash
pnpm install
```

## Executando o projeto localmente

Para iniciar o ambiente de desenvolvimento:

```bash
npm run dev
```

A aplicação ficará disponível em:

```bash
http://localhost:3000
```

## Build de produção

Para gerar o build da aplicação:

```bash
npm run build
```

Para executar a versão gerada:

```bash
npm run preview
```

## Variáveis de ambiente

O projeto deve utilizar variáveis de ambiente para configurar URLs, autenticação e integrações.

Exemplo de arquivo `.env`:

```env
NUXT_PUBLIC_APP_NAME=AMC Têxtil
NUXT_PUBLIC_API_BASE_URL=

NUXT_AUTH_PASSWORD=

LINX_API_BASE_URL=
LINX_API_TOKEN=

BACKEND_API_BASE_URL=
BACKEND_API_TOKEN=
```

As variáveis reais devem ser configuradas conforme o ambiente de execução.

Não versionar arquivos contendo tokens, senhas, chaves privadas ou informações sensíveis.

## Autenticação

A autenticação da aplicação utiliza `nuxt-auth-utils`.

O front-end deve consumir os serviços de autenticação disponibilizados pela aplicação, mantendo dados sensíveis protegidos e evitando exposição de tokens em locais inseguros.

O sistema deve considerar:

- Login de usuário;
- Sessão autenticada;
- Cadastro de usuário;
- Recuperação de senha;
- Controle de permissões;
- Usuários administradores;
- Usuários vendedores;
- Proteção de rotas privadas.

## Gerenciamento de estado

O gerenciamento de estado da aplicação é feito com **Pinia**.

As stores devem ser utilizadas para controlar informações como:

- Usuário autenticado;
- Agência vinculada;
- Marca selecionada;
- Produtos;
- Filtros;
- Carrinho atual;
- Carrinhos criados;
- Permissões do usuário.

## Padrão de telas

A aplicação deve contemplar as seguintes telas principais:

### Autenticação

- Login;
- Cadastro;
- Recuperação de senha.

### Produtos

- Listagem de produtos;
- Filtros e pesquisa;
- Detalhes do produto.

### Carrinho

- Carrinho atual;
- Revisão dos itens;
- Finalização do carrinho;
- Geração do link compartilhável.

### Histórico de carrinhos

- Listagem de carrinhos criados;
- Detalhes do carrinho;
- Reenvio ou novo compartilhamento do link.

### Usuários

- Listagem de usuários;
- Cadastro de usuários;
- Edição de usuários;
- Desativação de usuários;
- Controle de permissões.

## Regras importantes do front-end

- Cada usuário pode possuir apenas um carrinho em montagem por vez;
- O usuário deve selecionar uma marca antes de consultar os produtos;
- O usuário só pode visualizar marcas liberadas para sua agência;
- O carrinho não deve aplicar descontos;
- O código da agência e do usuário não deve ser exibido na interface;
- O link gerado deve ser compartilhável com clientes;
- Links expirados devem respeitar a regra definida pelo backend;
- Usuários sem permissão não devem visualizar ações administrativas;
- Alguns usuários protegidos não poderão ser editados ou desativados pela agência;
- Sempre deve existir ao menos um administrador ativo por agência.

## Integração com APIs

O front-end deverá consumir APIs internas do Nuxt, localizadas em `server/api`.

Essas APIs internas serão responsáveis por intermediar a comunicação com APIs externas, evitando que o front-end exponha integrações sensíveis diretamente no navegador.

O projeto deverá possuir integrações para:

- Autenticação;
- Cadastro de usuários;
- Consulta de marcas liberadas;
- Consulta de produtos;
- Consulta de filtros;
- Criação e atualização do carrinho;
- Geração do link compartilhável;
- Consulta de carrinhos criados;
- Gerenciamento de usuários e permissões.

As regras de validação críticas devem ser garantidas pelo backend/server-side.

## Segurança

Como a aplicação é web, deve-se tomar cuidado com exposição de dados sensíveis.

Evitar armazenar em `localStorage`, `sessionStorage` ou URL:

- Tokens sensíveis;
- Código interno da agência;
- Código interno do usuário;
- Dados sigilosos de autenticação;
- Informações que possam ser manipuladas pelo cliente.

Sempre que possível, informações sensíveis devem ser tratadas em `server/api` e `server/services`.

Toda validação de permissão, vínculo de agência, marca liberada e carrinho ativo deve ser confirmada pelo backend.

## Scripts

Scripts principais esperados no projeto:

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

Os scripts podem variar conforme a configuração final do projeto.

## Observações

Este projeto contempla somente o front-end web da aplicação Carrinho da Agência AMC Têxtil.

Funcionalidades como descontos, cupons, ranking de clientes, dashboards gerenciais e acompanhamento de conversão em venda não fazem parte do escopo inicial.
