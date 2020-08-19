const path = require('path');

export default {
  chainWebpack(config, { webpack }) {
    config
      .plugin('antd-theme-webpack-plugin')
      .use(require('antd-theme-webpack-plugin'), [{
        antDir: path.join(__dirname, './node_modules/antd'),//antd包位置
        stylesDir: path.join(__dirname, './src/styles/theme'), // 指定皮肤文件夹
        varFile: path.join(__dirname, './src/styles/theme/variables.less'), // 自己设置默认的主题色
        indexFileName: './src/pages/document.ejs',
        mainLessFile: path.join(__dirname, './src/styles/theme/index.less'),
        outputFilePath: path.join(__dirname, './src/pages/color.less'), // 输出到什么地方
        themeVariables: [ // 这里写要改变的主题变量
          '@primary-color',
        ],
        generateOnce:false
      }])
  }
}