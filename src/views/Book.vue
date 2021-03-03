<template>
  <div class="book" id="book">
    <Bookhead :title="book.title"></Bookhead>
    <BookInfo
      :book="book"
      :bookreviews="bookreviews"
      @bookTitle="$emit('bookTitle', book.title)"
    ></BookInfo>
    <!-- @update:upload-content="getbookinfo" -->
    <router-view></router-view>
  </div>
</template>
<!-- 书籍详情页 -->

<script>
import Bookhead from "@/components/Bookhead.vue";
import BookInfo from "@/components/BookInfo.vue";
export default {
  props: [],
  components: {
    Bookhead,
    BookInfo,
  },
  data() {
    return {
      book: "",
      bookreviews: "",
    };
  },
  methods: {
    getbookinfo() {
      // console.log(e);
      // $emit("update:upload-content", $event);
    },
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    // console.log("页面刷新", to, from);

    next((vm) => {
      // vm.$store.commit("changeGender", to.name);
      // 书籍详情
      vm.axios
        .get("https://novel.kele8.cn/book-info/" + to.params.id + "")
        // .get("/book/" + to.params.id + "")
        .then((response) => {
          // console.log("进入书本详情页", response);
          vm.book = response.data;
        });
      // 书籍评论
      // .get("/post/review/best-by-book?book=" + to.params.id + "") //长评
      vm.axios
        // /post/review/by-book?book=书籍id&sort=?&start=?&limit=? =>书评
        .get(
          "https://novel.kele8.cn/book/reviews?book=" +
            to.params.id +
            "&sort=?&start=?&limit=?"
        )
        .then((response) => {
          // console.log("书籍长评", response.data.reviews);
          // console.log(response.data);
          vm.bookreviews = response.data.reviews;
        });
    });
  },
};
</script>
<style lang="scss" scoped>
.book {
  margin-top: 48px;
  padding: 0 15px;
}
</style>
