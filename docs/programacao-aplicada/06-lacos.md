# Laços de Repetição

## Roteiro

1. Por que laços de repetição?
2. Loop `for` — repetição sobre sequências
3. Loop `while` — repetição condicional
4. `break` e `continue`
5. Exercícios
6. **Mini-projeto:** Registro e Consolidação de Movimentações

## Por que laços de repetição?

Na aula anterior você aprendeu a armazenar coleções de dados em listas, dicionários e conjuntos. Mas como **processar** cada elemento dessas coleções sem escrever o mesmo código 50 vezes?

```python
# Sem laço — repetir manualmente
print(f"Sensor 1: {leituras[0]} °C")
print(f"Sensor 2: {leituras[1]} °C")
print(f"Sensor 3: {leituras[2]} °C")
# ... e se forem 100 sensores?
```

**Laços de repetição** permitem executar um bloco de código múltiplas vezes, uma para cada elemento de uma sequência (ou enquanto uma condição for verdadeira).

## Loop `for` — repetição sobre sequências

O `for` percorre cada elemento de uma sequência (lista, tupla, string, etc.):

```python
sensores = ["PT-01", "PT-02", "PT-03", "PT-04", "PT-05"]

for sensor in sensores:
    print(f"Lendo {sensor}...")
```

Saída:
```
Lendo PT-01...
Lendo PT-02...
Lendo PT-03...
Lendo PT-04...
Lendo PT-05...
```

### `for` com `enumerate()` — índice + valor

```python
leituras = [150.0, 162.5, 148.3, 155.7]

for i, valor in enumerate(leituras, start=1):
    print(f"Leitura {i}: {valor} °C")
```

### `for` com `range()` — repetir N vezes

Quando você precisa de um contador numérico:

```python
# Contar de 0 a 4
for i in range(5):
    print(f"Ensaio {i+1}")

# Contar de 10 a 18, pulando de 2 em 2
for i in range(10, 20, 2):
    print(i)   # 10, 12, 14, 16, 18

# Contar de trás para frente
for i in range(5, 0, -1):
    print(f"Contagem regressiva: {i}")
```

### `for` com dicionários

```python
material = {"nome": "Aço 1020", "densidade": 7850, "E": 210_000}

for chave in material:
    print(f"{chave}: {material[chave]}")

# Ou, mais limpo:
for chave, valor in material.items():
    print(f"{chave}: {valor}")
```

### `for` no contexto de monitoramento

```python
sensores = ["PT-01", "PT-02", "PT-03"]
leituras = [150.0, 162.5, 148.3]

for nome, valor in zip(sensores, leituras):
    if valor > 160:
        print(f"{nome}: {valor} °C — acima do limite!")
    else:
        print(f"{nome}: {valor} °C — normal")
```

## Loop `while` — repetição condicional

O `while` repete enquanto uma condição for `True`. Use quando **não sabe de antemão** quantas iterações serão necessárias.

```python
temperatura = 25.0

while temperatura < 100:
    temperatura += 2.5
    print(f"Temperatura: {temperatura:.1f} °C")
```

### Exemplo de engenharia: simulação de aquecimento

```python
import time

temperatura = 25.0
tempo = 0

while temperatura < 100:
    temperatura += 1.5
    tempo += 1
    print(f"t = {tempo} min | T = {temperatura:.1f} °C")

print(f"Atingiu 100 °C em {tempo} minutos.")
```

> **Atenção:** a condição do `while` deve se tornar `False` em algum momento, senão o loop é infinito. No exemplo acima, `temperatura` cresce a cada iteração, garantindo que eventualmente ultrapasse 100.

### `while` com entrada do usuário

```python
senha = ""
while senha != "1234":
    senha = input("Digite a senha: ")
print("Acesso autorizado.")
```

## `break` e `continue`

### `break` — interrompe o loop imediatamente

```python
# Buscar sensor com falha
sensores = [150.0, 162.5, 999.9, 155.7, 148.3]

for i, valor in enumerate(sensores, start=1):
    if valor > 500:
        print(f"Sensor {i} com falha! Leitura anômala: {valor}")
        break
    print(f"Sensor {i}: {valor} °C — OK")
```

Saída:
```
Sensor 1: 150.0 °C — OK
Sensor 2: 162.5 °C — OK
Sensor 3 com falha! Leitura anômala: 999.9
```

### `continue` — pula para a próxima iteração

```python
# Pular leituras inválidas (negativas ou zero)
leituras = [25.0, -1.0, 30.5, 0.0, 28.3, -5.0, 31.0]

validas = []
for valor in leituras:
    if valor <= 0:
        continue   # pula esta iteração
    validas.append(valor)

print(f"Leituras válidas: {validas}")
print(f"Média: {sum(validas)/len(validas):.2f} °C")
```

### Comparação rápida

| Comando | Efeito | Analogia |
|---|---|---|
| (nenhum) | Continua normalmente | Seguir na fila |
| `continue` | Pula o resto, vai para próxima iteração | Pular a vez |
| `break` | Sai do loop completamente | Sair da fila |

---

## Exercício 6.1 — Tubulação com Sensores

**Contexto:** Uma tubulação industrial de 300 metros possui sensores de temperatura instalados a cada 3 metros, começando na posição 0 m. O engenheiro de instrumentação precisa gerar a lista completa de posições dos sensores e analisar as leituras.

**O que o programa deve ter:**
- Gerar a lista de posições usando `range(0, 301, 3)`
- Exibir a quantidade total de sensores
- Exibir os 10 primeiros sensores (usando slicing)
- Exibir os 10 últimos sensores (usando slicing)
- Simular leituras aleatórias entre 140 e 170 °C para cada sensor e exibir a média

**Dica:** use `import random` e `random.uniform(140, 170)` para gerar leituras simuladas.

## Exercício 6.2 — Autenticação PIN Técnico

**Contexto:** Uma célula robotizada de soldagem exige que o técnico insira um PIN de 6 dígitos para iniciar o programa. O sistema permite no máximo 3 tentativas. Após 3 falhas, o acesso é bloqueado.

**O que o programa deve ter:**
- Campo de entrada para o PIN com `input("Digite o PIN: ")`
- Contador de tentativas restantes
- Se o PIN estiver correto (`"123456"`): mensagem de sucesso
- Se o PIN estiver errado: mensagem de erro com tentativas restantes
- Se esgotar as tentativas: mensagem de bloqueio

**Dica:** use um loop `while` com contador `tentativas` para controlar as no máximo 3 tentativas.

**Valores de teste:**
- PIN correto: `123456` → Acesso autorizado
- PIN errado 3 vezes → Acesso bloqueado

> **Desafios opcionais:** pratique mais com os exercícios a seguir:
> - **Simulação de Caldeira** — use `for` com `range` para simular aquecimento etapa por etapa
> - **Custo de Combustível da Frota** — itere sobre dicionário de veículos e calcule custos individuais

---

## Exercício 6.3 — Diagnóstico do Turno de Produção

**Contexto:** Uma célula de usinagem possui 5 máquinas CNC. Ao final de cada turno, o sistema registra a lista de tempos de ciclo (min) de cada peça produzida por máquina. O engenheiro de produção precisa analisar o desempenho do turno **como um todo**, detectando as máquinas com tempo médio elevado e as peças que excederam o tempo padrão de ciclo.

**Dados de entrada** (use este dicionário):

```python
maquinas = {
    "CNC-01": [11.8, 12.5, 13.1, 11.9, 14.0, 12.2],
    "CNC-02": [12.3, 12.1, 15.4, 18.9, 12.0, 13.6, 12.4],
    "CNC-03": [11.6, 11.9, 12.4, 11.8, 12.1],
    "CNC-04": [13.8, 14.2, 12.9, 16.7, 15.8],
    "CNC-05": [12.0, 12.2, 12.1, 11.9, 12.3, 12.2, 12.4],
}
```

Ciclo padrão de projeto: **12.0 min** — qualquer peça acima disso é um atraso.

**O que o programa deve ter:**
- Loop sobre `maquinas.items()`; para cada máquina, um **loop interno** percorre a lista de tempos
- Para cada máquina: quantidade de peças, tempo médio (1 casa decimal) e número de peças acima de 12.0 min
- Exibir o relatório em tabela alinhada com `Nome`, `Peças`, `Média (min)` e `Alertas`
- Ao final: a máquina com **pior média**, a máquina com **mais alertas** e o **tempo médio geral** de todas as peças
- Usar acumuladores (`soma`, `total_peças`, etc.) e as funções `max()` / `min()`

**Dica:** aninhe os laços — o `for` externo percorre os pares `(maquina, tempos)` e o interno percorre `tempos`. Para tabela alinhada, use por exemplo `print(f"{maquina:<7}{n_pecas:>5}{media:>10.1f}{alertas:>8}")`.

**Valores de teste:**
- CNC-02 → 6 das 7 peças acima do padrão (mais alertas)
- Média geral ≈ 13.0 min
- Pior média: CNC-04 (≈ 14.7 min)

## Exercício 6.4 — Faturamento do Mês por Cliente

**Contexto:** O almoxarifado de uma metalúrgica registra as vendas de peças como uma **lista de pedidos**, em que cada pedido é um dicionário com cliente, peça, quantidade e preço unitário. O gerente precisa saber quem são os maiores compradores do mês — ou seja, **agrupar muitos pedidos em um resumo por cliente**, prática comum em qualquer sistema de gestão.

**Dados de entrada** (use esta lista):

```python
pedidos = [
    {"cliente": "Auto Peças LTDA", "peca": "Eixo A36",   "qtd": 40,  "preco": 120.0},
    {"cliente": "Fabricante XYZ",  "peca": "Flange",     "qtd": 12,  "preco": 480.0},
    {"cliente": "Ind. Rodrigues",  "peca": "Flange",     "qtd": 25,  "preco": 480.0},
    {"cliente": "Auto Peças LTDA", "peca": "Bucha",      "qtd": 80,  "preco": 25.0},
    {"cliente": "Fabricante XYZ",  "peca": "Eixo A36",   "qtd": 60,  "preco": 120.0},
    {"cliente": "Tornearia Alfa",  "peca": "Pino",       "qtd": 200, "preco": 18.0},
    {"cliente": "Ind. Rodrigues",  "peca": "Engrenagem", "qtd": 8,   "preco": 1500.0},
    {"cliente": "Metalúrgica Sul", "peca": "Flange",     "qtd": 30,  "preco": 480.0},
    {"cliente": "Usinagem Norte",  "peca": "Bucha",      "qtd": 50,  "preco": 25.0},
    {"cliente": "Tornearia Alfa",  "peca": "Eixo A36",   "qtd": 90,  "preco": 120.0},
    {"cliente": "Auto Peças LTDA", "peca": "Engrenagem", "qtd": 5,   "preco": 1500.0},
    {"cliente": "Metalúrgica Sul", "peca": "Eixo A36",   "qtd": 110, "preco": 120.0},
    #{+2 pedidos por cliente}
    {"cliente": "Auto Peças LTDA",  "peca": "Bucha",     "qtd": 60,  "preco": 25.0},
    {"cliente": "Auto Peças LTDA",  "peca": "Pino",      "qtd": 100, "preco": 18.0},
    {"cliente": "Fabricante XYZ",   "peca": "Engrenagem","qtd": 10,  "preco": 1500.0},
    {"cliente": "Fabricante XYZ",   "peca": "Pino",      "qtd": 150, "preco": 18.0},
    {"cliente": "Ind. Rodrigues",   "peca": "Eixo A36",  "qtd": 70,  "preco": 120.0},
    {"cliente": "Ind. Rodrigues",   "peca": "Pino",      "qtd": 120, "preco": 18.0},
    {"cliente": "Tornearia Alfa",   "peca": "Flange",    "qtd": 20,  "preco": 480.0},
    {"cliente": "Tornearia Alfa",   "peca": "Bucha",     "qtd": 90,  "preco": 25.0},
    {"cliente": "Metalúrgica Sul",  "peca": "Engrenagem","qtd": 15,  "preco": 1500.0},
    {"cliente": "Metalúrgica Sul",  "peca": "Pino",      "qtd": 80,  "preco": 18.0},
    {"cliente": "Usinagem Norte",   "peca": "Flange",    "qtd": 10,  "preco": 480.0},
    {"cliente": "Usinagem Norte",   "peca": "Eixo A36",  "qtd": 45,  "preco": 120.0},
]
```

**O que o programa deve ter:**
- Loop que percorre `pedidos` e agrega tudo em um dicionário-resumo:
  `{cliente: {"pedidos": n, "total": R$}}`
- Cálculo do valor de cada pedido: `qtd * preco`
- Exibir resumo por cliente: quantidade de pedidos e valor total (R$)
- Identificar e exibir o **maior cliente** (maior valor total) e o cliente com **mais pedidos**
- Exibir o **ranking dos 3 maiores clientes** usando `sorted()` com `key=lambda`

**Dica:** para não sobrescrever o acumulador ao encontrarmos um cliente pela primeira vez, use `resumo.get(cliente, ...)` ou inicialize o cliente antes de somar. Ex.: `resumo[cliente] = resumo.get(cliente, {"pedidos": 0, "total": 0.0})`.

**Valores de teste:**
- Total: 24 pedidos, 6 clientes
- Metalúrgica Sul → R$ 51 540,00 (maior cliente) · Ind. Rodrigues → R$ 34 560,00 · Fabricante XYZ → R$ 30 660,00 · Tornearia Alfa → R$ 26 250,00 · Auto Peças LTDA → 5 pedidos (mais pedidos) · Usinagem Norte → R$ 11 450,00
- Ranking: 1º Metalúrgica Sul, 2º Ind. Rodrigues, 3º Fabricante XYZ

## Mini-Projeto — Registro e Consolidação de Movimentações

**Contexto:** O almoxarifado de uma empresa não possui sistema eletrônico de controle de estoque: cada chegada ou saída de item é anotada manualmente em papel. Você vai desenvolver um programa que **cria** esse registro, permitindo cadastrar cada movimentação, e que **organiza** os dados digitados em um relatório consolidado — a base de qualquer sistema de gestão.

**Cadastro das movimentações (criação dos dados):**

O programa deve:

- Solicitar, em repetição, o cadastro de movimentações, uma por vez.
- Cada movimentação é composta por:
  - **descrição** do item (texto);
  - **categoria** do item (texto, ex.: "ferramentas", "fixadores", "EPI");
  - **tipo de movimento** — `"entrada"` (item chegou) ou `"saída"` (item saiu);
  - **quantidade** (número inteiro maior que zero);
  - **valor unitário** (R$).
- Repetir enquanto o usuário quiser; o cadastro termina quando ele digitar `"fim"` na descrição.
- **Rejeitar** cadastros inválidos e pedir novamente: o `"fim"` não pode ocorrer nos outros campos, quantidade negativa ou não numérica não é aceita, e o tipo de movimento só pode ser `"entrada"` ou `"saída"`.

**Consolidação dos dados (organização):**

Após encerrar o cadastro, o programa deve:

- Agrupar todas as movimentações por **categoria**.
- Para cada categoria, apresentar: a **quantidade de movimentos**, a **quantidade total de itens** e o **valor total movimentado** (quantidade × valor unitário, somado).
- Dentro de cada categoria, separar o total de **entradas** e de **saídas**, tanto em quantidade quanto em valor.

**Indicadores do relatório:**

- Categoria com o maior número de movimentos e categoria com o maior valor total movimentado;
- Item com o maior valor unitário registrado;
- **Saldo geral do estoque** (total de entradas − total de saídas), em quantidade e em valor;
- Percentual de participação de cada categoria no valor total do período.

**Formato da saída:**

- Relatório organizado e legível, com seções por categoria, subtotais por tipo de movimento, linha de totalização e os indicadores acima.

**Valores de teste:** cadastre os 5 itens abaixo e confira os resultados esperados.

| Descrição | Categoria | Tipo | Qtd | Valor unit. |
|---|---|---|---|---|
| Bucha | usinados | entrada | 40 | R$ 120,00 |
| Flange | usinados | entrada | 15 | R$ 480,00 |
| Parafuso M8 | fixadores | saída | 300 | R$ 1,50 |
| Parafuso M6 | fixadores | entrada | 200 | R$ 1,20 |
| Pino guia | usinados | saída | 8 | R$ 30,00 |

- **usinados:** 3 movimentos, valor total R$ 12 240,00 (maior categoria · ~94,7% do total)
- **fixadores:** 2 movimentos, valor total R$ 690,00 (~5,3%)
- Item de maior valor unitário: Flange (R$ 480,00)
- Saldo geral: quantidade **−53**; valor **R$ 11 550,00**

> **Desafio opcional:** além do agrupamento por categoria, calcule o **saldo individual por item** (entradas − saídas por descrição) e sinalize os itens com saldo negativo (estoque inconsistente).

## Resumo da aula

- `for` percorre cada elemento de uma sequência — ideal para processar coleções
- `for` com `range()` gera contadores numéricos: `range(início, fim, passo)`
- `enumerate()` percorre com índice e valor simultaneamente
- `while` repete enquanto uma condição for verdadeira — garanta que a condição se torne `False`
- `break` interrompe o loop; `continue` pula para a próxima iteração
- `zip()` combina duas ou mais listas em paralelo

## Referências

- **Python.org — Controle de fluxo** — https://docs.python.org/pt-br/3/tutorial/controlflow.html
- **Tavares Neto, R. F.; Silva, F. M.** Introdução à programação para engenharia. LTC, 2022.
