# Plotly + Dashboards Interativos

## Roteiro

1. Plotly Express vs matplotlib: por que interativo?
2. `st.plotly_chart`: renderizando gráficos no Streamlit
3. `px.scatter`: cores, tamanhos, hover
4. `px.line`: séries temporais de sensores
5. `px.bar`: comparações entre categorias
6. `px.histogram` / `px.box`: distribuições
7. `px.imshow`: heatmaps interativos
8. Subplots: `make_subplots`
9. Layout: columns, expander, tabs, container
10. Customizações úteis do Plotly
11. Dashboard patterns: sidebar + gráficos
12. Persistência de dados com `st.session_state`
13. Exercícios práticos

## Plotly Express vs matplotlib: Por que Interativo?

Até agora usamos **matplotlib** para gráficos estáticos. Ele funciona bem para relatórios impressos, mas em aplicações web perdemos uma vantagem enorme: a **interatividade**.

### O problema dos gráficos estáticos

Imagine que você gera um gráfico de dispersão com 200 pontos de dados de sensores. No matplotlib, você vê uma imagem fixa. Se quiser saber o valor exato de um ponto específico, precisa estimar visualmente. Se quiser ver apenas um período de tempo, precisa gerar outro gráfico.

### A solução: Plotly Express

**Plotly Express** gera gráficos em HTML/JavaScript. O resultado é interativo por padrão:

- **Zoom**: clique e arraste para ampliar uma região
- **Pan**: segure e arraste para navegar
- **Hover**: passe o mouse sobre um ponto para ver todos os dados
- **Legenda clicável**: clique em um item da legenda para mostrar/esconder
- **Download**: botão para salvar como PNG
- **Reset**: botão para voltar ao zoom original

```python
import plotly.express as px

# Uma linha gera um gráfico interativo completo
fig = px.scatter(df, x="densidade", y="modulo_E", color="material")
```

### Comparação detalhada

| Característica | matplotlib | Plotly Express |
|---|---|---|
| Saída | Imagem estática (.png) | HTML interativo |
| Zoom/Pan | Não | ✅ Sim |
| Tooltip (hover) | Não | ✅ Dados ao passar o mouse |
| Legenda interativa | Não | ✅ Clique para filtrar |
| Download | Programático | ✅ Botão embutido |
| Código | Verboso (5-10 linhas) | Conciso (1-3 linhas) |
| Curva de aprendizado | Média | Baixa |
| Customização avançada | ✅ Total | Parcial (mas suficiente) |

### Quando usar cada um

| Situação | Recomendação |
|---|---|
| Relatório impresso / PDF | matplotlib |
| Dashboard web interativo | Plotly Express |
| Publicação científica | matplotlib |
| Apresentação para cliente | Plotly Express |
| Heatmap de correlação rápido | Plotly Express |
| Gráfico com customização extrema | matplotlib |

> **Neste curso:** usamos Plotly Express para dashboards Streamlit e matplotlib quando precisamos de controle total ou gráficos para publicação.

## `st.plotly_chart`: Renderizando no Streamlit

No Streamlit, **nunca** usamos `fig.show()`. O método correto é `st.plotly_chart()`.

### Exemplo básico

```python
import streamlit as st
import plotly.express as px

# Criar o gráfico
fig = px.scatter(df, x="sepal_width", y="sepal_length",
                 color="species", size="petal_length")

# Renderizar no Streamlit
st.plotly_chart(fig, use_container_width=True)
```

### Parâmetros de `st.plotly_chart`

| Parâmetro | Tipo | Descrição | Recomendado |
|---|---|---|---|
| `use_container_width` | `bool` | Ajusta largura ao container pai | `True` |
| `theme` | `str` | Tema do gráfico | `"streamlit"` |
| `scrolling` | `bool` | Rolagem vertical se gráfico for alto | `False` |
| `config` | `dict` | Configurações da barra de ferramentas | Ver abaixo |
| `key` | `str` | Identificador único (para reruns) | Opcional |

### Configurações da barra de ferramentas

A barra de ferramentas do Plotly (modebar) tem botões como zoom, pan, download. Você pode customizá-la:

```python
config = {
    "displayModeBar": True,        # Mostrar barra de ferramentas
    "modeBarButtonsToRemove": ["lasso2d", "select2d"],  # Remover botões
    "displaylogo": False,          # Remover logo do Plotly
}

st.plotly_chart(fig, use_container_width=True, config=config)
```

> **Regra de ouro:** sempre use `st.plotly_chart(fig, use_container_width=True)` no Streamlit. Nunca use `fig.show()`.

## `px.scatter` — Gráfico de Dispersão Interativo

O scatter plot mostra a relação entre **duas variáveis numéricas**. É o gráfico mais usado em engenharia para identificar correlações.

### Sintaxe completa

```python
import plotly.express as px

fig = px.scatter(
    df,                    # DataFrame
    x="densidade",         # Coluna do eixo X
    y="modulo_E",          # Coluna do eixo Y
    color="tipo",          # Cor por categoria
    size="dureza",         # Tamanho dos pontos por valor
    hover_data=["escoamento", "dureza"],  # Dados extras no tooltip
    title="Materiais — Módulo E x Densidade",
    labels={"densidade": "Densidade (kg/m³)",
            "modulo_E": "Módulo de Elasticidade (GPa)"},
)
st.plotly_chart(fig, use_container_width=True)
```

### Parâmetros principais

| Parâmetro | O que faz | Exemplo |
|---|---|---|
| `x`, `y` | Colunas numéricas dos eixos | `x="densidade"`, `y="modulo_E"` |
| `color` | Coluna categórica para cores | `color="material"` |
| `size` | Coluna numérica para tamanho | `size="dureza"` |
| `hover_data` | Colunas extras no tooltip | `hover_data=["escoamento"]` |
| `title` | Título do gráfico | `title="Tensão × Dureza"` |
| `labels` | Renomear eixos e legendas | `labels={"x": "Novo nome"}` |
| `trendline` | Linha de tendência | `trendline="ols"` |
| `opacity` | Transparência dos pontos | `opacity=0.7` |

### Exemplo com linha de tendência

```python
fig = px.scatter(df, x="densidade", y="modulo_E",
                 color="material", trendline="ols")
st.plotly_chart(fig, use_container_width=True)
```

> `trendline="ols"` adiciona uma regressão linear (Ordinary Least Squares) para cada categoria.

## `px.line` — Séries Temporais de Sensores

O gráfico de linha mostra como uma variável muda ao longo do **tempo** ou de uma sequência ordenada.

### Exemplo básico

```python
fig = px.line(
    df_sensor,
    x="timestamp",
    y="valor",
    color="sensor_id",
    title="Leituras do Sensor ao Longo do Tempo",
    markers=True,  # Mostrar pontos
)
st.plotly_chart(fig, use_container_width=True)
```

### Range slider: zoom em séries temporais

Para séries longas, o `rangeslider` permite zoom interativo:

```python
fig = px.line(df_sensor, x="timestamp", y="valor", color="sensor_id")
fig.update_xaxes(rangeslider_visible=True)
st.plotly_chart(fig, use_container_width=True)
```

O rangeslider aparece como uma barra na parte inferior do gráfico. Arraste as alças para selecionar um período.

### Preenchimento de área

```python
fig = px.line(df, x="timestamp", y="valor", color="sensor_id")
fig.update_traces(fill="tozeroy")  # Preencher até o eixo X
st.plotly_chart(fig, use_container_width=True)
```

### Quando usar `px.line`

| Situação | Exemplo |
|---|---|
| Leituras de sensor ao longo do tempo | Temperatura do forno por hora |
| Evolução de produção | Peças produzidas por dia |
| Comparação de múltiplas séries | 3 sensores no mesmo gráfico |

## `px.bar` — Comparações entre Categorias

O gráfico de barras compara **valores entre categorias**.

### Barras agrupadas vs empilhadas

```python
# Barras agrupadas (lado a lado)
fig = px.bar(df, x="maquina", y="pecas", color="mes",
             barmode="group", title="Produção por Máquina e Mês")

# Barras empilhadas
fig = px.bar(df, x="maquina", y="pecas", color="mes",
             barmode="stack", title="Produção Total por Máquina")
```

| `barmode` | Visualização | Quando usar |
|---|---|---|
| `"group"` | Barras lado a lado | Comparar valores individuais |
| `"stack"` | Barras empilhadas | Ver o total e a contribuição de cada parte |
| `"relative"` | Barras empilhadas com negativos | Dados com valores positivos e negativos |

### Valores nos barras

```python
fig = px.bar(df, x="maquina", y="pecas", color="mes",
             barmode="group", text_auto=True)
```

`text_auto=True` mostra os valores diretamente sobre as barras.

### Barras horizontais

```python
fig = px.bar(df, x="pecas", y="maquina", orientation="h",
             color="mes", barmode="group")
```

> Use `orientation="h"` quando os nomes das categorias são longos.

## `px.histogram` / `px.box` — Distribuições

### Histograma: distribuição de uma variável

O histograma mostra **como os valores estão distribuídos**.

```python
fig = px.histogram(df, x="dureza", nbins=20,
                   title="Distribuição de Dureza",
                   color="material",  # Histogramas empilhados por categoria
                   barmode="overlay",  # Sobrepostos com transparência
                   opacity=0.7)
st.plotly_chart(fig, use_container_width=True)
```

| Parâmetro | O que faz |
|---|---|
| `nbins` | Número de barras |
| `histfunc` | Função de agregação: `"count"`, `"sum"`, `"avg"` |
| `color` | Separa por categoria |
| `barmode="overlay"` | Sobreposição com transparência |
| `marginal` | Adiciona gráfico marginal: `"rug"`, `"box"`, `"violin"` |

### Boxplot: resumo visual da distribuição

O boxplot mostra mediana, quartis e outliers em um único gráfico.

```python
fig = px.box(df, x="material", y="dureza",
             title="Distribuição de Dureza por Material",
             points="all",  # Mostrar todos os pontos
             color="material")
st.plotly_chart(fig, use_container_width=True)
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

## `px.imshow` — Heatmaps Interativos

Heatmaps (mapas de calor) representam valores como **cores em uma matriz**. São ideais para matrizes de correlação.

### Heatmap de correlação

```python
# Calcular matriz de correlação
corr = df[["densidade", "modulo_E", "escoamento", "dureza"]].corr()

# Criar heatmap
fig = px.imshow(
    corr,
    text_auto=True,           # Mostrar valores nas células
    color_continuous_scale="RdBu_r",  # Vermelho-Azul (invertido)
    title="Matriz de Correlação — Propriedades dos Materiais",
    labels={"color": "Correlação"}    # Legenda da cor
)
st.plotly_chart(fig, use_container_width=True)
```

### Escalas de cor comuns

| Escala | Uso |
|---|---|
| `"RdBu_r"` | Correlação (vermelho = negativo, azul = positivo) |
| `"Viridis"` | Dados gerais (perceptualmente uniforme) |
| `"YlOrRd"` | Intensidade (amarelo → laranja → vermelho) |
| `"Blues"` | Dados sequenciais |
| `"PiYG"` | Divergente (rosa → verde) |

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

## Subplots com `make_subplots`

Quando você precisa combinar **múltiplos gráficos em uma única figura**, usa `make_subplots`. Diferente do Plotly Express, aqui usamos `plotly.graph_objects` para adicionar traces individualmente.

### Conceito

```
  ┌──────────────────────────────────────────┐
  │              Figura (fig)                │
  ├─────────────────┬────────────────────────┤
  │   Subplot 1     │     Subplot 2          │
  │   (row=1,       │     (row=1,            │
  │    col=1)       │      col=2)            │
  │                 │                        │
  └─────────────────┴────────────────────────┘
```

### Exemplo passo a passo

```python
from plotly.subplots import make_subplots
import plotly.graph_objects as go

# 1. Criar a estrutura de subplots
fig = make_subplots(
    rows=1, cols=2,                    # 1 linha, 2 colunas
    subplot_titles=("Histograma", "Boxplot"),  # Títulos de cada subplot
    column_widths=[0.5, 0.5],          # Largura relativa de cada coluna
)

# 2. Adicionar traces (gráficos) em cada posição
fig.add_trace(go.Histogram(x=df["dureza"], nbinsx=20), row=1, col=1)
fig.add_trace(go.Box(y=df["dureza"], name="Dureza"), row=1, col=2)

# 3. Customizar layout geral
fig.update_layout(title="Distribuição de Dureza", showlegend=False)
st.plotly_chart(fig, use_container_width=True)
```

### Múltiplas linhas e colunas

```python
fig = make_subplots(
    rows=2, cols=2,
    subplot_titles=("Dispersão", "Histograma", "Boxplot", "Linha"),
    specs=[[{"type": "scatter"}, {"type": "histogram"}],
           [{"type": "box"}, {"type": "scatter"}]]
)

fig.add_trace(go.Scatter(x=df["x"], y=df["y"]), row=1, col=1)
fig.add_trace(go.Histogram(x=df["x"]), row=1, col=2)
fig.add_trace(go.Box(y=df["y"]), row=2, col=1)
fig.add_trace(go.Scatter(x=df["time"], y=df["value"]), row=2, col=2)
```

### Tipos de trace disponíveis

| Trace | Uso |
|---|---|
| `go.Scatter` | Dispersão / linha |
| `go.Histogram` | Histograma |
| `go.Box` | Boxplot |
| `go.Bar` | Barras |
| `go.Heatmap` | Mapa de calor |
| `go.Pie` | Pizza |
| `go.Violin` | Violin plot |

> **Regra:** `make_subplots` cria a estrutura. `add_trace` adiciona gráficos. `update_layout` customiza o visual geral.

## Layout: `st.columns`, `st.expander`, `st.tabs`

Um bom dashboard não é só sobre gráficos — é sobre **organização visual**.

### `st.columns`: lado a lado

```python
col1, col2 = st.columns(2)

with col1:
    fig1 = px.histogram(df, x="dureza", nbins=20)
    st.plotly_chart(fig1, use_container_width=True)

with col2:
    fig2 = px.box(df, y="dureza")
    st.plotly_chart(fig2, use_container_width=True)
```

**Proporções customizadas:**

```python
col1, col2, col3 = st.columns([2, 1, 1])  # col1 é 2x mais larga
```

### `st.expander`: seções colapsáveis

Útil para esconder detalhes que nem todos precisam ver:

```python
st.subheader("Resultados Principais")
st.metric("Média", f"{df['dureza'].mean():.1f}")

with st.expander("Ver dados brutos"):
    st.dataframe(df)
    st.write(f"Total de registros: {len(df)}")
```

### `st.tabs`: abas de navegação

Ideal para dashboards com muitas seções:

```python
tab1, tab2, tab3 = st.tabs(["Gráficos", "Tabela", "Estatísticas"])

with tab1:
    fig = px.scatter(df, x="x", y="y")
    st.plotly_chart(fig, use_container_width=True)

with tab2:
    st.dataframe(df)

with tab3:
    st.write(df.describe())
```

### Quando usar cada elemento

| Elemento | Quando usar |
|---|---|
| `st.columns` | Gráficos lado a lado, métricas em linha |
| `st.expander` | Detalhes opcionais, dados brutos, código |
| `st.tabs` | Seções distintas do dashboard, views alternativas |

## Customizações Úteis do Plotly

Plotly permite customizar quase tudo via `update_layout`, `update_traces`, e métodos `add_*`.

### `update_layout`: configuração geral

```python
fig.update_layout(
    title="Título do Gráfico",
    xaxis_title="Eixo X",
    yaxis_title="Eixo Y",
    legend_title="Legenda",
    template="plotly_dark",       # Tema escuro
    hovermode="x unified",        # Tooltip unificado no eixo X
    showlegend=True,
    font=dict(size=14),
    margin=dict(l=40, r=40, t=40, b=40),
)
```

### Templates disponíveis

| Template | Aparência |
|---|---|
| `"plotly"` | Padrão (fundo branco) |
| `"plotly_dark"` | Fundo escuro |
| `"plotly_white"` | Fundo branco com grid |
| `"ggplot2"` | Estilo R/ggplot2 |
| `"seaborn"` | Estilo Python/seaborn |
| `"simple_white"` | Minimalista |

### `update_traces`: customizar elementos visuais

```python
fig.update_traces(
    marker=dict(size=8, line=dict(width=1, color="DarkSlateGrey")),
    opacity=0.8,
)
```

### Linhas e formas de referência

```python
# Linha horizontal (ex: limite de especificação)
fig.add_hline(y=100, line_dash="dash", line_color="red",
              annotation_text="Limite Superior")

# Linha vertical (ex: média)
fig.add_vline(x=50, line_dash="dot", line_color="green")

# Retângulo vertical (ex: período de interesse)
fig.add_vrect(x0="2024-01", x1="2024-03",
              fillcolor="red", opacity=0.2,
              annotation_text="Período de manutenção")

# Retângulo horizontal (ex: zona de alerta)
fig.add_hrect(y0=90, y1=110, fillcolor="yellow", opacity=0.15)
```

### Eixos customizados

```python
fig.update_xaxes(
    title="Tempo (h)",
    range=[0, 100],          # Limites do eixo
    tickformat=".1f",        # Formato dos números
    showgrid=True,           # Mostrar grid
    gridcolor="lightgray",
)

fig.update_yaxes(
    title="Temperatura (°C)",
    scaleanchor="x",         # Escala igual ao eixo X
    scaleratio=1,
)
```

## Dashboard Patterns: Sidebar + Gráficos

O padrão mais comum de dashboard em Streamlit separa **filtros** (sidebar) de **resultados** (área principal).

### Estrutura típica

```python
import streamlit as st
import plotly.express as px
import pandas as pd
import numpy as np

# ──────────────────────────────────────────
# SIDEBAR: Filtros e controles
# ──────────────────────────────────────────
st.sidebar.header("🔍 Filtros")

tipo = st.sidebar.selectbox("Tipo de material:",
                            ["Todos", "Aço", "Alumínio", "Latão"])
faixa = st.sidebar.slider("Faixa de tensão (MPa):",
                          0, 600, (100, 500))
mostrar_outliers = st.sidebar.checkbox("Mostrar outliers")

# ──────────────────────────────────────────
# MAIN: Dados + Gráficos
# ──────────────────────────────────────────
st.title("📊 Dashboard de Materiais")

# Gerar/carregar dados
df = gerar_dados()

# Aplicar filtros
if tipo != "Todos":
    df = df[df["material"] == tipo]
df = df[df["tensao_max"].between(*faixa)]

# Métricas
col1, col2, col3 = st.columns(3)
col1.metric("Materiais", len(df))
col2.metric("Tensão média", f"{df['tensao_max'].mean():.0f} MPa")
col3.metric("Dureza média", f"{df['dureza'].mean():.0f} HB")

# Gráficos
c1, c2 = st.columns(2)
with c1:
    fig1 = px.scatter(df, x="densidade", y="modulo_E", color="material")
    st.plotly_chart(fig1, use_container_width=True)
with c2:
    fig2 = px.histogram(df, x="tensao_max", color="material")
    st.plotly_chart(fig2, use_container_width=True)

# Tabela
st.dataframe(df, use_container_width=True)
```

### Princípios de design

| Princípio | Descrição |
|---|---|
| Filtros na sidebar | Mantém a área principal limpa |
| Métricas no topo | KPIs visíveis antes dos gráficos |
| Gráficos em colunas | Aproveita a largura da tela |
| Tabela no final | Detalhes depois da visão geral |
| `use_container_width=True` | Gráficos responsivos |

## Persistência de Dados com `st.session_state`

Em dashboards com geração de dados ou filtros complexos, os dados precisam persistir entre interações.

### O problema

```python
# Sem session_state — dados são regenerados a cada interação!
df = gerar_dados()  # Roda de novo a cada clique, slider, etc.
```

### A solução

```python
if "df_dashboard" not in st.session_state:
    st.session_state.df_dashboard = gerar_dados()

df = st.session_state.df_dashboard

if st.sidebar.button("Regenerar dados"):
    st.session_state.df_dashboard = gerar_dados()
    st.rerun()
```

### Padrão completo para dashboards

```python
import streamlit as st
import pandas as pd
import numpy as np

# 1. Inicializar dados
if "df" not in st.session_state:
    np.random.seed(42)
    st.session_state.df = pd.DataFrame({
        "material": np.random.choice(["Aço", "Al", "Latão"], 100),
        "tensao_max": np.random.normal(350, 50, 100),
        "dureza": np.random.normal(180, 30, 100),
    })

df = st.session_state.df

# 2. Sidebar: filtros
st.sidebar.header("Filtros")
material = st.sidebar.selectbox("Material:", ["Todos"] + sorted(df["material"].unique()))

# 3. Botão de regeneração
if st.sidebar.button("Regenerar dados"):
    st.session_state.df = pd.DataFrame({
        "material": np.random.choice(["Aço", "Al", "Latão"], 100),
        "tensao_max": np.random.normal(350, 50, 100),
        "dureza": np.random.normal(180, 30, 100),
    })
    st.rerun()

# 4. Aplicar filtros
df_filtrado = df.copy()
if material != "Todos":
    df_filtrado = df_filtrado[df_filtrado["material"] == material]

# 5. Exibir
st.dataframe(df_filtrado)
```

> **Dica:** use `.copy()` ao filtrar para não modificar o DataFrame original no `session_state`.

## Exercício 9.1 — Scatter Plot de Materiais

**Contexto:** DataFrame de materiais com propriedades mecânicas.

**Base:** 80 amostras com material, densidade, modulo_E, escoamento, dureza.

**O que o app deve ter:**

- `st.selectbox` para escolher eixo X (densidade, dureza, escoamento)
- `st.selectbox` para escolher eixo Y (modulo_E, escoamento, dureza)
- `px.scatter` com `color=material`, `size=dureza`, `hover_data` completo
- `st.plotly_chart(fig, use_container_width=True)`

## Exercício 9.2 — Série Temporal de Sensor

**Contexto:** 500 leituras de 3 sensores ao longo de 7 dias.

**O que o app deve ter:**

- `st.selectbox` para selecionar sensor
- `st.slider` duplo para intervalo de datas
- `px.line` com `rangeslider_visible=True`
- `st.metric` com média do período selecionado
- Persistir dados em `st.session_state`

## Exercício 9.3 — Produção por Máquina (Bar)

**Contexto:** Dados de produção mensal por máquina (CNC-1, CNC-2, Torno, Fresa).

**O que o app deve ter:**

- `st.radio` para modo agrupado/empilhado (`barmode` dinâmico)
- `px.bar` com `text_auto=True`
- `st.plotly_chart` responsivo

## Exercício 9.4 — Histograma + Boxplot de Dureza

**Contexto:** 200 medidas de dureza.

**O que o app deve ter:**

- `make_subplots(rows=1, cols=2)` com histograma e boxplot
- `st.slider` para número de bins
- Checkbox para adicionar linha vertical na média
- `st.plotly_chart(fig, use_container_width=True)`

## Exercício 9.5 — Heatmap de Correlação

**Contexto:** DataFrame de materiais com 5+ propriedades.

**O que o app deve ter:**

- `df.corr()` + `px.imshow` com `text_auto=True`
- `st.selectbox` para filtrar por tipo de material
- `st.caption` com interpretação das correlações mais fortes
- `color_continuous_scale="RdBu_r"`

## Exercício 9.6 — Dashboard de Monitoramento

**Contexto:** Dashboard multi-aba para monitoramento de sensores.

**Abas (use `st.tabs`):**

1. **Leituras:** `px.line` + `st.dataframe` filtrado
2. **Estatísticas:** `st.metric` + `px.box`
3. **Alarmes:** leituras > threshold destacadas em vermelho

**Sidebar:**

- `st.selectbox` (sensor)
- `st.slider` duplo (data range)
- `st.slider` (threshold)
- Botão "Atualizar dados"

## Mini-Projeto 9 — Dashboard de Controle de Qualidade

**Contexto:** Dashboard para linha de produção com 1000 amostras.

**Dados:** Parafuso M8 (alvo 8.0 mm, tol 0.15), Porca M8 (alvo 8.2 mm, tol 0.12), Arruela (alvo 2.0 mm, tol 0.10). ~5% outliers.

**Abas obrigatórias:**

1. **Visão Geral:** métricas, `px.bar` produção por linha, `px.pie` taxa aprovação
2. **Análise por Produto:** `px.scatter` medida vs alvo, `px.histogram` com LSL/USL, `px.box` por linha
3. **Série Temporal:** `px.line` com limites, realçar pontos reprovados com cor
4. **Detalhes:** `st.dataframe` com dados completos, `st.download_button` para CSV

**Requisitos técnicos:**

- Persistir dados em `st.session_state`
- Botão "Regenerar dados" com `st.rerun()`
- Layout responsivo com `use_container_width=True`

## Resumo da aula

- Plotly Express: `px.line()`, `px.bar()`, `px.scatter()` — gráficos interativos com 1 linha
- Personalização: `fig.update_layout()`, `fig.update_traces()`, templates (`plotly_dark`, `ggplot2`)
- Subplots: `make_subplots()` com `colspan` para dashboards complexos
- `st.plotly_chart(fig)` renderiza gráficos Plotly no Streamlit
- Layout de dashboard: containers, colunas, métricas, abas (`st.tabs`)

## Referências

- **Plotly Express** — https://plotly.com/python/plotly-express/
- **Plotly Subplots** — https://plotly.com/python/subplots/
- **Streamlit + Plotly** — https://docs.streamlit.io/develop/api-reference/charts/st.plotly_chart
- **Plotly Themes** — https://plotly.com/python/templates/
