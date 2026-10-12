# Setup + Primeiros Passos

## Roteiro

1. O que é programação?
2. Algoritmos: a base de tudo
3. O que torna um algoritmo bom?
4. Decomposição do problema: entrada, processamento, saída
5. Pseudocódigo: a ponte para o código
6. Fluxograma: o algoritmo em diagrama
7. Python na Engenharia Mecânica
8. Python vs outras linguagens
9. Ecossistema Python
10. Configuração do ambiente
11. Primeiro programa — Hello World
12. Exercícios

## O que é programação?

Programação é o processo de **traduzir um problema do mundo real** em instruções que um computador possa executar.

```
  ┌────────────┐     ┌────────────┐     ┌──────────┐
  │            │     │ Algoritmo  │     │          │
  │  Problema  │────→│ sequência  │────→│ Programa │
  │            │     │ de passos  │     │          │
  └────────────┘     └────────────┘     └──────────┘
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
4. Adicionar 3 colheres de pó de café
5. Despejar água quente (200 mL)
6. Aguardar 5 minutos
7. Servir
```

Cada passo é claro, objetivo e executado em ordem. Se inverter a ordem, o café não fica pronto.

Para **calcular a média aritmética de três números**:

```
1. Ler o primeiro número n1
2. Ler o segundo número n2
3. Ler o terceiro número n3
4. Somar os três: soma = n1 + n2 + n3
5. Dividir por 3: media = soma / 3
6. Exibir a média
```

A lógica é a mesma de qualquer algoritmo: dados de entrada, um cálculo ordenado e um resultado. Não importa se o problema é matemático, do cotidiano ou da engenharia, a forma de raciocinar é idêntica.

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

## O que torna um algoritmo bom?

Nem toda lista de instruções é um bom algoritmo. Para que um algoritmo sirva de verdade, ele precisa atender a algumas **propriedades**. Elas são o teste de qualidade de qualquer sequência de passos:

| Propriedade        | O que significa                             | Exemplo                                                      |
| ------------------ | ------------------------------------------- | ------------------------------------------------------------ |
| **Finito**         | Termina após um número limitado de passos   | Não pode ter um "repita para sempre" sem condição de parada  |
| **Preciso**        | Cada passo é claro, sem ambiguidade         | "Aqueça a 850 °C" (não "aqueça um pouco")                    |
| **Ordenado**       | Os passos estão em sequência lógica correta | Filtrar _antes_ de servir o café                             |
| **Determinístico** | Mesmos dados de entrada → mesmo resultado   | `σ = F/A` sempre produz o mesmo valor para o mesmo `F` e `A` |
| **Eficaz**         | De fato resolve o problema proposto         | Chega ao resultado esperado, sem desvios                     |


[![Algoritmo para fazer um sanduíche](https://youtube.com)](https://www.youtube.com/watch?v=mhGZRTbUUo8)

### Um algoritmo com defeito

Compare estas duas versões do mesmo processo (usinagem de uma peça) e identifique onde a primeira falha:

```
1. Pegue a peça
2. Ligue a máquina
3. Usine por um tempo
4. Confira se ficou boa
```

```
1. Fixe a peça na placa do torno (aperto adequado)
2. Ligue a máquina e aguarde estabilizar
3. Usine com avanço 0,15 mm/rot até o diâmetro 40,00 mm
4. Meça o diâmetro com paquímetro
5. Se 39,95 ≤ diâmetro ≤ 40,05 mm → aprovada; senão, retorne ao passo 3
```

A primeira versão viola a **precisão** ("por um tempo", "se ficou boa") e a **finitude** (não define quando parar). A segunda especifica valores, instrumentos e uma condição de parada clara. Este é o tipo de rigor que o computador — e o engenheiro — exigem.

## Decomposição do problema: entrada, processamento, saída

Antes de escrever qualquer algoritmo, é útil **decompor o problema** em três blocos bem distintos. Esse exercício mental é o coração do pensamento computacional e vale para qualquer problema de engenharia:

```
ENTRADA      ──→   PROCESSAMENTO   ──→   SAÍDA
(o que eu     │    (que passos       │    (qual resultado
conheço?)     │     transformam?)    │     deve aparecer?)
```

| Bloco             | Pergunta-chave                       | Exemplo (tensão)    |
| ----------------- | ------------------------------------ | ------------------- |
| **Entrada**       | Que dados eu tenho?                  | Força `F`, área `A` |
| **Processamento** | Que operações transformam a entrada? | `σ = F / A`         |
| **Saída**         | Que resultado o usuário precisa ver? | Tensão em Pa e MPa  |

Repare como o algoritmo da tensão visto acima já segue essa estrutura — quase sem percebermos, os passos 1 e 2 são a _entrada_, o passo 3 é o _processamento_ e o passo 4 é a _saída_.

> **Hábito profissional:** toda vez que você for programar algo, antes de abrir o computador, responda por escrito às três perguntas da tabela. Se você não conseguir dizer com clareza o que **entra** e o que **sai**, ainda não entendeu o problema o suficiente.


## Pseudocódigo: a ponte para o código

Entre o "português corrido" e a linguagem de programação existe um degrau intermediário: o **pseudocódigo**. Ele usa palavras-chave simples para estruturar o algoritmo de forma quase-executável, mas ainda humana.

| Palavra                  | Significado                     |
| ------------------------ | ------------------------------- |
| `LEIA`                   | Receber um dado de entrada      |
| `CALCULE`                | Processar / transformar valores |
| `ESCREVA`                | Exibir um resultado na saída    |
| `SE ... ENTÃO ... SENÃO` | Tomar uma decisão               |
| `FIM`                    | Terminar o algoritmo            |

O algoritmo da tensão, em pseudocódigo:

```
INÍCIO
   LEIA força F (N)
   LEIA área A (m²)
   CALCULE sigma = F / A
   ESCREVA "Tensão: ", sigma, " Pa"
FIM
```

Para um algoritmo que **decide** (por exemplo, aprovar ou reprovar um aluno pela média final), o pseudocódigo já esboça a lógica condicional que você verá na aula 03:

```
INÍCIO
   LEIA nota1, nota2, nota3 (valores de 0 a 10)
   CALCULE media = (nota1 + nota2 + nota3) / 3
   SE media >= 7 ENTÃO
       ESCREVA "Aprovado"
   SENÃO
       ESCREVA "Reprovado"
FIM
```

## Fluxograma: o algoritmo em diagrama

O pseudocódigo é a forma **textual** de representar um algoritmo. Existe também uma forma **visual**: o **fluxograma** (ou diagrama de blocos). Nele, cada tipo de ação vira uma figura geométrica, ligada por setas que indicam a ordem de execução.

| Símbolo | Nome | O que representa | Equivale a |
|---|---|---|---|
| Oval | Início / Fim | Onde o algoritmo começa e termina | `INÍCIO` / `FIM` |
| Retângulo | Processo | Um cálculo ou transformação | `CALCULE` |
| Losango | Decisão | Uma pergunta com resposta sim/não | `SE ... ENTÃO ... SENÃO` |
| Paralelogramo | Entrada / Saída | Recebe um dado ou exibe um resultado | `LEIA` / `ESCREVA` |
| Seta | Fluxo | Indica a sequência dos passos | — |

O mesmo algoritmo da média, agora desenhado como fluxograma:

```
         ┌─────────┐
         │  INÍCIO │
         └────┬────┘
              │
   ┌──────────▼───────────────┐
   │ LEIA nota1, nota2, nota3 │
   └──────────┬───────────────┘
              │
   ┌──────────▼────────────────────┐
   │ media = (nota1+nota2+nota3)/3 │
   └──────────┬────────────────────┘
              │
        ┌─────▼──────┐
        │ media >= 7?│
        └─────┬──────┘
           sim │           não
       ┌──────▼──────┐   ┌──────▼───────┐
       │  ESCREVA    │   │  ESCREVA     │
       │  "Aprovado" │   │  "Reprovado" │
       └──────┬──────┘   └──────┬───────┘
              └────────┬────────┘
                       │
               ┌───────▼──────┐
               │      FIM     │
               └──────────────┘
```

> **Ponto-chave:** pseudocódigo e fluxograma são **equivalentes** — descrevem o mesmo algoritmo de dois jeitos diferentes. O fluxograma ajuda a *enxergar* decisões e ramificações; o pseudocódigo ajuda a *escrever* os passos. Profissionais usam o mais conveniente para cada etapa do projeto.

## Para que programar na Engenharia Mecânica?

| Área                 | Aplicação                             |
| -------------------- | ------------------------------------- |
| Automação            | Controle CNC, supervisão de processos |
| Análise de Dados     | Ensaios de tração, sensores, CEP      |
| Ferramentas Práticas | Dashboards, calculadoras, relatórios  |

Python é a linguagem que mais cresce em engenharia — e é **gratuita**.

### Por que não usar planilhas para tudo?

Planilhas são ótimas para dados simples. Mas à medida que os problemas crescem, surgem limitações:

| Situação                           | Planilha             | Python                 |
| ---------------------------------- | -------------------- | ---------------------- |
| 100 linhas de dados                | Confortável          | Confortável            |
| 100.000 linhas de dados            | Lento / trava        | Rápido                 |
| Repetir análise todo mês           | Manual               | **Automatizado**       |
| Compartilhar ferramenta interativa | Arquivo .xlsx frágil | **App Web**            |
| Gráfico animado / interativo       | Limitado             | **Plotly / Streamlit** |

A habilidade de programar não substitui o conhecimento de engenharia — ela **multiplica** o que você já sabe.

## Python vs outras linguagens

| Característica          | Python               | MATLAB          | C/C++        |
| ----------------------- | -------------------- | --------------- | ------------ |
| Licença                 | **Gratuito**         | Licença paga    | Gratuito     |
| Curva de aprendizado    | **Baixa**            | Média           | Alta         |
| Bibliotecas científicas | NumPy, SciPy, Pandas | Toolboxes pagos | Boost, Eigen |
| Gráficos                | Matplotlib, Plotly   | Nativo          | Qt, VTK      |
| Dashboards              | **Streamlit**        | MATLAB Web App  | CGI          |
| Comunidade              | Gigante              | Restrita        | Gigante      |

## Ecossistema Python para Engenharia

```
          ┌───────────────────────────┐
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

Cada camada depende da anterior. No decorrer da disciplina, você aprenderá a usar todas elas — começando pela base (esta aula) e chegando até a análise e visualização de dados com Pandas e Matplotlib (a partir da aula 02).

## Instalação e Configuração do Ambiente

### Google Colab (recomendado)

Para esta disciplina usaremos o **Google Colab**, que roda Python no navegador sem nenhuma instalação local. Python, NumPy, Pandas e Matplotlib já vêm prontos. Basta criar um notebook e começar.

1. Acesse [colab.research.google.com](https://colab.research.google.com/) e faça login com sua conta Google
2. Clique em **Novo notebook** (ou File → New notebook)
3. Em cada célula você escreve código Python e pressiona **Shift + Enter** para executar

> O Colab é ideal para a sala de aula: não precisa instalar Python, bibliotecas ou ambientes virtuais. Cada aluno abre o notebook do navegador e já está programando.

### Instalação local (opcional)

Caso prefira programar em seu próprio computador, o procedimento a seguir instala Python + VS Code localmente.

#### Python

1. Acesse [python.org](https://www.python.org/)
2. **Downloads** → Windows/macOS
3. Baixe a versão mais recente (3.12+)
4. Execute o instalador marcando **"Add Python to PATH"**
5. Verifique no terminal:

```bash
python --version
```

No macOS, instale via Homebrew: `brew install python`

#### VS Code

1. Acesse [code.visualstudio.com](https://code.visualstudio.com/)
2. Baixe e instale
3. Extensões essenciais: **Python** (ms-python.python), **Pylance** (ms-python.vscode-pylance), **Jupyter** (ms-toolsai.jupyter)

#### Ambiente virtual (`venv`)

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

## Exercício 1.1 — Ordene os passos (Bhaskara)

**Contexto:** para resolver a equação do 2º grau $ax^2 + bx + c = 0$ usando a fórmula de Bhaskara, um colega listou os passos abaixo, fora de ordem.

- ( ) Calcule o discriminante: $\Delta = b^2 - 4ac$
- ( ) Exiba as duas raízes encontradas
- ( ) Leia os coeficientes $a$, $b$ e $c$
- ( ) Calcule as raízes: $x = \dfrac{-b \pm \sqrt{\Delta}}{2a}$

**Tarefa:** numere os passos na ordem correta (1 a 4). Depois, diga qual propriedade de um bom algoritmo foi desrespeitada na lista original.

---

## Exercício 1.2 — Corrija o algoritmo com defeito (restaurante)

**Contexto:** alguém descreveu assim o processo de "fazer uma refeição num restaurante":

```
1. Sente à mesa
2. Peça um prato
3. Coma
4. Vá embora
```

**Tarefa:** reescreva o algoritmo corrigindo os defeitos. Lembre-se das propriedades **precisão** (passos claros, sem ambiguidade), **ordenação** e **finitude** (condição de parada). Não é preciso escrever código — apenas passos bem definidos.

---

## Exercício 1.3 — Decomposição: caixa eletrônico

**Contexto:** você precisa descrever como funciona um **saque no caixa eletrônico**. Antes de programar, faça a decomposição do problema em **entrada → processamento → saída**.

**Tarefa:** preencha a tabela abaixo, identificando claramente o que entra, o que é processado e o que sai. Considere também o caso em que o saldo é insuficiente.

| Bloco | Conteúdo |
|---|---|
| **Entrada** |  |
| **Processamento** |  |
| **Saída** |  |

---

## Exercício 1.4 — Pseudocódigo e fluxograma do saque

**Contexto:** a partir da decomposição do exercício anterior, você agora vai **representar** o algoritmo do saque no caixa eletrônico de duas formas.

**Tarefa:** escreva o **pseudocódigo** do saque (com `LEIA`, `CALCULE`, `SE ... ENTÃO ... SENÃO`, `ESCREVA`, `FIM`) e, em seguida, desenhe o **fluxograma** correspondente. Inclua a decisão: *o saldo é suficiente?*

**Dica:** use o pseudocódigo e o fluxograma da seção "Fluxograma" como modelo, substituindo as notas pela operação de saque.

---

## Exercício 1.5 — Algoritmo do Pistão Hidráulico

**Contexto:** Uma empresa de equipamentos hidráulicos precisa de uma ferramenta para que seus técnicos dimensionem pistões. Antes de escrever código, o engenheiro deve documentar o algoritmo.

**Fórmula:**

$$P = \frac{F}{A} \qquad A = \frac{\pi \cdot d^2}{4}$$

**Tarefa:** Escreva o algoritmo em **pseudocódigo** (usando `LEIA`, `CALCULE`, `ESCREVA`) para calcular a pressão em um pistão, dados a força aplicada `F` e o diâmetro do êmbolo `d`.

**Dica:** lembre-se de converter o diâmetro de mm para m antes de calcular a área.

**Valores de teste:** `F = 12 000 N`, `d = 40 mm` → `A = 1 256.64 mm²`, `P = 9.55 MPa`

---

## Exercício 1.6 — Execute o código de tensão

No Colab, crie uma nova célula com o código de cálculo de tensão visto nesta aula e execute com **Shift + Enter**. Confirme que a saída é:

```
Tensão normal: 2500000.0 Pa
Tensão normal: 2.50 MPa
```

Em seguida, altere os valores de `F` e `A` para `F = 8000 N` e `A = 0.004 m²` e execute novamente. Qual é a tensão em MPa?

---

## Resumo da aula

- Programação é traduzir problemas em algoritmos e algoritmos em código
- Um algoritmo é uma sequência finita e bem definida de passos — vale para matemática, cotidiano ou engenharia
- Um bom algoritmo é **finito, preciso, ordenado, determinístico e eficaz**
- Decomponha o problema em **entrada → processamento → saída** antes de programar
- O **pseudocódigo** (`LEIA`, `CALCULE`, `ESCREVA`, `SE...SENÃO`) estrutura o raciocínio sem exigir sintaxe
- O **fluxograma** (diagrama de blocos) representa o mesmo algoritmo de forma visual
- Python é gratuito, de baixa curva de aprendizado e ideal para engenharia
- Use `print()` para exibir resultados no notebook ou no terminal
- O **Google Colab** roda Python no navegador, sem instalação (recomendado)
- Ambiente virtual (`venv`) isola dependências entre projetos (opcional, para uso local)

## Referências

- **Python.org — Tutorial oficial (pt-BR)** — https://docs.python.org/pt-br/3/tutorial/
- **Python.org — Função print()** — https://docs.python.org/3/library/functions.html#print
- **Python.org — Ambientes virtuais (venv)** — https://docs.python.org/pt-br/3/tutorial/venv.html
- **Google Colab — Documentação** — https://colab.research.google.com/notebooks/intro.ipynb
- **VS Code — Python extension** — https://code.visualstudio.com/docs/languages/python
