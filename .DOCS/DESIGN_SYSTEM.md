# Design System — Portal de Aulas (Engenharia Mecânica)

**Tema:** "Iron Blueprint" — profundo, técnico, industrial
**Inspiração:** Plantas baixas (blueprints), aço, precisão da engenharia

---

## 1. Paleta de Cores

A paleta foi inspirada no universo da engenharia mecânica: azul profundo de plantas técnicas, cinza metálico, e detalhes em cobre/ferrugem controlada.

### 1.1. Cores Primárias

| Token | Hex | Amostra | Uso |
|-------|-----|---------|-----|
| `--ifm-color-primary` | `#1a365d` | azul-escuro | Navbar, headings, botões primários |
| `--ifm-color-primary-dark` | `#152d4f` | | Hover estados |
| `--ifm-color-primary-darker` | `#112644` | | Active estados |
| `--ifm-color-primary-light` | `#1f4170` | | Backgrounds leves |
| `--ifm-color-primary-lighter` | `#2a5090` | | Bordas |

### 1.2. Cores Secundárias

| Token | Hex | Amostra | Uso |
|-------|-----|---------|-----|
| `--mech-steel` | `#4a5568` | cinza-aço | Texto secundário, bordas |
| `--mech-steel-light` | `#a0aec0` | cinza-claro | Backgrounds de card |
| `--mech-brass` | `#b8942e` | cobre/latão | Detalhes, badges, destaques |


### 1.3. Tons de Fundo

| Token | Hex | Uso |
|-------|-----|-----|
| Fundo principal | `#ffffff` | Content area |
| Fundo secundário | `#f7f8fa` | Sidebar, cards |
| Fundo código | `#1e293b` | Code blocks |
| Fundo footer | `#0f1a2e` | Footer escuro |

### 1.4. Modo Escuro

| Token | Hex | Uso |
|-------|-----|-----|
| Fundo | `#0d1117` | Página |
| Card/Sidebar | `#161b22` | Superfícies |
| Texto primário | `#e6edf3` | Body |
| Texto secundário | `#8b949e` | Subtítulos |

## 2. Tipografia

### 2.1. Font Stack

```css
--ifm-font-family-base: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
--ifm-font-family-monospace: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
--ifm-font-family-heading: 'Inter', sans-serif;
```

**Inter** foi escolhida por sua legibilidade em telas e sensação técnica — similar a manuais de engenharia.

### 2.2. Escala Tipográfica

| Elemento | Size | Weight | Line Height |
|----------|------|--------|-------------|
| `h1` | `2.5rem` (40px) | 700 | 1.2 |
| `h2` | `1.75rem` (28px) | 650 | 1.3 |
| `h3` | `1.25rem` (20px) | 600 | 1.4 |
| Body | `1rem` (16px) | 400 | 1.7 |
| Small | `0.875rem` (14px) | 400 | 1.5 |
| Code | `0.875rem` | 400 | 1.5 |

## 3. Ícones e Ilustrações

- **Ícones:** Phosphor ou Lucide — estilo line-art, geométricos, que combinam com documentação técnica
- **Ilustrações:** Evitar ilustrações genéricas. Preferir diagramas técnicos (Mermaid), equações (KaTeX), e imagens reais de peças/montagens
- **Logo:** Texto "Eng. Mecânica" com subset de gear/engrenagem como favicon

## 4. Componentes

### 4.1. Navbar
- Fundo: `#1a365d` (azul engenharia)
- Logo: nome do site + ícone minimalista
- Links: branco com hover sublinhado

### 4.2. Sidebar
- Largura: 280px (padrão Docusaurus)
- Fundo: `#f7f8fa`
- Item ativo: fundo `#1a365d` com texto branco
- Categoria: label em `Inter SemiBold`, cor `--mech-steel`

### 4.3. Cards (na Home)
- Borda: `1px solid #e2e8f0`
- Border-radius: `12px`
- Hover: `box-shadow` suave + translateY(-2px)
- Ícone da disciplina no topo

### 4.4. Botões
- Primário: fundo `#1a365d`, texto branco, `border-radius: 8px`
- Outline: borda `#1a365d`, texto `#1a365d`
- Tamanhos: sm (32px), md (40px), lg (48px)

### 4.5. Tabelas
- Header: fundo `#1a365d`, texto branco
- Zebrado: `#f7f8fa` em linhas pares
- Borda: `1px solid #e2e8f0`

### 4.6. Code Blocks / Equações
- Fundo: `#1e293b` (light mode) / `#0d1117` (dark mode)
- Botão de cópia no canto superior direito
- KaTeX: renderizado inline com cor primária

## 5. Layout

### 5.1. Homepage
```
┌─────────────────────────────────────────────┐
│  Navbar (azul escuro)                        │
├──────┬──────────────────────────────────────┤
│      │  Hero section: "Materiais de Aula"   │
│      │  [título + call to action]           │
│      │                                      │
│ Side │  Grid de Disciplinas (cards)         │
│ bar  │  ┌──────┐ ┌──────┐ ┌──────┐        │
│      │  │Cálculo│ │Resist.│ │Termo.│        │
│      │  └──────┘ └──────┘ └──────┘        │
│      │                                      │
│      │  Seção "Sobre"                       │
│      │  Footer (escuro)                     │
└──────┴──────────────────────────────────────┘
```

### 5.2. Página de Disciplina
```
┌─────────────────────────────────────────────┐
│  Navbar                                      │
├──────┬──────────────────────────────────────┤
│      │  Breadcrumb: Home > Disciplinas >     │
│Side  │  Cálculo                              │
│ bar  │                                      │
│      │  # Cálculo Diferencial e Integral     │
│      │  [descrição + ementa]                │
│      │                                      │
│      │  ## Apostilas                        │
│      │  - Capítulo 1: Limites               │
│      │  - Capítulo 2: Derivadas             │
│      │                                      │
│      │  ## Slides                           │
│      │  - Aula 1: Introdução                │
│      │  - Aula 2: Limites                   │
└──────┴──────────────────────────────────────┘
```

## 6. Elementos Decorativos (CSS Custom)

```css
:root {
  /* Sub-grid sutil estilo blueprint */
  --mech-grid: repeating-linear-gradient(
    0deg, transparent, transparent 40px, rgba(26, 54, 93, 0.03) 40px, rgba(26, 54, 93, 0.03) 41px
  ),
  repeating-linear-gradient(
    90deg, transparent, transparent 40px, rgba(26, 54, 93, 0.03) 40px, rgba(26, 54, 93, 0.03) 41px
  );
}
```

Aplicado apenas em backgrounds amplos (hero da home), não no conteúdo.

## 7. Assets Necessários

| Asset | Formato | Descrição |
|-------|---------|-----------|
| Favicon | `.svg` | Engrenagem minimalista |
| Hero-bg | `.svg` ou pattern | Grid estilo blueprint |
| Logo | `.svg` | Texto + ícone para navbar |
| Ícones disciplinas | `.svg` | 1 ícone por matéria (opcional) |

## 8. Inspirações de Referência

- **Docusaurus Cloudflare** — clean, técnico, documentação pesada
- **Mintlify** — cards com gradiente sutil, tipografia espaçada
- **Stripe Docs** — grid limpo, hierarquia visual clara
- **Blueprints de engenharia** — paleta azul monocromática + destaques em cobre

## 9. Implementação no Docusaurus

As cores primárias mapeiam diretamente para variáveis Infima:

```css
:root {
  --ifm-color-primary: #1a365d;
  --ifm-color-primary-dark: #152d4f;
  --ifm-color-primary-darker: #112644;
  --ifm-color-primary-light: #1f4170;
  --ifm-color-primary-lighter: #2a5090;
  --ifm-color-primary-lightest: #4a7abf;

  --ifm-background-color: #ffffff;
  --ifm-navbar-background-color: #1a365d;
  --ifm-navbar-link-color: #ffffff;
  --ifm-footer-background-color: #0f1a2e;
  --ifm-card-background-color: #ffffff;
}
```

> Os arquivos de tema (`src/css/custom.css`) devem conter estas variáveis + os ajustes de tipografia.
