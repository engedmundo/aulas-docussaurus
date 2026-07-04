# POO Essencial para Engenharia

## Roteiro

1. O que é POO? Objetos vs. estruturada
2. Classes, `__init__`, instâncias
3. Métodos: comportamentos do objeto
4. Múltiplas classes e relacionamentos
5. Abstração
6. Encapsulamento (`@property`, `_atributo`)
7. Herança (`super()`)
8. Polimorfismo (sobrescrita)
9. Classes abstratas (ABC)
10. POO + Streamlit: persistindo objetos com `st.session_state`
11. Exercícios práticos

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

## Classe: o molde do objeto

Uma **classe** é um modelo (molde) para criar objetos.

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

## POO + Streamlit: Persistindo Objetos com `st.session_state`

Streamlit reexecuta o script a cada interação. **Objetos criados fora do `session_state` são perdidos.** Para manter instâncias de classes entre reruns, armazene-as no `session_state`.

### O problema

```python
class Contador:
    def __init__(self):
        self.valor = 0

    def incrementar(self):
        self.valor += 1

contador = Contador()  # Criado de novo a cada rerun!

if st.button("Incrementar"):
    contador.incrementar()

st.write(f"Valor: {contador.valor}")  # Sempre 0 ou 1
```

### A solução: objetos no `session_state`

```python
class Contador:
    def __init__(self):
        self.valor = 0

    def incrementar(self):
        self.valor += 1

if "contador" not in st.session_state:
    st.session_state.contador = Contador()

if st.button("Incrementar"):
    st.session_state.contador.incrementar()

st.write(f"Valor: {st.session_state.contador.valor}")
```

### Padrão com listas de objetos

```python
class Aluno:
    def __init__(self, nome, notas):
        self.nome = nome
        self.notas = notas

    def calcular_media(self):
        return sum(self.notas) / len(self.notas)

if "alunos" not in st.session_state:
    st.session_state.alunos = [
        Aluno("João", [8, 7, 6, 5, 4, 3]),
        Aluno("Maria", [10, 9, 8, 7, 6, 5]),
    ]

nomes = [a.nome for a in st.session_state.alunos]
escolha = st.selectbox("Aluno:", nomes)

if st.button("Calcular média"):
    aluno = next(a for a in st.session_state.alunos if a.nome == escolha)
    st.metric("Média", f"{aluno.calcular_media():.1f}")
```

> **Regra:** sempre que criar objetos que precisam sobreviver entre interações, guarde-os em `st.session_state`.

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

**App Streamlit:**

- `st.selectbox` para escolher o aluno
- `st.button` "Calcular"
- `st.metric` para média e situação
- Exibir notas individuais com `st.write`

| Aluno | Notas |
|---|---|
| João | [8, 7, 6, 5, 4, 3] |
| Maria | [10, 9, 8, 7, 6, 5] |
| José | [5, 4, 3, 2, 1, 0] |

## Exercício 7.2 — Classe Calculadora

**Classe `Calculadora`** com atributos `op1` e `op2` (float). Métodos: `somar()`, `subtrair()`, `multiplicar()`, `dividir()`, `calcular_potencia()`. Cada método deve validar divisão por zero.

**App Streamlit:**

- `st.number_input` para operando 1 e operando 2
- `st.selectbox` para operação (+, −, ×, ÷, ^)
- `st.button` "Calcular"
- `st.metric` para o resultado
- `st.error` para divisão por zero

## Exercício 7.3 — Classe Carro

**Classe `Carro`** com `consumo` (km/L), `combustivel` (inicia 0), `tanque_max` (50 L). Métodos: `abastecer(litros)`, `andar(distancia)`, `exibir_combustivel()`. O método `andar` deve calcular consumo e reduzir combustível; se não houver combustível suficiente, exibir mensagem.

**App Streamlit:**

- `st.number_input` para abastecer (L) e andar (km)
- `st.metric` para nível atual do tanque
- `st.progress` mostrando fração do tanque (0 a 1)
- `st.success` / `st.warning` para feedback

## Exercício 7.4 — Sistema Bancário

**Classes:** `Cliente` (nome, cpf) e `Conta` (titular, saldo). Métodos: `depositar()`, `sacar()`, `transferir()`, `exibir_saldo()`.

**App Streamlit:**

- Sidebar com seções: Criar Cliente / Criar Conta / Operações / Listar
- Formulário para criar cliente (nome, CPF)
- Formulário para criar conta (vincular a cliente, saldo inicial)
- Operações: `st.selectbox` para conta, `st.number_input` para valor, botões para depositar/sacar/transferir
- Listar contas com `st.dataframe`
- Persistir clientes e contas em `st.session_state`

## Exercício 7.5 — Classe Cliente (Abstração)

Partindo de uma classe genérica `Pessoa`, abstraia apenas o necessário para tratar **clientes**: CPF, nome, endereço.

**App Streamlit:**

- Formulário com `st.text_input` (nome, CPF, endereço)
- `st.button` "Cadastrar"
- Lista de clientes cadastrados com `st.write`
- Persistir lista em `st.session_state`

## Exercício 7.6 — ContaBancaria Encapsulada

**Classe `ContaBancaria`** com atributos privados `_titular` e `_saldo`. Getters via `@property`. Métodos: `depositar(valor)`, `sacar(valor)`, `transferir(destino, valor)` com validações (saldo insuficiente, valor negativo).

**App Streamlit:**

- Formulário para criar conta (titular, saldo inicial)
- Operações: depositar, sacar, transferir (selecionar conta destino)
- Exibir saldo com `st.metric`
- `st.error` para operações inválidas
- Persistir contas em `st.session_state`

## Exercício 7.7 — Animal → Cachorro / Gato

**Classe base `Animal`:** `nome`, `idade`, método `comer()`.

**Subclasses:**
- `Cachorro(Animal)`: + `raca`, método `latir()`
- `Gato(Animal)`: + `cor`, método `miar()`

**App Streamlit:**

- `st.selectbox` para tipo (Cachorro/Gato)
- Formulário para nome, idade, raça/cor
- `st.button` "Cadastrar"
- Lista de animais com `st.write`
- Botões "Comer", "Latir"/"Miar" que exibem mensagens

## Exercício 7.8 — Veiculo Polimórfico

**Classe `Veiculo`** com método `mover()`. Subclasses que **sobrescrevem**:

| Classe | `mover()` retorna |
|---|---|
| `Carro(Veiculo)` | "O carro está rodando a 80 km/h na estrada." |
| `Moto(Veiculo)` | "A moto está acelerando a 60 km/h na pista." |
| `Aviao(Veiculo)` | "O avião está voando a 900 km/h a 10.000 m de altitude." |

**App Streamlit:**

- `st.selectbox` para escolher o tipo de veículo
- `st.button` "Mover"
- Exibir mensagem com `st.info` ou `st.success`
- Lista de veículos cadastrados com `st.dataframe`

## Exercício 7.9 — Estoque de Peças

**Classe abstrata `Peca`:** `_codigo`, `_descricao`, `_qtd`, `add()`, `remove()`.

**Subclasses:**
- `Parafuso(Peca)`: `_diam`, `_comp`
- `Rolamento(Peca)`: `_tipo`, `_dext`

**`Estoque`:** classe gerenciadora com `add_peca()`, `consultar()`, `listar()`.

**App Streamlit:**

- `st.selectbox` para tipo de peça (Parafuso/Rolamento)
- Formulário com campos específicos do tipo
- `st.button` "Adicionar ao estoque"
- Tabela com `st.dataframe` mostrando estoque atual
- `st.number_input` para retirar peças

## Exercício 7.10 — Controle de Manutenção

**Classe abstrata `Maquina`:** `_id`, `_nome`, `_ultima_manutencao`, `_intervalo_dias`, `calcular_proxima_manutencao()`.

**Subclasses:** `Torno(Maquina)` (30 dias), `Fresa(Maquina)` (45 dias).

**`ControleManutencao`:** classe gerenciadora.

**App Streamlit:**

- `st.selectbox` para tipo de máquina
- `st.text_input` para nome e ID
- `st.date_input` para última manutenção
- `st.button` "Cadastrar"
- Listagem com máquinas e datas da próxima manutenção
- Destacar máquinas com manutenção atrasada (`st.warning`)

## Referências

- **Python.org — Classes** — https://docs.python.org/pt-br/3/tutorial/classes.html
- **Python ABC** — https://docs.python.org/3/library/abc.html
- **Tavares Neto, R. F.; Silva, F. M.** Introdução à programação para engenharia. LTC, 2022.
