export default defineNuxtConfig({
  loading:'~/components/loading/Preloader.vue',
  runtimeConfig: {
    public: {
      jsonData :true
      ,baseURL: process.env.NODE_ENV === 'development' ? 
          'http://127.0.0.1:8000/' : 'http://127.0.0.1:8000/',
      domain: process.env.NODE_ENV === 'development' ?
        'http://localhost:3000/' : 'https://ontherack.from-masr.com/'    
      },

  },
  spaLoadingTemplate: false,
  loadingIndicator: {
    name: 'circle',
    color: '#3B8070',
    background: 'white'
  },
  ssr: false,
  vite: {
    server: {
      hmr: {
        port: 3008 // Change port if needed
      }
    }
  },
  imports: {
    dirs: [
      'composables/**'
    ]
  },
  routeRules: {
    '': { redirect: '/collection' },
    //'/external-route': { redirect: 'https://example.com' },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
       charset: 'utf-8',
      // viewport: 'width=500, initial-scale=1',
      // title: 'My App',
      
      title:'Nebulla',
      meta: [
        // <meta name="description" content="My amazing site">
        { name: 'description', content: 'Nebulla ecosystem' }
      ],
      script: [
        {
          src: 'https://unpkg.com/alpinejs@3.9.1/dist/cdn.min.js',
          body: true,
          //defer:true
        }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: "~/assets/images/logo/logo.png" },
      ]
    }
  },
  css: [
    "assets/scss/themes/dark/app-dark.scss",
    "assets/scss/app.scss",
    "assets/scss/iconly.scss",
  ],

  plugins: [
    { src: '~/plugins/bootstrap.client', mode: 'client' },
  ],
  modules: [
    'nuxt-icon',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/color-mode',
    '@nuxtjs/mdc',
    "@nuxt/image"
  ],
  components: [
    {
      path: '~/components', // will get any components nested in let's say /components/test too
      pathPrefix: false,
    },
  ],
  colorMode: {
    classPrefix: 'theme-',
    classSuffix: ''
  },

  googleFonts: {
    families: {
      'Nunito': true,
    },
  },
})