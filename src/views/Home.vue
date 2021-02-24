<template>
  <div class="home-page">
    <div class="content">
      <HomeHeader :bannerMale="bannerMale" :bannerFemale="bannerFemale" />
      <NavTo />
      <keep-alive>
        <HotList :maleHot="maleHot" :femaleHot="femaleHot">热门小说</HotList>
      </keep-alive>

      <div class="book-recommend">
        <span>新书强推</span>
        <span>网文新风</span>
      </div>

      <HotReadEnd :maleFinish="maleFinish" :femaleFinish="femaleFinish"
        >畅销完本</HotReadEnd
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeHeader from "@/components/HomeHeader.vue";
import NavTo from "@/components/NavTo.vue";
import HotList from "@/components/HotList.vue";
// import HotTop from "@/components/HotTop.vue";
import HotReadEnd from "@/components/HotReadEnd.vue";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    HomeHeader,
    NavTo,
    HotList,
    // HotTop,
    HotReadEnd,
  },
  data() {
    return {
      bannerMale: [],
      bannerFemale: [],
    };
  },
  computed: {
    ...mapState([
      "gender",
      "maleHot",
      "femaleHot",
      "maleFinish",
      "femaleFinish",
    ]),
  },
  created() {
    // 背景图
    this.axios
      .get("./banner.json")
      .then((response) => {
        console.log(2222)
        console.log(response);
        this.bannerMale = response.data.male;
        this.bannerFemale = response.data.female;
      })
      .catch(function(error) {
        console.log('获取失败',error);
      });
    // // 男生热门
    this.axios
      .get("https://novel.kele8.cn/rank/54d42d92321052167dfb75e3")
      .then((response) => {
        console.log("Male-hot", response);
        this.$store.commit("updatemaleHot", response.data.ranking);
      })
      .catch(function(error) {
        console.log(error);
      });
    // // 女生热门
    this.axios
      .get("https://novel.kele8.cn/rank/54d43437d47d13ff21cad58b")
      .then((response) => {
        console.log("Female-hot", response);
        this.$store.commit("updatefemaleHot", response.data.ranking);
      })
      .catch(function(error) {
        console.log(error);
      });

    // 男生完结(完本)
    this.axios
      .get("https://novel.kele8.cn/rank/564eb878efe5b8e745508fde")
      .then((response) => {
        console.log("maleFinish-response", response);
        this.$store.commit("updatemaleFinish", response.data.ranking);
      })
      .catch(function(error) {
        console.log(error);
      });
    // 女生完结(完本)
    this.axios
      .get("https://novel.kele8.cn/rank/564eb8a9cf77e9b25056162d")
      .then((response) => {
        this.$store.commit("updatefemaleFinish", response.data.ranking);
      })
      .catch(function(error) {
        console.log(error);
      });
  },

};
</script>

<style lang="scss" scoped>
.home-page {
  min-width: 320px;
  .content {
    padding-bottom: 0.1px;
    background-color: #f6f7f9;
    .book-recommend {
      padding: 10px;
      background: transparent;
      display: flex;
      justify-content: space-around;
      align-items: center;
      span {
        min-width: 30%;
        font-size: 0.8125rem;
        line-height: 1.6875rem;
        display: block;
        padding: 0 0.625rem;
        text-align: center;
        border: 1px solid;
        border-radius: 99px;
        font-weight: 400;
        color: #ed424b;
      }
    }
  }
}
</style>
