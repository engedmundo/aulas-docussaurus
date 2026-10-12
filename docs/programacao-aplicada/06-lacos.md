# Laços de Repetição

## Roteiro

1. Por que laços de repetição?
2. Loop `for` sobre sequências (`enumerate`, `range`, dicionários, `zip`)
3. Loop `while` condicional (+ entrada do usuário)
4. `break` e `continue`
5. Compreensão de listas
6. Funções dentro de laços
7. **Mini-projeto:** Registro e Consolidação de Movimentações

## Por que laços de repetição?

Na aula anterior você aprendeu a armazenar coleções de dados em listas, dicionários e conjuntos. Mas como **processar** cada elemento dessas coleções sem escrever o mesmo código muitas vezes?

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

### Exercício 6.1 — Tocar playlist

**Contexto:** o app de música da aula 05 guarda a fila numa lista. Em vez de um `print()` por música, um `for` pode ser usado para tocar todas as músicas.

**Tarefa:** com `playlist = ["Bohemian Rhapsody", "Imagine", "Billie Jean"]` (valores fixos), escreva um `for` que exiba `Tocando: ...` para cada música. Crie uma função para exibir cada linha. Depois adicione uma quarta música à lista e execute de novo — repare que o laço se adapta sozinho.

**Saída esperada (3 músicas):**
```
Tocando: Bohemian Rhapsody
Tocando: Imagine
Tocando: Billie Jean
```

### `for` com `enumerate()` — índice + valor

```python
leituras = [150.0, 162.5, 148.3, 155.7]

for i, valor in enumerate(leituras, start=1):
    print(f"Leitura {i}: {valor} °C")
```

### Exercício 6.2 — Cardápio numerado

**Contexto:** um restaurante quer imprimir o cardápio do dia numerado a partir do 1.

**Tarefa:** com `cardapio = ["Pizza", "Lasanha", "Salada", "Suco"]` (valores fixos), use `for` + `enumerate(..., start=1)` para exibir `1. Pizza`, `2. Lasanha`, ...

**Saída esperada:**
```
1. Pizza
2. Lasanha
3. Salada
4. Suco
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

### Exercício 6.3 — Tubulação com Sensores

**Contexto:** Uma tubulação industrial de 300 metros possui sensores de temperatura instalados a cada 3 metros, começando na posição 0 m. O engenheiro de instrumentação precisa gerar a lista completa de posições dos sensores e analisar as leituras.

**O que o programa deve ter:**
- Gerar a lista de posições usando `range()`
- Exibir a quantidade total de sensores
- Exibir os 10 primeiros sensores
- Exibir os 10 últimos sensores
- Simular leituras aleatórias entre 140 e 170 °C para cada sensor e exibir a média


### `for` com dicionários

```python
material = {"nome": "Aço 1020", "densidade": 7850, "E": 210_000}

for chave in material:
    print(f"{chave}: {material[chave]}")

# Ou, mais limpo:
for chave, valor in material.items():
    print(f"{chave}: {valor}")
```

### `for` utilizando duas listas

```python
sensores = ["PT-01", "PT-02", "PT-03"]
leituras = [150.0, 162.5, 148.3]

for nome, valor in zip(sensores, leituras):
    if valor > 160:
        print(f"{nome}: {valor} °C — acima do limite!")
    else:
        print(f"{nome}: {valor} °C — normal")
```

### Exercício 6.4 — Catálogo com laço

**Contexto:** na aula 05 você exibiu o catálogo de materiais posição por posição. Agora refaça com laço — o mesmo código serve para 3 ou 300 materiais.

**Tarefa:** com a lista abaixo (valores fixos), use `for` + `enumerate(..., start=1)` para exibir cada material numerado com sua densidade. Utilize funções para criar cada linha do elemento mostrado.

```python
materiais = [
    {"nome": "Aço 1020", "densidade": 7850},
    {"nome": "Alumínio 6061", "densidade": 2700},
    {"nome": "Latão", "densidade": 8500},
]
```

**Saída esperada:**
```
1. Aço 1020 — 7850 kg/m³
2. Alumínio 6061 — 2700 kg/m³
3. Latão — 8500 kg/m³
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

### Exercício 6.5 — Encher o tanque

**Contexto:** o marcador de combustível mostra o nível em %. A cada minuto de abastecimento, o nível sobe 15 pontos, partindo de 20%.

**Tarefa:** com `nivel = 20` (valor fixo), escreva um `while` que some 15 ao nível e exiba `Nível: ...%` a cada passo, até atingir ou passar de 100%. Ao final, exiba `"Tanque cheio!"`.

**Saída esperada:** `35%, 50%, 65%, 80%, 95%, 110%` e `"Tanque cheio!"`.

### `while` com entrada do usuário

```python
senha = ""
while senha != "1234":
    senha = input("Digite a senha: ")
print("Acesso autorizado.")
```

### Exercício 6.6 — Autenticação PIN Técnico

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

### Exercício 6.7 — Filtrar e parar

**Contexto:** um monitor recebe leituras em sequência: valores `<= 0` são erro de sensor (pular) e qualquer valor acima de `100` é crítico (alertar e **parar** o monitoramento).

**Tarefa:** com `leituras = [22.5, -1.0, 23.1, 0.0, 105.0, 24.0]` (valores fixos), escreva um `for` que:
- pule (`continue`) valores `<= 0`
- ao encontrar valor `> 100`, exiba `CRÍTICO: ... — parando!` e interrompa (`break`)
- nos demais casos, exiba `Leitura OK: ...`

**Saída esperada:**
```
Leitura OK: 22.5
Leitura OK: 23.1
CRÍTICO: 105.0 — parando!
```

> Repare que o `24.0` nunca é processado — o `break` encerrou o laço antes.

## Compreensão de listas

Há um jeito de **criar listas filtrando e transformando em uma linha**. É a compreensão de listas (*list comprehension*) — o padrão "lista vazia + `for` + `append()`" condensado:

```python
leituras = [25.0, -1.0, 30.5, 0.0, 28.3]

# Forma com laço explícito
validas = []
for valor in leituras:
    if valor > 0:
        validas.append(valor)

# Forma equivalente em uma linha
validas = [valor for valor in leituras if valor > 0]
# Resultado: [25.0, 30.5, 28.3]
```

Leia como: "cada `valor` de `leituras`, **se** `valor > 0`". A condição é opcional — `[t + 273.15 for t in temperaturas_c]` só transforma.

### Exercício 6.8 — Filtro em uma linha

**Contexto:** reescreva o filtro do exemplo anterior sem laço explícito.

**Tarefa:** com `leituras = [22.5, -1.0, 23.1, 0.0, 24.0]` (valores fixos), crie `validas` com **uma** compreensão de listas (só valores `> 0`) e exiba a lista e a média com `sum()`/`len()`.

**Valores de teste:** `validas = [22.5, 23.1, 24.0]`, média `23.20`.

### Exercício 6.9 — Desconto aplicado em lote

**Contexto:** a função `preco_final(preco, desconto)` da aula 04 calcula o preço de **um** produto. Uma loja precisa aplicá-la à **lista inteira** de preços.

**Tarefa:**
1. Defina `preco_final(preco, desconto=0.0)` que retorna `preco × (1 − desconto)`
2. Com `precos = [100.0, 59.90, 250.0, 32.50]` (valores fixos), escreva um `for` que chame a função com desconto `0.10` para cada preço e exiba `De R$ ... por R$ ...`

**Valores de teste:** `100.00 → 90.00`; `59.90 → 53.91`; `250.00 → 225.00`; `32.50 → 29.25`

## Exercício 6.10 — Diagnóstico do Turno de Produção

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

## Exercício 6.11 — Faturamento do Mês por Cliente

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

## Resumo da aula

- `for` percorre cada elemento de uma sequência — ideal para processar coleções
- `for` com `range()` gera contadores numéricos: `range(início, fim, passo)`
- `enumerate()` percorre com índice e valor simultaneamente
- `for` com `.items()`/`zip()` percorre pares de valores
- `while` repete enquanto uma condição for verdadeira — garanta que a condição se torne `False`
- `break` interrompe o loop; `continue` pula para a próxima iteração
- Compreensão de listas cria listas filtrando/transformando em uma linha
- Defina a regra uma vez numa função e chame-a dentro do laço para cada elemento
- Acumuladores (`soma`, `total`) + laços agregam coleções em resumos

## Referências

- **Python.org — Controle de fluxo** — https://docs.python.org/pt-br/3/tutorial/controlflow.html
- **Tavares Neto, R. F.; Silva, F. M.** Introdução à programação para engenharia. LTC, 2022.
