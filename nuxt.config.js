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
