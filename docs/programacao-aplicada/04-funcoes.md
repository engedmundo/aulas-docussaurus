# Funções em Python

## Roteiro

1. O que é uma função?
2. Por que usar funções?
3. Anatomia de uma função
4. Parâmetros com valor padrão
5. Múltiplos retornos
6. Funções + Condicionais
7. Escopo de variáveis
8. Funções no contexto Streamlit
9. Exercícios
10. **Mini-projeto:** Calculadora Técnica com Funções

## O que é uma função?

Uma **função** é um bloco de código com nome que realiza uma tarefa específica. Pense numa função como uma **máquina** na linha de produção: você coloca matéria-prima de um lado (entradas/parâmetros), a máquina processa internamente, e o produto pronto sai do outro lado (retorno/resultado).

```
  Entrada ──→  ┌─────────────┐  ──→  Saída
 (parâmetro)   │  Função     │       (return)
               │  processa   │
               └─────────────┘
```

## Por que usar funções?

| Problema sem funções | Solução com funções |
|---|---|
| Mesmo cálculo repetido 5 vezes no script | Escreva uma vez, chame 5 vezes |
| Mudar a fórmula exige editar 5 lugares | Muda em um lugar só |
| Código com 200 linhas sem organização | Blocos nomeados e testáveis |
| Difícil saber o que cada parte faz | O nome da função documenta a intenção |

O princípio por trás disso é o **DRY** (*Don't Repeat Yourself*): não repita código. Se você copiou e colou um bloco de código, provavelmente deveria ter criado uma função.

## Anatomia de uma função

```python
def nome_da_funcao(parametro1, parametro2):
    """Docstring: descreve o que a função faz."""
    # corpo da função — lógica aqui
    resultado = parametro1 + parametro2
    return resultado
```

**Componentes:**
- `def`: palavra-chave que indica a definição de uma função
- **nome**: segue as mesmas regras de variáveis (snake_case, sem espaços)
- **parâmetros**: nomes que recebem os valores de entrada (entre parênteses)
- **docstring**: texto entre `"""` que documenta a função (aparece com `help(nome)`)
- **corpo**: bloco indentado com a lógica
- `return`: valor que a função devolve ao chamador

### Chamando uma função

Os valores que passamos para a função na hora de usar são chamados de **argumentos**:

```python
# Definição (parâmetros são nomes)
def calcular_torcao(forca, braco):
    """Calcula o torque dado força e braço de alavanca."""
    torque = forca * braco
    return torque

# Chamada (argumentos são valores concretos)
resultado = calcular_torcao(500, 0.3)
print(f"Torque: {resultado} Nm")
# Saída: Torque: 150.0 Nm
```

> **Parâmetro** é o nome na definição. **Argumento** é o valor na chamada.

## Parâmetros com valor padrão

Você pode definir valores padrão para parâmetros. Se o argumento não for informado, o padrão é usado:

```python
def tensao_normal(forca, area, fator_carga=1.0):
    """Calcula tensão normal com fator de carga opcional."""
    return (forca * fator_carga) / area

# Com todos os argumentos
print(tensao_normal(5000, 0.002, 1.5))   # 3750000.0

# Sem o fator_carga — usa o padrão 1.0
print(tensao_normal(5000, 0.002))         # 2500000.0
```

> Parâmetros com valor padrão devem vir **depois** dos parâmetros obrigatórios.

## Múltiplos retornos

Python permite retornar mais de um valor usando tuplas:

```python
def propriedades_cilindro(raio, altura):
    """Calcula área lateral, volume e área total de um cilindro."""
    import math
    area_lateral = 2 * math.pi * raio * altura
    volume = math.pi * raio ** 2 * altura
    area_total = 2 * math.pi * raio * (raio + altura)
    return area_lateral, volume, area_total

al, vol, at = propriedades_cilindro(0.05, 0.10)
print(f"Área lateral: {al:.4f} m²")
print(f"Volume: {vol:.6f} m³")
print(f"Área total: {at:.4f} m²")
```

## Funções + Condicionais

Funções são especialmente úteis quando encapsulam lógica de decisão:

```python
def classificar_dureza(dureza_hb):
    """Classifica peça de aço conforme dureza Brinell."""
    if dureza_hb < 200:
        return "Material muito dúctil — Rejeitada"
    elif dureza_hb <= 240:
        return "Dentro das especificações — Aprovada"
    else:
        return "Material muito frágil — Rejeitada"

# Uso no app
resultado = classificar_dureza(225)
print(resultado)  # Dentro das especificações — Aprovada
```

### Fator de segurança como função

O fator de segurança é a razão entre o limite do material e a tensão atuante:

$$FS = \frac{\sigma_{limite}}{\sigma_{atuante}}$$

```python
def fator_seguranca(limite, atuante):
    """Calcula o fator de segurança: limite / atuante."""
    return limite / atuante

fs = fator_seguranca(250, 100)  # limite 250 MPa, atuante 100 MPa
print(f"Fator de segurança: {fs:.2f}")  # 2.50
```

## Escopo de variáveis: locais vs. globais

O **escopo** de uma variável define onde ela pode ser acessada no código.

**Variável local**: criada dentro de uma função, só existe dentro dela:

```python
def calcular_area(raio):
    import math
    area = math.pi * raio ** 2   # 'area' é local
    return area

print(calcular_area(5))   # 78.5398...
print(area)               # NameError: name 'area' is not defined
```

A variável `area` foi criada dentro da função e desapareceu quando a função terminou. O código de fora não consegue acessá-la.

**Variável global**: criada fora de qualquer função, pode ser lida de qualquer lugar:

```python
GRAVIDADE = 9.81   # constante global (convenção: MAIÚSCULAS)

def peso(massa):
    return massa * GRAVIDADE

print(peso(70))    # 686.7
print(GRAVIDADE)   # 9.81 — acessível de fora
```

**Cuidado:** uma variável local com o mesmo nome de uma global **não altera** a global:

```python
x = 100   # global

def teste():
    x = 5   # local — não afeta a global
    print(f"Dentro da função: x = {x}")

teste()          # Dentro da função: x = 5
print(f"Fora: x = {x}")   # Fora: x = 100
```

> **Regra prática:** evite usar variáveis globais para armazenar dados que mudam. Use parâmetros e retornos. Constantes globais (em MAIÚSCULAS) são aceitáveis.

### Funções sem `return`

Se uma função não tem `return`, ela retorna `None` implicitamente:

```python
def saudacao(nome):
    print(f"Olá, {nome}!")

resultado = saudacao("Ana")
print(resultado)   # None — não há return
```

> Toda função em Python retorna `None` se não houver `return`.

## Funções no contexto Streamlit

No Streamlit, funções ajudam a organizar a lógica de cálculo separada da interface:

```python
import streamlit as st

def calcular_tensao(forca, diametro):
    import math
    area = math.pi * (diametro / 1000) ** 2 / 4
    return forca / area

st.title("Calculadora de Tensão")
F = st.number_input("Força (N):", value=5000.0)
d = st.number_input("Diâmetro (mm):", value=50.0)

if st.button("Calcular"):
    sigma = calcular_tensao(F, d)
    st.metric("Tensão normal", f"{sigma / 1e6:.2f} MPa")
```

A função `calcular_tensao` faz apenas o cálculo — a interface fica no corpo principal do script. Isso facilita testar a função separadamente e reutilizá-la em outros apps.

---

## Exercício 4.1 — Conversor de Unidades

**Contexto:** O laboratório de ensaios mecânicos recebe dados de máquinas de teste em unidades imperiais (psi, polegadas, °F) mas os relatórios devem ser em unidades SI (MPa, mm, °C). O técnico quer um app que faça as conversões usando funções bem definidas, para que cada conversão possa ser reutilizada em outros scripts.

**Funções que devem ser criadas:**
- `psi_para_mpa(psi)` — converte psi para MPa (1 psi = 0.00689476 MPa)
- `pol_para_mm(pol)` — converte polegadas para mm (1 pol = 25.4 mm)
- `f_para_c(f)` — converte °F para °C (`C = (F - 32) × 5/9`)

**O que o app deve ter:**
- Três seções, uma para cada conversão
- Cada seção com um campo de entrada e exibição do resultado
- Use as funções criadas para fazer os cálculos

**Valores de teste:**
- `14500 psi` → `100.0 MPa`
- `2.5 pol` → `63.5 mm`
- `212 °F` → `100.0 °C`

## Exercício 4.2 — Classificador de Solda

**Contexto:** Uma empresa de estruturas metálicas precisa classificar a qualidade de soldas de filete com base na perna da solda medida. A especificação exige que a perna da solda esteja dentro de uma faixa tolerada em relação ao valor nominal.

**Funções que devem ser criadas:**
- `calcular_desvio_percentual(medida, nominal)` — retorna a porcentagem de desvio: `(medida - nominal) / nominal × 100`
- `classificar_solda(desvio, tolerancia)` — retorna:
  - `desvio < -tolerancia` → "Solda insuficiente — Reprovada"
  - `-tolerancia <= desvio <= tolerancia` → "Solda dentro da tolerância — Aprovada"
  - `desvio > tolerancia` → "Solda excessiva — Reprovada"

**Entradas do app:**
- Valor nominal da perna da solda (mm)
- Medida real da perna da solda (mm)
- Tolerância percentual (%) — valor padrão 10%

**O que o app deve ter:**
- Campos de entrada para nominal, medida e tolerância
- Botão "Classificar solda"
- Resultados: desvio percentual e classificação

**Valores de teste:**
- `nominal = 6 mm`, `medida = 5.8 mm`, `tolerância = 10%` → desvio = -3.33%, Aprovada
- `nominal = 6 mm`, `medida = 5.0 mm`, `tolerância = 10%` → desvio = -16.67%, Reprovada (insuficiente)
- `nominal = 6 mm`, `medida = 7.5 mm`, `tolerância = 10%` → desvio = +25%, Reprovada (excessiva)

## Mini-Projeto — Calculadora Técnica com Funções

**Contexto:** O setor de engenharia de uma empresa precisa de uma calculadora técnica que reúna várias fórmulas de engenharia em um só lugar. Cada fórmula deve ser implementada como uma função separada, facilitando manutenção e reuso.

**Funções que devem ser implementadas:**

```python
def tensao_normal(forca, area):
    """σ = F / A — retorna tensão em Pa"""

def deformacao_especifica(var_l, l0):
    """ε = ΔL / L₀ — retorna deformação (adimensional)"""

def lei_hooke(mod_elasticidade, deformacao):
    """σ = E · ε — retorna tensão pela Lei de Hooke"""

def potencia_mecanica(torque, rpm):
    """P = T · ω — retorna potência em W (ω em rad/s)"""
```

**O que o app deve ter:**
- Um `st.selectbox` para escolher qual cálculo realizar
- Campos de entrada que mudam conforme a opção selecionada
- Botão "Calcular"
- Resultado exibido com `st.metric` e a unidade correta

**Valores de teste:**
- Tensão normal: `F = 10000 N`, `A = 0.005 m²` → `2.0 MPa`
- Deformação: `ΔL = 2 mm`, `L₀ = 1000 mm` → `0.002`
- Lei de Hooke: `E = 200 GPa`, `ε = 0.002` → `400 MPa`
- Potência: `T = 300 Nm`, `RPM = 1750` → `54.98 kW`

**Dica para conversão de RPM para rad/s:** `ω = (2π · RPM) / 60`

## Resumo da aula

- Funções (`def`) organizam código em blocos nomeados e reutilizáveis
- Parâmetros recebem valores de entrada; `return` devolve o resultado
- Parâmetros com valor padrão tornam a chamada mais flexível
- Múltiplos valores podem ser retornados como tupla
- Variáveis criadas dentro da função são locais — não existem fora
- Constantes globais (MAIÚSCULAS) são aceitáveis; variáveis globais mutáveis devem ser evitadas
- No Streamlit, funções separam a lógica de cálculo da interface

## Referências

- **Python.org — Funções** — https://docs.python.org/pt-br/3/tutorial/controlflow.html#defining-functions
- **PEP 8 — Guia de estilo** — https://peps.python.org/pep-0008/
- **Streamlit Docs — Widgets** — https://docs.streamlit.io/develop/api-reference/widgets
