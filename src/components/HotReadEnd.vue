<template>
  <van-skeleton title :row="4" v-if="maleFinish === null" />
  <div class="hot-read-end" v-else>
    <h3 class="hot-title"><slot></slot></h3>
    <div class="hot-books">
      <ul class="books">
        <template v-if="gender === 'male' && maleFinish">
          <ItemY
            v-for="book in currentmaleFinish"
            :key="book._id"
            :book="book"
          />
        </template>
        <template v-if="gender === 'female' && femaleFinish">
          <ItemY
            v-for="book in currentfemaleFinish"
            :key="book._id"
            :book="book"
          />
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import ItemY from "@/components/ItemY.vue";

export default {
  props: ["maleFinish", "femaleFinish"],
  components: {
    ItemY,
  },
  computed: {
    gender() {
      return this.$store.state.gender;
    },
    currentmaleFinish() {
      let currentIndex = Math.floor(
        Math.random() * (this.maleFinish.books.length - 7)
      );
      // maleHot.books.slice
      return this.maleFinish.books.slice(currentIndex, currentIndex + 7);
    },
    currentfemaleFinish() {
      let currentIndex = Math.floor(
        Math.random() * (this.femaleFinish.books.length - 7)
      );
      // maleHot.books.slice
      return this.femaleFinish.books.slice(currentIndex, currentIndex + 7);
    },
  },
};
</script>

<style lang="scss" scoped>
.van-skeleton {
  min-height: 220px;
  padding: 15px;
  background-color: #fff;
}
.hot-read-end {
  background-color: #fff;
  position: relative;
  .hot-title {
    font-family: "NOVEL";
    padding: 0;
    margin: 0;
    margin-bottom: 20px;
    font-weight: 400;
    color: #33373d;
    position: relative;
    display: block;
    box-sizing: border-box;
    padding: 20px 0px 0px 24px;
    overflow: hidden;
    font-size: 16px;
    line-height: 20px;
    -webkit-user-select: none;
    user-select: none;
    &::after {
      position: absolute;
      top: 50%;
      left: 10px;
      width: 2px;
      height: 16px;
      margin-top: 10px;
      background-color: #ee0a24;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      content: "";
    }
  }
  .hot-books {
    padding: 0 10px;
  }
}
</style>
