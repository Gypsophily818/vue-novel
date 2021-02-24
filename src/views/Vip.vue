<template>
  <div class="vip-page">
    <NavHeader :leftText="'VIP'"></NavHeader>
    <h3>正在赶工...</h3>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader.vue";

export default {
  components: {
    NavHeader,
  },
};
</script>

<style lang="scss" scoped>
.vip-page{
  margin-top: 50px;
  text-align: center;
}
</style>
