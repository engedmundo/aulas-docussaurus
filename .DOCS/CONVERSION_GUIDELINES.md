# Guia de Conversão: LaTeX Beamer para Marp (Padrão UPF)

Este documento serve como referência para converter slides de LaTeX Beamer para o formato Marp Markdown, mantendo a identidade visual da UPF e os padrões de layout estabelecidos.

## 1. Configuração do Arquivo (Frontmatter)

Todo arquivo `.md` deve iniciar com o seguinte cabeçalho:

```markdown
---
marp: true
theme: default
paginate: true
header: 'CÓDIGO - Nome da Disciplina'
footer: 'Prof. Dr. Nome do Professor'
style: |
  @import url('../upf-theme.css');
---
```

> [!IMPORTANT]
> Certifique-se de que o caminho `@import url('../upf-theme.css');` esteja correto em relação à localização do arquivo `.md`.

## 2. Slides Especiais

### Slide de Título
Use a classe `title` e oculte o cabeçalho/rodapé:

```markdown
<!-- _class: title -->
<!-- _header: "" -->
<!-- _footer: "" -->
<!-- _paginate: false -->

# Título do Slide
## Subtítulo ou Disciplina

**Prof. Dr. Nome do Professor**
Data
```

### Slide de Roteiro / TOC
Oculte o cabeçalho/rodapé para limpeza visual:

```markdown
<!-- _header: "" -->
<!-- _footer: "" -->

# Roteiro

1. Item 1
2. Item 2
```

## 3. Layout de Colunas

Para slides com texto e imagem (comum em Beamer), use a estrutura de `div` com as classes do tema:

```markdown
# Título do Slide

<div class="cols">
  <div class="col-60">

  - Tópico 1
  - Tópico 2
  - Tópico 3

  </div>
  <div class="col-40">

  ![](img/nome_da_imagem.png)
  [Texto opcional do link](url)

  </div>
</div>
```

**Classes de largura disponíveis:**
- `col-40`: 40% de largura.
- `col-50`: 50% de largura.
- `col-60`: 60% de largura.
- `col`: largura igual/flexível.

## 4. Imagens e Mídia

- **Caminho**: Armazene imagens em uma pasta `img/` dentro da pasta do slide atual.
- **Redimensionamento**: O tema limita automaticamente `max-height: 400px` e `max-width: 100%`.
- **Estilização pontual**: Se precisar ajustar o tamanho em um slide específico, use a sintaxe de atributo: `![width:500px](img/foto.png)`.

## 5. Dicas de Formatação

- **Negrito**: O tema destaca palavras em **negrito** com a cor verde oficial da UPF.
- **Citações**: Use `> texto` para blocos de destaque com borda verde.
- **Rodapé Pontual**: Para remover o rodapé em um slide específico (ex: quando a imagem é muito grande), use `<!-- _footer: "" -->`.

## 6. Alinhamento e Centralização

- **Imagens**: Por padrão, todas as imagens são centralizadas horizontalmente no slide ou na coluna.
- **Texto e Colunas**: Para centralizar o conteúdo de uma coluna (vertical e horizontalmente), use a classe `col-center`:

```markdown
<div class="cols">
  <div class="col-center">

  Este texto e qualquer imagem aqui estarão centralizados.

  </div>
</div>
```

---
*Este guia foi gerado para auxiliar agentes e usuários na manutenção da consistência dos slides da UPF.*
