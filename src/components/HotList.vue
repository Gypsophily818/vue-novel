<template>
  <div class="hot-list">
    <div class="novel" v-if="maleHot">
      <h3 class="hot-title"><slot></slot></h3>
      <div class="hot-novel">
        <ul class="list-novel">
          <template v-if="gender === 'male' && maleHot">
            <ListItem
              v-for="book in currentmaleHotBooks"
              :key="book._id"
              :book="book"
            />
          </template>
          <template v-if="gender === 'female' && femaleHot">
            <ListItem
              v-for="book in currentfemaleHotBooks"
              :key="book._id"
              :book="book"
            />
          </template>
        </ul>
      </div>
    </div>
    <van-skeleton title :row="5" v-else />
  </div>
</template>

<script>
import ListItem from "@/components/ListItem.vue";

export default {
  props: ["maleHot", "femaleHot"],
  components: {
    ListItem,
  },
  computed: {
    gender() {
      return this.$store.state.gender;
    },
    currentmaleHotBooks() {
      let currentIndex = Math.floor(
        Math.random() * (this.maleHot.books.length - 7)
      );
      // maleHot.books.slice
      return this.maleHot.books.slice(currentIndex, currentIndex + 7);
    },
    currentfemaleHotBooks() {
      let currentIndex = Math.floor(
        Math.random() * (this.femaleHot.books.length - 7)
      );
      // maleHot.books.slice
      return this.femaleHot.books.slice(currentIndex, currentIndex + 7);
    },
  },
};
</script>

<style lang="scss" scoped>
.hot-list {
  min-width: 210px;
  .novel {
    margin-top: 15px;
    background: #fff;
    padding: 5px;

    .hot-title {
      font-family: "NOVEL";
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
    .hot-novel {
      min-height: 10.75rem;
      // overflow: auto;
      padding-top: 20px;
      .list-novel {
        white-space: nowrap;
        overflow: auto;
      }
    }
  }
  .van-skeleton {
    min-height: 235px;
    padding: 15px;
    background-color: #fff;
  }
}
</style>
