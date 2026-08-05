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
8. Pivot tables: melt, pivot_table, cross-tabulation
9. matplotlib básico: plt.plot, plt.scatter, plt.hist
10. seaborn: scatterplot, boxplot, heatmap
11. Visualização com pandas plot e matplotlib
12. Persistência de variáveis no kernel do Colab
13. Exercícios práticos

## DataFrame e Series

Pandas é a biblioteca do Python para manipulação de dados tabulares. Pense nela como uma **planilha do Excel dentro do Python**, mas com poder de programação.

### Series: uma coluna com índice

Uma **Series** é como uma coluna de planilha: cada valor tem um rótulo (índice).

```python
import pandas as pd

# Series: coluna única com índice
tensoes = pd.Series([350, 240, 200], name="tensao_max")
print(tensoes)
# 0    350
# 1    240
# 2    200
# Name: tensao_max, dtype: int64
```

O índice começa em 0 por padrão, mas pode ser personalizado:

```python
tensoes = pd.Series([350, 240, 200],
                    index=["CP-01", "CP-02", "CP-03"],
                    name="tensao_max")
print(tensoes["CP-02"])  # 240
```

### DataFrame: a tabela completa

Um **DataFrame** é um conjunto de Series compartilhando o mesmo índice — ou seja, uma tabela.

```python
df = pd.DataFrame({
    "material": ["Aço 1020", "Al 6061", "Latão"],
    "tensao_max": [350, 240, 200],
    "modulo_E": [210000, 69000, 97000]
})
```

```
    material  tensao_max  modulo_E
0   Aço 1020         350    210000
1    Al 6061         240     69000
2      Latão         200     97000
```

Cada coluna é uma Series. Cada linha é um registro.

### Atributos importantes

```python
print(df.shape)     # (3, 3) → 3 linhas, 3 colunas
print(df.columns)   # Index(['material', 'tensao_max', 'modulo_E'])
print(df.dtypes)    # material      object
                    # tensao_max     int64
                    # modulo_E       int64
```

| Atributo | O que retorna | Uso típico |
|---|---|---|
| `df.shape` | Tupla (linhas, colunas) | Verificar tamanho |
| `df.columns` | Nomes das colunas | Renomear, verificar |
| `df.dtypes` | Tipo de cada coluna | Detectar erros de tipo |
| `df.index` | Índice das linhas | Reindexar |

## Primeiro contato: Pandas + NumPy (da aula 08)

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

## Exercício 8.1 — Carregar e Limpar Dados de Ensaios

**Contexto:** Dados de ensaios mecânicos com falhas de preenchimento.

**Dados iniciais:**
```python
dados = {
    "amostra": ["CP-01","CP-02","CP-03","CP-04","CP-05"],
    "material": ["Aço","Alumínio","Aço",None,"Latão"],
    "tensao_max": [450, 240, None, 320, 200],
    "modulo_E": [210000, 69000, 205000, None, 97000],
    "alongamento": [12.5, 18.0, 10.2, 15.8, None],
    "dureza": [180, 95, None, None, 110]
}
df = pd.DataFrame(dados)
```

**O que o notebook deve ter:**

- Exibir dados originais (`df.head()`) e destacar nulos com `df.isna().sum()`
- Definir variáveis no topo da célula: `remover_nulos = True` (usa `dropna()`) e `preencher = "media"` (opções: `"media"` / `"zero"` / `"nenhum"`)
- Preencher nulos de colunas selecionadas com `fillna()`
- Exibir resultado da limpeza (`df.head()` ou `df`)
- Como no Colab as variáveis persistem no kernel, os dados limpos ficam disponíveis nas células seguintes

## Exercício 8.2 — Filtrar Materiais por Propriedade

**Contexto:** Selecionar materiais por faixa de tensão máxima e tipo.

**Dados:** DataFrame com 15+ materiais (Aço, Alumínio, Latão, Titânio, PVC, Cobre, Bronze).

**O que o notebook deve ter:**

- Definir no topo da célula: `tensao_min = 200` e `tensao_max = 400`
- Definir `tipo = "Aço"` (valores: "Todos" / "Aço" / "Alumínio" / "Outros")
- Aplicar `between()` + `str.contains()` para filtrar
- Exibir resultados com `df.head()` ou `df`
- `print(f"Materiais encontrados: {len(resultado)}")`

## Exercício 8.3 — Estatísticas por Grupo (GroupBy)

**Contexto:** Dados de ensaios de tração de vários materiais (15-20 amostras, 3+ materiais).

**O que o notebook deve ter:**

- Gerar dados sintéticos com `np.random.normal` para cada material
- Definir `coluna_alvo = "tensao_max"` no topo da célula (valores: tensao_max, modulo_E, alongamento)
- Tabela com `groupby().agg()` (mean, std, min, max, count)
- `df.groupby("material")[coluna_alvo].mean().plot(kind="bar")` da média por material
- `print()` com interpretação: qual material tem melhor desempenho?

## Exercício 8.4 — Merge de Dados de Material + Fornecedor

**Contexto:** Juntar catálogo de materiais com tabela de fornecedores.

**Dados:**
```python
materiais = pd.DataFrame({
    "id": [1, 2, 3],
    "nome": ["Aço", "Alumínio", "Latão"],
    "densidade": [7850, 2700, 8500],
})
fornecedores = pd.DataFrame({
    "id": [1, 2, 3],
    "nome_material": ["Aço", "Alumínio", "Latão"],
    "preco_kg": [8.50, 15.20, 22.00],
    "prazo_dias": [15, 20, 10]
})
```

**O que o notebook deve ter:**

- Fazer merge com `left_on` / `right_on`
- Calcular `custo_peca = densidade * preco_kg / 1000`
- Exibir colunas: nome, fornecedor, densidade, preco_kg, custo_peca, prazo_dias
- `print(f"Mais barato: {df_enriquecido['custo_peca'].min()}")` / `print(f"Mais caro: {df_enriquecido['custo_peca'].max()}")` para destacar os extremos de custo

## Exercício 8.5 — Pivot Table de Produção Mensal

**Contexto:** Produção diária de 3 máquinas (90 linhas simulando 3 meses).

**O que o notebook deve ter:**

- Gerar dados sintéticos: mes, maquina, pecas (90 linhas)
- `pivot_table` com mes × maquina
- Coluna "Total" por mês
- Heatmap do pivot com `sns.heatmap` (matplotlib + seaborn), deixando o `fig` na última linha da célula
- `print()` com a máquina mais produtiva por mês

## Exercício 8.6 — Correlação de Propriedades (seaborn)

**Contexto:** 50 materiais com densidade, módulo_E, tensão_escoamento, dureza, alongamento.

**O que o notebook deve ter:**

- Gerar dados sintéticos com correlações realistas
- `sns.heatmap` da matriz de correlação com `annot=True` (deixar `fig` na última linha)
- Interpretação textual: quais pares têm maior correlação positiva e negativa?
- Opcional: `sns.pairplot` (o Colab exibe o pairplot diretamente como saída da célula)

## Exercício 8.7 — Dashboard de Qualidade (CEP)

**Contexto:** Controle estatístico de processo — eixos com diâmetro alvo de 50 mm e tolerância ±0.1 mm.

**Fórmulas:**

$Cp = \frac{LSE - LIE}{6\sigma}$

$Cpk = \min\left(\frac{media - LIE}{3\sigma}, \frac{LSE - media}{3\sigma}\right)$

**O que o notebook deve ter:**

- Gerar 50+ medidas com `np.random.normal(loc=50, scale=0.03)`
- Histograma com linhas LIE/LSE/target (matplotlib)
- Boxplot por batch
- Calcular e exibir Cp e Cpk com `print(f"Cp = {cp:.2f}")` / `print(f"Cpk = {cpk:.2f}")`
- Interpretação: Cp > 1.33 = processo capaz

## Mini-Projeto 8 — Analisador de Ensaios Mecânicos

**Funcionalidades obrigatórias:**

- Upload CSV via `from google.colab import files` (ou dados de exemplo)
- Opções de limpeza (fillna / dropna) — defina as escolhas como variáveis no topo da célula
- Filtros por variáveis definidas no topo da célula (faixa de tensão + tipo)
- GroupBy stats por material
- Scatter plot tensão × alongamento (matplotlib/seaborn)
- Heatmap de correlação (seaborn)
- Export CSV filtrado (`from google.colab import files` + `files.download("resultado.csv")`)

## Exercício 10.1 — DataFrame de Materiais a partir de NumPy

**Dados:**
```python
nomes = ["Aço", "Alumínio", "Latão", "Titânio", "PVC"]
densidade = [7850, 2700, 8500, 4430, 1380]
modulo_E = [210, 69, 97, 116, 3]  # GPa
```

**O que o notebook deve ter:**
- Criar DataFrame com colunas: `material`, `densidade`, `modulo_E`
- Adicionar coluna calculada: `relacao = modulo_E / densidade * 1000`
- Ordenar por `relacao` decrescente (`df.sort_values`)
- Exibir `df.describe()`
- Gráfico de barras com `df.plot(kind="bar")`

## Exercício 10.2 — Dashboard de Materiais com GroupBy

**Contexto:** Gerar dados sintéticos de ensaios de tração para 4 materiais e construir um dashboard analítico.

| Material | Tensão μ/σ (MPa) | Módulo E μ/σ (GPa) | Densidade (kg/m³) |
|---|---|---|---|
| Aço | 420 / 25 | 210 / 10 | 7850 |
| Alumínio | 280 / 20 | 70 / 8 | 2700 |
| Latão | 350 / 30 | 100 / 12 | 8500 |
| Titânio | 520 / 35 | 115 / 10 | 4430 |

**Funcionalidades obrigatórias:**
- Gerar 20 amostras por material com `np.random.normal`
- Exibir os dados com `df.head()`
- Estatísticas por material com `groupby`
- Coluna calculada: resistência específica = tensão / densidade
- Gráfico de barras com `df.plot(kind="bar")`
- Re-executar a célula de geração de dados para "regenerar" os dados (variáveis persistem no kernel do Colab)
- Exportar dados filtrados como CSV (`df.to_csv("resultado.csv")` + `files.download("resultado.csv")`)

## Resumo da aula

- `groupby()` agrupa dados por categoria e aplica agregacões (`mean`, `sum`, `count`)
- `merge()` combina DataFrames como JOIN em SQL — essencial para dados relacionais
- `pivot_table()` reorganiza dados em formato de tabela dinâmica
- matplotlib: `plt.plot()`, `plt.scatter()`, `plt.bar()` — gráficos estáticos customizáveis
- seaborn: `sns.boxplot()`, `sns.heatmap()` — gráficos estatísticos com pouco código
- No Colab, deixe o `fig` como última linha da célula (ou `plt.show()`) para exibir gráficos matplotlib/seaborn

## Referências

- **Pandas documentation** — https://pandas.pydata.org/docs/
- **matplotlib documentation** — https://matplotlib.org/stable/contents.html
- **seaborn documentation** — https://seaborn.pydata.org/
- **pandas.DataFrame.plot** — https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.plot.html
- **Montgomery, D. C.** Introduction to Statistical Quality Control. Wiley, 2019.
