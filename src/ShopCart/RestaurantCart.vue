<template>
    <div>
        <h2>{{totalCount}}</h2>个
        <h1>{{totalPrice}}</h1>
    </div>
</template>

<script>
/**
 * 在这里接受商店的优惠方式
 *  只能同时使用一种方式
 *          如果商品中有优惠商品, 则其他优惠方式不起效果
 */
export default {
  props: {
    rId: {
      // 商店的 id
      type: String,
      required: true,
    },
    preferential: {
      // 优惠计算
      type: Function,
      // 传入的是
      default: () => null,
    },
  },
  created() {
      console.log('created- restaurant ', this.rId);
    this.$sc.initRestaurant(this.rId);
  },
  beforeMount() {
  },
  beforeUpdate() {
  },
  beforeDestroy() {
      console.warn(' destroy')
  },
  computed: {
    totalCount() {
      return this.$sc.getTotalCount(this.rId);
    },
    totalPrice() {
      return this.$sc.getTotalPrice(this.rId);
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-weight: bold;
  position: relative;
  &::before {
    content: '#';
  }
}
</style>
