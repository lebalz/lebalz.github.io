// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const remarkFlex = require('./src/plugins/remark-flex');
const remarkImage = require('./src/plugins/remark-images');

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
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/lebalz/blog/tree/main/packages/create-docusaurus/templates/shared/',
          beforeDefaultRemarkPlugins: [
            remarkImage
          ],
          remarkPlugins: [
            remarkFlex
          ],
        },
        blog: {
          blogTitle: 'Dev Blog',
          routeBasePath: '/',
          showReadingTime: true,
          blogSidebarCount: 'ALL',
          postsPerPage: 1,
          blogSidebarTitle: 'Posts',
          // Please change this to your repo.
          editUrl:
            'https://github.com/lebalz/blog/tree/main/packages/create-docusaurus/templates/shared/',
          beforeDefaultRemarkPlugins: [
            remarkImage
          ],
          remarkPlugins: [
            remarkFlex
          ]
        },
        theme: {
          customCss: [
            require.resolve('./src/css/custom.scss'),
            require.resolve('./node_modules/react-image-gallery/styles/css/image-gallery.css')
          ]
        },
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
            docId: 'intro',
            position: 'left',
            label: 'Knowledgebase',
          },
          {
            href: 'https://github.com/lebalz/blog',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/',
              },
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
        additionalLanguages: ['bash'],
      },
    }),
  plugins: [
    'docusaurus-plugin-sass',
    '@saucelabs/theme-github-codeblock'
  ],
  scripts: [
    // Object format.
    {
      src: 'https://umami.lebalz.ch/umami.js',
      ['data-website-id']: 'fc37f18b-ef7a-4e4c-aebd-dc95acfcee02',
      ['data-domains']: 'lebalz.ch',
      async: true,
      defer: true
    },
  ],
};

module.exports = config;
