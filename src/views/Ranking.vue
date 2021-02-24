<template>
  <div class="ranking-page">
    <RankingNavHeader :leftText="'排行榜'"></RankingNavHeader>
    <div class="ranking-wraper" v-if="!loading">
      <ul class="ranking-ul">
        <template v-if="gender === 'male' && allMaleList">
          <li
            class="ranking-list"
            v-for="(male, index) in allMaleList"
            :key="index"
          >
            <!-- <li class="ranking-list"> -->
            <div class="module module-toplist" data-l2="1">
              <nav
                class="book-toplist"
                data-l3="1"
                data-eid="mqd_C1"
                @click="enterRankDetail(male._id, male.gender, male.shortTitle)"
              >
                <img :src="imgList[index].src" :alt="male.shortTitle" />
                <span>{{ RangImg[index] }}</span>

                <h2 class="book-toplist-title">
                  {{ male.shortTitle }}
                </h2>
                <i class="icon icon-point-r"></i>
              </nav>
              <ol class="book-ol book-ol-rank auto-index" data-l3="2">
                <li
                  class="book-li"
                  v-for="(item, ietmIndex) in male.books.slice(0, 5)"
                  :key="item._id"
                  @click="enterBookDetail(item._id)"
                >
                  <div class="book-layout">
                    <div class="book-layout-wraper">
                      <span class="book-index">{{ ietmIndex + 1 }}.</span>
                      <h3
                        class="book-title"
                        :title="item.title"
                        style="width: 150px;"
                      >
                        {{ item.title }}
                      </h3>
                    </div>
                    <span class="book-author">
                      <svg
                        id="icon-arrow-r"
                        viewBox="0 0 7 12"
                        width="16"
                        height="16"
                        fill="#969ba3"
                      >
                        <path
                          d="M6.146 6.354v-.708l-5.5 5.5a.5.5 0 0 0 .708.708l5.5-5.5a.5.5 0 0 0 0-.708l-5.5-5.5a.5.5 0 1 0-.708.708l5.5 5.5z"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </li>
              </ol>
            </div>
          </li>
        </template>
        <template v-if="gender === 'female' && allFeMaleList">
          <li
            class="ranking-list"
            v-for="(male, index) in allFeMaleList"
            :key="index"
          >
            <!-- <li class="ranking-list"> -->
            <div class="module module-toplist" data-l2="1">
              <nav
                class="book-toplist"
                data-l3="1"
                data-eid="mqd_C1"
                @click="enterRankDetail(male._id, male.gender, male.shortTitle)"
              >
                <!-- :src="`http://statics.zhuishushenqi.com${male.cover}`" -->
                <img :src="imgList[index].src" :alt="male.shortTitle" />
                <h2 class="book-toplist-title">
                  {{ male.shortTitle }}
                </h2>
                <i class="icon icon-point-r"></i>
              </nav>
              <ol class="book-ol book-ol-rank auto-index" data-l3="2">
                <li
                  class="book-li"
                  v-for="(item, ietmIndex) in male.books.slice(0, 5)"
                  :key="item._id"
                  @click="enterBookDetail(item._id)"
                >
                  <div class="book-layout">
                    <div class="book-layout-wraper">
                      <span class="book-index">{{ ietmIndex + 1 }}.</span>
                      <h3 class="book-title" :title="item.title">
                        {{ item.title }}
                      </h3>
                    </div>
                    <span class="book-author">
                      <svg
                        id="icon-arrow-r"
                        viewBox="0 0 7 12"
                        width="16"
                        height="16"
                        fill="#969ba3"
                      >
                        <path
                          d="M6.146 6.354v-.708l-5.5 5.5a.5.5 0 0 0 .708.708l5.5-5.5a.5.5 0 0 0 0-.708l-5.5-5.5a.5.5 0 1 0-.708.708l5.5 5.5z"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </li>
              </ol>
            </div>
          </li>
        </template>
      </ul>
    </div>
    <van-skeleton title :row="20" v-else />
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
      // ranking: null,
      loading: false,
      // type: "male",
      activeKey: 0,
      allMaleList: [],
      allFeMaleList: [],
      RangImg: "",
      imgList: [
        {
          src: "",
        },
        {
          src: "",
        },
        {
          src: "",
        },
        {
          src: "",
        },
        {
          src: "",
        },
        {
          src: "",
        },
        {
          src: "",
        },
        {
          src: "",
        },
        {
          src: "",
        },
        {
          src: "",
        },
        {
          src: "",
        },
        {
          src: "",
        },
        {
          src: "",
        },
        {
          src: "",
        },
        {
          src: "",
        },
        {
          src: "",
        },
      ],
    };
  },
  computed: {
    ...mapState(["rankCategory", "gender", "ranking"]),
  },
  methods: {
    getmaleList(id) {
      //男生排行榜各个榜单
      this.loading = true;
      setTimeout(() => {
        this.axios
          .get("https://novel.kele8.cn/rank/" + id)
          .then((response) => {
            this.allMaleList.push(response.data.ranking);
            this.loading = false;
          })
          .catch(function(error) {
            console.log(error);
          });
      }, 1000);
    },
    getfemaleList(id) {
      //女生排行榜各个榜单
      this.loading = true;
      setTimeout(() => {
        this.axios
          .get("https://novel.kele8.cn/rank/" + id)
          .then((response) => {
            this.allFeMaleList.push(response.data.ranking);
            this.loading = false;
          })
          .catch(function(error) {
            console.log(error);
          });
      }, 1000);
    },
    getImage() {
      // console.log(this.imgList);
      this.imgList.forEach((item, index) => {
        //加载本地图片
        item.src = require("@/assets/rank" + index + ".jpg");
      });
      console.log(this.imgList);
    },
    enterRankDetail(e, gender, name) {
      //点击进入榜单排行情况

      console.log(e);
      console.log(gender);
      this.$router.push({
        path: "/rankingdetail/",
        query: { rankid: e, gender, name },
      });
      // this.$router.push("/rankingdetail/" + e + "-" + gender);
      // this.$router.push("/rankingdetail");
    },
    enterBookDetail(e) {
      //点击进入榜单中Top书籍的详情
      console.log(e);
      this.$router.push("/book/" + e);
      this.$toast("加载中,请稍等...");
    },
  },
  created() {
    this.getImage();
    // this.loading = true;
    setTimeout(() => {
      for (let i = 0; i < this.rankCategory.male.length; i++) {
        this.getmaleList(this.rankCategory.male[i]._id);
      }
      console.log("Male-all", this.allMaleList);
      this.loading = false;

      for (let i = 0; i < this.rankCategory.female.length; i++) {
        this.getfemaleList(this.rankCategory.female[i]._id);
      }
      console.log("FeMale-all", this.allFeMaleList);
    }, 500);
  },
};
</script>

<style lang="scss" scoped>
.ranking-page {
  margin-top: 50px;
  .ranking-wraper {
    background-color: #f6f7f9;
    .ranking-ul {
      .ranking-list {
        .module {
          position: relative;
          overflow: hidden;
          margin: 0.75rem 0;
          background-color: #fff;
          .book-toplist {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            width: 7.5rem;
            .book-toplist-cover {
              display: block;
              width: 100%;
              height: 100%;
              object-fit: cover;
            }

            .book-toplist-title {
              position: absolute;
              right: 0;
              bottom: 6rem;
              left: 0;
              -webkit-transform: scaleY(1.2);
              transform: scaleY(1.2);
              text-align: center;
              color: #fff;

              font-size: 18px;
              font-family: "NOVEL";
            }
            .icon {
              position: absolute;
              right: 0;
              bottom: 2rem;
              left: 0;
              width: 1.5rem;
              height: 1.5rem;
              margin: auto;
              color: #fff;
              font-size: 36px;
              background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMjRjNi42MjcgMCAxMi01LjM3MyAxMi0xMlMxOC42MjcgMCAxMiAwIDAgNS4zNzMgMCAxMnM1LjM3MyAxMiAxMiAxMnptLS4zNTQtNy4zNTRhLjUuNSAwIDEgMCAuNzA4LjcwOGw1LTVhLjUuNSAwIDAgMCAwLS43MDhsLTUtNWEuNS41IDAgMSAwLS43MDguNzA4bDQuMTQ3IDQuMTQ2SDdhLjUuNSAwIDAgMCAwIDFoOC43OTNsLTQuMTQ3IDQuMTQ2eiIgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+Cg==)
                no-repeat center/100% 100%;
            }
          }
          .book-ol {
            position: relative;
            overflow: hidden;
            margin-left: 7.5rem;
            padding-left: 2.125rem;
            .book-li {
              box-shadow: 0 1px #f0f1f2;
              counter-reset: none;
              .book-layout {
                font-size: 1rem;
                line-height: 1.5rem;
                display: -webkit-box;
                display: -webkit-flex;
                display: flex;
                margin-left: -3.125rem;
                left: -1.125rem;
                padding: 0.375rem 1rem 0.375rem 2.375rem;
                -webkit-box-pack: justify;
                -webkit-justify-content: space-between;
                justify-content: space-between;
                // justify-content: start;
                .book-layout-wraper {
                  display: flex;
                }
                .book-index {
                  line-height: 1.4;
                }
                .book-title {
                  line-height: 1.4;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
                .book-author {
                  font-size: 0.8125rem;
                  display: block;
                  overflow: hidden;
                  max-width: 10em;
                  max-width: calc(100vw - 2rem - (176rem / 16));
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  color: #969ba3;
                }
              }
              &::before {
                font: bold 1em/1.5em "DIN Alternate";
                position: absolute;
                top: 0;
                bottom: 0;
                left: -2.125rem;
                height: 1.5em;
                margin: auto;
                content: counter(bookrank) ".";
                counter-increment: bookrank;
              }
            }
          }
        }
      }
    }
  }
}
</style>
