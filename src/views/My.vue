<template>
  <div class="my-bookshlef">
    <ul class="bookshlef-books-list" v-if="resultBook">
      <ItemY
        v-for="(book,index) in resultBook"
        :key="book._id"
        :book="book"
        result="bookShelf"
        :BookShelfCurrentPage="BookShelfCurrentPage"
        :resultBookChapter="resultBookChapter[index]"
      />
    </ul>
    <van-skeleton title :row="6" v-else style="margin-top: 50px" />
  </div>
</template>

<script>
import ItemY from "@/components/ItemY.vue";
import { mapState } from "vuex";
export default {
  props: ["BookShelfCurrentPage"],
  data() {
    return {
      resultBook: [],
      resultBookChapter: [],
      youzhishuyuanID: [],
    };
  },
  created() {
    console.log("我的收藏:", this.bookrack);
    // 获取书籍详情
    for (let i = 0; i < this.bookrack.length; i++) {
      setTimeout(() => {
        this.axios
          .get("https://novel.kele8.cn/book-info/" + this.bookrack[i] + "")
          // .get("/book/" + this.bookrack[i] + "")
          .then((response) => {
            // console.log("进入书本详情页", response);
            this.book = response.data;
            // console.log("获取书架的书", this.book);
            this.resultBook.push(this.book);
            // console.log("获取书架的书id", this.book._id);
            // console.log("resultBook", this.resultBook);
            return this.book._id;
          })
          .then((resolve) => {
            // console.log("获取书架的书id", this.book._id);
            setTimeout(() => {
                // 1获取书籍源
                this.axios
                  .get("https://novel.kele8.cn/book-sources?view=summary&book=" + resolve)
                  .then((response) => {
                    // 书籍源
                    // console.log("优质书源",response);
                    return response.data[0]._id;
                  })
                  .then((resolve) => {
                    // 2获取章节列表
                    // console.log("我的书架的书的优质书源:id", resolve);
                    this.axios
                      .get("https://novel.kele8.cn/book-chapters/" + resolve)
                      .then((response) => {
                        // 根据书籍源获取 章节列表
                        // return response.data[0]._id;
                        this.resultBookChapter.push(response.data);
                        // console.log("chapter", this.resultBookChapter);
                      });
                  });
            }, 200);
          });
      }, 100);
    }
  },
  components: {
    ItemY,
  },
  computed: {
    ...mapState(["bookrack", "chapter"]),
  },
  beforeRouteLeave(to, from, next) {
    // ...
    // console.log(to);
    next();
  },
};
</script>

<style lang="scss" scoped>
.my-bookshlef {
  margin-top: 50px;
  .bookshlef-books-list {
  }
}
</style>
