# Projeto Final: Sistema de Monitoramento de Sensores Industriais

## Visão Geral do Projeto

**Objetivo:** Construir um sistema completo em Streamlit + Pandas + NumPy que gerencia sensores industriais, registra leituras em tempo real e dispara alertas.

**Carga horária:** 8h (2 aulas)

**Tipo:** Individual ou duplas

**Entregáveis:**
- Código fonte (.py)
- Dados CSV (pasta `data/`)
- Vídeo de 3-5 min demonstrando o app
- Relatório técnico (PDF)

## Objetivos de Aprendizagem

**Habilidades Técnicas:**
- Integrar Streamlit com Pandas (CRUD via DataFrames)
- Gerar dados sintéticos realistas
- Construir dashboards com Plotly
- Implementar regras de negócio (alertas)
- Exportar dados em CSV e relatórios

**Habilidades de Projeto:**
- Organizar código em módulos
- Tratar erros e bordas
- Projetar UX para engenharia
- Documentar o sistema
- Apresentar resultados

## Arquitetura do Sistema

```
  ┌──────────────────────────────────────────────────────────────┐
  │              SISTEMA DE MONITORAMENTO DE SENSORES            │
  │                       (Streamlit App)                       │
  ├──────────────────────────────────────────────────────────────┤
  │                                                              │
  │  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐ │
  │  │ Dashboard │  │ Sensores  │  │ Leituras  │  │ Alertas   │ │
  │  │           │  │  (CRUD)   │  │  (Regis-  │  │  (Regras  │ │
  │  │ KPIs,     │  │           │  │  trar +   │  │  + Hist.) │ │
  │  │ Gráficos  │  │ Cadastrar │  │  Gráficos │  │           │ │
  │  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘ │
  │        └───────────────┴──────────────┴──────────────┘       │
  │                           │                                  │
  │           ┌───────────────┴───────────────┐                  │
  │           │  st.session_state (DataFrame)  │                  │
  │           │  persistência: CSV em data/   │                  │
  │           └───────────────────────────────┘                  │
  │                                                              │
  │   Bibliotecas: Streamlit | Pandas | NumPy | Plotly           │
  └──────────────────────────────────────────────────────────────┘
```

## Modelo de Dados — Entidades

**Departamentos:** id, nome, setor

**Sensores:** id, nome, tipo (temperatura/pressão/vazão), unidade, limite_alerta, departamento_id

**Leituras:** id, sensor_id, valor, timestamp, status (normal/alerta/crítico)

**Alertas:** id, sensor_id, leitura_id, mensagem, timestamp, resolvido (0/1)

## Regras de Negócio — Status da Leitura

```
Se sensor.tipo == 'temperatura':
    normal:   valor <= limite_alerta
    alerta:   limite_alerta < valor <= limite_alerta * 1.2
    crítico:  valor > limite_alerta * 1.2

Se sensor.tipo == 'pressao':
    normal:   valor <= limite_alerta
    alerta:   limite_alerta < valor <= limite_alerta * 1.15
    crítico:  valor > limite_alerta * 1.15

Se sensor.tipo == 'vazao':
    normal:   valor >= limite_alerta * 0.8 E valor <= limite_alerta
    alerta:   valor < limite_alerta * 0.8 OU valor > limite_alerta * 1.1
    crítico:  valor < limite_alerta * 0.5 OU valor > limite_alerta * 1.3
```

**Alerta** é criado automaticamente quando status = `alerta` ou `crítico`.

## Dados de Exemplo — Povoamento

**Departamentos:** Produção (Usinagem), Manutenção (Preditiva), Qualidade (Metrologia), Segurança (Monitoramento)

**Sensores (mínimo 8):**

| Nome | Tipo | Unidade | Limite |
|---|---|---|---|
| Temp. Forno | temperatura | °C | 250.0 |
| Temp. Caldeira | temperatura | °C | 180.0 |
| Pressão Óleo | pressão | bar | 6.0 |
| Pressão Ar | pressão | bar | 8.0 |
| Vazão Bomba | vazão | L/min | 100.0 |
| Vazão Resfriador | vazão | L/min | 50.0 |
| Temp. Ambiente | temperatura | °C | 40.0 |
| Pressão Vapor | pressão | bar | 12.0 |

## Estrutura de Arquivos Sugerida

```
monitoramento_sensores/
│
├── app.py                  # Entry point: st.navigation + init
├── data.py                 # Load/save DataFrames to/from CSV
├── models.py               # CRUD com DataFrames + regras de negócio
│
├── pages/
│   ├── dashboard.py        # KPI cards, gráficos
│   ├── sensores.py         # CRUD de sensores
│   ├── leituras.py         # Registrar + histórico
│   ├── alertas.py          # Visualizar + resolver
│   └── relatorios.py       # Export CSV + relatório
│
├── data/                   # CSV files (persistência)
│   ├── departamentos.csv
│   ├── sensores.csv
│   ├── leituras.csv
│   └── alertas.csv
│
└── populate.py             # NumPy-based data generation
```

## Skeleton Code — Estrutura Mínima

### `data.py` — Carregar/Salvar CSV

```python
import pandas as pd
import os

DATA_DIR = "data"

def carregar(nome, colunas=None):
    caminho = os.path.join(DATA_DIR, f"{nome}.csv")
    if os.path.exists(caminho):
        return pd.read_csv(caminho)
    return pd.DataFrame(columns=colunas or [])

def salvar(df, nome):
    os.makedirs(DATA_DIR, exist_ok=True)
    caminho = os.path.join(DATA_DIR, f"{nome}.csv")
    df.to_csv(caminho, index=False)

def inicializar():
    if not os.path.exists(os.path.join(DATA_DIR, "departamentos.csv")):
        salvar(pd.DataFrame(columns=["id", "nome", "setor"]), "departamentos")
        salvar(pd.DataFrame(columns=["id", "nome", "tipo", "unidade", "limite_alerta", "departamento_id"]), "sensores")
        salvar(pd.DataFrame(columns=["id", "sensor_id", "valor", "timestamp", "status"]), "leituras")
        salvar(pd.DataFrame(columns=["id", "sensor_id", "leitura_id", "mensagem", "timestamp", "resolvido"]), "alertas")
```

### `models.py` — Regras de Negócio

```python
import pandas as pd
from datetime import datetime
import data

def classificar_status(sensor_tipo, valor, limite):
    if sensor_tipo == "temperatura":
        if valor <= limite:
            return "normal"
        elif valor <= limite * 1.2:
            return "alerta"
        else:
            return "crítico"
    elif sensor_tipo == "pressao":
        if valor <= limite:
            return "normal"
        elif valor <= limite * 1.15:
            return "alerta"
        else:
            return "crítico"
    elif sensor_tipo == "vazao":
        if limite * 0.8 <= valor <= limite:
            return "normal"
        elif valor < limite * 0.5 or valor > limite * 1.3:
            return "crítico"
        else:
            return "alerta"
    return "normal"

def registrar_leitura(sensor_id, valor):
    sensores = data.carregar("sensores")
    sensor = sensores[sensores["id"] == sensor_id]
    if sensor.empty:
        return None, "Sensor não encontrado."

    sensor = sensor.iloc[0]
    status = classificar_status(sensor["tipo"], valor, sensor["limite_alerta"])

    leituras = data.carregar("leituras")
    nova_id = len(leituras) + 1
    nova_leitura = pd.DataFrame([{
        "id": nova_id,
        "sensor_id": sensor_id,
        "valor": valor,
        "timestamp": datetime.now().isoformat(),
        "status": status,
    }])
    leituras = pd.concat([leituras, nova_leitura], ignore_index=True)
    data.salvar(leituras, "leituras")

    if status in ("alerta", "crítico"):
        alertas = data.carregar("alertas")
        novo_alerta = pd.DataFrame([{
            "id": len(alertas) + 1,
            "sensor_id": sensor_id,
            "leitura_id": nova_id,
            "mensagem": f"{sensor['nome']}: {valor} {sensor['unidade']} — {status}",
            "timestamp": datetime.now().isoformat(),
            "resolvido": 0,
        }])
        alertas = pd.concat([alertas, novo_alerta], ignore_index=True)
        data.salvar(alertas, "alertas")

    return status, "Leitura registrada."
```

### `app.py` — Entry Point

```python
import streamlit as st
import data

st.set_page_config(page_title="Monitoramento de Sensores", layout="wide")

data.inicializar()

pg = st.navigation([
    st.Page("pages/dashboard.py", title="Dashboard"),
    st.Page("pages/sensores.py", title="Sensores"),
    st.Page("pages/leituras.py", title="Leituras"),
    st.Page("pages/alertas.py", title="Alertas"),
    st.Page("pages/relatorios.py", title="Relatórios"),
])

pg.run()
```

### `populate.py` — Gerar Dados Iniciais

```python
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import data

def popular():
    deptos = pd.DataFrame([
        {"id": 1, "nome": "Produção", "setor": "Usinagem"},
        {"id": 2, "nome": "Manutenção", "setor": "Preditiva"},
        {"id": 3, "nome": "Qualidade", "setor": "Metrologia"},
        {"id": 4, "nome": "Segurança", "setor": "Monitoramento"},
    ])
    data.salvar(deptos, "departamentos")

    sensores = pd.DataFrame([
        {"id": 1, "nome": "Temp. Forno", "tipo": "temperatura", "unidade": "°C", "limite_alerta": 250.0, "departamento_id": 1},
        {"id": 2, "nome": "Temp. Caldeira", "tipo": "temperatura", "unidade": "°C", "limite_alerta": 180.0, "departamento_id": 1},
        {"id": 3, "nome": "Pressão Óleo", "tipo": "pressao", "unidade": "bar", "limite_alerta": 6.0, "departamento_id": 2},
        {"id": 4, "nome": "Pressão Ar", "tipo": "pressao", "unidade": "bar", "limite_alerta": 8.0, "departamento_id": 2},
        {"id": 5, "nome": "Vazão Bomba", "tipo": "vazao", "unidade": "L/min", "limite_alerta": 100.0, "departamento_id": 1},
        {"id": 6, "nome": "Vazão Resfriador", "tipo": "vazao", "unidade": "L/min", "limite_alerta": 50.0, "departamento_id": 3},
        {"id": 7, "nome": "Temp. Ambiente", "tipo": "temperatura", "unidade": "°C", "limite_alerta": 40.0, "departamento_id": 4},
        {"id": 8, "nome": "Pressão Vapor", "tipo": "pressao", "unidade": "bar", "limite_alerta": 12.0, "departamento_id": 4},
    ])
    data.salvar(sensores, "sensores")

    leituras = []
    lid = 1
    agora = datetime.now()
    for sensor_id, limite in [(1, 250), (2, 180), (3, 6), (4, 8), (5, 100), (6, 50), (7, 40), (8, 12)]:
        for i in range(20):
            ts = agora - timedelta(hours=20 - i)
            valor = limite * np.random.uniform(0.7, 1.25)
            if valor <= limite:
                status = "normal"
            elif valor <= limite * 1.15:
                status = "alerta"
            else:
                status = "crítico"
            leituras.append({"id": lid, "sensor_id": sensor_id, "valor": round(valor, 2), "timestamp": ts.isoformat(), "status": status})
            lid += 1

    data.salvar(pd.DataFrame(leituras), "leituras")
    data.salvar(pd.DataFrame(columns=["id", "sensor_id", "leitura_id", "mensagem", "timestamp", "resolvido"]), "alertas")

if __name__ == "__main__":
    popular()
    print("Dados populados com sucesso.")
```

## Tela 1: Dashboard

**Filtros (sidebar):** selectbox departamento, selectbox sensor, date input início/fim.

**KPIs:** total de sensores, total de leituras, alertas ativos, última leitura.

**Gráficos:** linha (leituras × tempo), barras (média por sensor).

**Tabela:** últimas 10 leituras com coloração por status.

## Tela 2: Gerenciar Sensores (CRUD)

**Create:** formulário com nome, tipo, unidade, limite_alerta, departamento.

**Read:** tabela com todos os sensores, filtro por departamento.

**Update:** botão "Editar", formulário pré-preenchido.

**Delete:** botão "Remover" com confirmação, impedir exclusão se houver leituras vinculadas.

## Tela 3: Registrar Leituras

**Forma 1 — Manual:** select sensor + input valor + botão "Registrar". Calcula status automaticamente, cria alerta se necessário.

**Forma 2 — Geração em lote:** select sensor, slider quantidade (5-100), slider ruído (1-20%), botão "Gerar Leituras Simuladas".

**Histórico:** tabela com paginação, filtro por sensor e data, gráfico de linha interativo (Plotly).

## Tela 4: Alertas

**Alertas Ativos:** tabela com ID, Sensor, Mensagem, Data/Hora. Botão "Resolver" em cada linha. Botão "Resolver Todos".

**Histórico:** checkbox "Mostrar histórico", tabela completa com filtro por data. Críticos em vermelho, alertas em amarelo.

## Tela 5: Relatórios

**Exportar CSV:** "Exportar Leituras (CSV)" com join de sensores e departamentos. "Exportar Alertas (CSV)".

**Relatório de Resumo:** texto formatado com total de sensores por tipo, média de leituras por sensor, alertas gerados, sensor mais crítico. Download como .txt.

## Tratamento de Erros (Obrigatório)

- CSV inexistente na pasta `data/`
- DataFrame vazio tentando operações
- Erro ao carregar/salvar CSV
- Campos vazios no formulário
- Valor inválido (texto em campo numérico)
- Nenhum sensor/leitura/alerta cadastrado
- Usar `st.error()`, `st.warning()`, `st.info()`, `st.success()`

## Rubrica de Avaliação (100 pontos)

| Critério | Pts |
|---|---|
| Funcionalidade (CRUDs, gráficos, alertas) | 30 |
| Persistência + Estado (CSV, DataFrames) | 15 |
| Qualidade de Código (módulos, DRY) | 15 |
| Interface UI/UX (layout, filtros, feedback) | 15 |
| Tratamento de Erros | 10 |
| Dados de Exemplo (4+ deptos, 8+ sensores, 50+ leituras) | 5 |
| Exportação CSV (2 CSVs com joins) | 5 |
| Relatório Texto (formatado com métricas) | 5 |

**Bônus (+5):** deploy no Streamlit Community Cloud.

## Dicas Finais

**Comece pelo básico:**
1. `data.py` (load/save CSV) + dados iniciais
2. `models.py` (operações com DataFrame)
3. `app.py` com inicialização e navegação
4. Uma tela de cada vez (dashboard primeiro)
5. Teste cada tela antes de passar

**Evite erros comuns:**
- DataFrames em `st.session_state` persistem entre reruns
- Salvar CSV após cada modificação: `df.to_csv(caminho, index=False)`
- Usar `pd.concat()` para adicionar linhas, não `df.append()`
- Plotly: usar `st.plotly_chart(fig)`, não `st.pyplot(fig)`

## Resumo da aula

- Planeje a arquitetura antes de codificar: componentes separados por responsabilidade
- Dados sintéticos com NumPy simulam cenários reais de sensoriamento industrial
- CRUD via DataFrames + `st.session_state` + CSV = sistema funcional sem banco de dados
- Regras de negócio (normal/alerta/crítico) tornam o app inteligente
- Documentação e apresentação são parte da entrega — trate o código como produto

## Referências

- **Streamlit** — https://docs.streamlit.io/
- **Pandas** — https://pandas.pydata.org/docs/
- **NumPy** — https://numpy.org/doc/stable/
- **Plotly** — https://plotly.com/python/
