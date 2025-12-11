# Nodebase

## Como Rodar

### Pré-requisitos

- Node.js 20+
- Docker e Docker Compose
- npm, yarn, pnpm ou bun

### Configuração

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd nodebase
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o banco de dados local:

O projeto já vem com um arquivo `.env.local` configurado para usar PostgreSQL local via Docker.

Para usar o banco local (recomendado para desenvolvimento):
```bash
# Subir o PostgreSQL
npm run db:up

# Rodar as migrações (criar tabelas)
npm run db:migrate

# Gerar cliente Prisma
npm run db:generate
```

**Nota:** Se preferir usar um banco externo (como Neon), edite o arquivo `.env.local` e altere a `DATABASE_URL`.

4. Configure as variáveis de ambiente adicionais:

Edite o arquivo `.env.local` se necessário para adicionar suas keys:

```env
# AI Providers (configure pelo menos um)
GOOGLE_GENERATIVE_AI_API_KEY="sua-key-do-google"
OPENAI_API_KEY="sua-key-da-openai"
ANTHROPIC_API_KEY="sua-key-da-anthropic"

# Polar (pagamentos)
POLAR_ACCESS_TOKEN="seu-token-do-polar"

# Sentry (opcional)
SENTRY_AUTH_TOKEN="seu-token-do-sentry"
```

### Executando o Projeto

#### Modo Desenvolvimento

**Opção 1: Rodar tudo junto (recomendado)**
```bash
npm run dev:all
```
Isso irá iniciar simultaneamente:
- PostgreSQL (Docker)
- Next.js (porta 3000)
- Inngest (porta 8288)

**Opção 2: Rodar separadamente**
```bash
# Terminal 1: PostgreSQL
npm run db:up

# Terminal 2: Next.js
npm run dev

# Terminal 3: Inngest
npm run inngest:dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

#### Modo Produção

```bash
npm run build
npm start
```

### Scripts Disponíveis

#### Desenvolvimento
- `npm run dev` - Inicia o servidor de desenvolvimento Next.js
- `npm run dev:all` - Inicia PostgreSQL + Next.js + Inngest simultaneamente (usa mprocs)
- `npm run inngest:dev` - Inicia apenas o Inngest dev server

#### Build e Deploy
- `npm run build` - Cria build de produção
- `npm run start` - Inicia servidor de produção

#### Banco de Dados
- `npm run db:up` - Sobe o PostgreSQL em background (Docker)
- `npm run db:down` - Para o PostgreSQL
- `npm run db:migrate` - Roda migrações do Prisma
- `npm run db:generate` - Gera cliente Prisma
- `npm run db:studio` - Abre interface visual do Prisma Studio
- `npm run db:reset` - Reseta o banco de dados (cuidado!)

#### Código
- `npm run lint` - Executa o linter (Biome) em todo o projeto
- `npm run lint:src` - Executa o linter apenas na pasta `src` com correções automáticas
- `npm run lint:check` - Verifica erros de lint sem aplicar correções
- `npm run format` - Formata o código com Biome

### Credenciais do Banco Local

Ao usar `npm run db:up`, o PostgreSQL rodará com:
- Host: `localhost:5432`
- Usuário: `nodebase`
- Senha: `nodebase`
- Database: `nodebase`
