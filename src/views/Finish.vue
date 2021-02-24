<template>
  <div class="finish-page">
    <NavHeader :leftText="'完本'"></NavHeader>
    <h3>
      正在赶工...
    </h3>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader.vue";

export default {
  components: {
    NavHeader,
  },
  data() {
    return {};
  },

  methods: {},
};
</script>

<style lang="scss" scoped>
.finish-page {
  margin-top: 50px;
  text-align: center;
}
</style>
