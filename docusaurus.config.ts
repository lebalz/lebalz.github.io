import type { Config } from '@docusaurus/types';
import * as Preset from '@docusaurus/preset-classic';

const { themes } = require('prism-react-renderer');
import mdiPlugin from './src/plugins/remark-mdi/plugin';
import kbdPlugin from './src/plugins/remark-kbd/plugin';
import flexCardsPlugin from './src/plugins/remark-flex-cards/plugin';

const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;
// const remarkFlex = require('./src/plugins/remark-flex.cjs');
// const remarkImage = require('./src/plugins/remark-images.cjs');
// const remarkDeflist = require('remark-deflist-simple');

// const REMARK_PLUGINS = {
//   beforeDefaultRemarkPlugins: [
//     remarkImage
//   ],
//   remarkPlugins: [
//     remarkFlex,
//     remarkDeflist
//   ]
// };
const REMARK_PLUGINS = {
  remarkPlugins: [
    flexCardsPlugin,
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
  ]

}

const config: Config = {
  title: 'Blog',
  tagline: 'Dev Blog by LeBalz',
  url: 'https://lebalz.ch',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'lebalz', // Usually your GitHub org/user name.
  projectName: 'blog', // Usually your repo name.
  trailingSlash: true,
  presets: [
    [
      'classic',
      {
        docs: {
          beforeDefaultRemarkPlugins: [
          ],
          remarkPlugins: REMARK_PLUGINS.remarkPlugins,
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: 'synopsis',
          // Please change this to your repo.
          editUrl: 'https://github.com/lebalz/blog/edit/main/'
        },
        blog: {
          beforeDefaultRemarkPlugins: [
            // (await import('./src/plugins/remark-images.cjs')).default
          ],
          remarkPlugins: REMARK_PLUGINS.remarkPlugins,
          blogTitle: 'Dev Blog',
          routeBasePath: '/',
          showReadingTime: true,
          blogSidebarCount: 'ALL',
          postsPerPage: 15,
          blogSidebarTitle: 'Posts',
          // Please change this to your repo.
          editUrl:
            'https://github.com/lebalz/blog/edit/main/'
        },
        pages: {
          beforeDefaultRemarkPlugins: [
            // (await import('./src/plugins/remark-images.cjs')).default
          ],
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
            to: 'recipes/',
            position: 'left',
            label: 'Rezepte',
          },
          {
            href: 'https://github.com/lebalz/blog',
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
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['bash', 'powershell', 'ruby', 'arduino', 'docker'],
      },
    } satisfies Preset.ThemeConfig,
  plugins: [
    'docusaurus-plugin-sass',
    '@saucelabs/theme-github-codeblock',
    [
      '@docusaurus/plugin-content-docs',
      {
        beforeDefaultRemarkPlugins: [
          // (await import('./src/plugins/remark-images.cjs')).default
        ],
        remarkPlugins: REMARK_PLUGINS.remarkPlugins,
        id: 'recipes',
        path: 'recipes',
        routeBasePath: 'recipes',
        sidebarPath: require.resolve('./sidebarsRecipes.js'),
        // ... other options
      }
    ],
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