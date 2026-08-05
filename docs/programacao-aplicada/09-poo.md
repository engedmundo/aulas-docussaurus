# POO Essencial para Engenharia

## Roteiro

1. O que é POO? Objetos vs. estruturada
2. Dataclasses: POO simplificada para dados
3. Classes completas, `__init__`, instâncias
4. Métodos: comportamentos do objeto
5. Múltiplas classes e relacionamentos
6. Abstração
7. Encapsulamento (`@property`, `_atributo`)
8. Herança (`super()`)
9. Polimorfismo (sobrescrita)
10. Classes abstratas (ABC)
11. POO no notebook: persistindo objetos
12. Exercícios práticos

## O que é POO?

Na **programação estruturada**, os programas são construídos a partir de funções que manipulam dados.

```
  dados ──→ função() ──→ resultado
  dados ──→ função() ──→ resultado
```

Na **POO**, os programas são construídos a partir de **objetos** que interagem entre si.

```
  objeto1.metodo(objeto2)  ← mensagens entre objetos
  objeto2.metodo()         ← cada objeto sabe seus dados
```

> Um **objeto** é uma entidade que possui **características** (atributos) e **comportamentos** (métodos).

## Dataclasses — POO simplificada (antes de classes completas)

Se você só precisa de uma classe para **armazenar dados**, sem métodos complexos, Python oferece as **dataclasses** — uma forma mais curta e legível.

```python
from dataclasses import dataclass

@dataclass
class Material:
    nome: str
    densidade: float
    modulo_elasticidade: float
    limite_escoamento: float

# Criar objeto — sem __init__ manual
aco = Material("Aço 1020", 7850, 210e9, 350e6)
aluminio = Material("Alumínio 6061", 2700, 69e9, 276e6)

print(aco)              # Material(nome='Aço 1020', densidade=7850, ...)
print(aco.densidade)    # 7850
```

Vantagens das dataclasses:
- Sem `__init__` para escrever — o `@dataclass` gera automaticamente
- `print()` já mostra os atributos de forma legível
- Ideal para representar entidades: materiais, sensores, peças, ensaios

> Dataclasses são o ponto de partida ideal para POO em engenharia: você modela dados primeiro, e depois adiciona comportamento (métodos) quando necessário.

## Classe completa: o molde do objeto

Quando você precisa de **comportamento** (métodos) além de dados, usa-se a sintaxe completa de classes:

```python
class Aluno:
    def __init__(self, nome, notas):
        self.nome = nome
        self.notas = notas
```

- `class` declara a classe
- `__init__` é o **construtor** — executado ao criar um objeto
- `self` representa a **própria instância** (obrigatório em Python)

## Instância: o objeto criado

Para criar um objeto, "chama-se" a classe como uma função:

```python
aluno1 = Aluno("João",    [8, 7, 6, 5, 4, 3])
aluno2 = Aluno("Maria",   [10, 9, 8, 7, 6, 5])
aluno3 = Aluno("José",    [5, 4, 3, 2, 1, 0])
```

Cada instância é **independente**.

## Métodos: comportamentos do objeto

Métodos são funções que pertencem à classe e operam sobre `self`:

```python
class Aluno:
    def __init__(self, nome, notas):
        self.nome = nome
        self.notas = notas

    def calcular_media(self):
        return sum(self.notas) / len(self.notas)

    def exibir_situacao(self):
        media = self.calcular_media()
        if media >= 7:
            return "Aprovado"
        elif media >= 4:
            return "Exame Final"
        else:
            return "Reprovado"
```

## Múltiplas classes e relacionamentos

Problemas reais envolvem **múltiplas classes** que se relacionam:

```python
class Cliente:
    def __init__(self, nome, cpf):
        self.nome = nome
        self.cpf = cpf

class Conta:
    def __init__(self, titular, saldo=0):
        self.titular = titular   # Conta TEM um Cliente
        self.saldo = saldo

    def depositar(self, valor):
        self.saldo += valor

    def transferir(self, destino, valor):
        if self.saldo >= valor:
            self.saldo -= valor
            destino.depositar(valor)
```

## Abstração

**Abstração** é o processo de modelar apenas os aspectos **relevantes** de um problema, ignorando detalhes desnecessários.

> **Para quê?** Simplificar o problema focando no que importa para o contexto.

## Encapsulamento

**Encapsulamento** protege os dados do objeto contra acesso direto externo.

Em Python, convenciona-se:
- `_atributo` — protegido (não deve ser acessado fora da classe)
- `__atributo` — privado (name mangling)

```python
class ContaBancaria:
    def __init__(self, titular, saldo=0):
        self._titular = titular
        self._saldo = saldo

    @property
    def saldo(self):          # getter
        return self._saldo

    @saldo.setter
    def saldo(self, valor):   # setter
        if valor >= 0:
            self._saldo = valor
```

> `@property` permite acessar `conta.saldo` como atributo, mas com lógica interna.

## Herança

**Herança** permite que uma classe (filha) reutilize atributos e métodos de outra classe (mãe).

```python
class Cachorro(Animal):               # herda de Animal
    def __init__(self, nome, idade, raca):
        super().__init__(nome, idade)  # chama construtor da mãe
        self.raca = raca
```

## Polimorfismo

**Polimorfismo** = "muitas formas". Permite que diferentes classes implementem o **mesmo método** de maneiras diferentes.

```python
class Veiculo:
    def mover(self):
        return "Veículo se move..."

class Carro(Veiculo):
    def mover(self):                 # sobrescrita
        return "Carro roda a 80 km/h"

class Aviao(Veiculo):
    def mover(self):
        return "Avião voa a 900 km/h"
```

> Mesma **interface** (`mover()`), comportamentos **diferentes**.

## Classes Abstratas (ABC)

Uma **classe abstrata** não pode ser instanciada — serve apenas como modelo.

```python
from abc import ABC, abstractmethod

class Peca(ABC):
    def __init__(self, codigo, descricao):
        self.codigo = codigo
        self.descricao = descricao

    @abstractmethod
    def exibir_info(self):
        pass   # subclasse OBRIGA a implementar
```

- Usa `ABC` como superclasse
- `@abstractmethod` força a implementação nas subclasses

## POO no notebook: persistindo objetos

Nos apps Streamlit, o script era reexecutado a cada interação e os objetos criados fora do `st.session_state` eram perdidos. **No Colab isso não acontece**: objetos criados em uma célula permanecem no kernel enquanto o notebook estiver aberto.

### Objetos persistem entre células

```python
class Contador:
    def __init__(self):
        self.valor = 0

    def incrementar(self):
        self.valor += 1
```

```python
# Célula 2 — cria o objeto uma única vez
contador = Contador()
contador.incrementar()
contador.incrementar()
print(f"Valor: {contador.valor}")
```

Se você re-executar a célula 2, o contador é **recriado** do zero (volta a 0). Para acumular, execute apenas a célula com `contador.incrementar()`.

### Padrão com listas de objetos

```python
class Aluno:
    def __init__(self, nome, notas):
        self.nome = nome
        self.notas = notas

    def calcular_media(self):
        return sum(self.notas) / len(self.notas)
```

```python
# Célula 2 — cria a lista de alunos uma única vez
alunos = [
    Aluno("João", [8, 7, 6, 5, 4, 3]),
    Aluno("Maria", [10, 9, 8, 7, 6, 5]),
]

for aluno in alunos:
    print(f"{aluno.nome}: média {aluno.calcular_media():.1f}")
```

> **Regra:** no notebook, as variáveis e objetos persistirão enquanto o kernel estiver ativo. Re-executar a célula que os cria os recria do zero.

## Resumo — POO Essencial

| Conceito | Descrição |
|---|---|
| Classe | molde (atributos + métodos) |
| Objeto | instância única da classe |
| `self` | referência à própria instância |
| `__init__` | construtor |
| `_atributo` | protegido (convenção) |
| `@property` | getter/setter encapsulado |
| Herança | `class Filha(Pai)` |
| `super()` | chama método da superclasse |
| Polimorfismo | mesmo método, respostas diferentes |
| ABC | classe abstrata (modelo) |

> POO organiza código, facilita reuso e aproxima o modelo computacional do problema real de engenharia.

## Exercício 7.1 — Classe Aluno

**Classe `Aluno`** com atributos `nome` (str) e `notas` (list). Métodos: `calcular_media()`, `calcular_media_exame()` (média ponderada: 70% normal + 30% exame), `exibir_situacao()`.

**No notebook:**
- Criar os objetos `Aluno` em uma célula
- Para cada aluno, exibir com `print(f"...")` a média e a situação
- Exibir as notas individuais com `print()`

| Aluno | Notas |
|---|---|
| João | [8, 7, 6, 5, 4, 3] |
| Maria | [10, 9, 8, 7, 6, 5] |
| José | [5, 4, 3, 2, 1, 0] |

## Exercício 7.2 — Classe Calculadora

**Classe `Calculadora`** com atributos `op1` e `op2` (float). Métodos: `somar()`, `subtrair()`, `multiplicar()`, `dividir()`, `calcular_potencia()`. Cada método deve validar divisão por zero.

**No notebook:**
- Criar instâncias com valores definidos em variáveis (`op1`, `op2`)
- Escolher a operação em uma variável
- Exibir o resultado com `print(f"...")`
- Tratar a divisão por zero com condicional e `print()` de erro

## Exercício 7.3 — Classe Carro

**Classe `Carro`** com `consumo` (km/L), `combustivel` (inicia 0), `tanque_max` (50 L). Métodos: `abastecer(litros)`, `andar(distancia)`, `exibir_combustivel()`. O método `andar` deve calcular consumo e reduzir combustível; se não houver combustível suficiente, exibir mensagem.

**No notebook:**
- Criar o `Carro` e simular abastecer e andar com valores definidos em variáveis
- Exibir o nível atual do tanque com `print(f"...")`
- Exibir a fração do tanque (0 a 1) formatada como porcentagem
- Mensagens de feedback com `print()`

## Exercício 7.4 — Sistema Bancário

**Classes:** `Cliente` (nome, cpf) e `Conta` (titular, saldo). Métodos: `depositar()`, `sacar()`, `transferir()`, `exibir_saldo()`.

**No notebook:**
- Criar clientes e contas em células separadas, com valores definidos em variáveis
- Executar operações (depositar/sacar/transferir) chamando os métodos
- Listar contas com `print()` ou, se preferir, exibir com Pandas
- Os objetos persistem no kernel enquanto o notebook estiver aberto

## Exercício 7.5 — Classe Cliente (Abstração)

Partindo de uma classe genérica `Pessoa`, abstraia apenas o necessário para tratar **clientes**: CPF, nome, endereço.

**No notebook:**
- Criar os clientes com valores definidos em variáveis (nome, CPF, endereço)
- Listar os clientes cadastrados com `print()`
- A lista persiste no kernel enquanto o notebook estiver aberto

## Exercício 7.6 — ContaBancaria Encapsulada

**Classe `ContaBancaria`** com atributos privados `_titular` e `_saldo`. Getters via `@property`. Métodos: `depositar(valor)`, `sacar(valor)`, `transferir(destino, valor)` com validações (saldo insuficiente, valor negativo).

**No notebook:**
- Criar contas com valores definidos em variáveis (titular, saldo inicial)
- Executar operações: depositar, sacar, transferir (informando a conta destino)
- Exibir saldo com `print(f"...")`
- Tratar operações inválidas com condicional e `print()` de erro

## Exercício 7.7 — Animal → Cachorro / Gato

**Classe base `Animal`:** `nome`, `idade`, método `comer()`.

**Subclasses:**
- `Cachorro(Animal)`: + `raca`, método `latir()`
- `Gato(Animal)`: + `cor`, método `miar()`

**No notebook:**
- Criar objetos `Cachorro` e `Gato` com valores definidos em variáveis
- Listar os animais com `print()`
- Chamar os métodos "comer", "latir"/"miar" e exibir as mensagens com `print()`

## Exercício 7.8 — Veiculo Polimórfico

**Classe `Veiculo`** com método `mover()`. Subclasses que **sobrescrevem**:

| Classe | `mover()` retorna |
|---|---|
| `Carro(Veiculo)` | "O carro está rodando a 80 km/h na estrada." |
| `Moto(Veiculo)` | "A moto está acelerando a 60 km/h na pista." |
| `Aviao(Veiculo)` | "O avião está voando a 900 km/h a 10.000 m de altitude." |

**No notebook:**
- Criar veículos das três subclasses com valores definidos em variáveis
- Chamar `mover()` para cada um e exibir a mensagem com `print()`
- Listar os veículos criados com `print()`

## Exercício 7.9 — Estoque de Peças

**Classe abstrata `Peca`:** `_codigo`, `_descricao`, `_qtd`, `add()`, `remove()`.

**Subclasses:**
- `Parafuso(Peca)`: `_diam`, `_comp`
- `Rolamento(Peca)`: `_tipo`, `_dext`

**`Estoque`:** classe gerenciadora com `add_peca()`, `consultar()`, `listar()`.

**No notebook:**
- Criar peças (`Parafuso`, `Rolamento`) com valores definidos em variáveis
- Adicionar/remover peças chamando os métodos do `Estoque`
- Listar o estoque atual com `print()` ou Pandas

## Exercício 7.10 — Controle de Manutenção

**Classe abstrata `Maquina`:** `_id`, `_nome`, `_ultima_manutencao`, `_intervalo_dias`, `calcular_proxima_manutencao()`.

**Subclasses:** `Torno(Maquina)` (30 dias), `Fresa(Maquina)` (45 dias).

**`ControleManutencao`:** classe gerenciadora.

**No notebook:**
- Cadastrar máquinas (`Torno`, `Fresa`) com valores definidos em variáveis
- Exibir as máquinas e as datas da próxima manutenção com `print(f"...")`
- Destacar máquinas com manutenção atrasada com um aviso no `print()`

## Resumo da aula

- Dataclasses (`@dataclass`): forma simplificada de criar classes para armazenar dados — sem `__init__` manual
- Classe: molde que define atributos (dados) e métodos (comportamento)
- Objeto: instância concreta de uma classe
- `__init__`: construtor chamado automaticamente ao criar um objeto
- `@property`: encapsula atributos com getter/setter
- Herança: `class BombaCentrifuga(Pump)` herda atributos e métodos da classe pai
- Polimorfismo: mesmo método (`calcular_vazao`) com comportamentos diferentes em cada classe filha
- ABC (Abstract Base Class): define interface obrigatória para classes filhas

## Referências

- **Python.org — Classes** — https://docs.python.org/pt-br/3/tutorial/classes.html
- **Python ABC** — https://docs.python.org/3/library/abc.html
- **Tavares Neto, R. F.; Silva, F. M.** Introdução à programação para engenharia. LTC, 2022.
