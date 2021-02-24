<template>
  <div class="search-page">
    <Searchhead :leftText="'搜索'"></Searchhead>
    <div class="search-content">
      <div class="search-top">
        <form action="/">
          <!-- show-action -->
          <!-- action-text="确定" -->
          <!-- @search="onSearch" -->
          <van-search
            v-model.trim="value"
            shape="round"
            placeholder="请输入搜索内容"
            @input="onSearch"
            @keydown.enter="pickHotWordToSearch(value)"
          >
          </van-search>
          <span class="sure" @click="onSure">确定</span>
        </form>
      </div>
      <div class="gainksywords" v-if="gainBookKeyWords && isShowResult">
        <ul>
          <li
            class="gain-hotword-item"
            v-for="(item, index) in gainBookKeyWords"
            :key="index"
            @click="pickHotWordToSearch(item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="search-hotlist" v-else>
        <div class="recommend">
          <span class="title">搜索热词</span>
          <span class="exchange" @click="ChangeHotWord"
            >换一批<i class="icon-exchange"></i>
          </span>
        </div>
        <ul class="gain-list" v-if="currentHotword">
          <li
            class="item-full"
            v-for="(item, index) in currentHotword"
            :key="index"
          >
            <a
              class="link"
              href="javascript:void(0);"
              @click="pickHotWordToSearch(item.word, 'hotWord')"
              >{{ item.word }}</a
            >
          </li>
        </ul>
        <van-skeleton title :row="3" v-else />

        <!-- <template v-if="hotWord && newHotWords">
          <ul class="gain-list" v-if="isChange">
            <li class="item-full" v-for="(item, index) in currentHotword" :key="index">
              <a class="link" href="javascript:void(0);">{{ item.word }}</a>
            </li>
          </ul>
          <ul class="gain-list" v-else>
            <li
              class="item-full"
              v-for="(item, index) in currentHotword"
              :key="index"
            >
              <a class="link" href="javascript:void(0);">{{ item }}</a>
            </li>
          </ul>
        </template> -->

        <!-- 搜索历史 -->
        <div class="search-history" v-if="SearchBookHistory.length !== 0">
          <div class="search-head">
            <span class="search-title">搜索历史</span>
            <span class="refresh" @click="clearHistory"
              >删除历史<i class="delete"></i
            ></span>
          </div>
          <ul class="search-list">
            <li
              class="book-item"
              v-for="(item, index) in SearchBookHistory"
              :key="index"
              v-show="isShowHistory"
            >
              <a
                class="link"
                href="javascript:void(0);"
                :item="item"
                @click="pickHotWordToSearch(item)"
              >
                {{ item }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Searchhead from "@/components/Searchhead.vue";
import { Toast } from "vant";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      value: "",
      hotWord: "",
      newHotWords: "",
      currentIndex: 0,
      isChange: true,
      gainBookKeyWords: "",
      isShowResult: false,
      isShowHistory: true,
    };
  },
  watch: {
    value(n) {
      if (n) {
        this.axios("/book/auto-complete?query=" + this.value)
          .then((result) => {
            console.log(result);
            this.gainBookKeyWords = result.data.keywords;
          })
          .catch((err) => {
            console.log(err);
          });
        this.isShowResult = true;
      }
      if (n === "") {
        this.isShowResult = false;
        this.gainBookKeyWords = [];
      }
    },
  },
  created() {
    // 搜索热词
    // http://api.zhuishushenqi.com/book/search-hotwords =>
    // this.axios("/book/hot-word") //热门搜索
    this.axios("https://novel.kele8.cn/search-hotwords")
      .then((result) => {
        console.log(result);
        this.hotWord = result.data.searchHotWords;

        // this.hotWord = result.data.hotWords;
        // this.newHotWords = result.data.newHotWords;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  computed: {
    ...mapState(["SearchBookHistory"]),
    currentHotword: {
      // if (this.isChange) {
      //   return this.newHotWords;
      // } else {
      //   return this.hotWord;
      // }

      get: function() {
        return this.hotWord.slice(this.currentIndex, this.currentIndex + 7);
      },
      set: function() {
        this.currentIndex = Math.floor(
          Math.random() * (this.hotWord.length - 7)
        );
      },
    },
  },
  methods: {
    ...mapMutations([
      "addSearchBookHistory", //also supports payload `this.nameOfMutation(amount)`
      "removeSearchBookHistory",
    ]),
    onSearch(val) {
      if (this.value) {
        console.log("searching ==>", val);
        // this.addSearchBookHistory(val);
        // 搜索补齐
        // http://api.zhuishushenqi.com/book/auto-complete?query=关键词
        // http://novel.kele8.cn/auto-complete?query=
        // this.axios("/book/auto-complete?query=" + val)
        this.axios("https://novel.kele8.cn/auto-complete?query=" + val)
          .then((result) => {
            console.log(result);
            if (result.data.keywords.length === 0) {
              Toast("抱歉,没有相关的书籍");
            }
            this.gainBookKeyWords = result.data.keywords;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        return;
      }
    },
    onSure() {
      console.log(this.value);
      this.addSearchBookHistory(this.value);
      Toast("正在搜索相关书籍...");
      this.onSearch(this.value);
      this.value = "";
    },
    ChangeHotWord() {
      // console.log("切换关键词");
      let currentIndex = Math.floor(Math.random() * (this.hotWord.length - 7));
      this.currentHotword = this.hotWord.slice(currentIndex, currentIndex + 7);
    },
    pickHotWordToSearch(e) {
      console.log("Router enter ==>" + e);
      this.addSearchBookHistory(e);

      this.$router.push({ path: "/search-value", query: { bookName: e } });
      Toast("正在搜索相关书籍...");
      this.value = "";
    },
    clearHistory() {
      console.log("显示/隐藏");
      this.isShowHistory = false;
      this.removeSearchBookHistory();
    },
  },
  components: {
    Searchhead,
  },
  beforeRouteEnter(to, from, next) {
    // 直接搜索书名
    // http://www.api.zhuishushenqi.com/book/fuzzy-search?query={{关键词}}
    // this.axios("/book/fuzzy-search?query=" + this.value)
    //   .then((result) => {
    //     console.log(result);
    //     this.gainBooks = result.data.books;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    next((vm) => (vm.isShowHistory = true));
  },
};
</script>

<style lang="scss" scoped>
.search-page {
  margin-top: 40px;
  padding: 0 10px;
  .search-content {
    .search-top {
      form {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .van-search {
          flex: 1;
        }
        .sure {
          // flex-shrink: 0;
          padding-right: 8px;
        }
      }
    }
    .gainksywords {
      padding: 15px;
      .gain-hotword-item {
        margin: 15px 10px 10px 0;
        max-width: 90%;
        height: 1.38667rem;
        padding-left: 1.5rem;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAWBAMAAADdrcoLAAAAJFBMVEX///++vr7y8vLu7u7Dw8Pk5OTe3t719fXa2trs7OzPz8/Hx8dTXNRiAAAAP0lEQVQY02MgHXAIAoEYhM0YACRWQNmCIOAAYQcbGxubCkDYCkCCCcpWd3HxZsIq7smAJE42OxlhLxvCPYQBAECeCDq7BiEBAAAAAElFTkSuQmCC);
        background-repeat: no-repeat;
        background-size: 16px 16px;
        background-position: 0;
        line-height: 1.38667rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .search-hotlist {
      .recommend {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title {
          height: 2.8rem;
          line-height: 2.8rem;
          font-size: 1.25rem;
          color: #6b6b6b;
        }
        .exchange {
          height: 1.8rem;
          padding-right: 0.53333rem;
          line-height: 1.8rem;
          font-size: 0.32rem !important;
          color: #8a8a8f;
          .icon-exchange {
            margin-left: 3px;
            display: inline-block;
            width: 12px;
            height: 11px;
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAnCAMAAABUv8o5AAAAjVBMVEX////8/P77+/34+Pr6+vz29viUlJaFhYf09PaIiIqPj5GKiozy8vSMjI6RkZPs7O7o6Ori4uTKysynp6mampyXl5nCwsTv7/Hl5ee7u72wsLKhoaOCgoTb293R0dPGxsienqDf3+HV1de4uLqtra+kpKbq6uy/v8G0tLapqaucnJ5/f4HNzc/W1ti9vb9Qf31QAAACK0lEQVQ4y+WU6bKbMAyFJeMF25gdQoDse3Lb93+8yr6X0LnJtNPf1QwMjD9LOgdh+A+Dicjf6RICAQEQ8T0ZcQAeVlH4Z2DsOxLTOoFZvFhQMgIj9g6jJZGt2qpJ5eladpy2eBxfMLHvG6eNVkrL4yZjxL1irLvUajT3YdjWRptmWVA+9oKJjVRpddjsimLfHuVDXgvmNX2LclDpdb2AiArFxc+7lsuMdMwApWawatx4OAt65ZzkLcrmUZcQ4YwhcuAHl95W7MvTCDBbprbKGYhZIiaQG1X/CM6Dx4gvbm5bwIz5XqAcbUV9UV66eZjhUtlLjr8lQ8ZutjlwSBh7YrCWuj/DjPmlRt4/Pr2cikJ3UkMC8dNXRrtTU+8gxCSB5ce03s1SYwQBcmxyakzg0xDrFPmdniYsoc1x5eQKWJidiFH+bONS87DSVhMmCAOSVYbxYV/t5SdnjVHyx4QFbXtlr3kY2TgKI5x81No43c9KOVKRrduuI7/lUxWLklY+dF/MGFWNcGNcX/gswGPBff3zUg4rwAlDwmI4D9r2+8XXR026XEBXrpMnxsJXAP5RjerUrrwlLG9vxx3wRPC5/yCBfFjXo5HDst20h8qq+xp4GKuXX2t/dKOWJpWpVrIS0ac33ynGu3ZrtNJW6+bSkax3GGCEmJV97ez2souBIbxiM/yXd2/WdGhw/qejxo+utzcOs/Q+iAnHQTKdMO8DQzYUVD7hfgop4F/jF16jG+TevfgUAAAAAElFTkSuQmCC);
            background-size: 0.8rem 0.8rem;
            background-position: 100%;
            background-repeat: no-repeat;
            vertical-align: middle;
          }
        }
      }
      .gain-list {
        display: flex;
        flex-wrap: wrap;
        min-height: 140px;

        .item-full {
          padding: 8px 5px;
          .link {
            padding: 0.3rem 0.56667rem;
            margin: 0 0.56667rem 0.56667rem 0;
            height: 0.8rem;
            background: #efeff4;
            line-height: 1rem;
            font-size: 0.9rem;
            color: #9b9ba3;
            border-radius: 0.8rem;
          }
        }
      }
      .search-history {
        .search-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .search-title {
            height: 2.8rem;
            line-height: 2.8rem;
            font-size: 1.25rem;
            color: #6b6b6b;
          }
          .refresh {
            padding-right: 0.53333rem;
            height: 1.8rem;
            line-height: 1.8rem;
            font-size: 0.32rem !important;
            color: #8a8a8f;
            .delete {
              display: inline-block;
              width: 12px;
              height: 11px;
              background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAoCAMAAABU4iNhAAAArlBMVEX////9/P+Qj5T5+fz7+v/4+Pv7+/2NjJH08/eTkpbe3uDKys2Lio6MjI/n5uv39/nT0tfHxsubm52WlZq6ub6Ghonu7vGTk5b29frz8vXw7/Ph4ePW1tnMy8+pqauJiI2ysbWlpamYmJuPj5LZ2dvT09XQ0NLOztDExMe/v8KhoKOIiIrb2929vMCurbKrqq+Wlpjq6uyjoqWdnKCEhIbl5eeXl5m2triAf4R+fYIt4g+bAAABxUlEQVQ4y+2TaW/bMAyGX1qWfCpunPqKj8TOfZ/ttv//x0ZnG7CtQj8U6LdS4AtJfChSEITPNAklSboQ9FgSXEk8FyaW6KFScly8c6ZiBIzQnxoMc5Iywj2lGHfdXynEbrAHxUKqDz9cChYjSRyJgm2y2yXXWnImjCQUKUHjRXZPui5JzlXBxY3gwN/v5/PDzInbpmlus2yz932/vPxTlUXIRofOTuv7tuz35q+evp+TcNe+IUVzzl7P3bapJISkYnWNdZzF8fT/6ygxr+rVMliWAkSkEM0X62WwqHy8QYGi4NP+LkRj1/SSKgpWzKlL2qel6Ri4rJamu0dlHFeR8KcHTooOz3slh/E2NaEvll4ptdaZgCgsb0G00V4Bg5XebAF8y0KCcnddQFjPsshE+s7oycazZdmEgeUFoKFluV/kB0l6GXlM1lmbg9I2rnLadJOxgRSl5z1JDIY1wc7rOgU2nWMiyddOJUF5znPk3AK/ppFEaU2Wrm3bILIFQcr8kMxSE5m2P+Lj8XSaHqdTllPbeN+vhQF03WA0mYTORIdas1hJEt5q2/jfB5ubwyiP37JdG9tEROj7owhkQ7LbkleELwN+AmK6JDKO8B81AAAAAElFTkSuQmCC);
              background-size: 0.8rem 0.8rem;
              background-position: 100%;
              background-repeat: no-repeat;
              vertical-align: middle;
              margin-left: 3px;
            }
          }
        }
        .search-list {
          padding: 5px 0;
          .book-item {
            padding: 5px;
            font-size: 1rem;
            color: #9b9ba3;
            line-height: 1.8rem;
            border-bottom: 0.01333rem solid #ebebf0;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            .link {
              color: #9b9ba3;
            }
          }
        }
      }
    }
  }
}
</style>
