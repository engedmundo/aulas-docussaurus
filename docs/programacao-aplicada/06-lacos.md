# Laços de Repetição

## Roteiro

1. Por que laços de repetição?
2. Loop `for` — repetição sobre sequências
3. Loop `while` — repetição condicional
4. `break` e `continue`
5. Exercícios
6. **Mini-projeto:** Simulador de Aquecimento

## Por que laços de repetição?

Na aula anterior você aprendeu a armazenar coleções de dados em listas, dicionários e conjuntos. Mas como **processar** cada elemento dessas coleções sem escrever o mesmo código 50 vezes?

```python
# Sem laço — repetir manualmente
print(f"Sensor 1: {leituras[0]} °C")
print(f"Sensor 2: {leituras[1]} °C")
print(f"Sensor 3: {leituras[2]} °C")
# ... e se forem 100 sensores?
```

**Laços de repetição** permitem executar um bloco de código múltiplas vezes, uma para cada elemento de uma sequência (ou enquanto uma condição for verdadeira).

## Loop `for` — repetição sobre sequências

O `for` percorre cada elemento de uma sequência (lista, tupla, string, etc.):

```python
sensores = ["PT-01", "PT-02", "PT-03", "PT-04", "PT-05"]

for sensor in sensores:
    print(f"Lendo {sensor}...")
```

Saída:
```
Lendo PT-01...
Lendo PT-02...
Lendo PT-03...
Lendo PT-04...
Lendo PT-05...
```

### `for` com `enumerate()` — índice + valor

```python
leituras = [150.0, 162.5, 148.3, 155.7]

for i, valor in enumerate(leituras, start=1):
    print(f"Leitura {i}: {valor} °C")
```

### `for` com `range()` — repetir N vezes

Quando você precisa de um contador numérico:

```python
# Contar de 0 a 4
for i in range(5):
    print(f"Ensaio {i+1}")

# Contar de 10 a 18, pulando de 2 em 2
for i in range(10, 20, 2):
    print(i)   # 10, 12, 14, 16, 18

# Contar de trás para frente
for i in range(5, 0, -1):
    print(f"Contagem regressiva: {i}")
```

### `for` com dicionários

```python
material = {"nome": "Aço 1020", "densidade": 7850, "E": 210_000}

for chave in material:
    print(f"{chave}: {material[chave]}")

# Ou, mais limpo:
for chave, valor in material.items():
    print(f"{chave}: {valor}")
```

### `for` no contexto Streamlit

```python
import streamlit as st

st.title("Monitor de Sensores")

sensores = ["PT-01", "PT-02", "PT-03"]
leituras = [150.0, 162.5, 148.3]

for nome, valor in zip(sensores, leituras):
    if valor > 160:
        st.warning(f"{nome}: {valor} °C — acima do limite!")
    else:
        st.success(f"{nome}: {valor} °C — normal")
```

## Loop `while` — repetição condicional

O `while` repete enquanto uma condição for `True`. Use quando **não sabe de antemão** quantas iterações serão necessárias.

```python
temperatura = 25.0

while temperatura < 100:
    temperatura += 2.5
    print(f"Temperatura: {temperatura:.1f} °C")
```

### Exemplo de engenharia: simulação de aquecimento

```python
import time

temperatura = 25.0
tempo = 0

while temperatura < 100:
    temperatura += 1.5
    tempo += 1
    print(f"t = {tempo} min | T = {temperatura:.1f} °C")

print(f"Atingiu 100 °C em {tempo} minutos.")
```

> **Atenção:** a condição do `while` deve se tornar `False` em algum momento, senão o loop é infinito. No exemplo acima, `temperatura` cresce a cada iteração, garantindo que eventualmente ultrapasse 100.

### `while` com entrada do usuário

```python
senha = ""
while senha != "1234":
    senha = input("Digite a senha: ")
print("Acesso autorizado.")
```

## `break` e `continue`

### `break` — interrompe o loop imediatamente

```python
# Buscar sensor com falha
sensores = [150.0, 162.5, 999.9, 155.7, 148.3]

for i, valor in enumerate(sensores, start=1):
    if valor > 500:
        print(f"Sensor {i} com falha! Leitura anômala: {valor}")
        break
    print(f"Sensor {i}: {valor} °C — OK")
```

Saída:
```
Sensor 1: 150.0 °C — OK
Sensor 2: 162.5 °C — OK
Sensor 3 com falha! Leitura anômala: 999.9
```

### `continue` — pula para a próxima iteração

```python
# Pular leituras inválidas (negativas ou zero)
leituras = [25.0, -1.0, 30.5, 0.0, 28.3, -5.0, 31.0]

validas = []
for valor in leituras:
    if valor <= 0:
        continue   # pula esta iteração
    validas.append(valor)

print(f"Leituras válidas: {validas}")
print(f"Média: {sum(validas)/len(validas):.2f} °C")
```

### Comparação rápida

| Comando | Efeito | Analogia |
|---|---|---|
| (nenhum) | Continua normalmente | Seguir na fila |
| `continue` | Pula o resto, vai para próxima iteração | Pular a vez |
| `break` | Sai do loop completamente | Sair da fila |

---

## Exercício 6.1 — Tubulação com Sensores

**Contexto:** Uma tubulação industrial de 300 metros possui sensores de temperatura instalados a cada 3 metros, começando na posição 0 m. O engenheiro de instrumentação precisa gerar a lista completa de posições dos sensores e analisar as leituras.

**O que o app deve ter:**
- Gerar a lista de posições usando `range(0, 301, 3)`
- Exibir a quantidade total de sensores
- Exibir os 10 primeiros sensores (usando slicing)
- Exibir os 10 últimos sensores (usando slicing)
- Simular leituras aleatórias entre 140 e 170 °C para cada sensor e exibir a média

**Dica:** use `import random` e `random.uniform(140, 170)` para gerar leituras simuladas.

## Exercício 6.2 — Autenticação PIN Técnico

**Contexto:** Uma célula robotizada de soldagem exige que o técnico insira um PIN de 6 dígitos para iniciar o programa. O sistema permite no máximo 3 tentativas. Após 3 falhas, o acesso é bloqueado.

**O que o app deve ter:**
- Campo de entrada para o PIN (use `st.text_input` com `type="password"`)
- Botão "Tentar acesso"
- Contador de tentativas restantes
- Se o PIN estiver correto (`"123456"`): mensagem de sucesso
- Se o PIN estiver errado: mensagem de erro com tentativas restantes
- Se esgotar as tentativas: mensagem de bloqueio

**Dica:** use `st.session_state` para manter o contador de tentativas entre execuções do script.

**Valores de teste:**
- PIN correto: `123456` → Acesso autorizado
- PIN errado 3 vezes → Acesso bloqueado

> **Desafios opcionais:** pratique mais com os exercícios a seguir:
> - **Simulação de Caldeira** — use `for` com `range` para simular aquecimento etapa por etapa
> - **Custo de Combustível da Frota** — itere sobre dicionário de veículos e calcule custos individuais

## Mini-Projeto — Simulador de Aquecimento

**Contexto:** O engenheiro de processos precisa de uma ferramenta para simular o aquecimento de um forno industrial. O usuário informa a temperatura inicial, a temperatura alvo e a taxa de aquecimento, e o app exibe a evolução passo a passo.

**O que o app deve ter:**
- Campos de entrada para temperatura inicial (°C), temperatura alvo (°C) e taxa (°C/min)
- Botão "Simular aquecimento"
- Loop `while` que executa enquanto `temp_atual < temp_alvo`
- A cada passo: incrementar temperatura, registrar timestamp
- Exibir evolução em uma tabela (passo, temperatura, tempo acumulado)
- Ao final: exibir tempo total e gráfico simples da evolução

**Valores de teste:** `T_inicial = 25 °C`, `T_alvo = 350 °C`, `taxa = 5 °C/min` → 65 passos, 65 minutos

## Resumo da aula

- `for` percorre cada elemento de uma sequência — ideal para processar coleções
- `for` com `range()` gera contadores numéricos: `range(início, fim, passo)`
- `enumerate()` percorre com índice e valor simultaneamente
- `while` repete enquanto uma condição for verdadeira — garanta que a condição se torne `False`
- `break` interrompe o loop; `continue` pula para a próxima iteração
- `zip()` combina duas ou mais listas em paralelo

## Referências

- **Python.org — Controle de fluxo** — https://docs.python.org/pt-br/3/tutorial/controlflow.html
- **Tavares Neto, R. F.; Silva, F. M.** Introdução à programação para engenharia. LTC, 2022.
