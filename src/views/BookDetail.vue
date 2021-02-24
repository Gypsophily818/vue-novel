<template>
  <div class="detail">
    <router-view
      @bookTitle="uploadContent"
      @upLoadChapterID="upLoadChapterID"
      :bookTitle="bookTitle"
      :ChapterID="ChapterID"
      :chapter="chapter"
    ></router-view>
    <!-- @update:upload-content="$emit('update:upload-content', $event)" -->
  </div>
</template>

<script>
// mapMutations
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["bookrack", "ReadHistory", "chapter"]),
  },
  created() {
    // console.log("bookrack", "ReadHistory", this.bookrack, this.ReadHistory);
  },
  data() {
    return {
      bookTitle: "",
      // ChapterID: "",
      ChapterID: 0,
    };
  },
  methods: {
    uploadContent(e) {
      console.log(e);
      this.bookTitle = e;
      // this.$emit("update:upload-content", e);
    },
    upLoadChapterID(e) {
      this.ChapterID = e;
    },
  },
  beforeRouteEnter(to, from, next) {
    // ...
    next((vm) => {
      console.log("bookrack", "ReadHistory", vm.bookrack, vm.ReadHistory);
      console.log("bookrack", "ReadHistory", vm.bookrack, vm.ReadHistory);
    });
  },
 
};
</script>

<style lang="scss"></style>
