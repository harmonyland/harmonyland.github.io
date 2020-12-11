const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Harmony',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: 'https://github.com/harmony-org/harmony-org.github.io',
    editLinks: true,
    docsDir: 'src',
    editLinkText: 'Edit this page',
    lastUpdated: true,
    nav: [
      {
        text: 'Guide',
        link: '/guide/',
      },
      {
        text: 'Discord',
        link: 'https://discord.gg/WVN2JF2FRv'
      },
      {
        text: 'GitHub',
        link: 'https://github.com/harmony-org/harmony'
      }
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Home',
          collapsable: false,
          children: [
            '',
            'setup'
          ]
        },
        {
          title: 'Beginner',
          collapsable: false,
          children: [
            'beginner/basic_bot',
          ]
        },
        {
          title: 'Slash Commands',
          collapsable: false,
          children: [
            'slash_commands/tag_bot'
          ]
        }
      ],
    }
  },

  theme: 'yuu',

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
