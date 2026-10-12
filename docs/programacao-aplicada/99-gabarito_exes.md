# Gabarito de Exercícios — Programação Aplicada

Este arquivo contém as soluções completas de todos os exercícios da disciplina. Cada exercício tem o código funcional pronto para executar como célula no notebook Google Colab.

---

## Aula 01 — Setup + Algoritmos

### Exercício 1.1 — Ordenar os passos (Bhaskara)

Ordem correta:

```
1. Leia os coeficientes a, b e c
2. Calcule o discriminante: Δ = b² − 4ac
3. Calcule as raízes: x = (−b ± √Δ) / (2a)
4. Exiba as duas raízes encontradas
```

A propriedade desrespeitada foi a **ordenação** (as raízes eram exibidas antes de serem lidas as entradas e calculado o discriminante).

---

### Exercício 1.2 — Corrigir o algoritmo com defeito (restaurante)

Algoritmo corrigido (resposta sugerida — podem existir outras válidas):

```
1. Sente à mesa
2. Consulte o cardápio
3. Escolha um prato
4. Chame o garçom e faça o pedido
5. Aguarde e receba o prato
6. Coma
7. Peça a conta
8. Pague (dinheiro ou cartão) e receba o comprovante
9. Saia do restaurante
```

O que foi corrigido: **precisão** ("peça um prato" virou "consulte o cardápio → escolha → chame o garçom"), **ordenação** e **finitude** (o processo agora só termina após o pagamento e o comprovante — antes a pessoa "ia embora" sem pagar).

---

### Exercício 1.3 — Decomposição (caixa eletrônico)

| Bloco | Conteúdo |
|---|---|
| **Entrada** | Cartão, senha e valor do saque (R$) |
| **Processamento** | Validar senha; consultar saldo; comparar `saldo` com `valor`; se suficiente, debitar `saldo = saldo − valor` |
| **Saída** | Cédulas liberadas + recibo (ou a mensagem "saldo insuficiente") |

---

### Exercício 1.4 — Pseudocódigo e fluxograma do saque

**Pseudocódigo:**

```
INÍCIO
   LEIA cartão
   LEIA senha
   LEIA valor (R$)
   SE senha incorreta ENTÃO
       ESCREVA "Senha inválida"
   SENÃO
       SE saldo < valor ENTÃO
           ESCREVA "Saldo insuficiente"
       SENÃO
           CALCULE saldo = saldo - valor
           ESCREVA "Libere as cédulas"
           ESCREVA "Imprima o recibo"
       FIM SE
   FIM SE
FIM
```

**Fluxograma (resumo):**

```
      ┌─────────┐
      │  INÍCIO │
      └────┬────┘
           │
 ┌─────────▼──────────┐
 │ LEIA cartão, senha,│
 │ valor              │
 └─────────┬──────────┘
           │
      ┌────▼─────┐
      │ senha OK?│
      └────┬─────┘
        não│          sim
           │      ┌────▼──────────┐
  ┌────────▼────┐ │ saldo < valor?│
  │ "Senha      │ └────┬──────────┘
  │ inválida"   │   não│         sim
  └────────┬────┘      │   ┌──────────▼──────┐
           │     ┌─────▼──────────┐ "Saldo        │
           │     │ debita saldo;  │  insuficiente" │
           │     │ libera cédulas;│ └──────────┬─────┘
           │     │ imprime recibo │            │
           │     └─────┬──────────┘            │
           └───────────┴───────────────────────┘
                        │
                   ┌────▼────┐
                   │   FIM   │
                   └─────────┘
```

---

### Exercício 1.5 — Pressão de Pistão Hidráulico

**Pseudocódigo:**

```
INÍCIO
   LEIA força F (N)
   LEIA diâmetro d (mm)
   CALCULE d_m = d / 1000
   CALCULE A = 3,1416 · d_m² / 4
   CALCULE P = F / A
   ESCREVA "Área:", A, "m²"
   ESCREVA "Pressão:", P/1e6, "MPa"
FIM
```

**Código Python:**

```python
import math

print("Pressão de Pistão Hidráulico")
print("Calcula a pressão exercida por um pistão dado a força e o diâmetro do êmbolo.")
print("------------------------------------------------------------")

F = float(input("Força F (N): "))
d = float(input("Diâmetro d (mm): "))

# Cálculo
d_m = d / 1000                          # mm → m
A = math.pi * d_m ** 2 / 4              # m²
P = F / A                               # Pa

print("---------------------------")
print("Resultado")
print(f"Área da seção: {A * 1e6:.2f} mm²")
print(f"Pressão: {P / 1e6:.2f} MPa")
```

---

### Exercício 1.6 — Execute o código de tensão

Com `F = 8000 N` e `A = 0.004 m²`:

```python
F = 8000
A = 0.004
sigma = F / A
print(f"Tensão normal: {sigma} Pa")
print(f"Tensão normal: {sigma / 1e6:.2f} MPa")
```

Saída: `Tensão normal: 2.00 MPa`.

---

## Aula 02 — Conceitos Básicos + Apps Interativos

### Exercício 2.1 — Hello World

```python
print("Hello, World!")
print("Bem-vindo à Programação Aplicada!")
print("Seu Nome")
```

---

### Exercício 2.2 — Criando e exibindo variáveis

```python
num_pecas = 150
pressao = 2.5
material = "Aço 1020"
sensor_ok = True

print(num_pecas)
print(pressao)
print(material)
print(sensor_ok)

forca = 8000
print("A força aplicada é", forca, "N")
```

---

### Exercício 2.3 — Descobrindo o tipo

```python
print(type(150))        # <class 'int'>
print(type(2.5))        # <class 'float'>
print(type("Aço 1020")) # <class 'str'>
print(type(True))       # <class 'bool'>
print(type(1e-3))       # <class 'float'>
print(type("150"))      # <class 'str'>
```

O `150` é um número (`int`), enquanto `"150"` é um texto (`str`). O tipo importa porque operações matemáticas só fazem sentido com números — `150 + 1` calcula, mas `"150" + 1` gera erro.

---

### Exercício 2.4 — Área de um círculo

```python
import math

d = 50            # mm
d_m = d / 1000    # mm → m

A = math.pi * d_m ** 2 / 4   # m²

print(f"Área da seção: {A:.6f} m²")
print(f"Área da seção: {A * 1e6:.2f} mm²")
```

---

### Exercício 2.5 — Formatando resultados

```python
sigma = 2_500_000.0   # Pa

print(f"{sigma:.0f} Pa")         # 2500000 Pa
print(f"{sigma / 1e6:.2f} MPa")  # 2.50 MPa
print(f"{sigma / 1e3:.1f} kPa")  # 2500.0 kPa
print(f"{sigma:.3e} Pa")         # 2.500e+06 Pa
```

---

### Exercício 2.6 — Média de Dureza Rockwell

```python
print("Controle de Qualidade — Dureza Rockwell")
print("Especificação mínima: 40 HRC")
print("------------------------------------------------------------")

d1 = float(input("Medição 1 (HRC): "))
d2 = float(input("Medição 2 (HRC): "))
d3 = float(input("Medição 3 (HRC): "))

media = (d1 + d2 + d3) / 3
print("---------------------------")
print(f"Média de dureza: {media:.2f} HRC")
```

### Exercício 2.7 — Relação de Transmissão

```python
print("Redutor de Velocidade")
print("------------------------------------------------------------")

n_motor = float(input("Rotação do motor (RPM): "))
z_motriz = float(input("Dentes da engrenagem motriz: "))
z_movida = float(input("Dentes da engrenagem movida: "))

i = z_movida / z_motriz
n_saida = n_motor / i

print("---------------------------")
print(f"Relação de transmissão: {i:.2f}")
print(f"Rotação de saída (RPM): {n_saida:.1f}")
```

---

### Desafio opcional — IMC do Operador

```python
print("IMC do Operador — NR-17")
print("------------------------------------------------------------")

peso = float(input("Peso (kg): "))
altura = float(input("Altura (m): "))

imc = peso / altura ** 2
print("---------------------------")
print(f"IMC calculado: {imc:.2f}")
```

---

### Desafio opcional — Cilindro com Desperdício de Material

```python
import math

print("Cilindros Usinados — Custo e Aproveitamento")
print("------------------------------------------------------------")

raio   = float(input("Raio do cilindro (m): "))
altura = float(input("Altura do cilindro (m): "))
densidade = float(input("Densidade (kg/m³): "))
preco_kg  = float(input("Preço do material (R$/kg): "))
quantidade = float(input("Quantidade de peças: "))

# Cálculo
V_cil = math.pi * raio ** 2 * altura
V_bloco = (2 * raio) ** 2 * altura

m_final = V_cil * densidade
m_cavaco = (V_bloco - V_cil) * densidade

custo_total = m_final * preco_kg * quantidade
valor_perdido = m_cavaco * preco_kg * quantidade
aproveitamento = (m_final / (m_final + m_cavaco)) * 100

print("---------------------------")
print("Resultados")
print(f"Volume do cilindro: {V_cil:.6f} m³")
print(f"Volume do bloco: {V_bloco:.6f} m³")
print(f"Massa final: {m_final:.2f} kg")
print(f"Massa de cavaco: {m_cavaco:.2f} kg")
print(f"Custo total: R$ {custo_total:,.2f}")
print(f"Valor perdido: R$ {valor_perdido:,.2f}")
print(f"Aproveitamento: {aproveitamento:.1f}%")
```

### Desafio opcional — Dilatação Térmica

```python
print("Dilatação Térmica Linear")
print("Coeficiente de dilatação do aço: α = 11.7 × 10⁻⁶ m/(m·°C)")
print("------------------------------------------------------------")

L0 = float(input("Comprimento inicial (m): "))
T0 = float(input("Temperatura inicial (°C): "))
Tf = float(input("Temperatura final (°C): "))

alpha = 11.7e-6   # m/(m·°C) — aço carbono

delta_T = Tf - T0
delta_L = L0 * alpha * delta_T
Lf = L0 + delta_L
var_pct = (delta_L / L0) * 100

print("---------------------------")
print("Resultados")
print(f"ΔT: {delta_T:.1f} °C")
print(f"ΔL: {delta_L * 1000:.3f} mm")
print(f"Lf: {Lf:.6f} m")
print(f"Variação: {var_pct:.3f}%")
```

### Desafio opcional — Custo Operacional de Fresadora

```python
print("Custo Operacional — Fresadora CNC")
print("------------------------------------------------------------")

potencia  = float(input("Potência da máquina (kW): "))
horas_dia = float(input("Horas de operação por dia: "))
dias   = float(input("Dias de operação no mês: "))
tarifa = float(input("Tarifa de energia (R$/kWh): "))

E = potencia * horas_dia * dias
custo_bruto = E * tarifa
impostos = custo_bruto * 0.27
custo_total = custo_bruto + impostos
custo_hora = custo_total / (horas_dia * dias)

print("---------------------------")
print("Resultados")
print(f"Consumo mensal: {E:,.0f} kWh")
print(f"Custo bruto: R$ {custo_bruto:,.2f}")
print(f"Impostos (27%): R$ {impostos:,.2f}")
print(f"Custo total: R$ {custo_total:,.2f}")
print(f"Custo por hora: R$ {custo_hora:.2f}/h")
```

### Exercício 2.8 — Pressão de Pistão Hidráulico

```python
import math

print("Pressão de Pistão Hidráulico")
print("------------------------------------------------------------")

F = float(input("Força F (N): "))
d = float(input("Diâmetro d (mm): "))

d_m = d / 1000
A = math.pi * d_m ** 2 / 4
P = F / A

print("---------------------------")
print(f"Área da seção: {A * 1e6:.2f} mm²")
print(f"Pressão: {P / 1e6:.2f} MPa")
```

---

### Mini-Projeto — Calculadora de Usinagem

```python
import math

print("Calculadora de Torneamento")
print("Parâmetros de corte e custo para torneamento cilíndrico externo.")
print("------------------------------------------------------------")

d = float(input("Diâmetro da peça (mm): "))
n = float(input("Rotação (RPM): "))
L = float(input("Comprimento usinado (mm): "))
f = float(input("Avanço (mm/rot): "))

densidades = {
    "Aço 1020 (7850)": 7850,
    "Alumínio 6061 (2700)": 2700,
    "Latão (8500)": 8500,
}
print("Materiais:", list(densidades.keys()))
material = input("Material: ")
custo_hora = float(input("Custo horário da máquina (R$/h): "))
preco_kg   = float(input("Preço do material (R$/kg): "))

rho = densidades[material]

# Velocidade de corte (m/min)
Vc = math.pi * d * n / 1000

# Tempo de corte (min)
t = L / (f * n)

# Massa da peça (kg) — d e L em mm, resultado em kg
m = (math.pi * d ** 2 / 4) * L * rho * 1e-6

# Custo total
custo = (t * custo_hora / 60) + (m * preco_kg)

print("---------------------------")
print("Resultados")
print(f"Velocidade de corte: {Vc:.2f} m/min")
print(f"Tempo de corte: {t:.2f} min")
print(f"Massa da peça: {m:.3f} kg")
print(f"Custo total: R$ {custo:.2f}")
```

---

## Aula 03 — Condicionais + Classificadores

### Exercício 3.1 — Do pseudocódigo ao Python (Aprovado ou Reprovado)

```python
nota1 = 8.0
nota2 = 7.0
nota3 = 6.0

media = (nota1 + nota2 + nota3) / 3

if media >= 7:
    print(f"Média: {media:.1f} — Aprovado")
else:
    print(f"Média: {media:.1f} — Reprovado")
```

---

### Exercício 3.2 — Tipo de triângulo

```python
a = 5
b = 5
c = 8

if a == b == c:
    print("Equilátero")
elif a == b or b == c or a == c:
    print("Isósceles")
else:
    print("Escaleno")
```

---

### Exercício 3.3 — Entrada na montanha-russa (duas condições)

```python
altura = 1.55
idade = 12

if altura >= 1.40 and idade >= 10:
    print("Pode entrar. Bom divertimento!")
elif altura < 1.40:
    print("Altura insuficiente para o brinquedo.")
else:
    print("Idade insuficiente para o brinquedo.")
```

---

### Exercício 3.4 — Prensa Hidráulica

```python
print("Prensa Hidráulica — Monitoramento de Segurança")
print("Sistema de verificação de condições para operação da prensa de 200 t.")

pressao = float(input("Pressão do óleo (bar): "))
grade_fechada = input("Grade fechada? (s/n): ").lower() == "s"

if not grade_fechada:
    print("ERRO: Grade aberta! Operação bloqueada.")
elif pressao < 50:
    print("AVISO: Pressão insuficiente. Aqueça o óleo.")
elif pressao <= 150:
    print("OK: Operação autorizada.")
else:
    print("ERRO: Sobrepressão! Acionando válvula de alívio.")
```

### Exercício 3.5 — Dureza do Aço

```python
print("Classificação de Dureza Brinell")
print("Especificação: dureza entre 200 e 240 HB para peças de aço.")

dureza = float(input("Dureza Brinell (HB): "))

print(f"Dureza medida: {dureza:.0f} HB")

if dureza < 200:
    print("Peça Rejeitada: Material muito dúctil")
elif dureza <= 240:
    print("Peça Aprovada: Dentro das especificações")
else:
    print("Peça Rejeitada: Material muito frágil")
```

### Desafio opcional — Sensor de Emergência CNC

```python
print("Autenticação — Fresadora CNC 5 Eixos")
print("Verificação de credenciais e condições de segurança.")

login = input("Login: ")
senha = input("Senha: ")
emergencia = input("Emergência acionada? (s/n): ").lower() == "s"

if login == "admin" and senha == "123456" and not emergencia:
    print("Sistema Iniciado. Fresadora pronta para operação.")
else:
    print("ACESSO NEGADO: Verifique credenciais e sensor de emergência.")
```

### Desafio opcional — Seleção de Material por Torque

```python
print("Seleção de Material — Eixo de Transmissão")

torque = float(input("Torque requerido (Nm): "))
print("Forma de pagamento: 1-PIX à vista (-10%), 2-Cartão 30 dias (+5%)")
pagamento = input("Forma de pagamento: ")

if torque < 100:
    material = "Polímero (POM)"
    custo_base = 50.0
elif torque <= 500:
    material = "Alumínio 6061"
    custo_base = 150.0
else:
    material = "Aço Liga 4340"
    custo_base = 300.0

if pagamento == "1":
    custo_final = custo_base * 0.90
    forma = "PIX à vista (-10%)"
else:
    custo_final = custo_base * 1.05
    forma = "Cartão 30 dias (+5%)"

print("---------------------------")
print("Resultado")
print(f"Material selecionado: {material}")
print(f"Custo base: R$ {custo_base:.2f}")
print(f"Forma de pagamento: {forma}")
print(f"Custo final: R$ {custo_final:.2f}")
```

### Desafio opcional — Homogeneidade de Eixos

```python
print("Controle de Qualidade — Homogeneidade de Eixos")
print("Verifica a dispersão de diâmetros em lotes de 3 peças.")

d1 = float(input("Diâmetro 1 (mm): "))
d2 = float(input("Diâmetro 2 (mm): "))
d3 = float(input("Diâmetro 3 (mm): "))
tolerancia = float(input("Tolerância máxima (mm): "))

dispersao = max(d1, d2, d3) - min(d1, d2, d3)
media = (d1 + d2 + d3) / 3

print("---------------------------")
print("Resultados")
print(f"Média do lote: {media:.3f} mm")
print(f"Dispersão: {dispersao:.3f} mm")

if dispersao >= tolerancia:
    print(f"Lote Reprovado: dispersão ({dispersao:.3f} mm) ≥ tolerância ({tolerancia:.3f} mm)")
else:
    print(f"Lote Aprovado: dispersão ({dispersao:.3f} mm) < tolerância ({tolerancia:.3f} mm)")
```

### Exercício 3.6 — Classificador de Materiais

```python
print("Classificador de Materiais")
print("Seleciona o material mais adequado para um componente mecânico.")

tensao = float(input("Tensão atuante (MPa): "))
temperatura = float(input("Temperatura de operação (°C): "))
print("Ambiente: Seco, Úmido, Corrosivo")
ambiente = input("Ambiente de operação: ")

materiais = []

# Polímero
if tensao < 100 and temperatura < 80 and ambiente == "Seco":
    materiais.append("Polímero (POM)")

# Alumínio
if 100 <= tensao <= 300 and temperatura < 200:
    materiais.append("Alumínio 6061")

# Aço Carbono
if 300 <= tensao <= 600 and temperatura < 300 and ambiente in ("Seco", "Úmido"):
    materiais.append("Aço Carbono 1020")

# Aço Inox
if 300 <= tensao <= 600 and temperatura < 400 and ambiente == "Corrosivo":
    materiais.append("Aço Inox 304")

# Titânio
if tensao > 600 and temperatura < 500:
    materiais.append("Liga de Titânio Ti-6Al-4V")

print("---------------------------")
print("Resultado")

if materiais:
    print(f"Material recomendado: {materiais[0]}")
    if len(materiais) > 1:
        print(f"Opção backup: {materiais[1]}")
else:
    print("AVISO: Nenhum material atende todas as condições especificadas. Revise os parâmetros.")
```

---

### Exercício 3.7 — Análise de Crédito

```python
print("Análise de Crédito — Empréstimo Pessoal")
print("Avalia score, limite de valor e comprometimento de renda.")
print("------------------------------------------------------------")

renda = float(input("Renda mensal (R$): "))
valor = float(input("Valor solicitado (R$): "))
n = int(input("Número de parcelas: "))
score = int(input("Score de crédito (0-1000): "))

if score < 600:
    print("CRÉDITO NEGADO: score insuficiente (mínimo 600).")
elif valor > 12 * renda:
    print("CRÉDITO NEGADO: valor acima de 12x a renda mensal.")
else:
    if score >= 750:
        taxa = 0.015
    else:
        taxa = 0.025

    total = valor * (1 + taxa * n)
    parcela = total / n

    print("---------------------------")
    print(f"Taxa aplicada: {taxa * 100:.1f}% a.m.")
    print(f"Valor total: R$ {total:,.2f}")
    print(f"Parcela ({n}x): R$ {parcela:,.2f}")

    if parcela > 0.30 * renda:
        print("CRÉDITO NEGADO: parcela acima de 30% da renda.")
    else:
        print("CRÉDITO APROVADO.")
```

---

## Aula 04 — Funções em Python

### Exercício 4.1 — Sua primeira função (média)

```python
def media(n1, n2, n3):
    """Calcula a média aritmética de três notas."""
    return (n1 + n2 + n3) / 3

m = media(8.0, 7.0, 6.0)
print(f"Média: {m:.1f}")
```

---

### Exercício 4.2 — Preço com desconto (valor padrão)

```python
def preco_final(preco, desconto=0.0):
    """Calcula o preço com desconto (0.0 a 1.0)."""
    return preco * (1 - desconto)

print(f"À vista: R$ {preco_final(100, 0.10):.2f}")
print(f"Cartão: R$ {preco_final(100):.2f}")
```

---

### Exercício 4.3 — Bhaskara com dois retornos

```python
import math

def raizes(a, b, c):
    """Retorna as duas raízes de ax²+bx+c=0 (assume Δ ≥ 0)."""
    delta = b ** 2 - 4 * a * c
    x1 = (-b + math.sqrt(delta)) / (2 * a)
    x2 = (-b - math.sqrt(delta)) / (2 * a)
    return x1, x2

x1, x2 = raizes(1, -5, 6)
print(f"x1 = {x1:.1f}, x2 = {x2:.1f}")
```

---

### Exercício 4.4 — Triângulo como função

```python
def tipo_triangulo(a, b, c):
    """Classifica o triângulo pelos lados."""
    if a == b == c:
        return "Equilátero"
    elif a == b or b == c or a == c:
        return "Isósceles"
    else:
        return "Escaleno"

print(tipo_triangulo(5, 5, 5))
print(tipo_triangulo(5, 5, 8))
print(tipo_triangulo(3, 4, 5))
```

---

### Exercício 4.5 — Encontre os dois erros (escopo + `return`)

O código original quebra por dois motivos: a função não tem `return` (logo `valor` vale `None`, e formatar `None` com `:.2f` gera `TypeError`) e a variável `final` é local (usá-la fora da função geraria `NameError`).

```python
preco = 200.0

def aplicar_desconto(preco, taxa):
    """Retorna o preço com desconto."""
    final = preco * (1 - taxa)
    return final

valor = aplicar_desconto(preco, 0.1)
print(f"Preço com desconto: R$ {valor:.2f}")
```

---

### Exercício 4.6 — Conversor de Unidades

```python
def psi_para_mpa(psi):
    """Converte pressão de psi para MPa."""
    return psi * 0.00689476

def pol_para_mm(pol):
    """Converte comprimento de polegadas para mm."""
    return pol * 25.4

def f_para_c(f):
    """Converte temperatura de °F para °C."""
    return (f - 32) * 5 / 9

print("Conversor de Unidades — Ensaios Mecânicos")

psi = float(input("Valor em psi: "))
print(f"Resultado: {psi_para_mpa(psi):.2f} MPa")

pol = float(input("Valor em polegadas: "))
print(f"Resultado: {pol_para_mm(pol):.2f} mm")

f = float(input("Valor em °F: "))
print(f"Resultado: {f_para_c(f):.2f} °C")
```

### Exercício 4.7 — Classificador de Solda

```python
def calcular_desvio_percentual(medida, nominal):
    """Calcula o desvio percentual entre medida e valor nominal."""
    return (medida - nominal) / nominal * 100

def classificar_solda(desvio, tolerancia):
    """Classifica a solda com base no desvio e tolerância."""
    if desvio < -tolerancia:
        return "Solda insuficiente — Reprovada"
    elif desvio <= tolerancia:
        return "Solda dentro da tolerância — Aprovada"
    else:
        return "Solda excessiva — Reprovada"

print("Classificador de Solda de Filete")
print("Avalia a qualidade da solda com base na perna medida.")

nominal = float(input("Perna nominal (mm): "))
medida = float(input("Perna medida (mm): "))
tolerancia = float(input("Tolerância (%): "))

desvio = calcular_desvio_percentual(medida, nominal)
classificacao = classificar_solda(desvio, tolerancia)

print("---------------------------")
print("Resultado")
print(f"Desvio percentual: {desvio:.2f}%")
print(f"Classificação: {classificacao}")

if "Aprovada" in classificacao:
    print(classificacao)
else:
    print(classificacao)
```

---

### Exercício 4.8 — Calculadora Técnica com Funções

```python
import math

def tensao_normal(forca, area):
    """σ = F / A — retorna tensão em Pa."""
    return forca / area

def deformacao_especifica(var_l, l0):
    """ε = ΔL / L₀ — retorna deformação (adimensional)."""
    return var_l / l0

def lei_hooke(mod_elasticidade, deformacao):
    """σ = E · ε — retorna tensão pela Lei de Hooke."""
    return mod_elasticidade * deformacao

def potencia_mecanica(torque, rpm):
    """P = T · ω — retorna potência em W (ω em rad/s)."""
    omega = (2 * math.pi * rpm) / 60
    return torque * omega

print(f"Tensão normal: {tensao_normal(10000, 0.005) / 1e6:.1f} MPa")
print(f"Deformação: {deformacao_especifica(2, 1000):.4f}")
print(f"Lei de Hooke: {lei_hooke(200e9, 0.002) / 1e6:.0f} MPa")
print(f"Potência: {potencia_mecanica(300, 1750) / 1e3:.2f} kW")
```

---

### Exercício 4.9 — Plano de Manutenção da Frota

```python
def km_restantes(km_atual, km_ultima_troca, intervalo):
    """Retorna quantos km faltam para a próxima troca."""
    return intervalo - (km_atual - km_ultima_troca)

def status_item(km_rest):
    """Classifica o item: VENCIDO, VENCE EM BREVE ou EM DIA."""
    if km_rest <= 0:
        return "VENCIDO"
    elif km_rest < 2000:
        return "VENCE EM BREVE"
    else:
        return "EM DIA"

print("Plano de Manutenção — Frota")
print("------------------------------------------------------------")

km = float(input("Quilometragem atual: "))
oleo = float(input("Km da última troca de óleo: "))
freios = float(input("Km da última revisão de freios: "))
correia = float(input("Km da última troca da correia: "))

r_oleo = km_restantes(km, oleo, 10000)
r_freios = km_restantes(km, freios, 30000)
r_correia = km_restantes(km, correia, 60000)

s_oleo = status_item(r_oleo)
s_freios = status_item(r_freios)
s_correia = status_item(r_correia)

print("---------------------------")
print(f"Óleo: faltam {r_oleo:.0f} km — {s_oleo}")
print(f"Freios: faltam {r_freios:.0f} km — {s_freios}")
print(f"Correia: faltam {r_correia:.0f} km — {s_correia}")

if "VENCIDO" in (s_oleo, s_freios, s_correia):
    print("MANUTENÇÃO URGENTE: há item vencido.")
elif "VENCE EM BREVE" in (s_oleo, s_freios, s_correia):
    print("Agendar revisão em breve.")
else:
    print("Frota em dia. Boa viagem!")
```

---

## Aula 05 — Estruturas de Dados

### Exercício 5.1 — Playlist

```python
playlist = ["Bohemian Rhapsody", "Imagine", "Billie Jean", "Hotel California", "Smells Like Teen Spirit"]

print(f"Três primeiras: {playlist[:3]}")
print(f"Duas últimas: {playlist[-2:]}")
print(f"Do meio: {playlist[1:4]}")
print(f"Invertida: {playlist[::-1]}")
```

---

### Exercício 5.2 — Fila de atendimento

```python
fila = ["Ana", "Bruno"]

fila.append("Carla")       # chegada → fim da fila
fila.insert(0, "Seu José") # prioritário → posição 0
atendido = fila.pop(0)     # chama o próximo

print(f"Em atendimento: {atendido}")
print(f"Fila atual: {fila}")
print(f"Aguardando: {len(fila)} pessoas")
```

---

### Exercício 5.3 — Tabela de preços montada de uma vez

```python
codigos = list(range(101, 105))
produtos = "Pão,Leite,Café,Açúcar".split(",")
precos = [5.50, 6.00, 12.00, 4.50]

tabela = dict(zip(produtos, precos))

print(f"Códigos: {codigos}")
print(f"Produtos: {produtos}")
print(f"Preço do Café: R$ {tabela['Café']:.2f}")
print(f"Tabela: {list(tabela.items())}")
```

---

### Exercício 5.4 — Cor RGB

```python
cor = (255, 128, 0)   # laranja

r, g, b = cor
print(f"Vermelho: {r}, Verde: {g}, Azul: {b}")
print(f"Primeiro canal: {cor[0]}")

# cor[0] = 100   → TypeError: 'tuple' object does not support item assignment
```

A tentativa de alteração gera `TypeError` porque tuplas são imutáveis — e é exatamente isso que protege uma cor (ou coordenada) contra mudanças acidentais.

---

### Exercício 5.5 — Ficha cadastral

```python
pessoa = {
    "nome": "Mariana",
    "idade": 28,
    "cidade": "Passo Fundo",
    "telefones": ["54-99911-2233"],
}

print(f"Nome: {pessoa['nome']}")
print(f"E-mail: {pessoa.get('email', 'não informado')}")

pessoa["idade"] = 29
pessoa["email"] = "mari@mail.com"

print(f"Tem CNH? {'cnh' in pessoa}")
print(f"Telefones: {pessoa['telefones']}")
print(f"Chaves: {list(pessoa.keys())}")
```

---

### Exercício 5.6 — Boletim aninhado

```python
turma = {"Ana": [8.0, 7.0, 9.0], "Bruno": [6.0, 5.0, 7.0]}

print(f"Primeira nota da Ana: {turma['Ana'][0]}")

media_ana = sum(turma["Ana"]) / len(turma["Ana"])
media_bruno = sum(turma["Bruno"]) / len(turma["Bruno"])
print(f"Média da Ana: {media_ana:.1f}")
print(f"Média do Bruno: {media_bruno:.1f}")

turma["Carla"] = [10.0, 9.5, 9.0]
print(f"Alunos: {list(turma.keys())}")
```

---

### Exercício 5.7 — O que falta na despensa?

```python
receita = {"farinha", "ovos", "leite", "açúcar", "fermento"}
despensa = {"farinha", "ovos", "café", "sal"}

print(f"Falta comprar: {receita - despensa}")
print(f"Já tem: {receita & despensa}")
print(f"Todos os itens: {receita | despensa}")
```

---

### Exercício 5.8 — Análise de Temperaturas

```python
print("Análise de Temperaturas — Ensaio Térmico")

temperaturas = [300, 320, 315, 310, 290]
print(f"Leituras registradas: {temperaturas}")

print("---------------------------")
print("Resultados")
print(f"Primeira temperatura: {temperaturas[0]} °C")
print(f"Última temperatura: {temperaturas[-1]} °C")

delta_t = temperaturas[-1] - temperaturas[0]
print(f"Variação (ΔT): {delta_t} °C")
print(f"Média: {sum(temperaturas)/len(temperaturas):.1f} °C")
print(f"Máxima: {max(temperaturas)} °C")
print(f"Mínima: {min(temperaturas)} °C")

amplitude = max(temperaturas) - min(temperaturas)
print(f"Amplitude: {amplitude} °C")
```

### Exercício 5.9 — Cadastro de Materiais

```python
print("Catálogo de Materiais")

materiais = [
    {
        "nome": "Aço 1020",
        "densidade": 7850,
        "modulo_E": 210_000,
        "escoamento": 350,
    },
    {
        "nome": "Alumínio 6061",
        "densidade": 2700,
        "modulo_E": 69_000,
        "escoamento": 276,
    },
    {
        "nome": "Latão",
        "densidade": 8500,
        "modulo_E": 100_000,
        "escoamento": 250,
    },
]

print("Materiais cadastrados (sem laços — posição por posição)")

print(f"1. {materiais[0]['nome']}")
print(f"  Densidade: {materiais[0]['densidade']} kg/m³")
print(f"  Módulo de elasticidade: {materiais[0]['modulo_E']:,} MPa")
print(f"  Limite de escoamento: {materiais[0]['escoamento']} MPa")

print(f"2. {materiais[1]['nome']}")
print(f"  Densidade: {materiais[1]['densidade']} kg/m³")
print(f"  Módulo de elasticidade: {materiais[1]['modulo_E']:,} MPa")
print(f"  Limite de escoamento: {materiais[1]['escoamento']} MPa")

print(f"3. {materiais[2]['nome']}")
print(f"  Densidade: {materiais[2]['densidade']} kg/m³")
print(f"  Módulo de elasticidade: {materiais[2]['modulo_E']:,} MPa")
print(f"  Limite de escoamento: {materiais[2]['escoamento']} MPa")
```

### Exercício 5.10 — Certificações de Operadores

```python
print("Certificações de Operadores")

torno = {101, 102, 103, 104, 105, 108, 110}
fresa = {104, 105, 106, 107, 109, 110}

operadores = {
    101: "João", 102: "Maria", 103: "Pedro",
    104: "Ana", 105: "Carlos", 106: "Lucas",
    107: "Sofia", 108: "Rui", 109: "Eva", 110: "Ivo"
}

polivalentes = torno & fresa
exclusivos_torno = torno - fresa
exclusivos_fresa = fresa - torno
todos = torno | fresa

print("Análise de certificações")

print(f"Polivalentes (Torno e Fresa): {list(map(operadores.get, sorted(polivalentes)))}")
print(f"Exclusivos do Torno: {list(map(operadores.get, sorted(exclusivos_torno)))}")
print(f"Exclusivos da Fresa: {list(map(operadores.get, sorted(exclusivos_fresa)))}")
print(f"Total de operadores na seção: {len(todos)}")
```

---

### Exercício 5.11 — Carrinho de compras

```python
carrinho = {
    "Pão": {"preco": 5.50, "qtd": 4},
    "Café": {"preco": 12.00, "qtd": 2},
    "Leite": {"preco": 6.00, "qtd": 3},
}

subtotal = (
    carrinho["Pão"]["preco"] * carrinho["Pão"]["qtd"]
    + carrinho["Café"]["preco"] * carrinho["Café"]["qtd"]
    + carrinho["Leite"]["preco"] * carrinho["Leite"]["qtd"]
)

if subtotal >= 100:
    frete = 0.0
else:
    frete = 15.0

print(f"Subtotal: R$ {subtotal:.2f}")
print(f"Frete: R$ {frete:.2f}")
print(f"Total: R$ {subtotal + frete:.2f}")

carrinho["Açúcar"] = {"preco": 4.50, "qtd": 10}
subtotal = subtotal + carrinho["Açúcar"]["preco"] * carrinho["Açúcar"]["qtd"]

if subtotal >= 100:
    frete = 0.0
else:
    frete = 15.0

print("---------------------------")
print(f"Subtotal: R$ {subtotal:.2f}")
print(f"Frete: R$ {frete:.2f}")
print(f"Total: R$ {subtotal + frete:.2f}")
```

---

### Mini-Projeto — Catálogo de Materiais Interativo

```python
print("Catálogo de Materiais Interativo")

catalogo = {
    "Aço 1020": {"densidade": 7850, "E": 210_000, "sigma_y": 350, "alpha": 11.7e-6},
    "Alumínio 6061": {"densidade": 2700, "E": 69_000, "sigma_y": 276, "alpha": 23.1e-6},
    "Latão": {"densidade": 8500, "E": 100_000, "sigma_y": 250, "alpha": 19.0e-6},
    "Titânio Ti-6Al-4V": {"densidade": 4430, "E": 114_000, "sigma_y": 880, "alpha": 8.6e-6},
}

print("Materiais:", list(catalogo))

mat1 = input("Material principal: ")
print("Comparar com: [Nenhum] " + str(list(catalogo)))
comparacao = input("Comparar com: ")

m = catalogo[mat1]

if comparacao == "Nenhum":
    print(mat1)
    print(f"Densidade: {m['densidade']} kg/m³")
    print(f"Módulo E: {m['E']:,} MPa")
    print(f"Limite de escoamento: {m['sigma_y']} MPa")
    print(f"Coef. dilatação: {m['alpha']*1e6:.1f} ×10⁻⁶/°C")
else:
    m2 = catalogo[comparacao]

    print("Comparação de materiais")
    print(mat1)
    print(f"Densidade: {m['densidade']} kg/m³")
    print(f"Módulo E: {m['E']:,} MPa")
    print(f"Limite de escoamento: {m['sigma_y']} MPa")
    print(f"Coef. dilatação: {m['alpha']*1e6:.1f} ×10⁻⁶/°C")
    print(comparacao)
    print(f"Densidade: {m2['densidade']} kg/m³")
    print(f"Módulo E: {m2['E']:,} MPa")
    print(f"Limite de escoamento: {m2['sigma_y']} MPa")
    print(f"Coef. dilatação: {m2['alpha']*1e6:.1f} ×10⁻⁶/°C")
```

---

## Aula 06 — Laços de Repetição

### Exercício 6.1 — Tocar playlist

```python
playlist = ["Bohemian Rhapsody", "Imagine", "Billie Jean"]

for musica in playlist:
    print(f"Tocando: {musica}")
```

---

### Exercício 6.2 — Cardápio numerado

```python
cardapio = ["Pizza", "Lasanha", "Salada", "Suco"]

for i, prato in enumerate(cardapio, start=1):
    print(f"{i}. {prato}")
```

---

### Exercício 6.3 — Tubulação com Sensores

```python
import random

print("Tubulação Industrial — Posições de Sensores")

posicoes = list(range(0, 301, 3))
print(f"Total de sensores: {len(posicoes)}")

print("10 primeiros sensores")
for p in posicoes[:10]:
    print(f"Posição {p} m")

print("10 últimos sensores")
for p in posicoes[-10:]:
    print(f"Posição {p} m")

leituras = [random.uniform(140, 170) for _ in posicoes]
print(f"Temperatura média: {sum(leituras)/len(leituras):.2f} °C")
```

---

### Exercício 6.4 — Catálogo com laço

```python
materiais = [
    {"nome": "Aço 1020", "densidade": 7850},
    {"nome": "Alumínio 6061", "densidade": 2700},
    {"nome": "Latão", "densidade": 8500},
]

for i, mat in enumerate(materiais, start=1):
    print(f"{i}. {mat['nome']} — {mat['densidade']} kg/m³")
```

---

### Exercício 6.5 — Encher o tanque

```python
nivel = 20

while nivel < 100:
    nivel += 15
    print(f"Nível: {nivel}%")

print("Tanque cheio!")
```

---

### Exercício 6.6 — Autenticação PIN Técnico

```python
print("Autenticação — Célula Robotizada de Soldagem")

tentativas = 3

while tentativas > 0:
    pin = input("PIN de 6 dígitos: ")

    if pin == "123456":
        print("Acesso autorizado. Célula liberada.")
        break
    else:
        tentativas -= 1
        if tentativas > 0:
            print(f"PIN incorreto. Tentativas restantes: {tentativas}")
        else:
            print("ACESSO BLOQUEADO. Procure o supervisor.")
```

---

### Exercício 6.7 — Filtrar e parar

```python
leituras = [22.5, -1.0, 23.1, 0.0, 105.0, 24.0]

for valor in leituras:
    if valor <= 0:
        continue
    if valor > 100:
        print(f"CRÍTICO: {valor} — parando!")
        break
    print(f"Leitura OK: {valor}")
```

---

### Exercício 6.8 — Filtro em uma linha

```python
leituras = [22.5, -1.0, 23.1, 0.0, 24.0]

validas = [v for v in leituras if v > 0]

print(f"Válidas: {validas}")
print(f"Média: {sum(validas)/len(validas):.2f}")
```

---

### Desafio opcional — Simulação de Caldeira

```python
print("Simulação de Aquecimento — Caldeira")

t_inicial = float(input("Temperatura inicial (°C): "))
t_alvo = float(input("Temperatura alvo (°C): "))
taxa = float(input("Taxa de aquecimento (°C/min): "))

if t_inicial >= t_alvo:
    print("AVISO: Temperatura inicial já atingiu ou ultrapassou o alvo.")
else:
    etapas = int((t_alvo - t_inicial) / taxa) + 1
    temperatura = t_inicial

    for i in range(1, etapas + 1):
        temperatura = t_inicial + i * taxa
        if temperatura > t_alvo:
            temperatura = t_alvo

    print(f"Temperatura alvo ({t_alvo} °C) atingida em {etapas} minutos.")
```

---

### Desafio opcional — Custo de Combustível da Frota

```python
print("Custo de Combustível — Frota de Veículos")

frota = [
    {"nome": "Caminhão A", "consumo": 6, "distancia": 3000},
    {"nome": "Van B", "consumo": 9, "distancia": 2000},
    {"nome": "Carro C", "consumo": 12, "distancia": 1500},
]

preco = float(input("Preço do combustível (R$/L): "))

custo_total = 0

for veiculo in frota:
    litros = veiculo["distancia"] / veiculo["consumo"]
    custo = litros * preco
    custo_total += custo
    print(f"{veiculo['nome']}: {litros:.1f} L → R$ {custo:.2f}")

print("---------------------------")
print(f"Custo total da frota: R$ {custo_total:.2f}")
```

---

### Exercício 6.9 — Desconto aplicado em lote

```python
def preco_final(preco, desconto=0.0):
    """Retorna o preço com desconto."""
    return preco * (1 - desconto)

precos = [100.0, 59.90, 250.0, 32.50]

for p in precos:
    print(f"De R$ {p:.2f} por R$ {preco_final(p, 0.10):.2f}")
```

---

### Exercício 6.10 — Diagnóstico do Turno de Produção

```python
maquinas = {
    "CNC-01": [11.8, 12.5, 13.1, 11.9, 14.0, 12.2],
    "CNC-02": [12.3, 12.1, 15.4, 18.9, 12.0, 13.6, 12.4],
    "CNC-03": [11.6, 11.9, 12.4, 11.8, 12.1],
    "CNC-04": [13.8, 14.2, 12.9, 16.7, 15.8],
    "CNC-05": [12.0, 12.2, 12.1, 11.9, 12.3, 12.2, 12.4],
}

print("Diagnóstico do Turno de Produção")
print("------------------------------------------------------------")
print(f"{'Máquina':<7}{'Peças':>6}{'Média':>10}{'Alertas':>9}")

soma_geral = 0
total_pecas = 0
pior_maquina = ""
pior_media = 0
mais_alertas_maquina = ""
mais_alertas = 0

for maquina, tempos in maquinas.items():
    n = len(tempos)
    media = sum(tempos) / n
    alertas = 0
    for t in tempos:
        if t > 12.0:
            alertas += 1
    soma_geral += sum(tempos)
    total_pecas += n
    if media > pior_media:
        pior_media = media
        pior_maquina = maquina
    if alertas > mais_alertas:
        mais_alertas = alertas
        mais_alertas_maquina = maquina
    print(f"{maquina:<7}{n:>6}{media:>10.1f}{alertas:>9}")

print("---------------------------")
print(f"Média geral: {soma_geral / total_pecas:.2f} min")
print(f"Pior média: {pior_maquina} ({pior_media:.1f} min)")
print(f"Mais alertas: {mais_alertas_maquina} ({mais_alertas})")
```

---

### Exercício 6.11 — Faturamento do Mês por Cliente

```python
pedidos = [
    {"cliente": "Auto Peças LTDA", "peca": "Eixo A36",   "qtd": 40,  "preco": 120.0},
    {"cliente": "Fabricante XYZ",  "peca": "Flange",     "qtd": 12,  "preco": 480.0},
    {"cliente": "Ind. Rodrigues",  "peca": "Flange",     "qtd": 25,  "preco": 480.0},
    {"cliente": "Auto Peças LTDA", "peca": "Bucha",      "qtd": 80,  "preco": 25.0},
    {"cliente": "Fabricante XYZ",  "peca": "Eixo A36",   "qtd": 60,  "preco": 120.0},
    {"cliente": "Tornearia Alfa",  "peca": "Pino",       "qtd": 200, "preco": 18.0},
    {"cliente": "Ind. Rodrigues",  "peca": "Engrenagem", "qtd": 8,   "preco": 1500.0},
    {"cliente": "Metalúrgica Sul", "peca": "Flange",     "qtd": 30,  "preco": 480.0},
    {"cliente": "Usinagem Norte",  "peca": "Bucha",      "qtd": 50,  "preco": 25.0},
    {"cliente": "Tornearia Alfa",  "peca": "Eixo A36",   "qtd": 90,  "preco": 120.0},
    {"cliente": "Auto Peças LTDA", "peca": "Engrenagem", "qtd": 5,   "preco": 1500.0},
    {"cliente": "Metalúrgica Sul", "peca": "Eixo A36",   "qtd": 110, "preco": 120.0},
    {"cliente": "Auto Peças LTDA",  "peca": "Bucha",     "qtd": 60,  "preco": 25.0},
    {"cliente": "Auto Peças LTDA",  "peca": "Pino",      "qtd": 100, "preco": 18.0},
    {"cliente": "Fabricante XYZ",   "peca": "Engrenagem","qtd": 10,  "preco": 1500.0},
    {"cliente": "Fabricante XYZ",   "peca": "Pino",      "qtd": 150, "preco": 18.0},
    {"cliente": "Ind. Rodrigues",   "peca": "Eixo A36",  "qtd": 70,  "preco": 120.0},
    {"cliente": "Ind. Rodrigues",   "peca": "Pino",      "qtd": 120, "preco": 18.0},
    {"cliente": "Tornearia Alfa",   "peca": "Flange",    "qtd": 20,  "preco": 480.0},
    {"cliente": "Tornearia Alfa",   "peca": "Bucha",     "qtd": 90,  "preco": 25.0},
    {"cliente": "Metalúrgica Sul",  "peca": "Engrenagem","qtd": 15,  "preco": 1500.0},
    {"cliente": "Metalúrgica Sul",  "peca": "Pino",      "qtd": 80,  "preco": 18.0},
    {"cliente": "Usinagem Norte",   "peca": "Flange",    "qtd": 10,  "preco": 480.0},
    {"cliente": "Usinagem Norte",   "peca": "Eixo A36",  "qtd": 45,  "preco": 120.0},
]

resumo = {}

for p in pedidos:
    c = p["cliente"]
    if c not in resumo:
        resumo[c] = {"pedidos": 0, "total": 0.0}
    resumo[c]["pedidos"] += 1
    resumo[c]["total"] += p["qtd"] * p["preco"]

print("Faturamento do Mês por Cliente")
print("---------------------------")
for c, d in resumo.items():
    print(f"{c}: {d['pedidos']} pedidos → R$ {d['total']:,.2f}")

maior = max(resumo, key=lambda c: resumo[c]["total"])
mais_pedidos = max(resumo, key=lambda c: resumo[c]["pedidos"])
ranking = sorted(resumo, key=lambda c: resumo[c]["total"], reverse=True)[:3]

print("---------------------------")
print(f"Maior cliente: {maior} (R$ {resumo[maior]['total']:,.2f})")
print(f"Mais pedidos: {mais_pedidos} ({resumo[mais_pedidos]['pedidos']})")
print(f"Top 3: {', '.join(ranking)}")
```

---

### Mini-Projeto — Registro e Consolidação de Movimentações

```python
print("Registro de Movimentações — Almoxarifado")

movs = []

while True:
    desc = input("Descrição (ou 'fim'): ")
    if desc.strip().lower() == "fim":
        break
    cat = input("Categoria: ")
    while not cat or cat.strip().lower() == "fim":
        cat = input("Categoria inválida. Digite novamente: ")
    tipo = input("Tipo (entrada/saída): ").strip().lower()
    while tipo not in ("entrada", "saída", "saida"):
        tipo = input("Tipo inválido. Digite 'entrada' ou 'saída': ").strip().lower()
    if tipo == "saida":
        tipo = "saída"
    qtd = 0
    while qtd <= 0:
        try:
            qtd = int(input("Quantidade: "))
        except ValueError:
            qtd = 0
    valor = float(input("Valor unitário (R$): "))
    movs.append({"descricao": desc, "categoria": cat, "tipo": tipo, "qtd": qtd, "valor": valor})

categorias = {}

for m in movs:
    c = m["categoria"]
    if c not in categorias:
        categorias[c] = {"movimentos": 0, "qtd_in": 0, "val_in": 0.0, "qtd_out": 0, "val_out": 0.0}
    d = categorias[c]
    v = m["qtd"] * m["valor"]
    d["movimentos"] += 1
    if m["tipo"] == "entrada":
        d["qtd_in"] += m["qtd"]
        d["val_in"] += v
    else:
        d["qtd_out"] += m["qtd"]
        d["val_out"] += v

total_valor = sum(d["val_in"] + d["val_out"] for d in categorias.values())

print("===========================")
print("Relatório Consolidado")
for c, d in categorias.items():
    tot = d["val_in"] + d["val_out"]
    print("---------------------------")
    print(f"Categoria: {c}")
    print(f"Movimentos: {d['movimentos']}")
    print(f"Entradas: {d['qtd_in']} itens → R$ {d['val_in']:,.2f}")
    print(f"Saídas: {d['qtd_out']} itens → R$ {d['val_out']:,.2f}")
    print(f"Valor total: R$ {tot:,.2f} ({tot / total_valor:.1%})")

maior_mov = max(categorias, key=lambda c: categorias[c]["movimentos"])
maior_val = max(categorias, key=lambda c: categorias[c]["val_in"] + categorias[c]["val_out"])
maior_item = max(movs, key=lambda m: m["valor"])
saldo_qtd = sum(m["qtd"] if m["tipo"] == "entrada" else -m["qtd"] for m in movs)
saldo_val = sum(m["qtd"] * m["valor"] if m["tipo"] == "entrada" else -m["qtd"] * m["valor"] for m in movs)

print("---------------------------")
print(f"Categoria com mais movimentos: {maior_mov}")
print(f"Categoria com maior valor: {maior_val}")
print(f"Item de maior valor unitário: {maior_item['descricao']} (R$ {maior_item['valor']:,.2f})")
print(f"Saldo geral: {saldo_qtd} itens, R$ {saldo_val:,.2f}")
```

---

## Aula 07 — Persistência + Tabelas

### Exercício 7.1 — Ficha de leitura

```python
import json

leitor = {
    "nome": "Marina",
    "livro_atual": "Dom Casmurro",
    "paginas_lidas": 120,
    "lidos": ["Capitães da Areia", "O Hobbit", "1984"],
}

with open("leitor.json", "w") as f:
    json.dump(leitor, f, indent=4)

with open("leitor.json", "r") as f:
    d = json.load(f)

print(f"{d['nome']} está lendo {d['livro_atual']} ({d['paginas_lidas']} páginas lidas).")
print(f"Livros concluídos: {len(d['lidos'])}")
```

---

### Exercício 7.2 — Boletim da turma em JSON

```python
import json
import os

BOLETIM_FILE = "boletim.json"

def carregar_boletim():
    if os.path.exists(BOLETIM_FILE):
        with open(BOLETIM_FILE, "r") as f:
            return json.load(f)
    return {}

def salvar_boletim(boletim):
    with open(BOLETIM_FILE, "w") as f:
        json.dump(boletim, f, indent=4)

novos = {
    "Ana": [8.0, 7.5, 9.0],
    "Bruno": [6.0, 5.5, 7.0],
    "Carla": [10.0, 9.5, 9.0],
}

boletim = carregar_boletim()
boletim.update(novos)
salvar_boletim(boletim)

boletim = carregar_boletim()
for nome, notas in boletim.items():
    media = sum(notas) / len(notas)
    print(f"{nome}: {media:.1f}")
```

---

### Exercício 7.3 — Gastos do mês em CSV

```python
import csv

linhas = [
    ["2026-09-01", "mercado",    250.0],
    ["2026-09-03", "transporte",  80.0],
    ["2026-09-05", "mercado",    120.5],
    ["2026-09-10", "lazer",       90.0],
    ["2026-09-12", "transporte",  45.0],
]

with open("gastos.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["data", "categoria", "valor"])
    writer.writerows(linhas)

total = 0.0
total_mercado = 0.0

with open("gastos.csv", "r") as f:
    reader = csv.DictReader(f)
    for linha in reader:
        valor = float(linha["valor"])
        total += valor
        if linha["categoria"] == "mercado":
            total_mercado += valor
        print(f"{linha['data']} — {linha['categoria']}: R$ {valor:.2f}")

print("---------------------------")
print(f"Total do mês: R$ {total:.2f}")
print(f"Gasto com mercado: R$ {total_mercado:.2f}")
```

---

### Exercício 7.4 — Cardápio da cantina vai e volta

```python
import pandas as pd

cardapio = {
    "dia": ["seg", "ter", "qua", "qui", "sex"],
    "prato": ["Pizza", "Lasanha", "Salada", "Feijoada", "Suco + Pão"],
    "preco": [18.0, 22.0, 15.0, 25.0, 12.0],
}

df = pd.DataFrame(cardapio)
print(df.shape)
print(df.head(3))

df.to_csv("cardapio.csv", index=False)
df2 = pd.read_csv("cardapio.csv")

print(f"Preço médio: R$ {df2['preco'].mean():.2f}")
top = df2.loc[df2["preco"].idxmax()]
print(f"Prato mais caro: {top['prato']} (R$ {top['preco']:.2f})")
```

---

### Exercício 7.5 — Boletim com estilo e estatísticas

```python
import pandas as pd

alunos = [
    {"nome": "Ana", "P1": 8.0, "P2": 7.5, "P3": 9.0},
    {"nome": "Bruno", "P1": 6.0, "P2": 5.5, "P3": 7.0},
    {"nome": "Carla", "P1": 10.0, "P2": 9.5, "P3": 9.0},
    {"nome": "Diego", "P1": 4.0, "P2": 5.0, "P3": 6.0},
]

for a in alunos:
    a["media"] = (a["P1"] + a["P2"] + a["P3"]) / 3

df = pd.DataFrame(alunos)

print(df.describe())
print(f"Média da turma: {df['media'].mean():.2f}")

top = df.loc[df["media"].idxmax()]
print(f"Maior média: {top['nome']} ({top['media']:.2f})")

df.style.background_gradient(cmap="viridis").format("{:.1f}", subset=["P1", "P2", "P3", "media"])
```

---

### Exercício 7.6 — Controle de Estoque com JSON

```python
import json
import os
import pandas as pd

ESTOQUE_FILE = "estoque.json"

def carregar_estoque():
    if os.path.exists(ESTOQUE_FILE):
        with open(ESTOQUE_FILE, "r") as f:
            return json.load(f)
    return {}

def salvar_estoque(estoque):
    with open(ESTOQUE_FILE, "w") as f:
        json.dump(estoque, f, indent=4)

# Começa zerado para o teste (apaga arquivo anterior, se existir)
if os.path.exists(ESTOQUE_FILE):
    os.remove(ESTOQUE_FILE)

estoque = carregar_estoque()

cadastros = [
    ("Capacete",            50),
    ("Luva de borracha",    120),
    ("Bota de segurança",   30),
    ("Óculos de proteção",  75),
    ("Colete refletivo",    40),
]

for nome, qtd in cadastros:
    estoque[nome] = estoque.get(nome, 0) + qtd
salvar_estoque(estoque)

retiradas = [
    ("Capacete",           10),
    ("Luva de borracha",   200),   # deve falhar: saldo insuficiente
    ("Bota de segurança",   5),
]

for nome, qtd in retiradas:
    if nome in estoque:
        if estoque[nome] >= qtd:
            estoque[nome] -= qtd
            print(f"{qtd}x {nome} retirado.")
        else:
            print(f"{nome}: saldo insuficiente ({estoque[nome]}). Retirada de {qtd} recusada.")
salvar_estoque(estoque)

df = pd.DataFrame({"Item": list(estoque.keys()), "Quantidade": list(estoque.values())})
print(df)
```

---

### Exercício 7.7 — Vitórias por Piloto na Fórmula 1

```python
import pandas as pd

resultados = pd.read_csv("results.csv")
pilotos    = pd.read_csv("drivers.csv")

vitorias = resultados[resultados["positionOrder"] == 1]

pilotos["nome"] = pilotos["forename"] + " " + pilotos["surname"]

df = pd.merge(vitorias, pilotos[["driverId", "nome"]], on="driverId")

ranking = df.groupby("nome").size().reset_index(name="vitorias")
ranking = ranking.sort_values("vitorias", ascending=False).reset_index(drop=True)

print(ranking.head(10))
ranking.head(10).style.background_gradient(cmap="viridis").format({"vitorias": "{:.0f}"})
```

### Exercício 7.8 — Fatura de Luz com Tabela de Tarifas

```python
import json
import pandas as pd

TAXA_FIXA = 15.0

tarifas = pd.read_csv("tarifas.csv")
leituras = pd.read_csv("leituras.csv")

def buscar_tarifa(consumo):
    for _, r in tarifas.iterrows():
        if r["consumo_min"] <= consumo <= r["consumo_max"]:
            return r["faixa"], float(r["tarifa_kwh"])
    raise ValueError(f"Consumo fora das faixas: {consumo}")

registros = []
for _, row in leituras.iterrows():
    cliente = row["cliente"]
    kwh = row["consumo_kwh"]
    faixa, tarifa = buscar_tarifa(kwh)
    valor_energia = kwh * tarifa
    acrescimo = kwh * 0.05 if kwh > 200 else 0.0
    total = valor_energia + TAXA_FIXA + acrescimo
    perfil = "economico" if kwh <= 100 else ("normal" if kwh <= 220 else "alto consumo")
    alerta = "revisar instalacao" if kwh > 220 else "ok"
    registros.append({
        "cliente": cliente,
        "consumo_kwh": kwh,
        "faixa": faixa,
        "tarifa_kwh": tarifa,
        "valor_energia": round(valor_energia, 2),
        "acrescimo_bandeira": round(acrescimo, 2),
        "total": round(total, 2),
        "perfil": perfil,
        "alerta": alerta,
    })

relatorio = pd.DataFrame(registros).sort_values("total", ascending=False).reset_index(drop=True)

print(relatorio)
print(relatorio.describe())
print(relatorio["perfil"].value_counts().to_dict())
relatorio.style.background_gradient(cmap="viridis", subset=["total"]).format("{:.2f}", subset=["total"])

relatorio.to_csv("relatorio_faturas.csv", index=False)

resumo = {
    "total_arrecadado": round(float(relatorio["total"].sum()), 2),
    "ticket_medio": round(float(relatorio["total"].mean()), 2),
    "maior_fatura": {
        "cliente": relatorio.loc[relatorio["total"].idxmax(), "cliente"],
        "valor": float(relatorio["total"].max()),
    },
    "contagem_perfil": relatorio["perfil"].value_counts().to_dict(),
}
with open("resumo_faturas.json", "w") as f:
    json.dump(resumo, f, indent=4)

print(resumo)

# Prova de persistência: recarrega o relatório do disco
conferencia = pd.read_csv("relatorio_faturas.csv")
print(f"Itens no relatório recarregado: {len(conferencia)}")
```

---

## Aula 06 — Pandas + NumPy Essencial

### Exercício 6.1 — Arrays de Posições de Sensores

```python
import numpy as np

print("Posições de Sensores — Viga de 300 m")

sensores_arange = np.arange(0, 301, 30)
sensores_linspace = np.linspace(0, 300, 5)

print("np.arange(0, 301, 30)")
print(f"Valores: {sensores_arange}")
print(f"Shape: {sensores_arange.shape} | Size: {sensores_arange.size} | Dtype: {sensores_arange.dtype}")

print("np.linspace(0, 300, 5)")
print(f"Valores: {sensores_linspace}")
print(f"Shape: {sensores_linspace.shape} | Size: {sensores_linspace.size} | Dtype: {sensores_linspace.dtype}")

print(f"Sensores (arange): {len(sensores_arange)}")
print(f"Sensores (linspace): {len(sensores_linspace)}")
```

### Exercício 6.2 — Leitura de Sensores com `np.random`

```python
import numpy as np
import matplotlib.pyplot as plt

print("Leituras de Termopar — Forno Industrial")

dados = np.random.normal(loc=100, scale=5, size=100)

plt.plot(dados)
plt.title("Leituras de Termopar")
plt.xlabel("Amostra")
plt.ylabel("Temperatura (°C)")
plt.show()

print("---------------------------")
print(f"Média: {np.mean(dados):.2f} °C")
print(f"Desvio padrão: {np.std(dados):.2f} °C")
print(f"Máximo: {np.max(dados):.2f} °C")
print(f"Mínimo: {np.min(dados):.2f} °C")
```

### Exercício 6.3 — Operações Vetorizadas (Conversão de Unidades)

```python
import numpy as np
import pandas as pd

print("Conversão de Temperaturas — Forno Industrial")

temp_C = np.array([25, 100, 200, 350, 500])
temp_K = temp_C + 273
temp_F = temp_C * 9/5 + 32

df = pd.DataFrame({
    "Celsius (°C)": temp_C,
    "Kelvin (K)": temp_K,
    "Fahrenheit (°F)": temp_F
})

print(df)
```

### Exercício 6.4 — DataFrame de Materiais a partir de NumPy

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

print("Catálogo de Materiais — NumPy + Pandas")

nomes = ["Aço", "Alumínio", "Latão", "Titânio", "PVC"]
densidade = np.array([7850, 2700, 8500, 4430, 1380])
modulo_E = np.array([210, 69, 97, 116, 3])

df = pd.DataFrame({
    "material": nomes,
    "densidade": densidade,
    "modulo_E": modulo_E
})

df["relacao"] = df["modulo_E"] / df["densidade"] * 1000
df = df.sort_values("relacao", ascending=False).reset_index(drop=True)

print(df)

print("Relação Módulo E / Densidade")
plt.bar(df["material"], df["relacao"])
plt.title("Relação Módulo E / Densidade")
plt.xlabel("Material")
plt.ylabel("Relação")
plt.show()
```

### Exercício 6.5 — Estatísticas de Tração com NumPy

```python
import numpy as np

print("Ensaio de Tração — Análise Estatística")

tensao_max = np.array([410, 425, 395, 430, 415, 420, 405, 435, 400, 418])
alongamento = np.array([18, 20, 16, 22, 19, 21, 17, 23, 15, 20])

print("Tensão Máxima (MPa)")
print(f"Média: {np.mean(tensao_max):.1f} MPa")
print(f"Desvio padrão: {np.std(tensao_max):.2f} MPa")
print(f"Mediana: {np.median(tensao_max):.1f} MPa")
print(f"Máximo: {np.max(tensao_max)} MPa")
print(f"Mínimo: {np.min(tensao_max)} MPa")

print("Alongamento (%)")
print(f"Média: {np.mean(alongamento):.1f} %")
print(f"Desvio padrão: {np.std(alongamento):.2f} %")
print(f"Mediana: {np.median(alongamento):.1f} %")
print(f"Máximo: {np.max(alongamento)} %")
print(f"Mínimo: {np.min(alongamento)} %")

print("---------------------------")
media = np.mean(tensao_max)
std = np.std(tensao_max)
if 380 <= media <= 420:
    print(f"Média = {media:.1f} MPa — dentro da especificação (400 ± 20 MPa).")
else:
    print(f"Média = {media:.1f} MPa — fora da especificação (400 ± 20 MPa).")
```

### Exercício 6.6 — Simulação de Monte Carlo (Tensão × Carga)

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

print("Simulação de Monte Carlo — Tensão × Carga")

N = 1000
limite_escoamento = 300  # MPa

carga = np.random.normal(loc=50, scale=5, size=N)  # kN
area = np.random.normal(loc=200, scale=10, size=N)  # mm²

tensao = (carga * 1000) / area  # MPa

prob_falha = np.sum(tensao > limite_escoamento) / N * 100

print(f"Média da tensão: {np.mean(tensao):.1f} MPa")
print(f"Desvio padrão: {np.std(tensao):.1f} MPa")
print(f"Prob. de falha: {prob_falha:.1f}%")

plt.hist(tensao, bins=30)
plt.title("Distribuição de Tensão")
plt.xlabel("Tensão (MPa)")
plt.ylabel("Frequência")
plt.show()

print(f"Limite de escoamento: {limite_escoamento} MPa")
print(f"Cenários com σ > {limite_escoamento} MPa: {int(np.sum(tensao > limite_escoamento))} de {N}")
```

### Exercício 6.7 — Dashboard de Sensores com NumPy

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

print("Dashboard de Sensores")

print("Tipo de sensor: 1-Temperatura, 2-Pressão, 3-Vibração")
tipo = input("Tipo de sensor: ")
n_pontos = int(input("Quantidade de pontos: "))

if tipo == "1":
    dados = np.random.normal(loc=100, scale=5, size=n_pontos)
    unidade = "°C"
elif tipo == "2":
    dados = np.random.uniform(4, 8, size=n_pontos)
    unidade = "bar"
else:
    dados = np.random.normal(loc=0.5, scale=0.1, size=n_pontos)
    unidade = "g"

plt.plot(dados)
plt.title("Dashboard de Sensores")
plt.xlabel("Leitura")
plt.ylabel(f"Valor ({unidade})")
plt.show()

print("---------------------------")
print(f"Média: {np.mean(dados):.2f} {unidade}")
print(f"Desvio: {np.std(dados):.2f} {unidade}")
print(f"Máximo: {np.max(dados):.2f} {unidade}")
print(f"Mínimo: {np.min(dados):.2f} {unidade}")

print("---------------------------")
df = pd.DataFrame({"Leitura": range(1, len(dados)+1), "Valor": dados})
print(df)
```

### Mini-Projeto — Analisador de Ensaios Mecânicos

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

print("Analisador de Ensaios Mecânicos")

materiais = {
    "Aço": {"tensao_mu": 420, "tensao_sigma": 25, "E_mu": 210, "E_sigma": 10, "densidade": 7850},
    "Alumínio": {"tensao_mu": 280, "tensao_sigma": 20, "E_mu": 70, "E_sigma": 8, "densidade": 2700},
    "Latão": {"tensao_mu": 350, "tensao_sigma": 30, "E_mu": 100, "E_sigma": 12, "densidade": 8500},
    "Titânio": {"tensao_mu": 520, "tensao_sigma": 35, "E_mu": 115, "E_sigma": 10, "densidade": 4430},
}

N = 20

np.random.seed(42)
linhas = []
for mat, p in materiais.items():
    linhas.append(pd.DataFrame({
        "material": [mat] * N,
        "tensao_max": np.random.normal(p["tensao_mu"], p["tensao_sigma"], N),
        "modulo_E": np.random.normal(p["E_mu"], p["E_sigma"], N),
        "densidade": [p["densidade"]] * N,
    }))
df = pd.concat(linhas, ignore_index=True)
df["resistencia_especifica"] = (
    df["tensao_max"] / df["densidade"] * 1000
)

print("Tabela de Dados")
print(df)

print("---------------------------")
print("Estatísticas por Material")

estats = df.groupby("material").agg(
    tensao_media=("tensao_max", "mean"),
    tensao_std=("tensao_max", "std"),
    E_medio=("modulo_E", "mean"),
    resist_especifica_media=("resistencia_especifica", "mean"),
).reset_index()

print(estats)

print("Tensão Média por Material")
plt.bar(estats["material"], estats["tensao_media"])
plt.title("Tensão Média por Material")
plt.xlabel("Material")
plt.ylabel("Tensão (MPa)")
plt.show()

print("Resistência Específica por Material")
plt.bar(estats["material"], estats["resist_especifica_media"])
plt.title("Resistência Específica por Material")
plt.xlabel("Material")
plt.ylabel("Resistência específica")
plt.show()

df.to_csv("ensaios_mecanicos.csv", index=False)
print("Arquivo ensaios_mecanicos.csv gerado para download.")
```

---

## Aula 07 — POO Essencial para Engenharia

### Exercício 7.1 — Classe Aluno

```python
class Aluno:
    def __init__(self, nome, notas):
        self.nome = nome
        self.notas = notas

    def calcular_media(self):
        return sum(self.notas) / len(self.notas)

    def calcular_media_exame(self, nota_exame):
        return self.calcular_media() * 0.7 + nota_exame * 0.3

    def exibir_situacao(self):
        media = self.calcular_media()
        if media >= 7:
            return "Aprovado"
        elif media >= 4:
            return "Exame Final"
        else:
            return "Reprovado"

print("Sistema de Avaliação — Alunos")

alunos = [
    Aluno("João", [8, 7, 6, 5, 4, 3]),
    Aluno("Maria", [10, 9, 8, 7, 6, 5]),
    Aluno("José", [5, 4, 3, 2, 1, 0]),
]

nomes = [a.nome for a in alunos]
print("Alunos:", nomes)
escolha = input("Selecione o aluno: ")

aluno = next(a for a in alunos if a.nome == escolha)
media = aluno.calcular_media()
situacao = aluno.exibir_situacao()

print(f"Média: {media:.1f}")
print(f"Situação: {situacao}")
print(f"Notas: {aluno.notas}")

if situacao == "Exame Final":
    nota_exame = float(input("Nota do exame: "))
    media_final = aluno.calcular_media_exame(nota_exame)
    print(f"Média final (com exame): {media_final:.1f}")
```

### Exercício 7.2 — Classe Calculadora

```python
class Calculadora:
    def __init__(self, op1, op2):
        self.op1 = op1
        self.op2 = op2

    def somar(self):
        return self.op1 + self.op2

    def subtrair(self):
        return self.op1 - self.op2

    def multiplicar(self):
        return self.op1 * self.op2

    def dividir(self):
        if self.op2 == 0:
            return None
        return self.op1 / self.op2

    def calcular_potencia(self):
        return self.op1 ** self.op2

print("Calculadora Científica")

op1 = float(input("Operando 1: "))
op2 = float(input("Operando 2: "))
print("Operação: +, −, ×, ÷, ^")
operacao = input("Operação: ")

calc = Calculadora(op1, op2)

if operacao == "+":
    resultado = calc.somar()
elif operacao == "−":
    resultado = calc.subtrair()
elif operacao == "×":
    resultado = calc.multiplicar()
elif operacao == "÷":
    resultado = calc.dividir()
    if resultado is None:
        print("Erro: divisão por zero!")
        raise SystemExit
else:
    resultado = calc.calcular_potencia()

print(f"Resultado: {resultado:.4f}")
```

### Exercício 7.3 — Classe Carro

```python
class Carro:
    def __init__(self, consumo, tanque_max=50):
        self.consumo = consumo  # km/L
        self.combustivel = 0
        self.tanque_max = tanque_max

    def abastecer(self, litros):
        if litros <= 0:
            return "Quantidade inválida."
        espaco = self.tanque_max - self.combustivel
        if litros > espaco:
            self.combustivel = self.tanque_max
            return f"Tanque cheio! Completou {espaco:.1f} L."
        self.combustivel += litros
        return f"Abastecido {litros:.1f} L."

    def andar(self, distancia):
        if distancia <= 0:
            return "Distância inválida."
        necessario = distancia / self.consumo
        if necessario > self.combustivel:
            return f"Combustível insuficiente. Precisa de {necessario:.1f} L, tem {self.combustivel:.1f} L."
        self.combustivel -= necessario
        return f"Percorreu {distancia:.1f} km. Combustível restante: {self.combustivel:.1f} L."

    def exibir_combustivel(self):
        return self.combustivel

print("Simulador de Veículo")

carro = Carro(consumo=12)

for _ in range(4):
    print("Operações: 1-Abastecer, 2-Andar, 3-Sair")
    opcao = input("Opção: ")
    if opcao == "3":
        break
    if opcao == "1":
        litros = float(input("Abastecer (L): "))
        msg = carro.abastecer(litros)
        print(msg)
    elif opcao == "2":
        distancia = float(input("Andar (km): "))
        msg = carro.andar(distancia)
        print(msg)

combustivel = carro.exibir_combustivel()
print(f"Combustível no tanque: {combustivel:.1f} L / {carro.tanque_max} L")
```

### Exercício 7.4 — Sistema Bancário

```python
class Cliente:
    def __init__(self, nome, cpf):
        self.nome = nome
        self.cpf = cpf

class Conta:
    def __init__(self, titular, numero, saldo=0):
        self.titular = titular
        self.numero = numero
        self.saldo = saldo

    def depositar(self, valor):
        if valor > 0:
            self.saldo += valor
            return True
        return False

    def sacar(self, valor):
        if 0 < valor <= self.saldo:
            self.saldo -= valor
            return True
        return False

    def transferir(self, destino, valor):
        if self.sacar(valor):
            destino.depositar(valor)
            return True
        return False

    def exibir_saldo(self):
        return self.saldo

print("Sistema Bancário")

clientes = []
contas = []
prox_num = 1

while True:
    print("Menu: 1-Criar Cliente, 2-Criar Conta, 3-Operações, 4-Listar, 5-Sair")
    menu = input("Opção: ")

    if menu == "1":
        print("Novo Cliente")
        nome = input("Nome: ")
        cpf = input("CPF: ")
        if nome and cpf:
            clientes.append(Cliente(nome, cpf))
            print(f"Cliente {nome} cadastrado.")
        else:
            print("Preencha todos os campos.")

    elif menu == "2":
        print("Nova Conta")
        if not clientes:
            print("Cadastre um cliente primeiro.")
        else:
            nomes = [c.nome for c in clientes]
            print("Titulares:", nomes)
            escolha = input("Titular: ")
            saldo_inicial = float(input("Saldo inicial (R$): "))
            cliente = next(c for c in clientes if c.nome == escolha)
            conta = Conta(cliente, prox_num, saldo_inicial)
            contas.append(conta)
            prox_num += 1
            print(f"Conta {conta.numero} criada para {cliente.nome}.")

    elif menu == "3":
        print("Operações Bancárias")
        if not contas:
            print("Nenhuma conta cadastrada.")
        else:
            numeros = [f"Conta {c.numero} — {c.titular.nome}" for c in contas]
            print("Contas:", numeros)
            escolha = input("Conta: ")
            conta = contas[numeros.index(escolha)]

            print(f"Saldo atual: R$ {conta.exibir_saldo():.2f}")

            print("Operação: 1-Depositar, 2-Sacar, 3-Transferir")
            operacao = input("Operação: ")
            valor = float(input("Valor (R$): "))

            if operacao == "1":
                if conta.depositar(valor):
                    print(f"R$ {valor:.2f} depositado.")
            elif operacao == "2":
                if conta.sacar(valor):
                    print(f"R$ {valor:.2f} sacado.")
                else:
                    print("Saldo insuficiente.")
            else:
                if len(contas) < 2:
                    print("Precisa de pelo menos 2 contas para transferir.")
                else:
                    destinos = [f"Conta {c.numero} — {c.titular.nome}" for c in contas if c != conta]
                    print("Contas destino:", destinos)
                    dest_escolha = input("Conta destino: ")
                    destino = contas[destinos.index(dest_escolha)]
                    if conta.transferir(destino, valor):
                        print(f"R$ {valor:.2f} transferido.")
                    else:
                        print("Saldo insuficiente.")

    elif menu == "4":
        print("Contas Cadastradas")
        if not contas:
            print("Nenhuma conta cadastrada.")
        else:
            for c in contas:
                print(f"Conta {c.numero} — {c.titular.nome} (CPF: {c.titular.cpf}) — Saldo: R$ {c.saldo:.2f}")

    elif menu == "5":
        break
```

### Exercício 7.5 — Classe Cliente (Abstração)

```python
class Pessoa:
    def __init__(self, nome, cpf, endereco, telefone, email):
        self.nome = nome
        self.cpf = cpf
        self.endereco = endereco
        self.telefone = telefone
        self.email = email

class Cliente:
    def __init__(self, nome, cpf, endereco):
        self.nome = nome
        self.cpf = cpf
        self.endereco = endereco

    def __repr__(self):
        return f"Cliente({self.nome}, {self.cpf}, {self.endereco})"

print("Cadastro de Clientes")

clientes = []

nome = input("Nome: ")
cpf = input("CPF: ")
endereco = input("Endereço: ")

if nome and cpf and endereco:
    clientes.append(Cliente(nome, cpf, endereco))
    print(f"Cliente {nome} cadastrado.")
else:
    print("Preencha todos os campos.")

print("---------------------------")
print("Clientes Cadastrados")
if clientes:
    for c in clientes:
        print(f"{c.nome} — CPF: {c.cpf} — Endereço: {c.endereco}")
else:
    print("Nenhum cliente cadastrado.")
```

### Exercício 7.6 — ContaBancaria Encapsulada

```python
class ContaBancaria:
    def __init__(self, titular, saldo=0):
        self._titular = titular
        self._saldo = saldo

    @property
    def titular(self):
        return self._titular

    @property
    def saldo(self):
        return self._saldo

    def depositar(self, valor):
        if valor > 0:
            self._saldo += valor
            return True
        return False

    def sacar(self, valor):
        if 0 < valor <= self._saldo:
            self._saldo -= valor
            return True
        return False

    def transferir(self, destino, valor):
        if self.sacar(valor):
            destino.depositar(valor)
            return True
        return False

print("Conta Bancária Encapsulada")

contas_enc = []
prox_num_enc = 1

while True:
    print("Menu: 1-Criar Conta, 2-Operações, 3-Listar, 4-Sair")
    menu = input("Opção: ")

    if menu == "1":
        print("Nova Conta")
        titular = input("Titular: ")
        saldo = float(input("Saldo inicial (R$): "))
        if titular:
            contas_enc.append(ContaBancaria(titular, saldo))
            print(f"Conta de {titular} criada.")
        else:
            print("Informe o titular.")

    elif menu == "2":
        print("Operações")
        if not contas_enc:
            print("Nenhuma conta.")
        else:
            nomes = [c.titular for c in contas_enc]
            print("Contas:", nomes)
            escolha = input("Conta: ")
            conta = contas_enc[nomes.index(escolha)]

            print(f"Saldo: R$ {conta.saldo:.2f}")

            print("Operação: 1-Depositar, 2-Sacar, 3-Transferir")
            operacao = input("Operação: ")
            valor = float(input("Valor (R$): "))

            if operacao == "1":
                if conta.depositar(valor):
                    print("Depósito realizado.")
            elif operacao == "2":
                if conta.sacar(valor):
                    print("Saque realizado.")
                else:
                    print("Saldo insuficiente.")
            else:
                if len(contas_enc) < 2:
                    print("Precisa de 2+ contas.")
                else:
                    destinos = [c.titular for c in contas_enc if c != conta]
                    print("Destinos:", destinos)
                    dest = input("Destino: ")
                    destino = contas_enc[destinos.index(dest)]
                    if conta.transferir(destino, valor):
                        print("Transferência realizada.")
                    else:
                        print("Saldo insuficiente.")

    elif menu == "3":
        print("Contas")
        for c in contas_enc:
            print(f"{c.titular} — Saldo: R$ {c.saldo:.2f}")

    elif menu == "4":
        break
```

### Exercício 7.7 — Animal → Cachorro / Gato

```python
class Animal:
    def __init__(self, nome, idade):
        self.nome = nome
        self.idade = idade

    def comer(self):
        return f"{self.nome} está comendo."

class Cachorro(Animal):
    def __init__(self, nome, idade, raca):
        super().__init__(nome, idade)
        self.raca = raca

    def latir(self):
        return f"{self.nome} ({self.raca}) está latindo: Au au!"

class Gato(Animal):
    def __init__(self, nome, idade, cor):
        super().__init__(nome, idade)
        self.cor = cor

    def miar(self):
        return f"{self.nome} ({self.cor}) está miando: Miau!"

print("Pet Shop — Cadastro de Animais")

animais = []

print("Tipo: 1-Cachorro, 2-Gato")
tipo = input("Tipo: ")

nome = input("Nome: ")
idade = int(input("Idade (anos): "))
if tipo == "1":
    extra = input("Raça: ")
else:
    extra = input("Cor: ")

if nome and extra:
    if tipo == "1":
        animais.append(Cachorro(nome, idade, extra))
    else:
        animais.append(Gato(nome, idade, extra))
    print(f"{tipo} {nome} cadastrado.")
else:
    print("Preencha todos os campos.")

print("---------------------------")
print("Animais Cadastrados")
if animais:
    for a in animais:
        print(f"{a.nome} — {a.idade} anos")
        if isinstance(a, Cachorro):
            print(f"Raça: {a.raca}")
        else:
            print(f"Cor: {a.cor}")
        print(a.comer())
        if isinstance(a, Cachorro):
            print(a.latir())
        else:
            print(a.miar())
else:
    print("Nenhum animal cadastrado.")
```

### Exercício 7.8 — Veiculo Polimórfico

```python
class Veiculo:
    def mover(self):
        return "Veículo se move..."

class Carro(Veiculo):
    def mover(self):
        return "O carro está rodando a 80 km/h na estrada."

class Moto(Veiculo):
    def mover(self):
        return "A moto está acelerando a 60 km/h na pista."

class Aviao(Veiculo):
    def mover(self):
        return "O avião está voando a 900 km/h a 10.000 m de altitude."

print("Veículos Polimórficos")

veiculos = []

print("Tipo de veículo: 1-Carro, 2-Moto, 3-Avião")
tipo = input("Tipo de veículo: ")
nome = input("Nome/Identificação: ")

if nome:
    if tipo == "1":
        veiculos.append("Carro")
        veiculo = Carro()
    elif tipo == "2":
        veiculos.append("Moto")
        veiculo = Moto()
    else:
        veiculos.append("Avião")
        veiculo = Aviao()
    print(f"{nome} cadastrado.")
    print(veiculo.mover())
else:
    print("Informe o nome.")
```

### Exercício 7.9 — Estoque de Peças

```python
from abc import ABC, abstractmethod

class Peca(ABC):
    def __init__(self, codigo, descricao, qtd=0):
        self._codigo = codigo
        self._descricao = descricao
        self._qtd = qtd

    @abstractmethod
    def exibir_info(self):
        pass

    def add(self, qtd):
        if qtd > 0:
            self._qtd += qtd

    def remove(self, qtd):
        if 0 < qtd <= self._qtd:
            self._qtd -= qtd
            return True
        return False

    @property
    def qtd(self):
        return self._qtd

    @property
    def descricao(self):
        return self._descricao

class Parafuso(Peca):
    def __init__(self, codigo, descricao, diam, comp, qtd=0):
        super().__init__(codigo, descricao, qtd)
        self._diam = diam
        self._comp = comp

    def exibir_info(self):
        return f"Parafuso {self._descricao} — Ø{self._diam}mm × {self._comp}mm — Qtd: {self._qtd}"

class Rolamento(Peca):
    def __init__(self, codigo, descricao, tipo, dext, qtd=0):
        super().__init__(codigo, descricao, qtd)
        self._tipo = tipo
        self._dext = dext

    def exibir_info(self):
        return f"Rolamento {self._descricao} — {self._tipo} — Øext {self._dext}mm — Qtd: {self._qtd}"

class Estoque:
    def __init__(self):
        self._pecas = []

    def add_peca(self, peca):
        self._pecas.append(peca)

    def consultar(self, codigo):
        for p in self._pecas:
            if p._codigo == codigo:
                return p
        return None

    def listar(self):
        return [p.exibir_info() for p in self._pecas]

print("Estoque de Peças")

estoque = Estoque()
prox_cod = 1

print("Tipo: 1-Parafuso, 2-Rolamento")
tipo = input("Tipo: ")

descricao = input("Descrição: ")
qtd = int(input("Quantidade: "))
if tipo == "1":
    diam = float(input("Diâmetro (mm): "))
    comp = float(input("Comprimento (mm): "))
else:
    tipo_rol = input("Tipo de rolamento (Esférico/Rolo/Agulha): ")
    dext = float(input("Diâmetro externo (mm): "))

if descricao:
    cod = f"P{prox_cod:03d}"
    if tipo == "1":
        p = Parafuso(cod, descricao, diam, comp, qtd)
    else:
        p = Rolamento(cod, descricao, tipo_rol, dext, qtd)
    estoque.add_peca(p)
    prox_cod += 1
    print(f"Peça {cod} adicionada.")
else:
    print("Informe a descrição.")

print("---------------------------")
print("Estoque Atual")
lista = estoque.listar()
if lista:
    for info in lista:
        print(info)

    print("---------------------------")
    print("Retirar Peça")
    pecas_disp = [(p._codigo, p.descricao) for p in estoque._pecas if p.qtd > 0]
    if pecas_disp:
        codigos = [f"{c} — {d}" for c, d in pecas_disp]
        print("Peças:", codigos)
        escolha = input("Peça: ")
        cod_escolhido = escolha.split(" — ")[0]
        qtd_ret = int(input("Quantidade a retirar: "))
        peca = estoque.consultar(cod_escolhido)
        if peca and peca.remove(qtd_ret):
            print(f"{qtd_ret}x {peca.descricao} retirado.")
        else:
            print("Quantidade insuficiente.")
    else:
        print("Nenhuma peça disponível para retirada.")
else:
    print("Estoque vazio.")
```

### Exercício 7.10 — Controle de Manutenção

```python
from abc import ABC, abstractmethod
from datetime import datetime, timedelta

class Maquina(ABC):
    def __init__(self, id_, nome, ultima_manutencao, intervalo_dias):
        self._id = id_
        self._nome = nome
        self._ultima_manutencao = ultima_manutencao
        self._intervalo_dias = intervalo_dias

    @abstractmethod
    def calcular_proxima_manutencao(self):
        pass

    @property
    def nome(self):
        return self._nome

    @property
    def ultima_manutencao(self):
        return self._ultima_manutencao

    @property
    def intervalo_dias(self):
        return self._intervalo_dias

class Torno(Maquina):
    def __init__(self, id_, nome, ultima_manutencao):
        super().__init__(id_, nome, ultima_manutencao, 30)

    def calcular_proxima_manutencao(self):
        return self._ultima_manutencao + timedelta(days=self._intervalo_dias)

    def tipo(self):
        return "Torno"

class Fresa(Maquina):
    def __init__(self, id_, nome, ultima_manutencao):
        super().__init__(id_, nome, ultima_manutencao, 45)

    def calcular_proxima_manutencao(self):
        return self._ultima_manutencao + timedelta(days=self._intervalo_dias)

    def tipo(self):
        return "Fresa"

class ControleManutencao:
    def __init__(self):
        self._maquinas = []

    def add_maquina(self, maquina):
        self._maquinas.append(maquina)

    def listar(self):
        return self._maquinas

print("Controle de Manutenção")

controle = ControleManutencao()
prox_id = 1

print("Tipo de máquina: 1-Torno, 2-Fresa")
tipo = input("Tipo de máquina: ")

nome = input("Nome: ")
ultima = datetime.strptime(input("Última manutenção (dd/mm/aaaa): "), "%d/%m/%Y")

if nome:
    id_ = f"M{prox_id:03d}"
    if tipo == "1":
        m = Torno(id_, nome, ultima)
    else:
        m = Fresa(id_, nome, ultima)
    controle.add_maquina(m)
    prox_id += 1
    print(f"{tipo} '{nome}' cadastrado.")
else:
    print("Informe o nome.")

print("---------------------------")
print("Máquinas Cadastradas")
maquinas = controle.listar()
if maquinas:
    hoje = datetime.now().date()
    for m in maquinas:
        proxima = m.calcular_proxima_manutencao().date()
        dias_restantes = (proxima - hoje).days

        print(f"{m.nome} ({m.tipo()})")
        print(f"Última: {m.ultima_manutencao.strftime('%d/%m/%Y')}")
        print(f"Próxima: {proxima.strftime('%d/%m/%Y')}")

        if dias_restantes < 0:
            print(f"⚠ {m.nome} — Manutenção atrasada há {abs(dias_restantes)} dias!")
        elif dias_restantes <= 7:
            print(f"{m.nome} — Manutenção em {dias_restantes} dias.")
        else:
            print(f"{m.nome} — Próxima em {dias_restantes} dias.")
else:
    print("Nenhuma máquina cadastrada.")
```

---

## Aula 08 — Pandas Aplicado + Visualização

### Exercício 8.1 — Carregar e Limpar Dados de Ensaios

```python
import pandas as pd

print("Limpeza de Dados — Ensaios Mecânicos")

dados = {
    "amostra": ["CP-01","CP-02","CP-03","CP-04","CP-05"],
    "material": ["Aço","Alumínio","Aço",None,"Latão"],
    "tensao_max": [450, 240, None, 320, 200],
    "modulo_E": [210000, 69000, 205000, None, 97000],
    "alongamento": [12.5, 18.0, 10.2, 15.8, None],
    "dureza": [180, 95, None, None, 110]
}

df = pd.DataFrame(dados).copy()

print("Dados Originais")
print(df)
print(f"Nulos por coluna: {df.isna().sum().to_dict()}")

print("---------------------------")
print("Opções de Limpeza")
remover_nulos = input("Remover linhas com nulos (dropna)? (s/n): ").lower() == "s"

if not remover_nulos:
    print("Preencher nulos com: 1-Média, 2-Zero")
    estrategia = input("Estratégia: ")
    colunas_sel = list(df.columns)

df_limpo = df.copy()

if remover_nulos:
    df_limpo = df_limpo.dropna()
    print(f"Removidas {len(df) - len(df_limpo)} linhas com nulos.")
else:
    if estrategia == "1":
        for col in colunas_sel:
            if df_limpo[col].isna().any() and df_limpo[col].dtype in ("float64", "int64"):
                df_limpo[col] = df_limpo[col].fillna(df_limpo[col].mean())
    elif estrategia == "2":
        for col in colunas_sel:
            if df_limpo[col].isna().any():
                df_limpo[col] = df_limpo[col].fillna(0)

print("Dados Limpos")
print(df_limpo)
print(f"Nulos restantes: {df_limpo.isna().sum().to_dict()}")
```

### Exercício 8.2 — Filtrar Materiais por Propriedade

```python
import pandas as pd
import numpy as np

print("Filtro de Materiais por Propriedade")

np.random.seed(42)
materiais_list = ["Aço 1020","Aço 4140","Al 6061","Al 7075","Latão","Bronze","Titânio Ti-6Al-4V","PVC","Cobre","Inconel"]
df = pd.DataFrame({
    "material": np.random.choice(materiais_list, 20),
    "tensao_max": np.random.uniform(150, 600, 20),
    "modulo_E": np.random.uniform(3, 210, 20),
    "dureza": np.random.uniform(50, 300, 20),
})

print("Filtros")
t_min = float(input("Tensão máxima mínima (MPa): "))
t_max = float(input("Tensão máxima máxima (MPa): "))
tipo_sel = input("Tipo de material (ou 'Todos'): ")

df_filtrado = df[df["tensao_max"].between(t_min, t_max)]
if tipo_sel != "Todos":
    df_filtrado = df_filtrado[df_filtrado["material"].str.contains(tipo_sel, case=False, na=False)]

print(f"Materiais encontrados: {len(df_filtrado)}")
print(df_filtrado)
```

### Exercício 8.3 — Estatísticas por Grupo (GroupBy)

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

print("Estatísticas por Grupo — GroupBy")

materiais = {
    "Aço": {"mu": 420, "sigma": 25},
    "Alumínio": {"mu": 280, "sigma": 20},
    "Latão": {"mu": 350, "sigma": 30},
}
linhas = []
for mat, p in materiais.items():
    for _ in range(20):
        linhas.append({"material": mat, "tensao_max": np.random.normal(p["mu"], p["sigma"])})
df = pd.DataFrame(linhas)

coluna = "tensao_max"

estats = df.groupby("material")[coluna].agg(["mean","std","min","max","count"]).reset_index()
estats.columns = ["material","Média","Desvio","Mínimo","Máximo","Contagem"]

print("Estatísticas Descritivas")
print(estats)

print("Média por Material")
plt.bar(estats["material"], estats["Média"])
plt.title("Média por Material")
plt.xlabel("Material")
plt.ylabel("Tensão (MPa)")
plt.show()

melhor = estats.loc[estats["Média"].idxmax(), "material"]
print(f"Material com melhor desempenho: {melhor} (média = {estats['Média'].max():.1f})")
```

### Exercício 8.4 — Merge de Dados de Material + Fornecedor

```python
import pandas as pd

print("Merge — Material + Fornecedor")

materiais = pd.DataFrame({
    "id": [1, 2, 3],
    "nome": ["Aço", "Alumínio", "Latão"],
    "densidade": [7850, 2700, 8500],
})
fornecedores = pd.DataFrame({
    "id": [1, 2, 3],
    "nome_material": ["Aço", "Alumínio", "Latão"],
    "preco_kg": [8.50, 15.20, 22.00],
    "prazo_dias": [15, 20, 10]
})

df = materiais.merge(fornecedores, left_on="nome", right_on="nome_material", how="left")
df["custo_peca"] = df["densidade"] * df["preco_kg"] / 1000

print(df[["nome","preco_kg","densidade","custo_peca","prazo_dias"]])

mais_barato = df.loc[df["custo_peca"].idxmin(), "nome"]
mais_caro = df.loc[df["custo_peca"].idxmax(), "nome"]

print(f"Mais barato por cm³: {mais_barato} (R$ {df['custo_peca'].min():.2f})")
print(f"Mais caro por cm³: {mais_caro} (R$ {df['custo_peca'].max():.2f})")
```

### Exercício 8.5 — Pivot Table de Produção Mensal

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

print("Pivot Table — Produção Mensal")

np.random.seed(42)
meses = ["Jan","Fev","Mar"] * 30
maquinas = np.random.choice(["M1","M2","M3"], 90)
pecas = np.random.randint(80, 150, 90)

df = pd.DataFrame({"mes": meses, "maquina": maquinas, "pecas": pecas})

pivot = df.pivot_table(index="mes", columns="maquina", values="pecas", aggfunc="sum")
pivot["Total"] = pivot.sum(axis=1)

print("Tabela Pivot — Produção por Mês e Máquina")
print(pivot)

print("Heatmap de Produção")
pivot_sem_total = pivot.drop(columns=["Total"])
plt.figure(figsize=(6, 3))
sns.heatmap(pivot_sem_total, annot=True, fmt=".0f", cmap="YlOrRd")
plt.title("Produção (peças)")
plt.show()

mais_prod = pivot.idxmax(axis=1)
for mes, maq in mais_prod.items():
    print(f"{mes}: máquina mais produtiva = {maq} ({pivot.loc[mes, maq]} peças)")
```

### Exercício 8.6 — Correlação de Propriedades (seaborn)

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

print("Correlação de Propriedades")

np.random.seed(42)
n = 50
densidade = np.random.uniform(1000, 9000, n)
modulo_E = densidade * 0.02 + np.random.normal(0, 10, n)
tensao = modulo_E * 0.002 + np.random.normal(0, 20, n)
dureza = tensao * 0.3 + np.random.normal(0, 10, n)
alongamento = 30 - densidade * 0.002 + np.random.normal(0, 3, n)

df = pd.DataFrame({
    "densidade": densidade, "modulo_E": modulo_E,
    "tensao": tensao, "dureza": dureza, "alongamento": alongamento
})

corr = df.corr()

plt.figure(figsize=(7, 5))
sns.heatmap(corr, annot=True, cmap="RdBu_r", fmt=".2f")
plt.title("Matriz de Correlação")
plt.show()

print("---------------------------")
print("Interpretação")

matriz = corr.values
cols = corr.columns
for i in range(len(cols)):
    for j in range(i+1, len(cols)):
        val = matriz[i, j]
        if abs(val) > 0.7:
            direcao = "positiva" if val > 0 else "negativa"
            print(f"{cols[i]} × {cols[j]}: correlação {direcao} forte (r = {val:.2f})")
```

### Exercício 8.7 — Dashboard de Qualidade (CEP)

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

print("Controle Estatístico de Processo (CEP)")

np.random.seed(42)
n = 60
medidas = np.random.normal(50.0, 0.03, n)
batches = np.repeat(range(1, 7), 10)

alvo = 50.0
tol = 0.1
LIE = alvo - tol
LSE = alvo + tol

media = np.mean(medidas)
sigma = np.std(medidas)
Cp = (LSE - LIE) / (6 * sigma)
Cpk = min((media - LIE) / (3 * sigma), (LSE - media) / (3 * sigma))

print(f"Média: {media:.4f} mm")
print(f"σ: {sigma:.4f} mm")
print(f"Cp: {Cp:.2f}")
print(f"Cpk: {Cpk:.2f}")

if Cp > 1.33:
    print(f"Cp = {Cp:.2f} > 1.33 → Processo capaz.")
else:
    print(f"Cp = {Cp:.2f} ≤ 1.33 → Processo não capaz.")

fig, axes = plt.subplots(1, 2, figsize=(12, 4))

axes[0].hist(medidas, bins=15, edgecolor="black", alpha=0.7)
axes[0].axvline(LIE, color="red", linestyle="--", label=f"LIE = {LIE}")
axes[0].axvline(LSE, color="red", linestyle="--", label=f"LSE = {LSE}")
axes[0].axvline(alvo, color="green", linestyle="-", label=f"Alvo = {alvo}")
axes[0].set_xlabel("Diâmetro (mm)")
axes[0].set_ylabel("Frequência")
axes[0].legend()
axes[0].set_title("Histograma")

axes[1].boxplot([medidas[batches == b] for b in range(1, 7)], tick_labels=[f"B{i}" for i in range(1, 7)])
axes[1].axhline(LIE, color="red", linestyle="--")
axes[1].axhline(LSE, color="red", linestyle="--")
axes[1].axhline(alvo, color="green", linestyle="-")
axes[1].set_ylabel("Diâmetro (mm)")
axes[1].set_title("Boxplot por Batch")

plt.show()
```

### Mini-Projeto 8 — Analisador de Ensaios Mecânicos

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

print("Analisador de Ensaios Mecânicos")

np.random.seed(42)
linhas = []
for mat, mu, sigma in [("Aço",420,25),("Alumínio",280,20),("Latão",350,30)]:
    for _ in range(20):
        linhas.append({
            "material": mat,
            "tensao_max": np.random.normal(mu, sigma),
            "alongamento": np.random.uniform(10, 25),
            "dureza": np.random.uniform(80, 250),
        })
df = pd.DataFrame(linhas)

# Limpeza
remover_nulos = input("Remover nulos? (s/n): ").lower() == "s"
if remover_nulos:
    df = df.dropna()

print("Filtros")
materiais_disp = sorted(df["material"].unique().tolist())
print("Materiais:", materiais_disp)
mat_sel = input("Material (ou 'Todos'): ")
if mat_sel != "Todos":
    df = df[df["material"] == mat_sel]

print(df)

print("---------------------------")
print("GroupBy")
estats = df.groupby("material").agg(
    tensao_media=("tensao_max","mean"),
    along_medio=("alongamento","mean"),
    dureza_media=("dureza","mean"),
).reset_index()
print(estats)

print("---------------------------")
fig, axes = plt.subplots(1, 2, figsize=(12, 4))
sns.scatterplot(data=df, x="alongamento", y="tensao_max", hue="material", ax=axes[0])
axes[0].set_title("Tensão × Alongamento")
corr = df[["tensao_max","alongamento","dureza"]].corr()
sns.heatmap(corr, annot=True, cmap="RdBu_r", fmt=".2f", ax=axes[1])
axes[1].set_title("Correlação")
plt.show()

df.to_csv("ensaios_filtrados.csv", index=False)
print("Arquivo ensaios_filtrados.csv gerado para download.")
```

---

## Aula 09 — Visualização + Dashboards

### Exercício 9.1 — Scatter Plot de Materiais

```python
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

print("Scatter Plot — Materiais")

np.random.seed(42)
df = pd.DataFrame({
    "material": np.random.choice(["Aço","Alumínio","Latão","Titânio"], 80),
    "densidade": np.random.uniform(1000, 9000, 80),
    "modulo_E": np.random.uniform(3, 210, 80),
    "escoamento": np.random.uniform(100, 600, 80),
    "dureza": np.random.uniform(50, 300, 80),
})

x_col = input("Eixo X (densidade/modulo_E/escoamento/dureza): ")
y_col = input("Eixo Y (densidade/modulo_E/escoamento/dureza): ")

for material in df["material"].unique():
    sub = df[df["material"] == material]
    plt.scatter(sub[x_col], sub[y_col], label=material, s=sub["dureza"], alpha=0.7)

plt.xlabel(x_col)
plt.ylabel(y_col)
plt.title(f"{y_col} × {x_col}")
plt.legend()
plt.show()
```

### Exercício 9.2 — Série Temporal de Sensor

```python
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

print("Série Temporal — Sensores")

np.random.seed(42)
datas = [datetime(2024,1,1) + timedelta(hours=i) for i in range(500)]
sensores = ["S1","S2","S3"]
linhas = []
for s in sensores:
    for i, d in enumerate(datas):
        linhas.append({"timestamp": d, "sensor_id": s, "valor": 100 + 10*np.sin(i/50) + np.random.normal(0,3)})
df = pd.DataFrame(linhas)

sensor_sel = input("Sensor (S1/S2/S3): ")
df_s = df[df["sensor_id"] == sensor_sel]

df_filtrado = df_s.sort_values("timestamp")

plt.plot(df_filtrado["timestamp"], df_filtrado["valor"])
plt.title(f"Sensor {sensor_sel}")
plt.xlabel("Data")
plt.ylabel("Valor")
plt.tight_layout()
plt.show()

print(f"Média no período: {df_filtrado['valor'].mean():.2f}")
```

### Exercício 9.3 — Produção por Máquina (Bar)

```python
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

print("Produção por Máquina")

np.random.seed(42)
linhas = []
for mes in ["Jan","Fev","Mar"]:
    for maq in ["CNC-1","CNC-2","Torno","Fresa"]:
        linhas.append({"mes": mes, "maquina": maq, "pecas": np.random.randint(80,150)})
df = pd.DataFrame(linhas)

pivot = df.pivot_table(index="maquina", columns="mes", values="pecas", aggfunc="sum")

width = 0.25
x = np.arange(len(pivot))
for i, mes in enumerate(pivot.columns):
    plt.bar(x + i*width, pivot[mes], width=width, label=mes)

plt.xlabel("Máquina")
plt.ylabel("Peças")
plt.title("Produção por Máquina e Mês")
plt.xticks(x + width, pivot.index)
plt.legend()
plt.show()
```

### Exercício 9.4 — Histograma + Boxplot de Dureza

```python
import matplotlib.pyplot as plt
import numpy as np

print("Distribuição de Dureza")

np.random.seed(42)
dureza = np.random.normal(180, 30, 200)

bins = int(input("Número de bins: "))
mostrar_media = input("Mostrar linha da média? (s/n): ").lower() == "s"

fig, axes = plt.subplots(1, 2, figsize=(10, 4))

axes[0].hist(dureza, bins=bins, edgecolor="black", alpha=0.7)
axes[0].set_title("Histograma")
axes[0].set_xlabel("Dureza")
axes[0].set_ylabel("Frequência")

axes[1].boxplot(dureza)
axes[1].set_title("Boxplot")
axes[1].set_ylabel("Dureza")

if mostrar_media:
    media = np.mean(dureza)
    axes[0].axvline(media, color="red", linestyle="--", label=f"Média = {media:.1f}")
    axes[0].legend()

plt.suptitle("Distribuição de Dureza")
plt.show()
```

### Exercício 9.5 — Heatmap de Correlação

```python
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import seaborn as sns

print("Heatmap de Correlação — Materiais")

np.random.seed(42)
df = pd.DataFrame({
    "material": np.random.choice(["Aço","Alumínio","Latão"], 50),
    "densidade": np.random.uniform(1000, 9000, 50),
    "modulo_E": np.random.uniform(3, 210, 50),
    "escoamento": np.random.uniform(100, 600, 50),
    "dureza": np.random.uniform(50, 300, 50),
})

tipo = input("Filtrar por material (ou 'Todos'): ")
if tipo != "Todos":
    df = df[df["material"] == tipo]

corr = df[["densidade","modulo_E","escoamento","dureza"]].corr()

plt.figure(figsize=(7, 5))
sns.heatmap(corr, annot=True, cmap="RdBu_r", fmt=".2f")
plt.title("Matriz de Correlação")
plt.show()

print("Valores próximos de +1 indicam correlação positiva forte; próximos de -1, negativa forte.")
```

### Exercício 9.6 — Dashboard de Monitoramento

```python
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

print("Dashboard de Monitoramento de Sensores")

np.random.seed(42)
datas = [datetime(2024,1,1) + timedelta(hours=i) for i in range(500)]
linhas = []
for s in ["S1","S2","S3"]:
    for i, d in enumerate(datas):
        linhas.append({"timestamp": d, "sensor_id": s, "valor": 100 + 5*np.sin(i/30) + np.random.normal(0,2)})
df = pd.DataFrame(linhas)

sensor_sel = input("Sensor (S1/S2/S3): ")
threshold = float(input("Threshold: "))

df_s = df[df["sensor_id"] == sensor_sel].sort_values("timestamp")

print("Leituras")
plt.plot(df_s["timestamp"], df_s["valor"], label="Valor")
plt.axhline(threshold, color="red", linestyle="--", label=f"Threshold = {threshold}")
plt.title(f"Sensor {sensor_sel}")
plt.xlabel("Data")
plt.ylabel("Valor")
plt.legend()
plt.show()
print(df_s)

print("Estatísticas")
print(f"Média: {df_s['valor'].mean():.2f}")
print(f"Desvio: {df_s['valor'].std():.2f}")
print(f"Máximo: {df_s['valor'].max():.2f}")

plt.figure(figsize=(10, 4))
plt.boxplot(df_s["valor"])
plt.title("Boxplot")
plt.ylabel("Valor")
plt.show()

print("Alarmes")
alertas = df_s[df_s["valor"] > threshold]
if len(alertas) > 0:
    print(f"{len(alertas)} leituras acima do threshold ({threshold})")
    print(alertas)
else:
    print("Nenhum alarme ativo.")
```

### Mini-Projeto 9 — Dashboard de Controle de Qualidade

```python
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import seaborn as sns

print("Dashboard de Controle de Qualidade")

np.random.seed(42)
produtos = {
    "Parafuso M8": {"alvo": 8.0, "tol": 0.15},
    "Porca M8": {"alvo": 8.2, "tol": 0.12},
    "Arruela": {"alvo": 2.0, "tol": 0.10},
}
linhas = []
for prod, p in produtos.items():
    n = 333
    medidas = np.random.normal(p["alvo"], p["tol"]/4, n)
    for i in range(n):
        if np.random.random() < 0.05:
            medidas[i] = p["alvo"] + np.random.choice([-1,1]) * p["tol"] * np.random.uniform(1.1, 1.5)
        linhas.append({"produto": prod, "medida": round(medidas[i], 3), "linha": f"L{np.random.randint(1,4)}", "timestamp": i})
    df_p = pd.DataFrame(linhas[-n:])
    df_p["LSL"] = p["alvo"] - p["tol"]
    df_p["USL"] = p["alvo"] + p["tol"]
    df_p["aprovado"] = (df_p["medida"] >= df_p["LSL"]) & (df_p["medida"] <= df_p["USL"])
    linhas[-n:] = df_p.to_dict("records")
df = pd.DataFrame(linhas)

print("Visão Geral")
print(f"Total amostras: {len(df)}")
print(f"Aprovadas: {df['aprovado'].sum()}")
print(f"Taxa aprovação: {df['aprovado'].mean()*100:.1f}%")

plt.figure(figsize=(8, 4))
aprovacao = df.groupby("produto")["aprovado"].mean().reset_index()
plt.bar(aprovacao["produto"], aprovacao["aprovado"])
plt.title("Taxa de Aprovação por Produto")
plt.ylabel("Taxa de aprovação")
plt.show()

print("Análise por Produto")
produtos_lista = df["produto"].unique()
print("Produtos:", produtos_lista)
prod_sel = input("Produto: ")
df_p = df[df["produto"] == prod_sel]
alvo = df_p["medida"].mean()
tol = (df_p["USL"].iloc[0] - df_p["LSL"].iloc[0]) / 2

fig, axes = plt.subplots(1, 2, figsize=(12, 4))
axes[0].hist(df_p["medida"], bins=30, edgecolor="black", alpha=0.7)
axes[0].axvline(df_p["LSL"].iloc[0], color="red", linestyle="--")
axes[0].axvline(df_p["USL"].iloc[0], color="red", linestyle="--")
axes[0].set_title(f"Histograma — {prod_sel}")
axes[0].set_xlabel("Medida")

ndata = [df_p[df_p["linha"] == l]["medida"] for l in sorted(df_p["linha"].unique())]
axes[1].boxplot(ndata, tick_labels=sorted(df_p["linha"].unique()))
axes[1].set_title(f"Boxplot por Linha — {prod_sel}")
axes[1].set_xlabel("Linha")
axes[1].set_ylabel("Medida")
plt.show()

print("Série Temporal")
df_s = df_p.sort_values("timestamp")
plt.figure(figsize=(10, 4))
for linha in df_s["linha"].unique():
    sub = df_s[df_s["linha"] == linha]
    plt.plot(sub["timestamp"], sub["medida"], label=linha)
plt.axhline(df_s["LSL"].iloc[0], color="red", linestyle="--", label="LSL")
plt.axhline(df_s["USL"].iloc[0], color="red", linestyle="--", label="USL")
reprovados = df_s[~df_s["aprovado"]]
plt.scatter(reprovados["timestamp"], reprovados["medida"], color="red", label="Reprovado")
plt.title(f"Série Temporal — {prod_sel}")
plt.xlabel("Timestamp")
plt.ylabel("Medida")
plt.legend()
plt.show()

print("Detalhes")
print(df)
df.to_csv("controle_qualidade.csv", index=False)
print("Arquivo controle_qualidade.csv gerado para download.")
```

---

## Aula 10 — Projeto Final

### Skeleton — `data.py`

```python
import pandas as pd
import os

DATA_DIR = "data"

def carregar(nome, colunas=None):
    caminho = os.path.join(DATA_DIR, f"{nome}.csv")
    if os.path.exists(caminho):
        return pd.read_csv(caminho)
    return pd.DataFrame(columns=colunas or [])

def salvar(df, nome):
    os.makedirs(DATA_DIR, exist_ok=True)
    caminho = os.path.join(DATA_DIR, f"{nome}.csv")
    df.to_csv(caminho, index=False)

def inicializar():
    if not os.path.exists(os.path.join(DATA_DIR, "departamentos.csv")):
        salvar(pd.DataFrame(columns=["id", "nome", "setor"]), "departamentos")
        salvar(pd.DataFrame(columns=["id", "nome", "tipo", "unidade", "limite_alerta", "departamento_id"]), "sensores")
        salvar(pd.DataFrame(columns=["id", "sensor_id", "valor", "timestamp", "status"]), "leituras")
        salvar(pd.DataFrame(columns=["id", "sensor_id", "leitura_id", "mensagem", "timestamp", "resolvido"]), "alertas")
```

### Skeleton — `models.py`

```python
import pandas as pd
from datetime import datetime
import data

def classificar_status(sensor_tipo, valor, limite):
    if sensor_tipo == "temperatura":
        if valor <= limite:
            return "normal"
        elif valor <= limite * 1.2:
            return "alerta"
        else:
            return "crítico"
    elif sensor_tipo == "pressao":
        if valor <= limite:
            return "normal"
        elif valor <= limite * 1.15:
            return "alerta"
        else:
            return "crítico"
    elif sensor_tipo == "vazao":
        if limite * 0.8 <= valor <= limite:
            return "normal"
        elif valor < limite * 0.5 or valor > limite * 1.3:
            return "crítico"
        else:
            return "alerta"
    return "normal"

def registrar_leitura(sensor_id, valor):
    sensores = data.carregar("sensores")
    sensor = sensores[sensores["id"] == sensor_id]
    if sensor.empty:
        return None, "Sensor não encontrado."

    sensor = sensor.iloc[0]
    status = classificar_status(sensor["tipo"], valor, sensor["limite_alerta"])

    leituras = data.carregar("leituras")
    nova_id = len(leituras) + 1
    nova_leitura = pd.DataFrame([{
        "id": nova_id, "sensor_id": sensor_id, "valor": valor,
        "timestamp": datetime.now().isoformat(), "status": status,
    }])
    leituras = pd.concat([leituras, nova_leitura], ignore_index=True)
    data.salvar(leituras, "leituras")

    if status in ("alerta", "crítico"):
        alertas = data.carregar("alertas")
        novo_alerta = pd.DataFrame([{
            "id": len(alertas) + 1, "sensor_id": sensor_id,
            "leitura_id": nova_id,
            "mensagem": f"{sensor['nome']}: {valor} {sensor['unidade']} — {status}",
            "timestamp": datetime.now().isoformat(), "resolvido": 0,
        }])
        alertas = pd.concat([alertas, novo_alerta], ignore_index=True)
        data.salvar(alertas, "alertas")

    return status, "Leitura registrada."
```

### Skeleton — `populate.py`

```python
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import data

def popular():
    deptos = pd.DataFrame([
        {"id": 1, "nome": "Produção", "setor": "Usinagem"},
        {"id": 2, "nome": "Manutenção", "setor": "Preditiva"},
        {"id": 3, "nome": "Qualidade", "setor": "Metrologia"},
        {"id": 4, "nome": "Segurança", "setor": "Monitoramento"},
    ])
    data.salvar(deptos, "departamentos")

    sensores = pd.DataFrame([
        {"id": 1, "nome": "Temp. Forno", "tipo": "temperatura", "unidade": "°C", "limite_alerta": 250.0, "departamento_id": 1},
        {"id": 2, "nome": "Temp. Caldeira", "tipo": "temperatura", "unidade": "°C", "limite_alerta": 180.0, "departamento_id": 1},
        {"id": 3, "nome": "Pressão Óleo", "tipo": "pressao", "unidade": "bar", "limite_alerta": 6.0, "departamento_id": 2},
        {"id": 4, "nome": "Pressão Ar", "tipo": "pressao", "unidade": "bar", "limite_alerta": 8.0, "departamento_id": 2},
        {"id": 5, "nome": "Vazão Bomba", "tipo": "vazao", "unidade": "L/min", "limite_alerta": 100.0, "departamento_id": 1},
        {"id": 6, "nome": "Vazão Resfriador", "tipo": "vazao", "unidade": "L/min", "limite_alerta": 50.0, "departamento_id": 3},
        {"id": 7, "nome": "Temp. Ambiente", "tipo": "temperatura", "unidade": "°C", "limite_alerta": 40.0, "departamento_id": 4},
        {"id": 8, "nome": "Pressão Vapor", "tipo": "pressao", "unidade": "bar", "limite_alerta": 12.0, "departamento_id": 4},
    ])
    data.salvar(sensores, "sensores")

    leituras = []
    lid = 1
    agora = datetime.now()
    for sensor_id, limite in [(1,250),(2,180),(3,6),(4,8),(5,100),(6,50),(7,40),(8,12)]:
        for i in range(20):
            ts = agora - timedelta(hours=20-i)
            valor = limite * np.random.uniform(0.7, 1.25)
            if valor <= limite:
                status = "normal"
            elif valor <= limite * 1.15:
                status = "alerta"
            else:
                status = "crítico"
            leituras.append({"id": lid, "sensor_id": sensor_id, "valor": round(valor,2), "timestamp": ts.isoformat(), "status": status})
            lid += 1

    data.salvar(pd.DataFrame(leituras), "leituras")
    data.salvar(pd.DataFrame(columns=["id","sensor_id","leitura_id","mensagem","timestamp","resolvido"]), "alertas")

if __name__ == "__main__":
    popular()
    print("Dados populados com sucesso.")
```

---

## Referências

- **Python.org — Tutorial oficial (pt-BR)** — https://docs.python.org/pt-br/3/tutorial/
- **Google Colab — Documentação** — https://colab.research.google.com/
- **PEP 8 — Guia de estilo** — https://peps.python.org/pep-0008/