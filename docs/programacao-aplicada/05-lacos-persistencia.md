# Laços + Persistência + Tabelas

## Roteiro

1. Por que laços de repetição?
2. Loop `for` — repetição sobre sequências
3. Loop `while` — repetição condicional
4. `break` e `continue`
5. JSON: salvar e carregar dados
6. Streamlit: `st.dataframe`, `st.table`, `st.metric` com delta
7. Exercícios: tubulação, caldeira, combustível, autenticação
8. **Mini-projeto:** Dashboard de Sensores

## Por que laços de repetição?

Na aula 04 você aprendeu a armazenar coleções de dados em listas, dicionários e conjuntos. Mas como **processar** cada elemento dessas coleções sem escrever o mesmo código 50 vezes?

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

### `for` no contexto Streamlit

```python
import streamlit as st

st.title("Monitor de Sensores")

sensores = ["PT-01", "PT-02", "PT-03"]
leituras = [150.0, 162.5, 148.3]

for nome, valor in zip(sensores, leituras):
    if valor > 160:
        st.warning(f"{nome}: {valor} °C — acima do limite!")
    else:
        st.success(f"{nome}: {valor} °C — normal")
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

## Manipulação de Arquivos — JSON

JSON (JavaScript Object Notation) é um formato de texto leve para armazenar e trocar dados. É ideal para **persistir dados entre execuções** do programa.

```python
import json

# Salvar dicionário em arquivo JSON
dados = {
    "ensaio": "Tração - Lote 42",
    "material": "Aço 1020",
    "leituras": [350.0, 355.2, 348.7, 352.1],
    "data": "2026-07-01"
}

with open("ensaio_42.json", "w") as f:
    json.dump(dados, f, indent=4)

# Carregar de volta
with open("ensaio_42.json", "r") as f:
    dados_carregados = json.load(f)

print(dados_carregados["material"])   # Aço 1020
print(dados_carregados["leituras"])   # [350.0, 355.2, 348.7, 352.1]
```

> `with open(...) as f:` garante que o arquivo é fechado automaticamente, mesmo se ocorrer um erro.

### Caso de uso: persistir catálogo de materiais

```python
import json
import os

CATALOGO_FILE = "catalogo.json"

def carregar_catalogo():
    if os.path.exists(CATALOGO_FILE):
        with open(CATALOGO_FILE, "r") as f:
            return json.load(f)
    return {}

def salvar_catalogo(catalogo):
    with open(CATALOGO_FILE, "w") as f:
        json.dump(catalogo, f, indent=4)
```

## Streamlit — `st.dataframe` e `st.table`

### `st.dataframe` — tabela interativa

Exibe dados em uma tabela ordenável, com scroll e redimensionamento:

```python
import streamlit as st
import pandas as pd

dados = {
    "Sensor": ["PT-01", "PT-02", "PT-03"],
    "Temperatura (°C)": [150.0, 162.5, 148.3],
    "Pressão (bar)": [5.2, 5.8, 4.9]
}
df = pd.DataFrame(dados)

st.dataframe(df)              # interativa
st.dataframe(df, height=200)  # com altura fixa
```

### `st.table` — tabela estática

```python
st.table(df)   # estática, sem ordenação
```

### `st.metric` com delta

```python
st.metric("Temp. máxima", "162.5 °C", "+2.3 °C")     # delta positivo (verde)
st.metric("Pressão média", "5.3 bar", "-0.1 bar")    # delta negativo (vermelho)
st.metric("Sensores ativos", "8", "1 offline")       # delta personalizado
```

### Criando DataFrames a partir de listas

```python
import streamlit as st
import pandas as pd

sensores = ["PT-01", "PT-02", "PT-03"]
leituras = [150.0, 162.5, 148.3]

# Usando zip para combinar listas
dados = {"Sensor": sensores, "Temperatura (°C)": leituras}
df = pd.DataFrame(dados)

st.dataframe(df)
```

---

## Exercício 5.1 — Tubulação com Sensores

**Contexto:** Uma tubulação industrial de 300 metros possui sensores de temperatura instalados a cada 3 metros, começando na posição 0 m. O engenheiro de instrumentação precisa gerar a lista completa de posições dos sensores e analisar as leituras dos primeiros e últimos sensores.

**O que o app deve ter:**
- Gerar a lista de posições usando `range(0, 301, 3)`
- Exibir a quantidade total de sensores
- Exibir os 10 primeiros sensores (usando slicing)
- Exibir os 10 últimos sensores (usando slicing)
- Simular leituras aleatórias entre 140 e 170 °C para cada sensor e exibir a média

**Dica:** use `import random` e `random.uniform(140, 170)` para gerar leituras simuladas.

## Exercício 5.2 — Simulação de Caldeira

**Contexto:** Uma caldeira industrial aquece de 25 °C até atingir a temperatura de operação de 100 °C. A taxa de aquecimento é de 2,5 °C por minuto. O engenheiro de processos quer simular o aquecimento e registrar quanto tempo leva para atingir a temperatura alvo.

**O que o app deve ter:**
- Campo de entrada para temperatura inicial (°C) e temperatura alvo (°C)
- Campo de entrada para taxa de aquecimento (°C/min)
- Botão "Simular aquecimento"
- Exibição de cada etapa do aquecimento (use um loop `for` com `range` baseado no número de etapas)
- Resultado final: tempo total para atingir a temperatura alvo

**Valores de teste:** `T_inicial = 25 °C`, `T_alvo = 100 °C`, `taxa = 2.5 °C/min` → 30 etapas

## Exercício 5.3 — Custo de Combustível da Frota

**Contexto:** O departamento de logística de uma empresa quer calcular o custo mensal de combustível de sua frota de veículos. Cada veículo tem um consumo médio (km/L) e percorre uma distância mensal diferente. O gestor quer saber o custo individual de cada veículo e o custo total da frota.

**O que o app deve ter:**
- Um dicionário com pelo menos 3 veículos, cada um com: nome, consumo (km/L), distância mensal (km)
- Campo de entrada para o preço do combustível (R$/L)
- Botão "Calcular custos"
- Para cada veículo: litros consumidos e custo mensal
- Custo total da frota

**Valores de teste:**
- Veículo 1: Caminhão A, 6 km/L, 3000 km/mês
- Veículo 2: Van B, 9 km/L, 2000 km/mês
- Veículo 3: Carro C, 12 km/L, 1500 km/mês
- Preço: R$ 5,50/L

## Exercício 5.4 — Autenticação PIN Técnico

**Contexto:** Uma célula robotizada de soldagem exige que o técnico insira um PIN de 6 dígitos para iniciar o programa. O sistema permite no máximo 3 tentativas. Após 3 falhas, o acesso é bloqueado.

**O que o app deve ter:**
- Campo de entrada para o PIN (use `st.text_input` com `type="password"`)
- Botão "Tentar acesso"
- Contador de tentativas restantes
- Se o PIN estiver correto (`"123456"`): mensagem de sucesso
- Se o PIN estiver errado: mensagem de erro com tentativas restantes
- Se esgotar as tentativas: mensagem de bloqueio

**Dica:** use `st.session_state` para manter o contador de tentativas entre execuções do script.

**Valores de teste:**
- PIN correto: `123456` → Acesso autorizado
- PIN errado 3 vezes → Acesso bloqueado

## Exercício 5.5 — Controle de Estoque com JSON

**Contexto:** O almoxarifado da empresa precisa de um sistema simples para controlar o estoque de itens de consumo (EPIs, ferramentas, materiais). Os dados devem ser persistidos em JSON para não se perderem entre execuções.

**O que o app deve ter:**
- Funções `carregar_estoque()` e `salvar_estoque(estoque)` usando JSON
- Campo para nome do item e quantidade
- Botão "Cadastrar item" — adiciona ao estoque (ou soma se já existir)
- Botão "Consultar estoque" — exibe todos os itens
- Campo para nome do item e quantidade a retirar
- Botão "Retirar item" — subtrai do estoque (validar se há saldo suficiente)
- Exibição do estoque atual usando `st.dataframe`

**Dica:** o estoque pode ser um dicionário `{"item": quantidade}`.

## Mini-Projeto — Dashboard de Sensores

**Contexto:** O engenheiro de manutenção quer um dashboard que monitore 10 sensores de temperatura e pressão em tempo real. Como não há sensores reais conectados, os dados são simulados. O dashboard deve permitir gerar novas leituras, visualizar os dados em tabela e alertar quando algum sensor ultrapassar os limites.

**O que o app deve ter:**
- 10 sensores de temperatura (faixa normal: 140-170 °C, limite: 180 °C)
- 10 sensores de pressão (faixa normal: 4.5-6.0 bar, limite: 7.0 bar)
- Botão "Gerar leituras" que simula novos valores para todos os sensores
- Tabela interativa (`st.dataframe`) com: sensor, temperatura, pressão
- Métricas destacadas: temperatura média, pressão média, sensores em alerta
- Alertas (`st.warning`/`st.error`) para sensores acima do limite
- Botão "Salvar dados" que exporta as leituras atuais para JSON

**Dica:** use `import random` e `random.uniform(min, max)` para gerar valores. Para simular falhas, ocasionalmente gere valores fora da faixa normal.

## Referências

- **Python.org — Controle de fluxo** — https://docs.python.org/pt-br/3/tutorial/controlflow.html
- **Python.org — JSON** — https://docs.python.org/pt-br/3/library/json.html
- **Streamlit Docs — Data display** — https://docs.streamlit.io/develop/api-reference/data
- **Tavares Neto, R. F.; Silva, F. M.** Introdução à programação para engenharia. LTC, 2022.
