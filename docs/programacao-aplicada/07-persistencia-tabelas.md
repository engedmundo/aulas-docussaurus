# Persistência + Tabelas

## Roteiro

1. Por que persistir dados?
2. JSON: salvar e carregar dados
3. CSV: formato tabular para dados de engenharia
4. Exibindo tabelas com Pandas (`df.head()`, `df.style`)
5. Exercícios
6. **Exercício 7.3:** Vitórias por Piloto na F1 (dataset Kaggle)
7. **Mini-projeto:** Monitor de Sensores

## Por que persistir dados?

Até agora, todos os dados que seu programa criava desapareciam quando ele terminava de executar. No Colab, as variáveis duram enquanto o **kernel** (o núcleo que executa o Python) estiver ativo: você pode reutilizá-las na próxima célula, mas elas se perdem se o kernel for reiniciado (`Menu → Ambiente de execução → Reiniciar ambiente de execução`). **Persistência** é a capacidade de salvar dados de forma que sobrevivam também à reinicialização do kernel — geralmente gravando-os em arquivos. Isso é essencial para aplicações reais de engenharia.

Nesta aula você aprenderá dois formatos de arquivo e como exibir dados tabulares em um notebook Colab.

### JSON vs CSV — quando usar cada um?

| Aspecto | JSON | CSV |
|--------|------|-----|
| **Estrutura** | Hierárquica (aninhada) | Plana (tabular) |
| **Dados heterogêneos** | ✓ (arrays, objetos, valores) | ✗ (tipicamente homogêneos por coluna) |
| **Legibilidade** | Boa com formatação | Excelente para visualização rápida |
| **Tamanho de arquivo** | Maior | Menor |
| **Casos de engenharia** | Configurações, metadata, dados complexos | Ensaios, leituras de sensores, relatórios |
| **Exemplo** | Catálogo com produtos heterogêneos | Tabela de resultados de tração |

**Regra prática:** Se os dados cabem em uma planilha (linhas e colunas regulares), use CSV. Se são aninhados ou estruturas complexas, use JSON.

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

#### Lendo e escrevendo CSV com Pandas

Com Pandas, a leitura de CSV é muito mais simples e poderosa:

```python
import pandas as pd

# Ler CSV em um DataFrame
df = pd.read_csv("dados_ensaio.csv")
print(df)

# Salvar DataFrame em CSV
df.to_csv("dados_ensaio_novo.csv", index=False)
```

> **Por que `index=False`?** Por padrão, `to_csv()` escreve o índice do DataFrame como primeira coluna. Use `index=False` para evitar isso.

**Vantagem:** Com Pandas, você pode filtrar, transformar e analisar dados muito mais facilmente do que com `csv.reader`/`csv.writer`.

## Exibindo tabelas com Pandas

No Colab, a forma mais comum de exibir dados tabulares é com um `DataFrame` do Pandas — basta colocar o `df` como última linha da célula (o notebook o renderiza como tabela) ou usar `df.head()`.

### Exibindo um DataFrame

```python
import pandas as pd

dados = {
    "Sensor": ["PT-01", "PT-02", "PT-03"],
    "Temperatura (°C)": [150.0, 162.5, 148.3],
    "Pressão (bar)": [5.2, 5.8, 4.9]
}
df = pd.DataFrame(dados)

df                 # renderiza a tabela no notebook
df.head()          # primeiras linhas (padrão: 5)
df.head(10)        # um número específico de linhas
df.tail()          # últimas linhas
df.shape           # (linhas, colunas)
df.info()          # tipos de dados e memória
```

**Quando usar cada um:**
- `df` sozinho na célula: renderiza bonito no notebook, mas pode ser truncado se muito grande
- `df.head()`: seguro para DataFrames muito grandes (mostra só as primeiras 5 linhas)
- `df.info()`: entender a estrutura de dados e tipos antes de processar

### Estilizando a exibição com `df.style`

O objeto `df.style` permite colorir, destacar e formatar tabelas no notebook:

```python
# Colorir células por valor (gradient)
# cmap="coolwarm": azul (baixo) → vermelho (alto)
# cmap="viridis": roxo (baixo) → amarelo (alto)
df.style.background_gradient(cmap="coolwarm")

# Destacar valores máximos em verde
df.style.highlight_max(color="lightgreen")

# Destacar valores mínimos em vermelho
df.style.highlight_min(color="lightcoral")

# Formatar números (ex: 2 casas decimais)
df.style.format("{:.2f}")

# Combinar: gradient + formato
df.style.background_gradient(cmap="coolwarm").format("{:.1f}")
```

**Importante:** `df.style` é apenas visual (não modifica os dados). Use para relatórios e apresentações. Não salva em CSV/JSON — se precisar dos dados processados, salve o DataFrame com `df.to_csv()` antes de estilizar.

### Criando DataFrames — diferentes fontes

**Opção 1: A partir de um dicionário de listas (mais comum)**

```python
import pandas as pd

# Cada chave vira uma coluna; cada lista, os valores daquela coluna
dados = {
    "Sensor": ["PT-01", "PT-02", "PT-03"],
    "Temperatura (°C)": [150.0, 162.5, 148.3],
    "Pressão (bar)": [5.2, 5.8, 4.9]
}
df = pd.DataFrame(dados)
```

**Opção 2: A partir de uma lista de dicionários (registros)**

```python
# Cada dicionário representa uma linha
registros = [
    {"Sensor": "PT-01", "Temperatura (°C)": 150.0, "Pressão (bar)": 5.2},
    {"Sensor": "PT-02", "Temperatura (°C)": 162.5, "Pressão (bar)": 5.8},
    {"Sensor": "PT-03", "Temperatura (°C)": 148.3, "Pressão (bar)": 4.9},
]
df = pd.DataFrame(registros)
```

**Opção 3: A partir de um dicionário simples `{chave: valor}`**

```python
# Dicionário onde as chaves viram o índice e os valores viram uma coluna
estoque = {"Capacete": 50, "Luva": 120, "Bota": 30}

df = pd.DataFrame.from_dict(estoque, orient="index", columns=["Quantidade"])
df.index.name = "Item"
df
```

**Quando usar cada uma:**
- **Opção 1:** Dados organizados por coluna (listas paralelas de medidas)
- **Opção 2:** Dados que vêm como registros individuais (API, banco de dados)
- **Opção 3:** Dicionário simples `{chave: valor}` como catálogo ou estoque

### Resumo de métricas com `describe()`

```python
print(f"Temp. máxima: {df['Temperatura (°C)'].max():.1f} °C")
print(f"Pressão média: {df['Pressão (bar)'].mean():.2f} bar")
df.describe()   # estatísticas descritivas de todas as colunas numéricas
```

**Saída de `df.describe()`:**
```
       Temperatura (°C)  Pressão (bar)
count          3.000000       3.000000
mean         153.600000       5.300000
std            7.571125       0.436515
min          148.300000       4.900000
25%          149.150000       5.050000
50%          150.000000       5.200000
75%          156.250000       5.500000
max          162.500000       5.800000
```

**Interpretação:**
- **count:** quantos valores (não-nulos)
- **mean:** média aritmética
- **std:** desvio padrão (variação dos dados)
- **min, 25%, 50%, 75%, max:** quartis (distribuição percentual dos dados)

---

## Exercício 7.1 — Custo de Combustível da Frota

**Contexto:** O departamento de logística de uma empresa quer calcular o custo mensal de combustível de sua frota de veículos. Cada veículo tem um consumo médio (km/L) e percorre uma distância mensal diferente.

**O que o programa deve ter:**
- Um dicionário com pelo menos 3 veículos, cada um com: nome, consumo (km/L), distância mensal (km)
- Uma variável com o preço do combustível (R$/L)
- Para cada veículo: litros consumidos e custo mensal
- Custo total da frota
- Exibir os resultados com `print(f"...")`

**Dados de entrada:**

```python
frota = [
    {"nome": "Caminhão A", "consumo_kmL": 6.0,  "distancia_km": 3000},
    {"nome": "Van B",      "consumo_kmL": 9.0,  "distancia_km": 2000},
    {"nome": "Carro C",    "consumo_kmL": 12.0, "distancia_km": 1500},
]
preco_litro = 5.50  # R$/L
```

**Resultado esperado:**
```
Caminhão A: 500.0 L → R$ 2750.00
Van B: 222.2 L → R$ 1222.22
Carro C: 125.0 L → R$ 687.50
Custo total da frota: R$ 4659.72
```

## Exercício 7.2 — Controle de Estoque com JSON

**Contexto:** O almoxarifado da empresa precisa de um sistema simples para controlar o estoque de itens de consumo (EPIs, ferramentas, materiais). Os dados devem ser persistidos em JSON para não se perderem entre execuções.

**O que o programa deve ter:**
- Funções `carregar_estoque()` e `salvar_estoque(estoque)` usando JSON
- Variável para o nome do item e a quantidade a adicionar
- Cadastrar item — adiciona ao estoque (ou soma se já existir)
- Consultar estoque — exibe todos os itens
- Variável para nome do item e quantidade a retirar
- Retirar item — subtrai do estoque (validar se há saldo suficiente)
- Exibição do estoque atual como DataFrame com Pandas

**Dados de entrada para testar:**

```python
# Estoque inicial a cadastrar
cadastros = [
    ("Capacete",            50),
    ("Luva de borracha",    120),
    ("Bota de segurança",   30),
    ("Óculos de proteção",  75),
    ("Colete refletivo",    40),
]

# Retiradas a processar
retiradas = [
    ("Capacete",           10),
    ("Luva de borracha",   200),   # deve falhar: saldo insuficiente
    ("Bota de segurança",   5),
]
```

**Resultado esperado após todas as operações:**
```
Item                 Quantidade
Capacete                     40
Luva de borracha            120   ← retirada recusada (saldo insuficiente)
Bota de segurança            25
Óculos de proteção           75
Colete refletivo             40
```

**Dica:** o estoque pode ser um dicionário `{"item": quantidade}`.

## Exercício 7.3 — Vitórias por Piloto na Fórmula 1

**Contexto:** O Kaggle hospeda o dataset *Formula 1 World Championship (1950–2024)*, de Rohan Rao, com dados reais de todas as corridas de F1. Neste exercício você vai baixar dois arquivos CSV desse dataset e usá-los para descobrir quais pilotos mais venceram na história da categoria.

**Dataset:** [kaggle.com/datasets/rohanrao/formula-1-world-championship-1950-2020](https://www.kaggle.com/datasets/rohanrao/formula-1-world-championship-1950-2020)

Arquivos necessários: `results.csv` e `drivers.csv`

**Como baixar e carregar no Colab:**

```python
# Opção A — upload manual
# Baixe results.csv e drivers.csv do Kaggle e faça upload no Colab:
# Painel lateral → ícone de pasta → "Fazer upload"

# Opção B — via kagglehub (requer chave de API do Kaggle)
# import kagglehub
# path = kagglehub.dataset_download("rohanrao/formula-1-world-championship-1950-2020")

import pandas as pd

resultados = pd.read_csv("results.csv")
pilotos    = pd.read_csv("drivers.csv")
```

**Colunas relevantes:**

| Arquivo | Colunas usadas |
|---------|---------------|
| `results.csv` | `driverId`, `positionOrder` |
| `drivers.csv` | `driverId`, `forename`, `surname` |

> `positionOrder == 1` indica vitória. Pilotos que não terminaram a corrida têm `positionOrder > 1`.

**O que o programa deve fazer:**
- Carregar os dois CSVs com `pd.read_csv()`
- Filtrar apenas as linhas onde `positionOrder == 1` (vitórias)
- Criar uma coluna `nome` combinando `forename` e `surname`
- Contar vitórias por piloto com `groupby` + `size()` ou `value_counts()`
- Ordenar do mais vitorioso para o menos
- Exibir o top 10 como DataFrame estilizado

**Dados de entrada:**

```python
import pandas as pd

resultados = pd.read_csv("results.csv")
pilotos    = pd.read_csv("drivers.csv")

# Estrutura esperada de resultados.head():
#    resultId  raceId  driverId  ...  positionOrder  points
# 0         1       18        1  ...              1    10.0
# 1         2       18        2  ...              2     8.0

# Estrutura esperada de pilotos.head():
#    driverId driverRef  ...  forename    surname  nationality
# 0         1   hamilton  ...     Lewis   Hamilton      British
# 1         2    heidfeld  ...     Nick  Heidfeld       German
```

**Resultado esperado (top 5):**
```
                  nome  vitorias
0      Lewis Hamilton       103
1  Michael Schumacher        91
2    Sebastian Vettel        53
3       Ayrton Senna        41
4       Alain Prost        51
```

**Dica:** para combinar `forename` e `surname` em uma coluna só:
```python
pilotos["nome"] = pilotos["forename"] + " " + pilotos["surname"]
```

Para cruzar os dois DataFrames pelo `driverId`, use:
```python
df = pd.merge(vitorias, pilotos[["driverId", "nome"]], on="driverId")
```

## Mini-Projeto — Monitor de Sensores

**Contexto:** O engenheiro de manutenção quer um script que monitore 10 sensores de temperatura e pressão. Como não há sensores reais conectados, os dados são simulados.

**O que o programa deve ter:**
- 10 sensores de temperatura (faixa normal: 140-170 °C, limite: 180 °C)
- 10 sensores de pressão (faixa normal: 4.5-6.0 bar, limite: 7.0 bar)
- Gerar novos valores para todos os sensores
- Tabela (DataFrame) com: sensor, temperatura, pressão
- Métricas destacadas: temperatura média, pressão média, sensores em alerta
- Alertas (`print`) para sensores acima do limite
- Salvar as leituras atuais para JSON

**Dados de entrada:**

```python
import random

nomes_sensores = [f"TMP-{i:02d}" for i in range(1, 11)]  # TMP-01 … TMP-10
nomes_pressao  = [f"PRS-{i:02d}" for i in range(1, 11)]  # PRS-01 … PRS-10

LIMITE_TEMP  = 180.0   # °C
LIMITE_PRESS = 7.0     # bar

# Para simular falhas: ~20% de chance de gerar valor fora da faixa
def gerar_temperatura():
    if random.random() < 0.2:
        return round(random.uniform(180.0, 210.0), 1)   # valor em alerta
    return round(random.uniform(140.0, 170.0), 1)

def gerar_pressao():
    if random.random() < 0.2:
        return round(random.uniform(7.0, 9.0), 2)       # valor em alerta
    return round(random.uniform(4.5, 6.0), 2)
```

**Dica:** use `import random` e `random.uniform(min, max)` para gerar valores. Para simular falhas, ocasionalmente gere valores fora da faixa normal.

## Resumo da aula

**Persistência e Formatos:**
- JSON (`json.dump` / `json.load`) persiste dados estruturados em arquivos legíveis — use para configurações e dados hierárquicos
- CSV (`csv.writer` / `csv.DictReader`) é o formato padrão para dados tabulares de engenharia
- Pandas simplifica CSV: `pd.read_csv()` e `df.to_csv(index=False)`
- `with open(...) as f:` gerencia abertura e fechamento automático de arquivos

**Exibindo e analisando com Pandas:**
- `df.head()`, `df.tail()`, `df.info()` exploram a estrutura de dados
- `df` sozinho renderiza bonito no notebook; `df.head()` é seguro para dados grandes
- `df.style.background_gradient()`, `highlight_max()`, `format()` estilizam tabelas
- `df.describe()` resume estatísticas (mean, std, min, quartis, max)
- Crie DataFrames de dicionários, listas de dicts, ou dicionários simples com `from_dict`

## Referências

- **Python.org — JSON** — https://docs.python.org/pt-br/3/library/json.html
- **Python.org — CSV** — https://docs.python.org/pt-br/3/library/csv.html
- **Pandas — Visualização de DataFrames** — https://pandas.pydata.org/docs/user_guide/visualization.html
- **Kaggle** — https://www.kaggle.com/datasets — repositório com milhares de datasets reais em CSV prontos para análise com Pandas; requer cadastro gratuito para download
