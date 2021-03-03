<template>
  <div class="read-page" id="read-page">
    <van-cell is-link @click.stop.prevent="showPopup">
      <!-- top -->
      <van-popup
        :overlay="false"
        position="top"
        :style="{ height: '7%' }"
        v-model="show"
      >
        <Readhead :closeNav="show === false ? false : ''"></Readhead>
      </van-popup>
      <!-- 弹出框 bottom -->
      <van-popup
        :overlay="false"
        :close-on-click-overlay="false"
        position="bottom"
        :style="{ height: '40px' }"
        v-model="show"
      >
        <footer>
          <div class="book-content" @click.stop.prevent="displayContent">
            目录
          </div>
          <van-popup
            overlay
            close-on-click-overlay
            position="left"
            :style="{ height: '100vh', width: '80vw' }"
            v-model="showContent"
          >
            <ReadChapter @upLoadChapterID="upLoadChapterID"></ReadChapter>
          </van-popup>
          <span
            :disabled="next_preBUtton"
            size="small"
            type="primary"
            class="pre-chapter"
            @click.stop="preChapter"
            color="rgba(0,0,0,0.2)"
            >上一章</span
          >

          <span
            :disabled="next_preBUtton"
            size="small"
            type="primary"
            class="next-chapter"
            @click.stop="nextChapter"
            color="rgba(0,0,0,0.2)"
            >下一章</span
          >
          <div
            class="change-day-state"
            v-if="isSunshine"
            @click.stop="changeSunshine"
          >
            日间
          </div>
          <div class="change-day-state" v-else @click.stop="changeSunshine">
            夜间
          </div>
        </footer>
      </van-popup>

      <!-- 书籍内容 -->
      <div class="read-page-content" v-if="list.length !== 0">
        <template v-if="!isSunshine">
          <van-cell
            v-for="(item, index) in list"
            :key="index"
            style="background-color: #c4b395;"
          >
            <!-- <van-index-anchor index="1" :title="item.title" sticky>{{
              item.title
            }}</van-index-anchor> -->

            <div>{{ item.title }}</div>

            <div class="book-detail-content" :index="index" ref="meta">
              <!-- <h1 class="Every-chapter-title">{{ item.title }}</h1> -->
              <div
                style="white-space: pre-wrap; color: #33373d"
                class="content-cpcontent"
              >
                {{ item.cpContent }}
              </div>
            </div>
          </van-cell>
        </template>
        <template v-else>
          <van-cell
            v-for="(item, index) in list"
            :key="index"
            style="background-color: #1a1a1a;"
          >
            <!-- <van-index-anchor index="1" :title="item.title" sticky>{{
              item.title
            }}</van-index-anchor> -->

            <div style="color:#969799">{{ item.title }}</div>

            <div class="book-detail-content" :index="index" ref="meta">
              <!-- <h1 class="Every-chapter-title">{{ item.title }}</h1> -->
              <div
                style="white-space: pre-wrap; color: rgba(255,255,255,.5);"
                class="content-cpcontent"
              >
                {{ item.cpContent }}
              </div>
            </div>
          </van-cell>
        </template>
      </div>
      <van-loading v-else type="spinner" color="#fff" />
    </van-cell>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Readhead from "@/components/Readhead.vue";
import ReadChapter from "@/components/ReadChapter.vue";

export default {
  // props: ["ChapterID"],
  components: {
    Readhead,
    ReadChapter,
  },
  data() {
    return {
      content: null,
      list: [], //异步查询数据
      loading: false, //自定义底部加载中提示
      finished: false, //自定义加载完成后的提示文案
      currentChapter: 0, //当前章节
      timer: null,
      chapterHistory: "",
      // refreshing: false, //清空列表数据
      show: false, // 上下弹窗
      showContent: false, //目录弹窗
      isSunshine: false,
      next_preBUtton: false,
      isVip: "",
      isChapterListOver: false, // 加载完毕章节后获取章节内容
    };
  },
  methods: {
    ...mapMutations(["addBookrack", "removeBookrack", "updateReadHistory"]),
    getChapter() {
      this.axios
        .get(
          "https://novel.kele8.cn/chapters/" +
            // encodeURIComponent(this.chapter.chapters[this.currentChapter].link)
            encodeURIComponent(this.chapter[this.currentChapter].link)
        )
        .then((res) => {
          console.log("获取章节内容", res.data.chapter);

          this.list.push(res.data.chapter);
          this.content = res.data.chapter;
          let correctChapter = /^[A-Za-z0-9.]+/;

          if (correctChapter.test(res.data.chapter.cpContent)) {
            this.list[0].cpContent = "会员专享书籍，请开通会员";
          }
          // console.log("methods--getList==>content", this.content);

          // 加载状态结束
          // this.currentChapter += 1;
          this.loading = false;

          // 记录阅读历史
          this.updateReadHistory({
            bookID: this.$route.params.id,
            historyChapter: this.currentChapter,
          });
          console.log("当前章节节", this.currentChapter);
        });
    },
    showPopup() {
      this.show = !this.show;
      this.closeNav = false;
    },
    // 目录弹窗指定挂载
    getContainer() {
      console.log(888);
      return document.querySelector(".book-content");
    },
    displayContent() {
      console.log(999);
      this.showContent = !this.showContent;
      console.log(this.showContent);
    },
    upLoadChapterID(e) {
      //传目录页面
      console.log("章节:", e);

      console.log("当前阅读章节:", this.currentChapter);
      this.currentChapter = e - 1;
      console.log("要跳转章节索引:", this.currentChapter);
      this.list = []; //重置要渲染的数据
      //跳转章节
      this.getChapter(e - 1);
    },
    changeSunshine() {
      this.isSunshine = !this.isSunshine;
    },
    preChapter() {
      console.log(this.currentChapter);
      if (this.currentChapter === 0) {
        this.$toast("已经是第一章了喔~");
        this.next_preBUtton = false;
      } else {
        this.currentChapter -= 1;
        this.list = []; //重置要渲染的数据

        this.getChapter(this.currentChapter, "click");
        console.log(this.currentChapter);
      }
    },
    nextChapter() {
      console.log(this.currentChapter);
      console.log(this.chapter.length);
      if (this.currentChapter >= this.chapter.length) {
        this.$toast("已经是最后一章了~");
      } else {
        console.log(this.list);
        this.currentChapter++;
        console.log(this.currentChapter);

        this.list = []; //重置要渲染的数据
        // //跳转章节
        this.getChapter(this.currentChapter, "click");
      }
    },
  },
  computed: {
    ...mapState([
      "chapter",
      "ReadHistory",
      "gender",
      "isClickNav",
      "chapterCounter",
    ]),
  },
  watch: {
    currentChapter(n) {
      if (n) {
        this.$router.push({
          path: "/book/" + this.$route.params.id + "/read",
          query: { readIndex: this.currentChapter },
        });
      }
    },
  },
  created() {},
  beforeRouteEnter(to, from, next) {
    // ...
    console.log("jjj", to);
    // next
    next((vm) => {
      // 获取章节列表
      // vm.isChapterListOver = false;

      console.log(vm);
      console.log(vm.ReadHistory);
      // console.log(vm.ReadHistory[0].historyChapter);
      vm.axios
        .get(
          "https://novel.kele8.cn/book-sources?view=summary&book=" +
            vm.$route.params.id
        )
        .then((res) => {
          // 根据书籍源获取 章节列表
          // console.log(res.data[0]._id);
          console.log("获取到书籍源id,准备进一步获取书籍章节列表", res);
          vm.axios
            .get("https://novel.kele8.cn/book-chapters/" + res.data[0]._id)
            .then((res) => {
              console.log("获取章节列表", res.data);
              vm.$store.commit("updateChapter", res.data.chapters);
              vm.$toast("加载中,请稍等");
              console.log("获得章节完毕", vm.chapter);
              // vm.isChapterListOver = true;

              // console.log("阅读章节:", vm.ChapterID);
              // 章节索引
              vm.currentChapter = to.query.readIndex;
              console.log(to.query.readIndex);
              console.log("currentChapter:", vm.currentChapter);
              // vm.currentChapter = vm.chapterCounter;

              console.log("");
              // vm.content = null;
              // 章节列表获取成功,进行下一步获取章节内容
              console.log("*****************");
              vm.axios
                .get(
                  "https://novel.kele8.cn/chapters/" +
                    // encodeURIComponent(vm.chapter.chapters[vm.currentChapter].link)
                    encodeURIComponent(vm.chapter[vm.currentChapter].link)
                )
                .then((res) => {
                  console.log("获取章节内容", res.data.chapter);
                  // if(res.data.cpContent)
                  console.log(res.data.chapter.cpContent);
                  let correctChapter = /^[A-Za-z0-9.]+/;
                  console.log(res.data.chapter);
                  vm.list.push(res.data.chapter);
                  console.log(vm.list);
                  vm.content = res.data.chapter;
                  if (correctChapter.test(res.data.chapter.cpContent)) {
                    vm.list[0].cpContent = "会员专享，请开通会员";
                  }
                  // console.log("methods--getList==>content", vm.content);
                  // 加载状态结束
                  vm.loading = false;
                  console.log("当前章节节", vm.currentChapter);
                  // 记录阅读历史
                  vm.updateReadHistory({
                    bookID: vm.$route.params.id,
                    historyChapter: vm.currentChapter,
                  });
                  // vm.updateReadHistory(vm.$route.params.id);
                });
            });
        });
    });
  },
  beforeRouteLeave(to, from, next) {
    // ...
    next();
    // console.log(this.content);
    this.content = null;
    this.list = []; //重置要渲染的数据
    this.currentChapter = 0; //重置章节
  },
};
</script>

<style lang="scss">
.read-page {
  .van-cell {
    background: #c4b395;
    background: transparent;
  }

  .van-cell__value .van-cell__value--alone {
    height: 100vh;
    background: #c4b395;
  }

  // bottom弹出框
  footer {
    padding: 8px;
    display: flex;
    justify-content: space-between;
  }

  .read-page-content {
    .book-content {
      .page-read-top {
        position: fixed;
        top: 0;
        left: 0;
        padding: 8px;
        // background-color: #c4b395;
      }
      .book-detail-content {
        // margin-top: 30px;
        .Every-chapter-title {
          font-size: 20px;
          margin-bottom: 8px;
        }
      }
    }
  }
  // top 弹窗颜色
}
</style>
