# Claude Tools - Kraus E-commerce API

Este documento define as ferramentas (tools) que o Claude pode usar para interagir com a plataforma Kraus E-commerce em tempo real.

## Base URL
```
http://localhost:3000/api
```

---

## 1. Gestao de Estoque

### consultar_estoque
Consulta o estoque de produtos.

**Endpoint:** `GET /api/estoque`

**Parametros:**
- `sku` (opcional): SKU especifico do produto
- `localizacao` (opcional): `sao_jose` ou `sao_paulo`
- `estoque_baixo` (opcional): `true` para listar produtos com menos de 10 unidades

**Exemplos de uso:**
```
"Quanto tenho de estoque do F-14?" → GET /api/estoque?sku=MIN001
"Quais produtos estao com estoque baixo?" → GET /api/estoque?estoque_baixo=true
"Quanto tenho em Sao Jose?" → GET /api/estoque?localizacao=sao_jose
```

### registrar_movimentacao_estoque
Registra entrada, saida ou transferencia de produtos.

**Endpoint:** `POST /api/estoque`

**Body:**
```json
{
  "acao": "entrada" | "saida" | "transferencia",
  "sku": "MIN001",
  "quantidade": 10,
  "localizacao": "sao_jose" | "sao_paulo",
  "destino": "sao_jose" | "sao_paulo" // apenas para transferencia
}
```

**Exemplos de uso:**
```
"Chegou 50 drones DJI em SP" → POST /api/estoque
  { "acao": "entrada", "sku": "DRN001", "quantidade": 50, "localizacao": "sao_paulo" }

"Vendi 1 miniatura F-14 em SJ" → POST /api/estoque
  { "acao": "saida", "sku": "MIN001", "quantidade": 1, "localizacao": "sao_jose" }

"Transfere 10 F-14 de SJ para SP" → POST /api/estoque
  { "acao": "transferencia", "sku": "MIN001", "quantidade": 10, "localizacao": "sao_jose", "destino": "sao_paulo" }
```

---

## 2. Gestao Financeira

### consultar_financeiro
Consulta dados financeiros e transacoes.

**Endpoint:** `GET /api/financeiro`

**Parametros:**
- `resumo` (opcional): `true` para resumo consolidado
- `empresa` (opcional): `continental`, `topo_minas` ou `kraus_digital`
- `tipo` (opcional): `receita` ou `despesa`

**Exemplos de uso:**
```
"Qual foi o faturamento da Continental?" → GET /api/financeiro?resumo=true&empresa=continental
"Me mostra o resumo financeiro" → GET /api/financeiro?resumo=true
"Lista as ultimas receitas" → GET /api/financeiro?tipo=receita
```

### registrar_transacao
Registra receita ou despesa.

**Endpoint:** `POST /api/financeiro`

**Body:**
```json
{
  "tipo": "receita" | "despesa",
  "descricao": "Venda ML #123456",
  "valor": 2139,
  "empresa": "Continental Imports",
  "categoria": "vendas" // opcional
}
```

**Exemplos de uso:**
```
"Registra que recebi R$15.000 da venda de drones" → POST /api/financeiro
  { "tipo": "receita", "descricao": "Venda lote drones", "valor": 15000, "empresa": "Continental Imports" }

"Anota uma despesa de R$500 de frete" → POST /api/financeiro
  { "tipo": "despesa", "descricao": "Frete Correios", "valor": 500, "empresa": "Continental Imports", "categoria": "logistica" }
```

---

## 3. Criacao de Anuncios

### gerar_anuncio
Gera anuncio automaticamente com titulo e descricao otimizados.

**Endpoint:** `POST /api/anuncios`

**Body:**
```json
{
  "acao": "gerar",
  "sku": "MIN001",
  "preco": 159, // opcional - usa preco sugerido se nao informado
  "margem": 30, // opcional - calcula preco baseado na margem
  "marketplace": ["mercado_livre", "shopee"], // opcional
  "titulo_custom": "...", // opcional
  "descricao_custom": "..." // opcional
}
```

**Exemplos de uso:**
```
"Cria um anuncio para o F-14" → POST /api/anuncios
  { "acao": "gerar", "sku": "MIN001" }

"Cria anuncio do drone com margem de 35%" → POST /api/anuncios
  { "acao": "gerar", "sku": "DRN001", "margem": 35 }

"Gera anuncio da camera por R$199" → POST /api/anuncios
  { "acao": "gerar", "sku": "CAM001", "preco": 199 }
```

### publicar_anuncio
Publica um anuncio nos marketplaces.

**Endpoint:** `POST /api/anuncios`

**Body:**
```json
{
  "acao": "publicar",
  "anuncio_id": "123456789"
}
```

### listar_anuncios
Lista anuncios existentes.

**Endpoint:** `GET /api/anuncios`

**Parametros:**
- `status` (opcional): `rascunho`, `publicado` ou `pausado`
- `marketplace` (opcional): `mercado_livre` ou `shopee`

---

## 4. Catalogo de Produtos

### consultar_produtos
Consulta catalogo de produtos.

**Endpoint:** `GET /api/produtos`

**Parametros:**
- `sku` (opcional): SKU especifico
- `categoria` (opcional): `drones`, `miniaturas`, `cameras`, `acessorios`, `brinquedos`, `eletronicos`
- `busca` (opcional): termo de busca por nome ou SKU

**Exemplos de uso:**
```
"Me fala sobre o produto MIN001" → GET /api/produtos?sku=MIN001
"Lista todas as miniaturas" → GET /api/produtos?categoria=miniaturas
"Busca produtos com 'drone'" → GET /api/produtos?busca=drone
```

### cadastrar_produto
Cadastra novo produto no catalogo.

**Endpoint:** `POST /api/produtos`

**Body:**
```json
{
  "sku": "NEW001",
  "nome": "Novo Produto",
  "categoria": "eletronicos",
  "custo": 50,
  "preco_sugerido": 99, // opcional - calcula 50% margem se nao informado
  "peso": 200, // gramas
  "dimensoes": "10x10x5 cm",
  "origem": "China",
  "ncm": "8529.90.11"
}
```

---

## SKUs Disponiveis

| SKU | Produto | Categoria |
|-----|---------|-----------|
| DRN001 | Drone DJI Mini SE | drones |
| DRN002 | Controle Drone Universal | acessorios |
| DRN003 | Bateria Extra Drone | acessorios |
| MIN001 | F-14 Tomcat Miniatura 1:72 | miniaturas |
| MIN002 | Boeing 747 Air France 1:400 | miniaturas |
| MIN003 | Miniatura Jetski Yamaha | miniaturas |
| CAM001 | Camera IP WiFi 360 | cameras |
| CAM002 | Exaustor Camera Filmagem | acessorios |
| BRQ001 | Lego Technic Aviao | brinquedos |
| VNT001 | Ventilador USB Portatil | eletronicos |

---

## Exemplos de Conversas Naturais → API Calls

### Estoque
| Comando Natural | API Call |
|-----------------|----------|
| "Chegou 30 ventiladores em SP" | POST /api/estoque `{"acao":"entrada","sku":"VNT001","quantidade":30,"localizacao":"sao_paulo"}` |
| "Quanto tenho de miniatura F-14?" | GET /api/estoque?sku=MIN001 |
| "Produtos com estoque baixo" | GET /api/estoque?estoque_baixo=true |
| "Valor total em Sao Jose" | GET /api/estoque?localizacao=sao_jose |

### Financeiro
| Comando Natural | API Call |
|-----------------|----------|
| "Faturamento da Continental" | GET /api/financeiro?resumo=true&empresa=continental |
| "Registra venda de R$2000" | POST /api/financeiro `{"tipo":"receita","descricao":"Venda","valor":2000,"empresa":"Continental Imports"}` |
| "Resumo financeiro geral" | GET /api/financeiro?resumo=true |

### Anuncios
| Comando Natural | API Call |
|-----------------|----------|
| "Cria anuncio do F-14" | POST /api/anuncios `{"acao":"gerar","sku":"MIN001"}` |
| "Anuncio do drone com 40% margem" | POST /api/anuncios `{"acao":"gerar","sku":"DRN001","margem":40}` |
| "Lista anuncios publicados" | GET /api/anuncios?status=publicado |

---

## Configuracao no Claude

Para usar estas APIs como tools no Claude, configure com MCP (Model Context Protocol) ou use function calling direto. Exemplo de tool definition:

```json
{
  "name": "registrar_entrada_estoque",
  "description": "Registra entrada de produtos no estoque. Use quando o usuario mencionar que chegou mercadoria, recebeu produtos, ou precisa dar entrada no estoque.",
  "input_schema": {
    "type": "object",
    "properties": {
      "sku": {
        "type": "string",
        "description": "Codigo SKU do produto (ex: DRN001, MIN001)"
      },
      "quantidade": {
        "type": "number",
        "description": "Quantidade de unidades"
      },
      "localizacao": {
        "type": "string",
        "enum": ["sao_jose", "sao_paulo"],
        "description": "Local do deposito"
      }
    },
    "required": ["sku", "quantidade", "localizacao"]
  }
}
```

---

## Testando as APIs

```bash
# Consultar estoque
curl http://localhost:3000/api/estoque

# Registrar entrada
curl -X POST http://localhost:3000/api/estoque \
  -H "Content-Type: application/json" \
  -d '{"acao":"entrada","sku":"VNT001","quantidade":30,"localizacao":"sao_paulo"}'

# Consultar financeiro
curl http://localhost:3000/api/financeiro?resumo=true

# Gerar anuncio
curl -X POST http://localhost:3000/api/anuncios \
  -H "Content-Type: application/json" \
  -d '{"acao":"gerar","sku":"MIN001","margem":30}'
```
