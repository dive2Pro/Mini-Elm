<template>
    <div>
        <button @click="minus">-</button>
        Hello {{count}}
        <button @click="add"> +</button>
    </div>
</template>

<script>
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
    restaurant: {
        type: Object,
        required: true
    }
  },
  mounted() {
  },
  beforeCreate() {
  },
  created(){
    this.$sc.initFood(...this.ids);
  },
  methods: {
    add(...args) {
      this.$sc.add(...this.ids);
    },
    minus(args) {
      this.$sc.minus(...this.ids);
    },
  },
  computed: {
      count() {
          const ids = this.ids;
          // const result =  this.$sc.db[ids[0]][ids[1]]
          const result = this.$sc.getCount(...ids)
          return result;
      },
      ids() {
          const { item_id } = this.food;
          const { id } = this.restaurant
          // console.log(item_id, id)
          return [
            id
            ,this.food
          ]
      }
  }
};
</script>
