<template>
  <div class="nav-header" id="nav-header">
    <van-nav-bar
      title="标题"
      :left-text="leftText"
      left-arrow
      @click-left="onClickLeft"
      fixed
    >
      <template #left> </template>
      <template #title>
        <van-button
          plain
          type="default"
          @click="ToAboutMale"
          :class="{ active: gender === 'male' || gender === 'Home' }"
          >男生</van-button
        >

        <van-button
          plain
          type="default"
          @click="ToAboutFemale"
          :class="{ active: gender === 'female' }"
          >女生</van-button
        >
      </template>

      <template #right>
        <van-icon
          name="search"
          size="18px"
          color="#33373d"
          @click="onClickSearch"
        />
        <van-icon
          name="wap-nav"
          color="#33373d"
          size="20px"
          @click="onClickList"
        />
      </template>
    </van-nav-bar>

    <div id="guide" class="guide" :class="{ active: isClickNav }">
      <div
        id="guideOverlay"
        class="guide-mark"
        :class="{ active: isClickNav }"
      ></div>
      <div class="guide-content" :class="{ active: isClickNav }">
        <div class="guide-nav">
          <div @click="ToHome" class="guide-nav-a">
            <i class="icon icon-home"></i>
            <h4 class="guide-nav-h">首页</h4>
          </div>
          <div @click="ToCategory" class="guide-nav-a">
            <i class="icon icon-sort"></i>
            <h4 class="guide-nav-h">分类</h4>
          </div>
          <div @click="ToRanking" class="guide-nav-a">
            <i class="icon icon-rank"></i>
            <h4 class="guide-nav-h">排行榜</h4>
          </div>
          <div @click="ToFree" class="guide-nav-a">
            <i class="icon icon-free"></i>
            <h4 class="guide-nav-h">免费</h4>
          </div>
          <div @click="ToFinish" class="guide-nav-a">
            <i class="icon icon-end"></i>
            <h4 class="guide-nav-h">完本</h4>
          </div>
          <div @click="ToUser" class="guide-nav-a jsLogin">
            <i class="icon icon-account"></i>
            <h4 class="guide-nav-h">账户</h4>
          </div>
        </div>
        <div class="guide-footer" @click.stop="ToBookShelf">
          <!-- <a class="btn-primary" data-size="14">我的书架</a> -->
          <h3 class="btn-primary" data-size="14">我的书架</h3>
          <!-- href="/bookshelf/my" -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["leftText"],
  data() {
    return {};
  },
  methods: {
    onClickLeft(e) {
      e.preventDefault();
      if (this.isClickNav) {
        this.$store.commit("changeIsClickNav");
      }
      this.$router.back();
    },
    onClickSearch() {
      this.$router.push("/search");
      // console.log("search");
      // this.$store.commit("changeIsClickNav");
    },
    onClickList() {
      console.log("List");
      this.$store.commit("changeIsClickNav");
    },
    // 进入关于男生
    ToAboutMale() {
      // this.$router.push("/male");
      this.$store.commit("changeGender", "male");
    },
    // 进入关于女生
    ToAboutFemale() {
      // this.$router.push("/female");
      this.$store.commit("changeGender", "female");
    },
    ToHome() {
      console.log("进入首页");
      this.$store.commit("changeIsClickNav");
      this.$router.push("/male");
    },
    ToCategory() {
      console.log("进入分类");
      this.$store.commit("changeIsClickNav");
      this.$router.push("/category");
    },
    ToRanking() {
      console.log("进入排行榜");
      this.$store.commit("changeIsClickNav");
      this.$router.push("/ranking");
    },
    ToFree() {
      console.log("进入免费页面");
      this.$store.commit("changeIsClickNav");
      this.$router.push("/free");
    },
    ToFinish() {
      console.log("进入完本页面");
      this.$store.commit("changeIsClickNav");
      this.$router.push("/finish");
    },
    ToUser() {
      console.log("进入user页面");
      this.$store.commit("changeIsClickNav");
      this.$router.push("/user");
    },
    ToBookShelf() {
      console.log("进入BookShelf页面");
      this.$store.commit("changeIsClickNav");
      // this.$router.push("/bookshelf/my");
      this.$router.push({
        name: "Bookshelf",
      });
    },
  },
  // beforeRouteLeave(to, from, next) {
  //   // 导航离开该组件的对应路由时调用
  //   // 可以访问组件实例 `this`
  //   console.log(999);
  //   this.isClickNav = false;
  //   next();
  // },
  computed: {
    gender() {
      return this.$store.state.gender;
    },
    isClickNav() {
      return this.$store.state.isClickNav;
    },
  },
};
</script>

<style lang="scss">
.van-nav-bar,
.van-hairline--bottom {
  .van-nav-bar__content {
    .van-nav-bar__left {
      .van-icon-arrow-left {
        font-size: 20px;
        color: #33373d;
        padding-right: 8px;
      }
      .van-nav-bar__text {
        color: #33373d;
        font-size: 16px;
      }
    }

    .van-nav-bar__title {
      .van-button {
        background-color: #fff;
        height: 26px;
        border-radius: 5px 0 0 5px;
        border: none;
        border: 1px solid #ed424b;

        & + .van-button {
          border-radius: 0 5px 5px 0;
        }
        &.active {
          background: #ed424b;
          color: #fff;
        }
      }
    }
    .van-nav-bar__right {
      .van-icon-search {
        margin-right: 5px;
      }
      .van-icon-wap-nav {
        margin: 0 5px 0 10px;
      }
    }
  }
}
.nav-header {
  position: relative;
  width: 100%;
  height: 100%;
  .guide {
    position: fixed;
    z-index: 3;
    top: 2.5rem;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    transition: visibility 0.25s;
    -wekit-transition: visibility 0.25s;
    visibility: hidden;

    .guide-mark {
      -webkit-transition: opacity 0.25s;
      transition: opacity 0.25s;
      opacity: 0;
      background-color: #000;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 2;
      // display: none;
      &.active {
        opacity: 0.6;
      }
    }
    .guide-content {
      z-index: 3;
      position: absolute;
      text-align: center;
      overflow: hidden;
      width: 100vw;
      height: 320px;
      -webkit-transition: -webkit-transform 0.15s;
      transition: all 0.15s;
      -webkit-transform: translateY(-100%);
      transform: translateY(-100%);
      background-color: #fff;
      .guide-nav {
        font-size: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .guide-nav-a {
          padding-top: 5px;
          margin: 40px 5px 5px 0px;
          width: 30%;
          font-size: 14px;
          height: 58px;
          .icon {
            display: inline-block;
            width: 28px;
            height: 25px;
            background: url("../assets/sprite@2x.png") no-repeat 0 0;
            background-size: 87px 87px;
          }
          .guide-nav-h {
            padding: 0;
            margin: 0;
            padding-top: 5px;
          }

          .icon-home {
            background-position: -31px 0;
          }
          .icon-sort {
            background-position: -63px -28px;
            width: 24px;
            height: 24px;
          }
          .icon-rank {
            background-position: 0 0;
            width: 27px;
            height: 26px;
          }
          .icon-free {
            background-position: 0 -30px;
            width: 26px;
            height: 26px;
          }
          .icon-end {
            background-position: 0 -60px;
            width: 20px;
            height: 27px;
          }
          .icon-account {
            background-position: -63px 0;
            width: 24px;
            height: 24px;
          }
        }
      }
      .guide-footer {
        margin-top: 1rem;
        .btn-primary {
          width: 60%;
          font-size: 0.875rem;
          line-height: 2.25rem;
          display: inline-block;
          padding-right: 1em;
          padding-left: 1em;
          text-align: center;
          color: #fff;
          border-radius: 99px;
          background-color: #ed424b;
        }
      }
    }
    .active {
      -webkit-transform: translateY(0%);
      transform: translateY(0%);
      visibility: visible;
      transition: all 0.15s;
      -wekit-transition: none;
      display: block;
    }
  }
}
</style>
