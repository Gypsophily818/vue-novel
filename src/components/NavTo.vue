<template>
  <div class="nav">
    <van-grid>
      <van-grid-item text="分类" @click="ToCategory">
        <i class="icon icon-1"></i>
        <span class="text">分类</span>
      </van-grid-item>
      <van-grid-item text="书架" @click="ToBookshelf">
        <i class="icon icon-2"></i>
        <span class="text">书架</span>
      </van-grid-item>

      <van-grid-item text="排行榜" @click="ToRanking">
        <i class="icon icon-3"></i>
        <span class="text">排行榜</span>
      </van-grid-item>
      <van-grid-item text="免费" @click="ToFree">
        <i class="icon icon-4"></i>
        <span class="text">免费</span>
      </van-grid-item>
      <van-grid-item text="VIP" @click="ToVip">
        <i class="icon icon-5"></i>
        <span class="text">VIP</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  methods: {
    ToCategory() {
      console.log("路由===>分类");
      // 带参数
      // , query: { plan: "private" }
      this.$router.push({ path: "/category" });
    },
    ToBookshelf() {
      console.log("进入书架");
      // this.$router.push("/bookshelf");
      this.$router.push({
        name: "Bookshelf",
        params: { enterBookshelfid: this.bookshelfChildren },
      });
    },
    ToRanking() {
      console.log("路由===>排行榜");
      this.$router.push("/ranking");
    },
    ToFree() {
      console.log("路由===>免费页面");

      this.$router.push("/free");
    },
    ToVip() {
      console.log("路由===>Vip页面");

      this.$router.push("/vip");
    },
  },
  computed: {
    bookshelfChildren() {
      return this.$store.state.bookshelfChildren;
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  .van-grid {
    flex-wrap: nowrap;
    .van-grid-item__content {
      .icon {
        background: url("../assets/sprite.png") no-repeat 0 0;
        width: 25px;
        height: 28px;
      }
      .icon-1 {
        background-position: -63px -28px;
      }
      .icon-2 {
        margin-left: 4px;
        background-position: 0 -60px;
      }
      .icon-3 {
        background-position: 0 0;
      }
      .icon-4 {
        background-position: 0 -30px;
      }
      .icon-5 {
        background-position: -30px -30px;
      }
      .text {
        margin-top: 8px;
        font-size: 0.75rem;
        color: #33373d;
        font-weight: 700;
      }
    }
  }
}
</style>
