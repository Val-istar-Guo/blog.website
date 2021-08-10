import colors from 'vuetify/lib/util/colors'
import config from './.nuxtrc.json'


export default {
  ...config,
  build: {
    transpile: [
      'unified',
      'rehype-prism',
      /unist-.*/,
      'zwitch',
    ],
  },
  head: {
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon_96.png', size: '96x96' },
      { rel: 'icon', type: 'image/png', href: '/favicon_48.png', size: '48x48' },
    ],
  },
  vuetify: {
    theme: {
      themes: {
        light: {
          primary: colors.indigo,
        },
      },
    },
  },

}
