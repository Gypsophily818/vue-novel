<template>
  <div class="free-page">
    <NavHeader :leftText="'免费'"></NavHeader>

    <h3>空空如也</h3>
  </div>
</template>

<script>
import NavHeader from "@/components/NavHeader.vue";

export default {
  components: {
    NavHeader,
  },
  created(){
    
  }
};
</script>

<style lang="scss" scoped>
.free-page{
  margin-top: 50px;
  text-align: center;
}
</style>