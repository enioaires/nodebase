# Nodebase

## Como Rodar

### Pré-requisitos

- Node.js 20+
- PostgreSQL
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

3. Configure as variáveis de ambiente:

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Database
DATABASE_URL="postgresql://usuario:senha@host:porta/database?sslmode=require"

# Authentication
BETTER_AUTH_SECRET="sua-chave-secreta-aqui"
BETTER_AUTH_URL="http://localhost:3000"

# AI Providers (opcional - configure pelo menos um)
GOOGLE_GENERATIVE_AI_API_KEY="sua-key-do-google"
OPENAI_API_KEY="sua-key-da-openai"
ANTHROPIC_API_KEY="sua-key-da-anthropic"

# Polar (pagamentos)
POLAR_ACCESS_TOKEN="seu-token-do-polar"
POLAR_SUCCESS_URL="http://localhost:3000"

# Sentry (opcional)
SENTRY_AUTH_TOKEN="seu-token-do-sentry"
```

4. Execute as migrações do banco de dados:
```bash
npx prisma migrate dev
```

5. Gere o cliente do Prisma:
```bash
npx prisma generate
```

### Executando o Projeto

#### Modo Desenvolvimento

Para rodar apenas o Next.js:
```bash
npm run dev
```

Para rodar Next.js + Inngest simultaneamente:
```bash
npm run dev:all
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

#### Modo Produção

```bash
npm run build
npm start
```

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento Next.js
- `npm run dev:all` - Inicia Next.js e Inngest simultaneamente
- `npm run build` - Cria build de produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa o linter (Biome)
- `npm run format` - Formata o código
- `npm run inngest:dev` - Inicia apenas o Inngest dev server
