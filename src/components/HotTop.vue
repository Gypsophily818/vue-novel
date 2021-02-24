<template>
  <div class="hot-list">
    <div class="novel">
      <h3 class="hot-title"><slot></slot></h3>
      <div class="hot-novel">
        <ul class="list-novel">
            <!-- v-for="book in booklists.books.slice(0, 7)" -->
          <ListItem
            v-for="book in booklists.books"
            :key="book._id"
            :book="book"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ListItem from "@/components/ListItem.vue";

export default {
  props: ["booklists"],
  components: {
    ListItem,
  },
};
</script>

<style lang="scss" scoped>
.hot-list {
  .novel {
    background: #fff;
    .hot-title {
      font-family: FZZCYSK;
      font-weight: 400;
      color: #33373d;
      position: relative;
      display: block;
      box-sizing: border-box;
      padding: 20px 0px 0px 24px;
      overflow: hidden;
      font-size: 14px;
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
      white-space: nowrap;
      overflow-y: auto;
    }
  }
  .book-recommend {
    padding: 10px;
    background: transparent;
    display: flex;
    justify-content: space-around;
    align-content: center;
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
</style>
