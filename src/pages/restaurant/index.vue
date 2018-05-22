<template>
  <div class="flex">
      <div class="oritation main">
          <div class="clazz-tree">
                  <div v-for="(clazz, index) in clazzs"
                      :class="{active: clazz.id === selected}"
                      :key="clazz.id" @click="onSelected(clazz.id, index)">
                      <h3>
                          {{clazz.name}}
                      </h3>
                  </div>
          </div>
          <div class="foods-tree">
              <div v-for="food in foods" :key="food.parent.id + '-' + food.item_id">
                  <img :src="food.image_path" class="food-image"/>
                  <h2> {{food.name}} </h2>
                  <h1 class="food-price"> {{food.spec.price}} </h1>
                  <div class="food-operator">
                      <ShopcartOperator :food="food" :restaurant="food.parent" :rId="initialData.id" />
                  </div>
              </div>
        </div>
      </div>
      <footer>
          <RestaurantCart :rId="initialData.id"/>
      </footer>
  </div>
</template>

<script>
import { log } from '@/components/utils';
import Operator from '@/ShopCart/Operator'
import RestaurantCart from '@/ShopCart/RestaurantCart'
export default {
  created() {},
  components: {
    ShopcartOperator: Operator,
    RestaurantCart,
  },
  async mounted() {
    const response = await this.$fly.get(
      `/shopping/v2/menu?restaurant_id=${this.initialData.id}`,
    );
    if (response.status === 200) {
      this.clazzs = response.data;
      this.selected = this.clazzs[0].id;
    }
  },
  onLoad(option) {
    const { id, data } = option;
    try {
      const json = JSON.parse(data);
      this.initialData = { id, data: json };
    } catch (e) {
      console.error(e);
    }
  },
  data() {
    return {
      initialData: {
        id: null,
        data: null,
      },
      clazzs: [],
      selected: null,
    };
  },
  computed: {
    clazzCount() {
      return this.clazzs.length;
    },
    foods() {
      const self = this;
      const result =
        this.selected == null
          ? { foods: [] }
          : this.clazzs.find(f => f.id === this.selected);
      return result.foods.map(food => ({
        ...food,
        parent: { ...result, foods: [] },
        image_path: self.getSrc(food),
        spec: food.specfoods[0],
      }));
    },
  },
  methods: {
    onSelected(id, index) {
      this.selected = id;
    },
    getSrc(food) {
      const self = this;
      const src = self.IMAGE_PREFIX + food.image_path;
      return src;
    },
  },
};
</script>
<style lang="scss" scoped>
.main{
  height: calc( 100vh - 150rpx);
}
.clazz-tree {
  width: 30%;
  height: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  margin-bottom: 150rpx;
}
.flex {
  display: flex;
  flex-direction: column;
}
h3 {
  line-height: 150rpx;
}
.active {
  background-color: red;
}
.oritation {
  display: flex;
  flex:1;
}
footer{
  height: 150rpx;
}
.foods-tree {
  height: 100%;
  overflow-y: auto;
  flex: 1;
}
.food {
  &-image {
    width: 150rpx;
    height: 150rpx;
  }
  &-price {
    color: red;
  }
}
</style>
