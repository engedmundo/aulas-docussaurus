# PRD — Portal de Materiais Didáticos de Engenharia Mecânica

**Produto:** Site Docusaurus para disponibilização de materiais didáticos
**Autor:** Edmundo Abreu e Lima
**Versão:** 1.0

---

## 1. Objetivo

Criar um portal wiki pessoal em Docusaurus para centralizar e disponibilizar materiais de aula (apostilas, slides, listas de exercícios, referências) das disciplinas do curso de Engenharia Mecânica ministradas pelo autor. O projeto tem caráter pessoal e visa facilitar o acesso dos alunos aos conteúdos das disciplinas, além de servir como portfólio docente.

## 2. Público-Alvo

- **Primário:** Alunos das disciplinas de Engenharia Mecânica ministradas pelo autor
- **Secundário:** Visitantes externos em busca de referência técnica na área

## 3. Funcionalidades

### 3.1. Essenciais (MVP)

| # | Funcionalidade | Descrição |
|---|---------------|-----------|
| F1 | Navegação por disciplina | Sidebar organizada por disciplinas (Programação Aplicada, Desenho Técnico, Cálculo, Resistência dos Materiais, etc.) |
| F2 | Visualização de apostilas | Páginas em Markdown com suporte a equações (KaTeX), imagens, tabelas e diagramas |
| F3 | Slides incorporados | Embed de slides Marp (HTML estático) ou link direto para PDF |
| F4 | Busca全文 | Busca integrada do Docusaurus em todo o conteúdo |
| F5 | Layout responsivo | Funciona em desktop, tablet e celular |
| F6 | Design System próprio | Tema customizado com identidade visual de engenharia mecânica |

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
│   ├── Programação Aplicada
│   │   ├── Aulas
│   │   ├── Listas de Exercícios
│   │   └── Projetos
│   ├── Desenho Técnico
│   │   ├── Aulas
│   │   ├── Normas Técnicas
│   │   └── Exercícios
│   ├── Cálculo Diferencial e Integral
│   │   ├── Apostilas
│   │   │   ├── Capítulo 1 — Limites
│   │   │   ├── Capítulo 2 — Derivadas
│   │   │   └── ...
│   │   └── Listas de Exercícios
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
| Deploy | Vercel | Deploy contínuo a partir do GitHub, gratuito |

## 6. Conteúdo Inicial

Disciplinas previstas para o MVP (ordem sugerida):

1. **Programação Aplicada** — aulas, listas de exercícios e projetos
2. **Desenho Técnico** — aulas, normas e exercícios
3. **Resistência dos Materiais** — apostila completa + slides
4. **Cálculo Diferencial e Integral (parte 1 e 2)** — slides e listas de exercícios
5. **Mecânica dos Fluidos** — materiais existentes
6. **Termodinâmica** — materiais existentes
7. **Ciência dos Materiais** — materiais existentes

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
