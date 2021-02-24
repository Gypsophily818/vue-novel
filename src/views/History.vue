<template>
  <div class="bookshlef-history">
    <ul class="bookshlef-history-list" v-if="ReadhistoryBook">
      <!-- :key="book._id" -->
      <ItemY
        :ReadHistoryItem="ReadHistory[index]"
        v-for="(book, index) in ReadhistoryBook"
        :key="book._id"
        :book="book"
        :index="index"
        result="bookShelf"
        :BookShelfCurrentPage="BookShelfCurrentPage"
        :resultHistoryBookChapter="resultHistoryBookChapter[index]"
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
      ReadhistoryBook: [],
      resultHistoryBookChapter: [],
    };
  },

  created() {
    // 书籍详情
    console.log("阅读记录:", this.ReadHistory);

    // 无历史阅读版本
    // // 获取书籍详情
    for (let i = 0; i < this.ReadHistory.length; i++) {
      setTimeout(() => {
        this.axios
          .get(
            "https://novel.kele8.cn/book-info/" + this.ReadHistory[i].bookID + ""
          ) //历史章节
          // .get("http://novel.kele8.cn/book-info/" + this.ReadHistory[i] + "")
          // .get("/book/" + this.bookrack[i] + "")
          .then((response) => {
            console.log("阅读记录书籍:", response);
            this.book = response.data;
            // console.log("获取书架的书", this.book);
            this.ReadhistoryBook.push(this.book);
            // console.log("ReadhistoryBook",this.ReadhistoryBook);
            // console.log("获取书架的书id", this.book._id);
            return this.book._id;
          })
          .then((resolve) => {
            console.log(resolve);
            // console.log("获取书架的书id", this.book._id);
            setTimeout(() => {
              // 1获取书籍源
              this.axios
                .get(
                  "https://novel.kele8.cn/book-sources?view=summary&book=" +
                    resolve
                )
                .then((response) => {
                  // 书籍源
                  // console.log("优质书源", response.data);
                  return response.data[0]._id;
                })
                .then((resolve) => {
                  // 2获取章节列表
                  // console.log("我的书架的书的优质书源:id", resolve);
                  this.axios
                    .get("https://novel.kele8.cn/book-chapters/" + resolve)
                    .then((response) => {
                      // 根据书籍源获取 章节列表
                      this.resultHistoryBookChapter.push(response.data);
                      // console.log("chapter", this.resultHistoryBookChapter);
                    });
                });
            }, 200);
          });
      }, 100);
    }

    // 有阅读记录章节
    // 获取书籍详情
    // this.ReadHistory.map((item) => {
    //   setTimeout(() => {
    //     this.axios
    //       .get("http://novel.kele8.cn/book-info/" + item.bookID + "")
    //       // .get("/book/" + this.bookrack[i] + "")
    //       .then((response) => {
    //         // console.log("进入书本详情页", response);
    //         this.book = response.data;
    //         // console.log("获取书架的书", this.book);
    //         this.ReadhistoryBook.push(this.book);
    //         // console.log("ReadhistoryBook",this.ReadhistoryBook);
    //         // console.log("获取书架的书id", this.book._id);
    //         return this.book._id;
    //       })
    //       .then((resolve) => {
    //         // console.log("获取书架的书id", this.book._id);
    //         setTimeout(() => {
    //           // 1获取书籍源
    //           this.axios
    //             .get(
    //               "http://novel.kele8.cn/book-sources?view=summary&book=" +
    //                 resolve
    //             )
    //             .then((response) => {
    //               // 书籍源
    //               // console.log("优质书源", response.data);
    //               return response.data[0]._id;
    //             })
    //             .then((resolve) => {
    //               // 2获取章节列表
    //               // console.log("我的书架的书的优质书源:id", resolve);
    //               this.axios
    //                 .get("http://novel.kele8.cn/book-chapters/" + resolve)
    //                 .then((response) => {
    //                   // 根据书籍源获取 章节列表
    //                   this.resultHistoryBookChapter.push(response.data);
    //                   // console.log("chapter", this.resultHistoryBookChapter);
    //                 });
    //             });
    //         }, 200);
    //       });
    //   }, 100);
    // });
  },
  components: {
    ItemY,
  },
  computed: {
    ...mapState(["ReadHistory", "chapter"]),
  },
};
</script>

<style lang="scss" scoped>
.bookshlef-history {
  margin-top: 50px;
}
</style>
