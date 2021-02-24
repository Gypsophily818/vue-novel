<template>
  <div class="category">
    <NavHeader :leftText="'分类'"></NavHeader>
    <div class="category-content" v-if="isShowSkeleton">
      <!-- ui -->
      <div class="cate-wrap">
        <ul class="cate">
          <!-- categories_zhuishushenqi => 获取总作品数量  -->
          <!-- categories_qidian => 获取小分类数量  -->

          <template
            v-if="
              categories_zhuishushenqi && categories_qidian && gender === 'male'
            "
          >
            <li
              class="cate-item"
              v-for="(value, index) in categories_qidian.male"
              :key="index"
            >
              <!-- enterRankDetail(male._id, male.gender, male.shortTitle) -->
              <div
                class="item-title-wrap"
                @click="choseCategory(value.major, gender)"
              >
                <div class="item-left">
                  <span class="title">{{ value.major }}</span>
                  <span class="total-books">
                    共{{
                      categories_zhuishushenqi.male[index].bookCount
                    }}本作品</span
                  >
                </div>
                <svg
                  class="icon icon-arrow-r"
                  aria-hidden="true"
                  fill="#969ba3"
                  width="14"
                  height="14"
                >
                  <svg id="icon-arrow-r" viewBox="0 0 7 12">
                    <path
                      d="M6.146 6.354v-.708l-5.5 5.5a.5.5 0 0 0 .708.708l5.5-5.5a.5.5 0 0 0 0-.708l-5.5-5.5a.5.5 0 1 0-.708.708l5.5 5.5z"
                    ></path>
                  </svg>
                </svg>
              </div>
              <div class="minor-cate">
                <template>
                  <li
                    v-for="(item, index2) in value.mins"
                    :key="index2"
                   @click="choseCategory(value.major, gender)"
                  >
                    <span>{{ item }}</span>
                  </li>
                </template>
              </div>
            </li>
          </template>
          <!-- v-if="
              categories_zhuishushenqi &&
                categories_qidian &&
                gender === 'female'
            "   -->
          <template v-if="categories_zhuishushenqi && gender === 'female'">
            <li
              class="cate-item"
              v-for="(value, index) in categories_qidian.female"
              :key="index"
            >
              <div class="item-title-wrap" @click="choseCategory(value.major, gender)">
                <!-- <span class="title">{{ value.name }}</span> -->
                <div class="item-left">
                  <span class="title">{{ value.major }}</span>
                  <span class="total-books">
                    共{{
                      categories_zhuishushenqi.female[index].bookCount
                    }}本作品</span
                  >
                </div>
                <svg
                  class="icon icon-arrow-r"
                  aria-hidden="true"
                  fill="#969ba3"
                  width="14"
                  height="14"
                >
                  <svg id="icon-arrow-r" viewBox="0 0 7 12">
                    <path
                      d="M6.146 6.354v-.708l-5.5 5.5a.5.5 0 0 0 .708.708l5.5-5.5a.5.5 0 0 0 0-.708l-5.5-5.5a.5.5 0 1 0-.708.708l5.5 5.5z"
                    ></path>
                  </svg>
                </svg>
              </div>
              <div class="minor-cate">
                <span
                  v-for="(item, index2) in value.mins"
                  :key="index2"
                  @click="choseCategory(value.major, gender)"
                  >{{ item }}</span
                >
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <van-skeleton title :row="12" v-else style="margin-top: 50px" />
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader.vue";
import { mapState } from "vuex";
export default {
  components: {
    NavHeader,
  },
  data() {
    return {
      categories_zhuishushenqi: null,
      categories_qidian: null,
      isShowSkeleton: false, // 展示骨架屏
    };
  },
  computed: {
    ...mapState({
      gender: (state) => state.gender,
    }),
  },
  methods: {
    choseCategory(e, categender) {
      this.$router.push({
        path: "/categorydetail",
        query: { categoryID: e, categender },
      });
      // this.$router.push("/category/detail");
      // this.$router.push("/categorydetail");

      // console.log(this.$router);
      console.log(e, categender);
    },
  },
  created() {
    console.log("进入分类");
    // this.axios.get("http://novel.kele8.cn/categories").then((res) => {
    //   // console.log(res);
    //   this.categories = res.data;
    // });

    // http://api.kele8.cn/agent/
    // http://api.zhuishushenqi.com/ranking/gender 各个排行榜
    // http://api.zhuishushenqi.com/cats/lv2 小分类
    // 追书神器ui
    this.axios
      // .get("http://api.kele8.cn/agent/http://api.zhuishushenqi.com/cats/lv2/statistics")
      .get("https://novel.kele8.cn/categories")
      // .get("/cats/lv2/statistics")
      .then((response) => {
        console.log("大分类", response);
        this.categories_zhuishushenqi = response.data;
        this.isShowSkeleton = true;
      })
      .catch(function(error) {
        console.log(error);
      });
    // 起点ui小分类
    this.axios
      // 小分类
      // .get(
      //   "http://api.kele8.cn/agent/http://api.zhuishushenqi.com/cats/lv2"
      // )
      .get("https://novel.kele8.cn/sub-categories")
      // .get("http://api.zhuishushenqi.com/cats/lv2/statistics")
      // .get("/cats/lv2")
      .then((response) => {
        console.log("小分类", response);
        this.categories_qidian = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
};
</script>

<style lang="scss" scoped>
.category {
  .category-content {
    margin-top: 50px;
    // 追书ui
    .van-grid {
      h3 {
        font-family: "NOVEL";
      }
      p {
        font-size: 12px;
        color: #ccc;
      }
    }
    // 起点ui
    .cate-wrap {
      padding: 0 15px;
      .cate {
        .cate-item {
          .item-title-wrap {
            position: relative;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            text-align: center;
            align-items: center;
            .title {
              font-family: "NOVEL";
              font-size: 18px;
            }
            .total-books {
              font-size: 0.8125rem;
              margin-left: 0.5rem;
              color: #969ba3;
            }
            &::after {
              position: absolute;
              right: 0;
              bottom: 0;
              left: 1rem;
              content: "";
              border-bottom: 1px solid #f0f1f2;
            }
          }
          .minor-cate {
            display: flex;
            flex-wrap: wrap;
            padding: 10px 8px;
            span {
              margin: 5px 4px;
              color: #969ba3;
              font-size: 13px;
              display: inline-block;
              padding: 4px 10px;
              text-align: center;
              border: 1px solid;
              border-radius: 99px;
            }
          }
        }
      }
    }
  }
}
</style>
