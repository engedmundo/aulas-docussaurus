import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

export default async function createConfig(): Promise<Config> {
  const remarkMath = (await import('remark-math')).default;
  const rehypeKatex = (await import('rehype-katex')).default;

  return {
    title: 'Engenharia Mecânica',
    tagline: 'Materiais de aula de Engenharia Mecânica',
    favicon: 'img/favicon.ico',

    future: {
      v4: true,
    },

    url: 'https://seu-site.github.io',
    baseUrl: '/',

    organizationName: 'edmundoabreu',
    projectName: 'aulas-docusaurus',

    onBrokenLinks: 'warn',

    i18n: {
      defaultLocale: 'pt-BR',
      locales: ['pt-BR'],
    },

    markdown: {
      mermaid: true,
    },

    presets: [
      [
        'classic',
        {
          docs: {
            sidebarPath: './sidebars.ts',
            editUrl: undefined,
            remarkPlugins: [remarkMath],
            rehypePlugins: [rehypeKatex],
          },
          blog: false,
          theme: {
            customCss: './src/css/custom.css',
          },
        } satisfies Preset.Options,
      ],
    ],

    stylesheets: [
      {
        href: 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css',
        type: 'text/css',
        integrity: 'sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+',
        crossorigin: 'anonymous',
      },
    ],

    themeConfig: {
      image: 'img/social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Eng. Mecânica',
        logo: {
          alt: 'Engenharia Mecânica',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'disciplinas',
            position: 'left',
            label: 'Disciplinas',
          },
          {to: '/sobre', label: 'Sobre', position: 'left'},
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Disciplinas',
            items: [
              {label: 'Programação Aplicada', to: '/docs/category/programação-aplicada-mec255'},
              {label: 'Desenho Técnico CAD', to: '/docs/category/desenho-técnico-cad'},
              {label: 'Dinâmica das Máquinas', to: '/docs/category/dinâmica-das-máquinas'},
            ],
          },
          {
            title: 'Navegação',
            items: [
              {label: 'Sobre o projeto', to: '/sobre'},
            ],
          },
          {
            title: 'Links',
            items: [
              {label: 'GitHub', href: 'https://github.com/edmundoabreu/aulas-docusaurus'},
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} — Prof. Dr. Edmundo Abreu e Lima.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    } satisfies Preset.ThemeConfig,
  };
}
