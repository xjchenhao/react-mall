
const path = require("path");

const src = path.resolve(__dirname, "src");

export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/home' },
        { path: '/login', component: '../pages/login' }
      ]
    }
  ],

  alias: {
    "@": src,
    utils: `${src}/utils`,
    assets: `${src}/assets`,
    models: `${src}/models`,
    services: `${src}/services`,
    components: `${src}/components`,
  },

  proxy: {
    "/api": {
      target: "http://127.0.0.1:7001",
      changeOrigin: true,
    },
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'h5',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
}
