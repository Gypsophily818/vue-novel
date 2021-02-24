<template>
  <div class="book-shelf">
    <!-- <BookshelfHeader :my_or_history="my_or_history"></BookshelfHeader> -->
    <BookshelfHeader></BookshelfHeader>
    <!-- @update-my_or_history="isChose" -->
    <router-view :BookShelfCurrentPage="$route.name"></router-view>
  </div>
</template>

<script>
import BookshelfHeader from "@/components/BookshelfHeader.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {
      // my_or_history: true,
    };
  },
  components: {
    BookshelfHeader,
  },
  computed: {
    ...mapState(["my_or_history"]),
  },
  methods: {
    isChose(e) {
      console.log(e);
      this.my_or_history = !this.my_or_history;
    },
  },
  created() {},
  beforeRouteEnter(to, from, next) {
    // ...
    console.log(to, from);
    next((vm) => {
      vm.$router.push("/bookshelf/my");
    });
    // next();
  },
  beforeRouteUpdate(to, from, next) {
    next((vm) => {
      if (to.params.enterBookshelfid === "my") {
        this.$router.push("/bookshelf/my");
      } else {
        this.$router.push("/bookshelf/history");
      }
      console.log(vm);
    });
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    // console.log(to, from);
    console.log("离开bookshelf");
    // this.my_or_history = true;
    // this.updateMy_or_history;
    this.$store.commit("updateMy_or_history", true);

    next();
  },
};
</script>

<style lang="scss" scoped>
.book-shelf {
  padding: 0 15px;
}
</style>
