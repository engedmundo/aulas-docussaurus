# Projeto Final: Sistema de Apoio à Engenharia

## Visão Geral do Projeto

**Objetivo:** Cada dupla deve desenvolver um sistema, script ou aplicação em Python (Google Colab) que resolva um **problema real do dia a dia da engenharia**. O tema é **livre** — a dupla escolhe um problema concreto com o qual se identifique e o transforma em uma ferramenta útil, aplicando os conceitos vistos ao longo da disciplina.

**Entregáveis:**
- Notebook (`.ipynb`) com célula principal executável no Google Colab
- Dados persistidos em CSV/JSON (pasta `data/` ou arquivos gerados)
- Vídeo de 3–5 min demonstrando o funcionamento
- Relatório técnico (PDF ou MD) descrevendo o problema, a solução e as decisões de projeto

## O que se espera

O projeto **não** é um exercício de implementação de um enunciado fechado. Ele propõe que a dupla:

1. **Identifique um problema real** de engenharia que possa ser resolvido (ou facilitado) por programação — dimensionamento de componentes, controle de estoque, vendas e orçamentos, gerenciamento de projetos, análise de dados de ensaios, acompanhamento de produção, controle de qualidade etc.
2. **Modele esse problema** como dados (o que é um "item", "cliente", "peça", "sensor", "máquina"?) usando dicionários, listas e DataFrames.
3. **Defina a regra de negócio** — a decisão que o sistema toma automaticamente via condicionais (aprova/rejeita, alerta, estoque mínimo, fator de segurança, orçamento viável etc.).
4. **Construa uma ferramenta** que receba entradas, processe, persista os dados e apresente resultados claros (tabelas e gráficos).

O objetivo final é entregar algo que o próprio autor usaria no seu futuro estágio ou emprego — e não apenas "rodar um código para a nota".

## Habilidades Avaliadas

**Técnicas:**
- Algoritmos e tradução de um problema real em código (aulas 01–02)
- Condicionais para decisão/classificação (aula 03)
- Funções para organizar e reutilizar a lógica (aula 04)
- Estruturas de dados: listas, tuplas, dicionários, conjuntos (aula 05)
- Laços para processar coleções e repetir operações (aula 06)
- Persistência em JSON/CSV para que os dados sobrevivam à reexecução (aula 07)
- Manipulação e análise com Pandas: DataFrames, filtros, `groupby`, `merge`, `pivot_table` (aulas 07 e 10)

**De projeto:**
- Organização do código em células e funções com responsabilidades claras
- Tratamento de erros e casos-limite (entrada inválida, dados vazios, arquivo ausente)
- Documentação e clareza da apresentação

## Escopo mínimo obrigatório

Independentemente do tema escolhido, o sistema **deve** contemplar os seguintes elementos:

| Elemento | Descrição | Conceito-chave |
|---|---|---|
| **Entrada de dados** | Receber valores do usuário (`input()`) ou ler de arquivo CSV/JSON | `input()`, `pd.read_csv`, `json.load` |
| **Modelo de dados** | Uma estrutura que represente as "entidades" do problema (lista de dicionários ou DataFrame) | listas, dicionários, DataFrames |
| **Funções** | Pelo menos 3 funções com responsabilidades distintas | `def`, parâmetros, `return` |
| **Decisão automática** | Alguma regra que classifica/aprova/alerta de forma autônoma | `if`/`elif`/`else` |
| **Processamento em laço** | Iterar sobre uma coleção (cadastros, leituras, pedidos) | `for`/`while`, `enumerate`, `break`/`continue` |
| **Persistência** | Salvar e recarregar os dados em arquivo (CSV ou JSON) | `to_csv`, `json.dump`, `open` |
| **Consolidação/análise** | Resumir os dados (totais, médias, ranking, agrupamento) | `groupby`, `agg`, acumuladores |

## Exemplos de tema (não obrigatórios)

> Estes são apenas **inspirações**. A dupla pode adotar, adaptar ou criar um tema totalmente novo. O que importa é o problema ser **real, específico e bem modelado**.

- **Dimensionamento:** uma calculadora que, dado um material e um carregamento, recomenda a seção/componente adequado e sinaliza o fator de segurança.
- **Estoque/almoxarifado:** controle de entrada e saída de itens com alerta de estoque mínimo e relatório de consumo.
- **Vendas/orçamento:** um orçamentista que compõe custo (hora, material, lucro) e consolida por cliente/período.
- **Manutenção:** rastreador de equipamentos com periodicidade de manutenção preventiva.
- **Produção:** análise de tempos de ciclo por máquina com detecção de atrasos.
- **Qualidade:** painel de controle estatístico de um processo com limites de especificação.
- **Gestão de projetos:** acompanhamento de tarefas/etapas com status e prazo.

## Requisitos de qualidade

- **Célula principal executável:** o notebook deve rodar de ponta a ponta (de `import` até a exportação) sem depender de ordem manual. As células Markdown servem apenas para organizar/documentar.
- **Dados demonstráveis:** o sistema deve ter dados de exemplo suficientes para demonstrar a análise (por exemplo, alguns registros cadastrados + geração simulada quando fizer sentido).
- **Feedback ao usuário:** use `print()` com mensagens claras de `OK`, `Atenção` e `Erro` para cada operação.
- **Nomes e comentários:** variáveis e funções com nomes descritivos; comentários apenas onde realmente esclarecerem a intenção.


## Entregáveis detalhados

1. **Notebook (`.ipynb`)** — célula principal executável + células Markdown de documentação.
2. **Dados** — arquivos CSV/JSON gerados (ou pasta `data/`).
3. **Vídeo (3–5 min)** — demonstração do sistema funcionando e explicação das decisões de projeto.
4. **Relatório técnico (PDF/MD)** — descrição do problema, modelo de dados, regras de negócio, decisões técnicas e limitações.

## Referências

- **Google Colab** — https://colab.research.google.com/
- **Pandas** — https://pandas.pydata.org/docs/
- **NumPy** — https://numpy.org/doc/stable/
- **matplotlib** — https://matplotlib.org/stable/
- **Tavares Neto, R. F.; Silva, F. M.** Introdução à programação para engenharia. LTC, 2022.
