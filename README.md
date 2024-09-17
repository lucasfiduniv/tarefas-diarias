# Tarefas Diárias

Este é um projeto de gerenciamento de tarefas diárias que utiliza **Vite** no frontend e **Node.js** com **Fastify** no backend. O objetivo é ajudar os usuários a cadastrar metas semanais e acompanhar o progresso de suas atividades.

## Índice

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Como Executar](#como-executar)
  - [Utilizando Docker](#utilizando-docker)
  - [Executando Localmente](#executando-localmente)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Licença](#licença)

---

## Tecnologias Utilizadas

- **Frontend:**
  - Vite
  - React
  - TypeScript
  - Tailwind CSS
  - Axios
  - React Hook Form
  - Zod
  - Radix UI
  - React Query

- **Backend:**
  - Node.js
  - Fastify
  - TypeScript
  - Drizzle ORM
  - Zod
  - PostgreSQL

---

## Pré-requisitos

- **Node.js** instalado (versão recomendada: 18 ou superior)
- **npm** ou **yarn** como gerenciador de pacotes
- **Docker** e **Docker Compose** instalados (opcional, se preferir executar via contêineres)
- **PostgreSQL** (se preferir executar o banco de dados localmente)

---

## Instalação

### Backend

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/lucasfiduniv/tarefas-diarias.git
   ```

2. **Navegue até a pasta do backend:**

   ```bash
   cd tarefas-diarias
   ```

3. **Instale as dependências:**

   ```bash
   npm install
   # ou
   yarn install
   ```

4. **Configure as variáveis de ambiente:**

   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

   ```env
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/inorbit"
   ```

   Certifique-se de substituir `usuario`, `senha` e a porta conforme sua configuração.

5. **Execute as migrações (se houver):**

   ```bash
   npx drizzle-kit up
   ```

### Frontend

1. **Navegue até a pasta do frontend:**

   ```bash
   cd web
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente:**

   Crie um arquivo `.env` na pasta `web` com o seguinte conteúdo:

   ```env
   VITE_PUBLIC_URL_BACK="http://localhost:3333"
   ```

---

## Como Executar

### Utilizando Docker

1. **Inicie os serviços com Docker Compose:**

   Na raiz do projeto, execute:

   ```bash
   docker-compose up -d
   ```

   Isso iniciará um contêiner com PostgreSQL configurado conforme o arquivo `docker-compose.yml`.

2. **Execute o backend:**

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

3. **Execute o frontend:**

   Em outra janela de terminal, navegue até a pasta `web` e execute:

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

### Executando Localmente

1. **Inicie o PostgreSQL:**

   Certifique-se de que o PostgreSQL está em execução na porta correta e com as credenciais definidas no `.env`.

2. **Execute o backend:**

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

3. **Execute o frontend:**

   Navegue até a pasta `web` e execute:

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

---

## Scripts Disponíveis

### Backend

- **`dev`**: Inicia o servidor em modo de desenvolvimento com recarregamento automático usando `tsx`.
- **`seed`**: Popula o banco de dados com dados iniciais usando o script em `src/db/seed.ts`.

### Frontend

- **`dev`**: Inicia o frontend em modo de desenvolvimento na porta **5174**.
- **`build`**: Compila o projeto para produção.
- **`lint`**: Executa o linter nos arquivos do projeto.
- **`preview`**: Pré-visualiza a versão de produção após o build.

---

## Variáveis de Ambiente

Certifique-se de criar os arquivos `.env` tanto na raiz do backend quanto na pasta `web` do frontend.

### Backend (`.env` na raiz)

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/inorbit"
```

- **`DATABASE_URL`**: URL de conexão com o banco de dados PostgreSQL.

### Frontend (`.env` na pasta `web`)

```env
VITE_PUBLIC_URL_BACK="http://localhost:3333"
```

- **`VITE_PUBLIC_URL_BACK`**: URL base para a API do backend.

---

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

---

**Observação:** Substitua `https://github.com/lucasfiduniv/tarefas-diarias.git` pelo URL real do seu repositório GitHub. Certifique-se também de atualizar quaisquer informações adicionais, como autor, descrição detalhada do projeto e instruções específicas que possam ser relevantes para os contribuidores ou usuários do seu projeto.
