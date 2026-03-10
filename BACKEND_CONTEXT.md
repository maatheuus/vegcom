# VegCom Backend API

> **Contexto para IA**: Este arquivo serve como a fonte de verdade técnica para o backend do projeto VegCom. Ao propor alterações ou novas features, consulte este documento para entender a estrutura, contratos de dados e padrões do projeto. Mantenha este arquivo atualizado a cada nova funcionalidade implementada.

## 1. Visão Geral do Projeto

O **VegCom** é uma plataforma backend para compartilhamento de receitas e interação comunitária, focada no nicho vegetariano/vegano. O sistema gerencia usuários, receitas, posts de comunidade, assinaturas premium e interações via chat com IA.

### Tech Stack Principal

- **Language**: TypeScript (Node.js)
- **Framework**: NestJS v11 (Modular Architecture)
- **Database**: PostgreSQL
- **ORM**: Prisma ORM v7.2
- **Auth**: JWT (JSON Web Tokens) + BCrypt + Pasport
- **Payments**: Stripe API
- **AI Integration**: Google Gemini (`@google/genai`)
- **Email**: Resend
- **Validation**: `class-validator` / `class-transformer` / `zod`

---

## 2. Configuração e Instalação

### Pré-requisitos

- Node.js v18+
- Docker (para banco de dados local)
- Yarn ou NPM

### Variáveis de Ambiente (.env)

Crie um arquivo `.env` na raiz seguindo este modelo:

```env
# Banco de Dados
DATABASE_URL="postgresql://user:password@localhost:5432/vegcom_db?schema=public"

# Autenticação
JWT_SECRET="segredo_super_seguro_para_tokens"
JWT_EXPIRATION="7d"

# Pagamentos (Stripe)
STRIPE_API_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email
RESEND_API_KEY="re_..."

# Google Gemini (AI)
GEMINI_API_KEY="AIzaSy..."

# Configuração App
PORT=3001
FRONTEND_URL="http://localhost:3000"
```

### Instalação e Execução

1.  **Instalar dependências**:

    ```bash
    yarn install
    ```

2.  **Iniciar Banco de Dados**:

    ```bash
    docker-compose up -d
    ```

3.  **Setup do Banco (Migrations)**:

    ```bash
    npx prisma migrate dev
    ```

4.  **Rodar a aplicação**:

    ```bash
    # Desenvolvimento
    yarn start:dev

    # Produção
    yarn build
    yarn start:prod
    ```

---

## 3. Arquitetura e Estrutura de Pastas (`src/`)

O projeto segue a arquitetura modular padrão do NestJS.

- `src/app.module.ts`: Módulo raiz que agrega todos os módulos da aplicação.
- `src/main.ts`: Ponto de entrada. Configura ValidationPipes, CORS e escuta na porta definida.

### Módulos Principais

| Diretório       | Responsabilidade                                               | Models Relacionados (Prisma)                         |
| :-------------- | :------------------------------------------------------------- | :--------------------------------------------------- |
| `auth/`         | Autenticação, Login, Registro, Recuperação de Senha.           | `User`                                               |
| `recipe/`       | CRUD de Receitas, Filtros (MealType, PrepTime), Imagens.       | `Recipe`, `SavedRecipe`, `Comment`                   |
| `community/`    | Feed da comunidade, Posts, Likes, Comentários aninhados.       | `CommunityPost`, `CommunityComment`, `CommunityLike` |
| `chat/`         | Chat com AI (Gemini) e histórico de mensagens.                 | `Chat`, `Message`                                    |
| `notification/` | Sistema de notificações (Like, Comentário, Sistema).           | `Notification`                                       |
| `stripe/`       | Gerenciamento de assinaturas e webhooks.                       | `User` (subscription fields)                         |
| `comments/`     | Lógica compartilhada ou específica de comentários de receitas. | `Comment`, `CommentLike`                             |
| `mail/`         | Serviço de envio de emails transacionais.                      | N/A                                                  |

---

## 4. Modelo de Dados (Prisma Schema)

O esquema do banco de dados está definido em `prisma/schema.prisma`. Abaixo, os pontos-chave para entendimento do domínio:

### User

Entidade central.

- `role`: `USER` ou `ADMIN`.
- `informations`: Campo `Json` flexível para dados de perfil.
- `hasSubscription`: Boolean para controle de acesso Premium.
- `emailPreferences`: Configuração de notificações por email (Json).

### Recipe

Receitas criadas pelos usuários.

- `ingredients` e `steps`: Armazenados como `Json` ou arrays (verificar implementação específica no service). No schema atual: `steps Json`.
- `images`: Array de strings (`String[]`) para URLs das imagens.
- `mealType`, `prepTimeCategory`: Enums para categorização.

### Community (Feed)

Sistema social separado das receitas.

- `CommunityPost`: Pode ser `POST`, `RESOURCE` ou `ANNOUNCEMENT`.
- `CommunityComment`: Suporta aninhamento (replies) através de auto-relacionamento (`parentId`).

### Notification

Sistema polimórfico simplificado via IDs.

- `entityType`: String que define a qual entidade a notificação se refere (`COMMUNITY_POST`, `RECIPE`, `COMMENT`).
- `entityId`: ID da entidade referenciada.
- `actorId`: Quem disparou a ação (ex: quem deu o like).

### Chat (AI)

- `Chat`: Uma sessão de conversa.
- `Message`: Mensagens individuais (`role`: `user` ou `assistant`).
- `metadata`: Campo Json para armazenar tokens, contexto extra ou dados da IA.

---

## 5. Padrões de Desenvolvimento

### DTOs e Validação

Usamos `class-validator` para validar entradas nos Controllers. Todo payload de entrada (`Body`, `Query`) DEVE ter um DTO correspondente.

Exemplo:

```typescript
export class CreateRecipeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsEnum(MealType)
  mealType: MealType;
}
```

### Autenticação (Guards)

- `jwt.guard.ts`: Protege rotas que exigem login.
- `@CurrentUser()`: Decorator customizado para extrair o usuário logado do Request.

### Tratamento de Erros

O NestJS lida com exceções globais, mas use `HttpException` (ex: `NotFoundException`, `BadRequestException`) explicitamente onde necessário.

---

## 6. Endpoints da API (Resumo)

Prefixo Global: `/api/v1`

### Auth

- `POST /auth/signup`: Cria conta.
- `POST /auth/signin`: Login (retorna JWT).

### Recipes

- `GET /recipes`: Listagem com filtros (search, category, time).
- `POST /recipes`: Criar receita (Requer Auth).
- `GET /recipes/:id`: Detalhes.

### Community

- `GET /community/posts`: Feed.
- `POST /community/posts`: Novo post.

### Chat (AI)

- `POST /chat`: Iniciar novo chat.
- `POST /chat/:id/message`: Enviar mensagem para o Gemini.

---

## 7. Instruções para IA (Ao editar código)

1.  **Schema First**: Se a feature requer novos dados, edite primeiro o `prisma/schema.prisma`, rode `npx prisma migrate dev` e só depois toque no código TypeScript.
2.  **Atualizar este README**: Se criar um novo módulo ou variável de ambiente, adicione aqui.
3.  **Tipagem Forte**: Evite `any`. Use tipos gerados pelo Prisma ou classes DTO.
4.  **Modularidade**: Se a lógica crescer, extraia para um Service ou Utils. Não deixe Controllers gordos.

---

_Última atualização: Janeiro 2026_
