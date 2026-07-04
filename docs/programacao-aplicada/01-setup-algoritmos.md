# Setup + Primeiros Passos

## Roteiro

1. O que é programação?
2. Algoritmos: a base de tudo
3. Python na Engenharia Mecânica
4. Python vs outras linguagens
5. Ecossistema Python
6. Configuração do ambiente
7. Primeiro programa — Hello World
8. Exercícios

## O que é programação?

Programação é o processo de **traduzir um problema do mundo real** em instruções que um computador possa executar.

```
  ┌────────────┐     ┌────────────┐     ┌──────────┐     ┌────────────┐
  │  Problema  │     │ Algoritmo  │     │  Código  │     │  Solução   │
  │     de     │────→│ sequência  │────→│  Python  │────→│  número /  │
  │ Engenharia │     │ de passos  │     │          │     │  gráfico   │
  └────────────┘     └────────────┘     └──────────┘     └────────────┘
```

- **Algoritmo**: sequência finita de passos — como uma receita de bolo
- **Código**: algoritmo escrito em uma linguagem que o computador entende
- **Programa**: código executável que resolve um problema específico

Nesta aula, o foco é entender o que é um algoritmo e configurar o ambiente para programar. O código Python será o mínimo necessário para ver o computador responder.

## Algoritmos — a base de tudo

Um **algoritmo** é uma sequência finita e bem definida de passos para resolver um problema. Você já usa algoritmos o tempo todo sem perceber.

### Exemplo cotidiano: preparar café

```
1. Pegar a garrafa térmica
2. Abrir a tampa
3. Colocar o filtro de papel
4. Adicionar 3 colheres de pó
5. Despejar água quente (200 mL)
6. Aguardar 5 minutos
7. Servir
```

Cada passo é claro, objetivo e executado em ordem. Se inverter a ordem, o café não fica pronto.

### Um exemplo de engenharia

Suponha que você precisa calcular a **tensão normal** em uma barra submetida a tração:

$$\sigma = \frac{F}{A}$$

O algoritmo para resolver este problema seria:

```
1. Identificar a força aplicada F (em N)
2. Identificar a área da seção transversal A (em m²)
3. Calcular sigma = F / A
4. Exibir o resultado em Pa
```

### Traduzindo para Python

Com Python, o algoritmo acima vira código:

```python
# Cálculo de tensão normal
F = 5000   # Força em Newtons
A = 0.002  # Área em m²

sigma = F / A

print(f"Tensão normal: {sigma} Pa")
print(f"Tensão normal: {sigma / 1e6:.2f} MPa")
```

Saída:
```
Tensão normal: 2500000.0 Pa
Tensão normal: 2.50 MPa
```

Perceba: o problema de engenharia (tensão numa barra) virou 5 linhas de código. O algoritmo é o mesmo que você faria no papel — a diferença é que o computador executa os cálculos instantaneamente.

> **Importante:** nesta aula, os valores estão fixos no código. Na aula 02 você aprenderá a criar programas que recebem valores do usuário.

## Para que programar na Engenharia Mecânica?

| Área | Aplicação |
|------|-----------|
| Automação | Controle CNC, supervisão de processos |
| Análise de Dados | Ensaios de tração, sensores, CEP |
| Ferramentas Práticas | Dashboards, calculadoras, relatórios |

Python é a linguagem que mais cresce em engenharia — e é **gratuita**.

### Por que não usar planilhas para tudo?

Planilhas são ótimas para dados simples. Mas à medida que os problemas crescem, surgem limitações:

| Situação | Planilha | Python |
|---|---|---|
| 100 linhas de dados | Confortável | Confortável |
| 100.000 linhas de dados | Lento / trava | Rápido |
| Repetir análise todo mês | Manual | **Automatizado** |
| Compartilhar ferramenta interativa | Arquivo .xlsx frágil | **App Web** |
| Gráfico animado / interativo | Limitado | **Plotly / Streamlit** |

A habilidade de programar não substitui o conhecimento de engenharia — ela **multiplica** o que você já sabe.

## Python vs outras linguagens

| Característica | Python | MATLAB | C/C++ |
|---|---|---|---|
| Licença | **Gratuito** | Licença paga | Gratuito |
| Curva de aprendizado | **Baixa** | Média | Alta |
| Bibliotecas científicas | NumPy, SciPy, Pandas | Toolboxes pagos | Boost, Eigen |
| Gráficos | Matplotlib, Plotly | Nativo | Qt, VTK |
| Dashboards | **Streamlit** | MATLAB Web App | CGI |
| Comunidade | Gigante | Restrita | Gigante |

## Ecossistema Python para Engenharia

```
  ┌─────────────────────────────────────┐
  │           Streamlit                 │  ← Interface
  │      Dashboards & Apps Web          │
  └────────────────┬────────────────────┘
                   │
          ┌────────┴──────────────────┐
          │  Matplotlib / Plotly      │
          │  Gráficos 2D interativos  │  ← Visualização
          └────────┬──────────────────┘
                   │
          ┌────────┴────────────┐
          │ Pandas / Dataframes │  ← Análise
          └────────┬────────────┘
                   │
          ┌────────┴────────────────────┐
          │ NumPy - Arrays - Matemática │  ← Cálculos
          └────────┬────────────────────┘
                   │
          ┌────────┴────────┐
          │    Python       │  ← Núcleo
          └─────────────────┘
```

Cada camada depende da anterior. No decorrer da disciplina, você aprenderá a usar todas elas — começando pela base (esta aula) e chegando até apps web interativos (a partir da aula 02).

## Instalação e Configuração do Ambiente

### Python

1. Acesse [python.org](https://www.python.org/)
2. **Downloads** → Windows/macOS
3. Baixe a versão mais recente (3.12+)
4. Execute o instalador marcando **"Add Python to PATH"**
5. Verifique no terminal:

```bash
python --version
```

No macOS, instale via Homebrew: `brew install python`

### VS Code

1. Acesse [code.visualstudio.com](https://code.visualstudio.com/)
2. Baixe e instale
3. Extensões essenciais: **Python** (ms-python.python), **Pylance** (ms-python.vscode-pylance), **Jupyter** (ms-toolsai.jupyter)

### Ambiente virtual (`venv`)

Ambiente virtual é uma **instalação isolada do Python** para cada projeto, evitando conflitos entre versões de bibliotecas.

```bash
# Criar ambiente virtual
python -m venv venv

# Ativar (Windows)
venv\Scripts\activate

# Ativar (Mac / Linux)
source venv/bin/activate
```

O terminal mostrará `(venv)` — sinal de que o ambiente está ativo. Quando terminar, digite `deactivate` para sair.

> **Por que usar `venv`?** Imagine que o Projeto A precisa da versão 1.5 de uma biblioteca, e o Projeto B precisa da versão 2.0. Sem ambientes virtuais, apenas uma versão poderia estar instalada no sistema. Com `venv`, cada projeto tem seu próprio espaço isolado.

## Primeiro programa — Hello World

Crie um arquivo `hello.py`:

```python
# Meu primeiro programa
print("Hello, World!")
print("Bem-vindo à Programação Aplicada!")
```

> A função `print()` escreve o valor dos argumentos fornecidos na tela.

Execute no terminal:

```bash
python hello.py
```

Se aparecer a mensagem, o ambiente está configurado corretamente.

---

## Exercício 1.1 — Algoritmo do Pistão Hidráulico

**Contexto:** Uma empresa de equipamentos hidráulicos precisa de uma ferramenta para que seus técnicos dimensionem pistões. Antes de escrever código, o engenheiro deve documentar o algoritmo.

**Fórmula:**

$$P = \frac{F}{A} \qquad A = \frac{\pi \cdot d^2}{4}$$

**Tarefa:** Escreva o algoritmo (em português, passo a passo) para calcular a pressão em um pistão, dados a força aplicada `F` e o diâmetro do êmbolo `d`. Siga o modelo do algoritmo da tensão visto em aula.

**Dica:** lembre-se de converter o diâmetro de mm para m antes de calcular a área.

**Valores de teste:** `F = 12 000 N`, `d = 40 mm` → `A = 1 256.64 mm²`, `P = 9.55 MPa`

---

## Exercício 1.2 — Execute o código de tensão

Crie um arquivo `tensao.py` com o código de cálculo de tensão visto nesta aula. Execute e confirme que a saída é:

```
Tensão normal: 2500000.0 Pa
Tensão normal: 2.50 MPa
```

Em seguida, altere os valores de `F` e `A` para `F = 8000 N` e `A = 0.004 m²` e execute novamente. Qual é a tensão em MPa?

---

## Resumo da aula

- Programação é traduzir problemas em algoritmos e algoritmos em código
- Um algoritmo é uma sequência finita e bem definida de passos
- Python é gratuito, de baixa curva de aprendizado e ideal para engenharia
- Use `print()` para exibir resultados no terminal
- Ambiente virtual (`venv`) isola dependências entre projetos

## Referências

- **Python.org — Tutorial oficial (pt-BR)** — https://docs.python.org/pt-br/3/tutorial/
- **Python.org — Função print()** — https://docs.python.org/3/library/functions.html#print
- **Python.org — Ambientes virtuais (venv)** — https://docs.python.org/pt-br/3/tutorial/venv.html
- **Streamlit Docs — Get Started** — https://docs.streamlit.io/get-started
- **VS Code — Python extension** — https://code.visualstudio.com/docs/languages/python
