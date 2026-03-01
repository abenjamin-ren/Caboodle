// @ts-check
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Caboodle',
  tagline: 'Your Object-Oriented UX Resource Site',
  favicon: 'img/favicon.ico',
  url: 'https://your-site-url.example.com',
  baseUrl: '/',
  organizationName: 'your-org',
  projectName: 'caboodle-site',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Caboodle',
        items: [
          { type: 'docSidebar', sidebarId: 'mainSidebar', position: 'left', label: 'Docs' },
          { to: '/objects', label: 'Objects', position: 'left' },
          { to: '/projects', label: 'Projects', position: 'left' },
          { to: '/workshops', label: 'Workshops', position: 'left' },
          { href: 'https://github.com/abenjamin-ren/Caboodle', label: 'GitHub', position: 'right' },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Learn',
            items: [
              { label: 'Getting Started', to: '/' },
              { label: 'ORCA Process', to: '/process' },
              { label: 'Skills Reference', to: '/skills' },
            ],
          },
          {
            title: 'Build',
            items: [
              { label: 'Object Directory', to: '/objects' },
              { label: 'Projects', to: '/projects' },
              { label: 'Case Studies', to: '/case-studies' },
            ],
          },
        ],
        copyright: 'Built with Caboodle + OOUX.',
      },
    }),
};

module.exports = config;
