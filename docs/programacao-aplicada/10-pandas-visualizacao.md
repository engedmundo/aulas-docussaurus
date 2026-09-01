# Pandas Aplicado + Visualização

## Roteiro

1. Pandas: DataFrame, Series, index
2. Pandas + NumPy
3. Explorando um DataFrame: head, info, describe, isna
3. Carregar dados reais: CSV de materiais/ensaios
4. Limpeza de dados: dropna, fillna, rename, astype
5. Filtros avançados: query, loc, iloc, isin, between
6. GroupBy: split-apply-combine, agg, grouped ops
7. Merge e Join: combinando DataFrames
8. Pivot tables: `pivot_table`, `melt` (largo ↔ longo)
9. matplotlib básico: plt.plot, plt.scatter, plt.hist
10. seaborn: scatterplot, boxplot, heatmap
11. Visualização com pandas plot e matplotlib
12. Persistência de variáveis no kernel do Colab
13. Exercícios práticos

> **Esta aula continua a aula 07.** Lá você aprendeu a criar DataFrames, salvar/carregar CSV e JSON, e usar `df.head()`, `df.style` e `df.describe()`. Aqui você vai aprofundar: limpeza, filtros, agrupamento, joins e visualização com matplotlib e seaborn.

## DataFrame e Series — revisão rápida

Na aula 07 você criou DataFrames a partir de dicionários e arquivos CSV. Dois conceitos que ficaram implícitos e que esta aula usa com frequência:

### Series: uma coluna com índice

Cada coluna de um DataFrame é uma **Series** — um vetor com rótulo (índice). Você já acessa Series quando escreve `df["coluna"]`.

```python
import pandas as pd

# Acessar uma coluna → retorna uma Series
df = pd.DataFrame({
    "material": ["Aço 1020", "Al 6061", "Latão"],
    "tensao_max": [350, 240, 200],
    "modulo_E": [210000, 69000, 97000]
})

s = df["tensao_max"]
print(type(s))        # <class 'pandas.core.series.Series'>
print(s.mean())       # 263.3
print(s["CP-01"])     # erro: índice é 0, 1, 2 (padrão)
```

O índice pode ser personalizado:

```python
tensoes = pd.Series([350, 240, 200],
                    index=["CP-01", "CP-02", "CP-03"],
                    name="tensao_max")
print(tensoes["CP-02"])  # 240
```

### Atributos que você usará o tempo todo

```python
print(df.shape)     # (3, 3) → 3 linhas, 3 colunas
print(df.columns)   # Index(['material', 'tensao_max', 'modulo_E'])
print(df.dtypes)    # material      object / tensao_max int64 / modulo_E int64
print(df.index)     # RangeIndex(start=0, stop=3, step=1)
```

| Atributo | O que retorna | Uso típico |
|---|---|---|
| `df.shape` | Tupla (linhas, colunas) | Verificar tamanho |
| `df.columns` | Nomes das colunas | Renomear, verificar |
| `df.dtypes` | Tipo de cada coluna | Detectar erros de tipo |
| `df.index` | Índice das linhas | Reindexar |

## Pandas + NumPy

Pandas trabalha naturalmente com arrays NumPy. Este é o ponto de partida:

```python
import numpy as np
import pandas as pd

# Gerar dados com numpy
nomes = np.array(["Aço", "Alumínio", "Latão", "Titânio", "PVC"])
densidade = np.array([7850, 2700, 8500, 4430, 1380])
modulo_E = np.array([210, 69, 97, 116, 3])  # GPa

# Criar DataFrame diretamente de arrays numpy
df = pd.DataFrame({
    "material": nomes,
    "densidade": densidade,
    "modulo_E": modulo_E
})

# Coluna calculada
df["relacao"] = df["modulo_E"] / df["densidade"] * 1000
print(df)
```

> Pandas aceita arrays numpy diretamente como colunas.

### Estatísticas Descritivas

```python
print(df.describe())
```

```
       densidade    modulo_E     relacao
count   5.000000    5.000000    5.000000
mean 4972.000000   99.000000   28.462713
std  3074.529800   74.900947   17.425529
min  1380.000000    3.000000    2.173913
25%  2700.000000   69.000000   13.446081
50%  4430.000000   97.000000   26.189228
75%  7850.000000  116.000000   46.242774
max  8500.000000  210.000000   50.955556
```

Também por coluna:
```python
df["densidade"].mean()     # 4972
df["densidade"].std()      # 3074.5
df["densidade"].max()      # 8500
```

---

### ✏️ Exercício 10.1 — DataFrame + coluna calculada

Use os dados abaixo para criar um DataFrame e adicionar uma coluna `resistencia_especifica = tensao_max / densidade`:

```python
import numpy as np
import pandas as pd

materiais = ["Aço", "Alumínio", "Latão", "Titânio", "PVC"]
densidade  = [7850, 2700, 8500, 4430, 1380]   # kg/m³
tensao_max = [350,  240,  200,  520,   50]    # MPa
modulo_E   = [210,   69,   97,  116,    3]    # GPa
```

Depois ordene por `resistencia_especifica` decrescente com `df.sort_values("resistencia_especifica", ascending=False)` e exiba `df.describe()`.

**Resultado esperado (ordem):** Titânio → Alumínio → Aço → Latão → PVC

---

## Explorando um DataFrame: Primeiros Passos

Antes de qualquer análise, **explore os dados**. Estes 4 comandos devem ser seus primeiros passos:

### `df.head(n)` — Primeiras linhas

Mostra as primeiras `n` linhas. Útil para ver a "cara" dos dados.

```python
df.head(2)
```

```
    material  tensao_max  modulo_E
0   Aço 1020         350    210000
1    Al 6061         240     69000
```

### `df.info()` — Resumo estrutural

Mostra colunas, tipos, e quantos valores não-nulos existem.

```python
df.info()
```

```
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 3 entries, 0 to 2
Data columns (total 3 columns):
 #   Column      Non-Null Count  Dtype
---  ------      --------------  -----
 0   material    3 non-null      object
 1   tensao_max  3 non-null      int64
 2   modulo_E    3 non-null      int64
dtypes: int64(2), object(1)
```

> **Dica:** se `Non-Null Count` for menor que o total de linhas, há valores faltando (`NaN`).

### `df.describe()` — Estatísticas descritivas

Calcula média, desvio padrão, mínimo, máximo e quartis **apenas para colunas numéricas**.

```python
df.describe()
```

```
       tensao_max    modulo_E
count    3.000000    3.000000
mean   263.333333   125333.333
std     77.674534    74728.396
min    200.000000    69000.000
25%    220.000000    83000.000
50%    240.000000    97000.000
75%    295.000000   153500.000
max    350.000000   210000.000
```

### `df.isna().sum()` — Contagem de nulos

```python
df.isna().sum()
# material      0
# tensao_max    0
# modulo_E      0
# dtype: int64
```

Cada `True` em `df.isna()` vira 1, cada `False` vira 0. O `.sum()` soma por coluna.

---

### ✏️ Exercício 10.2 — Exploração de dados

Use o DataFrame abaixo para responder às perguntas sem olhar os dados diretamente:

```python
import pandas as pd

dados = {
    "amostra":    ["CP-01","CP-02","CP-03","CP-04","CP-05","CP-06"],
    "material":   ["Aço","Alumínio","Aço", None,  "Latão","Alumínio"],
    "tensao_max": [450,   240,      None,  320,    200,    260],
    "modulo_E":   [210000,69000,    205000,None,   97000,  69000],
    "dureza":     [180,   95,       None,  None,   110,    90]
}
df = pd.DataFrame(dados)
```

1. Quantas linhas e colunas tem o DataFrame? (use `df.shape`)
2. Quais colunas têm valores nulos e quantos? (use `df.isna().sum()`)
3. Qual a tensão máxima média das amostras que têm valor? (use `df["tensao_max"].mean()`)
4. Qual o tipo de dado da coluna `material`? (use `df.dtypes`)

**Respostas esperadas:** (6, 5) — material:1, tensao_max:1, modulo_E:1, dureza:2 — 294.0 MPa — object

---

## Carregar Dados Reais

Na prática, seus dados vêm de arquivos CSV, Excel, ou bancos de dados.

### `pd.read_csv()` — O mais comum

```python
import pandas as pd

# De uma URL
url = "https://raw.githubusercontent.com/.../ensaios.csv"
df = pd.read_csv(url)

# De um arquivo local
df = pd.read_csv("dados/ensaios.csv")

# Com separador personalizado (ex: ponto e vírgula)
df = pd.read_csv("dados.csv", sep=";")

# Especificar encoding (útil para arquivos com acentos)
df = pd.read_csv("dados.csv", encoding="utf-8")
df = pd.read_csv("dados.csv", encoding="latin1")  # arquivos Windows antigos
```

### Upload de arquivos no Google Colab

No Colab, o arquivo é carregado pelo menu lateral (ícone de pasta → ícone de upload) ou via código:

```python
from google.colab import files

uploaded = files.upload()  # abre a janela de seleção de arquivo
nome_arquivo = list(uploaded.keys())[0]  # primeiro arquivo enviado

import pandas as pd
df = pd.read_csv(nome_arquivo)
df.head()
```

Depois de carregado, o arquivo fica no diretório do notebook e pode ser lido normalmente com `pd.read_csv("nome.csv")`.

### Parâmetros úteis do `read_csv`

| Parâmetro | Uso | Exemplo |
|---|---|---|
| `sep` | Separador diferente de vírgula | `sep=";"` |
| `encoding` | Codificação de caracteres | `encoding="latin1"` |
| `nrows` | Ler apenas N linhas | `nrows=100` |
| `usecols` | Ler apenas colunas específicas | `usecols=["material","tensao_max"]` |
| `na_values` | Valores a tratar como nulos | `na_values=["-","N/A","?"]` |

## Limpeza de Dados

Dados reais **sempre** têm problemas: valores faltando, nomes errados, tipos inconsistentes. A limpeza é a etapa mais importante da análise.

### Passo 1: Identificar nulos

```python
# Quantos nulos por coluna?
df.isna().sum()

# Quais linhas têm nulos?
df[df.isna().any(axis=1)]

# Porcentagem de nulos por coluna
(df.isna().sum() / len(df)) * 100
```

### Passo 2: Decidir o que fazer

Existem 3 estratégias principais:

| Estratégia | Quando usar | Comando |
|---|---|---|
| **Remover** linhas | Poucos nulos (< 5%), dados suficientes | `df.dropna()` |
| **Preencher** com estatística | Nulos moderados, coluna numérica | `df.fillna(média)` |
| **Preencher** com valor fixo | Categoria padrão, zero faz sentido | `df.fillna(0)` |

### Remover nulos: `dropna()`

```python
# Remove QUALQUER linha que tenha pelo menos 1 nulo
df_limpo = df.dropna()

# Remove só se TODAS as colunas forem nulas (raro)
df_limpo = df.dropna(how="all")

# Remove só se colunas específicas tiverem nulos
df_limpo = df.dropna(subset=["tensao_max", "material"])
```

> **Atenção:** `dropna()` remove LINHAS inteiras. Se uma linha tem 10 colunas e só 1 está nula, a linha inteira é perdida. Use com critério.

### Preencher nulos: `fillna()`

```python
# Preencher com a média da coluna
df["dureza"] = df["dureza"].fillna(df["dureza"].mean())

# Preencher com zero
df["alongamento"] = df["alongamento"].fillna(0)

# Preencher com o valor anterior (forward fill)
df["material"] = df["material"].ffill()

# Preencher com o valor seguinte (backward fill)
df["material"] = df["material"].bfill()
```

### Renomear colunas

Colunas com espaços ou acentos causam erros. Padronize com `rename()`:

```python
df = df.rename(columns={
    "tensao max": "tensao_max",
    "modulo E": "modulo_E",
    "Dureza (HB)": "dureza_HB"
})
```

### Converter tipos

```python
# String → float (ex: "350.5" → 350.5)
df["tensao_max"] = df["tensao_max"].astype(float)

# String → inteiro (cuidado com nulos!)
df["quantidade"] = df["quantidade"].astype(int)

# Usar pd.to_numeric para forçar conversão segura
df["tensao_max"] = pd.to_numeric(df["tensao_max"], errors="coerce")
# errors="coerce" transforma valores inválidos em NaN
```

### Exemplo completo de limpeza

```python
import pandas as pd

# Dados "sujos"
dados = {
    "amostra": ["CP-01","CP-02","CP-03","CP-04","CP-05"],
    "material": ["Aço","Alumínio","Aço",None,"Latão"],
    "tensao max": [450, 240, None, 320, 200],
    "modulo E": [210000, 69000, 205000, None, 97000],
    "alongamento": [12.5, 18.0, 10.2, 15.8, None],
    "dureza": [180, 95, None, None, 110]
}
df = pd.DataFrame(dados)

# 1. Renomear colunas
df = df.rename(columns={"tensao max": "tensao_max", "modulo E": "modulo_E"})

# 2. Preencher nulos numéricos com média
df["tensao_max"] = df["tensao_max"].fillna(df["tensao_max"].mean())
df["modulo_E"] = df["modulo_E"].fillna(df["modulo_E"].mean())
df["alongamento"] = df["alongamento"].fillna(df["alongamento"].mean())
df["dureza"] = df["dureza"].fillna(df["dureza"].mean())

# 3. Preencher nulos de texto com "Desconhecido"
df["material"] = df["material"].fillna("Desconhecido")

# 4. Converter tipos
df["tensao_max"] = df["tensao_max"].astype(float)
df["modulo_E"] = df["modulo_E"].astype(float)
```

---

### ✏️ Exercício 10.3 — Limpeza de dados

Use o DataFrame do exercício anterior (com nulos) e aplique as estratégias corretas:

```python
# df já criado no exercício anterior
```

1. Preencha `tensao_max` e `modulo_E` com a **média** de cada coluna
2. Preencha `dureza` com **zero** (indica "não medido")
3. Preencha `material` com a string `"Desconhecido"`
4. Renomeie a coluna `tensao_max` para `tensao_mpa`
5. Verifique que não há mais nulos com `df.isna().sum()`

**Ao final:** `df.isna().sum()` deve retornar zero em todas as colunas.

---

## Filtros Avançados

Filtrar é selecionar **subconjuntos** de dados que atendem a certas condições.

### Filtro booleano básico

A forma mais direta: usar uma condição dentro dos colchetes.

```python
# Materiais com tensão > 300
df[df["tensao_max"] > 300]

# Material específico
df[df["material"] == "Aço"]
```

### `query()` — Filtro estilo SQL

Mais legível para condições complexas:

```python
# Aço com tensão > 300 E módulo > 100000
df.query("material == 'Aço' and tensao_max > 300 and modulo_E > 100000")

# Usando variáveis externas (prefixo @)
limite = 300
df.query("tensao_max > @limite")
```

### `loc` — Acesso por rótulo/condição

`loc[linhas, colunas]` — seleciona linhas e colunas por nome ou condição.

```python
# Linhas onde tensao_max > 300, colunas material e tensao_max
df.loc[df["tensao_max"] > 300, ["material", "tensao_max"]]

# Todas as linhas, apenas colunas específicas
df.loc[:, ["material", "tensao_max"]]

# Uma linha específica por índice
df.loc[0]  # primeira linha
```

### `iloc` — Acesso por posição

`iloc[linhas, colunas]` — seleciona por **número** (posição), não por nome.

```python
# Linhas 0-4, colunas 0-2
df.iloc[0:5, 0:3]

# Todas as linhas, última coluna
df.iloc[:, -1]

# Linha 2, coluna 1
df.iloc[2, 1]
```

### `isin()` — Pertencimento a lista

```python
# Filtrar múltiplos materiais de uma vez
metais = df[df["material"].isin(["Aço", "Cobre", "Alumínio"])]

# Negar: materiais que NÃO estão na lista
outros = df[~df["material"].isin(["Aço", "Cobre"])]
```

### `between()` — Intervalo fechado

```python
# Tensão entre 200 e 400 (inclusive)
df_medio = df[df["tensao_max"].between(200, 400)]

# Equivalente a:
df[(df["tensao_max"] >= 200) & (df["tensao_max"] <= 400)]
```

### Busca parcial em texto: `str.contains()`

```python
# Materiais que contêm "Aço" (inclui "Aço 1020", "Aço 4140", etc.)
df[df["material"].str.contains("Aço", na=False)]

# Case insensitive
df[df["material"].str.contains("aço", case=False, na=False)]
```

### Combinar filtros

```python
# Múltiplas condições com & (E) e | (OU)
df[(df["tensao_max"] > 300) & (df["material"].str.contains("Aço", na=False))]

# Negar com ~
df[~(df["tensao_max"] > 300)]  # tensão <= 300
```

> **Importante:** sempre use parênteses em cada condição e `&`/`|` em vez de `and`/`or`.

---

### ✏️ Exercício 10.4 — Filtros

Use o DataFrame abaixo com 10 materiais:

```python
import pandas as pd

df = pd.DataFrame({
    "material":   ["Aço","Aço","Aço","Alumínio","Alumínio","Latão","Latão","Titânio","Titânio","PVC"],
    "tensao_max": [350, 420, 480, 220, 260, 190, 210, 500, 550, 45],
    "modulo_E":   [210, 210, 210,  69,  69,  97,  97, 116, 116,  3],
    "dureza":     [180, 200, 220,  90,  95, 100, 110, 300, 320,  15]
})
```

1. Selecione apenas os materiais com `tensao_max > 300` usando filtro booleano
2. Selecione Aço e Titânio usando `isin()`
3. Selecione materiais com tensão entre 200 e 450 MPa usando `between()`
4. Usando `query()`, selecione Aço com tensão > 400 MPa
5. Use `loc` para retornar apenas as colunas `material` e `tensao_max` das linhas filtradas em (1)

**Resultados esperados:** (1) 6 linhas — (2) 5 linhas — (3) 7 linhas — (4) 2 linhas

---

## GroupBy: Split-Apply-Combine

O **GroupBy** é o conceito mais poderoso do Pandas para análise. Ele segue 3 passos:

```
  ┌─────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
  │  Dados  │────→│  SPLIT   │────→│  APPLY   │────→│ COMBINE  │
  │ brutos  │     │ (agrupar)│     │(calcular) │     │ (juntar) │
  └─────────┘     └──────────┘     └──────────┘     └──────────┘
```

1. **Split**: divide o DataFrame em grupos (ex: por material)
2. **Apply**: aplica uma função a cada grupo (ex: média, soma, contagem)
3. **Combine**: junta os resultados em um novo DataFrame

### Exemplo passo a passo

```python
import pandas as pd

df = pd.DataFrame({
    "material": ["Aço", "Aço", "Alumínio", "Alumínio", "Latão"],
    "tensao_max": [350, 450, 220, 260, 200],
    "modulo_E": [210000, 210000, 69000, 69000, 97000]
})
```

**Split:** o Pandas separa em 3 grupos:
- Grupo "Aço": [350, 450]
- Grupo "Alumínio": [220, 260]
- Grupo "Latão": [200]

**Apply + Combine:**

```python
# Média de tensao_max por material
df.groupby("material")["tensao_max"].mean()
# material
# Aço         400.0
# Alumínio    240.0
# Latão       200.0
```

### Múltiplas estatísticas com `agg()`

```python
estats = df.groupby("material")["tensao_max"].agg([
    "mean", "std", "min", "max", "count"
]).reset_index()
```

```
   material    mean    std  min  max  count
0      Aço   400.0  70.71  350  450      2
1  Alumínio  240.0  28.28  220  260      2
2    Latão   200.0   0.00  200  200      1
```

### Múltiplas colunas com nomes personalizados

```python
df.groupby("material").agg(
    tensao_media=("tensao_max", "mean"),
    E_medio=("modulo_E", "mean"),
    n=("tensao_max", "count")
).reset_index()
```

> **Sempre use `.reset_index()`** ao final do groupby para transformar o índice de volta em coluna. Sem isso, a coluna de agrupamento vira índice e causa problemas em gráficos e merges.

### GroupBy com múltiplas colunas de agrupamento

```python
# Agrupar por material E por lote
df.groupby(["material", "lote"])["tensao_max"].mean()
```

---

### ✏️ Exercício 10.5 — GroupBy

Use o mesmo DataFrame do exercício anterior (10 materiais) e responda:

1. Qual a tensão média por material? (use `groupby().mean()`)
2. Monte uma tabela com `mean`, `std`, `min`, `max` e `count` para `tensao_max` por material
3. Qual material tem o maior desvio padrão de tensão? (indica ensaios mais variáveis)
4. Usando `agg` com nomes personalizados, crie colunas `tensao_media`, `tensao_max_val` e `n_amostras`

**Resultado esperado da questão 1:**
```
material
Aço         416.7
Alumínio    240.0
Latão       200.0
PVC          45.0
Titânio     525.0
```

---

## Merge e Join

**Merge** combina dois DataFrames usando uma coluna em comum — como o `JOIN` do SQL ou `PROCV` do Excel.

### Tipos de merge

| Tipo | O que faz | Resultado |
|---|---|---|
| `how="left"` | Mantém TODAS as linhas da esquerda | Pode ter NaN se não houver match |
| `how="right"` | Mantém TODAS as linhas da direita | Pode ter NaN se não houver match |
| `how="inner"` | Só linhas que existem em **ambos** | Interseção |
| `how="outer"` | Mantém **todas** as linhas de ambos | União (NaN onde não há match) |

### Exemplo prático

```python
materiais = pd.DataFrame({
    "id": [1, 2, 3],
    "nome": ["Aço", "Alumínio", "Latão"],
    "E": [210000, 69000, 97000]
})

fornecedores = pd.DataFrame({
    "id": [1, 2, 3],
    "nome_material": ["Aço", "Alumínio", "Latão"],
    "preco_kg": [8.50, 15.20, 22.00],
    "prazo_dias": [15, 20, 10]
})

# Merge: colunas com nomes diferentes
df_enriquecido = materiais.merge(
    fornecedores,
    left_on="nome",
    right_on="nome_material",
    how="left"
)
```

```
   id    nome      E  id  nome_material  preco_kg  prazo_dias
0   1    Aço  210000   1           Aço      8.50          15
1   2  Alumínio  69000   2      Alumínio     15.20          20
2   3   Latão  97000   3         Latão     22.00          10
```

### Merge com mesma coluna

Se as colunas têm o mesmo nome, basta usar `on`:

```python
df1 = pd.DataFrame({"id": [1, 2], "nome": ["A", "B"]})
df2 = pd.DataFrame({"id": [1, 2], "preco": [10, 20]})

df_merged = df1.merge(df2, on="id", how="left")
```

### Colunas duplicadas após merge

Quando ambas as tabelas têm colunas com o mesmo nome (além da chave), o Pandas adiciona sufixos:

```python
# Se df1 tem "id" e df2 também tem "id"
df.merge(df2, on="nome", how="left", suffixes=("_materiais", "_fornecedores"))
```

---

### ✏️ Exercício 10.6 — Merge

Use os dois DataFrames abaixo e combine-os:

```python
import pandas as pd

materiais = pd.DataFrame({
    "material": ["Aço", "Alumínio", "Latão", "Titânio"],
    "densidade": [7850, 2700, 8500, 4430],
    "tensao_max": [420, 240, 200, 520]
})

fornecedores = pd.DataFrame({
    "material": ["Aço", "Alumínio", "Cobre"],   # Latão e Titânio não têm fornecedor
    "preco_kg": [8.50, 15.20, 32.00],
    "prazo_dias": [15, 20, 30]
})
```

1. Faça um `inner` merge — quantas linhas resultam? Por quê?
2. Faça um `left` merge — quantas linhas resultam? O que acontece com Latão e Titânio?
3. No resultado do `left` merge, calcule `custo_peca = densidade * preco_kg / 1000`
4. Exiba apenas as linhas onde `preco_kg` não é nulo, ordenadas por `custo_peca`

**Resultado esperado (questão 1):** 2 linhas (Aço e Alumínio)
**Resultado esperado (questão 2):** 4 linhas; Latão e Titânio ficam com NaN em `preco_kg` e `prazo_dias`

---

## Pivot Tables

Pivot tables reorganizam dados: transformam **valores de colunas em cabeçalhos**, agregando os resultados.

### Conceito visual

Dados originais (formato "longo"):

```
   mes  maquina  pecas
0  Jan  M1       120
1  Jan  M2        95
2  Fev  M1       135
3  Fev  M2       100
```

Após pivot (formato "largo"):

```
maquina   M1   M2
mes
Jan      120   95
Fev      135  100
```

### Exemplo

```python
producao = pd.DataFrame({
    "mes": ["Jan","Jan","Fev","Fev","Mar","Mar"],
    "maquina": ["M1","M2","M1","M2","M1","M2"],
    "pecas": [120, 95, 135, 100, 110, 105]
})

pivot = producao.pivot_table(
    index="mes",          # Linhas
    columns="maquina",    # Colunas
    values="pecas",       # Valores a agregar
    aggfunc="sum"         # Função de agregação
)
```

### Parâmetros do `pivot_table`

| Parâmetro | O que define | Exemplo |
|---|---|---|
| `index` | Linhas da tabela | `index="mes"` |
| `columns` | Colunas da tabela | `columns="maquina"` |
| `values` | O que agregar | `values="pecas"` |
| `aggfunc` | Como agregar | `"sum"`, `"mean"`, `"count"` |
| `margins` | Adicionar totais | `margins=True` |
| `fill_value` | Substituir NaN | `fill_value=0` |

### Adicionar totais

```python
pivot = producao.pivot_table(
    index="mes", columns="maquina", values="pecas",
    aggfunc="sum", margins=True, margins_name="Total"
)
```

### `melt()` — desfazer um pivot (largo → longo)

`melt()` é a operação inversa do pivot: transforma colunas em linhas. Útil quando você recebe dados em formato "largo" (uma coluna por categoria) e precisa deixá-los em formato "longo" para filtrar ou agrupar.

```python
# Formato largo (como veio do pivot)
largo = pd.DataFrame({
    "mes": ["Jan", "Fev", "Mar"],
    "M1":  [120,   135,   110],
    "M2":  [ 95,   100,   105],
})

# melt: colunas M1 e M2 viram linhas
longo = largo.melt(
    id_vars="mes",          # coluna que permanece como identificador
    var_name="maquina",     # nome da nova coluna de categorias
    value_name="pecas"      # nome da nova coluna de valores
)
print(longo)
```

```
   mes maquina  pecas
0  Jan      M1    120
1  Fev      M1    135
2  Mar      M1    110
3  Jan      M2     95
4  Fev      M2    100
5  Mar      M2    105
```

> **Regra:** use `pivot_table` para agregar e resumir; use `melt` para preparar dados para gráficos ou GroupBy.

---

### ✏️ Exercício 10.7 — Pivot e Melt

Use os dados de produção abaixo:

```python
import pandas as pd

producao = pd.DataFrame({
    "mes":     ["Jan","Jan","Jan","Fev","Fev","Fev","Mar","Mar","Mar"],
    "maquina": ["M1","M2","M3","M1","M2","M3","M1","M2","M3"],
    "pecas":   [120,  95, 110, 135, 100, 108, 110, 105, 120]
})
```

1. Crie um pivot com `mes` nas linhas, `maquina` nas colunas e `sum` como agregação — adicione totais com `margins=True`
2. A partir do pivot resultante, use `melt()` para voltar ao formato longo
3. No formato longo, use `groupby("maquina")["pecas"].sum()` para identificar a máquina mais produtiva nos 3 meses

**Resultado esperado (questão 3):** M1=365, M2=300, M3=338 → M1 é a mais produtiva

---

## matplotlib Básico

matplotlib é a biblioteca de gráficos mais antiga e fundamental do Python. Ela usa uma interface orientada a objetos baseada em **figura** (`fig`) e **eixos** (`ax`).

### Entendendo `fig, ax = plt.subplots()`

Pense em uma exposição de arte:
- **`fig`** é a **parede** (o espaço total disponível)
- **`ax`** é o **quadro** (a área onde você realmente desenha)

```python
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(8, 4))
```

- `fig` é a janela/canvas inteira
- `ax` são os eixos (a área de desenho com eixos X e Y)
- `figsize=(largura, altura)` define o tamanho em **polegadas**

### Por que usar `fig, ax` e não `plt.plot()` direto?

| Abordagem | Resultado |
|---|---|
| `plt.plot()` + `plt.show()` | ✅ Funciona, mas cria a figura fora do controle do notebook |
| `fig, ax = plt.subplots()` + `fig` na última linha | ✅ Ideal no Colab: a figura é exibida como saída da célula |

**Regra de ouro:** no Colab, crie `fig, ax = plt.subplots()`, desenhe no `ax` e deixe o `fig` como **última linha da célula** (ou use `plt.show()`) para exibir o gráfico.

### Tipos de gráficos

```python
import matplotlib.pyplot as plt

# 1. Gráfico de linha
fig, ax = plt.subplots(figsize=(8, 4))
ax.plot(df["material"], df["tensao_max"], marker="o", linewidth=2)
ax.set_xlabel("Material")
ax.set_ylabel("Tensão Máxima (MPa)")
ax.set_title("Tensão por Material")
ax.grid(True, alpha=0.3)
fig
```

```python
# 2. Gráfico de dispersão
fig, ax = plt.subplots(figsize=(8, 4))
scatter = ax.scatter(df["alongamento"], df["tensao_max"],
                     c=df["dureza"], cmap="viridis", s=100)
ax.set_xlabel("Alongamento (%)")
ax.set_ylabel("Tensão Máxima (MPa)")
fig.colorbar(scatter, label="Dureza (HB)")
fig
```

```python
# 3. Histograma
fig, ax = plt.subplots(figsize=(8, 4))
ax.hist(df["tensao_max"], bins=10, edgecolor="black", color="steelblue")
ax.set_xlabel("Tensão Máxima (MPa)")
ax.set_ylabel("Frequência")
fig
```

### Múltiplos gráficos na mesma figura

```python
fig, axes = plt.subplots(1, 2, figsize=(12, 4))

axes[0].plot(df["material"], df["tensao_max"], marker="o")
axes[0].set_title("Tensão")

axes[1].hist(df["tensao_max"], bins=10, edgecolor="black")
axes[1].set_title("Distribuição")

fig
```

### Linhas de referência

```python
fig, ax = plt.subplots()
ax.hist(df["tensao_max"], bins=10, edgecolor="black")

# Linha horizontal
ax.axhline(y=300, color="red", linestyle="--", label="Limite mínimo")

# Linha vertical
media = df["tensao_max"].mean()
ax.axvline(x=media, color="green", linestyle="-", label=f"Média = {media:.0f}")

ax.legend()
fig
```

---

### ✏️ Exercício 10.8 — matplotlib

Use os dados de materiais já utilizados nesta aula:

```python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.DataFrame({
    "material":   ["Aço","Alumínio","Latão","Titânio","PVC"],
    "tensao_max": [420,   240,       200,    520,       45],
    "modulo_E":   [210,    69,        97,    116,        3],
    "densidade":  [7850,  2700,      8500,  4430,     1380]
})
```

1. Crie um gráfico de barras com `tensao_max` por material (use `fig, ax = plt.subplots()` e `ax.bar()`)
2. Adicione título, rótulos nos eixos e grid horizontal com `alpha=0.3`
3. Crie um segundo gráfico de dispersão com `densidade` no eixo X e `tensao_max` no eixo Y, com o nome do material anotado em cada ponto (use `ax.annotate()`)
4. Crie uma figura com 2 subplots lado a lado: barras de tensão à esquerda e histograma de modulo_E à direita

**Dica para questão 3:** `ax.annotate(texto, xy=(x, y), xytext=(x+50, y+5))`

---

## seaborn: Estatística Visual

seaborn é construída sobre matplotlib e simplifica gráficos estatísticos. A grande vantagem: **ela entende DataFrames diretamente** e adiciona cores por categoria automaticamente.

### Scatter plot com cor por categoria

```python
import seaborn as sns

fig, ax = plt.subplots(figsize=(8, 4))
sns.scatterplot(data=df, x="alongamento", y="tensao_max",
                hue="material", ax=ax)
ax.set_title("Tensão × Alongamento por Material")
fig
```

### Boxplot por grupo

O boxplot mostra a distribuição: mediana, quartis, e outliers.

```python
fig, ax = plt.subplots(figsize=(8, 4))
sns.boxplot(data=df, x="material", y="tensao_max", ax=ax)
ax.set_title("Distribuição de Tensão por Material")
fig
```

### Heatmap de correlação

```python
corr = df.select_dtypes("number").corr()

fig, ax = plt.subplots(figsize=(6, 5))
sns.heatmap(corr, annot=True, cmap="coolwarm", fmt=".2f", ax=ax)
ax.set_title("Matriz de Correlação")
fig
```

**Como ler o heatmap:**
- Valores próximos de **+1**: correlação positiva forte (quando um sobe, o outro sobe)
- Valores próximos de **-1**: correlação negativa forte (quando um sobe, o outro desce)
- Valores próximos de **0**: sem correlação linear

> **Importante:** crie sempre `fig, ax` antes e passe `ax=` nos gráficos seaborn. No Colab, deixe o `fig` como última linha da célula para exibir.

---

### ✏️ Exercício 10.9 — seaborn

Gere dados sintéticos de ensaios e explore com seaborn:

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

np.random.seed(42)
n = 20

df = pd.DataFrame({
    "material":   ["Aço"]*n + ["Alumínio"]*n + ["Titânio"]*n,
    "tensao_max": np.concatenate([
        np.random.normal(420, 25, n),
        np.random.normal(240, 20, n),
        np.random.normal(520, 35, n)
    ]),
    "alongamento": np.concatenate([
        np.random.normal(12, 2, n),
        np.random.normal(18, 3, n),
        np.random.normal(10, 2, n)
    ]),
    "dureza": np.concatenate([
        np.random.normal(190, 15, n),
        np.random.normal(90,  10, n),
        np.random.normal(310, 20, n)
    ])
})
```

1. Crie um boxplot de `tensao_max` por `material` — qual material tem maior variabilidade?
2. Crie um scatter plot de `alongamento` × `tensao_max` com cor por `material`
3. Gere a matriz de correlação com `df.select_dtypes("number").corr()` e exiba como heatmap com `annot=True`
4. Interprete: `tensao_max` e `dureza` têm correlação positiva ou negativa? Por quê faz sentido?

---

## Visualização com pandas plot e matplotlib

O pandas tem métodos de gráfico nativos (`.plot()`) que usam matplotlib por trás — mais simples, mas com menos customização que `fig, ax` manual.

### Quando usar cada um

| Abordagem | Quando usar | Vantagem | Limitação |
|---|---|---|---|
| `df.plot(kind="line")` | Séries temporais rápidas | Zero código extra | Pouca customização |
| `df.plot(kind="bar")` | Comparações simples | Rápido e limpo | Sem cores por categoria |
| `df.plot(kind="area")` | Acumulado/stacked | Visual bonito | Sem parâmetros avançados |
| `fig, ax = plt.subplots()` | Controle total | matplotlib completo | Mais código |

> O método `.plot()` do pandas retorna a figura, então basta deixá-lo como última linha da célula para exibir o gráfico no Colab.

### Exemplos

```python
# Line chart (índice como eixo x)
df.set_index("material")["tensao_max"].plot(kind="line")

# Bar chart
df.groupby("material")["tensao_max"].mean().plot(kind="bar")

# Area chart com múltiplas colunas
df.set_index("material")[["tensao_max", "modulo_E"]].plot(kind="area")
```

> **Limitação:** os métodos `.plot()` do pandas aceitam menos parâmetros que matplotlib puro. Para controle total, use `fig, ax = plt.subplots()` e deixe o `fig` na última linha.

## Persistência de variáveis no kernel do Colab

Em interfaces web (tipo um dashboard), cada interação roda o script do zero e variáveis locais se perdem. No **Colab** isso não é um problema: as variáveis de uma célula **persistem no kernel** enquanto o notebook estiver aberto.

### O que significa persistência

```python
import pandas as pd

df = pd.DataFrame({"material": ["Aço", "Al"], "tensao": [350, 240]})

df = df[df["tensao"] > 300]  # modifica a variável

print(df)  # o valor modificado permanece na memória
```

### Re-executar células

Diferente dos widgets de uma interface, no Colab o fluxo é **célula por célula**: defina parâmetros em uma célula, rode as células seguintes quando quiser. Para "refazer" os dados, basta **re-executar a célula** que os gera:

```python
import numpy as np
import pandas as pd

dados = np.random.normal(420, 25, 20)  # re-executar esta célula refaz os dados
df = pd.DataFrame({"tensao_max": dados, "material": "Aço"})
print(df.head())
```

> **Dica:** facilita o uso das linhas separadas: deixe a parte de geração de dados e a parte de análise em células separadas. Re-executar a célula de geração atualiza os dados para as células seguintes.

## Exercício 10.10 — Limpeza de Dados de Ensaios

**Contexto:** Dados de ensaios mecânicos com falhas de preenchimento típicas de planilhas reais.

**Dados:**
```python
import pandas as pd

dados = {
    "amostra":    ["CP-01","CP-02","CP-03","CP-04","CP-05","CP-06","CP-07"],
    "material":   ["Aço","Alumínio","Aço", None,   "Latão","Aço",  "Alumínio"],
    "tensao_max": [450,   240,      None,  320,    200,    480,    None],
    "modulo_E":   [210000,69000,    205000,None,   97000,  210000, 69000],
    "alongamento":[12.5,  18.0,     10.2,  15.8,  None,   11.0,   19.5],
    "dureza":     [180,   95,       None,  None,   110,    195,    88]
}
df = pd.DataFrame(dados)
```

**O que o programa deve ter:**
- Exibir `df.isna().sum()` e a porcentagem de nulos por coluna
- Preencher `tensao_max` e `modulo_E` com a **média** de cada coluna
- Preencher `dureza` com **zero** e `alongamento` com a média
- Preencher `material` com `"Desconhecido"`
- Renomear `tensao_max` para `tensao_mpa` e `modulo_E` para `modulo_gpa` (dividindo por 1000)
- Exibir o DataFrame limpo e confirmar `df.isna().sum()` = 0 em todas as colunas

**Resultado esperado (nulos antes da limpeza):**
```
material      1
tensao_max    2
modulo_E      1
alongamento   1
dureza        2
```

## Exercício 10.11 — Filtros e Seleção

**Contexto:** Usar o DataFrame limpo do exercício anterior para responder perguntas de engenharia.

**Dados:** use o DataFrame limpo do Exercício 10.10.

**O que o programa deve fazer:**
- Selecione apenas amostras de Aço com `tensao_mpa > 400` (use `query()`)
- Selecione amostras com tensão entre 200 e 450 MPa (use `between()`)
- Use `isin()` para selecionar Aço e Alumínio ao mesmo tempo
- Use `loc` para retornar apenas `amostra`, `material` e `tensao_mpa` dos resultados de cada filtro
- Exiba: `print(f"Encontradas: {len(resultado)} amostras")`

**Resultado esperado (questão 1 — Aço com tensão > 400):** CP-02 não existe, CP-06 com 480 MPa, mais CP-01 com 450 MPa → 2 amostras

## Exercício 10.12 — GroupBy e Estatísticas por Material

**Contexto:** Gerar dados sintéticos de ensaios para 4 materiais e analisar por grupo.

**Dados:**
```python
import numpy as np
import pandas as pd

np.random.seed(0)
n = 20

materiais_params = {
    "Aço":      {"tensao": (420, 25), "modulo": (210, 10), "densidade": 7850},
    "Alumínio": {"tensao": (280, 20), "modulo": ( 70,  8), "densidade": 2700},
    "Latão":    {"tensao": (350, 30), "modulo": (100, 12), "densidade": 8500},
    "Titânio":  {"tensao": (520, 35), "modulo": (115, 10), "densidade": 4430},
}

registros = []
for mat, p in materiais_params.items():
    for i in range(n):
        registros.append({
            "material":  mat,
            "tensao_mpa": round(np.random.normal(*p["tensao"]), 1),
            "modulo_gpa": round(np.random.normal(*p["modulo"]),  1),
            "densidade":  p["densidade"]
        })

df = pd.DataFrame(registros)
```

**O que o programa deve fazer:**
- Exibir `df.head()` e `df.describe()`
- Calcular `resistencia_especifica = tensao_mpa / densidade * 1000`
- Tabela GroupBy com `mean`, `std`, `min`, `max`, `count` para `tensao_mpa` por material
- Identificar qual material tem maior `resistencia_especifica` média
- Gráfico de barras da tensão média por material com `df.groupby().mean().plot(kind="bar")`

**Resultado esperado (resistência específica média):** Titânio (~117) > Alumínio (~103) > Aço (~53) > Latão (~41)

## Exercício 10.13 — Merge: Catálogo + Fornecedores

**Contexto:** O setor de compras precisa cruzar o catálogo de materiais com a tabela de fornecedores para calcular o custo estimado de peças.

**Dados:**
```python
import pandas as pd

catalogo = pd.DataFrame({
    "material":  ["Aço", "Alumínio", "Latão", "Titânio", "PVC"],
    "densidade": [7850,   2700,       8500,    4430,      1380],
    "tensao_mpa":[420,    280,        350,     520,        50],
})

fornecedores = pd.DataFrame({
    "material":   ["Aço", "Alumínio", "Latão", "Cobre"],  # Titânio e PVC sem fornecedor
    "fornecedor": ["AçosBR","AlumPro","MetaisX","CobresY"],
    "preco_kg":   [8.50,    15.20,    22.00,    32.00],
    "prazo_dias": [15,      20,       10,       25]
})
```

**O que o programa deve fazer:**
- Fazer `left` merge — quantos materiais ficam sem fornecedor? Quais?
- Calcular `custo_por_dm3 = densidade * preco_kg / 1000` (custo por dm³ de material)
- Exibir só os materiais que têm fornecedor, ordenados por `custo_por_dm3`
- `print()` com o material mais barato e mais caro por dm³

**Resultado esperado:** Titânio e PVC ficam com NaN; Aço é o mais barato por dm³ (R$ 66,73); Latão o mais caro (R$ 187,00)

## Exercício 10.14 — Pivot e Heatmap de Produção

**Contexto:** Visualizar a produção mensal de 3 máquinas ao longo de 6 meses.

**Dados:**
```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

np.random.seed(7)
meses    = ["Jan","Fev","Mar","Abr","Mai","Jun"]
maquinas = ["M1","M2","M3"]

registros = []
for mes in meses:
    for maq in maquinas:
        registros.append({
            "mes":    mes,
            "maquina": maq,
            "pecas":  int(np.random.normal(110, 15))
        })

df = pd.DataFrame(registros)
```

**O que o programa deve fazer:**
- Criar `pivot_table` com `mes` nas linhas, `maquina` nas colunas, `sum` como agregação e `margins=True`
- Exibir o pivot com `df.style.background_gradient(cmap="YlOrRd")`
- Usar `melt()` para converter o pivot de volta ao formato longo
- Criar heatmap com `sns.heatmap(pivot, annot=True, fmt=".0f", cmap="YlOrRd")` — deixe o `fig` na última linha
- Identificar o mês e máquina com maior produção

## Exercício 10.15 — Dashboard de Qualidade (CEP)

**Contexto:** Controle estatístico de processo — eixos usinados com diâmetro alvo 50 mm e tolerância ±0.1 mm.

**Fórmulas:**

$$Cp = \frac{LSE - LIE}{6\sigma}$$

$$Cpk = \min\left(\frac{\bar{x} - LIE}{3\sigma},\ \frac{LSE - \bar{x}}{3\sigma}\right)$$

**Dados:**
```python
import numpy as np
import pandas as pd

np.random.seed(42)

LIE    = 49.90   # Limite inferior de especificação
LSE    = 50.10   # Limite superior de especificação
TARGET = 50.00   # Valor nominal

# Processo ligeiramente descentrado (média 50.02) com desvio 0.03
medicoes = np.random.normal(loc=50.02, scale=0.03, size=60)
lotes    = ["Lote A"] * 20 + ["Lote B"] * 20 + ["Lote C"] * 20

df = pd.DataFrame({"diametro": medicoes, "lote": lotes})
```

**O que o programa deve fazer:**
- Histograma com linhas verticais para LIE, LSE e TARGET (matplotlib)
- Boxplot por lote com `sns.boxplot`
- Calcular e imprimir Cp e Cpk
- Identificar quantas peças estão fora da tolerância (`df[df["diametro"] < LIE]` e `df[df["diametro"] > LSE]`)
- Interpretação: Cp > 1.33 indica processo capaz; Cpk < Cp indica processo descentrado

**Resultado esperado:** Cp ≈ 1.11 (processo marginalmente capaz), Cpk < Cp (processo descentrado)

## Mini-Projeto 10 — Análise de Resultados Internacionais de Futebol

**Dataset:** [International Football Results (1872–2026)](https://www.kaggle.com/datasets/martj42/international-football-results-from-1872-to-2017) — Mart Jürisoo (Kaggle)

Arquivos necessários: `results.csv`, `goalscorers.csv`, `shootouts.csv`

**Como carregar no Colab:**

```python
# Opção A — upload manual (baixe os 3 CSVs do Kaggle e faça upload no painel lateral)
import pandas as pd

resultados   = pd.read_csv("results.csv",     parse_dates=["date"])
gols         = pd.read_csv("goalscorers.csv", parse_dates=["date"])
penaltis     = pd.read_csv("shootouts.csv",   parse_dates=["date"])
```

**Colunas disponíveis:**

| Arquivo | Colunas |
|---------|---------|
| `results.csv` | `date`, `home_team`, `away_team`, `home_score`, `away_score`, `tournament`, `city`, `country`, `neutral` |
| `goalscorers.csv` | `date`, `home_team`, `away_team`, `team`, `scorer`, `minute`, `own_goal`, `penalty` |
| `shootouts.csv` | `date`, `home_team`, `away_team`, `winner`, `first_shooter` |

**Exploração inicial obrigatória:**

```python
# Quantas partidas, de quando a quando?
print(f"Partidas: {len(resultados)}")
print(f"Período: {resultados['date'].min().year} – {resultados['date'].max().year}")
resultados.head()
```

**Funcionalidades obrigatórias:**

**1. Limpeza e tipagem**
- Verificar nulos com `isna().sum()` nos 3 DataFrames
- Confirmar que `home_score` e `away_score` são numéricos (`df.dtypes`)
- Converter `date` para datetime se necessário (`pd.to_datetime`)

**2. Coluna calculada: resultado da partida**
```python
# Criar coluna com o vencedor de cada partida
def vencedor(row):
    if row["home_score"] > row["away_score"]:
        return row["home_team"]
    elif row["away_score"] > row["home_score"]:
        return row["away_team"]
    else:
        return "Empate"

resultados["vencedor"] = resultados.apply(vencedor, axis=1)
```

**3. Análises com GroupBy**
- Ranking dos 10 países com mais vitórias (filtre `vencedor != "Empate"`, use `value_counts()`)
- Total de gols marcados por torneio (`groupby("tournament").agg(...)`) — top 10 torneios
- Média de gols por partida por década:
```python
resultados["decada"] = (resultados["date"].dt.year // 10) * 10
resultados["total_gols"] = resultados["home_score"] + resultados["away_score"]
resultados.groupby("decada")["total_gols"].mean()
```

**4. Filtro por seleção**
```python
selecao = "Brazil"   # altere aqui para analisar outro país

jogos_brasil = resultados[
    (resultados["home_team"] == selecao) | (resultados["away_team"] == selecao)
]
print(f"Jogos do {selecao}: {len(jogos_brasil)}")
```
- Calcule vitórias, empates e derrotas do país selecionado
- Exiba o resultado como DataFrame com `pd.DataFrame`

**5. Artilheiros históricos (goalscorers.csv)**
- Filtre `own_goal == False` para remover gols contra
- Use `value_counts()` em `scorer` para obter os top 15 artilheiros
- Exiba como DataFrame estilizado com `df.style.background_gradient()`

**6. Merge: cruzar resultados com dados de pênaltis**
- Faça `merge` entre `resultados` e `penaltis` usando `date`, `home_team`, `away_team`
- Quantos jogos tiveram disputa de pênaltis? Em quais torneios isso é mais comum?

**7. Pivot table: desempenho por torneio e década**
```python
pivot = resultados.pivot_table(
    index="decada",
    columns="tournament",
    values="total_gols",
    aggfunc="mean"
)
# Filtre só os torneios principais para não ficar grande demais
torneiros_principais = ["FIFA World Cup", "Copa América", "UEFA Euro", "Friendly"]
pivot = pivot[torneiros_principais]
```

**8. Visualizações**
- Gráfico de barras: top 10 países por número de vitórias (matplotlib)
- Linha do tempo: média de gols por partida por década (matplotlib)
- Heatmap: média de gols por torneio × década (seaborn, use o pivot da etapa 7)
- Scatter: total de jogos × total de vitórias por seleção (seaborn, destaque Brasil, Argentina, Alemanha)

**9. Export**
```python
from google.colab import files

jogos_brasil.to_csv("analise_brasil.csv", index=False)
files.download("analise_brasil.csv")
```

**Resultado esperado — top 5 vitórias históricas (aproximado):**
```
Brazil       ~650 vitórias
Germany      ~600 vitórias
Spain        ~500 vitórias
Argentina    ~500 vitórias
England      ~490 vitórias
```

## Resumo da aula

**Manipulação:**
- `dropna()` / `fillna()` / `rename()` / `astype()` — limpeza de dados reais
- Filtros: `df[condição]`, `query()`, `loc`, `iloc`, `isin()`, `between()`, `str.contains()`
- `groupby().agg()` — split-apply-combine; use `.reset_index()` ao final
- `merge()` — JOIN entre DataFrames; `how=` controla o tipo (left/inner/outer)
- `pivot_table()` — formato longo → largo com agregação; `melt()` — largo → longo

**Visualização:**
- matplotlib: `fig, ax = plt.subplots()` + `ax.plot/bar/scatter/hist` — controle total
- seaborn: `sns.boxplot`, `sns.scatterplot`, `sns.heatmap` — estatística visual com menos código
- `df.plot(kind=)` — atalho rápido para gráficos simples direto do DataFrame
- No Colab, deixe o `fig` como última linha da célula para exibir o gráfico

**Fluxo típico de análise:**
1. Carregar → `pd.read_csv()` ou dados sintéticos com `np.random.normal`
2. Explorar → `head()`, `info()`, `describe()`, `isna().sum()`
3. Limpar → `fillna()`, `dropna()`, `rename()`, `astype()`
4. Filtrar → `query()`, `loc`, `between()`, `isin()`
5. Agregar → `groupby().agg()`, `pivot_table()`
6. Visualizar → matplotlib / seaborn
7. Exportar → `df.to_csv("resultado.csv", index=False)`

## Referências

- **Pandas documentation** — https://pandas.pydata.org/docs/
- **matplotlib documentation** — https://matplotlib.org/stable/contents.html
- **seaborn documentation** — https://seaborn.pydata.org/
- **pandas.DataFrame.plot** — https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.plot.html
- **Montgomery, D. C.** Introduction to Statistical Quality Control. Wiley, 2019.
- **Dataset — International Football Results (1872–2026)** — https://www.kaggle.com/datasets/martj42/international-football-results-from-1872-to-2017
