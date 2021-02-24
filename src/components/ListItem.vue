<template>
  <li class="list-item" @click="clickBook">
    <a class="book-show">
      <img
        :src="`http://statics.zhuishushenqi.com${book.cover}`"
        alt="网络不太好,请重新刷新"
      />
      <p class="title">{{ book.title }}</p>
      <p class="author">{{ book.author }}</p>
    </a>
  </li>
</template>

<script>
export default {
  props: ["book"],
  methods: {
    clickBook() {
      this.$router.push("/book/" + this.book._id);
    },
  },
};
</script>

<style lang="scss">
.list-item {
  display: inline-block;
  vertical-align: top;
  white-space: normal;
  list-style: none;
  width: 25%;
  .book-show {
    display: block;
    padding: 0 10px;
    img {
      display: block;
      width: 100%;
      height: 100%;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    }
    p.title {
      font-size: 0.8125rem;
      line-height: 1.25;
      overflow: hidden;
      max-height: 2.125rem;
      margin: 0.5rem 0 0.125rem;
      text-overflow: ellipsis;
      white-space: normal;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2; /*规定最多显示两行*/
    }
    p.author {
      margin-bottom: 0;
      margin-top: 5px;
      font-size: 0.75rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #969ba3;
    }
  }
}
</style>
