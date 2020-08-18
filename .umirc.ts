import { defineConfig } from 'umi';

export default defineConfig({
  hash: true,
  history: {
    type: 'hash'
  },
  dva: {},
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  //   { component: '@/pages/404' },
  // ],
});
