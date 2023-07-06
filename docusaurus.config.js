// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const remarkFlex = require('./src/plugins/remark-flex');
const remarkImage = require('./src/plugins/remark-images');
const remarkDeflist = require('remark-deflist-simple');

const REMARK_PLUGINS = {
  beforeDefaultRemarkPlugins: [
    remarkImage
  ],
  remarkPlugins: [
    remarkFlex,
    remarkDeflist
  ]
};

/** @type {import('@docusaurus/types').Config} */
const config = {
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
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          ...REMARK_PLUGINS,
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: 'synopsis',
          // Please change this to your repo.
          editUrl: 'https://github.com/lebalz/blog/edit/main/'
        },
        blog: {
          ...REMARK_PLUGINS,
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
          ...REMARK_PLUGINS
        },
        theme: {
          customCss: [
            require.resolve('./src/css/custom.scss'),
            require.resolve('./node_modules/react-image-gallery/styles/css/image-gallery.css')
          ]
        },
        sitemap: {
          priority: 0.9,
          changefreq: 'daily'
        }
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
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
    }),
  plugins: [
    'docusaurus-plugin-sass',
    '@saucelabs/theme-github-codeblock',
    [
      '@docusaurus/plugin-content-docs',
      {
        ...REMARK_PLUGINS,
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
      src: process.env.UMAMI_URL || 'localhost:3000',
      ['data-website-id']: process.env.UMAMI_ID || '',
      ['data-domains']: 'lebalz.ch',
      async: true,
      defer: true
    },
  ],
};

module.exports = config;
