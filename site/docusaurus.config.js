// @ts-check
/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Caboodle',
  tagline: 'Your Object-Oriented UX Resource Site',
  url: 'https://your-site-url.example.com',
  baseUrl: '/',
  organizationName: 'your-org',
  projectName: 'caboodle-site',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  staticDirectories: ['static'],
  headTags: [
    {
      tagName: 'link',
      attributes: { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
    },
    {
      tagName: 'link',
      attributes: { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    },
    {
      tagName: 'link',
      attributes: { rel: 'shortcut icon', href: '/favicon.ico' },
    },
    {
      tagName: 'link',
      attributes: { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    },
    {
      tagName: 'meta',
      attributes: { name: 'apple-mobile-web-app-title', content: 'MyWebSite' },
    },
    {
      tagName: 'link',
      attributes: { rel: 'manifest', href: '/site.webmanifest' },
    },
  ],

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
