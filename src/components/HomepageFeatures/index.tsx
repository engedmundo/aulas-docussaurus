import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type DisciplineItem = {
  title: string;
  code: string;
  description: string;
  icon: string;
  link: string;
};

const DisciplineList: DisciplineItem[] = [
  {
    title: 'Programação Aplicada',
    code: 'MEC255',
    description: 'Python, Streamlit, Pandas, NumPy, Plotly e POO aplicados à engenharia.',
    icon: '🐍',
    link: '/docs/programacao-aplicada',
  },
  {
    title: 'Desenho Técnico',
    code: 'DESENHO',
    description: 'Projeções, cortes, tolerâncias e CAD.',
    icon: '📐',
    link: '/docs/desenho-tecnico',
  },
];

function DisciplineCard({title, code, description, icon, link}: DisciplineItem) {
  return (
    <div className={clsx('col col--4')}>
      <Link to={link} className={styles.cardLink}>
        <div className={styles.card}>
          <span className={styles.cardIcon}>{icon}</span>
          <Heading as="h3" className={styles.cardTitle}>{title}</Heading>
          <span className={styles.cardCode}>{code}</span>
          <p className={styles.cardDesc}>{description}</p>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">Disciplinas</Heading>
          <p className={styles.sectionSub}>Selecione uma disciplina para acessar apostilas, slides e materiais de aula.</p>
        </div>
        <div className="row">
          {DisciplineList.map((props, idx) => (
            <DisciplineCard key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
