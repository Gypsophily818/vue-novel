<template>
  <div class="CategoryDetail">
    <Bookhead :title="$route.query.categoryID"></Bookhead>
    <div
      class="CategoryDetail-Wraper"
      id="CategoryDetailWraper"
      v-if="allBooks"
    >
      <div class="toplist-tag" data-key="catId">
        <span
          class="btn-tag jsTag"
          :class="{ active: currentIndex === 'all' }"
          @click="clickAll"
          >全站</span
        >
        <div class="CategoryDetail-top-text">
          <ul class="ranking-detail-box">
            <li
              class="ranking-detail-box-item"
              v-for="(item, index) in carID"
              :key="index"
            >
              <span
                class="btn-tag jsTag "
                :index="index"
                @click.stop="filterHander(index, item)"
                :class="{ active: index === currentIndex }"
                >{{ item }}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <CateDetailBody :currentBooks="currentBooks" :allBooks="allBooks" />
    </div>
    <template v-else>
      <div v-if="allBooks.length === 0">
        没有相关书籍
      </div>
      <van-skeleton v-else title avatar :row="8" />
    </template>
   
  </div>
</template>

<script>
import Bookhead from "@/components/Bookhead.vue";
// import ItemY from "@/components/ItemY.vue";
import CateDetailBody from "@/components/CateDetailBody.vue";

export default {
  components: {
    Bookhead,
    CateDetailBody,

    // ItemY,
  },
  data() {
    return {
      list: [], //异步查询数据
      loading: false, //自定义底部加载中提示
      finished: false, //自定义加载完成后的提示文案
      bookIndex: 0,

      carID: [],
      currentIndex: "all",
      allBooks: [],
      currentBooks: [],
      type: "hot",
    };
  },
  created() {
    // type: 热门:hot 新书:new 好评:repulation 完结: over 包月: month
    // this.type = "new";
    this.loading = true;
    this.axios
      // http://novel.kele8.cn/category-info?gender=male&type=hot&major=奇幻&minor=&start=0&limit=20
      .get(
        "https://novel.kele8.cn/category-info?gender=" +
          this.$route.query.categender +
          "&type=" +
          this.type +
          "&major=" +
          this.$route.query.categoryID +
          // "&minor=&start=0&"
          "&minor=&start=0&limit=20"
      )
      .then((response) => {
        console.log("created:data", response.data);
        this.allBooks = response.data;
        console.log(this.allBooks);
        this.currentBooks = [...this.allBooks.books];
        response.data.books.filter((item) => {
          // console.log(item.minorCate);
          if (this.carID.indexOf(item.minorCate) === -1) {
            this.carID.push(item.minorCate);
          }
        });
        console.log(this.carID);
        this.loading = false;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    getList() {
      // console.log("bookIndex-index", this.bookIndex);
      console.log("method----currentBooks", this.currentBooks);
      console.log("method----list", this.list);

      this.axios
        .get(
          "https://novel.kele8.cn/category-info?gender=" +
            this.$route.query.categender +
            "&type=" +
            this.type +
            "&major=" +
            this.$route.query.categoryID +
            // "&minor=&start=0&"
            "&minor=&start=0&limit=20"
        )
        .then((res) => {
          console.log("获取章节内容", res.data);
          // this.list = [];
          // this.list.push(res.data.books);

          // this.currentBooks.push(res.data.books);

          this.currentBooks = [...this.list];

          console.log("currentBooks", this.currentBooks);
          console.log("list", this.list);
          res.data.books.filter((item) => {
            // console.log(item.majorCate);
            if (this.carID.indexOf(item.minorCate) === -1) {
              this.carID.push(item.minorCate);
            }
          });

          // 加载状态结束
          this.loading = false;
          // this.bookIndex += 1;
          // this.updateReadHistory(this.$route.params.id);
        });
    },
 
    clickAll() {
      this.currentIndex = "all";
      // console.log(this.allBooks);
      this.currentBooks = this.allBooks.books;
    },
    filterHander(e, bookitem) {
      console.log(e, bookitem);
      this.currentIndex = e;

      this.currentBooks = this.allBooks.books.filter((item) => {
        // console.log(item.minorCate);
        return item.minorCate === bookitem;
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    // ...
    next((vm) => {
      vm.loading = true;

      console.log(vm.$route.query.categender);
      console.log(vm.$route.query.categoryID);
      vm.axios
        .get(
          "https://novel.kele8.cn/category-info?gender=" +
            vm.$route.query.categender +
            "&type=" +
            vm.type +
            "&major=" +
            vm.$route.query.categoryID +
            // "&minor=&start=0&"
            "&minor=&start=0&limit=20"
        )
        .then((response) => {
          console.log("beforeRouterEnter-response", response);

          vm.allBooks = response.data;
          vm.currentBooks = [...vm.allBooks.books];
          response.data.books.filter((item) => {
            if (vm.carID.indexOf(item.minorCate) === -1) {
              vm.carID.push(item.minorCate);
            }
          });
          vm.loading = false;
          console.log(vm.allBooks);
          console.log(vm.currentBooks);
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  },
  beforeRouteLeave(to, from, next) {
    // ...
    this.carID = [];
    next();
  },
};
</script>

<style lang="scss" scoped>
.CategoryDetail {
  margin-top: 48px;
  .CategoryDetail-Wraper {
    // padding: 0 15px;

    .toplist-tag {
      padding-left: 15px;
      background-color: #f6f7f9;
      .CategoryDetail-top-text {
        .ranking-detail-box {
          display: flex;
          flex-wrap: wrap;
          .ranking-detail-box-item {
            .btn-tag {
              display: inline-block;
              line-height: 1.85rem;
              padding-right: 1.525rem;
              border-color: transparent;
            }
          }
        }
      }
    }
    .ranking-detail-body {
      padding: 5px 15px;
    }
  }

  .active {
    color: red;
  }
}
</style>
