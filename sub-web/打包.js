const path = require("path");
function resolve(dir) {
    return path.join(__dirname, dir);
}
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
module.exports = {
    publicPath: '',    //使用相对路径
    indexPath: 'index.html',
    outputDir: 'dist',
    // assetsDir: 'static',
    productionSourceMap: false,
    chainWebpack: config => {
        publicPath: '',    //使用相对路径
        config.plugin('preload').tap(args => {

            args[0].fileBlacklist.push(/\.css/, /\.js/);
            return args;
        })
        // 打包所有文件内嵌到html里面
        //把图片转成base64 limit:1e5 => 100000 kb ,小于这个大小都会转成base64,大于就会用链接引用图片
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, {esModule:false,limit: 1e5}));
        //把字体图标相关文件转成base64
        config.module.rule('fonts').use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, {limit: 1e5}));
        //把svg转成base64
        const svgRule = config.module.rule('svg');
        svgRule.uses.clear();
        svgRule.rule('svg').use('url-loader')
            .loader('url-loader')
            .tap(options => ({esModule:false,limit:1e5}));
        // set svg-sprite-loader
        config.module
          .rule('svg')
          .exclude.add(resolve('src/icons'))
          .end()
        config.module
          .rule('icons')
          .test(/\.svg$/)
          .include.add(resolve('src/icons'))
          .end()
          .use('svg-sprite-loader')
          .loader('svg-sprite-loader')
          .options({
            symbolId: 'icon-[name]'
          })
          .end()
        config.plugin('inline-source').use(require('html-webpack-inline-source-plugin'));
        config.plugin('html').tap(args => {
            args[0].inlineSource = '(.css|.js$)';
            return args;
        });
    }
}