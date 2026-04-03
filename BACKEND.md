# VegCom API — Referência para o Frontend

Tudo que o frontend precisa saber para integrar com o backend VegCom.

---

## Base URL

```
Desenvolvimento: http://localhost:3001/api/v1
Produção:        https://<seu-dominio>/api/v1
```

---

## Autenticação

O backend usa **JWT (JSON Web Token)**. Após o login, inclua o token em todas as requisições autenticadas:

```
Authorization: Bearer <token>
```

### Fluxo de Auth

```
1. POST /auth/signup  →  cria conta
2. POST /auth/signin  →  retorna { token, user }
3. Salvar token no localStorage / cookie
4. Enviar header Authorization em rotas protegidas
5. GET /auth/me  →  busca dados atualizados do usuário logado
```

### Convenção de Rotas

| Símbolo         | Significado                                        |
| --------------- | -------------------------------------------------- |
| `[JWT]`         | Requer `Authorization: Bearer <token>`             |
| `[Optional]`    | JWT opcional — retorna dados extras se autenticado |
| `[Clerk]`       | Autenticação via Clerk (painel admin)              |
| _(sem símbolo)_ | Rota pública                                       |

---

## Formato de Erros

```json
{
  "statusCode": 400,
  "message": ["email must be an email"],
  "error": "Bad Request"
}
```

Erros de validação retornam `message` como array de strings. Outros erros retornam `message` como string.

---

## Enums e Constantes

### MealType

```
BREAKFAST | LUNCH | DINNER | DESSERT | GENERAL | SNACKS
```

### PrepTimeCategory

```
QUICK | ELABORATE
```

### ReviewStatus (receitas)

```
IN_REVIEW | PUBLISHED | REJECTED
```

### PostType (comunidade)

```
POST | RESOURCE | ANNOUNCEMENT
```

### NotificationType

```
COMMENT_REPLY | POST_LIKE | RECIPE_COMMENT | SYSTEM
```

### ReportStatus

```
PENDING | RESOLVED | DISMISSED
```

---

## Upload de Arquivos

Endpoints que recebem imagens usam `Content-Type: multipart/form-data`.

- **Receitas**: até 10 imagens no campo `images[]`
- **Posts da comunidade**: campo `images[]`
- **Avatar**: campo `avatar` (arquivo único)

As imagens são armazenadas no Cloudinary e retornadas como URLs públicas.

---

## Paginação

Os endpoints que suportam paginação aceitam query params:

```
?page=1&limit=10
```

---

## Endpoints

---

### AUTH — `/auth`

#### `GET /auth/check-email?email=<email>`

Verifica disponibilidade de email antes do cadastro.

**Response:**

```json
{ "available": true }
```

---

#### `POST /auth/signup`

Cria nova conta.

**Body:**

```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "SenhaForte123!"
}
```

**Response:** `201`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com",
    "role": "USER"
  }
}
```

---

#### `POST /auth/signin`

Login. Retorna JWT.

**Body:**

```json
{
  "email": "joao@email.com",
  "password": "SenhaForte123!"
}
```

**Response:** `200`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com",
    "role": "USER",
    "hasSubscription": false,
    "informations": {}
  }
}
```

---

#### `GET /auth/me` `[JWT]`

Retorna dados do usuário autenticado.

**Response:** `200`

```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@email.com",
  "role": "USER",
  "hasSubscription": false,
  "informations": {},
  "emailPreferences": {}
}
```

---

#### `PUT /auth/me` `[JWT]`

Atualiza perfil do usuário autenticado.

**Body (todos opcionais):**

```json
{
  "name": "João Silva Atualizado",
  "informations": { "bio": "Cozinheiro vegano" },
  "emailPreferences": { "notifications": true }
}
```

---

#### `POST /auth/avatar` `[JWT]`

Upload de foto de perfil.

**Content-Type:** `multipart/form-data`
**Campo:** `avatar` (arquivo de imagem)

**Response:**

```json
{ "avatarUrl": "https://res.cloudinary.com/..." }
```

---

#### `POST /auth/forget-password`

Solicita email de reset de senha.

**Body:**

```json
{ "email": "joao@email.com" }
```

---

#### `POST /auth/reset-password`

Redefine senha com token recebido por email.

**Body:**

```json
{
  "token": "abc123...",
  "password": "NovaSenha456!"
}
```

---

#### `PUT /auth/update-password` `[JWT]`

Altera senha (usuário autenticado).

**Body:**

```json
{
  "currentPassword": "SenhaAtual123",
  "newPassword": "NovaSenha456!"
}
```

---

### RECIPES — `/recipes`

#### `GET /recipes/available-filters`

Retorna os valores possíveis para filtros de receitas.

**Response:**

```json
{
  "mealTypes": ["BREAKFAST", "LUNCH", "DINNER", "DESSERT", "GENERAL", "SNACKS"],
  "prepTimeCategories": ["QUICK", "ELABORATE"],
  "difficulties": ["EASY", "MEDIUM", "HARD"]
}
```

---

#### `GET /recipes/featured`

Receitas em destaque.

**Query params (opcionais):**

```
?filter=BREAKFAST
```

---

#### `GET /recipes/list`

Lista receitas com filtros.

**Query params (todos opcionais):**

```
?search=massa
?mealType=LUNCH
?prepTimeCategory=QUICK
?category=italiana
?difficulty=EASY
?page=1
?limit=12
```

**Response:**

```json
{
  "data": [
    {
      "id": 1,
      "title": "Macarrão ao Pesto",
      "slug": "macarrao-ao-pesto",
      "description": "...",
      "mealType": "LUNCH",
      "prepTimeCategory": "QUICK",
      "images": ["https://res.cloudinary.com/..."],
      "reviewStatus": "PUBLISHED",
      "views": 42,
      "user": { "id": 1, "name": "João" }
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 12
}
```

---

#### `GET /recipes/my` `[JWT]`

Receitas do usuário autenticado (inclui todas as reviewStatus).

---

#### `POST /recipes/batch`

Busca múltiplas receitas por IDs.

**Body:**

```json
{ "ids": [1, 2, 3] }
```

---

#### `GET /recipes/get/:id` `[Optional]`

Detalhes de receita por ID. Usuários autenticados recebem campos extras (ex: se salvou a receita).

**Response:**

```json
{
  "id": 1,
  "title": "Macarrão ao Pesto",
  "slug": "macarrao-ao-pesto",
  "description": "...",
  "mealType": "LUNCH",
  "prepTimeCategory": "QUICK",
  "cookTime": 20,
  "quantity": 2,
  "category": "massas",
  "difficulty": "EASY",
  "images": ["https://res.cloudinary.com/..."],
  "steps": [...],
  "reviewStatus": "PUBLISHED",
  "isPublished": true,
  "views": 42,
  "user": { "id": 1, "name": "João", "informations": {} },
  "isFavorited": false
}
```

---

#### `GET /recipes/get/slug/:slug` `[Optional]`

Detalhes de receita por slug (para URLs amigáveis).

---

#### `POST /recipes/create` `[JWT]`

Cria nova receita.

**Content-Type:** `multipart/form-data`

**Campos:**

```
title         string (obrigatório)
description   string (obrigatório)
mealType      MealType enum (obrigatório)
prepTimeCategory  PrepTimeCategory enum (obrigatório)
cookTime      number
quantity      number
category      string
difficulty    string
steps         JSON string (array de objetos)
images[]      arquivos de imagem (máx 10)
```

**Exemplo de `steps` (JSON string):**

```json
[
  { "order": 1, "description": "Cozinhar o macarrão al dente" },
  { "order": 2, "description": "Preparar o molho pesto" }
]
```

---

#### `PUT /recipes/update/:id` `[JWT]`

Atualiza receita (apenas o dono).

**Body:** mesmos campos do create (todos opcionais).

---

#### `DELETE /recipes/delete/:id` `[JWT]`

Deleta receita (apenas o dono).

---

#### `POST /recipes/:id/view`

Registra visualização da receita (anônima, baseada em IP).

---

#### `PATCH /recipes/:id/favorite` `[JWT]`

Alterna receita como favorita (toggle).

**Response:**

```json
{ "favorited": true }
```

---

### COMMENTS — `/comments`

#### `POST /comments/create` `[JWT]`

Cria comentário em receita.

**Body:**

```json
{
  "recipeId": 1,
  "text": "Ficou delicioso!",
  "rating": 5
}
```

---

#### `GET /comments/recipe/:recipeId` `[Optional]`

Lista comentários de uma receita.

**Response:**

```json
[
  {
    "id": 1,
    "text": "Ficou delicioso!",
    "rating": 5,
    "user": { "id": 1, "name": "João", "informations": {} },
    "likes": [],
    "_count": { "likes": 3 },
    "userLiked": false
  }
]
```

---

#### `GET /comments/recipe/:recipeId/rating`

Retorna a média de avaliações de uma receita.

**Response:**

```json
{ "average": 4.5, "total": 12 }
```

---

#### `PUT /comments/update/:id` `[JWT]`

Atualiza comentário (apenas o autor).

**Body:**

```json
{ "text": "Texto atualizado", "rating": 4 }
```

---

#### `DELETE /comments/delete/:id` `[JWT]`

Deleta comentário (apenas o autor).

---

#### `PATCH /comments/:id/like` `[JWT]`

Alterna like em comentário (toggle).

---

### COMMUNITY — `/community`

#### `GET /community/announcements`

Lista anúncios da plataforma.

---

#### `GET /community`

Lista todos os posts da comunidade.

**Query params (opcionais):**

```
?type=POST
?page=1
?limit=10
```

**Response:**

```json
{
  "data": [
    {
      "id": 1,
      "title": "Meu primeiro post",
      "slug": "meu-primeiro-post",
      "content": "...",
      "contentHTML": "<p>...</p>",
      "type": "POST",
      "imageUrl": "https://...",
      "images": [],
      "tags": ["vegano", "receita"],
      "user": { "id": 1, "name": "João" },
      "_count": { "likes": 5, "comments": 2 }
    }
  ]
}
```

---

#### `GET /community/:id`

Detalhes de um post da comunidade.

---

#### `POST /community` `[JWT]`

Cria post na comunidade.

**Content-Type:** `multipart/form-data`

**Campos:**

```
title       string (obrigatório)
content     string (obrigatório)
contentHTML string (HTML do editor rico)
type        PostType enum (POST | RESOURCE | ANNOUNCEMENT)
tags        string (JSON array: '["vegano","dica"]')
links       string (JSON array de URLs)
images[]    arquivos de imagem
```

---

#### `PATCH /community/posts/:id` `[JWT]`

Atualiza post (apenas o autor).

---

#### `DELETE /community/posts/:id` `[JWT]`

Deleta post (apenas o autor).

---

#### `POST /community/:id/comments` `[JWT]`

Comenta em um post da comunidade.

**Body:**

```json
{ "content": "Ótimo post!" }
```

---

#### `POST /community/comments/:id/replies` `[JWT]`

Responde a um comentário (nested reply).

**Body:**

```json
{ "content": "Concordo!" }
```

---

#### `POST /community/:id/likes` `[JWT]`

Toggle de like em post.

---

#### `POST /community/posts/:id/save` `[JWT]`

Toggle de salvar post.

---

#### `GET /community/saved` `[JWT]`

Lista posts salvos pelo usuário autenticado.

---

### CHAT — `/chat`

Chat com IA (Google Gemini). Cada conversa tem um contexto isolado.

#### `POST /chat/create` `[JWT]`

Cria nova sessão de chat.

**Body:**

```json
{
  "title": "Dúvidas sobre receitas veganas",
  "topic": "receitas"
}
```

**Response:**

```json
{
  "id": 1,
  "title": "Dúvidas sobre receitas veganas",
  "topic": "receitas",
  "messages": []
}
```

---

#### `GET /chat/list` `[JWT]`

Lista todas as sessões de chat do usuário.

---

#### `GET /chat/:id` `[JWT]`

Retorna chat com histórico de mensagens.

**Response:**

```json
{
  "id": 1,
  "title": "...",
  "messages": [
    { "role": "user", "content": "Quais substituições para ovos?" },
    { "role": "assistant", "content": "Você pode usar..." }
  ]
}
```

---

#### `POST /chat/message` `[JWT]`

Envia mensagem no chat. Dispara chamada ao Gemini e retorna a resposta.

**Body:**

```json
{
  "chatId": 1,
  "content": "Como substituir ovos em bolos veganos?"
}
```

**Response:**

```json
{
  "role": "assistant",
  "content": "Você pode usar banana amassada, linhaça com água..."
}
```

---

#### `PATCH /chat/:id/title` `[JWT]`

Atualiza título da sessão de chat.

**Body:**

```json
{ "title": "Novo título" }
```

---

#### `DELETE /chat/:id` `[JWT]`

Deleta sessão de chat.

---

### AI — `/ai`

Geração direta com Gemini (sem contexto de sessão).

#### `POST /ai/generate` `[JWT]`

Gera texto com Gemini.

**Body:**

```json
{
  "prompt": "Sugira 3 receitas com tofu",
  "context": "plataforma vegana"
}
```

---

#### `GET /ai/usage` `[JWT]`

Estatísticas de uso de IA do usuário.

---

### NOTIFICATIONS — `/notifications`

#### `GET /notifications` `[JWT]`

Lista notificações do usuário (paginado).

**Query params:**

```
?page=1&limit=10
```

**Response:**

```json
{
  "data": [
    {
      "id": 1,
      "type": "RECIPE_COMMENT",
      "message": "João comentou na sua receita",
      "isRead": false,
      "entityId": 42,
      "entityType": "RECIPE",
      "actor": { "id": 2, "name": "João" },
      "createdAt": "2026-01-15T10:00:00Z"
    }
  ],
  "total": 5
}
```

---

#### `GET /notifications/unread-count` `[JWT]`

Contagem de notificações não lidas (para badge no sino).

**Response:**

```json
{ "count": 3 }
```

---

#### `PATCH /notifications/:id/read` `[JWT]`

Marca notificação específica como lida.

---

#### `PATCH /notifications/read-all` `[JWT]`

Marca todas as notificações como lidas.

---

### STRIPE — `/stripe`

#### `GET /stripe/products` `[JWT]`

Lista planos disponíveis para assinatura.

**Response:**

```json
[
  {
    "id": "prod_xxx",
    "name": "VegCom Premium",
    "price": 1990,
    "currency": "brl",
    "interval": "month"
  }
]
```

---

#### `POST /stripe/checkout` `[JWT]`

Cria sessão de checkout do Stripe.

**Body:**

```json
{ "priceId": "price_xxx" }
```

**Response:**

```json
{ "url": "https://checkout.stripe.com/..." }
```

Redirecione o usuário para a `url` retornada.

---

#### `POST /stripe/portal` `[JWT]`

Retorna URL do portal do cliente Stripe (para gerenciar assinatura).

**Response:**

```json
{ "url": "https://billing.stripe.com/..." }
```

---

### REPORTS — `/reports`

#### `POST /reports` `[JWT]`

Denuncia conteúdo impróprio.

**Body:**

```json
{
  "reason": "Conteúdo inapropriado",
  "recipeId": 1
}
```

Ou para post da comunidade:

```json
{
  "reason": "Spam",
  "communityPostId": 5
}
```

Ou para usuário:

```json
{
  "reason": "Comportamento abusivo",
  "targetUserId": 10
}
```

---

### USER — `/user`

#### `GET /user/:id`

Perfil público de um usuário.

**Response:**

```json
{
  "id": 1,
  "name": "João Silva",
  "informations": { "bio": "Cozinheiro vegano" },
  "recipes": [...],
  "_count": { "recipes": 5 }
}
```

---

### HEALTH — `/health`

#### `GET /health`

Verifica se a API e o banco de dados estão operacionais.

**Response:**

```json
{ "status": "ok", "database": "connected" }
```

---

## Fluxos Importantes

### Fluxo de Cadastro e Login

```
1. GET  /auth/check-email?email=x  →  verifica disponibilidade
2. POST /auth/signup               →  cria conta, recebe token
3. [Salvar token]
4. GET  /auth/me                   →  busca dados do usuário
```

### Fluxo de Reset de Senha

```
1. POST /auth/forget-password  { email }          →  envia email com link
2. [Usuário clica no link, pega o token da URL]
3. POST /auth/reset-password   { token, password } →  redefine senha
```

### Fluxo de Assinatura Premium

```
1. GET  /stripe/products                  →  lista planos
2. POST /stripe/checkout { priceId }      →  cria checkout session
3. [Redirecionar usuário para url retornada]
4. [Stripe redireciona de volta após pagamento]
5. GET  /auth/me                          →  hasSubscription: true
```

### Publicação de Receita

```
1. POST /recipes/create  (multipart)      →  cria com reviewStatus: IN_REVIEW
2. [Admin aprova via painel admin]
3. Receita aparece com reviewStatus: PUBLISHED
```

### Notificações em Tempo Real

O backend não tem WebSocket. Para notificações, faça **polling**:

```
A cada X segundos: GET /notifications/unread-count
Se count > 0:       GET /notifications?page=1&limit=10
```

---

## Cabeçalhos HTTP Necessários

| Rota               | Headers Necessários                                                   |
| ------------------ | --------------------------------------------------------------------- |
| Rotas públicas     | `Content-Type: application/json`                                      |
| Rotas `[JWT]`      | `Authorization: Bearer <token>` + `Content-Type: application/json`    |
| Upload de arquivos | `Authorization: Bearer <token>` + `Content-Type: multipart/form-data` |

> **Nota**: Para `multipart/form-data`, não defina `Content-Type` manualmente — deixe o browser/fetch definir automaticamente com o boundary correto.

---

## Dicas de Integração

1. **Slug vs ID**: Para páginas de receita pública, prefira `/recipes/get/slug/:slug` para URLs SEO-friendly.
2. **OptionalAuth**: Nos endpoints `[Optional]`, enviar o token quando disponível enriquece a resposta (ex: `isFavorited`).
3. **Refresh de token**: O JWT expira em 7 dias. Não há endpoint de refresh — redirecione para login ao receber `401`.
4. **Imagens**: Sempre exiba a URL retornada pelo Cloudinary diretamente.
5. **Admin**: O painel admin usa Clerk — não interfere com o fluxo JWT do app principal.
