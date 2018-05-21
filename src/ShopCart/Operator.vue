<template>
    <div>
        <button @click="minus">-</button>
        Hello {{count}}
        <button @click="add"> +</button>
    </div>
</template>

<script>
import Vue from 'vue'
import { shopcart } from './index';
export default {
  name: 'Shopcart-Operator',
  data() {
    return {
      length: 0
    };
  },
  props: {
    food: {
      // 要操作的对象
      type: Object,
      required: true,
    },
  },
  mounted() {
    //   setInterval(() => {
    //     //   console.log(this.count)
    //   }, 1000)
    // console.log(this.$sc)
  },
  created() {
    const { item_id, restaurant_id } = this.food;
    this.$sc.initFood(restaurant_id, item_id);
  },
  methods: {
    add(...args) {
      const { item_id, restaurant_id } = this.food;
      this.$sc.add(restaurant_id, item_id);
    },
    minus(args) {
      const { item_id, restaurant_id } = this.food;
      this.$sc.minus(restaurant_id, item_id);
    },
  },
  watch() {
  },
  computed: {
      count() {
          const { item_id, restaurant_id } = this.food;
          return this.$sc.db[restaurant_id][item_id]
      }
  }
};
</script>
