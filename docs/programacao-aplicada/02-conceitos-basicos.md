# Conceitos Básicos + Apps Interativos

## Roteiro

1. Pensamento computacional
2. Variáveis e tipos de dados
3. Conversão de tipos
4. Entrada e saída (`print` / `input`)
5. Operadores matemáticos
6. Instalação do Streamlit
7. Streamlit: primeiros passos (anatomia, elementos básicos, métricas)
8. Widgets Streamlit: `st.number_input`, `st.slider`, `st.selectbox`, `st.button`
9. Exemplo completo: Calculadora de Tensão
10. Exercícios em Streamlit
11. **Mini-projeto:** Calculadora de Usinagem

## Pensamento Computacional

Na aula anterior, vimos que programar é traduzir um problema em código. O **pensamento computacional** é o processo de raciocínio que permite fazer essa tradução de forma organizada.

Ele se apoia em quatro pilares:

| Pilar | O que significa | Exemplo prático |
|---|---|---|
| **Decomposição** | Dividir o problema em partes menores | Calcular o custo de usinagem = tempo + material + energia |
| **Padrões** | Identificar repetições e generalizar | Mesma fórmula de tensão serve para qualquer barra axial |
| **Abstração** | Focar no essencial, ignorar o irrelevante | Para calcular σ = F/A, não importa a cor da peça |
| **Algoritmos** | Sequência de passos para resolver o problema | Receber F → receber A → calcular → exibir resultado |

### Da aula 01 para a aula 02

Na aula 01 você escreveu seu primeiro algoritmo para calcular tensão:

```
1. Receber F (N)
2. Receber A (m²)
3. sigma = F / A
4. Exibir resultado
```

Agora você vai aprender a escrever cada um desses passos em Python com precisão: como **guardar valores** (variáveis), como **recebê-los do usuário** (`input` / widgets) e como **calculá-los** (operadores).

## Variáveis em Python

Uma variável é um **nome que guarda um valor na memória**. Pense na RAM do computador como uma bancada de laboratório com etiquetas — cada etiqueta é uma variável, e o valor é o que está sobre a bancada naquela posição.

```python
# Sintaxe: nome_da_variavel = valor
forca = 5000.0       # guarda o número 5000.0 com o nome "forca"
material = "Aço 1020"  # guarda um texto com o nome "material"
```

O sinal `=` em Python não é igualdade matemática — é uma **atribuição**: "coloque este valor neste nome".

### Regras para nomear variáveis

- Apenas letras, números e `_` — sem espaços ou acentos
- Não pode começar com número: `1forca` é inválido, `forca1` é válido
- **Case-sensitive**: `Forca` e `forca` são variáveis diferentes
- Use **snake_case** para nomes compostos: `temperatura_maxima`, `forca_axial`
- Evite palavras reservadas: `if`, `for`, `while`, `class`, `import`...

```python
# Bons nomes — descritivos e legíveis
forca_axial = 5000.0
area_seccao = 0.002
temperatura_maxima = 850.0
nome_material = "Aço SAE 4340"

# Nomes ruins — evite
x = 5000.0       # o que é x?
tmp = 850.0      # ambíguo
F = 5000.0       # aceitável em fórmulas curtas, mas prefira por extenso
```

## Tipos de Dados Básicos

Python reconhece automaticamente o tipo de dado a partir do valor atribuído. Os quatro tipos fundamentais são:

| Tipo | Nome | Quando usar | Exemplos |
|---|---|---|---|
| `int` | Inteiro | Contagens, quantidades sem fração | `150`, `-5`, `0` |
| `float` | Decimal | Medidas físicas, cálculos de engenharia | `2.5`, `3.14`, `1e-3` |
| `str` | Texto | Nomes, códigos, mensagens | `"Aço 1020"`, `'FRE-042'` |
| `bool` | Lógico | Condições, flags de estado | `True`, `False` |

```python
# int — número inteiro (sem ponto decimal)
num_pecas = 150
ciclos_fadiga = 1_000_000   # underscore como separador de milhar (legibilidade)

# float — número com ponto decimal
pressao = 2.5               # MPa
coef_dilatacao = 11.7e-6   # notação científica: 11.7 × 10⁻⁶ m/(m·°C)

# str — texto entre aspas simples ou duplas
material = "Aço 1020"
codigo_peca = 'FRE-0042'

# bool — apenas True ou False (maiúsculo)
sensor_ok = True
alarme_ativo = False
```

> Use `type(variavel)` para verificar o tipo de qualquer valor: `print(type(pressao))` → `<class 'float'>`

### Notação científica em floats

Em engenharia, valores muito pequenos ou muito grandes são comuns. Python aceita notação científica diretamente:

```python
E_aco = 200e9        # Módulo de elasticidade: 200 × 10⁹ Pa = 200 GPa
alpha = 11.7e-6      # Coef. de dilatação: 11.7 × 10⁻⁶ m/(m·°C)
sigma_esc = 250e6    # Limite de escoamento: 250 × 10⁶ Pa = 250 MPa
```

## Conversão de Tipos

Frequentemente você precisará converter um tipo em outro. Isso é chamado de **casting**:

| Função | Converte para | Exemplo |
|---|---|---|
| `int(x)` | inteiro | `int(3.9)` → `3` (trunca, não arredonda) |
| `float(x)` | decimal | `float(5)` → `5.0` |
| `str(x)` | texto | `str(250)` → `"250"` |
| `round(x, n)` | arredonda | `round(3.14159, 2)` → `3.14` |

```python
# Exemplo prático — leitura de terminal
entrada = input("Digite a força (N): ")   # input() SEMPRE retorna str
print(type(entrada))                       # <class 'str'>

forca = float(entrada)                     # converte para número
print(type(forca))                         # <class 'float'>

# Erro comum: tentar calcular sem converter
# resultado = entrada / 0.002   ← TypeError: não dá para dividir str
```

### Por que `int(3.9)` não arredonda?

```python
print(int(3.9))    # → 3  (trunca)
print(int(-3.9))   # → -3 (trunca em direção a zero)
print(round(3.9))  # → 4  (arredonda para o inteiro mais próximo)
```

Para arredondar corretamente, use `round()`. O `int()` apenas descarta a parte decimal.

## Comando de Saída — `print()`

`print()` exibe valores no terminal. É a principal ferramenta para depuração e saída de resultados.

```python
print("Olá, mundo!")             # texto literal
print(42)                        # número
print("Tensão:", 250, "MPa")     # múltiplos valores separados por vírgula
```

### f-strings — a forma moderna de formatar saída

f-strings (Python 3.6+) permitem inserir variáveis e expressões diretamente dentro de texto:

```python
forca = 5000.0
area = 0.002
sigma = forca / area

# Sem f-string — verboso
print("Tensão: " + str(sigma) + " Pa")

# Com f-string — legível
print(f"Tensão: {sigma} Pa")
```

### Formatação de casas decimais

Em engenharia, o número de casas decimais importa. Use especificadores de formato dentro das chaves `{}`:

| Especificador | Significado | Exemplo | Saída |
|---|---|---|---|
| `:.2f` | 2 casas decimais (fixo) | `f"{3.14159:.2f}"` | `3.14` |
| `:.4f` | 4 casas decimais | `f"{3.14159:.4f}"` | `3.1416` |
| `:.3e` | notação científica | `f"{0.000117:.3e}"` | `1.170e-04` |
| `:,.2f` | separador de milhar | `f"{1849.5:,.2f}"` | `1,849.50` |
| `:.1%` | percentual | `f"{0.7849:.1%}"` | `78.5%` |

```python
sigma = 2_500_000.0   # Pa

print(f"Tensão: {sigma:.0f} Pa")           # Tensão: 2500000 Pa
print(f"Tensão: {sigma/1e6:.2f} MPa")      # Tensão: 2.50 MPa
print(f"Tensão: {sigma:.3e} Pa")           # Tensão: 2.500e+06 Pa
```

## Comando de Entrada — `input()`

`input()` pausa o programa e aguarda o usuário digitar algo. **Sempre retorna uma string**, independentemente do que for digitado.

```python
nome = input("Qual é o seu nome? ")
print(f"Olá, {nome}!")
```

Para receber números, converta com `int()` ou `float()`:

```python
# Leitura de dados de um ensaio
forca_str = input("Força aplicada (N): ")
forca = float(forca_str)

diam_str = input("Diâmetro da barra (mm): ")
diametro = float(diam_str)

# Cálculo
import math
area = math.pi * (diametro / 1000) ** 2 / 4
sigma = forca / area

print(f"Área da seção: {area * 1e6:.2f} mm²")
print(f"Tensão normal: {sigma / 1e6:.2f} MPa")
```

> **Nota:** Em apps Streamlit, `input()` não é usado — substituímos por widgets como `st.number_input`. O `input()` é útil para scripts de terminal e para entender o fluxo de entrada de dados.

## Operadores Matemáticos

| Operador | Operação | Exemplo | Resultado |
|---|---|---|---|
| `+` | Adição | `10 + 3` | `13` |
| `-` | Subtração | `10 - 3` | `7` |
| `*` | Multiplicação | `10 * 3` | `30` |
| `/` | Divisão | `10 / 3` | `3.333...` |
| `//` | Divisão inteira | `10 // 3` | `3` |
| `%` | Módulo (resto) | `10 % 3` | `1` |
| `**` | Exponenciação | `10 ** 3` | `1000` |

### Precedência e um erro clássico

A precedência em Python segue a matemática: `()` > `**` > `*` `/` > `+` `-`

```python
# Correto: ** tem prioridade sobre *, então π * (r²)
r = 0.025
A = math.pi * r ** 2   # equivale a math.pi * (r ** 2) → CERTO

# Erro clássico com parênteses — tensão em viga composta
F = 1000
b = 0.05
h = 0.10

# Intenção: σ = F / (b * h)
sigma_errado = F / b * h       # executa (F/b) primeiro, depois × h → 2.000 Pa
sigma_certo  = F / (b * h)    # parênteses forçam b*h primeiro → 200.000 Pa

print(f"Sem parênteses: {sigma_errado:.0f} Pa")   # 2000 Pa — ERRADO
print(f"Com parênteses:  {sigma_certo:.0f} Pa")    # 200000 Pa — CERTO
```

**Regra prática:** em fórmulas com divisão seguida de multiplicação, use parênteses sempre que houver ambiguidade.

### Módulo e divisão inteira — onde são úteis?

```python
# Divisão inteira — quantas peças cabem por caixa?
total_pecas = 157
por_caixa = 12
caixas_cheias = total_pecas // por_caixa   # 13
sobra = total_pecas % por_caixa            # 1

print(f"{caixas_cheias} caixas cheias e {sobra} peça(s) sobrando")

# Exponenciação — volume de uma esfera
r = 0.05  # raio em metros
V = (4/3) * math.pi * r**3
print(f"Volume: {V:.6f} m³")
```

## Instalação do Streamlit

Antes de criar apps web, instale o Streamlit:

```bash
pip install streamlit
```

Verifique:

```bash
streamlit hello
```

Isso abre um app de demonstração no navegador em `http://localhost:8501`. Explore à vontade — a seguir você criará o seu próprio.

## Streamlit — Apps Web com Python

Até agora os programas rodaram no terminal com `print()` e `input()`. Mas e se você quiser criar uma **interface gráfica** que qualquer pessoa possa usar sem instalar Python?

Streamlit é um framework que transforma scripts Python em **aplicações web interativas** sem escrever HTML, CSS ou JavaScript.

**Tradicional:**
```
HTML ──> CSS ──> JavaScript ──> Backend → meses de aprendizado → App Web
```

**Streamlit:**
```
Python puro ──> App Web (em segundos)
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

## Streamlit — Widgets de Entrada

Agora que você já viu como criar um app Streamlit, vamos aprofundar os widgets de entrada que substituem o `input()` nos apps.

### Comparação: console vs. Streamlit

```python
# Console (terminal)
forca = float(input("Força (N): "))
material = input("Material: ")

# Streamlit (app web)
forca = st.number_input("Força (N):", min_value=0.0)
material = st.selectbox("Material:", ["Aço", "Alumínio"])
```

A lógica é a mesma: receber um valor e guardar em uma variável. A diferença é a interface.

### `st.number_input` — entrada numérica

```python
import streamlit as st

st.number_input(
    label,        # rótulo exibido
    min_value,    # valor mínimo aceito
    max_value,    # valor máximo aceito
    value,        # valor inicial
    step,         # incremento ao clicar nas setas
    format        # formato de exibição
)
```

Exemplos práticos:

```python
# Inteiro
num_pecas = st.number_input("Quantidade de peças:",
                             min_value=1, step=1, format="%d")

# Decimal com 2 casas
forca = st.number_input("Força aplicada (N):",
                         min_value=0.0, value=5000.0,
                         step=100.0, format="%.1f")
```

> `st.number_input` já retorna `float` ou `int` — não precisa usar `float()` para converter.

### `st.slider` — controle deslizante

Útil quando o usuário precisa explorar uma faixa de valores de forma visual:

```python
temperatura = st.slider(
    "Temperatura de operação (°C)",
    min_value=20,
    max_value=1200,
    value=850,
    step=10
)
st.write(f"Temperatura selecionada: {temperatura} °C")
```

Quando usar `slider` vs `number_input`:
- **`slider`**: exploração visual, faixas não muito grandes, contexto de "experimentar"
- **`number_input`**: entrada precisa, valores arbitrários, cálculos de engenharia

### `st.selectbox` — seleção de opções

Para escolhas pré-definidas:

```python
material = st.selectbox(
    "Material:",
    ["Aço 1020", "Aço 4340", "Alumínio 6061", "Latão"]
)

diametro_broca = st.selectbox(
    "Diâmetro da broca (mm):",
    [6, 8, 10, 12, 16, 20, 25]
)
```

### `st.button` — ação sob demanda

`st.button` retorna `True` apenas no momento em que é clicado. Todo o código dentro do `if` só executa nesse momento:

```python
forca = st.number_input("Força (N):", value=5000.0)
area  = st.number_input("Área (m²):", value=0.002, format="%.4f")

if st.button("Calcular tensão"):
    sigma = forca / area
    st.metric("Tensão normal", f"{sigma/1e6:.2f} MPa")
```

**Por que usar `st.button`?** Sem o botão, o cálculo roda a cada vez que o usuário digita — inclusive quando o campo está incompleto (ex.: durante a digitação de `0.002`, passa por `0`, `0.`, `0.0`). O botão garante que o cálculo só ocorre com os valores finais.

### `st.columns` — layout lado a lado

Distribui widgets e resultados em colunas:

```python
col1, col2 = st.columns(2)

with col1:
    forca = st.number_input("Força (N):", value=5000.0)

with col2:
    area = st.number_input("Área (m²):", value=0.002, format="%.4f")
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
A = math.pi * (diametro / 1000) ** 2 / 4
sigma = F / A

st.divider()
st.subheader("Resultado")

col3, col4 = st.columns(2)
col3.metric("Área da seção (mm²)", f"{A * 1e6:.2f}")
col4.metric("Tensão normal (MPa)", f"{sigma / 1e6:.2f}")
```

Execute com `streamlit run calculadora.py` e experimente alterar os valores — o resultado atualiza instantaneamente!

> Na aula 03 você aprenderá `if/elif/else` e poderá adicionar a verificação do fator de segurança: se σ está abaixo do limite de escoamento, o app exibirá aprovado ou reprovado automaticamente.

---

## Exercício 2.1 — Média de Dureza Rockwell

**Contexto:** O setor de controle de qualidade de uma metalúrgica recebe lotes de eixos de aço temperado que passam por tratamento térmico de têmpera e revenimento. A especificação técnica exige que a dureza Rockwell C (HRC) seja de no mínimo 40 HRC para garantir a resistência ao desgaste adequada. O técnico de qualidade realiza três medições em pontos diferentes de cada eixo e precisa calcular a média para decidir se o lote é aprovado ou rejeitado.

**Fórmula:**

$$media = \frac{d_1 + d_2 + d_3}{3}$$

**O que o app deve ter:**
- Título e descrição da especificação mínima
- Três campos de entrada lado a lado para as medições (HRC)
- Um botão "Calcular média"
- Exibição do resultado com `st.metric`

**Valores de teste:** `d1 = 41.5`, `d2 = 43.0`, `d3 = 43.0` → média esperada: `42.50 HRC`

> **Próxima aula:** em `03 — Condicionais` você adicionará a aprovação/rejeição do lote com `if media >= 40: st.success(...) else: st.error(...)`, e um campo opcional de 4ª medição com `st.checkbox`.

## Exercício 2.3 — Relação de Transmissão

**Contexto:** Uma indústria de papel e celulose precisa projetar um redutor de velocidade para um transportador de rolos que leva bobinas de papel entre as seções da máquina. O motor elétrico disponível opera a 1750 RPM, mas o transportador precisa girar a uma velocidade bem menor para não danificar o material. O engenheiro de manutenção precisa calcular a relação de transmissão e a rotação de saída do redutor.

**Fórmulas:**

$$i = \frac{z_{movida}}{z_{motriz}} \qquad n_{saida} = \frac{n_{motor}}{i}$$

**O que o app deve ter:**
- Campo de entrada para a rotação do motor (RPM)
- Dois campos lado a lado para os dentes das engrenagens (motriz e movida)
- Um botão "Calcular"
- Dois resultados lado a lado: relação de transmissão e rotação de saída

**Valores de teste:** `z_motriz = 20 dentes`, `z_movida = 70 dentes`, `n_motor = 1750 RPM` → `i = 3.50`, `n_saída = 500.00 RPM`

> **Desafios opcionais:** pratique mais com os exercícios a seguir:
> - **IMC do Operador** — mesmo padrão da calculadora de tensão, aplicado à ergonomia (NR-17)
> - **Cilindro com Desperdício** — combine geometria, densidade e custo em um único app
> - **Dilatação Térmica** — adicione `st.selectbox` para selecionar material automaticamente
> - **Custo Operacional de Fresadora** — use `st.slider` para horas/dia e calcule impostos

## Exercício 2.7 — Pressão de Pistão Hidráulico

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

## Mini-Projeto — Calculadora de Usinagem

**Contexto:** A engenharia de processo de uma fábrica de componentes automotivos precisa de uma ferramenta interna para calcular rapidamente os parâmetros de corte e o custo de operações de torneamento cilíndrico externo. A ferramenta será usada pelos técnicos de chão de fábrica para verificar se os parâmetros de usinagem estão adequados antes de iniciar a produção de um lote.

**Fórmulas:**

$$V_c = \frac{\pi \cdot d \cdot n}{1000} \quad \text{(velocidade de corte, m/min)}$$

$$t = \frac{L}{f \cdot n} \quad \text{(tempo de corte, min)}$$

$$m = \frac{\pi \cdot d^2}{4} \cdot L \cdot \rho \cdot 10^{-6} \quad \text{(massa da peça, kg)}$$

$$custo = \left(t \cdot \frac{custo_{hora}}{60}\right) + (m \cdot preco_{kg})$$

**Parâmetros:**
- `d` — diâmetro da peça (mm)
- `n` — rotação do torno (RPM)
- `L` — comprimento usinado (mm)
- `f` — avanço por rotação (mm/rot)
- `ρ` — densidade do material (kg/m³)

**O que o app deve ter:**
- Seção "Geometria e corte" com campos para diâmetro, rotação, comprimento e avanço
- Seção "Material e custo" com seleção de material (via `st.selectbox`), custo horário e preço por kg
- Um botão "Calcular"
- Resultados: velocidade de corte, tempo de corte, massa da peça e custo total

**Valores de teste:** `d = 60 mm`, `n = 1000 RPM`, `L = 250 mm`, `f = 0.15 mm/rot`, `ρ = 7850 kg/m³`, `custo_hora = R$ 80,00`, `preco_kg = R$ 12,00`

**Saída esperada:**
```
Velocidade de corte:   188.50 m/min
Tempo de corte:          1.67 min
Massa da peça:           0.554 kg
Custo total:          R$ 8,90
```

**Dica:** use um dicionário para mapear o nome do material à sua densidade:

```python
densidades = {"Aço 1020 (7850)": 7850, "Alumínio 6061 (2700)": 2700, "Latão (8500)": 8500}
rho = densidades[material]
```

## Resumo da aula

- Pensamento computacional: decomposição, padrões, abstração, algoritmos
- Variáveis guardam valores na memória; tipos básicos: `int`, `float`, `str`, `bool`
- Use `int()`, `float()`, `str()`, `round()` para converter entre tipos
- `input()` sempre retorna `str` — converta para número antes de calcular
- f-strings formatam saída: `f"Valor: {variavel:.2f}"`
- Precedência: `()` > `**` > `*` `/` > `+` `-` — use parênteses para evitar ambiguidade
- Streamlit transforma scripts Python em apps web: `st.title()`, `st.write()`, `st.metric()`
- Widgets de entrada: `st.number_input`, `st.slider`, `st.selectbox`, `st.button`

## Referências

- **Python.org — Tutorial oficial (pt-BR)** — https://docs.python.org/pt-br/3/tutorial/
- **Python.org — Tipos embutidos** — https://docs.python.org/pt-br/3/library/stdtypes.html
- **Python.org — Função print() e formatação** — https://docs.python.org/pt-br/3/tutorial/inputoutput.html
- **Streamlit Docs — Input widgets** — https://docs.streamlit.io/develop/api-reference/widgets
- **PEP 8 — Guia de estilo** — https://peps.python.org/pep-0008/
- **Tavares Neto, R. F.; Silva, F. M.** Introdução à programação para engenharia. LTC, 2022.
