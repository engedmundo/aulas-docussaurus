# Estruturas de Dados

## Roteiro

1. Por que estruturas de dados?
2. Listas: criação, indexação, fatiamento
3. Métodos de lista
4. `enumerate()`, `zip()`, list comprehensions
5. Tuplas: dados imutáveis
6. Dicionários: chave → valor
7. Conjuntos: operações de comparação
8. Exercícios: temperaturas, materiais, certificações
9. **Mini-projeto:** Catálogo de Materiais

## Por que estruturas de dados?

Nas aulas anteriores, cada variável guardava **um** valor:

```python
forca = 5000.0
area = 0.002
sigma = forca / area
```

Mas na engenharia real, lidamos com **coleções** de dados:

- 50 leituras de temperatura de um ensaio
- 12 materiais no catálogo de projetos
- 8 sensores monitorando uma linha de produção
- 30 operadores com diferentes certificações

**Estruturas de dados** são formas de organizar múltiplos valores em uma única variável. Python oferece quatro tipos principais:

| Estrutura | Ordenada? | Mutável? | Duplicatas? | Uso típico |
|---|---|---|---|---|
| **Lista** `[]` | Sim | Sim | Sim | Sequência de leituras |
| **Tupla** `()` | Sim | Não | Sim | Coordenadas fixas |
| **Dicionário** `{}` | Não | Sim | Chaves únicas | Propriedades de material |
| **Conjunto** `{}` | Não | Sim | Não | Comparar grupos |

## Listas

Coleção **ordenada** e **mutável** de valores. É a estrutura mais usada em Python.

```python
# Criação
temperaturas = [300, 320, 315, 310, 290]
materiais = ["Aço", "Alumínio", "Latão"]
mista = [42, "texto", 3.14, True]   # pode misturar tipos

# Indexação — começa em 0
print(temperaturas[0])    # 300 (primeiro)
print(temperaturas[2])    # 315 (terceiro)
print(temperaturas[-1])   # 290 (último)
print(temperaturas[-2])   # 310 (penúltimo)
```

### Fatiamento (slicing)

A sintaxe `[início:fim:passo]` permite extrair partes da lista:

```python
leituras = [10, 20, 30, 40, 50, 60, 70, 80]

leituras[0:3]     # [10, 20, 30] — do índice 0 até 2 (fim exclusivo)
leituras[2:]      # [30, 40, 50, 60, 70, 80] — do 2 até o fim
leituras[:4]      # [10, 20, 30, 40] — do início até 3
leituras[::2]     # [10, 30, 50, 70] — a cada 2
leituras[-3:]     # [60, 70, 80] — últimos 3
leituras[::-1]    # [80, 70, 60, 50, 40, 30, 20, 10] — invertida
```

> O índice `fim` é **sempre exclusivo** — `[0:3]` pega 0, 1, 2 (não inclui 3).

## Métodos de Lista

Listas têm métodos embutidos para manipulação:

```python
sensores = [10, 20, 30]

sensores.append(40)        # adiciona no final → [10, 20, 30, 40]
sensores.insert(1, 15)     # insere na posição 1 → [10, 15, 20, 30, 40]
sensores.remove(20)        # remove o primeiro 20 → [10, 15, 30, 40]
ultimo = sensores.pop()    # remove e retorna o último → 40
sensores.sort()            # ordena em ordem crescente
sensores.reverse()         # inverte a ordem

# Funções embutidas que funcionam com listas
print(len(sensores))       # 4 — quantidade de elementos
print(sum(sensores))       # 55 — soma
print(max(sensores))       # 30 — maior valor
print(min(sensores))       # 10 — menor valor
```

> `len()`, `sum()`, `max()`, `min()` são **funções embutidas** do Python — funcionam com qualquer sequência numérica.

### Exemplo real: análise de leituras de sensores

```python
leituras = [24.5, 25.1, 24.8, 25.3, 24.9, 25.0, 25.2]

print(f"Nº de leituras: {len(leituras)}")
print(f"Média: {sum(leituras)/len(leituras):.2f} °C")
print(f"Máxima: {max(leituras):.1f} °C")
print(f"Mínima: {min(leituras):.1f} °C")
print(f"Amplitude: {max(leituras) - min(leituras):.1f} °C")
```

## `enumerate()` — índice + valor

Quando você precisa do **índice** e do **valor** ao mesmo tempo:

```python
sensores = ["PT-01", "PT-02", "PT-03", "PT-04"]

# Sem enumerate — verboso
for i in range(len(sensores)):
    print(f"Sensor {i+1}: {sensores[i]}")

# Com enumerate — limpo
for i, nome in enumerate(sensores, start=1):
    print(f"Sensor {i}: {nome}")
```

## `zip()` — combinar listas

Quando você tem duas listas relacionadas e quer percorrê-las juntas:

```python
sensores = ["PT-01", "PT-02", "PT-03"]
leituras = [150.0, 162.5, 148.3]

for nome, valor in zip(sensores, leituras):
    print(f"{nome}: {valor} °C")
```

Saída:
```
PT-01: 150.0 °C
PT-02: 162.5 °C
PT-03: 148.3 °C
```

## List Comprehensions

Forma concisa de criar listas a partir de outras listas. É um dos recursos mais poderosos do Python:

```python
temperaturas_c = [25, 100, 200, 350, 500]

# Converter tudo para Kelvin — forma tradicional
temperaturas_k = []
for t in temperaturas_c:
    temperaturas_k.append(t + 273.15)

# Com list comprehension — uma linha
temperaturas_k = [t + 273.15 for t in temperaturas_c]

# Filtrar apenas temperaturas acima de 200°C
altas = [t for t in temperaturas_c if t > 200]
# Resultado: [350, 500]

# Filtrar e transformar
altas_k = [t + 273.15 for t in temperaturas_c if t > 200]
# Resultado: [623.15, 773.15]
```

> **Regra prática:** se você está criando uma lista vazia, fazendo `for` e `append()`, provavelmente pode usar list comprehension.

## Tuplas

Coleção **ordenada** e **imutável** — não pode ser alterada após criada.

```python
# Criação (parênteses são opcionais, mas recomendados)
ponto = (10, 20)
sensor = ("PT-100", 150.0, "°C")
coordenadas = (45.2, -12.5, 850.0)  # lat, lon, altitude

# Acesso igual a listas
print(sensor[0])     # PT-100
print(sensor[-1])    # °C

# Desempacotamento
nome, valor, unidade = sensor
print(f"{nome} mediu {valor} {unidade}")

# NÃO pode modificar:
# sensor[1] = 200   → TypeError!
```

### Quando usar tuplas vs listas?

| Situação | Use | Por quê |
|---|---|---|
| Leituras de sensor que mudam | Lista `[]` | Precisa adicionar/remover |
| Coordenadas fixas de um ponto | Tupla `()` | Não devem mudar |
| Registro histórico de ensaio | Tupla `()` | Dados imutáveis por integridade |
| Catálogo de materiais | Lista de dicts | Pode adicionar/remover materiais |

## Dicionários

Coleção de pares **chave → valor**. Ideal para representar objetos com propriedades.

```python
material = {
    "nome": "Aço 1020",
    "densidade": 7850,
    "modulo_E": 210_000,    # MPa
    "escoamento": 350,      # MPa
    "coef_dilatacao": 1.2e-5
}

# Acesso
print(material["nome"])           # Aço 1020
print(material.get("nome"))       # Aço 1020 (seguro — retorna None se não existir)
print(material.get("dureza"))     # None — não gera erro
# print(material["dureza"])       # KeyError! — gera erro

# Modificar valor existente
material["escoamento"] = 380

# Adicionar nova chave
material["dureza_hb"] = 220

# Verificar se chave existe
if "dureza_hb" in material:
    print(f"Dureza: {material['dureza_hb']} HB")
```

### Percorrendo dicionários

```python
for chave in material:
    print(chave)                          # só as chaves

for valor in material.values():
    print(valor)                          # só os valores

for chave, valor in material.items():
    print(f"{chave}: {valor}")            # chaves e valores
```

### Dicionários na prática — o que você já viu

Na aula 03, usamos um dicionário para mapear materiais a densidades:

```python
densidades = {
    "Aço 1020 (7850)": 7850,
    "Alumínio 6061 (2700)": 2700,
    "Latão (8500)": 8500,
}
rho = densidades[material]
```

Agora vamos aprofundar: dicionários podem armazenar **qualquer tipo** como valor, incluindo listas e outros dicionários:

```python
catalogo = {
    "aco_1020": {
        "nome": "Aço 1020",
        "densidade": 7850,
        "propriedades": {"E": 210_000, "sigma_y": 350},
    },
    "al_6061": {
        "nome": "Alumínio 6061",
        "densidade": 2700,
        "propriedades": {"E": 69_000, "sigma_y": 276},
    },
}

# Acesso aninhado
print(catalogo["aco_1020"]["propriedades"]["E"])   # 210000
```

## Conjuntos (set)

Coleção **não ordenada** e **sem elementos repetidos**. Ideal para comparações entre grupos.

```python
torno = {101, 102, 103, 104, 105}
fresa = {104, 105, 106, 107}

print(torno | fresa)    # união: {101, 102, 103, 104, 105, 106, 107}
print(torno & fresa)    # interseção: {104, 105}
print(torno - fresa)    # diferença: {101, 102, 103}
print(torno ^ fresa)    # dif. simétrica: {101, 102, 103, 106, 107}
```

### Aplicações práticas

```python
# Eliminar duplicatas de uma lista
leituras = [25.0, 26.5, 25.0, 27.3, 26.5, 28.1]
unicas = set(leituras)
print(unicas)   # {25.0, 26.5, 27.3, 28.1}

# Verificar se há sobreposição entre turnos
turno_a = {101, 102, 103}
turno_b = {103, 104, 105}
comum = turno_a & turno_b
if comum:
    print(f"Operadores em ambos os turnos: {comum}")
```

---

## Exercício 4.1 — Análise de Temperaturas

**Contexto:** Um ensaio térmico registrou temperaturas (°C) em intervalos regulares durante o aquecimento de uma peça. O engenheiro precisa analisar rapidamente os dados para verificar se o perfil de aquecimento está conforme a especificação.

**Dados:**
```python
temperaturas = [300, 320, 315, 310, 290]
```

**O que o app deve ter:**
- Título e descrição do ensaio
- Exibição da lista de temperaturas
- Resultados: primeira e última temperatura, variação (ΔT), média, máxima, mínima e amplitude
- Use `st.metric` para cada resultado

**Valores de teste:** `temperaturas = [300, 320, 315, 310, 290]` → ΔT = -10, média = 307.0, amplitude = 30

**Dica:** use `temperaturas[0]`, `temperaturas[-1]`, `sum()`, `max()`, `min()` e `len()`.

## Exercício 4.2 — Cadastro de Materiais

**Contexto:** O setor de engenharia de materiais quer manter um catálogo digital de materiais com suas propriedades mecânicas. Cada material é representado por um dicionário, e o catálogo é uma lista de dicionários.

**O que o app deve ter:**
- Três dicionários de materiais (Aço 1020, Alumínio 6061, Latão) com: nome, densidade, módulo de elasticidade (E), limite de escoamento
- Uma lista contendo os três materiais
- Exibição do catálogo usando `for` e `enumerate()`, mostrando cada material com seu número e propriedades formatadas

**Valores de teste:**
- Material 1: Aço 1020, ρ = 7850 kg/m³, E = 210 000 MPa, σ_y = 350 MPa
- Material 2: Alumínio 6061, ρ = 2700 kg/m³, E = 69 000 MPa, σ_y = 276 MPa
- Material 3: Latão, ρ = 8500 kg/m³, E = 100 000 MPa, σ_y = 250 MPa

## Exercício 4.3 — Certificações de Operadores

**Contexto:** O gerente de produção de uma metalúrgica precisa identificar quais operadores são polivalentes (certificados em Torno **e** Fresa), quais são exclusivos de cada máquina, e quem são todos os operadores da seção.

**Dados:**
```python
torno = {101, 102, 103, 104, 105, 108, 110}
fresa = {104, 105, 106, 107, 109, 110}

operadores = {
    101: "João", 102: "Maria", 103: "Pedro",
    104: "Ana", 105: "Carlos", 106: "Lucas",
    107: "Sofia", 108: "Rui", 109: "Eva", 110: "Ivo"
}
```

**O que o app deve ter:**
- Título e descrição do sistema
- Resultados usando conjuntos:
  - Operadores polivalentes (interseção)
  - Operadores exclusivos do torno (diferença)
  - Operadores exclusivos da fresa (diferença)
  - Total de operadores na seção (união)
- Para cada grupo, exibir os nomes usando o dicionário `operadores`

**Valores de teste:**
- Polivalentes: Ana, Carlos, Ivo
- Exclusivos do torno: João, Maria, Pedro, Rui
- Exclusivos da fresa: Lucas, Sofia, Eva

## Mini-Projeto — Catálogo de Materiais Interativo

**Contexto:** A engenharia de projetos quer uma ferramenta para consultar propriedades de materiais e comparar dois materiais lado a lado. O catálogo deve ser construído com dicionários e permitir seleção via Streamlit.

**O que o app deve ter:**
- Um dicionário com pelo menos 4 materiais, cada um com: nome, densidade, módulo de elasticidade (E), limite de escoamento, coeficiente de dilatação
- Um `st.selectbox` para escolher o material principal
- Um `st.radio` ou segundo `st.selectbox` para escolher o material de comparação (opcional)
- Botão "Consultar" que exibe as propriedades do material selecionado com `st.metric`
- Se dois materiais forem selecionados, exibir a comparação lado a lado usando `st.columns`

**Materiais sugeridos:**

| Material | ρ (kg/m³) | E (MPa) | σ_y (MPa) | α (×10⁻⁶/°C) |
|---|---|---|---|---|
| Aço 1020 | 7850 | 210 000 | 350 | 11.7 |
| Alumínio 6061 | 2700 | 69 000 | 276 | 23.1 |
| Latão | 8500 | 100 000 | 250 | 19.0 |
| Titânio Ti-6Al-4V | 4430 | 114 000 | 880 | 8.6 |

## Referências

- **Python.org — Estruturas de dados** — https://docs.python.org/pt-br/3/tutorial/datastructures.html
- **Python.org — Listas** — https://docs.python.org/pt-br/3/tutorial/datastructures.html#more-on-lists
- **Python.org — Dicionários** — https://docs.python.org/pt-br/3/tutorial/datastructures.html#dictionaries
- **PEP 8 — Guia de estilo** — https://peps.python.org/pep-0008/
