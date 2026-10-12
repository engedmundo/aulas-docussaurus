# Estruturas de Dados

## Roteiro

1. Por que estruturas de dados?
2. Listas: criação, indexação, fatiamento
3. Métodos de lista (comportamento mutável)
4. Criação automatizada: `range()`, `enumerate()`, `zip()`, `split()`
5. Tuplas: dados imutáveis
6. Dicionários: chave → valor (simples e aninhados)
7. Conjuntos: operações entre grupos
8. **Mini-projeto:** Catálogo de Materiais Interativo

## Por que estruturas de dados?

Nas aulas anteriores, cada variável guardava **um** valor:

```python
forca = 5000.0
area = 0.002
sigma = forca / area
```

Mas na vida real, lidamos com **coleções** de dados:

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

> Nesta aula você vai **criar** cada estrutura de vários jeitos (inclusive de forma automatizada) e observar o **comportamento** de cada uma. Nada de laços `for`/`while` por enquanto — eles chegam na aula 06.

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

### Exercício 5.1 — Playlist

**Contexto:** um app de música guarda a fila de reprodução numa lista. Você precisa consultar posições e trechos dela.

**Tarefa:** crie a lista `playlist` com 5 nomes de músicas (valores fixos) e exiba **trechos** dela com fatiamento:
- as três primeiras (`[:3]`)
- as duas últimas (`[-2:]`)
- do meio (`[1:4]`)
- a playlist invertida (`[::-1]`)

## Métodos de Lista

Listas têm métodos embutidos para manipulação. Repare no **comportamento**: cada método **altera a própria lista** (ela é mutável):

```python
sensores = [10, 20, 30]

sensores.append(40)        # adiciona no final → [10, 20, 30, 40]
sensores.insert(1, 15)     # insere na posição 1 → [10, 15, 20, 30, 40]
sensores.remove(20)        # remove o primeiro 20 → [10, 15, 30, 40]
ultimo = sensores.pop()    # remove e retorna o último → 40
sensores.sort()            # ordena em ordem crescente
sensores.reverse()         # inverte a ordem

# Funções embutidas que funcionam com listas
print(len(sensores))       # 3 — quantidade de elementos
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

### Exercício 5.2 — Fila de atendimento

**Contexto:** a recepção de uma clínica controla a ordem de atendimento numa lista: quem chega entra no fim (`append`), caso prioritário fura a fila (`insert`) e o próximo é chamado e sai da lista (`pop`).

**Tarefa:** comece com `fila = ["Ana", "Bruno"]` e execute nesta ordem:
1. `"Carla"` chega → entra no fim da fila
2. `"Seu José"` (prioritário) → entra na posição `0`
3. Chame o próximo (`pop(0)`) e guarde o nome numa variável
4. Exiba quem está em atendimento, a fila atual e quantas pessoas aguardam (`len()`)

**Resultado esperado:** em atendimento `Seu José`; fila `["Ana", "Bruno", "Carla"]`; aguardando `3`.

## Criação automatizada de estruturas

Digitar dezenas de valores à mão não é prático. Python cria estruturas **automaticamente** a partir de regras:

```python
# range() gera sequências numéricas — list() materializa em lista
matriculas = list(range(101, 106))   # [101, 102, 103, 104, 105]
pares = list(range(0, 21, 2))        # [0, 2, 4, ..., 20]

# Repetição com * cria vários elementos iguais
vagas = ["livre"] * 5                # ['livre', 'livre', 'livre', 'livre', 'livre']

# split() quebra um texto em lista
nomes = "Ana,Bruno,Carla".split(",")  # ['Ana', 'Bruno', 'Carla']
```

### `enumerate()` — numerar automaticamente

`enumerate()` combina cada elemento com sua posição, criando uma sequência de **tuplas** (número, valor):

```python
sensores = ["PT-01", "PT-02", "PT-03"]

print(list(enumerate(sensores, start=1)))
# [(1, 'PT-01'), (2, 'PT-02'), (3, 'PT-03')]
```

### `zip()` — combinar listas e montar dicionários

`zip()` emparelha duas listas posição a posição. Com `list()` vira lista de tuplas; com `dict()` vira **dicionário pronto**:

```python
nomes = ["Ana", "Bruno", "Carla"]
notas = [8.5, 7.0, 9.0]

print(list(zip(nomes, notas)))
# [('Ana', 8.5), ('Bruno', 7.0), ('Carla', 9.0)]

boletim = dict(zip(nomes, notas))
# {'Ana': 8.5, 'Bruno': 7.0, 'Carla': 9.0}

print(boletim["Bruno"])   # 7.0
```

> Na aula 06 você usará `enumerate()` e `zip()` dentro de laços. Por ora, use-os como **fábricas de estruturas**: eles constroem listas e dicionários de uma vez, sem repetição manual.

### Exercício 5.3 — Tabela de preços montada de uma vez

**Contexto:** uma padaria tem os produtos num texto separado por vírgulas e quer gerar os códigos e a tabela de preços sem digitar um por um.

**Tarefa:**
1. Gere `codigos` com `list(range(101, 105))`
2. Gere `produtos` com `"Pão,Leite,Café,Açúcar".split(",")`
3. Crie `precos = [5.50, 6.00, 12.00, 4.50]` (valores fixos)
4. Monte `tabela = dict(zip(produtos, precos))`
5. Exiba os códigos, os produtos, o preço do `"Café"` (acesso direto) e a tabela completa como lista de tuplas (`list(tabela.items())`)

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

### Exercício 5.4 — Cor RGB

**Contexto:** um programa de desenho guarda cada cor como uma tupla `(vermelho, verde, azul)` — os valores nunca devem mudar depois de definidos.

**Tarefa:**
1. Crie `cor = (255, 128, 0)` (laranja)
2. Desempacote em `r, g, b` e exiba cada canal
3. Exiba o primeiro canal por índice
4. Tente executar `cor[0] = 100` (pode deixar comentado) e anote o erro: o que o Python diz? Por que isso é **útil** para uma cor?

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

### Inspecionando dicionários (sem laços)

Para ver o conteúdo sem percorrer com laço (laços chegam na aula 06), converta as visões em listas:

```python
print(list(material.keys()))     # ['nome', 'densidade', ...] — só as chaves
print(list(material.values()))   # ['Aço 1020', 7850, ...] — só os valores
print(list(material.items()))    # [('nome', 'Aço 1020'), ...] — lista de tuplas!
```

Repare: `items()` devolve pares `(chave, valor)` — o mesmo formato que o `zip()` produz. Dicionários, listas e tuplas se conectam.

### Dicionários na prática — o que você já viu

Na aula 02, usamos um dicionário para mapear materiais a densidades:

```python
densidades = {
    "Aço 1020": 7850,
    "Alumínio 6061": 2700,
    "Latão": 8500,
}
print(densidades["Aço 1020"])   # 7850
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

# Acesso aninhado: navegue camada por camada
print(catalogo["aco_1020"]["propriedades"]["E"])   # 210000
```

### Exercício 5.5 — Ficha cadastral

**Contexto:** o sistema de uma biblioteca guarda cada leitor num dicionário — incluindo uma **lista** de telefones dentro dele.

**Tarefa:** crie o dicionário abaixo e, em seguida:
1. Exiba o nome com acesso direto (`["nome"]`)
2. Exiba o e-mail com `.get()` e valor padrão `"não informado"` (a chave não existe — repare que não dá erro)
3. Atualize a idade para `29` e adicione a chave `"email"`
4. Verifique com `in` se existe a chave `"cnh"` e exiba o resultado
5. Exiba a lista de telefones e a lista de chaves (`list(...)`)

```python
pessoa = {
    "nome": "Mariana",
    "idade": 28,
    "cidade": "Passo Fundo",
    "telefones": ["54-99911-2233"],
}
```

### Exercício 5.6 — Boletim aninhado

**Contexto:** o boletim da turma é um dicionário onde cada chave (nome) guarda uma **lista** de notas. É a combinação de dois tipos compostos.

**Tarefa:** partindo de `turma = {"Ana": [8.0, 7.0, 9.0], "Bruno": [6.0, 5.0, 7.0]}`:
1. Exiba a primeira nota da Ana com acesso aninhado (`turma["Ana"][0]`)
2. Calcule e exiba a média de cada aluno com `sum()` e `len()` (sem laços!)
3. Adicione `"Carla"` com a lista `[10.0, 9.5, 9.0]`
4. Exiba a lista de alunos (`list(turma.keys())`)

**Valores de teste:** média da Ana `8.0`; média do Bruno `6.0`.

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

### Exercício 5.7 — O que falta na despensa?

**Contexto:** você quer fazer um bolo. A receita pede um conjunto de ingredientes e a despensa tem outro — conjuntos respondem tudo sem laços.

**Tarefa:** com `receita = {"farinha", "ovos", "leite", "açúcar", "fermento"}` e `despensa = {"farinha", "ovos", "café", "sal"}`, exiba:
1. O que falta comprar (diferença `receita - despensa`)
2. O que você já tem (interseção)
3. Todos os itens envolvidos (união)

## Exercício 5.8 — Análise de Temperaturas

**Contexto:** Um ensaio térmico registrou temperaturas (°C) em intervalos regulares durante o aquecimento de uma peça. O engenheiro precisa analisar rapidamente os dados para verificar se o perfil de aquecimento está conforme a especificação.

**Dados:**
```python
temperaturas = [300, 320, 315, 310, 290]
```

**O que o programa deve ter:**
- Título e descrição do ensaio.
- Exibição da lista de temperaturas
- Resultados: primeira e última temperatura, variação (ΔT), média, máxima, mínima e amplitude
- Exiba cada resultado com `print(f"...")`, identificando cada valor

**Valores de teste:** `temperaturas = [300, 320, 315, 310, 290]` → ΔT = -10, média = 307.0, amplitude = 30

**Dica:** use `temperaturas[0]`, `temperaturas[-1]`, `sum()`, `max()`, `min()` e `len()`.

## Exercício 5.9 — Cadastro de Materiais

**Contexto:** O setor de engenharia de materiais quer manter um catálogo digital de materiais com suas propriedades mecânicas. Cada material é representado por um dicionário, e o catálogo é uma lista de dicionários.

**O que o programa deve ter:**
- Três dicionários de materiais (Aço 1020, Alumínio 6061, Latão) com: nome, densidade, módulo de elasticidade (E), limite de escoamento
- Uma lista contendo os três materiais
- Exibição de cada material (índices `0`, `1`, `2`) com nome e propriedades formatadas — sem laços, acessando posição por posição

**Valores de teste:**
- Material 1: Aço 1020, ρ = 7850 kg/m³, E = 210 000 MPa, σ_y = 350 MPa
- Material 2: Alumínio 6061, ρ = 2700 kg/m³, E = 69 000 MPa, σ_y = 276 MPa
- Material 3: Latão, ρ = 8500 kg/m³, E = 100 000 MPa, σ_y = 250 MPa

## Exercício 5.10 — Certificações de Operadores

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

**O que o programa deve ter:**
- Título e descrição do sistema
- Resultados usando conjuntos:
  - Operadores polivalentes (interseção)
  - Operadores exclusivos do torno (diferença)
  - Operadores exclusivos da fresa (diferença)
  - Total de operadores na seção (união + `len()`)
- Para cada grupo, exibir os nomes **ordenados** com `sorted()` e `map()` (ver dica)

**Valores de teste:**
- Polivalentes: Ana, Carlos, Ivo
- Exclusivos do torno: João, Maria, Pedro, Rui
- Exclusivos da fresa: Lucas, Sofia, Eva


## Exercício 5.11 — Carrinho de compras

**Contexto:** uma loja online guarda o carrinho num dicionário onde cada chave (produto) contém outro dicionário com `preco` e `qtd`. A regra de negócio: frete **grátis** para subtotal a partir de R$ 100,00, senão frete fixo de R$ 15,00. Tudo deve ser calculado por acesso direto — item a item, sem laços.

**Dados:**
```python
carrinho = {
    "Pão": {"preco": 5.50, "qtd": 4},
    "Café": {"preco": 12.00, "qtd": 2},
    "Leite": {"preco": 6.00, "qtd": 3},
}
```

**Tarefa:**
1. Calcule o `subtotal` somando `preco × qtd` de cada produto com acesso aninhado (`carrinho["Pão"]["preco"]`, ...)
2. Defina o `frete` com `if`/`else` (grátis se `subtotal >= 100`)
3. Exiba subtotal, frete e total com `print(f"...")`
4. Depois adicione `"Açúcar"` (`{"preco": 4.50, "qtd": 10}`) ao carrinho, recalcule e exiba de novo

**Valores de teste:**
- Carrinho inicial → subtotal R$ 64,00, frete R$ 15,00, total R$ 79,00
- Com o açúcar → subtotal R$ 109,00, frete grátis, total R$ 109,00

## Mini-Projeto — Catálogo de Materiais Interativo

**Contexto:** A engenharia de projetos quer uma ferramenta para consultar propriedades de materiais e comparar dois materiais lado a lado. O catálogo deve ser construído com dicionários **chaveados pelo nome do material**.

**O que o programa deve fazer:**
- Um dicionário com pelo menos 4 materiais (chave = nome), cada um com: densidade, módulo de elasticidade (E), limite de escoamento, coeficiente de dilatação
- Uma variável com o nome do material principal a consultar
- Uma variável opcional com o nome do material de comparação
- Imprima as propriedades do material selecionado com `print(f"...")`
- Se dois materiais forem selecionados, imprimir a comparação lado a lado com `print(f"...")`

**Materiais sugeridos:**

| Material | ρ (kg/m³) | E (MPa) | σ_y (MPa) | α (×10⁻⁶/°C) |
|---|---|---|---|---|
| Aço 1020 | 7850 | 210 000 | 350 | 11.7 |
| Alumínio 6061 | 2700 | 69 000 | 276 | 23.1 |
| Latão | 8500 | 100 000 | 250 | 19.0 |
| Titânio Ti-6Al-4V | 4430 | 114 000 | 880 | 8.6 |

## Resumo da aula

- Listas `[]`: ordenadas, mutáveis, aceitam duplicatas — mais usadas no dia a dia
- Métodos como `append()`/`pop()` **alteram a própria lista**; `len()`/`sum()`/`max()`/`min()` apenas consultam
- Criação automatizada: `list(range(...))`, `["x"] * n`, `split()`, `dict(zip(...))`, `set(lista)`
- `enumerate()` numera e `zip()` emparelha — aqui, como fábricas de estruturas (com laços, na aula 06)
- Tuplas `()`: ordenadas, **imutáveis** — qualquer tentativa de alteração gera `TypeError`
- Dicionários `{}`: chave → valor; `[]` gera `KeyError` se faltar, `.get()` é seguro; `in` testa chaves
- Dicionários aninhados e listas de dicionários combinam tipos compostos — navegue camada por camada
- Conjuntos `{}`: não ordenados, sem duplicatas — `|`, `&`, `-`, `^` comparam grupos
- Sem laços: inspecione com `list(...)`, `sorted()` e acesso direto por índice/chave
- Combine tipos compostos e decisões para regras de negócio (ex.: carrinho aninhado + frete)

## Referências

- **Python.org — Estruturas de dados** — https://docs.python.org/pt-br/3/tutorial/datastructures.html
- **Python.org — Listas** — https://docs.python.org/pt-br/3/tutorial/datastructures.html#more-on-lists
- **Python.org — Dicionários** — https://docs.python.org/pt-br/3/tutorial/datastructures.html#dictionaries
- **PEP 8 — Guia de estilo** — https://peps.python.org/pep-0008/
