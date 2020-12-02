const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  publicPath: "./", // 所有的资源都会被链接为相对路径
  outputDir: "dist", // 生产环境构建文件的目录
  assetsDir: "static", // 放置生成的静态资源的目录
  lintOnSave: false, // 是否开启eslint保存检测
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  // 所有 webpack-dev-server 的选项
  devServer: {
    // host: '127.0.0.1',
    port: 8080, // 端口号
    open: true, // 启动服务后是否打开浏览器
    // 出现编译器错误或警告时，在浏览器中显示全屏覆盖。
    overlay: {
      warnings: false,
      errors: true,
    },

    // 如果你的前端应用和后端 API 服务器没有运行在同一个主机上，
    // 你需要在开发环境下将 API 请求代理到 API 服务器。
    // proxy: {
    //   "/api": {
    //     target: "http:www.baidu.com", // 要代理的API地址
    //     changeOrigin: true, // 允许跨域
    //     pathRewrite: {
    //       // 这里理解成用'/api'代替target里面的地址，后面组件中我们掉接口时直接用api代替
    //       // 比如我要调用'http://www.abc.com/user/add'，直接写'/api/user/add'即可'
    //       "^/api": "",
    //     },
    //   },
    //   "/foo": {
    //     target: "<other_url>",
    //   },
    // },
  },
  css: {
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true,
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-px-to-viewport")({
            unitToConvert: "px", // 需要转换的单位，默认为"px"
            viewportWidth: 750, //  设计稿的视口宽度
            unitPrecision: 3, // 单位转换后保留的精度
            propList: ["*"], // 能转化为vw的属性列表
            viewportUnit: "vw", //  希望使用的视口单位
            fontViewportUnit: "vw", // 字体使用的视口单位
            selectorBlackList: [], // 需要忽略的CSS选择器
            minPixelValue: 1, // 最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: false, // 媒体查询里的单位是否需要转换单位
            replace: true, // 是否直接更换属性值，而不添加备用属性
            exclude: /(\/|\\)(node_modules)(\/|\\)/, // 忽略某些文件夹下的文件或特定文件
            include: undefined, // 如果设置了include，那将只有匹配到的文件才会被转换，例如只转换 'src/mobile' 下的文件 (include: /\/src\/mobile\//)
            landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
            // landscapeUnit: "vw", // 横屏时使用的单位
            // landscapeWidth: 568, // 横屏时使用的视口宽度
          }),
        ],
      },
      sass: {
        // sass 版本 9 中使用 additionalData 版本 8 中使用 prependData
        prependData: `@import "~@/assets/scss/index.scss";`,
      },
    },
  },
  // 对vue-cli内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: (config) => {
    (config.entry.app = ["babel-polyfill", resolve("src/main.js")]),
      //  html页面禁止压缩
      config.plugin("html").tap((args) => {
        args[0].minify = false;
        return args;
      });
    // 设置目录别名alias
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("utils", resolve("src/utils"))
      .set("static", resolve("src/static"))
      .set("store", resolve("src/store"))
      .set("pages", resolve("src/pages"));
  },
};
