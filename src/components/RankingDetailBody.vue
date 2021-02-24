<template>
  <div class="ranking-detail-body">
    <div id="filters" class="toplist-tag-x" style="opacity: 1;">
      <div class="toplist-tag jsFilter" data-key="catId">
        <span
          class="btn-tag jsTag"
          :class="{ active: currentIndex === 'all' }"
          @click.stop="clickTrigger"
          >全站</span
        >
        <div>
          <ul class="ranking-detail-box">
            <li
              class="ranking-detail-box-item"
              v-for="(item, index) in carID"
              :key="index"
            >
              <span
                class="btn-tag jsTag "
                :index="index"
                @click.stop="filterHandertriggle(index, item)"
                :class="{ active: index === currentIndex }"
                >{{ item }}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div class="show-ranking-datail">
        <ul v-if="allBooks">
          <!-- <ItemY v-for="book in allBooks.books" :key="book._id" :book="book" /> -->
          <ItemY v-for="book in currentBooks" :key="book._id" :book="book" />
          <!-- result="bookShelf" -->
          <!-- :BookShelfCurrentPage="BookShelfCurrentPage" -->
          <!-- :resultBookChapter="resultBookChapter[index]" -->
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
import ItemY from "@/components/ItemY.vue";

export default {
  props: ["currentIndex", "carID", "currentBooks", "allBooks"],
  components: {
    ItemY,
  },
  methods: {
    clickTrigger() {
			this.$emit('clickAll')
		},
		filterHandertriggle(index, item){
			console.log(index, item);
			this.$emit('filterHandertriggle',index, item)
		}
  },
};
</script>

<style lang="scss">
.rank-to-detail {
  #filters {
    margin-top: 48px;
    // font-size: 14px;
    z-index: 1;
    overflow: hidden;
    background-color: #f6f7f9;
    .toplist-tag {
      margin-left: 1rem;
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
    .active {
      color: red;
    }
    .show-ranking-datail {
      padding: 5px 15px;
      background: #fff;
      li:nth-of-type(1) {
        padding-top: 5px;
      }
    }
  }
}
</style>
