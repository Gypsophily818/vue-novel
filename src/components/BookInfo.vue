<template>
  <div class="book-info">
    <template v-if="book">
      <div class="book-wrap">
        <i class="img-container">
          <img
            :src="`http://statics.zhuishushenqi.com${book.cover}`"
            alt="网络不好请重新刷新页面"
          />
        </i>
        <div class="book-box">
          <span class="title">{{ book.title }}</span>
          <p class="category">
            <span class="author">{{ book.author }}</span>
            <span class="icon-carve">|</span>
            <span class="type">{{ book.minorCate }}</span>
            <span class="icon-carve">|</span>
            <span class="wordCount">{{
              book.wordCount | formatwordCount
            }}</span>
          </p>
          <template v-if="book.isSerial">
            <p class="update-time">{{ formatUpdateTime(book.updated) }}</p>
          </template>
          <template v-else>
            <span class="isOver">完结</span>
          </template>
        </div>
      </div>

      <div class="btn-wrap">
        <button
          @click="startToRead(book._id)"
          :disabled="isShowDisscusSkeleton ? false : true"
        >
          开始阅读
        </button>
        <button
          class="remove-from-bookshelf"
          @click="removeBookrack($route.params.id)"
          v-if="bookrack.find((id) => id == $route.params.id)"
        >
          移出书架
        </button>
        <button @click="addBookrack($route.params.id)" v-else>
          加入书架
        </button>
      </div>
      <div class="info-detail">
        <span class="book-info-text"
          >追人气
          <p>{{ book.latelyFollower | formatlatelyFollower }}</p>
        </span>
        <span class="book-info-text"
          >读者留存率
          <p>{{ book.retentionRatio }}%</p>
        </span>
        <span class="book-info-text" v-if="!book.allowMonthly"
          >日更字数/天
          <p>{{ book.serializeWordCount }}</p></span
        >
      </div>
      <div class="bookinfo-resume">
        <div class="info">
          <p class="info-text" :class="{ active: showAll }">
            <template v-if="book.longIntro">
              {{ book.longIntro }}
            </template>
            <template v-else>
              {{ book.shortIntro }}
            </template>
          </p>
          <span
            class="arrow"
            @click="showAllInfo"
            :class="{ up: showAll }"
          ></span>
        </div>
      </div>
      <div class="inner" @click="ToChapter">
        <span>目录</span>
        <span class="inner-right" v-if="book.updated"
          >[{{ formatUpdateTime(book.updated) }}] {{ book.lastChapter }}
        </span>
        <i class="icon-right"></i>
      </div>
    </template>
    <van-skeleton title :row="8" v-else />
    <!-- <div class="hot-comment" v-if="isShowVantSkeleton"> -->
    <div class="hot-comment">
      <div class="hot-comment-top">
        <!-- <template v-if="bookreviews"> -->
        <template v-if="currentBookreviews && isShowDisscusSkeleton">
          <span class="comment-title">相关书评</span>
          <!-- <ul class="c-comment-list" v-if="currentBookreviews.length !== 0 && isShowDisscusSkeleton"> -->
          <ul class="c-comment-list" v-if="currentBookreviews.length !== 0">
            <li v-for="(item, index) in currentBookreviews" :key="index">
              <div class="comment-inner">
                <img
                  :src="'http://statics.zhuishushenqi.com' + item.author.avatar"
                  alt="加载失败,请重新刷新"
                  class="avater"
                />

                <div class="right">
                  <p class="name">{{ item.author.nickname }}</p>
                  <p class="title">{{ item.title }}</p>
                  <p class="score">
                    <template v-if="item.rating === 1">
                      <i class="star-full"></i>
                    </template>
                    <template v-if="item.rating === 2">
                      <i class="star-full"></i>
                      <i class="star-full"></i>
                    </template>
                    <template v-if="item.rating === 3">
                      <i class="star-full"></i>
                      <i class="star-full"></i>
                      <i class="star-full"></i>
                    </template>
                    <template v-if="item.rating === 4">
                      <i class="star-full"></i>
                      <i class="star-full"></i>
                      <i class="star-full"></i>
                      <i class="star-full"></i>
                    </template>
                    <template v-if="item.rating === 5">
                      <i class="star-full"></i>
                      <i class="star-full"></i>
                      <i class="star-full"></i>
                      <i class="star-full"></i>
                      <i class="star-full"></i>
                    </template>
                  </p>
                  <p class="content">
                    {{ item.content }}
                  </p>
                  <p class="love">
                    <span v-if="book.isSerial">{{
                      formatUpdateTime(item.created)
                    }}</span
                    ><span>{{ item.helpful.yes }}人觉得有用</span>
                  </p>
                </div>
              </div>
            </li>
          </ul>
          <div style="padding-left:0;margin:20px;font-size:12px" v-else>
            暂无相关评论~
          </div>
        </template>
        <van-skeleton v-else title avatar :row="5" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  props: ["book", "bookreviews"],
  data() {
    return {
      showAll: false,
      firstContent: "",
      isShowVantSkeleton: false, // 进入时的骨架屏
      isShowDisscusSkeleton: false, // 进入时评论的骨架屏
      // bookDetailChapter: [], //书本目录
      readIndex: "", // 阅读章节地址栏展示索引
    };
  },
  created() {
    this.isShowVantSkeleton = false;
    this.isShowDisscusSkeleton = false;

    console.log("created");
    console.log("获取当前书籍ID", this.$route.params.id);
    // 获取书籍源
    this.axios
      // .get("http://novel.kele8.cn/book-sources?view=summary&book=" +this.bookInfo._id)
      .get(
        "https://novel.kele8.cn/book-sources?view=summary&book=" +
          this.$route.params.id
      )
      // .get("/btoc?view=summary&book=" + this.$route.params.id)

      .then((res) => {
        // 根据书籍源获取 章节列表
        // console.log(res.data[0]._id);
        console.log("获取到书籍源id,准备进一步获取书籍章节列表", res);
        this.axios
          .get("https://novel.kele8.cn/book-chapters/" + res.data[0]._id)
          .then((res) => {
            console.log("获取章节列表", res.data);
            // this.bookDetailChapter.push(res.data);
            this.$store.commit("updateChapter", res.data.chapters);
            if (res) {
              this.isShowVantSkeleton = true;
              this.isShowDisscusSkeleton = true;
            } else {
              this.$toast("呀...网络错误,请刷新");
            }
            console.log("获得章节", this.chapter);
          });
      });
  },
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
      if (to.params.id !== null && to.params.id !== undefined) {
        this.isShowVantSkeleton = false;
        this.isShowDisscusSkeleton = false;
        console.log("=====>路有变化", to.params.id, from);
        // 获取书籍源
        this.axios
          .get(
            "https://novel.kele8.cn/book-sources?view=summary&book=" +
              to.params.id
          )
          .then((res) => {
            // 根据书籍源获取 章节列表
            // console.log(res.data[0]._id);
            console.log(res);
            this.isShowVantSkeleton = true;
            this.axios
              .get("https://novel.kele8.cn/book-chapters/" + res.data[0]._id)
              // .get("/mix-atoc/"+ res.data[0]._id+"?view=chapters")
              .then((res) => {
                console.log("获取章节列表", res.data);
                this.$store.commit("updateChapter", res.data.chapters);
                this.isShowDisscusSkeleton = true;
              });
          });
      }
    },
  },
  mounted() {
    this.$toast("加载中...");
  },
  computed: {
    ...mapState(["bookrack", "chapter", "ReadHistory"]),
    currentBookreviews() {
      let bookreviewsIndex = Math.floor(
        (Math.random() * this.bookreviews.length) % 5
      );
      // console.log(bookreviewsIndex);
      return this.bookreviews.slice(
        bookreviewsIndex * 5,
        (bookreviewsIndex + 1) * 5
      );
    },
  },
  methods: {
    ...mapMutations(["addBookrack", "removeBookrack", "updateReadHistory"]),
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
    showAllInfo() {
      this.showAll = !this.showAll;
    },
    startToRead(bookID) {
      console.log("bookID", bookID);
      console.log("bookId", this.$route.params.id);
      console.log("ReadHistory", this.ReadHistory);
      // this.updateReadHistory(bookId);
      let isInReadHistory = this.ReadHistory.find((e) => {
        return e.bookID === bookID;
      });

      setTimeout(() => {
        console.log("isInReadHistory88", isInReadHistory);
        if (isInReadHistory !== undefined) {
          //有阅读记录
          this.readIndex = isInReadHistory.historyChapter;
        } else {
          //没有本地阅读记录
          this.readIndex = 0;
        }
        console.log(isInReadHistory);
        console.log(this.readIndex);
        this.$router.push({
          path: "/book/" + this.$route.params.id + "/read",
          query: { readIndex: this.readIndex },
        });
      }, 500);

      console.log("isInReadHistory==>", isInReadHistory);
      console.log("this.readIndex==>", this.readIndex);

      // 阅读前获取本地阅读记录存储 , 查看是否有这本书的阅读记录
      // this.ReadHistory =>阅读记录

      // this.$router.push("/book/" + this.$route.params.id + "/read");

      // this.$router.push({
      //   path: "/book/" + this.$route.params.id + "/read",
      //   query: { readIndex: this.readIndex },
      // });
    },
    ToChapter() {
      this.$emit("bookTitle");
      this.$router.push("/book/" + this.$route.params.id + "/chapter");
    },
  },
  filters: {
    formatwordCount(value) {
      return (value / 10000).toFixed(0) + "万字";
    },
    formatlatelyFollower(value) {
      return (value / 10000).toFixed(1) + "万";
    },
  },
  beforeRouteUpdate(to, from, next) {
    console.log(888);
    next();
    // this.$toast("加载中...");
  },
  beforeRouteLeave(to, from, next) {
    // ...
    next();
  },
};
</script>

<style lang="scss" scoped>
.book-info {
  .book-wrap {
    display: flex;
    background-color: #fff;
    .img-container {
      display: inline-block;
      img {
        width: 5.25rem;
        height: 7rem;
        border-radius: 2px;
        box-shadow: none;
        margin-right: 10px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      }
    }
    .book-box {
      .title {
        font-weight: 600;
        font-size: 14px;
      }
      .category {
        margin-top: 6px;
        .author {
          font-size: 12px;
          color: #b93321;
          margin-right: 10px;
        }
        .type {
          font-size: 12px;
          color: #999;
          margin: 0 10px;
        }
        .wordCount {
          font-size: 12px;
          color: #999;
          margin-left: 10px;
        }
      }
      .update-time {
        font-size: 12px;
        color: #999;
        margin-top: 8px;
      }
    }
  }
  .btn-wrap {
    margin: 20px;
    display: flex;
    justify-content: space-around;
    position: relative;
    margin-bottom: 30px;
    button {
      box-shadow: inset 1px 0 #e3e4e6, inset 0 1px #e3e4e6, inset 0 -1px #e3e4e6,
        inset -1px 0 #e3e4e6;
      padding: 4px 8px;
      width: calc(100% - 0.6667rem);
      margin-left: 0.3333rem;
      font-size: 14px;
      background-color: #fff;
      border: none;
    }
    .remove-from-bookshelf {
      background: #f6f7f9;
      color: #ccc;
    }
    &::after {
      content: "";
      width: 100vw;
      height: 0;
      display: block;
      position: absolute;
      bottom: -20px;
      border-bottom: 1px solid #ebebeb;
    }
  }
  .info-detail {
    display: flex;
    padding: 4px 0px;
    height: 40px;
    line-height: 20px;

    justify-content: space-around;
    text-align: center;
    position: relative;
    margin-bottom: 20px;
    .book-info-text {
      // text-overflow: ellipsis;
      // overflow: hidden;
      // white-space: nowrap; //保持一行显示
      // width: 50vw;
      color: #999;
      font-size: 13px;
      p {
        color: #222;
        font-weight: 400;
        font-size: 16px;
      }
    }
    &::after {
      content: "";
      width: 100vw;
      height: 0;
      display: block;
      position: absolute;
      bottom: -10px;
      border-bottom: 1px solid #ebebeb;
    }
  }
  .bookinfo-resume {
    position: relative;
    padding: 0.53333rem;
    background: #fff;
    padding-bottom: 14px;
    border-bottom: 1px solid #ebebeb;

    p.info-text {
      font-size: 13px;
      line-height: 1.5rem;
      word-break: break-all;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      -webkit-transition: all 0.4s ease;
      &.active {
        display: block;
      }
    }
    .arrow {
      position: absolute;
      width: 1.23333rem;
      height: 0.53333rem;
      bottom: 0.46667rem;
      right: 0rem;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAENklEQVR4Xu3dzW0TURTF8feClHXowIvYYukFyTolQAWYEqgASoAKCB3QAVnHkWAb2xIpwTTghybgKB8zztzxfNx3zvEO8oJ87//Hk5PNxKAX9QYi9fQaPggAOQIBEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4+sGEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4+sGEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4+sGEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4z+5ASaT03cxpVmKcb3ZbL6sVlcX5DvKdvyiZQjhzf8Bvi0Wl98fD/MAwGR88jXGOLt/aJPS++Vyfp7tFkjfeFnLsNl8uF5dfb6/kjsA4/HJ9CDGn2X7EoK8FJXGDyGklNaL5fxlKYDj49dnLw4OflSNKgR5IKiKv33314vLB7f+3R9ejaajdHj4e9eYQuAbwXPxU0p/Fsv5UekNUPzlZHL6KYbwUQh8hy57d8/FL74nhfD28QfBpz8FjE/OY4zFp8fKl24CX0DqxK9qVvqLoIkQ+Cq8493sE7/4Zyt/EygE/g3sG38ngNvPBLoJ3CpoI/6zAITAZ/+24tcCIAS+ELQZvzYAIfCBoO34JgBCMCyCLuKbAQjBMAi6it8IgBD0i6DL+I0BCEE/CLqOvxcAIegWQR/x9wYgBN0g6Ct+KwCEoF0EfcZvDYAQtIOg7/itAhCC/RAMEb91AELQDMFQ8TsBIAQ2BEPG7wyAENRDMHT8TgEIwW4EHuJ3DkAIyhF4id8LACF4iMBT/N4ACME/BN7i9wqAHYHH+L0DYEXgNf4gANgQeI4/GAAWBN7jDwoAHUEO8QcHgIogl/guAKAhyCm+GwAoCHKL7wpA7ghyjO8OQK4Ico3vEkBuCHKO7xZALghyj+8agHcECPHdA/CKACV+FgC8IUCKnw0ALwjQ4mcFYGgEiPGzAzAUAtT4WQLoGwFy/GwB9IUAPX7WALpGwBA/ewBdIWCJDwGgbQRM8WEAtIWALT4UgH0RMMaHA9AUAWt8SABWBMzxYQHURRBSuggxnhXnq17oT0eBfnRsnecdMMeHvgG2YZsiQP+fv90P9A3QFAFLfIobwIqAKT4VgDofDNni0wHYhYAxPiWAWwT3npBaPE41xDgre7T6rp8QUL5G8SGwKtZoND26ufm1RonZZA5qAE0WhvY9AoBW1DiPABgXhnZcANCKGucRAOPC0I4LAFpR4zwCYFwY2nEBQCtqnEcAjAtDOy4AaEWN8wiAcWFoxwUArahxHgEwLgztuACgFTXOIwDGhaEdFwC0osZ5BMC4MLTjAoBW1DiPABgXhnZcANCKGucRAOPC0I4LAFpR4zwCYFwY2nEBQCtqnEcAjAtDOy4AaEWN8wiAcWFoxwUArahxnr+aEMOu5NitsQAAAABJRU5ErkJggg==)
        50% no-repeat;
      background-size: 60%;
      background-repeat: no-repeat;
      background-position: 50%;
      -webkit-transition: all 0.1s ease;
      &.up {
        -webkit-transform: rotate(180deg);
      }
    }
  }
  .inner {
    display: flex;
    justify-content: space-between;
    height: 2.7rem;
    line-height: 2.7rem;
    background: #fff;
    padding: 0 0 0 0.53333rem;
    color: #333;
    font-size: 14px;
    border-bottom: 1px solid #ebebeb;
    .inner-right {
      color: #999;
      font-size: 12px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      width: 70vw;
      text-align: right;
    }
    .icon-right {
      display: inline-block;
      width: 1rem;
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAENklEQVR4Xu3dzW0TURTF8feClHXowIvYYukFyTolQAWYEqgASoAKCB3QAVnHkWAb2xIpwTTghybgKB8zztzxfNx3zvEO8oJ87//Hk5PNxKAX9QYi9fQaPggAOQIBEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4+sGEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4+sGEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4+sGEADyDZCPrxtAAMg3QD6+bgABIN8A+fi6AQSAfAPk4z+5ASaT03cxpVmKcb3ZbL6sVlcX5DvKdvyiZQjhzf8Bvi0Wl98fD/MAwGR88jXGOLt/aJPS++Vyfp7tFkjfeFnLsNl8uF5dfb6/kjsA4/HJ9CDGn2X7EoK8FJXGDyGklNaL5fxlKYDj49dnLw4OflSNKgR5IKiKv33314vLB7f+3R9ejaajdHj4e9eYQuAbwXPxU0p/Fsv5UekNUPzlZHL6KYbwUQh8hy57d8/FL74nhfD28QfBpz8FjE/OY4zFp8fKl24CX0DqxK9qVvqLoIkQ+Cq8493sE7/4Zyt/EygE/g3sG38ngNvPBLoJ3CpoI/6zAITAZ/+24tcCIAS+ELQZvzYAIfCBoO34JgBCMCyCLuKbAQjBMAi6it8IgBD0i6DL+I0BCEE/CLqOvxcAIegWQR/x9wYgBN0g6Ct+KwCEoF0EfcZvDYAQtIOg7/itAhCC/RAMEb91AELQDMFQ8TsBIAQ2BEPG7wyAENRDMHT8TgEIwW4EHuJ3DkAIyhF4id8LACF4iMBT/N4ACME/BN7i9wqAHYHH+L0DYEXgNf4gANgQeI4/GAAWBN7jDwoAHUEO8QcHgIogl/guAKAhyCm+GwAoCHKL7wpA7ghyjO8OQK4Ico3vEkBuCHKO7xZALghyj+8agHcECPHdA/CKACV+FgC8IUCKnw0ALwjQ4mcFYGgEiPGzAzAUAtT4WQLoGwFy/GwB9IUAPX7WALpGwBA/ewBdIWCJDwGgbQRM8WEAtIWALT4UgH0RMMaHA9AUAWt8SABWBMzxYQHURRBSuggxnhXnq17oT0eBfnRsnecdMMeHvgG2YZsiQP+fv90P9A3QFAFLfIobwIqAKT4VgDofDNni0wHYhYAxPiWAWwT3npBaPE41xDgre7T6rp8QUL5G8SGwKtZoND26ufm1RonZZA5qAE0WhvY9AoBW1DiPABgXhnZcANCKGucRAOPC0I4LAFpR4zwCYFwY2nEBQCtqnEcAjAtDOy4AaEWN8wiAcWFoxwUArahxHgEwLgztuACgFTXOIwDGhaEdFwC0osZ5BMC4MLTjAoBW1DiPABgXhnZcANCKGucRAOPC0I4LAFpR4zwCYFwY2nEBQCtqnEcAjAtDOy4AaEWN8wiAcWFoxwUArahxnr+aEMOu5NitsQAAAABJRU5ErkJggg==)
        50% no-repeat;
      background-size: 60%;
      background-repeat: no-repeat;
      background-position: 50%;
      transform: rotate(-90deg);
    }
  }
  .hot-comment {
    .hot-comment-top {
      padding-top: 8px;
      .comment-title {
        padding: 8px;
        line-height: 30px;
        font-size: 14px;
      }
      .c-comment-list {
        margin-top: 10px;
        .comment-inner {
          margin-top: 10px;
          padding-bottom: 5px;
          border-bottom: 1px solid #ebebeb;
          display: flex;
          .avater {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 50%;
            margin-right: 10px;
          }
          .right {
            width: 78vw;
            .name {
              position: relative;
              height: 0.8rem;
              line-height: 0.8rem;
              color: hsl(40, 28%, 51%);
              font-size: 12px;
            }
            .title {
              margin-top: 5px;
              height: 0.8rem;
              line-height: 0.8rem;
              font-weight: 600;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              font-size: 12px;
              color: #000;
            }
            .score {
              margin-top: 4px;
              height: 0.66667rem;
              padding: 0.17333rem 0;
              font-size: 0;
              .star-full {
                display: inline-block;
                vertical-align: middle;
                width: 0.66rem;
                height: 0.66rem;
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAH1UlEQVR4Xu2dXXLTSBDHu2UwtVUkNicgOQHmBIQHbN42e4LNXmCxToA5gcxeYMMJyL5h80A4AeEECSfADlRtEYh6a2y8cRzJtuRRtzTTfslD5PF0/3/dUo/mA0E/XnsAvbZejQdvAfg3erpzgfEzw0Cdgpe/hG/OfOTBSwDOo/Y+Ib6eFzwgfLwVvjn2DQLvAKBorznG+ikCNufFJqBRgy52MTwe+QSBdwCMo/YhIP6eKDLRq0Y4PFAAHPXA9L5Pp8vMqxPu+vQ84FUGWBr9Myo8ywLeALBO9M8Y8CkLeAPAWtHvYRbwAoAs0e9bFvACgEzR71kWcB6APNHvUxZwHoBc0e9RFnAagE2i35cs4DQAG0W/J1nAWQBsRL8PWcBZAKxEvwdZwEkAbEa/61nASQCsRv//WQBeNsJB17X3ZM4BYN73n+Odz7aFcnW+gHMAjKN2DxCf2wZg0h7Ri0Y47BXStlCjTgGQNtvHlm9dzAJOAVBo9F9VBE5lAWcAKDr6r54F3Zo76AwALNHvYBZwAgCu6HcxCzgBAGv0O5YFKg8Ad/S7lgUqD4BI9DuUBSoNgFT0u5QFKg2AaPQ7kgUqC4B09LuSBSoLQCmi34EsUEkAyhL9LmSBSgJQquiveBaoHABli/6qZ4FKAfA1etK6nKztx5LOzKF+jejV3fDtia1X0EW3UzoAzHy+H7XL+zEFLSDaIcAWAOwgwE7RzrDZPgGYPYfOEOgEEM8CjE9uXdY+lW3vAREArokM1CTCPQBq4lRs5z9koAAcIdKx+SsJR2EAmHv119rtB0S4QwA7vomcl+J5ONBkEKSzu5ffPxa1d9FGANwUGVoA2ESAvbwO0O+le4AAjgFohAgntuBYC4Avfz15RBQ0CahFpCKXEdLrcOAJYjza+vPt+1V9TQVg/LL9nAj2fbkvr3JUVf9vbimIcNR4NnyRZEMiAKN+552m8apKntxvkyGa3cHjxf/eAOBL9HQvRnrnlvlqjfFA0m6oNwA4j54cEAZ/q8vc8wBS/Md2+PZw3rIbABS1tMo9d1bPom36dm+xnEx8Bijly5bq+btcPSYIG+Ggv/IZYHbBKGofI+KjclmhvcnlgSW7n6aWgZO3blA3EDzI9aP6pXJ4YMXWtysHggpZa18O17jfizX2PV4JgPGSQlBBVtYQ31i1FgAKQcUAWFP8TAAoBBWBIIP4mQFQCEoOQUbxcwGgEJQUghzi5wZAISgZBJR/B7O1HwKTTNbqQB6EpPH9LL3aCIBpJuj0AWFyAKN+eD2wqfgb3QLmTdU3iLzCT4RLeLOXpxcbZ4DZjyoEedyf7zu2xLeWARSCfELm+ZZN8a0DYBrUTJBH1vW+Y1v8QgBQCNYTM+tVRYhfGAAKQVZ5l19flPiFAqAQ2IGgSPELB0AhyA8BEY0DoO7iJM78LSZ/01oZuKxj5sEwBuwjYsO2AS62Z8S/BbTHscycBQAjklnb/wPQTDFTCJZQyyk+yy1g3laFYHm+4hafHQDNBOkASIgvAoBCcBMCKfHFAFAIriCQFF8UAIXAnEHF97SfdvNhqwLSOuDzCiQiet8Mh6K7qcgD0G9/RsCmi/X8KpvMKWTN7vDequuK/L8oALoSGSBpxW6Rgi+2LQqAbkaRvGmDNwCMo04XECJOg0v3WynLtrn6KZoBdFaxOY42/5RuG5CIAuBzBTATT7oSEAVg3O+QDYqr3kajOxDTQeyHzX7BF0inVRfPRv/rhLtSm0iLAaAVwBU6Sdu32QBrnTbEANCNqObkIRI7kVwSgEOYHP6gH8i5steG58QA0Arg2htBsXcCYgBoBXA9fqUqAREApmf/BB9spDBX2pCqBEQAOI/a+4T42hXxbNiBRL9th8MjG21laUMEAK0AEiQSqgSEAOgcAcKvWUh1/lqCfxrhYJ/bThEARv32Bz2J5LrU5mSPZnf40AsAtAJIllmiEmDPAFoBpMd4jeKHHMvB5nvADoBuIJEOgEQlwA6AVgBL7vIClQA7AGUZAjYTMW4BTQ6h/jFduSx+OIbE5BB+APqdU8mDoI2TaxD0tsI3x/OxaF5PX0LckwTBHDjd7A52OSsBdgCkKgAi+liDoLso/KKzf4JgMoLISSnclQArABKTQIjgUwBxL+tOG9NNLYIeItznjEjuySGsAHBWAHmFXxSbG4Si9wRatI8VAI59hc2CSwToN8Jhz2bkmuqFALqF73DCXAmwAlBkBTATfhsu+ouHI9oCYbKUDerdIkHgrgR4AShgISiH8IsAzUAAxOe24Jq1w71glA2AQhaCEr2qQ9CTmlI9mdoOcc/23EbOBaNsAFitAISFX4x62yBwVgJsANhYCGruj3cgOJCK+FXp3oDwDeLDjQeTGBeMcgKQ+2SRtNG7VYJI/X/jUUXGBaNsAOSpAKomfMqoYubhZc5KgA+ADBWArUEcqQyw6WCSmwBEnbNVw6quCZ8XBCcBGEfpE0GntTz2GuGgX5aoLbIf5oGYgMytIXnfZMalYmy3gJ8PRkfzRksM4hQpbJa200YVjU/uQNDiqnTYADDOmcwHBNwHwCZCfLIF34+KGrbNIobktQaEL3B7nyBoAdCoBnTEOS+QFQBJR+tvJ3tAAfCcDAVAAfDcA56brxlAAfDcA56brxlAAfDcA56brxlAAfDcA56brxlAAfDcA56b/x9iW4i9xBhznQAAAABJRU5ErkJggg==)
                  50% no-repeat;
                background-size: 80%;
                background-repeat: no-repeat;
                background-position: 0;
              }
            }
            .content {
              margin-top: 8px;
              height: 2.3rem;
              overflow: hidden;
              line-height: 1.2rem;
              text-align: justify;
              font-size: 12px;
            }
            .love {
              display: flex;
              justify-content: space-between;
              padding-top: 0.13333rem;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
