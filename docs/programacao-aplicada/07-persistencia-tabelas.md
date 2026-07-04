# Persistência + Tabelas

## Roteiro

1. Por que persistir dados?
2. JSON: salvar e carregar dados
3. CSV: formato tabular para dados de engenharia
4. Streamlit: `st.dataframe`, `st.table`, `st.metric` com delta
5. Exercícios
6. **Mini-projeto:** Dashboard de Sensores

## Por que persistir dados?

Até agora, todos os dados que seu programa criava desapareciam quando ele terminava de executar. **Persistência** é a capacidade de salvar dados entre execuções — essencial para aplicações reais de engenharia.

Nesta aula você aprenderá dois formatos de arquivo e como exibir dados tabulares em apps Streamlit.

## Manipulação de Arquivos — JSON

JSON (JavaScript Object Notation) é um formato de texto leve para armazenar e trocar dados.

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

### CSV — formato tabular para dados de engenharia

CSV (Comma-Separated Values) é o formato mais comum para dados tabulares em engenharia — ensaios de tração, leituras de sensores, dados de CEP. Python lê/escreve CSV sem instalar bibliotecas extras:

```python
import csv

# Escrever CSV
with open("dados_ensaio.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["amostra", "tensao_mpa", "deformacao"])
    writer.writerow(["CP-01", 250.0, 0.002])
    writer.writerow(["CP-02", 248.5, 0.0019])

# Ler CSV
with open("dados_ensaio.csv", "r") as f:
    reader = csv.DictReader(f)
    for linha in reader:
        print(linha)
```

> Com Pandas (aula 08), a leitura de CSV fica ainda mais simples: `pd.read_csv("arquivo.csv")`.

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

## Exercício 7.1 — Custo de Combustível da Frota

**Contexto:** O departamento de logística de uma empresa quer calcular o custo mensal de combustível de sua frota de veículos. Cada veículo tem um consumo médio (km/L) e percorre uma distância mensal diferente.

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

## Exercício 7.2 — Controle de Estoque com JSON

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

**Contexto:** O engenheiro de manutenção quer um dashboard que monitore 10 sensores de temperatura e pressão em tempo real. Como não há sensores reais conectados, os dados são simulados.

**O que o app deve ter:**
- 10 sensores de temperatura (faixa normal: 140-170 °C, limite: 180 °C)
- 10 sensores de pressão (faixa normal: 4.5-6.0 bar, limite: 7.0 bar)
- Botão "Gerar leituras" que simula novos valores para todos os sensores
- Tabela interativa (`st.dataframe`) com: sensor, temperatura, pressão
- Métricas destacadas: temperatura média, pressão média, sensores em alerta
- Alertas (`st.warning`/`st.error`) para sensores acima do limite
- Botão "Salvar dados" que exporta as leituras atuais para JSON

**Dica:** use `import random` e `random.uniform(min, max)` para gerar valores. Para simular falhas, ocasionalmente gere valores fora da faixa normal.

## Resumo da aula

- JSON (`json.dump` / `json.load`) persiste dados estruturados em arquivos legíveis
- CSV (`csv.writer` / `csv.DictReader`) é o formato padrão para dados tabulares de engenharia
- `with open(...) as f:` gerencia abertura e fechamento automático de arquivos
- `st.dataframe` exibe tabelas interativas (ordenáveis, redimensionáveis)
- `st.table` exibe tabelas estáticas (sem interação)
- `st.metric` com `delta` mostra variação (positiva em verde, negativa em vermelho)

## Referências

- **Python.org — JSON** — https://docs.python.org/pt-br/3/library/json.html
- **Python.org — CSV** — https://docs.python.org/pt-br/3/library/csv.html
- **Streamlit Docs — Data display** — https://docs.streamlit.io/develop/api-reference/data
