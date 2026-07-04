# Planificação de Chapas

## Roteiro

1. Introdução ao desenvolvimento de chapas
2. Operações antes e após a dobra
3. Cálculo do desenvolvimento — regra prática
4. Cálculo pela regra real — linha neutra

---

## Introdução

### Desenvolvimento de Chapas

- Para apresentar o desenho técnico de uma chapa dobrada, devemos primeiramente definir se as demais operações deverão ser realizadas antes ou após a dobra da chapa.
- O desenho técnico irá indicar se as operações de corte e furação deverão ser feitas antes ou depois da operação de dobra da peça.
- As operações que deverão ser realizadas antes da dobra deverão ser cotadas na vista desenvolvida. Caso contrário, deverão ser indicadas cotas nas vistas de dobra.
- O desenvolvimento da peça é estabelecido através do perímetro da linha neutra.

### Operações Antes da Dobra

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/cad/02-chapas/img/01.jpg)

### Operações Após a Dobra

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/cad/02-chapas/img/02.jpg)

---

## Cálculo do Desenvolvimento

### Regra Prática

O desenvolvimento da peça é estabelecido através da soma das medidas internas das dobras.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/cad/02-chapas/img/03.jpg)

$$D = D_1 + D_2 + D_3 + D_4 + D_5$$

### Exemplo — Regra Prática

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/cad/02-chapas/img/04A.jpg)
![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/cad/02-chapas/img/04B.jpg)
![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/cad/02-chapas/img/04C.jpg)

### Regra Real — Linha Neutra

O desenvolvimento da peça é estabelecido através do perímetro da linha neutra.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/cad/02-chapas/img/05.jpg)

A linha neutra é localizada a um terço do valor da espessura da peça, a partir do lado interno das dobras.

### Exemplo — Linha Neutra

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/cad/02-chapas/img/06A.jpg)
![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/cad/02-chapas/img/06B.jpg)

**Perímetro do raio da dobra:**

$$D = \frac{2 \pi r}{4} = \frac{2 \pi \cdot 8}{4} = 12,56 \text{ mm}$$

**Comprimento total da peça:**

$$D_{tot} = D_1 + D + D_2 + D + D_3$$

$$D_{tot} = 38 + 12,56 + 76 + 12,56 + 38 = 177,12 \text{ mm}$$

**Comprimento da aba:**

$$D_{tot} = D_1 + \frac{D}{2} = 38 + \frac{12,56}{2} = 44,3 \text{ mm}$$

### Resultado do Desenvolvimento

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/cad/02-chapas/img/07.jpg)

---

## Referências

- NBR 8403/1984 — Aplicação de linhas em desenhos técnicos
- NBR 10068/1987 — Folha de desenho — Leiaute e dimensões
- NBR 10067/1987 — Princípios gerais de representação em desenho técnico — Vistas e cortes
- NBR 10126/1987 — Cotagem em desenho técnico
