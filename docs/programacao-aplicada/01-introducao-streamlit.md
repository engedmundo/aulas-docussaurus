# Introdução + Streamlit

## Roteiro

1. O que é programação?
2. Python na Engenharia Mecânica
3. Ecossistema Python
4. Configuração do ambiente
5. Primeiro programa
6. **Streamlit**: interfaces sem complicação
7. Exercícios práticos

## O que é programação?

Programação é o processo de **traduzir um problema do mundo real** em instruções que um computador possa executar.

```
  ┌────────────┐     ┌────────────┐     ┌──────────┐     ┌────────────┐
  │  Problema  │     │ Algoritmo  │     │  Código  │     │  Solução   │
  │     de     │────→│ sequência  │────→│  Python  │────→│  número /  │
  │ Engenharia │     │ de passos  │     │          │     │  gráfico   │
  └────────────┘     └────────────┘     └──────────┘     └────────────┘
```

- **Algoritmo**: sequência finita de passos — como uma receita de bolo ([Python.org — Tutorial](https://docs.python.org/pt-br/3/tutorial/introduction.html))
- **Código**: algoritmo escrito em uma linguagem que o computador entende
- **Programa**: código executável que resolve um problema específico

### Um exemplo concreto

Suponha que você precisa calcular a **tensão normal** em uma barra submetida a tração:

$$\sigma = \frac{F}{A}$$

O "algoritmo" para resolver este problema seria:

1. Receber a força aplicada `F` (em N)
2. Receber a área da seção transversal `A` (em m²)
3. Dividir `F` por `A`
4. Exibir o resultado em Pa

Em Python, isso se traduz diretamente:

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

Perceba: o problema de engenharia (tensão numa barra) virou 5 linhas de código. Essa é a essência da programação aplicada.

## Para que programar na Engenharia Mecânica?

| Área | Aplicação |
|------|-----------|
| Automação | Controle CNC, supervisão de processos |
| Análise de Dados | Ensaios de tração, sensores, CEP |
| Ferramentas Práticas | Dashboards, calculadoras, relatórios |

Python é a linguagem que mais cresce em engenharia — e é **gratuita** ([Python.org — Sobre](https://www.python.org/about/)).

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

Cada camada depende da anterior. No decorrer da disciplina, você aprenderá a usar todas elas — começando pela base e chegando até apps web interativos.

## Instalação e Configuração do Ambiente

### Python

1. Acesse [python.org](https://www.python.org/)
2. **Downloads** → Windows/macOS
3. Baixe a versão mais recente (3.12+) — veja o [guia oficial de instalação](https://docs.python.org/pt-br/3/using/index.html)
4. Execute o instalador marcando **"Add Python to PATH"**
5. Verifique no terminal:

```bash
python --version
```

> **Fonte:** [Python.org — Guia de instalação](https://docs.python.org/pt-br/3/using/index.html)

No macOS, instale via Homebrew: `brew install python`

### VS Code

1. Acesse [code.visualstudio.com](https://code.visualstudio.com/)
2. Baixe e instale
3. Extensões essenciais: **Python** (ms-python.python), **Pylance** (ms-python.vscode-pylance), **Jupyter** (ms-toolsai.jupyter)

### Ambiente virtual (`venv`)

Ambiente virtual é uma **instalação isolada do Python** para cada projeto, evitando conflitos entre versões de bibliotecas ([Python.org — Tutorial ambientes virtuais](https://docs.python.org/pt-br/3/tutorial/venv.html)).

```bash
# Criar ambiente virtual (usa o módulo venv)
python -m venv venv

# Ativar (Windows)
venv\Scripts\activate

# Ativar (Mac / Linux)
source venv/bin/activate
```

O terminal mostrará `(venv)` — sinal de que o ambiente está ativo. Quando terminar, digite `deactivate` para sair ([Python.org — venv](https://docs.python.org/pt-br/3/tutorial/venv.html)).

> **Por que usar `venv`?** Imagine que o Projeto A precisa da versão 1.5 de uma biblioteca, e o Projeto B precisa da versão 2.0. Sem ambientes virtuais, apenas uma versão poderia estar instalada no sistema. Com `venv`, cada projeto tem seu próprio espaço isolado.

### Instalação do Streamlit

Com o ambiente virtual ativo:

```bash
pip install streamlit
```

Verifique a instalação:

```bash
streamlit hello
```

Isso abre um app de demonstração no navegador em `http://localhost:8501`.

## Primeiro programa — Hello World

Crie um arquivo `hello.py`:

```python
# Meu primeiro programa
print("Hello, World!")
print("Bem-vindo à Programação Aplicada!")
```

> A função `print()` escreve o valor dos argumentos fornecidos na tela ([Python.org — print()](https://docs.python.org/3/library/functions.html#print)).

Execute no terminal:

```bash
python hello.py
```

## Streamlit

### O que é?

Streamlit é um framework Python que transforma scripts em **aplicações web interativas** sem escrever HTML, CSS ou JavaScript ([Streamlit Docs — Get Started](https://docs.streamlit.io/get-started)).

**Tradicional:**
```
HTML ──> CSS ──> JavaScript ──> Backend → meses de aprendizado → App Web
```

**Streamlit:**
```
Python puro ──> App Web (em 5 minutos)
```

### Por que Streamlit na Engenharia?

| Problema | Solução Tradicional | Com Streamlit |
|---|---|---|
| Dashboard de sensores | Node.js + React + API | **30 linhas de Python** |
| Calculadora técnica | HTML + JavaScript | **15 linhas de Python** |
| Visualizar ensaio | Exportar → Excel → Gráfico | **Automatizado** |
| Compartilhar ferramenta | Servidor web complexo | **Um comando** |

### Anatomia de um App Streamlit

```python
import streamlit as st
st.title("Meu App")
st.write("Olá!")
     ↓
Python executa de cima para baixo
     ↓
Interface Web (título + texto)
```

- Cada **execução** do script recria a página
- Você só escreve Python — o Streamlit cuida da web
- Toda interação do usuário reexecuta o script

### Primeiro App Streamlit

Crie `app.py`:

```python
import streamlit as st

st.title("Meu Primeiro App")
st.write("Olá, turma de Eng. Mecânica!")
st.write("Bem-vindos à Programação Aplicada.")
```

Execute:

```bash
streamlit run app.py
```

### Elementos básicos

```python
import streamlit as st

# Títulos
st.title("Título principal")
st.header("Cabeçalho")
st.subheader("Subcabeçalho")

# Texto formatado
st.write("Texto com **negrito** e *itálico*")
st.markdown("Texto em **Markdown**")

# Linha separadora
st.divider()

# Código formatado
codigo = "print('Olá')"
st.code(codigo, language="python")
```

### Widgets — tornando o app interativo

A grande vantagem do Streamlit são os **widgets**: componentes visuais que permitem ao usuário interagir com o app. Cada vez que o usuário altera um widget, o script reexecuta automaticamente com o novo valor.

```python
import streamlit as st

# Entrada de texto
nome = st.text_input("Qual é o seu nome?")
st.write(f"Olá, {nome}!")

# Controle deslizante (slider)
temperatura = st.slider("Temperatura (°C)", min_value=0, max_value=1500, value=25)
st.write(f"Temperatura selecionada: {temperatura} °C")

# Caixa de seleção
material = st.selectbox("Material", ["Aço", "Alumínio", "Cobre", "Titânio"])
st.write(f"Material escolhido: {material}")

# Caixa de verificação
modo_avancado = st.checkbox("Mostrar opções avançadas")
if modo_avancado:
    st.write("Opções avançadas ativadas!")
```

### Exibindo métricas e resultados

O Streamlit possui componentes específicos para exibir resultados de forma clara:

```python
import streamlit as st

st.header("Resultado do Cálculo")

# Métricas destacadas
col1, col2, col3 = st.columns(3)
col1.metric("Tensão", "250 MPa")
col2.metric("Deformação", "0.12%")
col3.metric("Fator de Segurança", "2.5")

# Caixa de informação
st.info("O material está dentro dos limites de segurança.")

# Caixa de alerta
st.warning("A temperatura está próxima do limite.")

# Caixa de erro
st.error("Tensão acima do limite de escoamento!")

# Caixa de sucesso
st.success("Cálculo concluído com sucesso!")
```

### Exemplo completo: Calculadora de Tensão

Veja como integrar widgets, colunas e métricas em um app funcional de engenharia:

```python
import streamlit as st
import math

st.title("Calculadora de Tensão Normal")
st.write("Calcula a tensão em barras sob carregamento axial: σ = F / A")

st.divider()

# Entradas do usuário
col1, col2 = st.columns(2)

with col1:
    F = st.number_input("Força aplicada F (N)", min_value=0.0, value=5000.0, step=100.0)

with col2:
    diametro = st.number_input("Diâmetro da barra (mm)", min_value=0.1, value=50.0, step=1.0)

# Cálculo
A = math.pi * (diametro / 1000) ** 2 / 4   # converter mm → m, depois m²
sigma = F / A                                # tensão em Pa

st.divider()
st.subheader("Resultado")

col3, col4 = st.columns(2)
col3.metric("Área da seção (mm²)", f"{A * 1e6:.2f}")
col4.metric("Tensão normal (MPa)", f"{sigma / 1e6:.2f}")
```

Execute com `streamlit run calculadora.py` e experimente alterar os valores — o resultado atualiza instantaneamente!

> Na aula 03 você aprenderá `if/elif/else` e poderá adicionar a verificação do fator de segurança: se σ está abaixo do limite de escoamento, o app exibirá aprovado ou reprovado automaticamente.

---

## Exercício 1.1 — Pressão de Pistão Hidráulico

**Contexto:** Uma empresa de equipamentos hidráulicos precisa de uma ferramenta rápida para que seus técnicos dimensionem pistões. O engenheiro responsável pelo setor de projetos quer que os técnicos consigam verificar a pressão de trabalho de qualquer pistão apenas informando a força aplicada e o diâmetro do êmbolo — sem precisar abrir uma planilha ou fazer contas no papel.

**Fórmulas:**

$$P = \frac{F}{A} \qquad A = \frac{\pi \cdot d^2}{4}$$

**O que o app deve ter:**
- Um título e uma breve descrição do cálculo
- Dois campos de entrada lado a lado: força `F` (N) e diâmetro `d` (mm)
- Dois resultados lado a lado: área da seção (mm²) e pressão (MPa)
- Use `st.number_input`, `st.columns` e `st.metric`

**Valores de teste:** `F = 12 000 N`, `d = 40 mm` → `A = 1 256.64 mm²`, `P = 9.55 MPa`

**Dica:** importe `math` para usar `math.pi`, e lembre de converter `d` de mm para m antes de calcular a área em m².

---

## Referências

- **Python.org — Tutorial oficial (pt-BR)** — https://docs.python.org/pt-br/3/tutorial/
- **Python.org — Função print()** — https://docs.python.org/3/library/functions.html#print
- **Python.org — Ambientes virtuais (venv)** — https://docs.python.org/pt-br/3/tutorial/venv.html
- **Python.org — f-strings** — https://docs.python.org/pt-br/3/tutorial/inputoutput.html#formatted-string-literals
- **Streamlit Docs — Get Started** — https://docs.streamlit.io/get-started
- **Streamlit Docs — Widgets** — https://docs.streamlit.io/develop/api-reference/widgets
- **VS Code — Python extension** — https://code.visualstudio.com/docs/languages/python
- **NumPy — Documentação oficial** — https://numpy.org/doc/stable/
- **Pandas — Documentação oficial** — https://pandas.pydata.org/docs/
- **PEP 8 — Style Guide** — https://peps.python.org/pep-0008/
