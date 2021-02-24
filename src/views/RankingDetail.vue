<template>
  <div class="rank-to-detail">
    <Bookhead :title="$route.query.name"></Bookhead>
    <RankingDetailBody
      :currentIndex="currentIndex"
      :carID="carID"
      :currentBooks="currentBooks"
      :allBooks="allBooks"
      @clickAll="clickAll()"
      @filterHandertriggle="filterHander"
    ></RankingDetailBody>
   
  </div>
  <!-- <div><a>周榜</a><a>月榜</a><a>总榜</a></div> -->
</template>

<script>
import Bookhead from "@/components/Bookhead.vue";
import RankingDetailBody from "@/components/RankingDetailBody.vue";
// import ItemY from "@/components/ItemY.vue";

export default {
  components: {
    Bookhead,
    RankingDetailBody,
    // ItemY,
  },
  data() {
    return {
      carID: [],
      currentIndex: "all",
      allBooks: [],
      currentBooks: [],
    };
  },
  created() {
    console.log(this.$route.query.rankid);
    console.log(this.$route.query.gender);
    console.log(this.$route.query.name);
    this.axios
      .get("https://novel.kele8.cn/rank/" + this.$route.query.rankid)
      .then((response) => {
        // this.allFeMaleList.push(response.data.ranking);
        // this.loading = false;
        console.log(response);
        this.allBooks = response.data.ranking;
        this.currentBooks = [...this.allBooks.books];
        response.data.ranking.books.filter((item) => {
          // console.log(item.majorCate);
          if (this.carID.indexOf(item.majorCate) === -1) {
            this.carID.push(item.majorCate);
          }
        });
        console.log(this.carID);
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    clickAll() {
      console.log(555);
      this.currentIndex = "all";
      // this.allBooks
      // console.log(this.allBooks);
      this.currentBooks = this.allBooks.books;
    },
    filterHander(e, bookitem) {
      console.log(e, bookitem);
      this.currentIndex = e;

      console.log(this.allBooks.books);
      this.currentBooks = this.allBooks.books.filter((item) => {
        // console.log(item.majorCate);
        // console.log(item);
        return item.majorCate === bookitem;
      });

      // console.log(this.allBooks.books);
      console.log(this.currentBooks);
    },
  },
  beforeRouteEnter(to, from, next) {
    // ...
    console.log(to);
    next((vm) => {
      setTimeout(() => {
        vm.axios
          .get("https://novel.kele8.cn/rank/" + vm.$route.query.rankid)
          .then((response) => {
            // vm.allFeMaleList.push(response.data.ranking);
            // vm.loading = false;
            console.log(response);
            vm.allBooks = response.data.ranking;
            vm.currentBooks = [...vm.allBooks.books];
            response.data.ranking.books.filter((item) => {
              // console.log(item.majorCate);
              if (vm.carID.indexOf(item.majorCate) === -1) {
                vm.carID.push(item.majorCate);
              }
            });
            console.log(vm.carID);
          })
          .catch(function(error) {
            console.log(error);
          });
      }, 500);
    });
  },
  beforeRouteLeave(to, from, next) {
    // ...
    this.carID = [];
    next();
  },
};
</script>

<style lang="scss"></style>
