module.exports = {
  publicPath: "./",
  devServer: {
    //
    // proxy: 'http://api.kele8.cn/agent/http://api.zhuishushenqi.com'
    proxy: "http://api.zhuishushenqi.com",
    // proxy: 'http://novel.kele8.cn'
    // proxy: "http://api05iye5.zhuishushenqi.com",
    // proxy: "http://http://chapterup.zhuishushenqi.com/chapter",
    // '/api': {
    //   target: 'http://api.zhuishushenqi.com',
    //   pathRewrite: {
    //     '^/api': ''
    //   }
  },
};
