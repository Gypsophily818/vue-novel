var Fontmin = require("fontmin");

var srcPath = "/font/*.ttf"; // 字体源文件路径
var destPath = "font"; // 字体输出路径
var text =
  "热门小说畅销完本玄幻奇幻武侠都市职场历史军事游戏竞技科幻灵异同人轻小说仙侠竞技悬疑女尊莉莉男生女生古代言情穿越时空古代历史古典架空宫闱宅斗经商种田现代言情豪门总裁都市生活婚恋情感商战职场异术超能青春校园纯爱古代纯爱现代纯爱玄幻奇幻玄幻异世奇幻魔法武侠仙侠武侠动漫影视耽美"; //有哪些文字可能需要用到这个字体的,都可以在这里进行配置

// 初始化
var fontmin = new Fontmin()
  .src(srcPath) // 输入配置
  .use(
    Fontmin.glyph({
      // 字型提取插件
      text: text, // 所需文字
    })
  )
  .use(Fontmin.ttf2eot()) // eot 转换插件
  .use(Fontmin.ttf2woff()) // woff 转换插件
  .use(Fontmin.ttf2svg()) // svg 转换插件
  .use(Fontmin.css()) // css 生成插件
  .dest(destPath); // 输出配置

// 执行
fontmin.run(function(err, files, stream) {
  if (err) {
    // 异常捕捉
    // console.error(err);
    console.error(999);
  }

  console.log("done"); // 成功
});
