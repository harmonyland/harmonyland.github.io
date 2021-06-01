const { description } = require('../../package')

module.exports = {
  locales: {
    '/': {
      lang: 'en-US',
      /**
      * Ref：https://v1.vuepress.vuejs.org/config/#title
      */
      title: 'Harmony',
      /**
      * Ref：https://v1.vuepress.vuejs.org/config/#description
      */
      description: description,
    },
    '/ko/': {
      lang: 'ko-KR',
      title: 'Harmony',
      description: 'Deno를 위한, 사용하기 쉬우면서, 매우 고급지고, 조화로운 Discord API 라이브러리입니다.'
    }
  },

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
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
        ariaLabel: 'Languages',
        algolia: {},
        repo: 'https://github.com/harmonyland/harmonyland.github.io',
        editLinks: true,
        docsDir: 'src',
        docsBranch: 'main',
        editLinkText: 'Edit this page',
        lastUpdated: true,
        nav: [
          {
            text: 'Guide',
            link: '/guide/',
          },
          {
            text: 'Documentation',
            link: 'https://doc.deno.land/https/deno.land/x/harmony/mod.ts',
          },
          {
            text: 'Discord',
            link: 'https://discord.gg/harmony'
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
      '/ko/': {
        selectText: '언어',
        label: '한국어',
        algolia: {},
        repo: 'https://github.com/harmonyland/harmonyland.github.io',
        editLinks: true,
        docsDir: 'src/ko',
        docsBranch: 'main',
        editLinkText: '이 페이지를 편집하기',
        lastUpdated: true,
        nav: [
          {
            text: '가이드',
            link: '/ko/guide/',
          },
          {
            text: '문서',
            link: 'https://doc.deno.land/https/deno.land/x/harmony/mod.ts',
          },
          {
            text: '디스코드',
            link: 'https://discord.gg/harmony'
          }
        ],
        sidebar: {
          '/ko/guide/': [
            {
              title: '홈',
              collapsable: false,
              children: [
                '',
                'setup'
              ]
            },
            {
              title: '초보자',
              collapsable: false,
              children: [
                'beginner/basic_bot',
              ]
            },
            {
              title: '슬래시 커맨드',
              collapsable: false,
              children: [
                'slash_commands/tag_bot'
              ]
            }
          ],
        }
      }
    },
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
