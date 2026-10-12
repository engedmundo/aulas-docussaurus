# Persistência + Tabelas

## Roteiro

1. Por que persistir dados? (JSON vs CSV)
2. JSON: salvar e carregar (`json.dump` / `json.load`)
3. Funções `carregar` / `salvar` com JSON
4. CSV com o módulo `csv` (`writer` / `DictReader`)
5. CSV com Pandas (`read_csv` / `to_csv`) + exibição (`head`, `info`)
6. Criando DataFrames de diferentes fontes
7. Estilo (`df.style`) e resumo (`describe()`)
8. **Exercício 7.6:** Controle de Estoque com JSON
9. **Exercício 7.7:** Vitórias por Piloto na F1 (dataset Kaggle)
10. **Exercício 7.8:** Fatura de Luz com Tabela de Tarifas

## Por que persistir dados?

Até agora, todos os dados que seu programa criava desapareciam quando ele terminava de executar. No Colab, as variáveis duram enquanto o **kernel** (o núcleo que executa o Python) estiver ativo: você pode reutilizá-las na próxima célula, mas elas se perdem se o kernel for reiniciado (`Menu → Ambiente de execução → Reiniciar ambiente de execução`). **Persistência** é a capacidade de salvar dados de forma que sobrevivam também à reinicialização do kernel — geralmente gravando-os em arquivos. Isso é essencial para aplicações reais.

Nesta aula você aprenderá dois formatos de arquivo e como exibir dados tabulares em um notebook Colab.

### JSON vs CSV — quando usar cada um?

| Aspecto | JSON | CSV |
|--------|------|-----|
| **Estrutura** | Hierárquica (aninhada) | Plana (tabular) |
| **Dados heterogêneos** | ✓ (arrays, objetos, valores) | ✗ (tipicamente homogêneos por coluna) |
| **Legibilidade** | Boa com formatação | Excelente para visualização rápida |
| **Tamanho de arquivo** | Maior | Menor |
| **Casos cotidianos** | Perfil de usuário, configurações de app | Lista de gastos, notas em planilha |
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

### Exercício 7.1 — Ficha de leitura

**Contexto:** um app de leitura quer salvar o perfil do leitor em JSON para não perder os dados ao fechar o programa.

**Tarefa:** com o dicionário abaixo (valores fixos), salve em `leitor.json` com `json.dump(..., indent=4)`, carregue de volta com `json.load()` e exiba `nome`, `livro atual` e a quantidade de livros já lidos com `len()`.

```python
leitor = {
    "nome": "Marina",
    "livro_atual": "Dom Casmurro",
    "paginas_lidas": 120,
    "lidos": ["Capitães da Areia", "O Hobbit", "1984"],
}
```

**Saída esperada:**
```
Marina está lendo Dom Casmurro (120 páginas lidas).
Livros concluídos: 3
```

### Caso de uso: persistir catálogo com funções

Quando o programa precisa ler e gravar várias vezes, isole o acesso ao arquivo em duas funções:

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

> `os.path.exists()` evita erro ao abrir um arquivo que ainda não foi criado — na primeira execução, retornamos um dicionário vazio.

### Exercício 7.2 — Boletim da turma em JSON

**Contexto:** um professor quer guardar o boletim da turma em JSON e recalcular as médias ao reabrir o programa.

**Tarefa:** use as funções `carregar_boletim()` / `salvar_boletim(boletim)` (mesmo padrão do catálogo acima, arquivo `boletim.json`):
1. Carregue o boletim (se o arquivo não existir, comece com `{}`).
2. Cadastre os 3 alunos abaixo (chave = nome, valor = lista de notas).
3. Salve em JSON, carregue de volta e exiba `nome: média` com 1 casa decimal usando `sum()`/`len()`.

```python
novos = {
    "Ana": [8.0, 7.5, 9.0],
    "Bruno": [6.0, 5.5, 7.0],
    "Carla": [10.0, 9.5, 9.0],
}
```

**Saída esperada:**
```
Ana: 8.2
Bruno: 6.2
Carla: 9.5
```

## CSV — formato tabular

CSV (Comma-Separated Values) é o formato mais comum para dados tabulares — ensaios de tração, leituras de sensores, gastos mensais. Python lê/escreve CSV sem instalar bibliotecas extras:

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

### Exercício 7.3 — Gastos do mês em CSV

**Contexto:** uma pessoa quer registrar os gastos do mês num arquivo CSV e depois somar o total por categoria.

**Tarefa:**
1. Escreva `gastos.csv` com cabeçalho `["data", "categoria", "valor"]` e as 5 linhas abaixo, usando `csv.writer`.
2. Leia de volta com `csv.DictReader`, some os valores com `float()` e exiba cada linha como `data — categoria: R$ ...` mais o total.

```python
linhas = [
    ["2026-09-01", "mercado",   250.0],
    ["2026-09-03", "transporte", 80.0],
    ["2026-09-05", "mercado",   120.5],
    ["2026-09-10", "lazer",      90.0],
    ["2026-09-12", "transporte", 45.0],
]
```

**Saída esperada (trecho final):**
```
Total do mês: R$ 585.50
Gasto com mercado: R$ 370.50
```

> Dica: acumule dois totalizadores no laço — `total` e `total_mercado` (some só quando `linha["categoria"] == "mercado"`).

## CSV com Pandas + exibindo tabelas

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

No Colab, a forma mais comum de exibir dados tabulares é com um `DataFrame` — basta colocar o `df` como última linha da célula (o notebook o renderiza como tabela) ou usar `df.head()`.

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

### Exercício 7.4 — Cardápio da cantina vai e volta

**Contexto:** a cantina da escola guarda o cardápio da semana num DataFrame e precisa salvar em CSV e conferir se a leitura voltou igual.

**Tarefa:** com o dicionário abaixo (valores fixos):
1. Crie o DataFrame, exiba `df.shape` e `df.head(3)`.
2. Salve em `cardapio.csv` com `index=False` e leia de volta com `pd.read_csv()`.
3. Exiba o preço médio com `df["preco"].mean()` e o prato mais caro com `df.loc[df["preco"].idxmax()]`.

```python
cardapio = {
    "dia": ["seg", "ter", "qua", "qui", "sex"],
    "prato": ["Pizza", "Lasanha", "Salada", "Feijoada", "Suco + Pão"],
    "preco": [18.0, 22.0, 15.0, 25.0, 12.0],
}
```

**Saída esperada:**
```
(5, 3)
Preço médio: R$ 18.40
Prato mais caro: Feijoada (R$ 25.00)
```

## Criando DataFrames — diferentes fontes

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

## Estilo e resumo estatístico

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

Resumo de métricas com `describe()`:

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

### Exercício 7.5 — Boletim com estilo e estatísticas

**Contexto:** o professor do Exercício 7.2 agora quer apresentar o boletim como tabela estilizada e conferir as estatísticas da turma.

**Tarefa:** com o dicionário abaixo (valores fixos):
1. Monte o DataFrame pela **Opção 2** (lista de dicionários, um por aluno).
2. Exiba `df.describe()` e a média da turma em Português com `df["media"].mean()`.
3. Exiba a tabela estilizada com `df.style.background_gradient(cmap="viridis").format("{:.1f}")` (só colunas numéricas).

```python
alunos = [
    {"nome": "Ana", "P1": 8.0, "P2": 7.5, "P3": 9.0},
    {"nome": "Bruno", "P1": 6.0, "P2": 5.5, "P3": 7.0},
    {"nome": "Carla", "P1": 10.0, "P2": 9.5, "P3": 9.0},
    {"nome": "Diego", "P1": 4.0, "P2": 5.0, "P3": 6.0},
]
```

**Passos:** calcule a coluna `media` antes com `sum()`/`len()` ou `(P1+P2+P3)/3` num laço ou compreensão de listas.

**Saída esperada:**
```
Média da turma: 7.21
Maior média: Carla (9.50)
```

---

## Exercício 7.6 — Controle de Estoque com JSON

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

## Exercício 7.7 — Vitórias por Piloto na Fórmula 1

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

## Exercício 7.8 — Fatura de Luz com Tabela de Tarifas

**Contexto:** Uma concessionária de energia cobra a fatura a partir de uma **tabela de referência de tarifas** (faixa de consumo → R$/kWh). A cada mês, as leituras dos medidores chegam num segundo arquivo. O programa precisa cruzar os dois arquivos, calcular a fatura de cada cliente e salvar o relatório final — o fluxo típico de qualquer sistema que usa tabela de preços (energia, frete, impostos, convênios).

**Arquivos de entrada (execute este bloco primeiro para criá-los):**

```python
import pandas as pd

# Tabela de referência (preço por faixa de consumo)
pd.DataFrame([
    {"faixa": "social",      "consumo_min": 0,   "consumo_max": 100,    "tarifa_kwh": 0.65},
    {"faixa": "residencial", "consumo_min": 101, "consumo_max": 220,    "tarifa_kwh": 0.85},
    {"faixa": "alta",        "consumo_min": 221, "consumo_max": 999999, "tarifa_kwh": 1.10},
]).to_csv("tarifas.csv", index=False)

# Leituras dos medidores no mês
pd.DataFrame([
    {"cliente": "Ana",    "consumo_kwh": 85},
    {"cliente": "Bruno",  "consumo_kwh": 120},
    {"cliente": "Carla",  "consumo_kwh": 190},
    {"cliente": "Diego",  "consumo_kwh": 210},
    {"cliente": "Elisa",  "consumo_kwh": 250},
    {"cliente": "Fabio",  "consumo_kwh": 320},
    {"cliente": "Gabi",   "consumo_kwh": 95},
    {"cliente": "Heitor", "consumo_kwh": 230},
]).to_csv("leituras.csv", index=False)
```

**Regras de cálculo:**
- `valor_energia = consumo_kwh × tarifa_kwh` (tarifa vem da faixa em `tarifas.csv`)
- `taxa_fixa = R$ 15,00` para todos
- Bandeira: se `consumo_kwh > 200`, `acrescimo = consumo_kwh × 0,05`; senão `0`
- `total = valor_energia + taxa_fixa + acrescimo`
- `perfil`: `≤ 100` → `"economico"`; `≤ 220` → `"normal"`; senão `"alto consumo"`
- `alerta`: `consumo_kwh > 220` → `"revisar instalacao"`; senão `"ok"`

**O que o programa deve fazer:**
1. Ler os dois arquivos com `pd.read_csv()` (`tarifas.csv` é a tabela de referência, `leituras.csv` são os dados do mês).
2. Para cada cliente, localizar a faixa na tabela de referência (`consumo_min ≤ consumo ≤ consumo_max`) e aplicar as regras acima (use uma função `buscar_tarifa(consumo)` + laço sobre `leituras.iterrows()`).
3. Montar um DataFrame relatório com as colunas `cliente, consumo_kwh, faixa, tarifa_kwh, valor_energia, acrescimo_bandeira, total, perfil, alerta`, ordenado por `total` decrescente (`sort_values`).
4. Exibir o relatório, `df.describe()` e a contagem por perfil (`value_counts()`); estilizar a coluna `total` com `background_gradient`.
5. Salvar o relatório em `relatorio_faturas.csv` (`index=False`) e um resumo em `resumo_faturas.json` com `total_arrecadado`, `ticket_medio`, `maior_fatura {cliente, valor}` e `contagem_perfil`.
6. Recarregar `relatorio_faturas.csv` para provar que a persistência funcionou.

**Resultado esperado (trecho):**
```
cliente  consumo_kwh  faixa  total  perfil
Fabio    320          alta   383.00 alto consumo
Elisa    250          alta   302.50 alto consumo
...
Ana      85           social  70.25 economico
Total arrecadado: R$ 1609.50
Ticket médio: R$ 201.19
Maior fatura: Fabio (R$ 383.00)
Perfis: {'alto consumo': 3, 'normal': 3, 'economico': 2}
```

**Dica:** a busca na tabela pode ser um laço sobre `tarifas.iterrows()` retornando `(faixa, tarifa)` da primeira linha cuja faixa contém o consumo. O resumo JSON é um dicionário comum gravado com `json.dump(..., indent=4)`.

## Resumo da aula

**Persistência e Formatos:**
- JSON (`json.dump` / `json.load`) persiste dados estruturados em arquivos legíveis — use para configurações e dados hierárquicos
- CSV (`csv.writer` / `csv.DictReader`) é o formato padrão para dados tabulares
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
