<template>
  <li
    class="item-Y"
    @click="
      $router.push('/book/' + book._id);
      $toast('加载中,请稍等...');
    "
    v-show="isRemoverBook"
  >
    <div class="Item-box-top">
      <i class="img-container">
        <img
          :src="`http://statics.zhuishushenqi.com${book.cover}`"
          alt="网络不好请重新刷新"
        />
      </i>
      <div class="book-box">
        <span class="title">{{ book.title }}</span>
        <p class="info">
          <template v-if="book.longIntro">
            {{ book.longIntro }}
          </template>
          <template v-else>
            {{ book.shortIntro }}
          </template>
        </p>
        <p class="category">
          <span>
            <svg
              id="icon-human"
              viewBox="0 0 10 12"
              width="12px"
              height="12px"
              fill="#969ba3"
            >
              <path
                d="M6.375 6.683C7.053 5.873 7.5 4.649 7.5 3.6 7.5 2.023 6.462 1 5 1S2.5 2.023 2.5 3.6c0 1.05.447 2.274 1.125 3.083a1 1 0 0 1-.463 1.595C1.79 8.715 1 9.537 1 10.5c0-.106-.036-.165-.012-.147.136.1.39.21.743.308C2.52 10.88 3.675 11 5 11c1.325 0 2.48-.12 3.27-.339.352-.097.606-.208.742-.308.024-.018-.012.04-.012.147 0-.963-.789-1.785-2.162-2.222a1 1 0 0 1-.463-1.595zm1.18.071a5.23 5.23 0 0 1-.414.571c.226.072.444.155.653.25l.306.15C9.222 8.32 10 9.268 10 10.5c0 1-2.239 1.5-5 1.5s-5-.5-5-1.5c0-1.232.778-2.179 1.9-2.775l.306-.15c-.306.15.427-.178.653-.25a5.23 5.23 0 0 1-.414-.57l-.17-.287C1.79 5.59 1.5 4.55 1.5 3.6 1.5 1.39 3.067 0 5 0s3.5 1.39 3.5 3.6c0 .951-.29 1.991-.775 2.868l-.17.286z"
              ></path>
            </svg>
            <span class="item-y-author"> {{ book.author }}</span>
          </span>

          <template
            v-if="
              BookShelfCurrentPage === 'History' &&
                ReadHistoryItem &&
                resultHistoryBookChapter
            "
          >
            <span class="transform">
              <span class="type">
                <!-- historyChapter -->
                <!-- 阅读至第{{ ReadHistory[index].historyChapter }}章</span> -->
                阅读至第{{
                  ReadHistoryItem.historyChapter === 0
                    ? 1
                    : ReadHistoryItem.historyChapter
                }}章</span
              >
            </span>
          </template>

          <template v-if="BookShelfCurrentPage === 'SearchResult'">
            <span class="transform">
              <span class="type" v-if="book.minorCate">{{
                book.minorCate
              }}</span>

              <template v-if="isSerial">
                <span class="isOver">正在连载</span>
              </template>
              <template v-else>
                <span class="isOver">已经完本</span>
              </template>
              <span class="wordCount">{{ wordCount | formatwordCount }}</span>
            </span>
          </template>
        </p>
      </div>
    </div>
    <div
      class="info-detail"
      v-if="result === 'result'"
      style="justify-content: space-around;"
    >
      <span class="book-info-text"
        >人气
        <p>{{ book.latelyFollower | formatlatelyFollower }}</p>
      </span>
      <span class="book-info-text"
        >读者留存率
        <p>{{ book.retentionRatio }}%</p>
      </span>
    </div>
    <div class="info-detail" v-if="result === 'bookShelf'">
      <template v-if="isSerial">
        <span class="book-info-text"
          >最新更新
          <span class="inner-right" v-if="book.updated"
            >[{{ formatUpdateTime(book.updated) }}] {{ book.lastChapter }}
            <i class="icon-right"></i
          ></span>
        </span>
      </template>
      <template v-else>
        <span class="isOver">已经完本: {{ book.lastChapter }}</span>
      </template>

      <span
        class="book-info-text-continue"
        v-if="BookShelfCurrentPage === 'My' && resultBookChapter"
        @click.stop="continueToReadMy(book._id, resultBookChapter.chapters)"
        >继续阅读
      </span>
      <span
        class="book-info-text-continue"
        @click.stop="
          continueToReadHistory(
            book._id,
            resultHistoryBookChapter.chapters,
            ReadHistoryItem.historyChapter
          )
        "
        v-if="BookShelfCurrentPage === 'History'"
        >继续阅读
      </span>
    </div>
    <template>
      <div
        id="edit"
        v-if="BookShelfCurrentPage === 'History'"
        @click.stop="triggerDelHistory(book._id)"
      >
        删除历史
      </div>
      <div
        id="edit"
        v-if="BookShelfCurrentPage === 'My'"
        @click.stop="triggerRemove(book._id)"
      >
        移出书架
      </div>
    </template>
  </li>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    // ...mapState(["ReadHistory","chapterCounter"]),
    ...mapState(["chapterCounter"]),
  },
  props: [
    "index",
    "book",
    "result",
    "BookShelfCurrentPage",
    "resultBookChapter",
    "resultHistoryBookChapter",
    "ReadHistoryItem",
  ],
  data() {
    return {
      isSerial: "",
      wordCount: "",
      enterCounter: 0,
      isRemoverBook: true, // 移除/删除 事件
    };
  },

  created() {
    // console.log(this.ReadHistory);
    this.axios
      .get("https://novel.kele8.cn/book-info/" + this.book._id + "")
      .then((response) => {
        // console.log(response.data.isSerial);
        this.isSerial = response.data.isSerial;
        this.wordCount = response.data.wordCount;
      });
  },
  methods: {
    ...mapMutations([
      "addBookrack",
      "removeBookrack",
      "updateReadHistory",
      "removeReadHistory",
    ]),
    // removeBookrack(e) {
    //   console.log(e);
    // },
    continueToReadMy(e, chapters ) {
      // console.log(e);
      // this.$toast("加载中,请稍等...");
      console.log("继续阅读:历史", e, chapters);

      // let historyCounter = this.ReadHistory.find((item) => item.bookID === e);
      // console.log("继续chapters", historyCounter);

      this.$store.commit("updateChapter", chapters);
      // this.$store.commit("updateChapter", this.chapterCounter);

      // this.$router.push("/book/" + this.$route.params.id + "/read");
      this.$router.push("/book/" + e + "/read");
    },
    continueToReadHistory(id, chapters, historyChapter) {
      // console.log(e);
      // this.$toast("加载中,请稍等...");
      console.log("继续阅读:历史", id);
      if (historyChapter === 0) {
        historyChapter = 1;
      }
      // let historyCounter = this.ReadHistory.find((item) => item.bookID === e);
      console.log("继续chapters", historyChapter);

      this.$store.commit("updateChapter", chapters);
      // this.$store.commit("updateChapter", this.chapterCounter);
      this.$router.push({
        path: "/book/" + this.$route.params.id + "/read",
        query: { cIndex: historyChapter-1 },
      });
      // this.$router.push("/book/" + e + "/read");
    },
    formatUpdateTime(value) {
      let str_arr = value.split("T");

      let time1 = str_arr[0].split("-");
      let time2 = str_arr[1].slice(0, 8).split(":");

      let updatedTime = window.Date.UTC(
        time1[0],
        time1[1] - 1,
        time1[2],
        time2[0],
        time2[1],
        time2[2]
      );
      // console.log(time1, time2, updatedTime);

      function before_time(dateTimeStamp) {
        var minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
        var hour = minute * 60;
        var day = hour * 24;
        var week = day * 7;
        var halfamonth = day * 15;
        var month = halfamonth * 2;
        var halfyear = day * 182.5;
        var year = halfyear * 2;
        var now = new Date().getTime(); //获取当前时间毫秒
        var diffValue = now - dateTimeStamp; //时间差

        if (diffValue < 0) {
          return;
        }
        var minC = diffValue / minute; //计算时间差的分，时，天，周，月
        var hourC = diffValue / hour;
        var dayC = diffValue / day;
        var weekC = diffValue / week;
        var monthC = diffValue / month;
        var yearC = diffValue / year;
        var result;
        // console.log(diffValue);
        if (yearC >= 1) {
          result = " " + parseInt(yearC) + "年前";
        } else if (monthC >= 1 && monthC <= 12) {
          result = " " + parseInt(monthC) + "个月前";
        } else if (weekC >= 1 && weekC <= 4) {
          result = " " + parseInt(weekC) + "周前";
        } else if (dayC >= 1 && dayC <= 7) {
          result = " " + parseInt(dayC) + "天前";
        } else if (hourC >= 1 && hourC <= 24) {
          result = " " + parseInt(hourC) + "小时前";
        } else if (minC >= 1 && minC <= 60) {
          result = " " + parseInt(minC) + "分钟前";
        } else if (diffValue >= 0 && diffValue <= minute) {
          result = "刚刚";
        }
        return result;
      }

      // console.log("更新于:=>", updatedTime);

      return before_time(updatedTime);
    },
    triggerRemove(book_id) {
      // 点击触发移除书本事件
      this.isRemoverBook = false;
      this.removeBookrack(book_id);
    },
    triggerDelHistory(book_id) {
      // 点击触发删除历史事件
      console.log(book_id);
      // this.isRemoverBook = false;
      this.removeReadHistory(book_id);
    },
  },
  filters: {
    formatwordCount: function(value) {
      //字数
      if (value > 10000) {
        return (value / 10000).toFixed(2) + "万";
      } else {
        return value;
      }
    },
    formatlatelyFollower(value) {
      // 人气
      if (value > 10000) {
        return (value / 10000).toFixed(1) + "万";
      } else {
        return value;
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    // ...
    next((vm) => (vm.isRemoverBook = true));
  },
};
</script>

<style lang="scss">
.item-Y {
  padding: 0px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
  .Item-box-top {
    display: flex;

    .img-container {
      margin-right: 8px;
      width: 4.2rem;
      min-width: 4.2rem;
      display: inline-block;
      img {
        width: 100%;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      }
    }
    .book-box {
      flex: 1;
      max-height: 300px;
      .title {
        font-size: 20px;
        font-weight: bold;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 16px;
      }
      .info {
        color: #969ba3;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 14px;
        margin-bottom: 3px;
        margin: 7px 0;
      }
      .category {
        padding: 0px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.75rem;
        white-space: nowrap;
        .icon-human {
          width: 10px;
          height: 10px;
          color: #969ba3;
        }
        .item-y-author {
          color: #969ba3;
        }
        .transform {
          transform: scale(0.8);
          .type {
            border: 1px solid #ccc;
            padding: 0 2px;
            margin: 0 1px;
          }
          .isOver {
            color: #ed424b;
            border: 1px solid #ed424b;
            padding: 0 2px;
            margin: 0 1px;
          }

          .wordCount {
            color: #4284ed;
            border: 1px solid #4284ed;
            padding: 0 2px;
            margin: 0 1px;
          }
        }
      }
    }
  }
}
.info-detail {
  display: flex;
  padding: 4px 0px;
  justify-content: space-between;
  text-align: center;
  position: relative;
  // margin-bottom: 20px;
  .book-info-text {
    color: #999;
    font-size: 13px;
    .inner-right {
      display: block;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap; //保持一行显示
      width: 70vw;
    }
    p {
      color: #222;
      font-weight: 400;
      font-size: 14px;
    }
  }
  .isOver {
    font-size: 14px;
    color: #999;
    margin-top: 8px;
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap; //保持一行显示
    width: 65vw;
  }

  .book-info-text-continue {
    display: inline-block;
    height: 20px;
    font-size: 14px;
    margin-top: 8px;
    color: #999;
    margin: auto 0;
    margin-bottom: 0;
  }
  &::after {
    content: "";
    width: 100vw;
    height: 0;
    display: block;
    position: absolute;
    bottom: -10px;
  }
}
#edit {
  padding: 5px;
  text-align: center;
  border-radius: 5px;
  background: #ed424b;
  color: #ffffff;
  font-family: "NOVEL";
}
</style>
