<template>
  <div class="ranking-page">
    <RankingNavHeader :leftText="'排行榜'"></RankingNavHeader>
  
    <!-- <ul class="tabbar">
      <li
        :class="{ active: type == 'epub' }"
        @click="$router.push('/ranking?type=epub')"
      >
        出版
      </li>
      <li
        :class="{ active: type == 'female' }"
        @click="$router.push('/ranking?type=female')"
      >
        女生
      </li>
      <li
        :class="{ active: type == 'male' }"
        @click="$router.push('/ranking?type=male')"
      >
        男生
      </li>
    </ul> -->

    <!-- <div class="tab-content">
      <van-sidebar v-model="activeKey">
        <van-sidebar-item
          v-for="(cat, index) in rankCategory[type]"
          :key="index"
          :title="cat.shortTitle"
        />
      </van-sidebar>

      <ul class="right">
        <van-skeleton title avatar :row="3" :loading="loading">
          <template v-if="ranking">
            <ListItem
              v-for="book in ranking.books"
              :key="book._id"
              :book="book"
            />
          </template>
        </van-skeleton>
      </ul>
    </div> -->
  </div>
</template>

<script>
import RankingNavHeader from "@/components/RankingNavHeader.vue";
import { mapState } from "vuex";

export default {
  components: {
    RankingNavHeader,
  },
  data() {
    return {
      loading: false,
      type: "male",
      activeKey: 0,
      ranking: null,
    };
  },
  computed: {
    ...mapState(["rankCategory"]),
  },
  methods: {
    getRanking: function(id) {
      this.loading = true;
      this.axios.get("http://novel.kele8.cn/rank/" + id).then((response) => {
        // console.log(response.data.ranking);

        // todo  缓存不同id 列表
        this.ranking = response.data.ranking;
        // console.log(this[id]);
        // response.data.ranking

        this.loading = false;
      });
    },
    getLists: function() {
      this.getRanking(this.rankCategory[this.type][this.activeKey]._id);
    },
  },
  created() {
    this.getLists();
  },
};
</script>

<style lang="scss" scoped>
.ranking-page {
  margin-top: 50px;
  .tabbar {
    display: flex;
    li {
      list-style: none;
      flex: 1;
      text-align: center;
      line-height: 40px;
      &.active {
        color: red;
      }
    }
  }
  .tab-content {
    display: flex;
    .van-sidebar {
      height: calc(100vh - 40px);
      overflow-y: scroll;
    }
    .right {
      flex: 1;
      height: calc(100vh - 40px);
      overflow-y: scroll;
    }
  }
}
</style>
