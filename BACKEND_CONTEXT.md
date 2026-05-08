# VegCom Backend API

> **Contexto para IA**: Este arquivo serve como a fonte de verdade técnica para o backend do projeto VegCom. Ao propor alterações ou novas features, consulte este documento para entender a estrutura, contratos de dados e padrões do projeto. Mantenha este arquivo atualizado a cada nova funcionalidade implementada.

## 1. Visão Geral do Projeto

O **VegCom** é uma plataforma backend para compartilhamento de receitas e interação comunitária, focada no nicho vegetariano/vegano. O sistema gerencia usuários, receitas, posts de comunidade, assinaturas premium e interações via chat com IA.

### Tech Stack Principal

- **Language**: TypeScript (Node.js)
- **Framework**: NestJS v11 (Modular Architecture)
- **Database**: PostgreSQL
- **ORM**: Prisma ORM v7+
- **Cache**: Redis (interações de receita, contagem de views)
- **Auth**: JWT (JSON Web Tokens) + BCrypt + Passport
- **Payments**: Stripe API
- **AI Integration**: Google Gemini (`@google/genai`) — assistente "Broto"
- **Email**: Resend
- **Storage**: Cloudinary (imagens — qualidade delegada ao Cloudinary, sem Sharp)
- **Validation**: `class-validator` / `class-transformer`

---

## 2. Configuração e Instalação

### Variáveis de Ambiente (.env)

```env
DATABASE_URL="postgresql://user:password@localhost:5432/vegcom_db?schema=public"
JWT_SECRET="..."
JWT_EXPIRATION="7d"
STRIPE_API_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
RESEND_API_KEY="re_..."
GEMINI_API_KEY="AIzaSy..."
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
REDIS_URL="redis://..."
PORT=3001
FRONTEND_URL="http://localhost:3000"
```

### Execução

```bash
yarn install
docker-compose up -d       # banco + redis
npx prisma migrate dev
yarn start:dev
```

---

## 3. Arquitetura e Módulos (`src/`)

| Módulo          | Prefixo de rota           | Responsabilidade                                                |
| :-------------- | :------------------------ | :-------------------------------------------------------------- |
| `auth/`         | `/api/v1/auth`            | Login, signup, recuperação de senha, perfil próprio             |
| `recipe/`       | `/api/v1/recipes`         | CRUD de receitas, filtros, favoritos, analytics                 |
| `community/`    | `/api/v1/community`       | Feed, posts, likes, comentários, saves                          |
| `comments/`     | `/api/v1/comments`        | Comentários e ratings de receitas                               |
| `chat/`         | `/api/v1/chat`            | Sessões de chat (histórico, rename, delete)                     |
| `ai/`           | `/api/v1/ai`              | Broto (Gemini) — geração de resposta, usage stats               |
| `notification/` | `/api/v1/notifications`   | Notificações in-app (likes, comentários, sistema)               |
| `stripe/`       | `/api/v1/stripe`          | Assinaturas, checkout, portal do cliente                        |
| `user/`         | `/api/v1/users`           | Perfil público de usuário                                       |
| `reports/`      | `/api/v1/reports`         | Denúncias de conteúdo                                           |
| `admin/`        | `/api/v1/admin`           | Painel administrativo (receitas, usuários, posts, anúncios)     |
| `mail/`         | —                         | Serviço de emails transacionais (Resend)                        |
| `health/`       | `/health`                 | Health check com métricas de sistema e latência do banco        |

---

## 4. Endpoints da API

Prefixo global: `/api/v1`

### Auth — `/auth`

| Method | Path                     | Guard    | Descrição                                     |
| ------ | ------------------------ | -------- | --------------------------------------------- |
| GET    | `/auth/check-email`      | Público  | Verificar disponibilidade de email            |
| POST   | `/auth/signup`           | Público  | Criar conta                                   |
| POST   | `/auth/signin`           | Público  | Login — retorna `{ access_token }`            |
| GET    | `/auth/me`               | AuthGuard| Dados do usuário logado                       |
| PUT    | `/auth/me`               | AuthGuard| Atualizar perfil (nome, bio, cidade, etc.)    |
| DELETE | `/auth/me`               | AuthGuard| Excluir conta (body: `{ password }`)          |
| POST   | `/auth/avatar`           | AuthGuard| Upload de avatar (multipart)                  |
| PUT    | `/auth/me/notifications` | AuthGuard| Atualizar preferências de email               |
| POST   | `/auth/forget-password`  | Público  | Enviar email de reset de senha                |
| PUT    | `/auth/update-password`  | AuthGuard| Alterar senha                                 |

**Resposta de `GET /auth/me`:**

```ts
{
  id: number
  name: string
  email: string
  role: "USER" | "ADMIN"
  hasSubscription: boolean
  passwordUpdatedAt: string | null
  informations: {
    avatar?: string
    culinaryLevel?: string
    dietaryPreference?: string
    bio?: string
    city?: string
    meetUs?: string
  }
  emailPreferences: Record<string, boolean>
  createdAt: string
}
```

---

### Recipes — `/recipes`

| Method | Path                         | Guard          | Descrição                                  |
| ------ | ---------------------------- | -------------- | ------------------------------------------ |
| GET    | `/recipes/list`              | Opcional       | Listagem com filtros e paginação           |
| POST   | `/recipes/create`            | AuthGuard      | Criar receita                              |
| GET    | `/recipes/featured`          | Público        | Receita em destaque (hero da página)       |
| GET    | `/recipes/available-filters` | Público        | Opções de filtro disponíveis               |
| GET    | `/recipes/my`                | AuthGuard      | Receitas do usuário logado                 |
| POST   | `/recipes/batch`             | Público        | Buscar múltiplas receitas por array de ids |
| GET    | `/recipes/get/slug/:slug`    | Opcional       | Detalhes de receita por slug               |
| PATCH  | `/recipes/update/:id`        | AuthGuard      | Atualizar receita                          |
| DELETE | `/recipes/delete/:id`        | AuthGuard      | Excluir receita                            |
| PATCH  | `/recipes/:id/favorite`      | AuthGuard      | Toggle favorito                            |

**Query params de `GET /recipes/list`:**

| Param              | Tipo   | Descrição                                                       |
| ------------------ | ------ | --------------------------------------------------------------- |
| `search`           | string | Busca textual                                                   |
| `category`         | string | Filtro por tipo (BREAKFAST, LUNCH, DINNER, SNACK, DESSERT)      |
| `prepTimeCategory` | string | Filtro por tempo (QUICK, MEDIUM, LONG)                          |
| `cookTime`         | number | Tempo máximo de preparo em minutos (ex: `30` para Receitas Rápidas) |
| `sort`             | string | Ordenação — `recent` ordena por `createdAt DESC`                |
| `page`             | number | Página                                                          |
| `limit`            | number | Itens por página                                                |

---

### Community — `/community`

| Method | Path                             | Guard    | Descrição                              |
| ------ | -------------------------------- | -------- | -------------------------------------- |
| GET    | `/community`                     | Opcional | Feed paginado (todos os tipos de post) |
| GET    | `/community/announcements`       | Público  | Somente anúncios                       |
| GET    | `/community/:id`                 | Opcional | Post individual                        |
| POST   | `/community`                     | AuthGuard| Criar post                             |
| PATCH  | `/community/posts/:id`           | AuthGuard| Atualizar post próprio                 |
| DELETE | `/community/posts/:id`           | AuthGuard| Deletar post próprio                   |
| POST   | `/community/:id/likes`           | AuthGuard| Toggle like no post                    |
| POST   | `/community/:id/comments`        | AuthGuard| Comentar no post                       |
| POST   | `/community/comments/:id/replies`| AuthGuard| Responder comentário                   |
| POST   | `/community/posts/:id/save`      | AuthGuard| Toggle salvar post                     |
| GET    | `/community/saved`               | AuthGuard| Posts salvos pelo usuário              |

---

### Comments (Receitas) — `/comments`

| Method | Path                             | Guard    | Descrição                         |
| ------ | -------------------------------- | -------- | --------------------------------- |
| POST   | `/comments/create`               | AuthGuard| Comentar/avaliar receita          |
| GET    | `/comments/recipe/:recipeId`     | Opcional | Comentários de uma receita        |
| PUT    | `/comments/update/:id`           | AuthGuard| Editar comentário                 |
| DELETE | `/comments/delete/:id`           | AuthGuard| Excluir comentário                |
| PATCH  | `/comments/:id/like`             | AuthGuard| Toggle like no comentário         |
| GET    | `/comments/recipe/:recipeId/rating` | Público| Resumo de rating da receita       |

> Texto do comentário é **opcional** — é possível avaliar com estrelas sem deixar texto.

---

### AI — Broto — `/ai`

| Method | Path           | Guard     | Rate limit    | Descrição                              |
| ------ | -------------- | --------- | ------------- | -------------------------------------- |
| POST   | `/ai/generate` | AuthGuard | 3 req / 60 s  | Enviar mensagem para o Broto (Gemini)  |
| GET    | `/ai/usage`    | AuthGuard | —             | Stats de uso semanal do usuário        |

**Body de `POST /ai/generate`:**
```ts
{ query: string; chatId: number; isRegeneration?: boolean }
```

**Comportamento especial do Broto:**
- Detecta URLs `vegcom.life/recipes/*` ou `vegcom.vercel.app/recipes/*` na mensagem
- Busca título, ingredientes, instruções e notas da receita no banco
- Injeta o contexto no prompt antes de chamar o Gemini
- Só sugere substituição de ingredientes se o usuário pedir explicitamente
- Conhece o sistema de subscription, limites e funcionalidades da plataforma

---

### Chat — `/chat`

| Method | Path              | Guard     | Descrição                       |
| ------ | ----------------- | --------- | ------------------------------- |
| POST   | `/chat/create`    | AuthGuard | Criar nova sessão de chat       |
| GET    | `/chat/list`      | AuthGuard | Listar chats do usuário         |
| GET    | `/chat/:id`       | AuthGuard | Detalhes do chat com histórico  |
| PATCH  | `/chat/:id/title` | AuthGuard | Renomear chat                   |
| DELETE | `/chat/:id`       | AuthGuard | Excluir chat                    |

> As mensagens são enviadas via `POST /ai/generate` — o `chatId` é passado no body.

---

### Notifications — `/notifications`

| Method | Path                       | Guard     | Descrição                      |
| ------ | -------------------------- | --------- | ------------------------------ |
| GET    | `/notifications`           | AuthGuard | Listar notificações do usuário |
| GET    | `/notifications/unread-count` | AuthGuard | Contagem de não lidas        |
| PATCH  | `/notifications/:id/read`  | AuthGuard | Marcar como lida               |
| PATCH  | `/notifications/read-all`  | AuthGuard | Marcar todas como lidas        |

---

### User — `/users`

| Method | Path         | Guard   | Descrição              |
| ------ | ------------ | ------- | ---------------------- |
| GET    | `/users/:id` | Público | Perfil público do user |

---

### Stripe — `/stripe`

| Method | Path               | Guard     | Descrição                                          |
| ------ | ------------------ | --------- | -------------------------------------------------- |
| GET    | `/stripe/products` | AuthGuard | Listar produtos/preços disponíveis                 |
| POST   | `/stripe/checkout` | AuthGuard | Criar sessão de checkout (body: `{ priceId }`)     |
| POST   | `/stripe/portal`   | AuthGuard | URL do Customer Portal (requer assinatura ativa)   |

> Webhook do Stripe é tratado separadamente e não passa pelo AuthGuard.

---

### Reports — `/reports`

| Method | Path              | Guard     | Descrição                       |
| ------ | ----------------- | --------- | ------------------------------- |
| POST   | `/reports/create` | AuthGuard | Denunciar post ou conteúdo      |

---

### Admin — `/admin`

Todos os endpoints admin requerem `AuthGuard` + `role: ADMIN`.

| Prefixo                        | Operações                  |
| ------------------------------ | -------------------------- |
| `/admin/recipes`               | GET list, GET :id, PATCH :id, DELETE :id |
| `/admin/users`                 | GET list, GET :id, PATCH :id, DELETE :id |
| `/admin/community-posts`       | GET list, GET :id, PATCH :id, DELETE :id |
| `/admin/reports`               | GET list, GET :id, PATCH :id |
| `/admin/announcements`         | GET list, GET :id, POST, PATCH :id, DELETE :id |

---

## 5. Modelo de Dados — Pontos-Chave

### User

- `role`: `USER` ou `ADMIN`
- `informations`: `Json` flexível (perfil, avatar, cidade, bio, etc.)
- `hasSubscription`: Boolean — controla acesso Premium
- `emailPreferences`: `Json` — configuração de notificações por email (default definido na migration)
- `passwordUpdatedAt`: `DateTime?` — data da última alteração de senha

### Recipe

- `ingredients` e `steps`: `Json` (conteúdo Tiptap)
- `images`: `String[]`
- `mealType`, `prepTimeCategory`: enums
- `cookTime`: `Int?` — tempo de preparo em minutos (usado no filtro de Receitas Rápidas)
- Views rastreadas via Redis antes de persistir no banco

### Community

- `CommunityPost`: tipos `POST`, `RESOURCE`, `ANNOUNCEMENT`
- `contentHTML`: HTML pré-renderizado armazenado junto ao conteúdo JSON
- `CommunityComment`: suporta replies via `parentId` (auto-relacionamento)
- Notificações duplicadas são prevenidas via constraints únicas nas tabelas `Notification` e `RecipeView`

### Chat / Message

- `Chat`: sessão de conversa com `title` editável
- `Message`: `role` (`user` | `assistant`), `content` string
- `metadata`: `Json` — contexto extra ou dados de regeneração

---

## 6. Padrões de Desenvolvimento

### Guards

- `AuthGuard` — protege rotas autenticadas (JWT)
- `OptionalAuthGuard` — aceita request com ou sem token (ex: detalhe de receita)
- `@CurrentUser()` — decorator para extrair usuário do request

### Erros

Use subclasses de `HttpException` (`NotFoundException`, `BadRequestException`, etc.). Existe um `ValidationExceptionFilter` global para erros de DTO.

### Paginação

Todos os endpoints de lista retornam:
```ts
{ data: T[]; total: number; page: number; limit: number; totalPages: number }
```

### Regras de Negócio

1. **Schema First** — edite `prisma/schema.prisma` e rode `npx prisma migrate dev` antes de tocar no TypeScript
2. **Tipagem forte** — evite `any`; use tipos gerados pelo Prisma ou DTOs com `class-validator`
3. **Modularidade** — lógica pesada fica em Services, Controllers são finos
4. **Rate limiting** — endpoint de AI tem throttle de 3 req/60s via `@Throttle`
5. **Imagens** — qualidade e resize delegados ao Cloudinary; não use Sharp no backend

---

_Última atualização: Maio 2026_
