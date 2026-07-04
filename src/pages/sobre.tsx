import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

export default function Sobre(): ReactNode {
  return (
    <Layout title="Sobre" description="Sobre este portal de materiais didáticos">
      <main style={{padding: '3rem 0'}}>
        <div className="container">
          <Heading as="h1">Sobre o Projeto</Heading>
          <p>
            Este portal centraliza os materiais de aula das disciplinas de
            Engenharia Mecânica ministradas pelo autor.
          </p>

          <Heading as="h2" style={{marginTop: '2rem'}}>Objetivo</Heading>
          <p>
            Oferecer aos alunos um acesso rápido e organizado a apostilas, slides,
            listas de exercícios e referências complementares, tudo em um só lugar.
          </p>

          <Heading as="h2" style={{marginTop: '2rem'}}>Tecnologia</Heading>
          <p>
            O site foi construído com <a href="https://docusaurus.io" target="_blank">Docusaurus</a>,
            um gerador de sites estáticos em React. O conteúdo é escrito em Markdown
            com suporte a equações (KaTeX) e diagramas (Mermaid).
          </p>

          <Heading as="h2" style={{marginTop: '2rem'}}>Autor</Heading>
          <p>
            <strong>Prof. Dr. Edmundo Abreu e Lima</strong>
          </p>

          <Heading as="h2" style={{marginTop: '2rem'}}>Licença</Heading>
          <p>
            Os materiais disponibilizados neste site são de uso educacional.
            A reprodução parcial ou total requer autorização do autor.
          </p>
        </div>
      </main>
    </Layout>
  );
}
