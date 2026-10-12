# Condicionais

## Roteiro

1. Por que condicionais?
2. Operadores de comparação
3. Estruturas `if` / `elif` / `else`
4. Operadores lógicos
5. Entrada de dados com `input()` e condicionais
6. Exercício 3.6: Classificador de Materiais
7. Exercício 3.7: Análise de Crédito (nível avançado)

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

Na aula 02 você criou uma calculadora de tensão que exibia σ = F/A. Mas e se σ ultrapassar o limite de escoamento do material? Sem condicionais, o programa apenas exibe o número — o engenheiro precisa interpretar. Com condicionais, o próprio programa alerta:

```python
if sigma > limite_escoamento:
    print("Tensão acima do limite! Redimensione a peça.")
else:
    print("Projeto aprovado.")
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

### Exercício 3.1 — Do pseudocódigo ao Python (Aprovado ou Reprovado)

**Contexto:** na aula 01 você escreveu o pseudocódigo da média de um aluno (`SE media >= 7 ENTÃO aprovado SENÃO reprovado`). Agora você tem as ferramentas para executá-lo de verdade. A tradução é direta:

| Pseudocódigo | Python |
|---|---|
| `CALCULE media = ...` | `media = ...` |
| `SE media >= 7 ENTÃO` | `if media >= 7:` |
| `SENÃO` | `else:` |
| `ESCREVA ...` | `print(...)` |

**Tarefa:** escreva o código com os valores **fixos** `nota1 = 8.0`, `nota2 = 7.0` e `nota3 = 6.0`. Calcule a média e exiba `Aprovado` ou `Reprovado` com `if`/`else`.

**Valores de teste:**
- `8.0, 7.0, 6.0` → média `7.0` → "Aprovado"
- Altere `nota3` para `4.0` e execute de novo → "Reprovado"

### Exercício 3.2 — Tipo de triângulo

**Contexto:** em geometria, um triângulo é classificado pelos seus lados:

- **Equilátero** — os três lados iguais (`a == b == c`)
- **Isósceles** — exatamente dois lados iguais
- **Escaleno** — todos os lados diferentes

**Tarefa:** com os valores **fixos** `a = 5`, `b = 5` e `c = 8`, escreva o código usando `if`/`elif`/`else` que exiba o tipo do triângulo.

**Dica:** teste a condição mais específica primeiro (equilátero), depois a intermediária (isósceles), e deixe o `else` para o caso restante (escaleno).

**Valores de teste:**
- `a = 5, b = 5, c = 5` → "Equilátero"
- `a = 5, b = 5, c = 8` → "Isósceles"
- `a = 3, b = 4, c = 5` → "Escaleno"

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

### Exercício 3.3 — Entrada na montanha-russa (duas condições)

**Contexto:** um parque de diversões só permite a entrada na montanha-russa se o visitante tiver **altura mínima de 1,40 m** **e** **idade mínima de 10 anos**.

**Tarefa:** com os valores **fixos** `altura = 1.55` e `idade = 12`, escreva o código que combina as duas condições com `and` e exibe:

- `"Pode entrar. Bom divertimento!"` — se altura **e** idade suficientes
- `"Altura insuficiente para o brinquedo."` — se a altura for menor que 1,40 m
- `"Idade insuficiente para o brinquedo."` — nos demais casos

**Valores de teste:**
- `altura = 1.55`, `idade = 12` → "Pode entrar"
- `altura = 1.30`, `idade = 12` → "Altura insuficiente"
- `altura = 1.55`, `idade = 8` → "Idade insuficiente"

## Entrada de dados com `input()` e condicionais

No Colab, a função `input()` permite que o programa pergunte um valor ao usuário. Combinada com condicionais, permite tomar decisões com base no que foi digitado.

### Seleção única com `input()`

Ideal quando o usuário deve escolher **exatamente uma** opção entre várias:

```python
material = input("Selecione o tipo de material (1-Aço Carbono, 2-Aço Inox, 3-Alumínio, 4-Latão): ")

if material == "1":
    escolhido = "Aço Carbono"
elif material == "2":
    escolhido = "Aço Inox"
elif material == "3":
    escolhido = "Alumínio"
else:
    escolhido = "Latão"

print(f"Material selecionado: {escolhido}")
```

> A função `input()` sempre retorna texto (`str`). Use `int(input(...))` ou `float(input(...))` quando precisar de um número.

### Condições binárias com `input()`

Ideal para sensores, chaves e condições binárias:

```python
porta = input("Sensor de porta fechada (s/n): ").lower()
emergencia = input("Botão de emergência acionado (s/n): ").lower()

sensor_porta = porta == "s"
emergencia_acionado = emergencia == "s"

if sensor_porta and not emergencia_acionado:
    print("Máquina pronta para operar")
else:
    print("Verifique as condições de segurança")
```

> Aqui, `input("...").lower()` converte a resposta para minúsculas, facilitando a comparação.

## Exercício 3.4 — Prensa Hidráulica

**Contexto:** Uma prensa hidráulica industrial de 200 toneladas possui um sistema de segurança que impede a operação se a grade de proteção estiver aberta ou se a pressão do óleo estiver fora da faixa segura. O supervisor de produção quer um programa que verifique essas condições e informe o status da máquina.

**Entradas:**
- Pressão do óleo (bar) — use `input()` com `float()`
- Estado da grade — use `input("Grade fechada? (s/n): ")`

**Lógica:**
1. Grade **aberta** → ERRO e bloqueio: "Grade aberta! Operação bloqueada."
2. Grade **fechada**:
   - `pressao < 50` → "Pressão insuficiente. Aqueça o óleo."
   - `50 <= pressao <= 150` → "Operação autorizada."
   - `pressao > 150` → "Sobrepressão! Acionando válvula de alívio."

**O que o programa deve ter:**
- Descrição do sistema
- Entrada da pressão com `input()` e `float()`
- Entrada do estado da grade com `input("s/n")`
- Mensagem de status exibida com `print()`

**Valores de teste:**
- `pressao = 30`, grade fechada → "Pressão insuficiente"
- `pressao = 120`, grade fechada → "Operação autorizada"
- `pressao = 180`, grade fechada → "Sobrepressão!"
- Qualquer pressão, grade aberta → "Grade aberta!"

## Exercício 3.5 — Dureza do Aço

**Contexto:** O laboratório de ensaios mecânicos de uma metalúrgica realiza testes de dureza Brinell (HB) em peças de aço após tratamento térmico. A especificação técnica exige dureza entre 200 e 240 HB. O técnico precisa registrar o resultado e obter a classificação automaticamente.

**Entrada:**
- Dureza Brinell (HB) — use `input()` com `float()`

**Classificação:**
- `dureza < 200` → "Peça Rejeitada: Material muito dúctil"
- `200 <= dureza <= 240` → "Peça Aprovada: Dentro das especificações"
- `dureza > 240` → "Peça Rejeitada: Material muito frágil"

**O que o programa deve ter:**
- Descrição do ensaio Brinell
- Entrada da dureza com `input()`
- Exibição do valor da dureza com `print(f"...")`
- Mensagem de aprovação/rejeição com `print()`

**Valores de teste:**
- `dureza = 180 HB` → Rejeitada (muito dúctil)
- `dureza = 225 HB` → Aprovada
- `dureza = 260 HB` → Rejeitada (muito frágil)

> **Desafios opcionais:** tente os exercícios a seguir por conta própria:
> - **Sensor de Emergência CNC** — autenticação com `input()` e condições combinadas (`and`)
> - **Seleção de Material por Torque** — `input()` para classificar faixas de torque e aplicar descontos
> - **Homogeneidade de Eixos** — `max()` e `min()` com condicionais para controle de qualidade

## Exercício 3.6 — Classificador de Materiais

**Contexto:** A engenharia de materiais de uma empresa de componentes mecânicos quer uma ferramenta de apoio para selecionar o material mais adequado para um novo componente. O engenheiro informa as condições de operação (tensão, temperatura e ambiente) e o programa sugere o material ideal com base em regras pré-definidas.

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
- Tensão atuante (MPa) — `input()` com `float()`
- Temperatura de operação (°C) — `input()` com `float()`
- Ambiente — `input()` com opções: "Seco", "Úmido", "Corrosivo"

**O que o programa deve ter:**
- Descrição da ferramenta
- Três entradas (tensão, temperatura, ambiente) com `input()`
- Material recomendado exibido com `print()`
- **Desafio extra:** exibir uma segunda opção (material backup) caso o principal não esteja disponível

**Valores de teste:**
- `tensão = 50 MPa`, `temp = 60 °C`, `ambiente = Seco` → Polímero
- `tensão = 250 MPa`, `temp = 150 °C`, `ambiente = Corrosivo` → Alumínio 6061
- `tensão = 450 MPa`, `temp = 250 °C`, `ambiente = Úmido` → Aço Carbono 1020
- `tensão = 450 MPa`, `temp = 350 °C`, `ambiente = Corrosivo` → Aço Inox 304
- `tensão = 800 MPa`, `temp = 400 °C`, `ambiente = Seco` → Liga de Titânio

## Exercício 3.7 — Análise de Crédito

**Contexto:** um analista de crédito de um banco avalia pedidos de empréstimo pessoal. A decisão não depende de um único critério: é preciso verificar o **score** do cliente, o **limite do valor** solicitado e o **comprometimento da renda** — nesta ordem. Antes de programar, decomponha o problema em etapas de decisão (qual verificação vem primeiro? o que acontece se ela falhar?).

**Entradas (todas com `input()`):**
- Renda mensal (R$) — `float`
- Valor solicitado (R$) — `float`
- Número de parcelas — `int`
- Score de crédito (0 a 1000) — `int`

**Regras de decisão (nesta ordem):**
1. `score < 600` → **negado**: "score insuficiente (mínimo 600)"
2. `valor > 12 × renda` → **negado**: "valor acima de 12x a renda mensal"
3. Caso contrário, defina a taxa de juros: `score >= 750` → `1,5%` ao mês; senão → `2,5%` ao mês
4. Calcule com juros simples: `total = valor × (1 + taxa × n)` e `parcela = total / n`
5. `parcela > 30% da renda` → **negado**: "parcela acima de 30% da renda"; senão → **aprovado**

**O que o programa deve ter:**
- Descrição da análise
- As quatro entradas com `input()` e conversão adequada
- Exibição da taxa aplicada, do valor total e da parcela
- A decisão final (aprovado/negado) com o motivo

**Valores de teste:**
- `renda = 5000`, `valor = 20000`, `n = 24`, `score = 780` → aprovado (taxa 1,5%, parcela R$ 1.133,33)
- `renda = 5000`, `valor = 20000`, `n = 24`, `score = 550` → negado (score)
- `renda = 3000`, `valor = 50000`, `n = 12`, `score = 650` → negado (valor acima de 12x a renda)
- `renda = 4000`, `valor = 30000`, `n = 12`, `score = 700` → negado (parcela R$ 3.250,00 > 30% da renda)

## Resumo da aula

- Condicionais (`if`/`elif`/`else`) permitem que o programa tome decisões com base em expressões booleanas
- Operadores de comparação: `>`, `<`, `>=`, `<=`, `==`, `!=`
- Operadores lógicos: `and`, `or`, `not`
- Python permite comparações encadeadas: `50 <= x <= 150`
- Use `elif` para alternativas no mesmo nível; aninhe quando a condição interna depende da externa
- Decisões em etapas (score → limite → parcela) combinam cálculos e condicionais num mesmo algoritmo
- `input()` permite entrar com dados pelo teclado; use `int()`/`float()` para converter para número
- Tradução pseudocódigo → Python: `LEIA` → `input()`, `CALCULE` → `=`, `SE` → `if`, `ESCREVA` → `print()`

## Referências

- **Python.org — Controle de fluxo** — https://docs.python.org/pt-br/3/tutorial/controlflow.html
- **Python.org — Função input()** — https://docs.python.org/pt-br/3/library/functions.html#input
- **PEP 8 — Guia de estilo** — https://peps.python.org/pep-0008/
