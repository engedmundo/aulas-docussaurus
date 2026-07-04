# Gabarito de Exercícios — Programação Aplicada

Este arquivo contém as soluções completas de todos os exercícios da disciplina. Cada exercício tem o código funcional pronto para executar com `streamlit run`.

---

## Aula 01 — Introdução + Streamlit

### Exercício 1.1 — Pressão de Pistão Hidráulico

```python
import streamlit as st
import math

st.title("Pressão de Pistão Hidráulico")
st.write("Calcula a pressão exercida por um pistão dado a força e o diâmetro do êmbolo.")

st.divider()

col1, col2 = st.columns(2)
with col1:
    F = st.number_input("Força F (N):", min_value=0.0, value=12000.0, step=1000.0)
with col2:
    d = st.number_input("Diâmetro d (mm):", min_value=0.1, value=40.0, step=5.0)

# Cálculo
d_m = d / 1000                          # mm → m
A = math.pi * d_m ** 2 / 4              # m²
P = F / A                               # Pa

st.divider()
st.subheader("Resultado")

col3, col4 = st.columns(2)
col3.metric("Área da seção", f"{A * 1e6:.2f} mm²")
col4.metric("Pressão", f"{P / 1e6:.2f} MPa")
```

---

## Aula 02 — Conceitos Básicos + Apps Interativos

### Exercício 2.1 — Média de Dureza Rockwell

```python
import streamlit as st

st.title("Controle de Qualidade — Dureza Rockwell")
st.write("Especificação mínima: **40 HRC**")

st.subheader("Medições do lote")
col1, col2, col3 = st.columns(3)
with col1:
    d1 = st.number_input("Medição 1 (HRC):", value=41.5, format="%.1f")
with col2:
    d2 = st.number_input("Medição 2 (HRC):", value=43.0, format="%.1f")
with col3:
    d3 = st.number_input("Medição 3 (HRC):", value=43.0, format="%.1f")

if st.button("Calcular média"):
    media = (d1 + d2 + d3) / 3
    st.metric("Média de dureza", f"{media:.2f} HRC")
```

### Exercício 2.2 — IMC do Operador

```python
import streamlit as st

st.title("IMC do Operador — NR-17")

col1, col2 = st.columns(2)
with col1:
    peso = st.number_input("Peso (kg):", min_value=30.0, max_value=200.0,
                            value=82.0, step=0.5)
with col2:
    altura = st.number_input("Altura (m):", min_value=1.0, max_value=2.5,
                              value=1.75, format="%.2f", step=0.01)

if st.button("Calcular IMC"):
    imc = peso / altura ** 2
    st.metric("IMC calculado", f"{imc:.2f}")
```

### Exercício 2.3 — Relação de Transmissão

```python
import streamlit as st

st.title("Redutor de Velocidade")

n_motor = st.number_input("Rotação do motor (RPM):", value=1750, step=10, format="%d")

col1, col2 = st.columns(2)
with col1:
    z_motriz = st.number_input("Dentes da engrenagem motriz:", value=20, min_value=1, format="%d")
with col2:
    z_movida = st.number_input("Dentes da engrenagem movida:", value=70, min_value=1, format="%d")

if st.button("Calcular"):
    i = z_movida / z_motriz
    n_saida = n_motor / i

    col3, col4 = st.columns(2)
    col3.metric("Relação de transmissão", f"{i:.2f}")
    col4.metric("Rotação de saída (RPM)", f"{n_saida:.1f}")
```

### Exercício 2.4 — Cilindro com Desperdício de Material

```python
import streamlit as st
import math

st.title("Cilindros Usinados — Custo e Aproveitamento")

col1, col2 = st.columns(2)
with col1:
    raio   = st.number_input("Raio do cilindro (m):", value=0.05, format="%.3f", step=0.005)
    altura = st.number_input("Altura do cilindro (m):", value=0.10, format="%.3f", step=0.01)
with col2:
    densidade = st.number_input("Densidade (kg/m³):", value=7850.0, step=50.0)
    preco_kg  = st.number_input("Preço do material (R$/kg):", value=15.0, step=0.5)

quantidade = st.number_input("Quantidade de peças:", value=10, min_value=1, format="%d")

if st.button("Calcular"):
    V_cil = math.pi * raio ** 2 * altura
    V_bloco = (2 * raio) ** 2 * altura

    m_final = V_cil * densidade
    m_cavaco = (V_bloco - V_cil) * densidade

    custo_total = m_final * preco_kg * quantidade
    valor_perdido = m_cavaco * preco_kg * quantidade
    aproveitamento = (m_final / (m_final + m_cavaco)) * 100

    st.divider()
    st.subheader("Resultados")

    col3, col4 = st.columns(2)
    col3.metric("Volume do cilindro", f"{V_cil:.6f} m³")
    col4.metric("Volume do bloco", f"{V_bloco:.6f} m³")

    col5, col6 = st.columns(2)
    col5.metric("Massa final", f"{m_final:.2f} kg")
    col6.metric("Massa de cavaco", f"{m_cavaco:.2f} kg")

    col7, col8 = st.columns(2)
    col7.metric("Custo total", f"R$ {custo_total:,.2f}")
    col8.metric("Valor perdido", f"R$ {valor_perdido:,.2f}")

    st.metric("Aproveitamento", f"{aproveitamento:.1f}%")
```

### Exercício 2.5 — Dilatação Térmica

```python
import streamlit as st

st.title("Dilatação Térmica Linear")

st.info("Coeficiente de dilatação do aço: α = 11.7 × 10⁻⁶ m/(m·°C)")

col1, col2, col3 = st.columns(3)
with col1:
    L0 = st.number_input("Comprimento inicial (m):", value=1.0, format="%.4f")
with col2:
    T0 = st.number_input("Temperatura inicial (°C):", value=25.0)
with col3:
    Tf = st.number_input("Temperatura final (°C):", value=100.0)

alpha = 11.7e-6   # m/(m·°C) — aço carbono

if st.button("Calcular dilatação"):
    delta_T = Tf - T0
    delta_L = L0 * alpha * delta_T
    Lf = L0 + delta_L
    var_pct = (delta_L / L0) * 100

    st.divider()
    st.subheader("Resultados")

    col4, col5 = st.columns(2)
    col4.metric("ΔT", f"{delta_T:.1f} °C")
    col5.metric("ΔL", f"{delta_L * 1000:.3f} mm")

    col6, col7 = st.columns(2)
    col6.metric("Lf", f"{Lf:.6f} m")
    col7.metric("Variação", f"{var_pct:.3f}%")
```

### Exercício 2.6 — Custo Operacional de Fresadora

```python
import streamlit as st

st.title("Custo Operacional — Fresadora CNC")

col1, col2 = st.columns(2)
with col1:
    potencia  = st.number_input("Potência da máquina (kW):", value=15.0, step=0.5)
    horas_dia = st.slider("Horas de operação por dia:", min_value=1, max_value=24, value=8)
with col2:
    dias   = st.number_input("Dias de operação no mês:", value=30, min_value=1, max_value=31, format="%d")
    tarifa = st.number_input("Tarifa de energia (R$/kWh):", value=0.70, format="%.3f")

if st.button("Calcular custo mensal"):
    E = potencia * horas_dia * dias
    custo_bruto = E * tarifa
    impostos = custo_bruto * 0.27
    custo_total = custo_bruto + impostos
    custo_hora = custo_total / (horas_dia * dias)

    st.divider()
    st.subheader("Resultados")

    col3, col4 = st.columns(2)
    col3.metric("Consumo mensal", f"{E:,.0f} kWh")
    col4.metric("Custo bruto", f"R$ {custo_bruto:,.2f}")

    col5, col6 = st.columns(2)
    col5.metric("Impostos (27%)", f"R$ {impostos:,.2f}")
    col6.metric("Custo total", f"R$ {custo_total:,.2f}")

    st.metric("Custo por hora", f"R$ {custo_hora:.2f}/h")
```

### Mini-Projeto — Calculadora de Usinagem

```python
import streamlit as st
import math

st.title("Calculadora de Torneamento")
st.write("Parâmetros de corte e custo para torneamento cilíndrico externo.")

st.subheader("Geometria e corte")
col1, col2 = st.columns(2)
with col1:
    d = st.number_input("Diâmetro da peça (mm):", min_value=1.0, value=60.0, step=1.0)
    n = st.number_input("Rotação (RPM):", min_value=1, value=1000, step=50, format="%d")
with col2:
    L = st.number_input("Comprimento usinado (mm):", min_value=1.0, value=250.0)
    f = st.number_input("Avanço (mm/rot):", min_value=0.01, value=0.15,
                         format="%.3f", step=0.01)

st.subheader("Material e custo")
col3, col4 = st.columns(2)
with col3:
    material = st.selectbox("Material:",
        ["Aço 1020 (7850)", "Alumínio 6061 (2700)", "Latão (8500)"])
with col4:
    custo_hora = st.number_input("Custo horário da máquina (R$/h):", value=80.0)
    preco_kg   = st.number_input("Preço do material (R$/kg):", value=12.0)

if st.button("Calcular"):
    densidades = {
        "Aço 1020 (7850)": 7850,
        "Alumínio 6061 (2700)": 2700,
        "Latão (8500)": 8500,
    }
    rho = densidades[material]

    # Velocidade de corte (m/min)
    Vc = math.pi * d * n / 1000

    # Tempo de corte (min)
    t = L / (f * n)

    # Massa da peça (kg) — d e L em mm, resultado em kg
    m = (math.pi * d ** 2 / 4) * L * rho * 1e-6

    # Custo total
    custo = (t * custo_hora / 60) + (m * preco_kg)

    st.divider()
    st.subheader("Resultados")

    col5, col6 = st.columns(2)
    col5.metric("Velocidade de corte", f"{Vc:.2f} m/min")
    col6.metric("Tempo de corte", f"{t:.2f} min")

    col7, col8 = st.columns(2)
    col7.metric("Massa da peça", f"{m:.3f} kg")
    col8.metric("Custo total", f"R$ {custo:.2f}")
```

---

## Aula 03 — Condicionais + Classificadores

### Exercício 3.1 — Prensa Hidráulica

```python
import streamlit as st

st.title("Prensa Hidráulica — Monitoramento de Segurança")
st.write("Sistema de verificação de condições para operação da prensa de 200 t.")

col1, col2 = st.columns(2)
with col1:
    pressao = st.number_input("Pressão do óleo (bar):", min_value=0.0, value=120.0, step=10.0)
with col2:
    grade_fechada = st.checkbox("Grade fechada", value=True)

if st.button("Verificar condições"):
    if not grade_fechada:
        st.error("Grade aberta! Operação bloqueada.")
    elif pressao < 50:
        st.warning("Pressão insuficiente. Aqueça o óleo.")
    elif pressao <= 150:
        st.success("Operação autorizada.")
    else:
        st.error("Sobrepressão! Acionando válvula de alívio.")
```

### Exercício 3.2 — Dureza do Aço

```python
import streamlit as st

st.title("Classificação de Dureza Brinell")
st.write("Especificação: dureza entre **200 e 240 HB** para peças de aço.")

dureza = st.number_input("Dureza Brinell (HB):", min_value=0.0, value=225.0, step=5.0)

if st.button("Classificar"):
    st.metric("Dureza medida", f"{dureza:.0f} HB")

    if dureza < 200:
        st.error("Peça Rejeitada: Material muito dúctil")
    elif dureza <= 240:
        st.success("Peça Aprovada: Dentro das especificações")
    else:
        st.error("Peça Rejeitada: Material muito frágil")
```

### Exercício 3.3 — Sensor de Emergência CNC

```python
import streamlit as st

st.title("Autenticação — Fresadora CNC 5 Eixos")
st.write("Verificação de credenciais e condições de segurança.")

col1, col2 = st.columns(2)
with col1:
    login = st.text_input("Login:")
    senha = st.text_input("Senha:", type="password")
with col2:
    emergencia = st.checkbox("Emergência acionada")

if st.button("Autenticar"):
    if login == "admin" and senha == "123456" and not emergencia:
        st.success("Sistema Iniciado. Fresadora pronta para operação.")
    else:
        st.error("ACESSO NEGADO: Verifique credenciais e sensor de emergência.")
```

### Exercício 3.4 — Seleção de Material por Torque

```python
import streamlit as st

st.title("Seleção de Material — Eixo de Transmissão")
st.write("Seleciona o material adequado com base no torque e calcula o custo.")

torque = st.slider("Torque requerido (Nm):", min_value=0, max_value=1000, value=250, step=10)

pagamento = st.radio(
    "Forma de pagamento:",
    ["PIX à vista (-10%)", "Cartão 30 dias (+5%)"]
)

if st.button("Selecionar material"):
    if torque < 100:
        material = "Polímero (POM)"
        custo_base = 50.0
    elif torque <= 500:
        material = "Alumínio 6061"
        custo_base = 150.0
    else:
        material = "Aço Liga 4340"
        custo_base = 300.0

    if pagamento == "PIX à vista (-10%)":
        custo_final = custo_base * 0.90
    else:
        custo_final = custo_base * 1.05

    st.divider()
    st.subheader("Resultado")

    col1, col2 = st.columns(2)
    col1.metric("Material selecionado", material)
    col2.metric("Custo base", f"R$ {custo_base:.2f}")

    col3, col4 = st.columns(2)
    col3.metric("Forma de pagamento", pagamento)
    col4.metric("Custo final", f"R$ {custo_final:.2f}")
```

### Exercício 3.5 — Homogeneidade de Eixos

```python
import streamlit as st

st.title("Controle de Qualidade — Homogeneidade de Eixos")
st.write("Verifica a dispersão de diâmetros em lotes de 3 peças.")

col1, col2, col3 = st.columns(3)
with col1:
    d1 = st.number_input("Diâmetro 1 (mm):", value=50.00, format="%.3f")
with col2:
    d2 = st.number_input("Diâmetro 2 (mm):", value=50.02, format="%.3f")
with col3:
    d3 = st.number_input("Diâmetro 3 (mm):", value=50.01, format="%.3f")

tolerancia = st.number_input("Tolerância máxima (mm):", value=0.05, format="%.3f", step=0.01)

if st.button("Verificar lote"):
    dispersao = max(d1, d2, d3) - min(d1, d2, d3)
    media = (d1 + d2 + d3) / 3

    st.divider()
    st.subheader("Resultados")

    col4, col5 = st.columns(2)
    col4.metric("Média do lote", f"{media:.3f} mm")
    col5.metric("Dispersão", f"{dispersao:.3f} mm")

    if dispersao >= tolerancia:
        st.error(f"Lote Reprovado: dispersão ({dispersao:.3f} mm) ≥ tolerância ({tolerancia:.3f} mm)")
    else:
        st.success(f"Lote Aprovado: dispersão ({dispersao:.3f} mm) < tolerância ({tolerancia:.3f} mm)")
```

### Mini-Projeto — Classificador de Materiais

```python
import streamlit as st

st.title("Classificador de Materiais")
st.write("Seleciona o material mais adequado para um componente mecânico.")

col1, col2 = st.columns(2)
with col1:
    tensao = st.number_input("Tensão atuante (MPa):", min_value=0.0, value=450.0, step=50.0)
    temperatura = st.number_input("Temperatura de operação (°C):", min_value=0.0, max_value=600.0, value=250.0, step=25.0)
with col2:
    ambiente = st.selectbox(
        "Ambiente de operação:",
        ["Seco", "Úmido", "Corrosivo"]
    )

if st.button("Selecionar material"):
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

    st.divider()
    st.subheader("Resultado")

    if materiais:
        st.success(f"Material recomendado: **{materiais[0]}**")
        if len(materiais) > 1:
            st.info(f"Opção backup: **{materiais[1]}**")
    else:
        st.warning("Nenhum material atende todas as condições especificadas. Revise os parâmetros.")
```

### Exercício 3.6 — Conversor de Unidades com Funções

```python
import streamlit as st

def psi_para_mpa(psi):
    """Converte pressão de psi para MPa."""
    return psi * 0.00689476

def pol_para_mm(pol):
    """Converte comprimento de polegadas para mm."""
    return pol * 25.4

def f_para_c(f):
    """Converte temperatura de °F para °C."""
    return (f - 32) * 5 / 9

st.title("Conversor de Unidades — Ensaios Mecânicos")

st.subheader("Pressão: psi → MPa")
psi = st.number_input("Valor em psi:", value=14500.0, step=1000.0)
st.metric("Resultado", f"{psi_para_mpa(psi):.2f} MPa")

st.divider()

st.subheader("Comprimento: pol → mm")
pol = st.number_input("Valor em polegadas:", value=2.5, step=0.1)
st.metric("Resultado", f"{pol_para_mm(pol):.2f} mm")

st.divider()

st.subheader("Temperatura: °F → °C")
f = st.number_input("Valor em °F:", value=212.0, step=10.0)
st.metric("Resultado", f"{f_para_c(f):.2f} °C")
```

### Exercício 3.7 — Classificador de Solda com Funções

```python
import streamlit as st

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

st.title("Classificador de Solda de Filete")
st.write("Avalia a qualidade da solda com base na perna medida.")

col1, col2 = st.columns(2)
with col1:
    nominal = st.number_input("Perna nominal (mm):", min_value=0.1, value=6.0, step=0.5)
    medida = st.number_input("Perna medida (mm):", min_value=0.1, value=5.8, step=0.1)
with col2:
    tolerancia = st.number_input("Tolerância (%):", min_value=1.0, value=10.0, step=1.0)

if st.button("Classificar solda"):
    desvio = calcular_desvio_percentual(medida, nominal)
    classificacao = classificar_solda(desvio, tolerancia)

    st.divider()
    st.subheader("Resultado")

    col3, col4 = st.columns(2)
    col3.metric("Desvio percentual", f"{desvio:.2f}%")
    col4.metric("Classificação", classificacao)

    if "Aprovada" in classificacao:
        st.success(classificacao)
    else:
        st.error(classificacao)
```

---

## Aula 04 — Estruturas de Dados

### Exercício 4.1 — Análise de Temperaturas

```python
import streamlit as st

st.title("Análise de Temperaturas — Ensaio Térmico")

temperaturas = [300, 320, 315, 310, 290]
st.write(f"Leituras registradas: {temperaturas}")

st.divider()
st.subheader("Resultados")

col1, col2 = st.columns(2)
col1.metric("Primeira temperatura", f"{temperaturas[0]} °C")
col2.metric("Última temperatura", f"{temperaturas[-1]} °C")

col3, col4 = st.columns(2)
delta_t = temperaturas[-1] - temperaturas[0]
col3.metric("Variação (ΔT)", f"{delta_t} °C")
col4.metric("Média", f"{sum(temperaturas)/len(temperaturas):.1f} °C")

col5, col6 = st.columns(2)
col5.metric("Máxima", f"{max(temperaturas)} °C")
col6.metric("Mínima", f"{min(temperaturas)} °C")

amplitude = max(temperaturas) - min(temperaturas)
st.metric("Amplitude", f"{amplitude} °C")
```

### Exercício 4.2 — Cadastro de Materiais

```python
import streamlit as st

st.title("Catálogo de Materiais")

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

st.subheader("Materiais cadastrados")
for i, mat in enumerate(materiais, start=1):
    st.write(f"**{i}. {mat['nome']}**")
    st.write(f"  Densidade: {mat['densidade']} kg/m³")
    st.write(f"  Módulo de elasticidade: {mat['modulo_E']:,} MPa")
    st.write(f"  Limite de escoamento: {mat['escoamento']} MPa")
    st.divider()
```

### Exercício 4.3 — Certificações de Operadores

```python
import streamlit as st

st.title("Certificações de Operadores")

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

st.subheader("Análise de certificações")

st.write(f"**Polivalentes (Torno e Fresa):** {', '.join(operadores[op] for op in polivalentes)}")
st.write(f"**Exclusivos do Torno:** {', '.join(operadores[op] for op in exclusivos_torno)}")
st.write(f"**Exclusivos da Fresa:** {', '.join(operadores[op] for op in exclusivos_fresa)}")
st.write(f"**Total de operadores na seção:** {len(todos)}")
```

### Mini-Projeto — Catálogo de Materiais Interativo

```python
import streamlit as st

st.title("Catálogo de Materiais Interativo")

catalogo = {
    "aco_1020": {"nome": "Aço 1020", "densidade": 7850, "E": 210_000, "sigma_y": 350, "alpha": 11.7e-6},
    "al_6061": {"nome": "Alumínio 6061", "densidade": 2700, "E": 69_000, "sigma_y": 276, "alpha": 23.1e-6},
    "latao": {"nome": "Latão", "densidade": 8500, "E": 100_000, "sigma_y": 250, "alpha": 19.0e-6},
    "ti_6al4v": {"nome": "Titânio Ti-6Al-4V", "densidade": 4430, "E": 114_000, "sigma_y": 880, "alpha": 8.6e-6},
}

nomes = [m["nome"] for m in catalogo.values()]

col1, col2 = st.columns(2)
with col1:
    mat1 = st.selectbox("Material principal:", nomes)
with col2:
    comparacao = st.radio("Comparar com:", ["Nenhum"] + nomes)

if st.button("Consultar"):
    m = catalogo[[k for k, v in catalogo.items() if v["nome"] == mat1][0]]

    if comparacao == "Nenhum":
        st.subheader(mat1)
        col3, col4 = st.columns(2)
        col3.metric("Densidade", f"{m['densidade']} kg/m³")
        col4.metric("Módulo E", f"{m['E']:,} MPa")
        col5, col6 = st.columns(2)
        col5.metric("Limite de escoamento", f"{m['sigma_y']} MPa")
        col6.metric("Coef. dilatação", f"{m['alpha']*1e6:.1f} ×10⁻⁶/°C")
    else:
        m2 = catalogo[[k for k, v in catalogo.items() if v["nome"] == comparacao][0]]

        st.subheader("Comparação de materiais")
        col3, col4 = st.columns(2)
        with col3:
            st.write(f"**{mat1}**")
            st.metric("Densidade", f"{m['densidade']} kg/m³")
            st.metric("Módulo E", f"{m['E']:,} MPa")
            st.metric("Limite de escoamento", f"{m['sigma_y']} MPa")
            st.metric("Coef. dilatação", f"{m['alpha']*1e6:.1f} ×10⁻⁶/°C")
        with col4:
            st.write(f"**{comparacao}**")
            st.metric("Densidade", f"{m2['densidade']} kg/m³")
            st.metric("Módulo E", f"{m2['E']:,} MPa")
            st.metric("Limite de escoamento", f"{m2['sigma_y']} MPa")
            st.metric("Coef. dilatação", f"{m2['alpha']*1e6:.1f} ×10⁻⁶/°C")
```

---

## Aula 05 — Laços + Persistência + Tabelas

### Exercício 5.1 — Tubulação com Sensores

```python
import streamlit as st
import random

st.title("Tubulação Industrial — Posições de Sensores")

posicoes = list(range(0, 301, 3))
st.write(f"Total de sensores: **{len(posicoes)}**")

st.divider()

col1, col2 = st.columns(2)
with col1:
    st.subheader("10 primeiros sensores")
    for p in posicoes[:10]:
        st.write(f"Posição {p} m")
with col2:
    st.subheader("10 últimos sensores")
    for p in posicoes[-10:]:
        st.write(f"Posição {p} m")

st.divider()

leituras = [random.uniform(140, 170) for _ in posicoes]
st.metric("Temperatura média", f"{sum(leituras)/len(leituras):.2f} °C")
```

### Exercício 5.2 — Simulação de Caldeira

```python
import streamlit as st

st.title("Simulação de Aquecimento — Caldeira")

col1, col2, col3 = st.columns(3)
with col1:
    t_inicial = st.number_input("Temperatura inicial (°C):", value=25.0)
with col2:
    t_alvo = st.number_input("Temperatura alvo (°C):", value=100.0)
with col3:
    taxa = st.number_input("Taxa de aquecimento (°C/min):", value=2.5, min_value=0.1)

if st.button("Simular aquecimento"):
    if t_inicial >= t_alvo:
        st.warning("Temperatura inicial já atingiu ou ultrapassou o alvo.")
    else:
        etapas = int((t_alvo - t_inicial) / taxa) + 1
        temperatura = t_inicial

        for i in range(1, etapas + 1):
            temperatura = t_inicial + i * taxa
            if temperatura > t_alvo:
                temperatura = t_alvo

        st.success(f"Temperatura alvo ({t_alvo} °C) atingida em **{etapas} minutos**.")
```

### Exercício 5.3 — Custo de Combustível da Frota

```python
import streamlit as st

st.title("Custo de Combustível — Frota de Veículos")

frota = [
    {"nome": "Caminhão A", "consumo": 6, "distancia": 3000},
    {"nome": "Van B", "consumo": 9, "distancia": 2000},
    {"nome": "Carro C", "consumo": 12, "distancia": 1500},
]

preco = st.number_input("Preço do combustível (R$/L):", value=5.50, format="%.2f")

if st.button("Calcular custos"):
    custo_total = 0

    for veiculo in frota:
        litros = veiculo["distancia"] / veiculo["consumo"]
        custo = litros * preco
        custo_total += custo
        st.write(f"**{veiculo['nome']}**: {litros:.1f} L → R$ {custo:.2f}")

    st.divider()
    st.metric("Custo total da frota", f"R$ {custo_total:.2f}")
```

### Exercício 5.4 — Autenticação PIN Técnico

```python
import streamlit as st

st.title("Autenticação — Célula Robotizada de Soldagem")

if "tentativas" not in st.session_state:
    st.session_state.tentativas = 3

if st.session_state.tentativas <= 0:
    st.error("ACESSO BLOQUEADO. Procure o supervisor.")
else:
    pin = st.text_input("PIN de 6 dígitos:", type="password")

    if st.button("Tentar acesso"):
        if pin == "123456":
            st.success("Acesso autorizado. Célula liberada.")
            st.session_state.tentativas = 3
        else:
            st.session_state.tentativas -= 1
            restantes = st.session_state.tentativas
            if restantes > 0:
                st.error(f"PIN incorreto. Tentativas restantes: {restantes}")
            else:
                st.error("ACESSO BLOQUEADO. Procure o supervisor.")

    st.write(f"Tentativas restantes: **{st.session_state.tentativas}**")
```

### Exercício 5.5 — Controle de Estoque com JSON

```python
import streamlit as st
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

st.title("Controle de Estoque — Almoxarifado")

col1, col2 = st.columns(2)
with col1:
    st.subheader("Cadastrar item")
    nome_item = st.text_input("Nome do item:")
    qtd_item = st.number_input("Quantidade:", min_value=1, value=1, format="%d")
    if st.button("Cadastrar"):
        if nome_item:
            estoque[nome_item] = estoque.get(nome_item, 0) + qtd_item
            salvar_estoque(estoque)
            st.success(f"{qtd_item}x {nome_item} cadastrado.")

with col2:
    st.subheader("Retirar item")
    nome_retirar = st.selectbox("Item:", list(estoque.keys()) if estoque else ["Nenhum item"])
    qtd_retirar = st.number_input("Quantidade a retirar:", min_value=1, value=1, format="%d")
    if st.button("Retirar"):
        if nome_retirar in estoque:
            if estoque[nome_retirar] >= qtd_retirar:
                estoque[nome_retirar] -= qtd_retirar
                if estoque[nome_retirar] == 0:
                    del estoque[nome_retirar]
                salvar_estoque(estoque)
                st.success(f"{qtd_retirar}x {nome_retirar} retirado.")
            else:
                st.error(f"Saldo insuficiente. Disponível: {estoque[nome_retirar]}")

st.divider()
st.subheader("Estoque atual")
if estoque:
    df = pd.DataFrame({"Item": list(estoque.keys()), "Quantidade": list(estoque.values())})
    st.dataframe(df)
else:
    st.write("Estoque vazio.")
```

### Mini-Projeto — Dashboard de Sensores

```python
import streamlit as st
import pandas as pd
import json
import random

st.title("Dashboard de Sensores — Monitoramento Industrial")

if "leituras" not in st.session_state:
    st.session_state.leituras = None

LIMITE_TEMP = 180.0
LIMITE_PRESSAO = 7.0

if st.button("Gerar leituras"):
    sensores = [f"S{i+1:02d}" for i in range(10)]
    temperaturas = [random.uniform(140, 170) for _ in range(10)]
    pressao = [random.uniform(4.5, 6.0) for _ in range(10)]

    # Simular algumas falhas
    for i in range(10):
        if random.random() < 0.15:
            temperaturas[i] = random.uniform(175, 200)
        if random.random() < 0.15:
            pressao[i] = random.uniform(6.5, 8.0)

    st.session_state.leituras = {
        "sensores": sensores,
        "temperaturas": temperaturas,
        "pressao": pressao,
    }

if st.session_state.leituras:
    dados = st.session_state.leituras
    df = pd.DataFrame({
        "Sensor": dados["sensores"],
        "Temperatura (°C)": dados["temperaturas"],
        "Pressão (bar)": dados["pressao"],
    })

    st.dataframe(df)

    st.divider()
    st.subheader("Métricas")

    temp_media = sum(dados["temperaturas"]) / len(dados["temperaturas"])
    pressao_media = sum(dados["pressao"]) / len(dados["pressao"])
    alertas_temp = sum(1 for t in dados["temperaturas"] if t > LIMITE_TEMP)
    alertas_pressao = sum(1 for p in dados["pressao"] if p > LIMITE_PRESSAO)

    col1, col2, col3 = st.columns(3)
    col1.metric("Temp. média", f"{temp_media:.1f} °C")
    col2.metric("Pressão média", f"{pressao_media:.2f} bar")
    col3.metric("Sensores em alerta", f"{alertas_temp + alertas_pressao}")

    if alertas_temp > 0 or alertas_pressao > 0:
        st.divider()
        st.subheader("Alertas")
        for i, (s, t, p) in enumerate(zip(dados["sensores"], dados["temperaturas"], dados["pressao"])):
            if t > LIMITE_TEMP:
                st.error(f"{s}: Temperatura {t:.1f} °C — acima do limite ({LIMITE_TEMP} °C)!")
            if p > LIMITE_PRESSAO:
                st.error(f"{s}: Pressão {p:.2f} bar — acima do limite ({LIMITE_PRESSAO} bar)!")

    if st.button("Salvar dados"):
        with open("leituras_sensores.json", "w") as f:
            json.dump(dados, f, indent=4)
        st.success("Dados salvos em leituras_sensores.json")
else:
    st.info("Clique em 'Gerar leituras' para iniciar o monitoramento.")
```

---

## Aula 06 — Pandas + NumPy Essencial

### Exercício 6.1 — Arrays de Posições de Sensores

```python
import streamlit as st
import numpy as np

st.title("Posições de Sensores — Viga de 300 m")

sensores_arange = np.arange(0, 301, 30)
sensores_linspace = np.linspace(0, 300, 5)

st.subheader("np.arange(0, 301, 30)")
st.write(f"Valores: {sensores_arange}")
st.write(f"Shape: {sensores_arange.shape} | Size: {sensores_arange.size} | Dtype: {sensores_arange.dtype}")

st.divider()

st.subheader("np.linspace(0, 300, 5)")
st.write(f"Valores: {sensores_linspace}")
st.write(f"Shape: {sensores_linspace.shape} | Size: {sensores_linspace.size} | Dtype: {sensores_linspace.dtype}")

st.divider()

col1, col2 = st.columns(2)
col1.metric("Sensores (arange)", len(sensores_arange))
col2.metric("Sensores (linspace)", len(sensores_linspace))
```

### Exercício 6.2 — Leitura de Sensores com `np.random`

```python
import streamlit as st
import numpy as np

st.title("Leituras de Termopar — Forno Industrial")

if "leituras" not in st.session_state:
    st.session_state.leituras = np.random.normal(loc=100, scale=5, size=100)

if st.button("Gerar novas leituras"):
    st.session_state.leituras = np.random.normal(loc=100, scale=5, size=100)
    st.rerun()

dados = st.session_state.leituras

st.line_chart(dados)

st.divider()

col1, col2, col3, col4 = st.columns(4)
col1.metric("Média", f"{np.mean(dados):.2f} °C")
col2.metric("Desvio padrão", f"{np.std(dados):.2f} °C")
col3.metric("Máximo", f"{np.max(dados):.2f} °C")
col4.metric("Mínimo", f"{np.min(dados):.2f} °C")
```

### Exercício 6.3 — Operações Vetorizadas (Conversão de Unidades)

```python
import streamlit as st
import numpy as np
import pandas as pd

st.title("Conversão de Temperaturas — Forno Industrial")

temp_C = np.array([25, 100, 200, 350, 500])
temp_K = temp_C + 273
temp_F = temp_C * 9/5 + 32

df = pd.DataFrame({
    "Celsius (°C)": temp_C,
    "Kelvin (K)": temp_K,
    "Fahrenheit (°F)": temp_F
})

st.dataframe(df, use_container_width=True)
```

### Exercício 6.4 — DataFrame de Materiais a partir de NumPy

```python
import streamlit as st
import numpy as np
import pandas as pd

st.title("Catálogo de Materiais — NumPy + Pandas")

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

st.dataframe(df, use_container_width=True)

st.divider()
st.subheader("Relação Módulo E / Densidade")
st.bar_chart(df.set_index("material")[["relacao"]])
```

### Exercício 6.5 — Estatísticas de Tração com NumPy

```python
import streamlit as st
import numpy as np

st.title("Ensaio de Tração — Análise Estatística")

tensao_max = np.array([410, 425, 395, 430, 415, 420, 405, 435, 400, 418])
alongamento = np.array([18, 20, 16, 22, 19, 21, 17, 23, 15, 20])

st.subheader("Tensão Máxima (MPa)")
col1, col2, col3 = st.columns(3)
col1.metric("Média", f"{np.mean(tensao_max):.1f} MPa")
col2.metric("Desvio padrão", f"{np.std(tensao_max):.2f} MPa")
col3.metric("Mediana", f"{np.median(tensao_max):.1f} MPa")

col4, col5 = st.columns(2)
col4.metric("Máximo", f"{np.max(tensao_max)} MPa")
col5.metric("Mínimo", f"{np.min(tensao_max)} MPa")

st.divider()
st.subheader("Alongamento (%)")
col6, col7, col8 = st.columns(3)
col6.metric("Média", f"{np.mean(alongamento):.1f} %")
col7.metric("Desvio padrão", f"{np.std(alongamento):.2f} %")
col8.metric("Mediana", f"{np.median(alongamento):.1f} %")

col9, col10 = st.columns(2)
col9.metric("Máximo", f"{np.max(alongamento)} %")
col10.metric("Mínimo", f"{np.min(alongamento)} %")

st.divider()
media = np.mean(tensao_max)
std = np.std(tensao_max)
if 380 <= media <= 420:
    st.success(f"Média = {media:.1f} MPa — dentro da especificação (400 ± 20 MPa).")
else:
    st.warning(f"Média = {media:.1f} MPa — fora da especificação (400 ± 20 MPa).")
```

### Exercício 6.6 — Simulação de Monte Carlo (Tensão × Carga)

```python
import streamlit as st
import numpy as np
import pandas as pd

st.title("Simulação de Monte Carlo — Tensão × Carga")

N = 1000
limite_escoamento = 300  # MPa

carga = np.random.normal(loc=50, scale=5, size=N)  # kN
area = np.random.normal(loc=200, scale=10, size=N)  # mm²

tensao = (carga * 1000) / area  # MPa

prob_falha = np.sum(tensao > limite_escoamento) / N * 100

col1, col2, col3 = st.columns(3)
col1.metric("Média da tensão", f"{np.mean(tensao):.1f} MPa")
col2.metric("Desvio padrão", f"{np.std(tensao):.1f} MPa")
col3.metric("Prob. de falha", f"{prob_falha:.1f}%")

st.divider()

df_hist = pd.DataFrame({"Tensão (MPa)": tensao})
st.bar_chart(df_hist)

st.divider()
st.write(f"Limite de escoamento: **{limite_escoamento} MPa**")
st.write(f"Cenários com σ > {limite_escoamento} MPa: **{int(np.sum(tensao > limite_escoamento))} de {N}**")
```

### Exercício 6.7 — Dashboard de Sensores com NumPy + Streamlit

```python
import streamlit as st
import numpy as np
import pandas as pd

st.title("Dashboard de Sensores")

tipo = st.selectbox("Tipo de sensor:", ["Temperatura", "Pressão", "Vibração"])
n_pontos = st.slider("Quantidade de pontos:", 10, 500, 100)

if st.button("Gerar leituras"):
    if tipo == "Temperatura":
        st.session_state.leituras = np.random.normal(loc=100, scale=5, size=n_pontos)
        st.session_state.unidade = "°C"
    elif tipo == "Pressão":
        st.session_state.leituras = np.random.uniform(4, 8, size=n_pontos)
        st.session_state.unidade = "bar"
    else:
        st.session_state.leituras = np.random.normal(loc=0.5, scale=0.1, size=n_pontos)
        st.session_state.unidade = "g"

if "leituras" in st.session_state:
    dados = st.session_state.leituras
    unidade = st.session_state.unidade

    st.line_chart(dados)

    st.divider()

    col1, col2, col3, col4 = st.columns(4)
    col1.metric("Média", f"{np.mean(dados):.2f} {unidade}")
    col2.metric("Desvio", f"{np.std(dados):.2f} {unidade}")
    col3.metric("Máximo", f"{np.max(dados):.2f} {unidade}")
    col4.metric("Mínimo", f"{np.min(dados):.2f} {unidade}")

    st.divider()
    df = pd.DataFrame({"Leitura": range(1, len(dados)+1), "Valor": dados})
    st.dataframe(df, use_container_width=True)
else:
    st.info("Selecione o tipo de sensor e clique em 'Gerar leituras'.")
```

### Mini-Projeto — Analisador de Ensaios Mecânicos

```python
import streamlit as st
import numpy as np
import pandas as pd

st.title("Analisador de Ensaios Mecânicos")

materiais = {
    "Aço": {"tensao_mu": 420, "tensao_sigma": 25, "E_mu": 210, "E_sigma": 10, "densidade": 7850},
    "Alumínio": {"tensao_mu": 280, "tensao_sigma": 20, "E_mu": 70, "E_sigma": 8, "densidade": 2700},
    "Latão": {"tensao_mu": 350, "tensao_sigma": 30, "E_mu": 100, "E_sigma": 12, "densidade": 8500},
    "Titânio": {"tensao_mu": 520, "tensao_sigma": 35, "E_mu": 115, "E_sigma": 10, "densidade": 4430},
}

N = 20

if "dados" not in st.session_state:
    np.random.seed(42)
    linhas = []
    for mat, p in materiais.items():
        linhas.append(pd.DataFrame({
            "material": [mat] * N,
            "tensao_max": np.random.normal(p["tensao_mu"], p["tensao_sigma"], N),
            "modulo_E": np.random.normal(p["E_mu"], p["E_sigma"], N),
            "densidade": [p["densidade"]] * N,
        }))
    st.session_state.dados = pd.concat(linhas, ignore_index=True)
    st.session_state.dados["resistencia_especifica"] = (
        st.session_state.dados["tensao_max"] / st.session_state.dados["densidade"] * 1000
    )

df = st.session_state.dados

if st.button("Regenerar dados"):
    linhas = []
    for mat, p in materiais.items():
        linhas.append(pd.DataFrame({
            "material": [mat] * N,
            "tensao_max": np.random.normal(p["tensao_mu"], p["tensao_sigma"], N),
            "modulo_E": np.random.normal(p["E_mu"], p["E_sigma"], N),
            "densidade": [p["densidade"]] * N,
        }))
    novo_df = pd.concat(linhas, ignore_index=True)
    novo_df["resistencia_especifica"] = novo_df["tensao_max"] / novo_df["densidade"] * 1000
    st.session_state.dados = novo_df
    st.rerun()

st.subheader("Tabela de Dados")
st.dataframe(df, use_container_width=True)

st.divider()
st.subheader("Estatísticas por Material")

estats = df.groupby("material").agg(
    tensao_media=("tensao_max", "mean"),
    tensao_std=("tensao_max", "std"),
    E_medio=("modulo_E", "mean"),
    resist_especifica_media=("resistencia_especifica", "mean"),
).reset_index()

st.dataframe(estats, use_container_width=True)

st.divider()
st.subheader("Tensão Média por Material")
st.bar_chart(estats.set_index("material")[["tensao_media"]])

st.divider()
st.subheader("Resistência Específica por Material")
st.bar_chart(estats.set_index("material")[["resist_especifica_media"]])

st.divider()
csv = df.to_csv(index=False).encode("utf-8")
st.download_button("Exportar CSV", csv, "ensaios_mecanicos.csv", "text/csv")
```

---

## Aula 07 — POO Essencial para Engenharia

### Exercício 7.1 — Classe Aluno

```python
import streamlit as st

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

st.title("Sistema de Avaliação — Alunos")

if "alunos" not in st.session_state:
    st.session_state.alunos = [
        Aluno("João", [8, 7, 6, 5, 4, 3]),
        Aluno("Maria", [10, 9, 8, 7, 6, 5]),
        Aluno("José", [5, 4, 3, 2, 1, 0]),
    ]

nomes = [a.nome for a in st.session_state.alunos]
escolha = st.selectbox("Selecione o aluno:", nomes)

if st.button("Calcular"):
    aluno = next(a for a in st.session_state.alunos if a.nome == escolha)
    media = aluno.calcular_media()
    situacao = aluno.exibir_situacao()

    st.metric("Média", f"{media:.1f}")
    st.metric("Situação", situacao)

    st.write(f"**Notas:** {aluno.notas}")

    if situacao == "Exame Final":
        nota_exame = st.number_input("Nota do exame:", min_value=0.0, max_value=10.0, value=5.0)
        media_final = aluno.calcular_media_exame(nota_exame)
        st.metric("Média final (com exame)", f"{media_final:.1f}")
```

### Exercício 7.2 — Classe Calculadora

```python
import streamlit as st

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

st.title("Calculadora Científica")

col1, col2 = st.columns(2)
with col1:
    op1 = st.number_input("Operando 1:", value=10.0)
with col2:
    op2 = st.number_input("Operando 2:", value=5.0)

operacao = st.selectbox("Operação:", ["+", "−", "×", "÷", "^"])

if st.button("Calcular"):
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
            st.error("Erro: divisão por zero!")
            st.stop()
    else:
        resultado = calc.calcular_potencia()

    st.metric("Resultado", f"{resultado:.4f}")
```

### Exercício 7.3 — Classe Carro

```python
import streamlit as st

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

st.title("Simulador de Veículo")

if "carro" not in st.session_state:
    st.session_state.carro = Carro(consumo=12)

carro = st.session_state.carro

col1, col2 = st.columns(2)
with col1:
    litros = st.number_input("Abastecer (L):", min_value=0.0, value=0.0, step=1.0)
    if st.button("Abastecer"):
        msg = carro.abastecer(litros)
        if "inválida" in msg:
            st.error(msg)
        else:
            st.success(msg)

with col2:
    distancia = st.number_input("Andar (km):", min_value=0.0, value=0.0, step=10.0)
    if st.button("Andar"):
        msg = carro.andar(distancia)
        if "insuficiente" in msg or "inválida" in msg:
            st.warning(msg)
        else:
            st.success(msg)

st.divider()
combustivel = carro.exibir_combustivel()
st.metric("Combustível no tanque", f"{combustivel:.1f} L / {carro.tanque_max} L")
st.progress(combustivel / carro.tanque_max)
```

### Exercício 7.4 — Sistema Bancário

```python
import streamlit as st

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

st.title("Sistema Bancário")

if "clientes" not in st.session_state:
    st.session_state.clientes = []
if "contas" not in st.session_state:
    st.session_state.contas = []
if "prox_num" not in st.session_state:
    st.session_state.prox_num = 1

menu = st.sidebar.radio("Menu:", ["Criar Cliente", "Criar Conta", "Operações", "Listar"])

if menu == "Criar Cliente":
    st.subheader("Novo Cliente")
    nome = st.text_input("Nome:")
    cpf = st.text_input("CPF:")
    if st.button("Cadastrar Cliente"):
        if nome and cpf:
            st.session_state.clientes.append(Cliente(nome, cpf))
            st.success(f"Cliente {nome} cadastrado.")
        else:
            st.error("Preencha todos os campos.")

elif menu == "Criar Conta":
    st.subheader("Nova Conta")
    if not st.session_state.clientes:
        st.warning("Cadastre um cliente primeiro.")
    else:
        nomes = [c.nome for c in st.session_state.clientes]
        escolha = st.selectbox("Titular:", nomes)
        saldo_inicial = st.number_input("Saldo inicial (R$):", min_value=0.0, value=0.0)
        if st.button("Criar Conta"):
            cliente = next(c for c in st.session_state.clientes if c.nome == escolha)
            conta = Conta(cliente, st.session_state.prox_num, saldo_inicial)
            st.session_state.contas.append(conta)
            st.session_state.prox_num += 1
            st.success(f"Conta {conta.numero} criada para {cliente.nome}.")

elif menu == "Operações":
    st.subheader("Operações Bancárias")
    if not st.session_state.contas:
        st.warning("Nenhuma conta cadastrada.")
    else:
        numeros = [f"Conta {c.numero} — {c.titular.nome}" for c in st.session_state.contas]
        escolha = st.selectbox("Conta:", numeros)
        conta = st.session_state.contas[numeros.index(escolha)]

        st.metric("Saldo atual", f"R$ {conta.exibir_saldo():.2f}")

        operacao = st.radio("Operação:", ["Depositar", "Sacar", "Transferir"])
        valor = st.number_input("Valor (R$):", min_value=0.01, value=100.0)

        if operacao == "Depositar":
            if st.button("Depositar"):
                if conta.depositar(valor):
                    st.success(f"R$ {valor:.2f} depositado.")
        elif operacao == "Sacar":
            if st.button("Sacar"):
                if conta.sacar(valor):
                    st.success(f"R$ {valor:.2f} sacado.")
                else:
                    st.error("Saldo insuficiente.")
        else:
            if len(st.session_state.contas) < 2:
                st.warning("Precisa de pelo menos 2 contas para transferir.")
            else:
                destinos = [f"Conta {c.numero} — {c.titular.nome}" for c in st.session_state.contas if c != conta]
                dest_escolha = st.selectbox("Conta destino:", destinos)
                destino = st.session_state.contas[destinos.index(dest_escolha)]
                if st.button("Transferir"):
                    if conta.transferir(destino, valor):
                        st.success(f"R$ {valor:.2f} transferido.")
                    else:
                        st.error("Saldo insuficiente.")

elif menu == "Listar":
    st.subheader("Contas Cadastradas")
    if not st.session_state.contas:
        st.info("Nenhuma conta cadastrada.")
    else:
        for c in st.session_state.contas:
            st.write(f"**Conta {c.numero}** — {c.titular.nome} (CPF: {c.titular.cpf}) — Saldo: R$ {c.saldo:.2f}")
```

### Exercício 7.5 — Classe Cliente (Abstração)

```python
import streamlit as st

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

st.title("Cadastro de Clientes")

if "clientes" not in st.session_state:
    st.session_state.clientes = []

with st.form("form_cliente"):
    nome = st.text_input("Nome:")
    cpf = st.text_input("CPF:")
    endereco = st.text_input("Endereço:")
    submit = st.form_submit_button("Cadastrar")

if submit:
    if nome and cpf and endereco:
        st.session_state.clientes.append(Cliente(nome, cpf, endereco))
        st.success(f"Cliente {nome} cadastrado.")
    else:
        st.error("Preencha todos os campos.")

st.divider()
st.subheader("Clientes Cadastrados")
if st.session_state.clientes:
    for c in st.session_state.clientes:
        st.write(f"**{c.nome}** — CPF: {c.cpf} — Endereço: {c.endereco}")
else:
    st.info("Nenhum cliente cadastrado.")
```

### Exercício 7.6 — ContaBancaria Encapsulada

```python
import streamlit as st

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

st.title("Conta Bancária Encapsulada")

if "contas_enc" not in st.session_state:
    st.session_state.contas_enc = []
if "prox_num_enc" not in st.session_state:
    st.session_state.prox_num_enc = 1

menu = st.sidebar.radio("Menu:", ["Criar Conta", "Operações", "Listar"])

if menu == "Criar Conta":
    st.subheader("Nova Conta")
    titular = st.text_input("Titular:")
    saldo = st.number_input("Saldo inicial (R$):", min_value=0.0, value=0.0)
    if st.button("Criar"):
        if titular:
            st.session_state.contas_enc.append(ContaBancaria(titular, saldo))
            st.success(f"Conta de {titular} criada.")
        else:
            st.error("Informe o titular.")

elif menu == "Operações":
    st.subheader("Operações")
    if not st.session_state.contas_enc:
        st.warning("Nenhuma conta.")
    else:
        nomes = [c.titular for c in st.session_state.contas_enc]
        escolha = st.selectbox("Conta:", nomes)
        conta = st.session_state.contas_enc[nomes.index(escolha)]

        st.metric("Saldo", f"R$ {conta.saldo:.2f}")

        operacao = st.radio("Operação:", ["Depositar", "Sacar", "Transferir"])
        valor = st.number_input("Valor (R$):", min_value=0.01, value=100.0)

        if operacao == "Depositar":
            if st.button("Depositar"):
                if conta.depositar(valor):
                    st.success("Depósito realizado.")
        elif operacao == "Sacar":
            if st.button("Sacar"):
                if conta.sacar(valor):
                    st.success("Saque realizado.")
                else:
                    st.error("Saldo insuficiente.")
        else:
            if len(st.session_state.contas_enc) < 2:
                st.warning("Precisa de 2+ contas.")
            else:
                destinos = [c.titular for c in st.session_state.contas_enc if c != conta]
                dest = st.selectbox("Destino:", destinos)
                destino = st.session_state.contas_enc[destinos.index(dest)]
                if st.button("Transferir"):
                    if conta.transferir(destino, valor):
                        st.success("Transferência realizada.")
                    else:
                        st.error("Saldo insuficiente.")

elif menu == "Listar":
    st.subheader("Contas")
    for c in st.session_state.contas_enc:
        st.write(f"**{c.titular}** — Saldo: R$ {c.saldo:.2f}")
```

### Exercício 7.7 — Animal → Cachorro / Gato

```python
import streamlit as st

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

st.title("Pet Shop — Cadastro de Animais")

if "animais" not in st.session_state:
    st.session_state.animais = []

tipo = st.selectbox("Tipo:", ["Cachorro", "Gato"])

with st.form("form_animal"):
    nome = st.text_input("Nome:")
    idade = st.number_input("Idade (anos):", min_value=0, max_value=30, value=1)
    if tipo == "Cachorro":
        extra = st.text_input("Raça:")
    else:
        extra = st.text_input("Cor:")
    submit = st.form_submit_button("Cadastrar")

if submit:
    if nome and extra:
        if tipo == "Cachorro":
            st.session_state.animais.append(Cachorro(nome, idade, extra))
        else:
            st.session_state.animais.append(Gato(nome, idade, extra))
        st.success(f"{tipo} {nome} cadastrado.")
    else:
        st.error("Preencha todos os campos.")

st.divider()
st.subheader("Animais Cadastrados")
if st.session_state.animais:
    nomes = [a.nome for a in st.session_state.animais]
    escolha = st.selectbox("Selecionar:", nomes)
    animal = next(a for a in st.session_state.animais if a.nome == escolha)

    st.write(f"**{animal.nome}** — {animal.idade} anos")
    if isinstance(animal, Cachorro):
        st.write(f"Raça: {animal.raca}")
    else:
        st.write(f"Cor: {animal.cor}")

    col1, col2 = st.columns(2)
    with col1:
        if st.button("Comer"):
            st.info(animal.comer())
    with col2:
        if isinstance(animal, Cachorro):
            if st.button("Latir"):
                st.info(animal.latir())
        else:
            if st.button("Miar"):
                st.info(animal.miar())
else:
    st.info("Nenhum animal cadastrado.")
```

### Exercício 7.8 — Veiculo Polimórfico

```python
import streamlit as st

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

st.title("Veículos Polimórficos")

if "veiculos" not in st.session_state:
    st.session_state.veiculos = []

tipo = st.selectbox("Tipo de veículo:", ["Carro", "Moto", "Avião"])
nome = st.text_input("Nome/Identificação:")

if st.button("Cadastrar"):
    if nome:
        if tipo == "Carro":
            st.session_state.veiculos.append(("Carro", Carro(), nome))
        elif tipo == "Moto":
            st.session_state.veiculos.append(("Moto", Moto(), nome))
        else:
            st.session_state.veiculos.append(("Avião", Aviao(), nome))
        st.success(f"{tipo} '{nome}' cadastrado.")
    else:
        st.error("Informe o nome.")

st.divider()
st.subheader("Veículos Cadastrados")
if st.session_state.veiculos:
    for tipo_v, veiculo, nome_v in st.session_state.veiculos:
        col1, col2 = st.columns([3, 1])
        col1.write(f"**{nome_v}** ({tipo_v})")
        if col2.button("Mover", key=nome_v):
            st.success(veiculo.mover())
else:
    st.info("Nenhum veículo cadastrado.")
```

### Exercício 7.9 — Estoque de Peças

```python
import streamlit as st
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

st.title("Estoque de Peças")

if "estoque" not in st.session_state:
    st.session_state.estoque = Estoque()
if "prox_cod" not in st.session_state:
    st.session_state.prox_cod = 1

estoque = st.session_state.estoque

tipo = st.selectbox("Tipo:", ["Parafuso", "Rolamento"])

with st.form("form_peca"):
    descricao = st.text_input("Descrição:")
    qtd = st.number_input("Quantidade:", min_value=1, value=10, format="%d")
    if tipo == "Parafuso":
        diam = st.number_input("Diâmetro (mm):", value=8.0)
        comp = st.number_input("Comprimento (mm):", value=30.0)
    else:
        tipo_rol = st.selectbox("Tipo de rolamento:", ["Esférico", "Rolo", "Agulha"])
        dext = st.number_input("Diâmetro externo (mm):", value=22.0)
    submit = st.form_submit_button("Adicionar")

if submit:
    if descricao:
        cod = f"P{st.session_state.prox_cod:03d}"
        if tipo == "Parafuso":
            p = Parafuso(cod, descricao, diam, comp, qtd)
        else:
            p = Rolamento(cod, descricao, tipo_rol, dext, qtd)
        estoque.add_peca(p)
        st.session_state.prox_cod += 1
        st.success(f"Peça {cod} adicionada.")
    else:
        st.error("Informe a descrição.")

st.divider()
st.subheader("Estoque Atual")
lista = estoque.listar()
if lista:
    for info in lista:
        st.write(info)

    st.divider()
    st.subheader("Retirar Peça")
    pecas_disp = [(p._codigo, p.descricao) for p in estoque._pecas if p.qtd > 0]
    if pecas_disp:
        codigos = [f"{c} — {d}" for c, d in pecas_disp]
        escolha = st.selectbox("Peça:", codigos)
        cod_escolhido = escolha.split(" — ")[0]
        qtd_ret = st.number_input("Quantidade a retirar:", min_value=1, value=1, format="%d")
        if st.button("Retirar"):
            peca = estoque.consultar(cod_escolhido)
            if peca and peca.remove(qtd_ret):
                st.success(f"{qtd_ret}x {peca.descricao} retirado.")
            else:
                st.error("Quantidade insuficiente.")
    else:
        st.info("Nenhuma peça disponível para retirada.")
else:
    st.info("Estoque vazio.")
```

### Exercício 7.10 — Controle de Manutenção

```python
import streamlit as st
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

st.title("Controle de Manutenção")

if "controle" not in st.session_state:
    st.session_state.controle = ControleManutencao()
if "prox_id" not in st.session_state:
    st.session_state.prox_id = 1

controle = st.session_state.controle

tipo = st.selectbox("Tipo de máquina:", ["Torno", "Fresa"])

with st.form("form_maquina"):
    nome = st.text_input("Nome:")
    ultima = st.date_input("Última manutenção:", value=datetime.now())
    submit = st.form_submit_button("Cadastrar")

if submit:
    if nome:
        id_ = f"M{st.session_state.prox_id:03d}"
        if tipo == "Torno":
            m = Torno(id_, nome, ultima)
        else:
            m = Fresa(id_, nome, ultima)
        controle.add_maquina(m)
        st.session_state.prox_id += 1
        st.success(f"{tipo} '{nome}' cadastrado.")
    else:
        st.error("Informe o nome.")

st.divider()
st.subheader("Máquinas Cadastradas")
maquinas = controle.listar()
if maquinas:
    hoje = datetime.now().date()
    for m in maquinas:
        proxima = m.calcular_proxima_manutencao().date()
        dias_restantes = (proxima - hoje).days

        col1, col2, col3 = st.columns(3)
        col1.write(f"**{m.nome}** ({m.tipo()})")
        col2.write(f"Última: {m.ultima_manutencao.strftime('%d/%m/%Y')}")
        col3.write(f"Próxima: {proxima.strftime('%d/%m/%Y')}")

        if dias_restantes < 0:
            st.error(f"⚠ {m.nome} — Manutenção atrasada há {abs(dias_restantes)} dias!")
        elif dias_restantes <= 7:
            st.warning(f"{m.nome} — Manutenção em {dias_restantes} dias.")
        else:
            st.info(f"{m.nome} — Próxima em {dias_restantes} dias.")

        st.divider()
else:
    st.info("Nenhuma máquina cadastrada.")
```

---

## Aula 08 — Pandas Aplicado + Visualização

### Exercício 8.1 — Carregar e Limpar Dados de Ensaios

```python
import streamlit as st
import pandas as pd

st.title("Limpeza de Dados — Ensaios Mecânicos")

dados = {
    "amostra": ["CP-01","CP-02","CP-03","CP-04","CP-05"],
    "material": ["Aço","Alumínio","Aço",None,"Latão"],
    "tensao_max": [450, 240, None, 320, 200],
    "modulo_E": [210000, 69000, 205000, None, 97000],
    "alongamento": [12.5, 18.0, 10.2, 15.8, None],
    "dureza": [180, 95, None, None, 110]
}

if "df_original" not in st.session_state:
    st.session_state.df_original = pd.DataFrame(dados)

df = st.session_state.df_original.copy()

st.subheader("Dados Originais")
st.dataframe(df, use_container_width=True)
st.write(f"Nulos por coluna: {df.isna().sum().to_dict()}")

st.divider()
st.subheader("Opções de Limpeza")

remover_nulos = st.checkbox("Remover linhas com nulos (dropna)")

if not remover_nulos:
    estrategia = st.radio("Preencher nulos com:", ["Média", "Zero", "Não preencher"])
    colunas_sel = st.multiselect("Colunas a preencher:", list(df.columns), default=list(df.columns))

if st.button("Aplicar Limpeza"):
    df_limpo = df.copy()

    if remover_nulos:
        df_limpo = df_limpo.dropna()
        st.success(f"Removidas {len(df) - len(df_limpo)} linhas com nulos.")
    else:
        if estrategia == "Média":
            for col in colunas_sel:
                if df_limpo[col].isna().any() and df_limpo[col].dtype in ("float64", "int64"):
                    df_limpo[col] = df_limpo[col].fillna(df_limpo[col].mean())
        elif estrategia == "Zero":
            for col in colunas_sel:
                if df_limpo[col].isna().any():
                    df_limpo[col] = df_limpo[col].fillna(0)

    st.subheader("Dados Limpos")
    st.dataframe(df_limpo, use_container_width=True)
    st.write(f"Nulos restantes: {df_limpo.isna().sum().to_dict()}")
```

### Exercício 8.2 — Filtrar Materiais por Propriedade

```python
import streamlit as st
import pandas as pd
import numpy as np

st.title("Filtro de Materiais por Propriedade")

if "df_materiais" not in st.session_state:
    np.random.seed(42)
    materiais_list = ["Aço 1020","Aço 4140","Al 6061","Al 7075","Latão","Bronze","Titânio Ti-6Al-4V","PVC","Cobre","Inconel"]
    df = pd.DataFrame({
        "material": np.random.choice(materiais_list, 20),
        "tensao_max": np.random.uniform(150, 600, 20),
        "modulo_E": np.random.uniform(3, 210, 20),
        "dureza": np.random.uniform(50, 300, 20),
    })
    st.session_state.df_materiais = df

df = st.session_state.df_materiais

st.subheader("Filtros")
faixa = st.slider("Faixa de tensão máxima (MPa):", 0.0, 700.0, (100.0, 500.0))
tipos = ["Todos"] + sorted(df["material"].unique().tolist())
tipo_sel = st.selectbox("Tipo de material:", tipos)

df_filtrado = df[df["tensao_max"].between(*faixa)]
if tipo_sel != "Todos":
    df_filtrado = df_filtrado[df_filtrado["material"].str.contains(tipo_sel, case=False, na=False)]

st.metric("Materiais encontrados", len(df_filtrado))
st.dataframe(df_filtrado, use_container_width=True)
```

### Exercício 8.3 — Estatísticas por Grupo (GroupBy)

```python
import streamlit as st
import pandas as pd
import numpy as np

st.title("Estatísticas por Grupo — GroupBy")

if "df_ensaios" not in st.session_state:
    materiais = {
        "Aço": {"mu": 420, "sigma": 25},
        "Alumínio": {"mu": 280, "sigma": 20},
        "Latão": {"mu": 350, "sigma": 30},
    }
    linhas = []
    for mat, p in materiais.items():
        for _ in range(20):
            linhas.append({"material": mat, "tensao_max": np.random.normal(p["mu"], p["sigma"])})
    st.session_state.df_ensaios = pd.DataFrame(linhas)

df = st.session_state.df_ensaios

coluna = st.selectbox("Coluna alvo:", ["tensao_max"])

estats = df.groupby("material")[coluna].agg(["mean","std","min","max","count"]).reset_index()
estats.columns = ["material","Média","Desvio","Mínimo","Máximo","Contagem"]

st.subheader("Estatísticas Descritivas")
st.dataframe(estats, use_container_width=True)

st.subheader("Média por Material")
st.bar_chart(estats.set_index("material")[["Média"]])

melhor = estats.loc[estats["Média"].idxmax(), "material"]
st.success(f"Material com melhor desempenho: **{melhor}** (média = {estats['Média'].max():.1f})")
```

### Exercício 8.4 — Merge de Dados de Material + Fornecedor

```python
import streamlit as st
import pandas as pd

st.title("Merge — Material + Fornecedor")

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

st.dataframe(df[["nome","preco_kg","densidade","custo_peca","prazo_dias"]], use_container_width=True)

mais_barato = df.loc[df["custo_peca"].idxmin(), "nome"]
mais_caro = df.loc[df["custo_peca"].idxmax(), "nome"]

st.success(f"Mais barato por cm³: **{mais_barato}** (R$ {df['custo_peca'].min():.2f})")
st.warning(f"Mais caro por cm³: **{mais_caro}** (R$ {df['custo_peca'].max():.2f})")
```

### Exercício 8.5 — Pivot Table de Produção Mensal

```python
import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

st.title("Pivot Table — Produção Mensal")

np.random.seed(42)
meses = ["Jan","Fev","Mar"] * 30
maquinas = np.random.choice(["M1","M2","M3"], 90)
pecas = np.random.randint(80, 150, 90)

df = pd.DataFrame({"mes": meses, "maquina": maquinas, "pecas": pecas})

pivot = df.pivot_table(index="mes", columns="maquina", values="pecas", aggfunc="sum")
pivot["Total"] = pivot.sum(axis=1)

st.subheader("Tabela Pivot — Produção por Mês e Máquina")
st.dataframe(pivot, use_container_width=True)

st.subheader("Heatmap de Produção")
fig, ax = plt.subplots(figsize=(6, 3))
pivot_sem_total = pivot.drop(columns=["Total"])
sns.heatmap(pivot_sem_total, annot=True, fmt=".0f", cmap="YlOrRd", ax=ax)
ax.set_title("Produção (peças)")
st.pyplot(fig)

mais_prod = pivot.idxmax(axis=1)
for mes, maq in mais_prod.items():
    st.write(f"**{mes}**: máquina mais produtiva = **{maq}** ({pivot.loc[mes, maq]} peças)")
```

### Exercício 8.6 — Correlação de Propriedades (seaborn)

```python
import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

st.title("Correlação de Propriedades")

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

fig, ax = plt.subplots(figsize=(7, 5))
sns.heatmap(corr, annot=True, cmap="RdBu_r", fmt=".2f", ax=ax)
ax.set_title("Matriz de Correlação")
st.pyplot(fig)

st.divider()
st.subheader("Interpretação")

matriz = corr.values
cols = corr.columns
for i in range(len(cols)):
    for j in range(i+1, len(cols)):
        val = matriz[i, j]
        if abs(val) > 0.7:
            direcao = "positiva" if val > 0 else "negativa"
            st.write(f"**{cols[i]}** × **{cols[j]}**: correlação {direcao} forte (r = {val:.2f})")
```

### Exercício 8.7 — Dashboard de Qualidade (CEP)

```python
import streamlit as st
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

st.title("Controle Estatístico de Processo (CEP)")

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

col1, col2, col3, col4 = st.columns(4)
col1.metric("Média", f"{media:.4f} mm")
col2.metric("σ", f"{sigma:.4f} mm")
col3.metric("Cp", f"{Cp:.2f}")
col4.metric("Cpk", f"{Cpk:.2f}")

if Cp > 1.33:
    st.success(f"Cp = {Cp:.2f} > 1.33 → Processo **capaz**.")
else:
    st.warning(f"Cp = {Cp:.2f} ≤ 1.33 → Processo **não capaz**.")

fig, axes = plt.subplots(1, 2, figsize=(12, 4))

axes[0].hist(medidas, bins=15, edgecolor="black", alpha=0.7)
axes[0].axvline(LIE, color="red", linestyle="--", label=f"LIE = {LIE}")
axes[0].axvline(LSE, color="red", linestyle="--", label=f"LSE = {LSE}")
axes[0].axvline(alvo, color="green", linestyle="-", label=f"Alvo = {alvo}")
axes[0].set_xlabel("Diâmetro (mm)")
axes[0].set_ylabel("Frequência")
axes[0].legend()
axes[0].set_title("Histograma")

axes[1].boxplot([medidas[batches == b] for b in range(1, 7)], labels=[f"B{i}" for i in range(1, 7)])
axes[1].axhline(LIE, color="red", linestyle="--")
axes[1].axhline(LSE, color="red", linestyle="--")
axes[1].axhline(alvo, color="green", linestyle="-")
axes[1].set_ylabel("Diâmetro (mm)")
axes[1].set_title("Boxplot por Batch")

st.pyplot(fig)
```

### Mini-Projeto 8 — Analisador de Ensaios Mecânicos

```python
import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

st.title("Analisador de Ensaios Mecânicos")

if "df_ensaios" not in st.session_state:
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
    st.session_state.df_ensaios = pd.DataFrame(linhas)

df = st.session_state.df_ensaios

uploaded = st.file_uploader("Ou carregue um CSV:", type="csv")
if uploaded:
    st.session_state.df_ensaios = pd.read_csv(uploaded)
    df = st.session_state.df_ensaios
    st.success("CSV carregado!")

st.divider()
st.subheader("Limpeza")
if st.checkbox("Remover nulos"):
    df = df.dropna()
    st.session_state.df_ensaios = df

st.subheader("Filtros")
materiais_disp = ["Todos"] + sorted(df["material"].unique().tolist())
mat_sel = st.selectbox("Material:", materiais_disp)
if mat_sel != "Todos":
    df = df[df["material"] == mat_sel]

st.dataframe(df, use_container_width=True)

st.divider()
st.subheader("GroupBy")
estats = df.groupby("material").agg(
    tensao_media=("tensao_max","mean"),
    along_medio=("alongamento","mean"),
    dureza_media=("dureza","mean"),
).reset_index()
st.dataframe(estats, use_container_width=True)

st.divider()
fig, axes = plt.subplots(1, 2, figsize=(12, 4))
sns.scatterplot(data=df, x="alongamento", y="tensao_max", hue="material", ax=axes[0])
axes[0].set_title("Tensão × Alongamento")
corr = df[["tensao_max","alongamento","dureza"]].corr()
sns.heatmap(corr, annot=True, cmap="RdBu_r", fmt=".2f", ax=axes[1])
axes[1].set_title("Correlação")
st.pyplot(fig)

st.divider()
csv = df.to_csv(index=False).encode("utf-8")
st.download_button("Exportar CSV", csv, "ensaios_filtrados.csv", "text/csv")
```

---

## Aula 09 — Plotly + Dashboards Interativos

### Exercício 9.1 — Scatter Plot de Materiais

```python
import streamlit as st
import plotly.express as px
import pandas as pd
import numpy as np

st.title("Scatter Plot Interativo — Materiais")

if "df_materiais" not in st.session_state:
    np.random.seed(42)
    df = pd.DataFrame({
        "material": np.random.choice(["Aço","Alumínio","Latão","Titânio"], 80),
        "densidade": np.random.uniform(1000, 9000, 80),
        "modulo_E": np.random.uniform(3, 210, 80),
        "escoamento": np.random.uniform(100, 600, 80),
        "dureza": np.random.uniform(50, 300, 80),
    })
    st.session_state.df_materiais = df

df = st.session_state.df_materiais

cols = ["densidade","modulo_E","escoamento","dureza"]
x_col = st.selectbox("Eixo X:", cols, index=0)
y_col = st.selectbox("Eixo Y:", cols, index=1)

fig = px.scatter(df, x=x_col, y=y_col, color="material", size="dureza",
                 hover_data=["escoamento","dureza"],
                 title=f"{y_col} × {x_col}")
st.plotly_chart(fig, use_container_width=True)
```

### Exercício 9.2 — Série Temporal de Sensor

```python
import streamlit as st
import plotly.express as px
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

st.title("Série Temporal — Sensores")

if "df_sensor" not in st.session_state:
    np.random.seed(42)
    datas = [datetime(2024,1,1) + timedelta(hours=i) for i in range(500)]
    sensores = ["S1","S2","S3"]
    linhas = []
    for s in sensores:
        for i, d in enumerate(datas):
            linhas.append({"timestamp": d, "sensor_id": s, "valor": 100 + 10*np.sin(i/50) + np.random.normal(0,3)})
    st.session_state.df_sensor = pd.DataFrame(linhas)

df = st.session_state.df_sensor

sensor_sel = st.selectbox("Sensor:", df["sensor_id"].unique())
df_s = df[df["sensor_id"] == sensor_sel]

datas_min = df_s["timestamp"].min()
datas_max = df_s["timestamp"].max()
periodo = st.slider("Período:", datas_min, datas_max, (datas_min, datas_max))

df_filtrado = df_s[(df_s["timestamp"] >= periodo[0]) & (df_s["timestamp"] <= periodo[1])]

fig = px.line(df_filtrado, x="timestamp", y="valor", title=f"Sensor {sensor_sel}")
fig.update_xaxes(rangeslider_visible=True)
st.plotly_chart(fig, use_container_width=True)

st.metric("Média no período", f"{df_filtrado['valor'].mean():.2f}")
```

### Exercício 9.3 — Produção por Máquina (Bar)

```python
import streamlit as st
import plotly.express as px
import pandas as pd
import numpy as np

st.title("Produção por Máquina")

if "df_prod" not in st.session_state:
    np.random.seed(42)
    linhas = []
    for mes in ["Jan","Fev","Mar"]:
        for maq in ["CNC-1","CNC-2","Torno","Fresa"]:
            linhas.append({"mes": mes, "maquina": maq, "pecas": np.random.randint(80,150)})
    st.session_state.df_prod = pd.DataFrame(linhas)

df = st.session_state.df_prod

modo = st.radio("Modo:", ["group", "stack"], horizontal=True)

fig = px.bar(df, x="maquina", y="pecas", color="mes", barmode=modo, text_auto=True,
             title="Produção por Máquina e Mês")
st.plotly_chart(fig, use_container_width=True)
```

### Exercício 9.4 — Histograma + Boxplot de Dureza

```python
import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import numpy as np

st.title("Distribuição de Dureza")

np.random.seed(42)
dureza = np.random.normal(180, 30, 200)

bins = st.slider("Número de bins:", 5, 50, 20)
mostrar_media = st.checkbox("Mostrar linha da média")

fig = make_subplots(rows=1, cols=2, subplot_titles=("Histograma", "Boxplot"))
fig.add_trace(go.Histogram(x=dureza, nbinsx=bins), row=1, col=1)
fig.add_trace(go.Box(y=dureza, name="Dureza"), row=1, col=2)

if mostrar_media:
    media = np.mean(dureza)
    fig.add_vline(x=media, line_dash="dash", line_color="red", row=1, col=1)

fig.update_layout(title="Distribuição de Dureza")
st.plotly_chart(fig, use_container_width=True)
```

### Exercício 9.5 — Heatmap de Correlação

```python
import streamlit as st
import plotly.express as px
import pandas as pd
import numpy as np

st.title("Heatmap de Correlação — Materiais")

if "df_corr" not in st.session_state:
    np.random.seed(42)
    df = pd.DataFrame({
        "material": np.random.choice(["Aço","Alumínio","Latão"], 50),
        "densidade": np.random.uniform(1000, 9000, 50),
        "modulo_E": np.random.uniform(3, 210, 50),
        "escoamento": np.random.uniform(100, 600, 50),
        "dureza": np.random.uniform(50, 300, 50),
    })
    st.session_state.df_corr = df

df = st.session_state.df_corr

tipo = st.selectbox("Filtrar por material:", ["Todos"] + sorted(df["material"].unique().tolist()))
if tipo != "Todos":
    df = df[df["material"] == tipo]

corr = df[["densidade","modulo_E","escoamento","dureza"]].corr()

fig = px.imshow(corr, text_auto=True, color_continuous_scale="RdBu_r",
                title="Matriz de Correlação")
st.plotly_chart(fig, use_container_width=True)

st.caption("Valores próximos de +1 indicam correlação positiva forte; próximos de -1, negativa forte.")
```

### Exercício 9.6 — Dashboard de Monitoramento

```python
import streamlit as st
import plotly.express as px
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

st.title("Dashboard de Monitoramento de Sensores")

if "df_mon" not in st.session_state:
    np.random.seed(42)
    datas = [datetime(2024,1,1) + timedelta(hours=i) for i in range(500)]
    linhas = []
    for s in ["S1","S2","S3"]:
        for i, d in enumerate(datas):
            linhas.append({"timestamp": d, "sensor_id": s, "valor": 100 + 5*np.sin(i/30) + np.random.normal(0,2)})
    st.session_state.df_mon = pd.DataFrame(linhas)

df = st.session_state.df_mon

st.sidebar.header("Filtros")
sensor_sel = st.sidebar.selectbox("Sensor:", df["sensor_id"].unique())
periodo = st.sidebar.slider("Data:", df["timestamp"].min(), df["timestamp"].max(), (df["timestamp"].min(), df["timestamp"].max()))
threshold = st.sidebar.slider("Threshold:", 90.0, 115.0, 105.0)

if st.sidebar.button("Atualizar dados"):
    np.random.seed(None)
    linhas = []
    for s in ["S1","S2","S3"]:
        for i, d in enumerate(df["timestamp"].unique()[:500]):
            linhas.append({"timestamp": d, "sensor_id": s, "valor": 100 + 5*np.sin(i/30) + np.random.normal(0,2)})
    st.session_state.df_mon = pd.DataFrame(linhas)
    st.rerun()

df = st.session_state.df_mon
df_s = df[(df["sensor_id"] == sensor_sel) & (df["timestamp"] >= periodo[0]) & (df["timestamp"] <= periodo[1])]

tab1, tab2, tab3 = st.tabs(["Leituras", "Estatísticas", "Alarmes"])

with tab1:
    fig = px.line(df_s, x="timestamp", y="valor", title=f"Sensor {sensor_sel}")
    fig.add_hline(y=threshold, line_dash="dash", line_color="red")
    st.plotly_chart(fig, use_container_width=True)
    st.dataframe(df_s, use_container_width=True)

with tab2:
    col1, col2, col3 = st.columns(3)
    col1.metric("Média", f"{df_s['valor'].mean():.2f}")
    col2.metric("Desvio", f"{df_s['valor'].std():.2f}")
    col3.metric("Máximo", f"{df_s['valor'].max():.2f}")
    fig_box = px.box(df_s, y="valor", title="Boxplot")
    st.plotly_chart(fig_box, use_container_width=True)

with tab3:
    alertas = df_s[df_s["valor"] > threshold]
    if len(alertas) > 0:
        st.error(f"{len(alertas)} leituras acima do threshold ({threshold})")
        st.dataframe(alertas, use_container_width=True)
    else:
        st.success("Nenhum alarme ativo.")
```

### Mini-Projeto 9 — Dashboard de Controle de Qualidade

```python
import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import pandas as pd
import numpy as np

st.title("Dashboard de Controle de Qualidade")

if "df_cq" not in st.session_state:
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
    st.session_state.df_cq = pd.DataFrame(linhas)

df = st.session_state.df_cq

if st.button("Regenerar dados"):
    st.session_state.df_cq = None
    st.rerun()

tab1, tab2, tab3, tab4 = st.tabs(["Visão Geral", "Análise por Produto", "Série Temporal", "Detalhes"])

with tab1:
    col1, col2, col3 = st.columns(3)
    col1.metric("Total amostras", len(df))
    col2.metric("Aprovadas", f"{df['aprovado'].sum()}")
    col3.metric("Taxa aprovação", f"{df['aprovado'].mean()*100:.1f}%")

    fig_bar = px.bar(df.groupby("produto")["aprovado"].mean().reset_index(), x="produto", y="aprovado",
                     title="Taxa de Aprovação por Produto")
    st.plotly_chart(fig_bar, use_container_width=True)

with tab2:
    prod_sel = st.selectbox("Produto:", df["produto"].unique())
    df_p = df[df["produto"] == prod_sel]
    alvo = df_p["medida"].mean()
    tol = (df_p["USL"].iloc[0] - df_p["LSL"].iloc[0]) / 2

    fig_hist = px.histogram(df_p, x="medida", nbins=30, title=f"Histograma — {prod_sel}")
    fig_hist.add_vline(x=df_p["LSL"].iloc[0], line_dash="dash", line_color="red")
    fig_hist.add_vline(x=df_p["USL"].iloc[0], line_dash="dash", line_color="red")
    st.plotly_chart(fig_hist, use_container_width=True)

    fig_box = px.box(df_p, x="linha", y="medida", title=f"Boxplot por Linha — {prod_sel}")
    st.plotly_chart(fig_box, use_container_width=True)

with tab3:
    prod_sel2 = st.selectbox("Produto (série):", df["produto"].unique(), key="serie")
    df_s = df[df["produto"] == prod_sel2]
    fig_line = px.line(df_s, x="timestamp", y="medida", color="linha", title=f"Série Temporal — {prod_sel2}")
    fig_line.add_hline(y=df_s["LSL"].iloc[0], line_dash="dash", line_color="red")
    fig_line.add_hline(y=df_s["USL"].iloc[0], line_dash="dash", line_color="red")
    reprovados = df_s[~df_s["aprovado"]]
    fig_line.add_trace(go.Scatter(x=reprovados["timestamp"], y=reprovados["medida"], mode="markers",
                                   marker=dict(color="red", size=8), name="Reprovado"))
    st.plotly_chart(fig_line, use_container_width=True)

with tab4:
    st.dataframe(df, use_container_width=True)
    csv = df.to_csv(index=False).encode("utf-8")
    st.download_button("Exportar CSV", csv, "controle_qualidade.csv", "text/csv")
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
- **Streamlit Docs — Widgets** — https://docs.streamlit.io/develop/api-reference/widgets
- **PEP 8 — Guia de estilo** — https://peps.python.org/pep-0008/
