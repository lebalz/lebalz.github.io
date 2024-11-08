import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './styles.module.scss';
import { Project } from '@site/docusaurus.config';
import GitHubButton from 'react-github-btn'

/**
 * https://github.com/get-icon/geticon/raw/master/icons
 */
const TECHNOLOGIES = [
    'typescript-icon',
    'react',
    'mobx',
    'docusaurus',
    'nodejs-icon',
    'express',
    'javascript',
    'npm',
    'postgresql',
    'python',
    'ruby',
    'rails',
    'nginx',
    'git-icon',
    'github-icon',
    'codecov',
    ['dokku', 'https://dokku.com/docs/assets/dokku-logo.svg'],
    'docker-icon',
    'microsoft-windows',
    'linux-tux',
    'macOS',
];

function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header className={clsx('hero hero--primary', styles.heroBanner)}>
            <div className="container">
                <Heading as="h1" className="hero__title">
                    {siteConfig.title}
                </Heading>
                <p className="hero__subtitle">
                    {siteConfig.tagline}
                </p>
                <div className={styles.technologies}>
                    {TECHNOLOGIES.map((technology, idx) => (
                        <div className={styles.techIcon}>
                            <img
                                key={idx}
                                src={
                                    Array.isArray(technology)
                                        ? technology[1]
                                        : `https://github.com/get-icon/geticon/raw/master/icons/${technology}.svg`
                                }
                                alt={
                                    Array.isArray(technology)
                                    ? technology[0]
                                    : technology
                                }
                                title={
                                    Array.isArray(technology)
                                        ? technology[0]
                                        : technology.split('-')[0]
                                }
                                className={styles.icon}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </header>
    );
}

function Projects() {
    const { siteConfig } = useDocusaurusContext();
    const projects = siteConfig.customFields.projects as Project[];
    return (
        <section className={clsx(styles.section)}>
            <Heading as="h2" className="hero__title">
                Projects
            </Heading>
            <div className={styles.projects}>

                {
                    projects.map((project) => (
                        <div className={clsx('card', styles.project)}>
                            <div className="card__image">
                                <img src={project.image} />
                            </div>
                            <div className="card__body">
                                <div className={styles.header}>
                                    <h3>{project.title}</h3>
                                    <div className={clsx(styles.badges, styles.github)}>
                                        <GitHubButton 
                                            href={project.repository}
                                            data-icon="octicon-star"
                                            data-size="large"
                                            aria-label={`Star ${project.repository.split('.com/')[1]} on GitHub`}
                                        >
                                            Star
                                        </GitHubButton>
                                        <GitHubButton 
                                            href="https://github.com/sponsors/lebalz"
                                            data-icon="octicon-heart"
                                            data-size="large"
                                            aria-label={`Sponsor @${siteConfig.organizationName} on GitHub`}
                                        >
                                            Sponsor
                                        </GitHubButton>
                                    </div>
                                </div>
                                <small>
                                    <div className={styles.badges}>
                                        {project.tags.map((tag) => (
                                            <span className={clsx(styles.badge, 'badge', 'badge--secondary')}>{tag}</span>
                                        ))}
                                    </div>
                                </small>
                                <p className={styles.description}>
                                    {project.description}
                                </p>
                            </div>
                            <div className="card__footer">
                                {
                                    project.url ? (
                                        <Link 
                                            className="button button--primary button--block"
                                            to={project.url}
                                        >
                                            👉 Visit
                                        </Link>
                                    ) : (
                                        <Link 
                                            className="button button--primary button--block"
                                            to={project.repository}
                                        >
                                            👉 Repository
                                        </Link>        
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )

}

export default function Home(): JSX.Element {
    const { siteConfig } = useDocusaurusContext();
    return (
        <Layout title={'Interactive Python Codeblocks'} description={siteConfig.tagline}>
            <HomepageHeader />
            <main>
                <Projects />
            </main>
        </Layout>
    );
}
