// const pxtorem = require("postcss-pxtorem");
module.exports = {
  // 项目部署路径，默认部署在一个域名的根路径上（"production"为生产模式）
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  outputDir: "dist", // 打包后 项目导出的文件路径 ( --no-clean 可关闭每次打包清除dist)
  assetsDir: "", // 打包后 项目静态资源(js、css、img、fonts)的 (相对于 outputDir 的) 目录
  indexPath: "index.html", // 打包后 项目首页导出路径(相对于 outputDir ，可设绝对)
  filenameHashing: false, // 是否开启导入静态资源时添加 hash 后缀，控制缓存
  pages: undefined, // // 以多页模式构建应用程序。
  lintOnSave: false, // eslint-loader 是否在保存的时候检查
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件(打包后的代码是经过混淆的，该文件 **.map 中存储着转换后代码的位置，和对应的转换前的位置  便于调试)，一般最终生产时不建议开启。
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title= '智慧工地'
        return args
      });
    config.module
      .rule('avi')
      .test(/\.(avi|wmv)(\?.*)?$/)
      .use('url-loader')
        .loader('url-loader')
        .tap(options=>{
          return {
            limit: 10000
          }
        })
  },
  css: {
    // 配置css 相关load
    loaderOptions: {
      // scss: {
      //  prependData: `@import "~@/variables.scss";` // 导入公共scss变量
      // },
      // less: {
      //   modifyVars: {
      //     "radio-checked-icon-color": "#f20000"
      //   }
      // },
      // postcss: {
      //   // 插件配置
      //   plugins: [
      //     pxtorem({
      //       rootValue: 40, // 换算的基数(设计图750的根字体为32)
      //       unitPrecision: 5, // 转换成rem后保留的小数点位数
      //       selectorBlackList: [".van"], // 要忽略的选择器并保留为px。
      //       propList: ["*", "!font*"], // 可以从px更改为rem的属性。
      //       minPixelValue: 2, // 设置要替换的最小像素值。
      //       // replace: false, // 转rem后是否替换原有px
      //       exclude: "exclude" // 忽略转化的文件（\project\postcss-pxtorem\exclude\）
      //     }) // postcss-pxtorem 把px单位换算成rem单位
      //   ]
      // } // postcss-load 配置
    }
  },
  devServer: {
    open: process.platform === "darwin", // 允许编译后自动打开浏览器预览
    host: "0.0.0.0", // 允许外部ip访问
    port: 8022, // 端口
    https: false, // 启用https
    overlay: {
      warnings: true,
      errors: true
    }, // 错误、警告在页面弹出
    proxy: {
      "/api": {
        target: "http://192.168.101.23:8022/",
        ws: true,
        changeOrigin: true, // 允许websockets跨域
        // secure: false, // 接受运行在 HTTPS 上，且使用了无效证书的后端服务器
        pathRewrite: {
          "^/api": "" // 重写请求路径
        }
      }
    }, // 代理转发配置，用于调试环境
  }
};
