<template>
  <div class="gain-search-page">
    <SearchResultehead :title="$route.query.bookName"></SearchResultehead>
    <div class="gain-search-content" v-if="!isSearching">
      <ul class="result-books-list">
        <ItemY
          v-for="book in resultBook"
          :key="book._id"
          :book="book"
          result="result"
          :BookShelfCurrentPage="$route.name"
        />
      </ul>
    </div>
    <van-skeleton title :row="6" v-else />
  </div>
</template>

<script>
import SearchResultehead from "@/components/SearchResultehead.vue";
import ItemY from "@/components/ItemY.vue";
export default {
  data() {
    return {
      bookName: "",
      resultBook: "",
      isSearching: true,
    };
  },
  created() {
    console.log('created==>',this.$route.name);
    this.isSearching = true;
    this.bookName = this.$route.query.bookName;
    //www.api.zhuishushenqi.com/book/fuzzy-search?query={{关键词}}
    // http://novel.kele8.cn/search?keyword={keyword}
    // this.axios("/book/fuzzy-search?query=" + this.bookName)
    this.axios("https://novel.kele8.cn/search?keyword=" + this.bookName)
      .then((result) => {
        console.log(result);
        this.resultBook = result.data.books;
        this.isSearching = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  watch: {},
  computed: {},
  methods: {},
  components: {
    SearchResultehead,
    ItemY,
  },
  beforeRouteEnter(to, from, next) {
    // ...
    // 直接搜索书名
    // console.log(to.query.bookName, from);

    setTimeout(() => {
      next((vm) => {
        vm.isSearching = true;
        // console.log(to.query.bookName);
        vm.bookName = to.query.bookName;
        //www.api.zhuishushenqi.com/book/fuzzy-search?query={{关键词}}
        // this.axios("/book/fuzzy-search?query=" + this.bookName)
        vm.axios("https://novel.kele8.cn/search?keyword=" + vm.bookName)
          .then((result) => {
            console.log(result);
            vm.resultBook = result.data.books;
            vm.isSearching = false;
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }, 500);
  },
  beforeRouteLeave(to, from, next) {
    // 直接搜索书名

    next();
  },
};
</script>

<style lang="scss">
.gain-search-page {
  margin-top: 50px;
  padding: 0 10px;
  .gain-search-content {
    .result-books-lis {
      // display: flex;
      // flex-wrap: wrap;
    }
  }
}
</style>
