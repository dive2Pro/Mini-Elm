<template>
    <div class="oritation">
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
            <div v-for="food in foods" :key="food.item_id">
                <img :src="food.image_path" class="food-image"/>
                <h2> {{food.name}} </h2>
                <h1 class="food-price">
                    {{food.spec.price}}
                </h1>
                <div class="food-operator">
                    <ShopcartOperator :food="food" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { log } from '../../components/utils';
import Operator from '../../ShopCart/Operator';
export default {
  created() {},
  components: {
      ShopcartOperator: Operator,
  },
  async mounted() {
    const response = await this.$fly.get(
      `/shopping/v2/menu?restaurant_id=${this.initialData.id}`,
    );
    log(response);
    if (response.status === 200) {
      this.clazzs = response.data;
      this.selected = this.clazzs[0].id
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
          return this.clazzs.length
      },
      foods() {
          const self = this
          return this.selected == null ? [] : this.clazzs.find( f => f.id === this.selected).foods.map(food => ({...food, image_path: self.getSrc(food) ,
          spec: food.specfoods[0] }))
      }
  },
  methods: {
      onSelected(id, index){
          this.selected = id
      },
      getSrc(food) {
          const self = this
          const src= self.IMAGE_PREFIX + food.image_path
          return src
      }
  }
};
</script>
<style lang="scss" scoped>
.clazz-tree {
  width: 30%;
  height: 100vh;
  overflow-y: auto;
    &::-webkit-scrollbar{
        display: none;
    }
}

h3 {
  line-height: 150rpx;
}
.active {
    background-color: red;
}
.oritation{
  display: flex;
}
.foods-tree{
    height: 100vh;
    overflow-y: auto;
    flex: 1;
}
.food{
    &-image{
        width: 150rpx;
        height: 150rpx;

    }
    &-price{
        color:red;
    }
}
</style>
