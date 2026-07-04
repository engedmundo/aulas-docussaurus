# Condicionais

## Roteiro

1. Por que condicionais?
2. Operadores de comparação e lógicos
3. Estruturas `if` / `elif` / `else`
4. Widgets: `st.radio`, `st.checkbox`
5. Exercícios
6. **Mini-projeto:** Classificador de Materiais

## Por que condicionais?

Nas aulas anteriores, vimos que programar é traduzir problemas em cálculos. Mas um programa precisa também **tomar decisões** — executar blocos diferentes dependendo de uma condição. Sem condicionais, todo programa seria uma sequência linear sem capacidade de reagir a diferentes situações.

```
                    ┌──────────┐
                    │ Condição │
                    └────┬─────┘
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
      ┌──────────────┐     ┌──────────────┐
      │  Bloco True  │     │ Bloco False  │
      └──────┬───────┘     └──────┬───────┘
             │                    │
             └──────────┬─────────┘
                        ▼
                 ┌────────────┐
                 │  Continua  │
                 │  execução  │
                 └────────────┘
```

### Um exemplo do mundo real

Na aula 02 você criou uma calculadora de tensão que exibia σ = F/A. Mas e se σ ultrapassar o limite de escoamento do material? Sem condicionais, o app apenas exibe o número — o engenheiro precisa interpretar. Com condicionais, o próprio app alerta:

```python
if sigma > limite_escoamento:
    st.error("Tensão acima do limite! Redimensione a peça.")
else:
    st.success("Projeto aprovado.")
```

## Operadores de Comparação

Uma expressão booleana é uma comparação que resulta em `True` ou `False`:

```python
temperatura = 150

temperatura > 100      # True  — maior que
temperatura < 100      # False — menor que
temperatura >= 150     # True  — maior ou igual
temperatura <= 150     # True  — menor ou igual
temperatura == 150     # True  — igual (dois sinais de igual!)
temperatura != 100     # True  — diferente
```

> **Atenção:** `==` (comparação) é diferente de `=` (atribuição). Um erro comum é escrever `if x = 5:` — isso gera erro de sintaxe. O correto é `if x == 5:`.

### O truque do Python: comparações encadeadas

Em muitas linguagens, para testar se um valor está dentro de uma faixa, escrevemos:

```python
# Forma comum em outras linguagens
if pressao >= 50 and pressao <= 150:
    print("Faixa segura")
```

Python permite uma sintaxe mais natural:

```python
# Forma Python — mais legível
if 50 <= pressao <= 150:
    print("Faixa segura")
```

As duas formas são equivalentes. Use a que achar mais clara.

## Operadores Lógicos

Quando precisamos combinar múltiplas condições:

| Operador | Significado | Exemplo | Resultado |
|---|---|---|---|
| `and` | E (ambos devem ser verdadeiros) | `True and False` | `False` |
| `or` | OU (basta um ser verdadeiro) | `True or False` | `True` |
| `not` | NÃO (inverte o valor) | `not True` | `False` |

```python
pressao = 120
grade_fechada = True

# Ambas as condições devem ser verdadeiras
if pressao >= 50 and grade_fechada:
    print("Operação autorizada")

# Basta uma ser verdadeira
if pressao > 200 or temperatura > 500:
    print("Alarme! Condição crítica detectada.")

# Inversão
if not grade_fechada:
    print("Grade aberta! Operação bloqueada.")
```

### Tabela-verdade rápida

```
A       B       A and B   A or B    not A
True    True    True      True      False
True    False   False     True      False
False   True    False     True      True
False   False   False     False     True
```

## Sintaxe `if` / `elif` / `else`

```python
if condicao:
    comando1
    comando2
elif outra_condicao:
    comando3
else:
    comando4
```

**Regras:**
- A condição deve ser uma expressão **booleana** (`True` / `False`)
- O bloco indentado é o que será executado quando a condição for verdadeira
- Pode ter zero ou vários `elif`, e zero ou um `else`
- O `else` é o "caso padrão" — executa se nenhuma condição anterior for verdadeira

### Condicionais aninhadas vs. `elif`

Às vezes é tentador colocar um `if` dentro de outro `if`. Isso funciona, mas pode tornar o código difícil de ler:

```python
# Aninhado — funciona, mas é verboso
if grade_fechada:
    if pressao < 50:
        print("Pressão insuficiente")
    elif pressao <= 150:
        print("Operação autorizada")
    else:
        print("Sobrepressão!")
else:
    print("Grade aberta! Operação bloqueada.")
```

A versão com `elif` é mais clara quando as condições são alternativas no mesmo nível:

```python
# Com elif — mais legível
if not grade_fechada:
    print("Grade aberta! Operação bloqueada.")
elif pressao < 50:
    print("Pressão insuficiente")
elif pressao <= 150:
    print("Operação autorizada")
else:
    print("Sobrepressão!")
```

> **Regra prática:** use `elif` quando as condições são mutuamente exclusivas. Use aninhamento quando a condição interna só faz sentido se a externa for verdadeira.

## Streamlit — Widgets de Decisão

Na aula 02 você aprendeu `st.number_input`, `st.slider`, `st.selectbox` e `st.button`. Agora vamos adicionar dois widgets que são ideais para apps com tomada de decisão.

### `st.radio` — seleção única

Ideal quando o usuário deve escolher **exatamente uma** opção entre várias:

```python
import streamlit as st

material = st.radio(
    "Selecione o tipo de material:",
    ["Aço Carbono", "Aço Inox", "Alumínio", "Latão"]
)

st.write(f"Material selecionado: {material}")
```

Diferença entre `st.radio` e `st.selectbox`:
- **`st.radio`**: todas as opções visíveis de uma vez — melhor para poucas opções (até ~5)
- **`st.selectbox`**: menu suspenso — melhor para muitas opções

### `st.checkbox` — ligado/desligado

Ideal para sensores, chaves e condições binárias:

```python
sensor_porta = st.checkbox("Sensor de porta fechada")
emergencia = st.checkbox("Botão de emergência acionado")

if sensor_porta and not emergencia:
    st.success("Máquina pronta para operar")
else:
    st.error("Verifique as condições de segurança")
```

> `st.checkbox` retorna `True` quando marcado e `False` quando desmarcado.

---

## Exercício 3.1 — Prensa Hidráulica

**Contexto:** Uma prensa hidráulica industrial de 200 toneladas possui um sistema de segurança que impede a operação se a grade de proteção estiver aberta ou se a pressão do óleo estiver fora da faixa segura. O supervisor de produção quer um app que monitore essas condições em tempo real e informe o status da máquina.

**Entradas:**
- Pressão do óleo (bar) — use `st.number_input`
- Estado da grade — use `st.checkbox` ("Grade fechada")

**Lógica:**
1. Grade **desmarcada (aberta)** → ERRO e bloqueio: "Grade aberta! Operação bloqueada."
2. Grade **marcada (fechada)**:
   - `pressao < 50` → "Pressão insuficiente. Aqueça o óleo."
   - `50 <= pressao <= 150` → "Operação autorizada."
   - `pressao > 150` → "Sobrepressão! Acionando válvula de alívio."

**O que o app deve ter:**
- Título e descrição do sistema
- Campo de entrada para pressão
- Checkbox para estado da grade
- Botão "Verificar condições"
- Mensagem de status com `st.success`, `st.warning` ou `st.error`

**Valores de teste:**
- `pressao = 30`, grade fechada → "Pressão insuficiente"
- `pressao = 120`, grade fechada → "Operação autorizada"
- `pressao = 180`, grade fechada → "Sobrepressão!"
- Qualquer pressão, grade aberta → "Grade aberta!"

## Exercício 3.2 — Dureza do Aço

**Contexto:** O laboratório de ensaios mecânicos de uma metalúrgica realiza testes de dureza Brinell (HB) em peças de aço após tratamento térmico. A especificação técnica exige dureza entre 200 e 240 HB. O técnico precisa registrar o resultado e obter a classificação automaticamente.

**Entrada:**
- Dureza Brinell (HB) — use `st.number_input`

**Classificação:**
- `dureza < 200` → "Peça Rejeitada: Material muito dúctil"
- `200 <= dureza <= 240` → "Peça Aprovada: Dentro das especificações"
- `dureza > 240` → "Peça Rejeitada: Material muito frágil"

**O que o app deve ter:**
- Título com referência ao ensaio Brinell
- Campo de entrada para a dureza
- Botão "Classificar"
- Exibição do valor da dureza com `st.metric`
- Mensagem de aprovação/rejeição com `st.success` ou `st.error`

**Valores de teste:**
- `dureza = 180 HB` → Rejeitada (muito dúctil)
- `dureza = 225 HB` → Aprovada
- `dureza = 260 HB` → Rejeitada (muito frágil)

> **Desafios opcionais:** tente os exercícios a seguir por conta própria:
> - **Sensor de Emergência CNC** — autenticação com `st.text_input`, `st.checkbox` e condições combinadas (`and`)
> - **Seleção de Material por Torque** — `st.slider` + `st.radio` para classificar faixas de torque e aplicar descontos
> - **Homogeneidade de Eixos** — `max()` e `min()` com condicionais para controle de qualidade

## Mini-Projeto — Classificador de Materiais

**Contexto:** A engenharia de materiais de uma empresa de componentes mecânicos quer uma ferramenta de apoio para selecionar o material mais adequado para um novo componente. O engenheiro informa as condições de operação (tensão, temperatura e ambiente) e o app sugere o material ideal com base em regras pré-definidas.

**Regras de classificação:**

| Material | Tensão (MPa) | Temp. (°C) | Ambiente |
|---|---|---|---|
| Polímero (POM) | < 100 | < 80 | Seco |
| Alumínio 6061 | 100–300 | < 200 | Qualquer |
| Aço Carbono 1020 | 300–600 | < 300 | Seco ou Úmido |
| Aço Inox 304 | 300–600 | < 400 | Corrosivo |
| Liga de Titânio Ti-6Al-4V | > 600 | < 500 | Qualquer |

> Note que as faixas de tensão do Aço Carbono e Aço Inox são as mesmas — a diferença está no **ambiente**. Se o ambiente for corrosivo, o Inox é preferido.

**Entradas:**
- Tensão atuante (MPa) — `st.number_input`
- Temperatura de operação (°C) — `st.number_input`
- Ambiente — `st.selectbox` com opções: "Seco", "Úmido", "Corrosivo"

**O que o app deve ter:**
- Título e descrição da ferramenta
- Três campos de entrada (tensão, temperatura, ambiente)
- Botão "Selecionar material"
- Material recomendado exibido com destaque
- **Desafio extra:** exibir uma segunda opção (material backup) caso o principal não esteja disponível

**Valores de teste:**
- `tensão = 50 MPa`, `temp = 60 °C`, `ambiente = Seco` → Polímero
- `tensão = 250 MPa`, `temp = 150 °C`, `ambiente = Corrosivo` → Alumínio 6061
- `tensão = 450 MPa`, `temp = 250 °C`, `ambiente = Úmido` → Aço Carbono 1020
- `tensão = 450 MPa`, `temp = 350 °C`, `ambiente = Corrosivo` → Aço Inox 304
- `tensão = 800 MPa`, `temp = 400 °C`, `ambiente = Seco` → Liga de Titânio

## Resumo da aula

- Condicionais (`if`/`elif`/`else`) permitem que o programa tome decisões com base em expressões booleanas
- Operadores de comparação: `>`, `<`, `>=`, `<=`, `==`, `!=`
- Operadores lógicos: `and`, `or`, `not`
- Python permite comparações encadeadas: `50 <= x <= 150`
- Use `elif` para alternativas no mesmo nível; aninhe quando a condição interna depende da externa
- Widgets de decisão: `st.radio` (poucas opções visíveis) e `st.checkbox` (liga/desliga)

## Referências

- **Python.org — Controle de fluxo** — https://docs.python.org/pt-br/3/tutorial/controlflow.html
- **Streamlit Docs — Widgets** — https://docs.streamlit.io/develop/api-reference/widgets
- **PEP 8 — Guia de estilo** — https://peps.python.org/pep-0008/
