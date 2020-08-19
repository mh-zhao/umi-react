import { defineConfig } from 'umi';
console.log('CUR ENV == ', process.env.UMI_ENV)

export default defineConfig({
  base: '/',
  hash: true,
  history: {
    type: 'hash'
  },
  dva: {},
  nodeModulesTransform: {
    type: 'none',
  },
  lessLoader: {
    javascriptEnabled: true,
  },
  
  // plugins: [
  //   themePlugin
  // ]
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  //   { component: '@/pages/404' },
  // ],
});
