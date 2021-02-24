<template>
  <div class="chapter-page">
    <!-- <Bookhead :title="bookTitle"></Bookhead> -->
    <div id="chapterNav" class="chapter-content-header">
      <nav class="chapter-nav">
        <h3 class="chapter-title">目录</h3>
      </nav>
    </div>
    <div class="chapter-content-detail">
      <div class="detail-total-wraper">
        <span class="total">共{{ chapter.length }}章</span>
        <span class="reserve" @click="chapter.reverse()">倒叙</span>
      </div>
      <div class="detail-list">
        <nav class="list-title">正文卷</nav>
        <ul class="list-wraper">
          <li
            class="chapter-list-item"
            v-for="item in chapter"
            :key="item.order"
            @click.stop.prevent="ToReadChapter(item.order)"
          >
            <span class="chapter-text">{{ item.title | titleCut }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

// import Bookhead from "@/components/Bookhead.vue";

export default {
  props: ["bookTitle"],
  components: {
    // Bookhead,
  },
  created() {
    console.log("chapter");
  },
  data() {
    return {
      currentChapter: 0,
    };
  },
  computed: {
    ...mapState(["chapter"]),
  },
  filters: {
    titleCut(title) {
      return title;
    },
  },
  methods: {
    ...mapMutations([
      "updateReadHistory", //also supports payload `this.nameOfMutation(amount)`
      "updatechapterCounter",
    ]),
    ToReadChapter(e) {
      console.log("第" + e + "章");
      this.updateReadHistory({
        bookID: this.$route.params.id,
        historyChapter: e - 1,
      });
      this.updatechapterCounter(e - 1);

      // console.log(this.$route.params.id);
      this.$emit("upLoadChapterID", e);
    },
  },
};
</script>

<style lang="scss" scoped>
.chapter-page {
  width: 80vw;
  background-color: #fff;
  #chapterNav,
  .chapter-content-header {
    .chapter-nav {
      margin-top: 20px;
      font-size: 100%;
      font-weight: 400;
      text-align: center;

      .chapter-title {
        color: #ed424b;
        font-size: 0.875rem;
        border-bottom: 1px solid #e3e4e6;
        border-bottom-color: #ed424b;
        line-height: 2.5rem;
      }
    }
  }
  .chapter-content-detail {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    .detail-total-wraper {
      padding: 0 16px;
      display: flex;
      justify-content: space-between;
      .total {
        font-weight: 600;
      }
      .reserve {
        width: 40px;
        text-align: center;
      }
    }
    .detail-list {
      .list-title {
        font-size: 13px;
        padding: 0 14px;
        line-height: 34px;
        background-color: #f6f7f9;
        color: #969ba3;
      }

      .chapter-list-item {
        background: #fff;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: block;
        overflow: hidden;
        padding: 5px 1rem;
        .chapter-text {
          display: inline-block;
        }
        &::after {
          display: block;
          margin-top: -1px;
          content: "";
          transform: scaleY(0.75);
          border-top: 1px solid #f0f1f2;
        }
      }
    }
  }
}
</style>
