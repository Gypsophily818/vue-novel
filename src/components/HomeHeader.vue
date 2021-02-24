<template>
  <header class="header">
    <van-nav-bar left-arrow fixed>
      <template #left>
        <div class="head-text">
          <a href="/" class="logo">起点中文网</a>
        </div>
      </template>
      <template #title>
        <van-button
          plain
          type="default"
          @click="clickMale"
          :class="{ active: gender === 'male' || gender === 'Home' }"
          >男生</van-button
        >

        <van-button
          plain
          type="default"
          @click="clickFemale"
          :class="{ active: gender === 'female' }"
          >女生</van-button
        >
      </template>
      <template #right>
        <van-icon @click="ToUser">
          <svg id="icon-person" viewBox="0 0 16 16">
            <g>
              <path
                d="M12 5a4 4 0 1 0-8 0 4 4 0 0 0 8 0zM3 5a5 5 0 1 1 10 0A5 5 0 0 1 3 5z"
              ></path>
              <path
                d="M8 9c-4.397 0-8 2.883-8 6.5a.5.5 0 1 0 1 0C1 12.49 4.113 10 8 10s7 2.49 7 5.5a.5.5 0 1 0 1 0C16 11.883 12.397 9 8 9z"
              ></path>
            </g>
          </svg>
        </van-icon>

        <van-icon @click="ToBookShelf">
          <svg id="icon-book" viewBox="0 0 17 18">
            <g>
              <path
                d="M1.01 1h1.98C3.549 1 4 1.445 4 2v14a1 1 0 0 1-1.01 1H1.01C.451 17 0 16.555 0 16V2a1 1 0 0 1 1.01-1zM1 16h1.99c.012 0 .01.002.01 0V2H1.01C.997 2 1 1.998 1 2v14zM6.01 1h1.98C8.549 1 9 1.445 9 2v14a1 1 0 0 1-1.01 1H6.01C5.451 17 5 16.555 5 16V2a1 1 0 0 1 1.01-1zM6 16h1.99c.012 0 .01.002.01 0V2H6.01C5.997 2 6 1.998 6 2v14zM10.77 1.253l1.957-.31a1.003 1.003 0 0 1 1.153.831L16.07 15.6a1 1 0 0 1-.84 1.147l-1.957.31a1.003 1.003 0 0 1-1.153-.831L9.93 2.4a1 1 0 0 1 .84-1.147zm2.337 14.816l1.966-.31c.012-.002-2.18-13.828-2.18-13.828l-1.966.31c-.012.002 2.18 13.828 2.18 13.828z"
              ></path>
            </g>
          </svg>
        </van-icon>
      </template>
    </van-nav-bar>

    <van-swipe
      v-if="bannerMale"
      class="my-swipe"
      :show-indicators="false"
      :autoplay="3500"
      :loop="true"
    >
      <van-swipe-item
        v-for="(item, index) in gender === 'male' ? bannerMale : bannerFemale"
        :key="index"
      >
        <van-image
          width="100%"
          :src="item.img"
          @click="ToDetail(index, gender)"
        />
      </van-swipe-item>
    </van-swipe>

    <div class="search" @click="ToSearch">
      <van-search left-icon="" right-icon="search" placeholder="" />

      <template v-if="gender === 'male'">
        <van-swipe
          class="my-swipe"
          vertical
          :autoplay="3000"
          :show-indicators="false"
          :loop="true"
        >
          <van-swipe-item>神级系统拔刀亿万次</van-swipe-item>
          <van-swipe-item>撩神</van-swipe-item>
          <van-swipe-item>大神你人设崩了</van-swipe-item>
          <van-swipe-item>神武战王</van-swipe-item>
          <van-swipe-item>首辅娇娘</van-swipe-item>
        </van-swipe>
      </template>
      <template v-else>
        <van-swipe
          class="my-swipe"
          vertical
          :autoplay="3000"
          :show-indicators="false"
          :loop="true"
        >
          <van-swipe-item>修真聊天群</van-swipe-item>
          <van-swipe-item>论圣父的垮掉[快穿]</van-swipe-item>
          <van-swipe-item>无敌神龙养成系统</van-swipe-item>
          <van-swipe-item>开局签到一个首富姐姐</van-swipe-item>
          <van-swipe-item>逢春</van-swipe-item>
        </van-swipe>
      </template>
    </div>
  </header>
</template>

<script>
export default {
  props: ["bannerMale", "bannerFemale"],
  data() {
    return {};
  },
  methods: {
    clickMale() {
      this.$router.push("/male");
      this.$store.commit("changeGender", "male");
    },
    clickFemale() {
      this.$router.push("/female");
      this.$store.commit("changeGender", "female");
    },
    ToBookShelf() {
      this.$router.push("/bookshelf");
    },
    ToUser() {
      this.$router.push("/user");
    },
    ToSearch() {
      console.log("搜索");
      this.$router.push("/search");
    },
    ToDetail(e, gender) {
      console.log(e, gender);
      if (e === 0 && gender === "male") {
        console.log("妖道至尊");
        this.$router.push("/book/536da71c88844484410104a3");
      }
      if (e === 1 && gender === "male") {
        console.log("庆余年");
        this.$router.push("/book/508742f0abf1ced53c000024");
      }
      if (e === 2 && gender === "male") {
        console.log("我有一座超级海岛");
        this.$router.push("/book/5dc8bb6e1a9f25ad19391258");
      }
       if (e === 0 && gender === "female") {
        this.$router.push("/book/55b9c82a491762a137fc777c");
      }
      if (e === 1 && gender === "female") {
        this.$router.push("/book/5ee198afc045c331443b18d8");
      }
      if (e === 2 && gender === "female") {
        this.$router.push("/book/5c75017ffbbc9854793998c2");
      }
    },
  },
  computed: {
    gender() {
      return this.$store.state.gender;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  margin-top: 46px;
  background-color: #f6f7f9;
  padding-bottom: 1px;
  .van-nav-bar,
  .van-hairline--bottom {
    .van-nav-bar__content {
      .van-nav-bar__left {
        .head-text {
          border-bottom: 1px solid #f0f1f2;
          background-color: #fff;
          .logo {
            color: transparent;
            display: inline-block;
            background: url(../assets/logo.svg) no-repeat bottom;
            background-size: 100%;
            width: 90px;
            height: 100%;
          }
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
        .van-icon {
          width: 16px;
          & + .van-icon {
            margin-left: 20px;
          }
          svg {
            fill: #ed424b;
          }
        }
      }
    }
  }

  .header-swiper {
    .my-swipe {
      color: #fff;
      font-size: 20px;
      line-height: 150px;
      text-align: center;
      background-color: #39a9ed;
    }
  }
  .search {
    position: relative;
    margin: 5px;
    .van-search {
      padding: 0;
    }
    .my-swipe {
      width: 100%;
      height: 34px;
      line-height: 34px;
      position: absolute;
      top: 0;
      left: 0;
      //   z-index: -1;
    }
  }
}
</style>
