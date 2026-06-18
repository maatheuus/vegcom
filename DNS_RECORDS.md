# Registros DNS para Descoberta de Agentes (DNS-AID)

Adicione os seguintes registros TXT ou SVCB/HTTPS ao seu DNS para permitir que agentes de IA descubram seu site programaticamente.

## Registros SVCB/HTTPS (Recomendado)

Se o seu provedor de DNS suportar registros do tipo `SVCB` ou `HTTPS` (como Cloudflare), adicione estes:

| Nome | Tipo | Valor |
|------|------|-------|
| `_index._agents.vegcom.life` | HTTPS | `1 . alpn="h2,h3" endpoint="www.vegcom.life" path="/.well-known/agent-skills/index.json"` |
| `_a2a._agents.vegcom.life` | HTTPS | `1 . alpn="h2,h3" endpoint="www.vegcom.life" path="/.well-known/api-catalog"` |

## Registros TXT (Alternativa)

Caso não suporte SVCB, você pode usar registros TXT para sinalizar a localização:

| Nome | Tipo | Valor |
|------|------|-------|
| `_agents.vegcom.life` | TXT | `v=dnsaid1; index=https://www.vegcom.life/.well-known/agent-skills/index.json; catalog=https://www.vegcom.life/.well-known/api-catalog` |

---

**Nota:** Certifique-se de que o DNSSEC esteja ativado em seu domínio para que os resolvedores possam validar a autenticidade desses dados.
