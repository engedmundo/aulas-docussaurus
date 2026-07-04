# NumPy Essencial

## Roteiro

1. NumPy: o que é? arrays vs listas, performance
2. Criando arrays
3. Indexação e slicing multidimensional
4. Operações vetorizadas (+, -, *, /, **) — sem loops!
5. Funções estatísticas
6. Números aleatórios
7. Persistência com `st.session_state`
8. Streamlit + NumPy
9. Exercícios
10. **Mini-projeto:** Analisador de Ensaios Mecânicos

## NumPy — O que é?

**NumPy** (Numerical Python) é a biblioteca fundamental para computação científica em Python.

```python
import numpy as np
```

| Característica | Lista Python | Array NumPy |
|---|---|---|
| Tipo único | `int`, `float`, `str` misturados | **Um único tipo** |
| Operações | Precisa de loop `for` | **Vetorizadas** (sem loop) |
| Performance | Lenta para milhares de dados | **Rápida** (C internamente) |
| Memória | Objetos individuais | **Bloco contíguo** |

> **Regra:** se você tem muitos números e precisa fazer contas, use NumPy.

## Array vs Lista — Performance

```python
import numpy as np
import time

lista = list(range(1_000_000))
arr = np.arange(1_000_000)

# Lista: for loop
t0 = time.time()
resultado = [x * 2 for x in lista]
print(f"Lista: {time.time() - t0:.3f}s")

# NumPy: vetorizado
t0 = time.time()
resultado = arr * 2
print(f"NumPy: {time.time() - t0:.3f}s")
```

**NumPy é tipicamente 10–50× mais rápido** que listas para operações numéricas.

## Criando Arrays — np.array()

A partir de uma lista Python:

```python
import numpy as np

# 1D — vetor
arr1d = np.array([1, 2, 3, 4, 5])

# 2D — matriz
arr2d = np.array([[1, 2, 3],
                  [4, 5, 6]])

print(arr1d)       # [1 2 3 4 5]
print(arr2d)
# [[1 2 3]
#  [4 5 6]]
print(arr1d.shape) # (5,)
print(arr2d.shape) # (2, 3)
print(arr1d.dtype) # int64
```

## np.zeros(), np.ones(), np.full()

```python
# Array 1D de zeros
z = np.zeros(5)         # [0. 0. 0. 0. 0.]

# Matriz 3×4 de zeros
z2d = np.zeros((3, 4))

# Array de 1's
o = np.ones(5)          # [1. 1. 1. 1. 1.]

# Array com valor personalizado
f = np.full(5, 3.14)    # [3.14 3.14 3.14 3.14 3.14]

# Matriz identidade
I = np.eye(3)
# [[1. 0. 0.]
#  [0. 1. 0.]
#  [0. 0. 1.]]
```

## np.arange() e np.linspace()

Gerar sequências:

```python
# arange(start, stop, step) — intervalos regulares
np.arange(0, 10, 2)      # [0 2 4 6 8]
np.arange(5)             # [0 1 2 3 4]

# linspace(start, stop, num) — N pontos igualmente espaçados
np.linspace(0, 100, 5)   # [  0.  25.  50.  75. 100.]
np.linspace(0, 10, 11)   # [ 0.  1.  2.  3.  4. ... 10.]
```

| Função | Uso típico |
|---|---|
| `arange(0, 300, 30)` | Posições de 10 sensores a cada 30m |
| `linspace(0, 100, 21)` | 21 pontos de 0 a 100 (passo 5) |

## Indexação e Slicing

Similar a listas, mas multidimensional:

```python
arr = np.array([[10, 20, 30],
                [40, 50, 60],
                [70, 80, 90]])

# Indexação
print(arr[0, 1])     # 20   (linha 0, coluna 1)
print(arr[2, 2])     # 90

# Slicing
print(arr[:, 0])     # [10 40 70]    — coluna 0 inteira
print(arr[0, :])     # [10 20 30]    — linha 0 inteira
print(arr[0:2, 1:3]) # [[20 30]
                     #  [50 60]]    — submatriz

# Slicing em 1D
v = np.array([0, 10, 20, 30, 40])
print(v[1:4])        # [10 20 30]
print(v[:3])         # [0 10 20]
```

## Operações Vetorizadas

Sem loops `for` — opera em todos os elementos de uma vez:

```python
arr = np.array([1, 2, 3, 4, 5])

# Soma escalar
print(arr + 10)        # [11 12 13 14 15]

# Multiplicação escalar
print(arr * 2)         # [ 2  4  6  8 10]

# Potência
print(arr ** 2)        # [ 1  4  9 16 25]

# Operações entre arrays
a = np.array([10, 20, 30])
b = np.array([1,   2,  3])
print(a + b)           # [11 22 33]
print(a / b)           # [10. 10. 10.]
```

> **Comparação:** para lista Python, você precisaria de `[x*2 for x in lista]`.

### Exemplo Engenharia — Conversão de Unidades

```python
# Temperaturas em °C
temp_C = np.array([25, 100, 200, 350, 500])

# Converter para Kelvin (vetorizado)
temp_K = temp_C + 273

# Converter para Fahrenheit (vetorizado)
temp_F = temp_C * 9/5 + 32

# Tensão = Força / Área (vetorizado)
forca = np.array([5000, 8000, 12000])
area  = np.array([50, 50, 100])
tensao = forca / area    # [100. 160. 120.] MPa
```

## Funções Estatísticas do NumPy

```python
dados = np.array([410, 425, 395, 430, 415, 420, 405, 435, 400, 418])

print(np.mean(dados))    # 415.3
print(np.std(dados))     # 12.82
print(np.max(dados))     # 435
print(np.min(dados))     # 395
print(np.sum(dados))     # 4153
print(np.median(dados))  # 416.5
```

| Função | O que calcula |
|---|---|
| `np.mean(arr)` | Média aritmética |
| `np.std(arr)` | Desvio padrão |
| `np.max(arr)` / `np.min(arr)` | Máximo / mínimo |
| `np.sum(arr)` | Soma total |
| `np.median(arr)` | Mediana (valor central) |

## Números Aleatórios — np.random

Simular leituras de sensores:

```python
# Temperatura: distribuição normal (média 100°C, desvio 5)
temp = np.random.normal(loc=100, scale=5, size=50)

# Pressão: uniforme entre 10 e 20 MPa
pressao = np.random.uniform(10, 20, size=50)

# ID de sensores: inteiros aleatórios entre 1 e 5
ids = np.random.randint(1, 6, size=50)
```

| Função | Distribuição | Uso típico |
|---|---|---|
| `normal(loc, scale, size)` | Gaussiana | Temperatura, deformação |
| `uniform(low, high, size)` | Uniforme | Pressão, ruído |
| `randint(low, high, size)` | Inteiros discretos | IDs, classificações |

## Persistência com `st.session_state`

Streamlit reexecuta o script inteiro a cada interação (botão, slider, etc.). Isso significa que **variáveis locais são perdidas** a cada rerun. Para manter dados entre interações, usamos `st.session_state`.

### O problema

```python
import streamlit as st
import numpy as np

# Sem session_state — dados mudam a cada interação!
dados = np.random.normal(100, 5, 50)
st.line_chart(dados)

if st.button("Calcular média"):
    st.write(f"Média: {np.mean(dados):.2f}")
```

Cada vez que o usuário clica no botão, o script roda de novo e `dados` recebe novos valores aleatórios. O gráfico e a média **não correspondem**.

### A solução: `st.session_state`

```python
import streamlit as st
import numpy as np

# Inicializa apenas na primeira execução
if "leituras" not in st.session_state:
    st.session_state.leituras = np.random.normal(100, 5, 50)

# Usa os dados persistidos
dados = st.session_state.leituras
st.line_chart(dados)

if st.button("Calcular média"):
    st.write(f"Média: {np.mean(dados):.2f}")
```

Agora os dados são gerados **uma vez** e mantidos entre interações.

### Regenerar dados com `st.rerun()`

Para forçar novos dados, sobrescrevemos o `session_state` e chamamos `st.rerun()`:

```python
if st.button("Gerar novas leituras"):
    st.session_state.leituras = np.random.normal(100, 5, 50)
    st.rerun()  # Recarrega o app com os novos dados
```

### Padrão completo

```python
import streamlit as st
import numpy as np

st.title("Gerador de Leituras")

if "leituras" not in st.session_state:
    st.session_state.leituras = np.random.normal(100, 5, 50)

if st.button("Gerar novas leituras"):
    st.session_state.leituras = np.random.normal(100, 5, 50)
    st.rerun()

dados = st.session_state.leituras
st.line_chart(dados)

col1, col2, col3 = st.columns(3)
col1.metric("Média", f"{np.mean(dados):.2f}")
col2.metric("Desvio", f"{np.std(dados):.2f}")
col3.metric("Máximo", f"{np.max(dados):.2f}")
```

> **Resumo:** `st.session_state` persiste dados entre reruns. `st.rerun()` recarrega o app. Use sempre que precisar manter estado (leituras, seleções, resultados).

## Streamlit + NumPy

Exemplo completo combinando tudo:

```python
import streamlit as st
import numpy as np

st.title("Dashboard de Sensores")

if "dados" not in st.session_state:
    st.session_state.dados = np.random.normal(100, 5, size=50)

if st.button("Gerar novos dados"):
    st.session_state.dados = np.random.normal(100, 5, size=50)
    st.rerun()

dados = st.session_state.dados
st.line_chart(dados)

col1, col2, col3 = st.columns(3)
col1.metric("Média", f"{np.mean(dados):.1f}")
col2.metric("Desvio", f"{np.std(dados):.1f}")
col3.metric("Máximo", f"{np.max(dados):.1f}")
```

> `st.line_chart()` aceita arrays 1D do numpy diretamente.

---

## Exercício 8.1 — Arrays de Posições de Sensores

**Contexto:** Um laboratório precisa posicionar sensores ao longo de uma viga de 300 m.

**O que o app deve ter:**
- `np.arange()` para gerar 11 sensores (0 a 300 m, passo 30)
- `np.linspace()` para gerar 5 pontos igualmente espaçados na mesma viga
- Exibir valores, `shape`, `size` e `dtype` de cada array
- Usar `st.metric` ou `st.write` para mostrar os resultados

**Valores de teste:**
- `arange(0, 301, 30)` → `[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300]`
- `linspace(0, 300, 5)` → `[0, 75, 150, 225, 300]`

## Exercício 8.2 — Leitura de Sensores com `np.random`

**Contexto:** Simular 100 leituras de temperatura de um termopar em um forno industrial.

**O que o app deve ter:**
- Gerar leituras: `np.random.normal(loc=100, scale=5, size=100)`
- Calcular com NumPy: média, desvio padrão, máximo, mínimo
- Exibir gráfico com `st.line_chart`
- Botão "Gerar novas leituras" que usa `st.session_state` + `st.rerun()`
- Métricas em `st.columns`

## Exercício 8.3 — Operações Vetorizadas (Conversão de Unidades)

**Contexto:** Converter temperaturas de um forno industrial sem usar loops.

**Dados iniciais:**
```python
temp_C = np.array([25, 100, 200, 350, 500])
```

**O que o app deve ter:**
- Converter para Kelvin: `K = C + 273`
- Converter para Fahrenheit: `F = C * 9/5 + 32`
- **Sem loops** — operações vetorizadas!
- Exibir tabela comparativa com `st.dataframe` ou `st.table`

## Exercício 8.4 — Estatísticas de Tração com NumPy

**Contexto:** Ensaio de tração em 10 corpos de prova de aço.

**Dados:**
```python
tensao_max = [410, 425, 395, 430, 415, 420, 405, 435, 400, 418]
alongamento = [18, 20, 16, 22, 19, 21, 17, 23, 15, 20]
```

**O que o app deve ter:**
- Calcular e exibir: média, desvio padrão, máximo, mínimo, mediana de `tensao_max`
- Calcular e exibir os mesmos indicadores para `alongamento`
- Usar `st.metric` em colunas para os resultados
- Interpretar: o material atende especificação de 400 ± 20 MPa?

## Exercício 8.5 — Simulação de Monte Carlo (Tensão × Carga)

**Contexto:** Dimensionar um componente estrutural para limite de escoamento de 300 MPa.

| Parâmetro | Distribuição | Unidade |
|---|---|---|
| Carga aplicada | Normal(μ=50, σ=5) | kN |
| Área da seção | Normal(μ=200, σ=10) | mm² |
| Limite de escoamento | 300 (fixo) | MPa |

**O que o app deve ter:**
- Simular 1000 cenários com `np.random.normal`
- Calcular tensão atuante com operações vetorizadas: σ = (F × 1000) / A
- Exibir histograma das tensões (use `st.bar_chart` ou converta para DataFrame)
- Calcular e exibir P(σ > 300) — fração de cenários que falham
- Métricas: média da tensão, desvio padrão, probabilidade de falha

## Exercício 8.6 — Dashboard de Sensores com NumPy + Streamlit

**O que o app deve ter:**

| Widget | Função |
|---|---|
| `st.selectbox` | Tipo de sensor: temperatura / pressão / vibração |
| `st.slider` | Quantidade de pontos (10 a 500) |
| `st.button` | "Gerar leituras" |

- Cada tipo de sensor com distribuição adequada (normal para temperatura, uniforme para pressão, etc.)
- Exibir gráfico, métricas e dataframe
- Usar `st.session_state` para persistir as leituras entre interações

## Mini-Projeto — Analisador de Ensaios Mecânicos

**Contexto:** Gerar dados sintéticos de ensaios de tração para 4 materiais e construir um dashboard analítico usando NumPy + Streamlit.

| Material | Tensão μ/σ (MPa) | Módulo E μ/σ (GPa) | Densidade (kg/m³) |
|---|---|---|---|
| Aço | 420 / 25 | 210 / 10 | 7850 |
| Alumínio | 280 / 20 | 70 / 8 | 2700 |
| Latão | 350 / 30 | 100 / 12 | 8500 |
| Titânio | 520 / 35 | 115 / 10 | 4430 |

**Funcionalidades obrigatórias:**
- Gerar 20 amostras por material com `np.random.normal`
- Tabela interativa com `st.dataframe`
- Estatísticas por material (média e desvio da tensão para cada material)
- Gráfico de barras com `st.bar_chart`
- Botão "Regenerar dados" com `st.session_state` + `st.rerun()`

## Resumo da aula

- NumPy: arrays homogêneos com operações vetorizadas — muito mais rápidos que listas
- Criação: `np.array()`, `np.arange()`, `np.linspace()`, `np.random.rand()`
- Indexação booleana: `arr[arr > 50]` — filtra sem loop
- `st.session_state` persiste dados entre reruns do app
- `st.rerun()` recarrega o app com novos dados

## Referências

- **NumPy Documentation** — https://numpy.org/doc/stable/
- **Streamlit Data Display** — https://docs.streamlit.io/develop/api-reference/data
- **Streamlit Charts** — https://docs.streamlit.io/develop/api-reference/charts
