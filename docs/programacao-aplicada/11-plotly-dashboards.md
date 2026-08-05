# Análise Visual com matplotlib no Google Colab

## Roteiro

1. matplotlib no Google Colab: por que usar?
2. `plt.show()`: exibindo gráficos no notebook
3. `plt.scatter`: cores, tamanhos, labels
4. `plt.plot`: séries temporais de sensores
5. `plt.bar`: comparações entre categorias
6. `plt.hist` / `plt.boxplot`: distribuições
7. `plt.imshow`: heatmaps
8. Subplots: `plt.subplots`
9. Layout: células Markdown e seções
10. Customizações úteis do matplotlib
11. Estrutura de análise: filtros + gráficos
12. Persistência de dados no kernel
13. Exercícios práticos

## matplotlib no Google Colab: Por que Usar?

Até agora usamos **matplotlib** para gráficos estáticos. Ele funciona bem para relatórios impressos, e no **Google Colab** é a escolha certa: roda direto no navegador, sem instalação.

### O problema da instalação local

Ferramentas de dashboard interativo como Streamlit exigem instalação local (`pip install streamlit`) e podem falhar em laboratórios com rede restrita. No Colab, você só precisa de um navegador — todos os pacotes (matplotlib, pandas, numpy) já vêm prontos.

### A solução: matplotlib

**matplotlib** gera figuras estáticas em cada célula do notebook:

- **Renderização imediata**: cada célula mostra o gráfico na hora
- **Controle total**: você decide cada detalhe da figura
- **Sem dependências extras**: já instalado no Colab
- **Exportação**: salve como PNG/PDF com `plt.savefig`

```python
import matplotlib.pyplot as plt

# Uma linha gera um gráfico
plt.scatter(df["densidade"], df["modulo_E"])
plt.show()
```

### Funções básicas do matplotlib

| Função | Uso |
|---|---|
| `plt.scatter(x, y)` | Dispersão |
| `plt.plot(x, y)` | Linha |
| `plt.bar(x, y)` | Barras |
| `plt.hist(x, bins)` | Histograma |
| `plt.boxplot(x)` | Boxplot |
| `plt.imshow(matriz)` | Heatmap |

### Quando usar cada um

| Situação | Recomendação |
|---|---|
| Relatório impresso / PDF | matplotlib |
| Análise em notebook (Colab) | matplotlib |
| Publicação científica | matplotlib |
| Apresentação para cliente | matplotlib + PNG |
| Heatmap de correlação rápido | matplotlib |

> **Neste curso:** usamos matplotlib no Google Colab, que roda no navegador sem instalação. Interatividade (zoom, hover) é feita ao vivo na célula: você reexecuta com outros parâmetros.

## `plt.show()`: Exibindo Gráficos no Colab

No Colab, **sempre** usamos `plt.show()` para exibir o gráfico ao final da célula.

### Exemplo básico

```python
import matplotlib.pyplot as plt

# Criar o gráfico
plt.scatter(df["sepal_width"], df["sepal_length"])
plt.title("Sepal Width x Sepal Length")
plt.show()
```

### Funções de configuração da figura

| Função | Descrição |
|---|---|
| `plt.figure(figsize=(w, h))` | Tamanho da figura |
| `plt.title("...")` | Título |
| `plt.xlabel("...")` / `plt.ylabel("...")` | Rótulos dos eixos |
| `plt.legend()` | Mostra a legenda |
| `plt.tight_layout()` | Ajusta o espaçamento automaticamente |
| `plt.show()` | Exibe o gráfico na célula |
| `plt.savefig("grafico.png", dpi=300)` | Salva em arquivo |

### Salvando o gráfico

```python
plt.scatter(df["densidade"], df["modulo_E"])
plt.title("Dispersão de Materiais")
plt.savefig("dispersao.png", dpi=300)  # Salva sem precisar de plt.show()
```

> **Regra de ouro:** no Colab, sempre use `plt.show()` para exibir o gráfico no final da célula. Sem `plt.show()`, a última linha da célula é exibida automaticamente se for uma figura.

## `plt.scatter` — Gráfico de Dispersão

O scatter plot mostra a relação entre **duas variáveis numéricas**. É o gráfico mais usado em engenharia para identificar correlações.

### Sintaxe completa

```python
import matplotlib.pyplot as plt

plt.scatter(
    df["densidade"],                # Eixo X
    df["modulo_E"],                 # Eixo Y
    c=df["dureza"],                 # Cor por valor
    s=df["dureza"] / df["dureza"].max() * 200,  # Tamanho dos pontos
    cmap="viridis",                 # Escala de cor
    alpha=0.7,                      # Transparência
)
plt.colorbar(label="Dureza")
plt.title("Materiais — Módulo E x Densidade")
plt.xlabel("Densidade (kg/m³)")
plt.ylabel("Módulo de Elasticidade (GPa)")
plt.show()
```

### Parâmetros principais

| Parâmetro | O que faz | Exemplo |
|---|---|---|
| `x`, `y` | Dados dos eixos | `plt.scatter(x, y)` |
| `c` | Cor por valor ou categoria | `c=df["material"].astype("category").cat.codes` |
| `cmap` | Escala de cor | `cmap="viridis"` |
| `s` | Tamanho dos pontos | `s=df["dureza"]` |
| `alpha` | Transparência dos pontos | `alpha=0.7` |
| `label` | Nome para a legenda | `label="Aço"` |
| `marker` | Formato do ponto | `marker="o"` |

### Exemplo com linha de tendência

```python
import numpy as np

# Dispersão
plt.scatter(df["densidade"], df["modulo_E"], alpha=0.6, label="Dados")

# Regressão linear (OLS) manual
coef = np.polyfit(df["densidade"], df["modulo_E"], 1)
x_line = np.linspace(df["densidade"].min(), df["densidade"].max(), 100)
plt.plot(x_line, np.polyval(coef, x_line), color="red", label="Tendência (OLS)")

plt.legend()
plt.show()
```

> `np.polyfit` calcula a regressão linear (Ordinary Least Squares) e `np.polyval` avalia a linha ajustada.

## `plt.plot` — Séries Temporais de Sensores

O gráfico de linha mostra como uma variável muda ao longo do **tempo** ou de uma sequência ordenada.

### Exemplo básico

```python
fig, ax = plt.subplots(figsize=(10, 4))

for sensor_id, dados in df_sensor.groupby("sensor_id"):
    ax.plot(dados["timestamp"], dados["valor"],
            label=sensor_id, marker="o", markersize=3)

ax.set_title("Leituras do Sensor ao Longo do Tempo")
ax.set_xlabel("timestamp")
ax.set_ylabel("valor")
ax.legend()
plt.show()
```

### Zoom em séries temporais

Para séries longas, defina os limites do eixo X com `set_xlim`:

```python
plt.plot(df_sensor["timestamp"], df_sensor["valor"])
plt.xlim("2024-01-01", "2024-01-03")   # Zoom no período
plt.xticks(rotation=45)
plt.show()
```

### Preenchimento de área

```python
plt.plot(df["timestamp"], df["valor"])
plt.fill_between(df["timestamp"], df["valor"], alpha=0.3)  # Preenche até o eixo X
plt.show()
```

### Quando usar `plt.plot`

| Situação | Exemplo |
|---|---|
| Leituras de sensor ao longo do tempo | Temperatura do forno por hora |
| Evolução de produção | Peças produzidas por dia |
| Comparação de múltiplas séries | 3 sensores no mesmo gráfico |

## `plt.bar` — Comparações entre Categorias

O gráfico de barras compara **valores entre categorias**.

### Barras agrupadas vs empilhadas

```python
import numpy as np

# Tabela pivot: linhas = máquina, colunas = mês
pivot = df.pivot_table(index="maquina", columns="mes",
                       values="pecas", aggfunc="sum")

# Barras agrupadas (lado a lado)
pivot.plot(kind="bar", title="Produção por Máquina e Mês")
plt.show()

# Barras empilhadas
pivot.plot(kind="bar", stacked=True, title="Produção Total por Máquina")
plt.show()
```

| Visualização | matplotlib | Quando usar |
|---|---|---|
| Lado a lado | `plot(kind="bar")` | Comparar valores individuais |
| Empilhadas | `plot(kind="bar", stacked=True)` | Ver o total e a contribuição de cada parte |
| Horizontais | `plot(kind="barh")` | Categorias com nomes longos |

### Valores nas barras

```python
ax = pivot.plot(kind="bar")
for container in ax.containers:
    ax.bar_label(container, fmt="%.0f")  # Mostra os valores sobre as barras
plt.show()
```

### Barras horizontais

```python
pivot.plot(kind="barh")
plt.show()
```

> Use `kind="barh"` quando os nomes das categorias são longos.

## `plt.hist` / `plt.boxplot` — Distribuições

### Histograma: distribuição de uma variável

O histograma mostra **como os valores estão distribuídos**.

```python
plt.hist(df["dureza"], bins=20, alpha=0.5, label="todos")

for material in df["material"].unique():
    plt.hist(df[df["material"] == material]["dureza"],
             bins=20, alpha=0.5, label=material)

plt.xlabel("Dureza")
plt.ylabel("Frequência")
plt.legend()
plt.title("Distribuição de Dureza")
plt.show()
```

| Parâmetro | O que faz |
|---|---|
| `bins` | Número de barras |
| `density` | Normaliza (frequência relativa) |
| `alpha` | Transparência (sobreposição) |
| `cumulative` | Distribuição acumulada |
| `histtype` | `"bar"`, `"step"`, `"stepfilled"` |

### Boxplot: resumo visual da distribuição

O boxplot mostra mediana, quartis e outliers em um único gráfico.

```python
# Boxplot simples
plt.boxplot(df["dureza"].values, showmeans=True)
plt.title("Distribuição de Dureza")
plt.show()

# Boxplot por material
grupos = [df[df["material"] == m]["dureza"] for m in df["material"].unique()]
plt.boxplot(grupos, labels=df["material"].unique())
plt.title("Distribuição de Dureza por Material")
plt.show()
```

### Como ler um boxplot

```
        ┌───┐  ← Q3 (75º percentil)
        │   │
    ────┤   ├────  ← Mediana (50º percentil)
        │   │
        └───┘  ← Q1 (25º percentil)
      │         ← Whiskers (1.5×IQR)
      ○         ← Outliers (fora dos whiskers)
```

| Elemento | Significado |
|---|---|
| Linha central | Mediana (valor do meio) |
| Caixa | Intervalo interquartil (Q1 a Q3) — onde estão 50% dos dados |
| Whiskers (bigodes) | 1.5× o intervalo interquartil |
| Pontos fora dos whiskers | Outliers (valores atípicos) |

> **Dica de engenharia:** outliers em ensaios mecânicos podem indicar defeitos no corpo de prova ou erro de medição.

## `plt.imshow` — Heatmaps

Heatmaps (mapas de calor) representam valores como **cores em uma matriz**. São ideais para matrizes de correlação.

### Heatmap de correlação

```python
# Calcular matriz de correlação
corr = df[["densidade", "modulo_E", "escoamento", "dureza"]].corr()

# Criar heatmap
fig, ax = plt.subplots(figsize=(8, 6))
im = ax.imshow(corr, cmap="RdBu_r", vmin=-1, vmax=1)
ax.set_xticks(range(len(corr)), corr.columns, rotation=45)
ax.set_yticks(range(len(corr)), corr.columns)
for i in range(len(corr)):
    for j in range(len(corr)):
        ax.text(j, i, f"{corr.iloc[i, j]:.2f}",
                ha="center", va="center")  # Mostra os valores nas células
plt.colorbar(im, label="Correlação")
plt.title("Matriz de Correlação — Propriedades dos Materiais")
plt.tight_layout()
plt.show()
```

### Escalas de cor comuns

| Escala | Uso |
|---|---|
| `"RdBu_r"` | Correlação (vermelho = negativo, azul = positivo) |
| `"viridis"` | Dados gerais (perceptualmente uniforme) |
| `"YlOrRd"` | Intensidade (amarelo → laranja → vermelho) |
| `"Blues"` | Dados sequenciais |
| `"coolwarm"` | Divergente (azul → vermelho) |

### Como interpretar a correlação

| Valor | Interpretação |
|---|---|
| `+1.0` | Correlação positiva perfeita |
| `+0.7 a +0.9` | Correlação positiva forte |
| `+0.3 a +0.7` | Correlação positiva moderada |
| `0.0` | Sem correlação linear |
| `-0.3 a -0.7` | Correlação negativa moderada |
| `-0.7 a -0.9` | Correlação negativa forte |
| `-1.0` | Correlação negativa perfeita |

> **Cuidado:** correlação não implica causalidade. Duas variáveis podem estar correlacionadas por causa de uma terceira variável não observada.

## Subplots com `plt.subplots`

Quando você precisa combinar **múltiplos gráficos em uma única figura**, usa `plt.subplots`. Cada subplot é um objeto `Axes` acessado por índice.

### Conceito

```
  ┌──────────────────────────────────────────┐
  │              Figura (fig)                │
  ├─────────────────┬────────────────────────┤
  │   Subplot 1     │     Subplot 2          │
  │   (axs[0])      │     (axs[1])           │
  │                 │                        │
  └─────────────────┴────────────────────────┘
```

### Exemplo passo a passo

```python
# 1. Criar a estrutura de subplots (1 linha, 2 colunas)
fig, axs = plt.subplots(1, 2, figsize=(10, 4))

# 2. Desenhar cada subplot
axs[0].hist(df["dureza"], bins=20)
axs[0].set_title("Histograma")
axs[0].set_xlabel("Dureza")

axs[1].boxplot(df["dureza"].values)
axs[1].set_title("Boxplot")
axs[1].set_ylabel("Dureza")

# 3. Ajustar layout geral
plt.tight_layout()
plt.show()
```

### Múltiplas linhas e colunas

```python
fig, axs = plt.subplots(2, 2, figsize=(10, 8))

axs[0, 0].scatter(df["x"], df["y"])
axs[0, 0].set_title("Dispersão")

axs[0, 1].hist(df["x"], bins=20)
axs[0, 1].set_title("Histograma")

axs[1, 0].boxplot(df["y"].values)
axs[1, 0].set_title("Boxplot")

axs[1, 1].plot(df["time"], df["value"])
axs[1, 1].set_title("Linha")

plt.tight_layout()
plt.show()
```

### Métodos de desenho disponíveis

| Método | Uso |
|---|---|
| `ax.scatter(...)` | Dispersão / linha |
| `ax.hist(...)` | Histograma |
| `ax.boxplot(...)` | Boxplot |
| `ax.bar(...)` | Barras |
| `ax.imshow(...)` | Mapa de calor |
| `ax.pie(...)` | Pizza |

> **Regra:** `plt.subplots` cria a estrutura. `axs[...]` acessa cada subplot. `plt.tight_layout()` ajusta o espaçamento.

## Layout: Células Markdown e Seções

Um bom notebook não é só sobre gráficos — é sobre **organização visual**. No Colab, usamos células Markdown com cabeçalhos (`##`, `###`) para estruturar a análise.

### Gráficos lado a lado

```python
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))

ax1.hist(df["dureza"], bins=20)
ax1.set_title("Histograma de Dureza")

ax2.boxplot(df["dureza"].values)
ax2.set_title("Boxplot de Dureza")

plt.tight_layout()
plt.show()
```

### Seções colapsáveis (expandir/ocultar)

Células Markdown com detalhes que nem todos precisam ver. No Colab, separe o trecho colapsável em uma célula Markdown com cabeçalho:

```markdown
## Resultados Principais
```


### Abas de navegação (tabs)

No Colab, dividimos em células separadas com cabeçalhos:

```python
# ── Célula 1 ──
# ## Gráficos
fig, ax = plt.subplots()
ax.scatter(df["x"], df["y"])
plt.show()
```

```python
# ── Célula 2 ──
# ## Tabela
print(df)
```

```python
# ── Célula 3 ──
# ## Estatísticas
print(df.describe())
```

### Quando usar cada elemento

| Elemento | No Colab |
|---|---|
| `st.columns` | `plt.subplots(1, N)` para gráficos lado a lado |
| `st.expander` | Células Markdown com cabeçalho (`##`) para trechos colapsáveis |
| `st.tabs` | Seções `##` do notebook, uma célula por seção |

## Customizações Úteis do matplotlib

matplotlib permite customizar quase tudo: título, eixos, grid, estilos, cores e anotações.

### Configuração geral da figura

```python
fig, ax = plt.subplots(figsize=(8, 6))
ax.scatter(df["x"], df["y"], alpha=0.8, color="steelblue",
           edgecolors="darkblue", s=40)
ax.set_title("Título do Gráfico", fontsize=14)
ax.set_xlabel("Eixo X")
ax.set_ylabel("Eixo Y")
ax.grid(True, linestyle="--", color="lightgray")
ax.legend()
plt.tight_layout()
plt.show()
```

### Estilos disponíveis

| Estilo | Aparência |
|---|---|
| `"ggplot"` | Estilo R/ggplot2 |
| `"seaborn-v0_8"` | Estilo Python/seaborn |
| `"dark_background"` | Fundo escuro |
| `"default"` | Padrão (fundo branco) |

```python
plt.style.use("ggplot")
```

### Linhas e regiões de referência

```python
# Linha horizontal (ex: limite de especificação)
plt.axhline(y=100, linestyle="--", color="red", label="Limite Superior")

# Linha vertical (ex: média)
plt.axvline(x=50, linestyle=":", color="green")

# Região vertical (ex: período de manutenção)
plt.axvspan(10, 30, color="red", alpha=0.2, label="Manutenção")

# Região horizontal (ex: zona de alerta)
plt.axhspan(90, 110, color="yellow", alpha=0.15, label="Zona de alerta")

plt.legend()
plt.show()
```

### Eixos customizados

```python
fig, ax = plt.subplots(figsize=(8, 4))
ax.plot(df["time"], df["value"])
ax.set_xlim(0, 100)             # Limites do eixo
ax.set_xlabel("Tempo (h)")
ax.set_ylabel("Temperatura (°C)")
ax.grid(True, color="lightgray")
plt.xticks(rotation=45)         # Rotaciona rótulos longos
plt.show()
```

## Estrutura de Análise: Filtros + Gráficos

O padrão mais comum separa **filtros** (variáveis no topo da célula) de **resultados** (gráficos e `print()`).

### Estrutura típica

```python
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

# ──────────────────────────────────────────
# FILTROS: valores definidos como variáveis
# ──────────────────────────────────────────
tipo = "Aço"                  # ["Todos", "Aço", "Alumínio", "Latão"]
faixa = (100, 500)            # Faixa de tensão (MPa)
mostrar_outliers = True

# ──────────────────────────────────────────
# MAIN: Dados + Gráficos
# ──────────────────────────────────────────
df = gerar_dados()

# Aplicar filtros
if tipo != "Todos":
    df = df[df["material"] == tipo]
df = df[df["tensao_max"].between(*faixa)]

# Métricas
print(f"Materiais: {len(df)}")
print(f"Tensão média: {df['tensao_max'].mean():.0f} MPa")
print(f"Dureza média: {df['dureza'].mean():.0f} HB")

# Gráficos lado a lado
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))
ax1.scatter(df["densidade"], df["modulo_E"],
            c=df["material"].astype("category").cat.codes)
ax1.set_title("Densidade x Módulo E")
ax2.hist(df["tensao_max"], bins=20)
ax2.set_title("Histograma de Tensão")
plt.tight_layout()
plt.show()

# Tabela
print(df)
```

### Princípios de design

| Princípio | Descrição |
|---|---|
| Filtros no topo | Variáveis definidas no início da célula |
| Métricas no topo | `print()` com KPIs antes dos gráficos |
| Gráficos em subplots | Aproveita a largura da figura |
| Tabela no final | `print(df)` depois da visão geral |
| `plt.show()` no final | Exibe a figura na célula |

## Persistência de Dados no Kernel

No Colab, as variáveis de célula persistem no kernel entre execuções. Não é preciso re-criar os dados a cada célula.

### O problema

```python
# Sem persistência — dados são regenerados a cada execução da célula!
df = gerar_dados()  # Roda de novo toda vez que a célula é executada
```

### A solução

Separe a geração dos dados em uma célula própria e execute-a uma única vez:

```python
# ── Célula 1: gerar dados (rode uma vez) ──
np.random.seed(42)
df = pd.DataFrame({
    "material": np.random.choice(["Aço", "Al", "Latão"], 100),
    "tensao_max": np.random.normal(350, 50, 100),
    "dureza": np.random.normal(180, 30, 100),
})
```

```python
# ── Célula 2: usar os dados (sem regenerar) ──
print(df.head())
df.plot.scatter(x="tensao_max", y="dureza")
plt.show()
```

Para **regenerar** os dados, reexecute a Célula 1 (por exemplo com `np.random.seed()` diferente).

> **Dica:** no Colab, variáveis de célula persistem no kernel. Use `.copy()` ao filtrar para não modificar o DataFrame original.

## Exercício 9.1 — Scatter Plot de Materiais

**Contexto:** DataFrame de materiais com propriedades mecânicas.

**Base:** 80 amostras com material, densidade, modulo_E, escoamento, dureza.

**O que a análise deve ter:**

- Variáveis `eixo_x` e `eixo_y` no topo da célula para escolher as colunas
- `plt.scatter` com `c=material` (categorias), tamanho por dureza, transparência
- Título, rótulos dos eixos e legenda
- `plt.show()`

## Exercício 9.2 — Série Temporal de Sensor

**Contexto:** 500 leituras de 3 sensores ao longo de 7 dias.

**O que a análise deve ter:**

- Variável `sensor_id` para selecionar o sensor (filtre o DataFrame)
- Variáveis `data_inicio` e `data_fim` para o intervalo de datas
- `plt.plot` com limites no eixo X
- `print(f"Média do período: {…}")`
- Dados persistindo no kernel (célula de geração separada)

## Exercício 9.3 — Produção por Máquina (Bar)

**Contexto:** Dados de produção mensal por máquina (CNC-1, CNC-2, Torno, Fresa).

**O que a análise deve ter:**

- Variável `modo` com valores `"agrupado"` ou `"empilhado"`
- `pivot.plot(kind="bar")` ou `stacked=True` conforme o modo
- Valores sobre as barras com `ax.bar_label()`
- `plt.show()`

## Exercício 9.4 — Histograma + Boxplot de Dureza

**Contexto:** 200 medidas de dureza.

**O que a análise deve ter:**

- `plt.subplots(1, 2)` com histograma e boxplot
- Variável `n_bins` para o número de bins
- Variável `mostrar_media` (True/False) para adicionar `axvline` na média
- `plt.tight_layout()` e `plt.show()`

## Exercício 9.5 — Heatmap de Correlação

**Contexto:** DataFrame de materiais com 5+ propriedades.

**O que a análise deve ter:**

- `df.corr()` + `plt.imshow` com valores nas células
- Variável `tipo` para filtrar por tipo de material
- `print()` com as correlações mais fortes
- `cmap="RdBu_r"` e `colorbar`

## Exercício 9.6 — Análise de Monitoramento

**Contexto:** Notebook multi-seção para monitoramento de sensores.

**Seções (use `##` do Markdown):**

1. **Leituras:** `plt.plot` + `print(df_filtrado)` 
2. **Estatísticas:** `print()` + `plt.boxplot`
3. **Alarmes:** leituras > threshold destacadas em vermelho

**Filtros no topo da célula:**

- Variável `sensor_id`
- Variáveis `data_inicio` e `data_fim`
- Variável `threshold`
- Para atualizar dados, reexecute a célula de geração

## Mini-Projeto 9 — Análise de Controle de Qualidade

**Contexto:** Análise para linha de produção com 1000 amostras.

**Dados:** Parafuso M8 (alvo 8.0 mm, tol 0.15), Porca M8 (alvo 8.2 mm, tol 0.12), Arruela (alvo 2.0 mm, tol 0.10). ~5% outliers.

**Seções obrigatórias:**

1. **Visão Geral:** `print()` com métricas, `plt.bar` produção por linha, `plt.pie` taxa de aprovação
2. **Análise por Produto:** `plt.scatter` medida vs alvo, `plt.hist` com LSL/USL, `plt.boxplot` por linha
3. **Série Temporal:** `plt.plot` com limites, realçar pontos reprovados com cor
4. **Detalhes:** `print(df)` com dados completos, `df.to_csv("dados.csv")` para exportar

**Requisitos técnicos:**

- Persistir dados no kernel (variáveis entre células)
- Reexecutar a célula de geração para "regenerar" os dados
- Figuras com `figsize` e `plt.show()` no final de cada célula

## Resumo da aula

- matplotlib: `plt.plot()`, `plt.bar()`, `plt.scatter()`, `plt.hist()`, `plt.boxplot()`, `plt.imshow()`
- Personalização: `plt.title()`, `plt.xlabel()`, `plt.ylabel()`, `plt.legend()`, `plt.tight_layout()`
- Subplots: `plt.subplots()` com `axs[i, j]`
- `plt.show()` exibe gráficos no Colab
- Estrutura de análise: variáveis de filtro + `print()` + figuras com `plt.show()`

## Referências

- **matplotlib Quick Start** — https://matplotlib.org/stable/tutorials/introductory/quick_start.html
- **matplotlib Subplots** — https://matplotlib.org/stable/gallery/subplots_axes_and_figures/subplots_demo.html
- **matplotlib Colormaps** — https://matplotlib.org/stable/users/explain/colors/colormaps.html
- **matplotlib Style Sheets** — https://matplotlib.org/stable/gallery/style_sheets/style_sheets_reference.html
