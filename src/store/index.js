import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    maleHot: null,
    femaleHot: null,
    maleFinish: null,
    femaleFinish: null,
    // readChapterCounter: "",
    chapterCounter: 0, //章节索引 默认0

    my_or_history: true, //我的书架和最近阅读

    gender: "male",
    isClickNav: false, //固定导航的路由出入口
    rankCategory: null,
    chapter: null, //章节列表

    bookrack: JSON.parse(window.localStorage.getItem("bookrack")) || [], //书架--我的收藏
    ReadHistory:
      JSON.parse(window.localStorage.getItem("bookReadHistory")) || [], //书架--阅读历史
    SearchBookHistory:
      JSON.parse(window.localStorage.getItem("bookSearchHistory")) || [], //搜索记录
    // bookChapterHistory:
    //   JSON.parse(window.localStorage.getItem("bookChapterHistory")) || [], //章节列表
  },
  mutations: {
    updatemaleHot: function(state, payload) {
      state.maleHot = payload;
    },
    updatefemaleHot: function(state, payload) {
      state.femaleHot = payload;
    },
    updatemaleFinish: function(state, payload) {
      state.maleFinish = payload;
    },
    updatefemaleFinish: function(state, payload) {
      state.femaleFinish = payload;
    },
    updatechapterCounter(state, payload) {
      //记录阅读到的第几章节(索引)
      console.log("zhagnjie;章节", payload);
      state.chapterCounter = payload;
    },
    updateMy_or_history(state, leaveBookshelf) {
      //进入书架判断进入的子路由
      console.log("my_or_history", state);
      console.log("leaveBookshelf", leaveBookshelf);
      if (leaveBookshelf) {
        state.my_or_history = !leaveBookshelf;
      }
      state.my_or_history = !state.my_or_history;
    },

    updateRankCategory: function(state, payload) {
      //更新分类
      state.rankCategory = payload;
    },
    changeGender(state, gender) {
      //男女路由控制
      console.log(state, gender);
      if (gender === "Home") {
        gender = "male";
      }
      state.gender = gender;
    },
    changeIsClickNav(state) {
      // 导航出入关闭控制
      // console.log(state, payload);
      state.isClickNav = !state.isClickNav;
    },
    addBookrack: function(state, payload) {
      //加入我的书架
      console.log("state", state);
      console.log("payLoad", payload);
      state.bookrack.push(payload);
    },
    // 移除我的书架
    removeBookrack: function(state, payload) {
      // console.log(state, payload);
      console.log("state", state);
      console.log("payLoad", payload);
      state.bookrack = state.bookrack.filter((item) => item !== payload);
    },
    // 更新章节列表
    updateChapter: function(state, payload) {
      state.chapter = payload;
    },
    // 阅读历史
    updateReadHistory: function(state, payload) {
      // console.log("更新历史记录state", state);
      console.log("更新历史记录payload", payload);

      // var clearDuplicate1 = (arr, key) => Array.from(new Set(arr.map(e => e[key]))).map(e => arr.find(x => x[key] == e));
      state.ReadHistory.unshift(payload);
      var obj = {};
      state.ReadHistory = state.ReadHistory.reduce(function(item, next) {
        obj[next.bookID] ? "" : (obj[next.bookID] = true && item.push(next));
        return item;
      }, []);

      console.log(state.ReadHistory);
    },
    addSearchBookHistory(state, payload) {
      //添加历史搜索记录
      let arr = state.SearchBookHistory;
      console.log(arr, "添加历史");
      if (arr.indexOf(payload) === -1) {
        arr.unshift(payload);
      } else {
        arr.map((item, index) => {
          if (index == arr.indexOf(payload)) {
            arr.unshift(arr.splice(index, 1)[0]);
          }
        });
      }
    },
    removeSearchBookHistory(state, payload) {
      //清空历史搜索记录
      // state.SearchBookHistory.length = 0;
      state.SearchBookHistory = [];
      console.log("删除", state.SearchBookHistory);
      console.log("删除", payload);
    },
    removeReadHistory: function(state, payload) {
      //删除最近阅读
      console.log(payload);

      state.ReadHistory = state.ReadHistory.filter((item) => {
        console.log(item.bookID !== payload);
        return item.bookID !== payload;
      });
      console.log(state.ReadHistory);
    },
  },
  actions: {},
  modules: {},
});
