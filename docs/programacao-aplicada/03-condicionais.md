# Condicionais + Funções

## Roteiro

1. Por que condicionais?
2. Operadores de comparação e lógicos
3. Estruturas `if` / `elif` / `else`
4. Funções (`def`): o que são, por que usar, escopo
5. Exercícios: prensa hidráulica, dureza do aço
6. Widgets: `st.radio`, `st.checkbox`
7. Exercícios em Streamlit: sensor CNC, torque, eixos
8. Exercícios com funções
9. **Mini-projeto:** Classificador de Materiais

## Por que condicionais?

Nas aulas 01 e 02, fizemos duas promessas:

- **Aula 01:** na calculadora de tensão, dissemos que *"na aula 03 você aprenderá `if/elif/else` e poderá adicionar a verificação do fator de segurança"*.
- **Aula 02:** nos exercícios de dureza e IMC, dissemos que *"na aula 03 você adicionará a classificação com `if/elif/else`"*.

Agora vamos cumprir essas promessas. Condicionais permitem que o programa tome **decisões** — execute blocos diferentes de código dependendo de uma condição. Sem elas, todo programa seria uma sequência linear de cálculos sem capacidade de reagir a diferentes situações.

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

Na aula 01 você calculou a tensão normal σ = F/A. Mas e se σ ultrapassar o limite de escoamento do material? Sem condicionais, o app apenas exibe o número — o engenheiro precisa interpretar. Com condicionais, o próprio app alerta:

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

## Funções em Python — `def`

### O que é uma função?

Uma **função** é um bloco de código com nome que realiza uma tarefa específica. Pense numa função como uma **máquina** na linha de produção: você coloca matéria-prima de um lado (entradas/parâmetros), a máquina processa internamente, e o produto pronto sai do outro lado (retorno/resultado).

```
  Entrada ──→  ┌─────────────┐  ──→  Saída
 (parâmetro)   │  Função     │       (return)
               │  processa   │
               └─────────────┘
```

### Por que usar funções?

| Problema sem funções | Solução com funções |
|---|---|
| Mesmo cálculo repetido 5 vezes no script | Escreva uma vez, chame 5 vezes |
| Mudar a fórmula exige editar 5 lugares | Muda em um lugar só |
| Código com 200 linhas sem organização | Blocos nomeados e testáveis |
| Difícil saber o que cada parte faz | O nome da função documenta a intenção |

O princípio por trás disso é o **DRY** (*Don't Repeat Yourself*): não repita código. Se você copiou e colou um bloco de código, provavelmente deveria ter criado uma função.

### Anatomia de uma função

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

### Parâmetros com valor padrão

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

### Múltiplos retornos

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

### Funções + Condicionais

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

### Escopo de variáveis: locais vs. globais

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

### Funções no contexto Streamlit

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

## Exercício 3.3 — Sensor de Emergência CNC

**Contexto:** Uma fresadora CNC de 5 eixos exige autenticação do operador e verificação do botão de emergência antes de permitir o início do programa. O sistema deve validar as credenciais e o estado de segurança antes de liberar a operação.

**Entradas:**
- Login — use `st.text_input`
- Senha — use `st.text_input` com `type="password"`
- Botão de emergência — use `st.checkbox` ("Emergência acionada")

**Lógica:**
```
SE login == "admin" E senha == "123456" E emergencia == False
→ "Sistema Iniciado. Fresadora pronta para operação."
SENÃO → "ACESSO NEGADO: Verifique credenciais e sensor de emergência."
```

**O que o app deve ter:**
- Título com identificação da máquina
- Campos de login e senha (senha oculta)
- Checkbox para estado de emergência
- Botão "Autenticar"
- Mensagem de sucesso ou erro

**Valores de teste:**
- `login = "admin"`, `senha = "123456"`, emergência desmarcada → Acesso autorizado
- `login = "admin"`, `senha = "000000"`, emergência desmarcada → Acesso negado
- `login = "admin"`, `senha = "123456"`, emergência marcada → Acesso negado

## Exercício 3.4 — Seleção de Material por Torque

**Contexto:** Um engenheiro de projetos precisa selecionar o material adequado para um eixo de transmissão com base no torque que ele deve suportar. A empresa trabalha com três materiais padrão e quer uma ferramenta que sugira o material e calcule o custo base da peça.

**Entradas:**
- Torque requerido (Nm) — use `st.slider` com faixa de 0 a 1000

**Tabela de seleção:**

| Faixa de Torque | Material | Custo Base |
|---|---|---|
| < 100 Nm | Polímero (POM) | R$ 50,00 |
| 100 a 500 Nm | Alumínio 6061 | R$ 150,00 |
| > 500 Nm | Aço Liga 4340 | R$ 300,00 |

**Forma de pagamento:**
- Adicione um `st.radio` com opções: "PIX à vista (-10%)" e "Cartão 30 dias (+5%)"

**O que o app deve ter:**
- Título e descrição
- Slider para o torque
- Radio para forma de pagamento
- Botão "Selecionar material"
- Resultado com material selecionado, custo base e custo final

**Valores de teste:**
- `torque = 80 Nm`, PIX → Polímero, R$ 45,00
- `torque = 300 Nm`, Cartão → Alumínio, R$ 157,50
- `torque = 700 Nm`, PIX → Aço Liga, R$ 270,00

## Exercício 3.5 — Homogeneidade de Eixos

**Contexto:** O controle de qualidade de uma fábrica de eixos recebe lotes de 3 peças e precisa verificar se os diâmetros estão dentro da tolerância especificada. Se a diferença entre o maior e o menor diâmetro do lote ultrapassar a tolerância, o lote inteiro é reprovado.

**Entradas:**
- Diâmetros dos 3 eixos (mm) — use três `st.number_input` lado a lado
- Tolerância máxima (mm) — use `st.number_input` com valor padrão 0.05

**Processamento:**
1. Calcular a dispersão: `dispersao = max(d1, d2, d3) - min(d1, d2, d3)`
2. Calcular a média: `media = (d1 + d2 + d3) / 3`
3. Se `dispersao >= tolerancia` → "Lote Reprovado"
4. Senão → "Lote Aprovado"

**O que o app deve ter:**
- Título com referência ao controle de qualidade
- Três campos de entrada para os diâmetros
- Campo para a tolerância
- Botão "Verificar lote"
- Resultados: média, dispersão e status do lote

**Valores de teste:**
- `d1 = 50.00`, `d2 = 50.02`, `d3 = 50.01`, tolerância = 0.05 → Aprovado (dispersão = 0.02)
- `d1 = 50.00`, `d2 = 50.08`, `d3 = 50.03`, tolerância = 0.05 → Reprovado (dispersão = 0.08)

## Exercício 3.6 — Conversor de Unidades com Funções

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

## Exercício 3.7 — Classificador de Solda com Funções

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

## Referências

- **Python.org — Controle de fluxo** — https://docs.python.org/pt-br/3/tutorial/controlflow.html
- **Python.org — Funções** — https://docs.python.org/pt-br/3/tutorial/controlflow.html#defining-functions
- **Streamlit Docs — Widgets** — https://docs.streamlit.io/develop/api-reference/widgets
- **PEP 8 — Guia de estilo** — https://peps.python.org/pep-0008/
