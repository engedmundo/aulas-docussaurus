# Conceitos Básicos + Apps Interativos

## Roteiro

1. Pensamento computacional
2. Variáveis e tipos de dados
3. Conversão de tipos
4. Entrada e saída (`print` / `input`)
5. Operadores matemáticos
6. Widgets Streamlit: `st.number_input`, `st.slider`, `st.selectbox`, `st.button`
7. Exercícios em Streamlit
8. **Mini-projeto:** Calculadora de Usinagem

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

Na aula 01 você viu esse algoritmo para calcular tensão:

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
# Cálculo da área de um círculo: A = π * r²
r = 0.025  # raio em metros

# ERRADO — multiplica π por r, depois eleva ao quadrado
A_errado = math.pi * r ** 2   # isto está CORRETO de boa — ** tem prioridade sobre *
                               # mas veja o próximo exemplo:

# Erro clássico com parênteses — tensão em viga composta
F = 1000
b = 0.05
h = 0.10

# Intenção: σ = F / (b * h)
sigma_errado = F / b * h       # executa F/b primeiro, depois × h → ERRADO
sigma_certo  = F / (b * h)    # usa parênteses para forçar a ordem → CERTO

print(f"Errado: {sigma_errado:.2f} Pa")   # 200000.00 Pa
print(f"Certo:  {sigma_certo:.2f} Pa")    # 200000.00 Pa... espera, vamos checar

# Valores reais:
# sigma_errado = 1000 / 0.05 * 0.10 = 20000 * 0.10 = 2000 Pa
# sigma_certo  = 1000 / (0.05 * 0.10) = 1000 / 0.005 = 200000 Pa
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

## Streamlit — Widgets de Entrada

Na aula 01 você viu o Streamlit em ação. Agora vamos aprofundar os widgets de entrada que substituem o `input()` nos apps.

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

Distribui widgets e resultados em colunas, como foi visto na calculadora de tensão da aula 01:

```python
col1, col2 = st.columns(2)

with col1:
    forca = st.number_input("Força (N):", value=5000.0)

with col2:
    area = st.number_input("Área (m²):", value=0.002, format="%.4f")
```

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

## Exercício 2.2 — IMC do Operador

**Contexto:** A NR-17 (Norma Regulamentadora de Ergonomia) recomenda que empresas monitorem as condições físicas dos operadores de máquinas industriais. O setor de segurança do trabalho da empresa quer uma ferramenta simples para calcular o IMC dos operadores durante os exames admissionais e periódicos.

**Fórmula:**

$$IMC = \frac{peso}{altura^2}$$

**O que o app deve ter:**
- Título com referência à NR-17
- Dois campos de entrada lado a lado: peso (kg) e altura (m)
- Um botão "Calcular IMC"
- Exibição do resultado com `st.metric`

**Valores de teste:** `peso = 82.0 kg`, `altura = 1.75 m` → `IMC = 26.78`

> **Próxima aula:** em `03 — Condicionais` você adicionará a classificação (Abaixo do peso / Normal / Sobrepeso / Obesidade) usando `if/elif/else`.

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

## Exercício 2.4 — Cilindro com Desperdício de Material

**Contexto:** Uma oficina de usinagem fabrica cilindros maciços de aço a partir de blocos prismáticos (tarugos quadrados). O material excedente é removido como cavaco durante o torneamento. O gerente de produção quer saber quanto material é desperdiçado e qual o custo real de cada lote, incluindo o valor do material que vira cavaco — informação essencial para precificação correta dos produtos.

**Fórmulas:**

$$V_{cil} = \pi \cdot r^2 \cdot h \qquad V_{bloco} = (2r)^2 \cdot h$$

$$m_{final} = V_{cil} \cdot \rho \qquad m_{cavaco} = (V_{bloco} - V_{cil}) \cdot \rho$$

$$aproveitamento = \frac{m_{final}}{m_{final} + m_{cavaco}} \times 100$$

**O que o app deve ter:**
- Campos de entrada para: raio (m), altura (m), densidade (kg/m³), preço (R$/kg) e quantidade de peças
- Um botão "Calcular"
- Resultados: volume do cilindro, volume do bloco, massa final, massa de cavaco, custo total, valor perdido e aproveitamento

**Valores de teste:** `r = 0.05 m`, `h = 0.10 m`, `ρ = 7850 kg/m³`, `preço = 15 R$/kg`, `qtd = 10`

**Saída esperada:**
```
Volume do cilindro:     0.000785 m³
Volume do bloco:        0.001000 m³
Massa final:            6.16 kg
Massa de cavaco:        1.69 kg
Custo total:         R$ 924,00
Valor perdido:       R$ 253,50
Aproveitamento:        78.5%
```

## Exercício 2.5 — Dilatação Térmica

**Contexto:** Uma viga de aço sustenta a estrutura de um forno industrial que opera em ciclos: durante o dia atinge 100 °C, e à noite esfria até 25 °C. O engenheiro de estruturas precisa prever a dilatação linear da viga para dimensionar corretamente as juntas de expansão — se as juntas forem menores que a dilatação, a viga pode empenar ou causar trincas na estrutura.

**Fórmulas:**

$$\Delta T = T_f - T_0 \qquad \Delta L = L_0 \cdot \alpha \cdot \Delta T \qquad L_f = L_0 + \Delta L$$

**O que o app deve ter:**
- Uma nota informativa sobre o coeficiente de dilatação do aço
- Três campos de entrada lado a lado: comprimento inicial (m), temperatura inicial (°C) e temperatura final (°C)
- Um botão "Calcular dilatação"
- Resultados: variação de temperatura, dilatação total (mm), comprimento final (m) e variação percentual

**Valores de teste:** `L₀ = 1.00 m`, `T₀ = 25 °C`, `Tf = 100 °C`, `α = 11.7×10⁻⁶ m/(m·°C)`

**Saída esperada:**
```
ΔT = 75.0 °C
ΔL = 0.878 mm
Lf = 1.000878 m
Variação: 0.088%
```

**Desafio:** adicione um `st.selectbox` para escolher o material e ajuste o `alpha` automaticamente:

| Material | α (×10⁻⁶ m/(m·°C)) |
|---|---|
| Aço carbono | 11.7 |
| Alumínio | 23.1 |
| Cobre | 17.0 |
| Latão | 19.0 |

## Exercício 2.6 — Custo Operacional de Fresadora

**Contexto:** O departamento de custos de uma indústria metalúrgica precisa calcular o custo mensal de energia elétrica de uma fresadora CNC para incluir no rateio de custos de produção. A máquina opera em turnos e o custo da energia varia conforme a tarifa da concessionária local. O resultado será usado para definir o preço-hora da máquina.

**Fórmulas:**

$$E = P \cdot h_{dia} \cdot d_{mes} \qquad custo_{bruto} = E \cdot tarifa \qquad custo_{total} = custo_{bruto} \times 1{,}27$$

**O que o app deve ter:**
- Campos de entrada para: potência (kW), horas/dia, dias/mês e tarifa (R$/kWh)
- Use `st.slider` para as horas de operação por dia (1 a 24)
- Um botão "Calcular custo mensal"
- Resultados: consumo mensal (kWh), custo bruto, impostos (27%), custo total e custo por hora

**Valores de teste:** `P = 15 kW`, `h/dia = 8 h`, `dias = 30`, `tarifa = 0.70 R$/kWh`

**Saída esperada:**
```
Consumo mensal:     3.600 kWh
Custo bruto:     R$ 2.520,00
Impostos (27%):  R$   680,40
Custo total:     R$ 3.200,40
Custo por hora:  R$    16,00/h
```

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

## Referências

- **Python.org — Tutorial oficial (pt-BR)** — https://docs.python.org/pt-br/3/tutorial/
- **Python.org — Tipos embutidos** — https://docs.python.org/pt-br/3/library/stdtypes.html
- **Python.org — Função print() e formatação** — https://docs.python.org/pt-br/3/tutorial/inputoutput.html
- **Streamlit Docs — Input widgets** — https://docs.streamlit.io/develop/api-reference/widgets
- **PEP 8 — Guia de estilo** — https://peps.python.org/pep-0008/
- **Tavares Neto, R. F.; Silva, F. M.** Introdução à programação para engenharia. LTC, 2022.
