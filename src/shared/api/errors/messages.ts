import {
  AI_ERRORS,
  AUTH_ERRORS,
  CHAT_ERRORS,
  COMMENT_ERRORS,
  COMMUNITY_ERRORS,
  RECIPE_ERRORS,
  STRIPE_ERRORS,
} from "./codes";

export const ERROR_MESSAGES: Record<string, string> = {
  // Auth
  [AUTH_ERRORS.USER_ALREADY_EXISTS]: "Este e-mail já está em uso.",
  [AUTH_ERRORS.AUTH_INVALID_CREDENTIALS]: "Credenciais inválidas.",
  [AUTH_ERRORS.USER_NOT_FOUND]: "Usuário não encontrado.",
  [AUTH_ERRORS.INVALID_CURRENT_PASSWORD]: "A senha atual está incorreta.",
  [AUTH_ERRORS.INVALID_RESET_TOKEN]:
    "Token de redefinição inválido ou expirado.",

  // Recipe
  [RECIPE_ERRORS.RECIPE_NOT_FOUND]: "Receita não encontrada.",
  [RECIPE_ERRORS.RECIPE_NOT_PUBLISHED]: "Esta receita não está publicada.",
  [RECIPE_ERRORS.RECIPE_FORBIDDEN]:
    "Você não tem permissão para acessar esta receita.",
  [RECIPE_ERRORS.RECIPE_LIMIT_FREE]:
    "Você atingiu o limite de receitas gratuitas.",
  [RECIPE_ERRORS.RECIPE_LIMIT_PREMIUM]:
    "Você atingiu o limite de receitas premium.",
  [RECIPE_ERRORS.RECIPE_OWNER_CHANGE]:
    "Você não pode alterar o proprietário da receita.",
  [RECIPE_ERRORS.SAVED_RECIPE_LIMIT]:
    "Você atingiu o limite de receitas salvas.",
  [RECIPE_ERRORS.USER_INVALID]: "Usuário inválido.",

  // Comments
  [COMMENT_ERRORS.COMMENT_NOT_FOUND]: "Comentário não encontrado.",
  [COMMENT_ERRORS.COMMENT_FORBIDDEN]:
    "Você não tem permissão para editar este comentário.",

  // Community
  [COMMUNITY_ERRORS.POSTS_NOT_FOUND]: "Nenhuma publicação encontrada.",
  [COMMUNITY_ERRORS.POST_NOT_FOUND]: "Publicação não encontrada.",
  [COMMUNITY_ERRORS.POST_UPDATE_FORBIDDEN]:
    "Você não tem permissão para editar esta publicação.",
  [COMMUNITY_ERRORS.POST_DELETE_FORBIDDEN]:
    "Você não tem permissão para excluir esta publicação.",
  [COMMUNITY_ERRORS.ANNOUNCEMENT_FORBIDDEN]:
    "Você não tem permissão para criar anúncios.",

  // Chat
  [CHAT_ERRORS.CHAT_NOT_FOUND]: "Chat não encontrado.",
  [CHAT_ERRORS.CHAT_FORBIDDEN]:
    "Você não tem permissão para acessar este chat.",
  [CHAT_ERRORS.CHAT_LIMIT_REACHED]: "Você atingiu o limite de chats.",
  [CHAT_ERRORS.CHAT_TITLE_SAME]: "O título do chat é o mesmo.",

  // AI
  [AI_ERRORS.SUBSCRIPTION_REQUIRED]:
    "Assinatura necessária para usar este recurso.",

  // Stripe
  [STRIPE_ERRORS.STRIPE_PRODUCTS_FETCH_FAILED]: "Falha ao buscar produtos.",
  [STRIPE_ERRORS.STRIPE_CUSTOMERS_FETCH_FAILED]: "Falha ao buscar clientes.",
  [STRIPE_ERRORS.STRIPE_CUSTOMER_NOT_FOUND]: "Cliente não encontrado.",
  [STRIPE_ERRORS.STRIPE_CUSTOMER_ALREADY_EXISTS]: "Cliente já existe.",
  [STRIPE_ERRORS.STRIPE_CUSTOMER_CREATE_FAILED]: "Falha ao criar cliente.",
  [STRIPE_ERRORS.STRIPE_INVALID_SUBSCRIPTION_REQUEST]:
    "Solicitação de assinatura inválida.",
  [STRIPE_ERRORS.STRIPE_SUBSCRIPTION_CREATE_FAILED]:
    "Falha ao criar assinatura.",
  [STRIPE_ERRORS.STRIPE_INVALID_PAYMENT_METHOD]:
    "Método de pagamento inválido.",
  [STRIPE_ERRORS.STRIPE_INVALID_CUSTOMER_DATA]: "Dados do cliente inválidos.",
  [STRIPE_ERRORS.STRIPE_PAYMENT_METHOD_ATTACH_FAILED]:
    "Falha ao anexar método de pagamento.",
  [STRIPE_ERRORS.STRIPE_INVALID_PRICE_ID]: "ID de preço inválido.",
  [STRIPE_ERRORS.STRIPE_PAYMENT_LINK_CREATE_FAILED]:
    "Falha ao criar link de pagamento.",
};
