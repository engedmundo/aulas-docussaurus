# Conceitos Básicos + Notebooks no Google Colab

## Roteiro

1. Pensamento computacional
2. Configuração do Google Colab
3. Primeiro comando: `print()`
4. Variáveis e tipos de dados
5. Operadores matemáticos
6. Formatação de saída (f-strings)
7. Entrada de dados (`input`) e conversão de tipos
8. Exemplo completo: Calculadora de Tensão
9. Mini-projeto: Calculadora de Usinagem

## Pensamento Computacional

Na aula anterior, vimos que programar é traduzir um problema em código. O **pensamento computacional** é o processo de raciocínio que permite fazer essa tradução de forma organizada.

Ele se apoia em quatro pilares:

| Pilar | O que significa | Exemplo prático |
|---|---|---|
| **Decomposição** | Dividir o problema em partes menores | Calcular o custo de usinagem = tempo + material + energia |
| **Padrões** | Identificar repetições e generalizar | Mesma fórmula de tensão serve para qualquer barra axial |
| **Abstração** | Focar no essencial, ignorar o irrelevante | Para calcular σ = F/A, não importa a cor da peça |
| **Algoritmos** | Sequência de passos para resolver o problema | Receber F → receber A → calcular → exibir resultado |

## Configuração do Google Colab

Para executar os exemplos desta aula não é preciso instalar nada. O **Google Colab** é um serviço gratuito que roda Python no navegador. É aqui que você escreverá seus **primeiros códigos Python** da disciplina.

**Primeiros passos:**

1. Acesse **colab.research.google.com** e faça login com sua conta Google
2. Clique em **Novo notebook**
3. Em cada célula de código, digite o Python e execute com **Shift+Enter**
4. O resultado aparece imediatamente abaixo da célula

> Ao contrário de instalar um ambiente local, o Colab já vem com Python e as principais bibliotecas de engenharia prontas. Nesta aula usaremos apenas Python puro.

### Células e notebook

O Colab organiza o código em **células** dentro de um **notebook**:

```
escrever uma célula  ──>  Shift+Enter  ──>  ver o resultado na hora, célula por célula
```

- Cada **célula de código** roda Python **de cima para baixo** como uma receita executada passo a passo
- Você escreve Python puro, o Colab cuida do ambiente
- Uma célula pode usar as **variáveis das células anteriores**, pois elas ficam na memória do notebook
- Para criar um novo bloco, use o botão **+ Código**
- Você também pode adicionar **células de texto** (Markdown) para documentar, com **negrito**, *itálico* e títulos, sem executar código

## Primeiro comando: `print()`

O comando mais importante para começar é o `print()`. Ele **exibe valores na tela** e é assim que você vai *ver* o resultado de qualquer programa.

```python
print("Olá, mundo!")             # texto literal entre aspas
print(42)                        # um número
print("Tensão:", 250, "MPa")     # vários valores separados por vírgula
```

- **Texto** vai sempre entre aspas simples `'...'` ou duplas `"..."`
- **Números** vão sem aspas
- Vários valores podem ser exibidos na mesma linha, separados por vírgula

> Em Python, o símbolo `#` inicia um **comentário**. Tudo à direita dele naquela linha é ignorado pelo computador — serve para explicar o código para outros humanos.

---

### Exercício 2.1 — Hello World

Este é o primeiro código Python da disciplina. No Colab, crie uma nova célula e escreva um programa que exiba:

```
Hello, World!
Bem-vindo à Programação Aplicada!
```

Depois, **adicione uma terceira linha** que exiba o seu nome. Execute com **Shift+Enter** e confira que as três mensagens aparecem na tela.

**Teste:** altere o texto entre aspas e execute de novo — repare que o `print()` exibe exatamente o que está escrito.

---

## Variáveis e tipos de dados

### Variáveis em Python

Uma variável é um **nome que guarda um valor na memória**. Pense na RAM do computador como uma bancada de laboratório com gavetas — cada gaveta é uma variável, e o valor é o que está sobre a bancada naquela posição.

```python
# Sintaxe: nome_da_variavel = valor
forca = 5000.0          # guarda o número 5000.0 com o nome "forca"
material = "Aço 1020"   # guarda um texto com o nome "material"
```

O sinal `=` em Python não é igualdade matemática, é uma **atribuição**: "coloque este valor neste nome".

### Regras para nomear variáveis

- Apenas letras, números e `_`, sem espaços ou acentos
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
```

---

### Exercício 2.2 — Criando e exibindo variáveis

Crie uma célula com as quatro variáveis abaixo e, em seguida, exiba cada uma com `print()`:

| Variável | Valor |
|---|---|
| `num_pecas` | `150` |
| `pressao` | `2.5` |
| `material` | `"Aço 1020"` |
| `sensor_ok` | `True` |

Depois, crie uma quinta variável `forca = 8000` e exiba uma mensagem no formato: `A força aplicada é 8000 N`.

**Dica:** para misturar texto e variável sem complicação, use `print("texto", variavel)`.

---

### Tipos de Dados Básicos

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

---

### Exercício 2.3 — Descobrindo o tipo

Para cada valor abaixo, escreva um código que use `print(type(...))` para exibir o tipo correspondente:

```python
150
2.5
"Aço 1020"
True
1e-3
"150"
```

**Pergunta:** qual a diferença entre o `150` (número) e o `"150"` (texto)? Por que o tipo importa?

---

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

> Para usar o valor de π, importe o módulo de matemática no topo da célula com `import math` e acesse `math.pi`.

### Precedência e um erro clássico

A precedência em Python segue a matemática: `()` > `**` > `*` `/` > `+` `-`

```python
import math

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

---

### Exercício 2.4 — Área de um círculo

Calcule a **área da seção transversal** de uma barra circular de diâmetro `d = 50 mm`, usando a fórmula:

$$A = \frac{\pi \cdot d^2}{4}$$

**Tarefa:** escreva um código que:
1. Importe `math`
2. Guarde o diâmetro em uma variável (o valor pode ser fixo — ainda não usamos `input`)
3. Calcule a área com os operadores `**`, `*` e `/`
4. Exiba o resultado com `print(...)`

**Dica:** lembre-se de converter mm → m (dividindo por 1000) antes de calcular, se quiser o resultado em m².

**Valores de teste:** `d = 50 mm` → `A ≈ 0.001963 m²` (ou `1963.50 mm²`).

---

## Formatação de saída (f-strings)

Quando você calcula algo, o `print()` mostra o valor "cru". As **f-strings** (Python 3.6+) permitem inserir variáveis e expressões **dentro do texto**:

```python
forca = 5000.0
area = 0.002
sigma = forca / area

# Sem f-string — verboso
print("Tensão: " + str(sigma) + " Pa")

# Com f-string — legível
print(f"Tensão: {sigma} Pa")
```

Basta colocar a letra `f` antes das aspas e escrever a variável entre `{ }`.

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

---

### Exercício 2.5 — Formatando resultados

Uma tensão calculada vale `sigma = 2_500_000.0` Pa. Escreva um código que, usando f-strings, exiba **quatro linhas** mostrando a tensão em:

1. Pa, sem casas decimais
2. MPa, com 2 casas decimais
3. kPa, com 1 casa decimal
4. notação científica em Pa, com 3 casas

**Valores de teste:** a linha em MPa deve sair `Tensão: 2.50 MPa`.

---

## Entrada de dados (`input`) e conversão de tipos

Até aqui os valores estavam **fixos no código**. Para tornar o programa interativo, usamos o `input()`, que **pausa o programa e aguarda o usuário digitar algo**.

```python
nome = input("Qual é o seu nome? ")
print(f"Olá, {nome}!")
```

### `input()` sempre retorna texto

O ponto mais importante: `input()` **sempre devolve uma string**, mesmo que o usuário digite um número. Por isso, para calcular, precisamos **converter** o texto em número.

### Conversão de tipos (casting)

| Função | Converte para | Exemplo |
|---|---|---|
| `int(x)` | inteiro | `int(3.9)` → `3` (trunca, não arredonda) |
| `float(x)` | decimal | `float(5)` → `5.0` |
| `str(x)` | texto | `str(250)` → `"250"` |
| `round(x, n)` | arredonda | `round(3.14159, 2)` → `3.14` |

```python
# Leitura de dados de um ensaio
forca_str = input("Força aplicada (N): ")   # input() SEMPRE retorna str
forca = float(forca_str)                    # converte texto → número decimal

diam_str = input("Diâmetro da barra (mm): ")
diametro = float(diam_str)

# Cálculo
import math
area = math.pi * (diametro / 1000) ** 2 / 4
sigma = forca / area

print(f"Área da seção: {area * 1e6:.2f} mm²")
print(f"Tensão normal: {sigma / 1e6:.2f} MPa")
```

> Ao executar uma célula no Google Colab, a função `input()` permite entrar com os dados pelo teclado: o programa pausa, aguarda o valor e depois continua. Esse é o principal mecanismo de interatividade no notebook.

### Por que `int(3.9)` não arredonda?

```python
print(int(3.9))    # → 3  (trunca)
print(int(-3.9))   # → -3 (trunca em direção a zero)
print(round(3.9))  # → 4  (arredonda para o inteiro mais próximo)
```

Para arredondar corretamente, use `round()`. O `int()` apenas descarta a parte decimal.

---

### Exercício 2.6 — Média de Dureza Rockwell

**Contexto:** O setor de controle de qualidade de uma metalúrgica recebe lotes de eixos de aço temperado que passam por tratamento térmico de têmpera e revenimento. A especificação técnica exige que a dureza Rockwell C (HRC) seja de no mínimo 40 HRC para garantir a resistência ao desgaste adequada. O técnico de qualidade realiza três medições em pontos diferentes de cada eixo e precisa calcular a média para decidir se o lote é aprovado ou rejeitado.

**Fórmula:**

$$\text{media} = \frac{d_1 + d_2 + d_3}{3}$$

**O que o exercício deve ter:**
- Título e descrição da especificação mínima
- Três entradas de medições (HRC) com `input()` e `float()`
- Cálculo da média e exibição do resultado com `print(f"...")`

**Valores de teste:** `d1 = 41.5`, `d2 = 43.0`, `d3 = 43.0` → média esperada: `42.50 HRC`

> **Próxima aula:** em `03 — Condicionais` você adicionará a aprovação/rejeição do lote com `if media >= 40: print("aprovado") else: print("reprovado")`.

---

### Exercício 2.7 — Relação de Transmissão

**Contexto:** Uma indústria de papel e celulose precisa projetar um redutor de velocidade para um transportador de rolos que leva bobinas de papel entre as seções da máquina. O motor elétrico disponível opera a 1750 RPM, mas o transportador precisa girar a uma velocidade bem menor para não danificar o material. O engenheiro de manutenção precisa calcular a relação de transmissão e a rotação de saída do redutor.

**Fórmulas:**

$$i = \frac{z_{movida}}{z_{motriz}} \qquad n_{saida} = \frac{n_{motor}}{i}$$

**O que o exercício deve ter:**
- Entrada para a rotação do motor (RPM) com `input()` e `float()`
- Duas entradas para os dentes das engrenagens (motriz e movida)
- Cálculo e impressão dos dois resultados: relação de transmissão e rotação de saída

**Valores de teste:** `z_motriz = 20 dentes`, `z_movida = 70 dentes`, `n_motor = 1750 RPM` → `i = 3.50`, `n_saída = 500.00 RPM`

---

## Exemplo completo: Calculadora de Tensão

Veja como integrar entrada, cálculo e formatação em um notebook funcional de engenharia:

```python
import math

print("Calculadora de Tensão Normal")
print("Calcula a tensão em barras sob carregamento axial: σ = F / A")
print("------------------------------------------------------------")

# Entradas do usuário
F = float(input("Força aplicada F (N): "))
diametro = float(input("Diâmetro da barra (mm): "))

# Cálculo
A = math.pi * (diametro / 1000) ** 2 / 4
sigma = F / A

print("---------------------------")
print("Resultado")
print(f"Área da seção (mm²): {A * 1e6:.2f}")
print(f"Tensão normal (MPa): {sigma / 1e6:.2f}")
```

Rode a célula com **Shift+Enter**, digite os valores e observe o resultado — altere os números e execute novamente para ver como muda.

> Na aula 03 você aprenderá `if/elif/else` e poderá adicionar a verificação do fator de segurança: se σ está abaixo do limite de escoamento, o programa exibirá aprovado ou reprovado automaticamente.

---

### Exercício 2.8 — Pressão de Pistão Hidráulico

**Contexto:** Uma empresa de equipamentos hidráulicos precisa de uma ferramenta rápida para que seus técnicos dimensionem pistões. O engenheiro responsável pelo setor de projetos quer que os técnicos consigam verificar a pressão de trabalho de qualquer pistão apenas informando a força aplicada e o diâmetro do êmbolo — sem precisar abrir uma planilha ou fazer contas no papel.

**Fórmulas:**

$$P = \frac{F}{A} \qquad A = \frac{\pi \cdot d^2}{4}$$

**O que o exercício deve ter:**
- Um título e uma breve descrição do cálculo
- Duas entradas: força `F` (N) e diâmetro `d` (mm) com `input()` e `float()`
- Dois resultados impressos: área da seção (mm²) e pressão (MPa)
- Use `input()`, `float()` e `print(f"...")`

**Valores de teste:** `F = 12 000 N`, `d = 40 mm` → `A = 1 256.64 mm²`, `P = 9.55 MPa`

**Dica:** importe `math` para usar `math.pi`, e lembre de converter `d` de mm para m antes de calcular a área em m².

> **Desafios opcionais:** pratique mais com os exercícios a seguir (gabarito no arquivo de exercícios):
> - **IMC do Operador** — mesmo padrão da calculadora de tensão, aplicado à ergonomia (NR-17)
> - **Cilindro com Desperdício** — combine geometria, densidade e custo em um único notebook
> - **Dilatação Térmica** — selecione o material a partir de uma lista digitada com `input()`
> - **Custo Operacional de Fresadora** — receba horas/dia com `input()` e calcule impostos

---

## Mini-Projeto — Calculadora de Usinagem

**Contexto:** A engenharia de processo de uma fábrica de componentes automotivos precisa de uma ferramenta interna para calcular rapidamente os parâmetros de corte e o custo de operações de torneamento cilíndrico externo. A ferramenta será usada pelos técnicos de chão de fábrica para verificar se os parâmetros de usinagem estão adequados antes de iniciar a produção de um lote.

**Fórmulas:**

$$V_c = \frac{\pi \cdot d \cdot n}{1000} \quad \text{(velocidade de corte, m/min)}$$

$$t = \frac{L}{f \cdot n} \quad \text{(tempo de corte, min)}$$

$$m = \frac{\pi \cdot d^2}{4} \cdot L \cdot \rho \cdot 10^{-9} \quad \text{(massa da peça, kg)}$$

$$\text{custo} = \left(t \cdot \frac{custo_{hora}}{60}\right) + (m \cdot preco_{kg})$$

**Parâmetros:**
- `d` — diâmetro da peça (mm)
- `n` — rotação do torno (RPM)
- `L` — comprimento usinado (mm)
- `f` — avanço por rotação (mm/rot)
- `ρ` — densidade do material (kg/m³)

**O que o notebook deve ter:**
- Seção "Geometria e corte" com entradas para diâmetro, rotação, comprimento e avanço
- Seção "Material e custo" com a seleção do material (lista com `input()`), custo horário e preço por kg
- Cálculo dos resultados
- Resultados impressos: velocidade de corte, tempo de corte, massa da peça e custo total

**Valores de teste:** `d = 60 mm`, `n = 1000 RPM`, `L = 250 mm`, `f = 0.15 mm/rot`, `ρ = 7850 kg/m³`, `custo_hora = R$ 80,00`, `preco_kg = R$ 12,00`

**Saída esperada:**
```
Velocidade de corte:   188.50 m/min
Tempo de corte:          1.67 min
Massa da peça:           5.55 kg
Custo total:          R$ 68,81
```

**Dica:** use um dicionário para mapear o nome do material à sua densidade:

```python
densidades = {"Aço 1020": 7850, "Alumínio 6061": 2700, "Latão": 8500}
print("Materiais:", list(densidades.keys()))
material = input("Material: ")
rho = densidades[material]
```

## Resumo da aula

- Use `print()` para exibir valores; texto vai entre aspas, números não
- Variáveis guardam valores na memória; tipos básicos: `int`, `float`, `str`, `bool`
- `type(variavel)` revela o tipo de qualquer valor
- Operadores: `+ - * / // % **`; precedência `()` > `**` > `*` `/` > `+` `-`
- f-strings formatam saída: `f"Valor: {variavel:.2f}"`
- `input()` sempre retorna `str` — converta com `int()` ou `float()` antes de calcular
- `int()` trunca; `round()` arredonda
- O Google Colab roda Python no navegador, sem instalação: células executadas com Shift+Enter

## Referências

- **Google Colab — Notebooks com Python** — https://colab.research.google.com/
- **Python.org — Tutorial oficial (pt-BR)** — https://docs.python.org/pt-br/3/tutorial/
- **Python.org — Tipos embutidos** — https://docs.python.org/pt-br/3/library/stdtypes.html
- **Python.org — Função print() e formatação** — https://docs.python.org/pt-br/3/tutorial/inputoutput.html
- **Matplotlib — Galeria de exemplos** — https://matplotlib.org/stable/gallery/index.html
- **PEP 8 — Guia de estilo** — https://peps.python.org/pep-0008/
- **Tavares Neto, R. F.; Silva, F. M.** Introdução à programação para engenharia. LTC, 2022.
