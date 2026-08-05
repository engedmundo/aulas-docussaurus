# Gabarito de Exercícios — Programação Aplicada

Este arquivo contém as soluções completas de todos os exercícios da disciplina. Cada exercício tem o código funcional pronto para executar como célula no notebook Google Colab.

---

## Aula 01 — Introdução + Google Colab

### Exercício 1.1 — Pressão de Pistão Hidráulico

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

## Aula 02 — Conceitos Básicos + Apps Interativos

### Exercício 2.1 — Média de Dureza Rockwell

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

### Exercício 2.2 — IMC do Operador

```python
print("IMC do Operador — NR-17")
print("------------------------------------------------------------")

peso = float(input("Peso (kg): "))
altura = float(input("Altura (m): "))

imc = peso / altura ** 2
print("---------------------------")
print(f"IMC calculado: {imc:.2f}")
```

### Exercício 2.3 — Relação de Transmissão

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

### Exercício 2.4 — Cilindro com Desperdício de Material

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

### Exercício 2.5 — Dilatação Térmica

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

### Exercício 2.6 — Custo Operacional de Fresadora

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

### Exercício 3.1 — Prensa Hidráulica

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

### Exercício 3.2 — Dureza do Aço

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

### Exercício 3.3 — Sensor de Emergência CNC

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

### Exercício 3.4 — Seleção de Material por Torque

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

### Exercício 3.5 — Homogeneidade de Eixos

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

### Mini-Projeto — Classificador de Materiais

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

### Exercício 3.6 — Conversor de Unidades com Funções

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

### Exercício 3.7 — Classificador de Solda com Funções

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

## Aula 04 — Estruturas de Dados

### Exercício 4.1 — Análise de Temperaturas

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

### Exercício 4.2 — Cadastro de Materiais

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

print("Materiais cadastrados")
for i, mat in enumerate(materiais, start=1):
    print(f"{i}. {mat['nome']}")
    print(f"  Densidade: {mat['densidade']} kg/m³")
    print(f"  Módulo de elasticidade: {mat['modulo_E']:,} MPa")
    print(f"  Limite de escoamento: {mat['escoamento']} MPa")
```

### Exercício 4.3 — Certificações de Operadores

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

print(f"Polivalentes (Torno e Fresa): {', '.join(operadores[op] for op in polivalentes)}")
print(f"Exclusivos do Torno: {', '.join(operadores[op] for op in exclusivos_torno)}")
print(f"Exclusivos da Fresa: {', '.join(operadores[op] for op in exclusivos_fresa)}")
print(f"Total de operadores na seção: {len(todos)}")
```

### Mini-Projeto — Catálogo de Materiais Interativo

```python
print("Catálogo de Materiais Interativo")

catalogo = {
    "aco_1020": {"nome": "Aço 1020", "densidade": 7850, "E": 210_000, "sigma_y": 350, "alpha": 11.7e-6},
    "al_6061": {"nome": "Alumínio 6061", "densidade": 2700, "E": 69_000, "sigma_y": 276, "alpha": 23.1e-6},
    "latao": {"nome": "Latão", "densidade": 8500, "E": 100_000, "sigma_y": 250, "alpha": 19.0e-6},
    "ti_6al4v": {"nome": "Titânio Ti-6Al-4V", "densidade": 4430, "E": 114_000, "sigma_y": 880, "alpha": 8.6e-6},
}

nomes = [m["nome"] for m in catalogo.values()]
print("Materiais:", nomes)

mat1 = input("Material principal: ")
print("Comparar com: [Nenhum] " + ", ".join(nomes))
comparacao = input("Comparar com: ")

m = catalogo[[k for k, v in catalogo.items() if v["nome"] == mat1][0]]

if comparacao == "Nenhum":
    print(mat1)
    print(f"Densidade: {m['densidade']} kg/m³")
    print(f"Módulo E: {m['E']:,} MPa")
    print(f"Limite de escoamento: {m['sigma_y']} MPa")
    print(f"Coef. dilatação: {m['alpha']*1e6:.1f} ×10⁻⁶/°C")
else:
    m2 = catalogo[[k for k, v in catalogo.items() if v["nome"] == comparacao][0]]

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

## Aula 05 — Laços + Persistência + Tabelas

### Exercício 5.1 — Tubulação com Sensores

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

### Exercício 5.2 — Simulação de Caldeira

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

### Exercício 5.3 — Custo de Combustível da Frota

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

### Exercício 5.4 — Autenticação PIN Técnico

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

### Exercício 5.5 — Controle de Estoque com JSON

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

estoque = carregar_estoque()

print("Controle de Estoque — Almoxarifado")

# Cadastrar item
print("Cadastrar item")
nome_item = input("Nome do item: ")
qtd_item = int(input("Quantidade: "))
if nome_item:
    estoque[nome_item] = estoque.get(nome_item, 0) + qtd_item
    salvar_estoque(estoque)
    print(f"{qtd_item}x {nome_item} cadastrado.")

# Retirar item
print("Retirar item")
if estoque:
    print("Itens:", list(estoque.keys()))
    nome_retirar = input("Item: ")
    qtd_retirar = int(input("Quantidade a retirar: "))
    if nome_retirar in estoque:
        if estoque[nome_retirar] >= qtd_retirar:
            estoque[nome_retirar] -= qtd_retirar
            if estoque[nome_retirar] == 0:
                del estoque[nome_retirar]
            salvar_estoque(estoque)
            print(f"{qtd_retirar}x {nome_retirar} retirado.")
        else:
            print(f"Saldo insuficiente. Disponível: {estoque[nome_retirar]}")

print("---------------------------")
print("Estoque atual")
if estoque:
    df = pd.DataFrame({"Item": list(estoque.keys()), "Quantidade": list(estoque.values())})
    print(df)
else:
    print("Estoque vazio.")
```

### Mini-Projeto — Dashboard de Sensores

```python
import pandas as pd
import json
import random

print("Dashboard de Sensores — Monitoramento Industrial")

LIMITE_TEMP = 180.0
LIMITE_PRESSAO = 7.0

sensores = [f"S{i+1:02d}" for i in range(10)]
temperaturas = [random.uniform(140, 170) for _ in range(10)]
pressao = [random.uniform(4.5, 6.0) for _ in range(10)]

# Simular algumas falhas
for i in range(10):
    if random.random() < 0.15:
        temperaturas[i] = random.uniform(175, 200)
    if random.random() < 0.15:
        pressao[i] = random.uniform(6.5, 8.0)

dados = {
    "sensores": sensores,
    "temperaturas": temperaturas,
    "pressao": pressao,
}

df = pd.DataFrame({
    "Sensor": dados["sensores"],
    "Temperatura (°C)": dados["temperaturas"],
    "Pressão (bar)": dados["pressao"],
})

print(df)

print("---------------------------")
print("Métricas")

temp_media = sum(dados["temperaturas"]) / len(dados["temperaturas"])
pressao_media = sum(dados["pressao"]) / len(dados["pressao"])
alertas_temp = sum(1 for t in dados["temperaturas"] if t > LIMITE_TEMP)
alertas_pressao = sum(1 for p in dados["pressao"] if p > LIMITE_PRESSAO)

print(f"Temp. média: {temp_media:.1f} °C")
print(f"Pressão média: {pressao_media:.2f} bar")
print(f"Sensores em alerta: {alertas_temp + alertas_pressao}")

if alertas_temp > 0 or alertas_pressao > 0:
    print("---------------------------")
    print("Alertas")
    for i, (s, t, p) in enumerate(zip(dados["sensores"], dados["temperaturas"], dados["pressao"])):
        if t > LIMITE_TEMP:
            print(f"{s}: Temperatura {t:.1f} °C — acima do limite ({LIMITE_TEMP} °C)!")
        if p > LIMITE_PRESSAO:
            print(f"{s}: Pressão {p:.2f} bar — acima do limite ({LIMITE_PRESSAO} bar)!")

with open("leituras_sensores.json", "w") as f:
    json.dump(dados, f, indent=4)
print("Dados salvos em leituras_sensores.json")
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