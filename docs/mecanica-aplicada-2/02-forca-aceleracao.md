# Força e Aceleração — Cinemática do Corpo Rígido

## Roteiro

1. Momento de inércia de massa
2. Equações do movimento plano
3. Translação pura
4. Rotação em torno de um eixo fixo
5. Movimento plano geral

---

## Momento de Inércia de Massa

### Definição

O momento de inércia de massa de um corpo é uma medida de sua resistência à aceleração angular. O momento de inércia de massa de um corpo em relação ao eixo $z$ é definido por:

$$I = \int_m r^2 dm$$

$r$ — distância perpendicular ao eixo $z$  
$dm$ — massa de um elemento diferencial

O valor de $I$ é exclusivo ao eixo para o qual é calculado. Unidades: $kg \cdot m^2$.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/01.png)

Comparativamente:
- Resistência à aceleração angular: $M = I \alpha$
- Resistência à aceleração linear: $F = m a$

Definimos o momento de inércia como a integral do "segundo momento" em relação a um eixo de todos os elementos de massa $dm$ que compõem o corpo.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/02.png)

### Tabelas — Sólidos Homogêneos

Geralmente, os formatos dos corpos são conhecidos e utilizam-se tabelas para calcular o valor do momento de inércia de massa.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/03.png)
![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/04.png)
![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/05.png)

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/06.png)
![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/07.png)
![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/08.png)

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/09.png)
![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/10.png)

### Raio de Giração

Ocasionalmente, o momento de inércia de um corpo em relação a um eixo específico é descrito em manuais e tabelas usando o raio de giração $k$.

$$I = m k^2$$

Conhecendo o raio de giração, é possível calcular o momento de inércia de massa.

$$k = \sqrt{\frac{I}{m}}$$

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/11.png)

### Exemplo 17-1

Determine o momento de inércia de massa do cilindro em relação ao eixo $z$. A densidade do material é constante. $R=30mm$, $h=200mm$, material: Aço ABNT 1020.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/12.png)

### Teorema dos Eixos Paralelos

Conhecendo o momento de inércia de massa em relação ao eixo que passa pelo $CG$, é possível determinar o momento de inércia em relação a qualquer outro eixo paralelo a este:

$$I = I_{G} + m d^2$$

$I$ — momento de inércia em relação ao eixo desejado  
$I_{G}$ — momento de inércia em relação ao eixo que passa pelo $CG$  
$m$ — massa do corpo  
$d$ — distância entre os eixos

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/13.png)

### Corpos Compostos

Se um corpo é construído a partir de uma série de outros de formato simples, como discos, esferas e barras, o momento de inércia do corpo em relação a qualquer eixo $z$ pode ser determinado somando algebricamente os momentos de inércia de todos os corpos componentes, calculados em relação ao mesmo eixo.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/14.png)

### Exemplo 17-3

Se a chapa mostrada na figura tem densidade de $8000 kg/m^3$ e espessura de $10mm$, determine seu momento de inércia de massa em relação a um eixo perpendicular à página:
1. Passando pelo ponto $G$
2. Passando pelo ponto $O$

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/15.png)

### Exemplo 17-4

O pêndulo da figura consiste de dois elementos finos, cada um com massa de $9 kg$. Determine o momento de inércia de massa do pêndulo em relação a um eixo que passa:
1. Através do pino em $O$
2. Do centro de massa $G$ do pêndulo

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/16.png)

### Exemplo 17-8

Determine o momento de inércia de massa $I_z$ do tronco de cone, que possui uma depressão cônica. O material possui densidade de $2000 kg/m^3$.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/17.png)

### Exemplo 17-15

O pêndulo consiste em um disco $A$ de massa $8kg$, um disco $B$ de massa $2kg$ e uma haste fina de $4kg$. Determine o momento de inércia em relação a um eixo perpendicular à página que passa pelo ponto $O$.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/18.png)

### Exemplo 17-20

O pêndulo consiste em duas hastes finas $AB$ e $OC$, que têm massa de $3 kg/m$. A placa fina tem massa de $12 kg/m^2$. Determine a localização do centro de massa $G$ do pêndulo. Depois, determine o momento de inércia de massa em relação a um eixo perpendicular à página que passa pelo ponto $O$.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/19.png)

---

## Equações do Movimento Plano

### Equação de Movimento Translacional

Estabelece que a soma de todas as forças externas atuando sobre o corpo é igual à massa do corpo multiplicada pela aceleração do centro de massa $G$.

$$\sum F = m a_G$$

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/20.png)

### Equação de Movimento Rotacional

Estabelece que a soma dos momentos de todas as forças externas em relação ao centro de massa $G$ do corpo é igual ao produto do momento de inércia do corpo em relação a um eixo passando por $G$ e a aceleração angular do corpo.

$$\sum M_G = I_G \alpha$$

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/21.png)

### No Plano

Três equações são usadas para descrever o movimento geral no plano:

$$\sum F_x = m \left(a_G\right)_x$$
$$\sum F_y = m \left(a_G\right)_y$$
$$\sum M_G = I_G \alpha$$

---

## Translação Pura

Quando um corpo rígido sofre uma translação, todas as partículas do corpo possuem a mesma aceleração. A aceleração angular resultante é nula.

$$\sum M = 0$$

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/23.png)

### Momento Cinético

Momento causado pelo movimento, em relação a um ponto $P$ qualquer.

$$\sum M_P = -\overline{y} m a_x + \overline{x} m a_y + I_G \alpha$$

$$\sum M_P = \sum \left(\mathcal{M}_K\right)_P$$

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/24.png)

### Translação Retilínea

$$\sum F_x = m a_x$$
$$\sum F_y = m a_y$$
$$\sum M_G = 0$$
$$\sum M_P = \sum \left(\mathcal{M}_K\right)_P$$

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/25.png)

### Translação Curvilínea

$$\sum F_n = m a_n$$
$$\sum F_t = m a_t$$
$$\sum M_G = 0$$

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/26.png)

### Exemplo 17.5

O carro mostrado na figura tem uma massa de $2000 kg$ e um centro de massa em $G$. Determine a aceleração se as rodas motrizes estão sempre deslizando, enquanto as rodas dianteiras estão livres para rodar. Despreze a massa das rodas. O coeficiente de atrito cinético entre as rodas e a estrada é $0,25$.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/27.png)

### Exemplo 17.6

A motocicleta mostrada na figura tem massa de $125kg$ e centro de massa em $G_1$, enquanto o motociclista tem massa de $75kg$ e centro de massa em $G_2$. Determine o coeficiente de atrito estático mínimo entre as rodas e o pavimento para que o motociclista possa empinar a motocicleta. Qual a aceleração necessária para fazer isso? Despreze a massa das rodas e assuma que a roda da frente está livre para girar.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/28.png)

### Exemplo 17.30

Uma caixa uniforme de $50kg$ repousa sobre uma superfície horizontal para a qual o coeficiente de atrito cinético é $0.2$. Determine a aceleração se uma força de $600N$ é aplicada na caixa, conforme mostra a figura.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/29.png)

### Exemplo 17.7

A viga $BD$ de $100kg$ mostrada na figura é suportada por duas barras que têm massa desprezível. Determine a força desenvolvida em cada barra se no instante $\theta = 30^\circ$, a viga tem uma velocidade angular de $\omega = 0.6 rad/s$.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/30.png)

---

## Rotação em Torno de um Eixo Fixo

Considere o corpo rígido que está restrito a girar no plano vertical em torno de um eixo fixo perpendicular à página e passando pelo ponto $O$.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/31.png)

É possível escrever as três equações de movimento para esse corpo:

$$\sum F_n = m a_{Gn} = m \omega^2 r_G$$
$$\sum F_t = m a_{Gt} = m \alpha r_G$$
$$\sum M_O = I_O \alpha$$

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/32.png)

### Usando o Momento Cinético

Frequentemente, é conveniente somar os momentos em relação ao pino $O$, a fim de eliminar a força desconhecida $F_O$.

$$\sum M_O = r_G m a_{Gt} + I_G \alpha$$

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/33.png)

### Exemplo 17.8

O volante desbalanceado de $25kg$ mostrado na figura tem um raio de giração $k_G = 0,18m$ em relação a um eixo passando pelo seu centro de massa $G$. Se ele é solto do repouso, determine as componentes horizontal e vertical da reação no pino $O$.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/34.png)

### Exemplo 17.9

No instante mostrado na figura, a barra fina de $20kg$ tem uma velocidade angular $\omega = 5 rad/s$. Determine a aceleração angular e as componentes vertical e horizontal da reação do pino sobre a barra nesse instante.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/35.png)

### Exemplo 17.10

O tambor mostrado na figura tem massa de $60kg$ e raio de giração $k_O = 0,25m$. Uma corda de massa desprezível está enrolada em torno da periferia do tambor e fixada a um bloco tendo massa de $20kg$. Se o bloco é solto, determine a aceleração angular do tambor.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/36.png)

---

## Movimento Plano Geral

$$\sum F_x = m a_{Gx}$$
$$\sum F_y = m a_{Gy}$$
$$\sum M_G = I_G \alpha$$

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/39.png)

### Centro Instantâneo de Rotação

Há um tipo de problema particular que envolve um disco uniforme, ou corpo de formato circular, que rola sobre uma superfície áspera sem deslizar.

$$\sum M_{CI} = I_{CI} \alpha$$

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/40.png)

### Exemplo 17.12

Determine a aceleração da bobina da figura. A bobina tem massa de $8kg$ e raio de giração $k_G = 0,35m$. As cordas de massa desprezível estão enroladas em torno de seu cubo e borda externa.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/41.png)

### Exemplo 17.13

A roda de $25kg$ mostrada na figura tem um raio de giração $k_G = 0,2m$. Se um momento de binário de $50Nm$ é aplicado a ela, determine a aceleração de seu centro de massa $G$. Os coeficientes de atrito estático e cinético entre a roda e o plano $A$ são $\mu_s = 0,3$ e $\mu_k = 0,25$, respectivamente.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/42.png)

### Exemplo 17.14

O poste esguio uniforme da figura tem uma massa de $100kg$. Se os coeficientes de atrito estático e cinético entre a extremidade do poste e a superfície são $\mu_s = 0,3$ e $\mu_k = 0,25$, respectivamente, determine a aceleração angular do poste no instante em que a força horizontal de $400N$ é aplicada. O poste está originalmente em repouso.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/43.png)

### Exemplo 17.15

A barra uniforme de $50kg$ da figura é mantida na posição de equilíbrio pelas cordas $AC$ e $BD$. Determine a tração na corda $BD$ e a aceleração angular da barra imediatamente após a corda $AC$ ser cortada.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/44.png)

### Exemplo 17.50

A caixa uniforme tem uma massa de $45kg$ e repousa sobre o carrinho com uma superfície inclinada. Determine a menor aceleração que fará com que a caixa tombe ou escorregue em relação ao carrinho. Qual é a magnitude dessa aceleração? O coeficiente de atrito entre a caixa e o carrinho é $\mu = 0,5$.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/02-forca_aceleracao/img/45.png)

---

## Referências

- Hibbeler, R.C. Dinâmica: Mecânica para Engenharia. 14ª ed. Pearson, 2017.
- Beer et al. Mecânica Vetorial para Engenheiros: Dinâmica. 11ª ed. AMGH, 2019.
