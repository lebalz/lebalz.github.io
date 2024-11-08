import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { themes as prismThemes } from 'prism-react-renderer';
import path from 'path';

import mdiPlugin from './src/plugins/remark-mdi/plugin';
import kbdPlugin from './src/plugins/remark-kbd/plugin';
import flexCardsPlugin from './src/plugins/remark-flex-cards/plugin';
import imagePlugin from './src/plugins/remark-images/plugin';
import deflistPlugin from './src/plugins/remark-deflist/plugin';
import strongPlugin from './src/plugins/remark-strong/plugin';
import detailsPlugin from './src/plugins/remark-details/plugin';
import linkAnnotationPlugin from './src/plugins/remark-link-annotation/plugin';

const REMARK_PLUGINS = {
    beforeDefaultRemarkPlugins: [
        flexCardsPlugin,
        [
            imagePlugin,
            { tagNames: { sourceRef: 'SourceRef', figure: 'Figure' } }
        ],
        detailsPlugin,
    ],
    remarkPlugins: [
        [strongPlugin, { className: 'boxed'}],
        [
            deflistPlugin,
            {
                tagNames: {
                    dl: 'Dl',
                },
            }
        ],
        [
            mdiPlugin,
            {
                colorMapping: {
                    green: 'var(--ifm-color-success)',
                    red: 'var(--ifm-color-danger)',
                    orange: 'var(--ifm-color-warning)',
                    yellow: '#edcb5a',
                    blue: '#3578e5',
                    cyan: '#01f0bc'
                },
                defaultSize: '1.25em'
            }
        ],
        kbdPlugin,
        [
            linkAnnotationPlugin,
            {
                prefix: '👉',
                postfix: null
            }
        ]
    ]

}

export interface Project {
    title: string;
    description: string;
    tags: string[];
    image: string;
    url?: string;
    repository: string;
}

const PROJECTS: Project[] = [
    {
        title: 'DB-SQL',
        description: 'Online DBMS to query any hosted DB. No need to install anything or to worry about closed ports (e.g. in schools or companies).',
        tags: ['SQL', 'query', 'Database', 'Online', 'PSQL', 'MySQL'],
        image: 'https://raw.githubusercontent.com/lebalz/db-sql/master/docs/db-sql.gif',
        url: 'https://db-sql.ch',
        repository: 'https://github.com/lebalz/db-sql'
    },
    {
        title: 'Live-Brython',
        description: 'Live coding with Python in the browser. Write Python code and see the results immediately.',
        tags: ['Python', 'Brython', 'Live', 'Docusaurus', 'Web', 'IDE'],
        image: 'https://raw.githubusercontent.com/lebalz/docusaurus-live-brython/main/brython-demo.gif',
        url: 'https://lebalz.github.io/docusaurus-live-brython/',
        repository: 'https://github.com/lebalz/docusaurus-live-brython'
    },
    {
        title: 'Maqueen Plus V2',
        description: "Library to program the Micro:bit with Python to control the Maqueen Plus V2 robot (by EV3 dfrobot). I'm the author and maintainer of the library.",
        tags: ['Python', 'Library', 'Micropython', 'Micro:bit', 'Robot', 'Maqueen'],
        image: 'https://gbsl-informatik.github.io/maqueen-plus-v2-mpy/img/maqueen-plus-v2.jpg',
        url: 'https://gbsl-informatik.github.io/maqueen-plus-v2-mpy/',
        repository: 'https://github.com/GBSL-Informatik/maqueen-plus-v2-mpy'
    },
    {
        title: 'SQL-Injection Demo',
        description: 'Demonstration of SQL-Injection attacks in a simple web application. In this webshop, all database queries used are intentionally vulnerable to sql injection.',
        tags: ['SQL', 'Injection', 'Security', 'Demo', 'Web'],
        image: 'https://github.com/lebalz/sql-injection-demo/raw/master/docs/images/shop_screenshot.jpg',
        repository: 'https://github.com/lebalz/sql-injection-demo'
    },
];

const config: Config = {
    title: 'Hello .',
    tagline: 'I\'m Balthasar Hofer, Teacher and Developer',
    url: 'https://lebalz.ch',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'lebalz', // Usually your GitHub org/user name.
    projectName: 'lebalz.github.io', // Usually your repo name.
    trailingSlash: true,
    markdown: {
        mdx1Compat: {
            admonitions: false,
            comments: false,
            headingIds: false
        }
    },
    customFields: {
        projects: PROJECTS
    },
    future: {
        experimental_faster: true,
    },
    presets: [
        [
            'classic',
            {
                docs: {
                    beforeDefaultRemarkPlugins: REMARK_PLUGINS.beforeDefaultRemarkPlugins,
                    remarkPlugins: REMARK_PLUGINS.remarkPlugins,
                    sidebarPath: require.resolve('./sidebars.js'),
                    routeBasePath: 'synopsis',
                    // Please change this to your repo.
                    editUrl: 'https://github.com/lebalz/lebalz.github.io/edit/main/'
                },
                blog: {
                    beforeDefaultRemarkPlugins: REMARK_PLUGINS.beforeDefaultRemarkPlugins,
                    remarkPlugins: REMARK_PLUGINS.remarkPlugins,
                    blogTitle: 'Dev Blog',
                    showReadingTime: true,
                    blogSidebarCount: 'ALL',
                    postsPerPage: 15,
                    blogSidebarTitle: 'Posts',
                    editUrl:
                        'https://github.com/lebalz/lebalz.github.io/edit/main/'
                },
                pages: {
                    beforeDefaultRemarkPlugins: REMARK_PLUGINS.beforeDefaultRemarkPlugins,
                    remarkPlugins: REMARK_PLUGINS.remarkPlugins,
                },
                theme: {
                    customCss: [
                        require.resolve('./src/css/custom.scss'),
                        require.resolve('./node_modules/react-image-gallery/styles/css/image-gallery.css')
                    ]
                },
                sitemap: {
                    priority: 0.9
                }
            } satisfies Preset.Options,
        ],
    ],
    themeConfig:
        {
            navbar: {
                title: 'Dev Blog',
                logo: {
                    alt: 'Le Balz',
                    src: 'img/logo.png',
                },
                items: [
                    {
                        type: 'doc',
                        docId: 'index',
                        position: 'left',
                        label: 'Knowledgebase',
                    },
                    {
                        to: 'blog',
                        position: 'left',
                        label: 'Blog',
                    },
                    {
                        to: 'recipes/',
                        position: 'left',
                        label: 'Rezepte',
                    },
                    {
                        href: 'https://github.com/lebalz',
                        position: 'right',
                        className: 'header-github-link',
                        'aria-label': 'GitHub repository',
                    },
                ],
            },
            algolia: {
                appId: process.env.ALGOLIA_APP_ID || "no-id",
                apiKey: process.env.ALGOLIA_API_KEY || "no-key",
                indexName: process.env.ALGOLIA_INDEX_NAME || "no-index",
                contextualSearch: true,
                searchPagePath: 'search',
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Knowledgebase',
                        items: [
                            {
                                label: 'Dokku',
                                to: '/synopsis/dokku',
                            },
                        ],
                    },
                    {
                        title: 'Projects',
                        items: PROJECTS.map((project) => ({
                            label: project.title,
                            to: project.url || project.repository,
                        })),
                    },
                    {
                        title: 'More',
                        items: [
                            {
                                label: 'GitHub',
                                href: 'https://github.com/lebalz',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Le Balz`,
            },
            prism: {
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula,
                additionalLanguages: ['bash', 'powershell', 'ruby', 'arduino', 'docker'],
            },
        } satisfies Preset.ThemeConfig,
    plugins: [
        'docusaurus-plugin-sass',
        '@saucelabs/theme-github-codeblock',
        [
            '@docusaurus/plugin-content-docs',
            {
                beforeDefaultRemarkPlugins: REMARK_PLUGINS.beforeDefaultRemarkPlugins,
                remarkPlugins: REMARK_PLUGINS.remarkPlugins,
                id: 'recipes',
                path: 'recipes',
                routeBasePath: 'recipes',
                sidebarPath: require.resolve('./sidebarsRecipes.js'),
                // ... other options
            }
        ],
        () => {
          return {
            name: 'alias-configuration',
            configureWebpack(config, isServer, utils, content) {
              return {
                resolve: {
                  alias: {
                    '@tdev-components': path.resolve(__dirname, './src/components'),
                    '@tdev': path.resolve(__dirname, './src'),
                  }
                }
              }
            }
          }
        },
    ],
    scripts: [
        // Object format.
        {
            src: process.env.UMAMI_SRC || 'localhost:3000',
            ['data-website-id']: process.env.UMAMI_ID || '',
            ['data-domains']: 'lebalz.ch',
            async: true,
            defer: true
        },
    ],
};

export default config;