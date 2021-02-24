<template>
  <div id="app">
    <keep-alive>
      <router-view
        @update:upload-content="getfirstcontent"
        :firstcontent="firstcontent"
      />
    </keep-alive>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      firstcontent: "",
    };
  },
  created() {
    this.axios.get("https://novel.kele8.cn/rank-category").then((response) => {
      // this.category = response.data;
      this.$store.commit("updateRankCategory", response.data);
    });
  },
  methods: {
    getfirstcontent(e) {
      // console.log("app", e);
      this.firstcontent = e;
    },
  },
  computed: mapState(["bookrack", "ReadHistory", "SearchBookHistory"]),
  watch: {
    bookrack: function(n, o) {
      // 书架--我的收藏
      console.log(n.length, o.length);
      console.log(n);
      window.localStorage.setItem("bookrack", JSON.stringify(n));

      if (o.length <= n.length) {
        this.$toast("添加成功");
      } else {
        this.$toast("移除成功");
      }
    },
    ReadHistory: function(n) {
      //阅读记录
      console.log("App中---ReadHIstory变化:", n);
      window.localStorage.setItem("bookReadHistory", JSON.stringify(n));
    },
    SearchBookHistory(n) {
      //搜索记录
      console.log(n, "添加");
      window.localStorage.setItem("bookSearchHistory", JSON.stringify(n));
    },
    // chapterCounter(n){
    //   ChapterIndex: JSON.parse(window.localStorage.getItem("ChapterIndex")) || [],
    // },
    // bookChapterHistory(n) {
    //   //章节
    //   window.localStorage.setItem("bookChapterHistory", JSON.stringify(n));
    // },
  },
};
</script>
<style>
@import "./font/font.css";
@import "./fonteditor/icon.css";
@import "./fonteditor/page.css";
/* <!-- <link rel="stylesheet" href="../src/fonteditor/icon.css"> -->
  <!-- <link rel="stylesheet" href="../src/fonteditor/page.css"> --> */

body {
  overflow-x: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
