# Projeto Final: Sistema de Monitoramento de Sensores Industriais

## Visão Geral do Projeto

**Objetivo:** Construir um notebook analítico no Google Colab (Python + Pandas + NumPy) que gerencia sensores industriais, registra leituras e dispara alertas.

**Carga horária:** 8h (2 aulas)

**Tipo:** Individual ou duplas

**Entregáveis:**
- Notebook (.ipynb) com célula única executável no Google Colab
- Dados CSV (pasta `data/`)
- Vídeo de 3-5 min demonstrando o notebook
- Relatório técnico (PDF)

## Objetivos de Aprendizagem

**Habilidades Técnicas:**
- Integrar Pandas com dados em CSV (CRUD via DataFrames)
- Gerar dados sintéticos realistas com NumPy
- Construir visualizações com matplotlib
- Implementar regras de negócio (alertas)
- Exportar dados em CSV e relatórios

**Habilidades de Projeto:**
- Organizar código em células e funções
- Tratar erros e bordas
- Projetar análise para engenharia
- Documentar o sistema
- Apresentar resultados

## Arquitetura do Sistema

```
  ┌──────────────────────────────────────────────────────────────┐
  │        SISTEMA DE MONITORAMENTO DE SENSORES (Notebook)       │
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
  │           │  DataFrames em memória        │                  │
  │           │  persistência: CSV em data/   │                  │
  │           └───────────────────────────────┘                  │
  │                                                              │
  │   Bibliotecas: Pandas | NumPy | matplotlib                   │
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

## Estrutura do Notebook Sugerida

Um único notebook `.ipynb` no Google Colab, com a célula principal contendo todo o código (funções de dados, regras de negócio e análise). Use células Markdown (títulos `##`) para separar as seções:

```
monitoramento_sensores.ipynb
│
├── ## 1. Configuração e Imports          (célula Markdown)
│        → import pandas, numpy, matplotlib
│
├── ## 2. Funções de Dados (CSV)          (célula Markdown)
│        → carregar(), salvar(), inicializar()
│
├── ## 3. Regras de Negócio               (célula Markdown)
│        → classificar_status(), registrar_leitura()
│
├── ## 4. Povoamento Inicial              (célula Markdown)
│        → departamentos, sensores, leituras, alertas
│
├── ## 5. Dashboard — KPIs e Gráficos     (célula Markdown)
├── ## 6. Gerenciar Sensores (CRUD)       (célula Markdown)
├── ## 7. Registrar Leituras              (célula Markdown)
├── ## 8. Alertas                         (célula Markdown)
├── ## 9. Relatórios e Exportação         (célula Markdown)
│
├── data/                   # CSV files (persistência)
│   ├── departamentos.csv
│   ├── sensores.csv
│   ├── leituras.csv
│   └── alertas.csv
```

> **Importante:** a entrega deve ter uma **célula de código única e executável** que rode de ponta a ponta (de `import` até a exportação), sem depender de ordem manual de execução. As células Markdown com `##` servem apenas para organizar e documentar.

## Skeleton Code — Célula Única Executável

Cole tudo abaixo em uma única célula de código no Colab. As funções podem ser ajustadas livremente.

### Parte A — Imports e Funções de Dados (CSV)

```python
import os
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import matplotlib.pyplot as plt

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

### Parte B — Regras de Negócio

```python
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
    sensores = carregar("sensores")
    sensor = sensores[sensores["id"] == sensor_id]
    if sensor.empty:
        return None, "Sensor não encontrado."

    sensor = sensor.iloc[0]
    status = classificar_status(sensor["tipo"], valor, sensor["limite_alerta"])

    leituras = carregar("leituras")
    nova_id = len(leituras) + 1
    nova_leitura = pd.DataFrame([{
        "id": nova_id,
        "sensor_id": sensor_id,
        "valor": valor,
        "timestamp": datetime.now().isoformat(),
        "status": status,
    }])
    leituras = pd.concat([leituras, nova_leitura], ignore_index=True)
    salvar(leituras, "leituras")

    if status in ("alerta", "crítico"):
        alertas = carregar("alertas")
        novo_alerta = pd.DataFrame([{
            "id": len(alertas) + 1,
            "sensor_id": sensor_id,
            "leitura_id": nova_id,
            "mensagem": f"{sensor['nome']}: {valor} {sensor['unidade']} — {status}",
            "timestamp": datetime.now().isoformat(),
            "resolvido": 0,
        }])
        alertas = pd.concat([alertas, novo_alerta], ignore_index=True)
        salvar(alertas, "alertas")

    return status, "Leitura registrada."
```

### Parte C — Povoamento Inicial

```python
def popular():
    deptos = pd.DataFrame([
        {"id": 1, "nome": "Produção", "setor": "Usinagem"},
        {"id": 2, "nome": "Manutenção", "setor": "Preditiva"},
        {"id": 3, "nome": "Qualidade", "setor": "Metrologia"},
        {"id": 4, "nome": "Segurança", "setor": "Monitoramento"},
    ])
    salvar(deptos, "departamentos")

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
    salvar(sensores, "sensores")

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

    salvar(pd.DataFrame(leituras), "leituras")
    salvar(pd.DataFrame(columns=["id", "sensor_id", "leitura_id", "mensagem", "timestamp", "resolvido"]), "alertas")

inicializar()
popular()
print("Dados populados com sucesso.")
```

## Seção 1: Dashboard — KPIs e Gráficos

**Filtros (variáveis no topo da célula):** `departamento_filtro`, `sensor_filtro`, `data_inicio` e `data_fim` definidos no início da célula (ou via `input()`).

**KPIs:** total de sensores, total de leituras, alertas ativos, última leitura.

**Gráficos (matplotlib):** linha (leituras × tempo), barras (média por sensor).

**Tabela:** últimas 10 leituras com filtro por status (`df.head()` / Pandas).

## Seção 2: Gerenciar Sensores (CRUD)

**Create:** dados de um novo sensor em variáveis no topo da célula (ou via `input()`), valide e insira no DataFrame.

**Read:** `df.head()` / exibição de todos os sensores, filtro por departamento.

**Update:** alterar campos de um sensor existente informando o `id`.

**Delete:** remover um sensor por `id`, impedir exclusão se houver leituras vinculadas.

## Seção 3: Registrar Leituras

**Forma 1 — Manual:** `sensor_id` + `valor` definidos em variáveis (ou `input()`). Calcula status automaticamente, cria alerta se necessário.

**Forma 2 — Geração em lote:** `sensor_id`, `quantidade` (5-100) e `ruido_pct` (1-20%) em variáveis no topo da célula. Gera leituras simuladas com NumPy.

**Histórico:** tabela com filtro por sensor e data, gráfico de linha com matplotlib.

## Seção 4: Alertas

**Alertas Ativos:** tabela com ID, Sensor, Mensagem, Data/Hora. Função para resolver um alerta (marca `resolvido = 1`) ou resolver todos.

**Histórico:** exibir alertas resolvidos e pendentes, tabela completa com filtro por data. Críticos em vermelho, alertas em amarelo.

## Seção 5: Relatórios

**Exportar CSV:** exportar leituras com join de sensores e departamentos e exportar alertas. Baixar os arquivos com `files.download()`.

**Relatório de Resumo:** texto formatado (`print`) com total de sensores por tipo, média de leituras por sensor, alertas gerados, sensor mais crítico. Salvar como `.txt`.

## Tratamento de Erros (Obrigatório)

- CSV inexistente na pasta `data/`
- DataFrame vazio tentando operações
- Erro ao carregar/salvar CSV
- Campos vazios no cadastro
- Valor inválido (texto em campo numérico)
- Nenhum sensor/leitura/alerta cadastrado
- Usar `try/except` com `print(f"Erro: ...")`, `print(f"Atenção: ...")` e `print(f"OK: ...")` para feedback

## Rubrica de Avaliação (100 pontos)

| Critério | Pts |
|---|---|
| Funcionalidade (CRUDs, gráficos, alertas) | 30 |
| Organização em células/funções (célula única executável, seções claras) | 15 |
| Uso correto de Pandas (DataFrames, joins, filtros, `pd.concat`) | 15 |
| Visualizações com matplotlib (linha, barras, títulos/labels) | 10 |
| Análise de dados real (médias, contagens, correlação com limites) | 5 |
| POO (se usado: classes para Sensor, Leitura, Alerta) | 5 |
| Exportação/gerência dos dados (CSV + `files.download()`) | 10 |
| Relatório Texto (formatado com métricas) | 5 |
| Dados de Exemplo (4+ deptos, 8+ sensores, 50+ leituras) | 5 |

## Dicas Finais

**Comece pelo básico:**
1. Funções de dados (load/save CSV) + dados iniciais
2. Funções de regras de negócio (operações com DataFrame)
3. Célula principal com inicialização e povoamento
4. Uma seção de cada vez (dashboard primeiro)
5. Teste cada seção antes de passar

**Evite erros comuns:**
- Salvar CSV após cada modificação: `df.to_csv(caminho, index=False)`
- Usar `pd.concat()` para adicionar linhas, não `df.append()`
- Definir as variáveis de filtro/simulação no topo da célula para fácil ajuste
- Chamar `files.download()` dentro da célula do Colab para baixar os CSV gerados

## Resumo da aula

- Planeje a arquitetura antes de codificar: componentes separados por responsabilidade
- Dados sintéticos com NumPy simulam cenários reais de sensoriamento industrial
- CRUD via DataFrames + CSV = sistema funcional sem banco de dados
- Regras de negócio (normal/alerta/crítico) tornam a análise inteligente
- Documentação e apresentação são parte da entrega — trate o código como produto

## Referências

- **Google Colab** — https://colab.research.google.com/
- **Pandas** — https://pandas.pydata.org/docs/
- **NumPy** — https://numpy.org/doc/stable/
- **matplotlib** — https://matplotlib.org/stable/
