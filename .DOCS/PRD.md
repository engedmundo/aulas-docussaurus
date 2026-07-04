# PRD — Portal de Materiais Didáticos - Prof. Dr. Edmundo Abreu e Lima 

**Produto:** Site Docusaurus para materiais didáticos
**Autor:** Prof. Dr. Edmundo Abreu e Lima
**Versão:** 1.0

---

## 1. Objetivo

Criar um portal wiki pessoal em Docusaurus para centralizar e distribuir materiais de aula (apostilas, slides, referências) das disciplinas ministradas pelo autor, com identidade visual profissional que remeta à área de engenharia mecânica.

## 2. Público-Alvo

- **Primário:** Alunos das disciplinas ministradas pelo autor
- **Secundário:** Visitantes externos em busca de referência técnica

## 3. Funcionalidades

### 3.1. Essenciais (MVP)

| # | Funcionalidade | Descrição |
|---|---------------|-----------|
| F1 | Navegação por disciplina | Sidebar organizada por disciplinas (Cálculo, Resistência dos Materiais, Termodinâmica, etc.) |
| F2 | Visualização de apostilas | Páginas em Markdown com suporte a equações (KaTeX), imagens, tabelas e diagramas |
| F3 | Slides incorporados | Embed de slides Marp (HTML estático) ou link direto para PDF |
| F4 | Busca全文 | Busca integrada do Docusaurus em todo o conteúdo |
| F5 | Layout responsivo | Funciona em desktop, tablet e celular |
| F6 | Design System próprio | Tema customizado com identidade de engenharia mecânica |

### 3.2. Desejáveis

| # | Funcionalidade | Descrição |
|---|---------------|-----------|
| F7 | Dark mode | Tema escuro para leitura noturna |
| F8 | Download de PDFs | Botão "Baixar apostila em PDF" |
| F9 | Versionamento de materiais | Cada semestre como versão do conteúdo |
| F10 | Página individual por disciplina | Organização por disciplina |

### 3.3. Futuras

| # | Funcionalidade | Descrição |
|---|---------------|-----------|
| F11 | Exercícios interativos | Quiz/questões com auto-correção |
| F12 | Fórum de dúvidas | Integração com GitHub Discussions |
| F13 | Progresso do aluno | Controle de aulas lidas |

## 4. Arquitetura da Informação

```
Home (index)
├── Sobre
├── Disciplinas
│   ├── Cálculo Diferencial e Integral
│   │   ├── Apostilas
│   │   │   ├── Capítulo 1 — Limites
│   │   │   ├── Capítulo 2 — Derivadas
│   │   │   └── ...
│   │   └── Slides
│   │       ├── Aula 1
│   │       └── ...
│   ├── Resistência dos Materiais
│   ├── Termodinâmica
│   ├── Mecânica dos Fluidos
│   ├── Ciência dos Materiais
│   └── ...
└── Contato
```

## 5. Stack Tecnológica

| Camada | Tecnologia | Motivo |
|--------|-----------|--------|
| SSG | Docusaurus 3.x | Suporte nativo a MDX, busca, versões, fácil manutenção |
| Estilo | Infima + CSS custom | Design System próprio |
| Equações | KaTeX | Renderização rápida de fórmulas |
| Diagramas | Mermaid | Fluxogramas e esquemas técnicos |
| Slides | Marp + export HTML | Aproveita conversão já iniciada |
| Deploy | GitHub Pages | Gratuito, integração com git |

## 6. Conteúdo Inicial

Disciplinas a migrar para o MVP (ordem sugerida):

1. **Resistência dos Materiais** — apostila completa + slides
2. **Cálculo Diferencial e Integral (parte 1 e 2)** — slides e listas de exercícios
3. **Mecânica dos Fluidos** — materiais existentes
4. **Termodinâmica** — materiais existentes
5. **Ciência dos Materiais** — materiais existentes

## 7. Critérios de Sucesso

- **KSI-1:** Site publicado e acessível publicamente
- **KSI-2:** Pelo menos 3 disciplinas com conteúdo completo migrado
- **KSI-3:** Busca funcional retornando resultados relevantes
- **KSI-4:** Tempo de carregamento < 2s no Lighthouse
- **KSI-5:** Alunos conseguem navegar e baixar materiais sem instruções externas

## 8. Cronograma Estimado

| Fase | Duração | Entregas |
|------|---------|----------|
| Setup + Design | 1 semana | Projeto Docusaurus rodando, tema aplicado |
| Conteúdo piloto | 2 semanas | 1 disciplina completa |
| Expansão | contínuo | Demais disciplinas |
| Deploy | 1 dia | Publicação em produção |
