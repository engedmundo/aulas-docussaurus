# Trabalho e Energia — Cinemática do Corpo Rígido

## Roteiro

1. Princípio do trabalho e energia
2. Trabalho de uma força
3. Energia cinética
4. Trabalho de um momento
5. Forças que não realizam trabalho
6. Princípio da conservação de energia

---

## Princípio do Trabalho e Energia

A energia cinética inicial, translacional e rotacional de um corpo rígido, mais o trabalho realizado por todas as forças externas e momentos de binários quando este se desloca de uma posição inicial a uma posição final, é igual à energia cinética final, translacional e rotacional do corpo rígido.

$$T_1 + \sum U_{1-2} = T_2$$

$$T_1 + U_T = T_2$$

---

## Trabalho

Uma força exerce trabalho sobre um corpo rígido quando esse sofre deslocamento na direção da força.

$$U = F \cdot d$$

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/03-trabalho_energia/img/01.png)

---

## Energia Cinética

Energia cinética é a forma de energia que um corpo qualquer possui em razão de seu movimento. Em outras palavras, é a forma de energia associada à velocidade de um corpo.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/03-trabalho_energia/img/02.png)

### Energia Cinética de Translação

Quando um corpo rígido de massa $m$ é submetido a translação, retilínea ou curvilínea, a energia cinética devido à translação é dada por:

$$T = \frac{1}{2} m v^2_G$$

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/03-trabalho_energia/img/03.png)

### Energia Cinética de Rotação Pura

Quando um corpo rígido de massa $m$ gira em torno de seu eixo de gravidade $G$ e a velocidade translacional $v$ é nula, a energia cinética rotacional é dada por:

$$T = \frac{1}{2} I_G \omega^2$$

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/03-trabalho_energia/img/04.png)

### Energia Cinética de Rotação

Quando um corpo rígido de massa $m$ gira em torno de um eixo fixo que passa através do ponto $O$, o corpo rígido tem energia cinética translacional e rotacional dada por:

$$T = \frac{1}{2} m v^2_G + \frac{1}{2} I_G \omega^2$$

Onde $v_G = r_G \cdot \omega$.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/03-trabalho_energia/img/05.png)

### Sistemas de Corpos Rígidos

Sendo a energia cinética uma quantidade escalar, a energia cinética de um sistema de corpos rígidos conectados é a **soma das energias cinéticas de todas as suas partes em movimento**.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/03-trabalho_energia/img/06.png)

---

## Trabalho de uma Força Variável

Se uma força externa $F$ age sobre um corpo, o trabalho realizado pela força quando o corpo se move ao longo da trajetória $S$ é dado por:

$$U_F = \int F \cdot dr = \int F \cdot \cos \theta \, ds$$

Onde $\theta$ é o ângulo entre a direção da força e o deslocamento diferencial.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/03-trabalho_energia/img/07.png)

## Trabalho de uma Força Constante

Se uma força externa $F_C$ age sobre um corpo e mantém intensidade e direção constante enquanto o corpo passa pela trajetória $S$, o trabalho é dado por:

$$U_{F_C} = \left(F_C \cdot \cos \theta \right) S$$

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/03-trabalho_energia/img/08.png)

## Trabalho de um Peso

O peso de um corpo realiza trabalho apenas quando ocorre o deslocamento vertical.

$$U_W = -W \cdot \Delta y$$

- Deslocamento ascendente: $U_W < 0$
- Deslocamento descendente: $U_W > 0$

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/03-trabalho_energia/img/09.png)

## Trabalho da Força de uma Mola

Se uma mola está fixa a um corpo, a força da mola realiza trabalho quando se estende ou se comprime. O trabalho é dado por:

$$U_s = - \left( \frac{1}{2} k s_2^2 - \frac{1}{2} k s_1^2 \right)$$

O trabalho sempre será negativo, pois o deslocamento do corpo está na direção oposta à força da mola.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/03-trabalho_energia/img/10.png)

## Trabalho de um Momento

Se um corpo for submetido a um momento $M = F r$, o trabalho pode ser calculado por:

$$U_M = M \left( \theta_2 - \theta_1 \right)$$

O ângulo deve ser inserido em radianos na equação.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/03-trabalho_energia/img/12.png)

---

## Forças que Não Realizam Trabalho

- Atuam em pontos fixos do corpo
- Em direções perpendiculares ao deslocamento
- Reações em um pino de suporte
- Força normal de um corpo que se move ao longo de uma superfície
- Força de atrito sobre um corpo circular que rola sem deslizar sobre uma superfície

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/03-trabalho_energia/img/13.png)

---

### Exemplo 18-1

A barra mostrada na figura tem massa de $10 kg$ e está submetida a um momento de $50Nm$ e a uma força $F$ de $80N$, que é aplicada perpendicularmente à extremidade da barra. A mola tem comprimento não deformado de $0,5m$ e permanece na posição vertical em virtude do rolete guia em $B$. Determine o trabalho total realizado por todas as forças que atuam sobre a barra quando ela girar de $\theta=0^\circ$ para $\theta=90^\circ$.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/03-trabalho_energia/img/14.png)

### Exemplo 18-2

O disco de $30kg$ mostrado na figura é suportado por um pino em seu centro. Determine o número de revoluções que ele deve realizar para atingir a velocidade de $2 rad/s$ partindo do repouso. Ele está sujeito a um momento constante $M=5Nm$. A mola originalmente não está deformada e sua corda envolve o disco.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/03-trabalho_energia/img/15.png)

### Exemplo 18-3

A roda mostrada na figura tem massa de $20kg$ e raio de giração $k_G = 0,2m$ em relação ao seu centro de massa $G$. Se ela é submetida a um momento no sentido horário de $25Nm$, a partir do repouso, sem deslizar, determine a sua velocidade angular após seu centro de massa $G$ se deslocar $0,18m$. A mola tem rigidez $k=150 N/m$ e inicialmente não está deformada quando o momento é aplicado.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/03-trabalho_energia/img/16.png)

### Exemplo 18-4

O tubo de $700kg$ está igualmente suspenso pelos dois dentes do garfo de içamento mostrado na figura. Ele está sofrendo um movimento oscilatório tal que, quando $\theta = 30^\circ$, ele está momentaneamente em repouso. Determine as forças normal e de atrito que atuam em cada dente, necessárias para suportar o tubo no instante $\theta = 0^\circ$. Despreze a massa do apoio e a espessura do tubo.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/03-trabalho_energia/img/17.png)

### Exemplo 18-5

A barra de $10kg$ mostrada na figura está restringida de modo que suas extremidades se movem ao longo das ranhuras. A barra está inicialmente em repouso quando $\theta = 0^\circ$. Se o bloco deslizante $B$ é submetido a uma força horizontal $P=50N$, determine a velocidade angular da barra quando $\theta = 45^\circ$. Despreze o atrito e a massa dos blocos $A$ e $B$.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/03-trabalho_energia/img/18.png)

---

## Princípio da Conservação de Energia

Conhecida como equação da conservação da energia mecânica. A energia (cinética e potencial) de um corpo permanece constante quando este se desloca de uma posição para outra.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/03-trabalho_energia/img/19.png)

Se um corpo for submetido a ambas as forças, gravitacional e elástica, a energia potencial total será expressa por:

$$V = V_g + V_e$$

O princípio de trabalho e energia pode ser reescrito como:

$$T_1 + V_1 + \sum U_{1-2} = T_2 + V_2$$

Onde $\sum U_{1-2}$ representa o trabalho das forças não conservativas, como o atrito. Se este termo for zero, temos a **equação da conservação da energia mecânica**:

$$T_1 + V_1 = T_2 + V_2$$

### Energia Potencial Gravitacional

A energia potencial gravitacional de um corpo rígido é determinada quando se sabe a altura do seu centro de gravidade acima ou abaixo de uma referência horizontal.

$$V_g = W y_G$$

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/03-trabalho_energia/img/20.png)

### Energia Potencial Elástica

A força desenvolvida por uma mola elástica também é uma força conservativa.

$$V_e = \frac{1}{2} k s^2$$

Na posição deformada, a força da mola que atua sobre o corpo tem a habilidade de realizar trabalho positivo quando retorna à posição não deformada original.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/03-trabalho_energia/img/21.png)

### Exemplo 18-6

A barra de $10kg$ $AB$ mostrada na figura está confinada de modo que suas extremidades se movem nas ranhuras vertical e horizontal. A mola tem rigidez $k=800 N/m$ e não está deformada quando $\theta = 0^\circ$. Determine a velocidade angular de $AB$ quando $\theta = 0^\circ$, se a barra é solta do repouso quando $\theta = 30^\circ$. Despreze a massa dos blocos deslizantes.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/03-trabalho_energia/img/22.png)

### Exemplo 18-7

A roda mostrada na figura tem massa de $15kg$ e raio de giração $k_G = 0,2m$. Ela está fixada a uma mola que tem rigidez $k=30N/m$ e comprimento não deformado de $0,3m$. Se o disco é liberado do repouso na posição mostrada e rola sem deslizar, determine sua velocidade angular no instante em que $G$ se desloca $0,9m$ para a esquerda.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/03-trabalho_energia/img/23.png)

### Exemplo 18-8

O disco homogêneo de $10 kg$ mostrado na figura está fixado a uma barra uniforme de $5 kg$ $AB$. Se o conjunto é liberado do repouso quando $\theta = 60^\circ$, determine a velocidade angular da barra quando $\theta = 0^\circ$. Suponha que o disco role sem deslizar. Despreze o atrito ao longo da guia e a massa do anel em $B$.

![](https://materiais-aula-upf-eng-mecanica.s3-sa-east-1.amazonaws.com/static/ma2/03-trabalho_energia/img/24.png)

---

## Referências

- Hibbeler, R.C. Dinâmica: Mecânica para Engenharia. 14ª ed. Pearson, 2017.
- Beer et al. Mecânica Vetorial para Engenheiros: Dinâmica. 11ª ed. AMGH, 2019.
